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


export default function CreateUpdatePhotoEntry(props) {
  const {operation, formTemplate, collection, formStyle, inputStyle, label, disabled} = props;
  
  // CONTEXT
  const {activeID, toggleModalHandler} = useModalContext();
  const {setFormData, setData, setMessage} = useFormContext();
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
  // MODAL ELEMENTS  
  // create && update photo entry modals
  return (
    <Form 
      operation={operation}
      submit={operation === OPERATIONS.CREATE_PHOTO ? createPhotoEntryHandler : updatePhotoEntryHandler}
      customStyle={formStyle}
      disabled={disabled}
    > 
      {/* { formData && buildInputFields(formTemplate).map(elem => ( */}
      { buildInputFields(formTemplate).map(elem => (
      <Input 
        key={elem.name} 
        name={elem.name} 
        label={label}
        customStyle={inputStyle}
      /> 
    )) }
    </Form>
  )
}