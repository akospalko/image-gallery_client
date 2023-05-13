// TODO: replace string labels with CONSTANTs 
// TODO: pass title/form styling to Form elem 
// TODO: when cancel || X buttons are pressed: abort request 
// TODO: navToPrevPage - navigates to login after operation 
// Reusable modal for create/update photo entry 
import React, {useEffect, useState} from 'react'
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
import LoaderIcon from '../SVG/Loader'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useThemeContext } from '../contexts/ThemeContext'

export default function CreateUpdatePhotoEntry(props) {
  // PROPS
  const {operation, formTemplate, collection, label} = props;
  // ROUTING
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const navToPrevPage = () => navigate('/login', { state: {from: location}, replace: true});
  // CONTEXT
  const {activePhotoEntry, setActiveID, toggleModalHandler} = useModalContext();
  const {formData, setFormData, message, setMessage, setPhotoFile} = useFormContext();
  const {isLoading, loaderToggleHandler} = useLoaderContext();
  const {theme} = useThemeContext();
  // HOOKS
  const axiosPrivate = useAxiosPrivate();
  const {fetchHomePhotoEntries, fetchGalleryPhotoEntries} = useFetchPhotoEntries();
   // STATE
  const [isFormReady, setIsFormReady] = useState(false);
  // EFFECTS
  // set up form on mount
  useEffect(() => { 
    setFormData(formTemplate);
    return () => {
      setFormData(null);
      setPhotoFile({});
    } 
  }, [])
  // update photo entry: populate form with active id on first render
  useEffect(() => {
    if(operation !== OPERATIONS.UPDATE_PHOTO || !activePhotoEntry || !formData || isFormReady) return;
    // update form with filtered fields' values
    let updatedForm = {...formData}; // copy form
    for(let elem in formData) {
      const updatedItem = {...updatedForm[elem]}; 
      updatedItem.value = activePhotoEntry[elem];
      updatedForm[elem] = updatedItem; 
    }
    setFormData(updatedForm);  
    setIsFormReady(true);      
  }, [formData, operation, isFormReady, setIsFormReady])

  // HANDLERS
  // submit form for createPhoto (create new photo entry)
  const createPhotoEntryHandler = async(e, formData) => {
    // TODO: set (refetch) photo entry data state here 
    e.preventDefault();
    try {
      loaderToggleHandler('PHOTO_ENTRY_SUBMIT', undefined, true);
      const convertedData = convertFormData(formData); // simplyfy data before sending request  
      const responseCreate = await postPhotoEntry(convertedData, axiosPrivate, collection); // post entry to server
      console.log(responseCreate)
      const {success, message, photoEntry } = responseCreate ?? {};
      if(success === true) {
        toast(`${message}`, { // send toast
          className: "shared-toast",
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: theme,
          });
        // collection === 'gallery' ? await fetchGalleryPhotoEntries(navToPrevPage) : await fetchHomePhotoEntries(navToPrevPage); 
        collection === 'gallery' ? await fetchGalleryPhotoEntries() : await fetchHomePhotoEntries(); 
        setFormData(undefined); // reset form 
        toggleModalHandler(operation);
        setPhotoFile({});
        setActiveID({})
      } else {
        setMessage(message);
      }
    } catch (error) { 
      setMessage('Error. Try again later!'); 
      // navToPrevPage();
    } finally {      
      loaderToggleHandler('PHOTO_ENTRY_SUBMIT', undefined, false);
    }
  }
  // submit form for createPhoto (update new photo entry)
  const updatePhotoEntryHandler = async (e, formData) => {
    e.preventDefault();
    try {
      loaderToggleHandler('PHOTO_ENTRY_SUBMIT', undefined, true);
      const convertedData = convertFormData(formData); 
      const responseUpdate = await updatePhotoEntry(activePhotoEntry._id, convertedData, axiosPrivate, collection);
      const {success, message, photoEntry } = responseUpdate ?? {};
      if(success === true) {
        toast(`${message}`, { // send toast
          className: "shared-toast",
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: theme,
          });
        // collection === 'gallery' ? await fetchGalleryPhotoEntries(navToPrevPage) : await fetchHomePhotoEntries(navToPrevPage); 
        collection === 'gallery' ? await fetchGalleryPhotoEntries() : await fetchHomePhotoEntries(); 
        setFormData(undefined); // reset form 
        toggleModalHandler(operation);
        setPhotoFile({});
        setActiveID({})
      } else {
        setMessage(message);
      }
    } catch(error) { 
      setMessage('Error. Try again later!'); 
      // navToPrevPage();
    } finally { 
      loaderToggleHandler('PHOTO_ENTRY_SUBMIT', undefined, false);
    }
  }
  // BUTTON
  // submit photo entry (create/udate) or close modal
  const photoEntryButton = (
    <div className='shared-button-wrapper shared-button-wrapper--create-update-photo-entry shared-button-wrapper--margin-top'> 
      { toggleModalHandler ?  
        <Button 
          buttonStyle={'button-form-submit'}
          type='button' 
          clicked={() => {
            setFormData(undefined);
            setMessage(statusMessages.EMPTY);
            toggleModalHandler(operation);
            setPhotoFile({});
            // setActiveID({})
          }}
        > Cancel 
        </Button> : null }   
        <Button 
          buttonStyle='button-form-submit'
          form='form-create-update-photo-entry'
          type='submit' 
          disabled={isLoading.PHOTO_ENTRY_SUBMIT}
          clicked={ (e) => {
            operation === OPERATIONS.CREATE_PHOTO ? createPhotoEntryHandler(e, formData) : updatePhotoEntryHandler(e, formData) 
          }}
        >  { isLoading.PHOTO_ENTRY_SUBMIT ? <LoaderIcon height='25px' width='25px' stroke='var(--text-color--high-emphasis)'/> : 'Submit' } 
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
        { formData && buildInputFields(formTemplate).map(elem => (
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
      {message && <div className='shared-status-message'> <p> {message || ''} </p> </div>}
      {/* SUBMIT FORM BUTTON */}
      {photoEntryButton}
    </div>
  )
}