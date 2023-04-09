// TODO: replace string labels with CONSTANTs 
// TODO: pass title/form styling to Form elem 
// Reusable modal for create/update photo entry 
import React from 'react'
import Form from '../UI/Form'
import Input from '../UI/Input'
import { buildInputFields } from '../../helper/buildInputFields'
import { useFormContext } from '../contexts/FormContext'
import { OPERATIONS } from '../../helper/dataStorage'
import { postPhotoEntry, getAllGalleryPhotoEntries, updatePhotoEntry } from '../../helper/axiosRequests'
import { convertFormData } from '../../helper/convertFormData'
import { useModalContext } from '../contexts/ToggleModalContext'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useAuthContext } from '../contexts/AuthenticationContext'
import Button from '../UI/Button'
import { statusMessages } from '../../helper/dataStorage'
import './CreateUpdatePhotoEntry.css'

export default function CreateUpdatePhotoEntry(props) {
  // PROPS
  const {operation, formTemplate, collection, label, disabled} = props;
  // CONTEXT
  const {activeID, toggleModalHandler} = useModalContext();
  const {formData, setFormData, setData, setMessage, setPhotoFile} = useFormContext();
  const {userID} = useAuthContext
  // HOOK 
  const axiosPrivate = useAxiosPrivate();
  // HANDLERS
  // submit form for createPhoto (create new photo entry)
  const createPhotoEntryHandler = async(e, formData) => {
    e.preventDefault();
    try {
      console.log('CREATE photo entry');
      const convertedData = convertFormData(formData); // simplyfy data before sending request  
      const responseCreate = await postPhotoEntry(convertedData, axiosPrivate, collection); // post entry to server
      setMessage(responseCreate.message);
      const responseGetAll = await getAllGalleryPhotoEntries(axiosPrivate, userID, 'all'); // fetch entries, update state  
      setData(responseGetAll.photoEntries); // store entries in state
      setFormData(undefined); // reset form 
      toggleModalHandler(operation);
    } catch (error) {  }
  }
  // submit form for createPhoto (update new photo entry)
  const updatePhotoEntryHandler = async (e, formData) => {
    e.preventDefault();
    try {
      console.log('UPDATE photo entry');
    // TODO: add loader
      const convertedData = convertFormData(formData); 
      const responseUpdate = await updatePhotoEntry(activeID._id, convertedData, axiosPrivate, collection);
      setMessage(responseUpdate.message);
      const responseGetAll = await getAllGalleryPhotoEntries(axiosPrivate, userID, 'all'); // fetch entries, update state  
      setData(responseGetAll.photoEntries); // store entries in state
      // if succes post request -> reset form 
      setFormData(undefined);
      toggleModalHandler(operation);
    } catch(error) {
      // TODO: error handling
      // TODO: nav to login if token is expired
    }
  }
  // BUTTON
  // submit photo entry (create/udate) or close modal
  const photoEntryButton = (
    <div className='shared-button-wrapper shared-button-wrapper--create-update-photo-entry'> 
      { toggleModalHandler ?  
        <Button 
          buttonStyle='button-form-submit' 
          type='button' 
          disabled={disabled}
          clicked={() => {
            setFormData(undefined);
            setPhotoFile(statusMessages.UPLOAD_PHOTO_FILE_INITIAL);
            toggleModalHandler(operation);
          }}
        > Cancel 
        </Button> : null }      
        <Button 
          buttonStyle='button-form-submit'
          form='form-create-update-photo-entry'
          type='submit' 
          disabled={disabled}
          clicked={ (e) => {
            operation === OPERATIONS.CREATE_PHOTO ? createPhotoEntryHandler(e, formData) : updatePhotoEntryHandler(e, formData) 
            setPhotoFile(statusMessages.UPLOAD_PHOTO_FILE_INITIAL);
          }}
        > Submit </Button>      
    </div> 
  );
  // MODAL ELEMENTS  
  // create && update photo entry modals
  return (
    <>
      {/* FORM WRAPPER */}
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
        <div className='auth-modal-status-message'> <p> {'test status'} </p> </div>
        {/* SUBMIT FORM BUTTON */}
        {photoEntryButton}
      </div>
    </>
  )
}