// TODO: replace string labels with CONSTANTs 
// TODO: pass title/form styling to Form elem 
// TODO: when cancel || X buttons are pressed: abort request 
// Reusable modal for create/update photo entry 
import React from 'react'
import Form from '../UI/Form'
import Input from '../UI/Input'
import { buildInputFields } from '../../helper/buildInputFields'
import { useFormContext } from '../contexts/FormContext'
import { OPERATIONS } from '../../helper/dataStorage'
import { postPhotoEntry, updatePhotoEntry } from '../../helper/axiosRequests'
import { convertFormData } from '../../helper/convertFormData'
import { useModalContext } from '../contexts/ToggleModalContext'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import Button from '../UI/Button'
import { statusMessages } from '../../helper/dataStorage'
import './CreateUpdatePhotoEntry.css'
import useFetchPhotoEntries from '../hooks/useFetchPhotoEntries'
import {useNavigate, useLocation} from 'react-router';
import { useLoaderContext } from '../contexts/LoaderContext'
import ButtonLoader from '../SVG/ButtonLoader'

export default function CreateUpdatePhotoEntry(props) {
  // PROPS
  const {operation, formTemplate, collection, label} = props;
  // ROUTING
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const navToPrevPage = () => navigate('/login', { state: {from: location}, replace: true});
  // CONTEXT
  const {activeID, setActiveID, toggleModalHandler} = useModalContext();
  const {formData, setFormData, message, setMessage, setPhotoFile} = useFormContext();
  const {isLoading, loaderToggleHandler} = useLoaderContext();
  // HOOKS
  const axiosPrivate = useAxiosPrivate();
  const {fetchHomePhotoEntries, fetchGalleryPhotoEntries} = useFetchPhotoEntries();
  // HANDLERS
  // submit form for createPhoto (create new photo entry)
  const createPhotoEntryHandler = async(e, formData) => {
    e.preventDefault();
    try {
      loaderToggleHandler('PHOTO_ENTRY_BUTTON', undefined, true);
      const convertedData = convertFormData(formData); // simplyfy data before sending request  
      const responseCreate = await postPhotoEntry(convertedData, axiosPrivate, collection); // post entry to server
      setMessage(responseCreate.message);
      if(responseCreate.success === true) {
        collection === 'gallery' ? await fetchGalleryPhotoEntries(navToPrevPage) : await fetchHomePhotoEntries(navToPrevPage); 
        setFormData(undefined); // reset form 
        toggleModalHandler(operation);
        setPhotoFile({});
        setActiveID({})
      } 
    } catch (error) { 
      navToPrevPage();
    } finally {      
      loaderToggleHandler('PHOTO_ENTRY_BUTTON', undefined, false);
    }
  }
  // submit form for createPhoto (update new photo entry)
  const updatePhotoEntryHandler = async (e, formData) => {
    e.preventDefault();
    try {
      loaderToggleHandler('PHOTO_ENTRY_BUTTON', undefined, true);
      const convertedData = convertFormData(formData); 
      const responseUpdate = await updatePhotoEntry(activeID._id, convertedData, axiosPrivate, collection);
      setMessage(responseUpdate.message) 
      if(responseUpdate.success === true) {
        collection === 'gallery' ? await fetchGalleryPhotoEntries(navToPrevPage) : await fetchHomePhotoEntries(navToPrevPage); 
        setFormData(undefined); // reset form 
        toggleModalHandler(operation);
        setPhotoFile({});
        setActiveID({})
      }
    } catch(error) { 
      navToPrevPage();
    } finally { 
      loaderToggleHandler('PHOTO_ENTRY_BUTTON', undefined, false);
    }
  }
  // BUTTON
  // submit photo entry (create/udate) or close modal
  const photoEntryButton = (
    <div className='shared-button-wrapper shared-button-wrapper--create-update-photo-entry'> 
      { toggleModalHandler ?  
        <Button 
          buttonStyle={'button-form-submit'}
          type='button' 
          clicked={() => {
            setFormData(undefined);
            setMessage(statusMessages.EMPTY);
            toggleModalHandler(operation);
            setPhotoFile({});
            setActiveID({})
          }}
        > Cancel 
        </Button> : null }   
        <Button 
          buttonStyle={isLoading.PHOTO_ENTRY_BUTTON ? 'button-form-submit button-form-submit--disabled' : 'button-form-submit'}
          form='form-create-update-photo-entry'
          type='submit' 
          disabled={isLoading.PHOTO_ENTRY_BUTTON}
          clicked={ (e) => {
            operation === OPERATIONS.CREATE_PHOTO ? createPhotoEntryHandler(e, formData) : updatePhotoEntryHandler(e, formData) 
          }}
        >  { isLoading.PHOTO_ENTRY_BUTTON ? <ButtonLoader height='50%' width='50%'/> : 'Submit' } 
        </Button>      
    </div> 
  );
  // MODAL ELEMENTS  
  // create && update photo entry modals
  return (
    // FORM WRAPPER 
    <div className='create-update-photo-entry-modal-wrapper'>
      {/* FORM */}
      <Form id='form-create-update-photo-entry'> 
        {/* { formData && buildInputFields(formTemplate).map(elem => ( */}
        { buildInputFields(formTemplate).map(elem => (
        <Input 
          key={elem.name} 
          name={elem.name} 
          label={label}
          inputStyle='input-create-update-photo-entry' 
          textareaStyle='textarea-create-update-photo-entry'
          labelStyle='input-create-update-photo-entry-label'
        /> 
      )) }
      </Form>
      {/* STATUS MESSAGE */}
      <div className='auth-modal-status-message'> <p> {message || ''} </p> </div>
      {/* SUBMIT FORM BUTTON */}
      {photoEntryButton}
    </div>
  )
}