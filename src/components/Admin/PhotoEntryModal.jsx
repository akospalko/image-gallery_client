// TODO: handle loading, disable button, img skeleton loader 
import React, {useState, useEffect} from 'react'
import '../Shared.css'
import Form from '../UI/Form'
import Input from '../UI/Input'
import FullScreenView from '../Modals/FullScreenView'
import MapView from '../Modals/MapView'
import {useModalContext} from '../contexts/ToggleModalContext'
import {useFormContext} from '../contexts/FormContext'
import {convertFormData} from '../../helper/convertFormData'
import {postPhotoEntry, getAllGalleryPhotoEntries, updatePhotoEntry} from '../../helper/axiosRequests'
import {buildInputFields} from '../../helper/buildInputFields'
import {createPhoto, updatePhoto, OPERATIONS, MODAL_TITLES} from '../../helper/dataStorage'
import ModalHeader from '../Modals/ModalHeader'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

export default function PhotoEntryModal({operation, collection}) {
  // CONTEXTS
  const {activeID, toggleModalHandler} = useModalContext();
  const {formData, setFormData, setData, setMessage} = useFormContext();
  // HOOK
  const axiosPrivate = useAxiosPrivate();
  // STATE
  const [isFormReady, setIsFormReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // EFFECTS
  useEffect(() => {
    // find initial value to set up modals with forms based on operation value
    let initialValue;
    switch(operation) { 
      case OPERATIONS.CREATE_PHOTO:
        initialValue = createPhoto;
        break;
      case OPERATIONS.UPDATE_PHOTO:
        initialValue = updatePhoto;
        break;
      default: 
        initialValue = createPhoto;
    }
    setFormData(initialValue);
  }, [operation, setFormData])

  // populate form with active id on first render
  useEffect(() => {
    if(operation !== OPERATIONS.UPDATE_PHOTO) return;
    if(!formData || formData !== updatePhoto) return;
    if(!activeID) return;
    if(isFormReady) return;
    // update state with filtered fields
    let updatedForm = {...formData}; // copy form
    for(let elem in formData) {
      const updatedItem = {...updatedForm[elem]}; 
      updatedItem.value = activeID[elem];
      updatedForm[elem] = updatedItem; 
    }
    setFormData(updatedForm);  
    setIsFormReady(true);      
  }, [formData, operation, isFormReady, setIsFormReady]) // setIsFormReady ; 
  // HANDLERS
  // submit form for createPhoto (create new photo entry)
  const createPhotoEntryHandler = async(e, formData) => {
    e.preventDefault();
    try {
      const convertedData = convertFormData(formData); // simplyfy data before sending request  
      const responseCreate = await postPhotoEntry(convertedData, axiosPrivate, collection); // post entry to server
      setMessage(responseCreate.message);
      const responseGetAll = await getAllGalleryPhotoEntries(axiosPrivate, auth.userID, 'all'); // fetch entries, update state  
      setData(responseGetAll.photoEntries); // store entries in state
      setFormData(undefined); // reset form 
      toggleModalHandler(operation);
    } catch (error) {  }
  }
  // submit form for createPhoto (update new photo entry)
  const updatePhotoEntryHandler = async (e, formData) => {
    e.preventDefault();
    try {
    // TODO: add loader
      const convertedData = convertFormData(formData); 
      const responseUpdate = await updatePhotoEntry(activeID._id, convertedData, axiosPrivate, collection);
      setMessage(responseUpdate.message);
      const responseGetAll = await getAllGalleryPhotoEntries(axiosPrivate, auth.userID, 'all'); // fetch entries, update state  
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
  // create photo entry
  const createPhotoEntryModal = (  
    <Form 
      operation = {operation}
      submit={createPhotoEntryHandler}
      customStyle='image-create-update'
    >
      { buildInputFields(createPhoto).map(elem => (
        <Input 
          key={elem.name} 
          name={elem.name} 
          label={true}
          customStyle='image-create-update'
        />  
      )) }
    </Form>
  )
  // update photo entry
  const updatePhotoEntryModal = (
    <Form 
      operation={operation}
      submit={updatePhotoEntryHandler}
      customStyle='image-create-update'
    > 
      { formData && buildInputFields(updatePhoto).map(elem => (
        <Input 
          key={elem.name} 
          name={elem.name} 
          label={true}
          customStyle='image-create-update'
        /> 
      )) }
    </Form>
  )
  // view entry's photo file
  const fullScreenViewModal = <FullScreenView/>;
  // view map if entry has coordinates 
  const mapViewModal = <MapView/>

  // RENDER MODALS CONDITIONALLY 
  let renderModal; 
  let modalTitle = operation ? MODAL_TITLES[operation] : '';
  switch(operation) {
    case OPERATIONS.CREATE_PHOTO:
      renderModal = createPhotoEntryModal;
      break; 
    case OPERATIONS.UPDATE_PHOTO:
      renderModal = updatePhotoEntryModal;
      break; 
    case OPERATIONS.FULLSCREEN_VIEW:
      renderModal = fullScreenViewModal;
      break; 
    case OPERATIONS.MAP_VIEW:
      renderModal = mapViewModal;
      break; 
    default:
      renderModal = <p> couldn't display modal </p>;
  }

  return (
    <div className='shared-modal-backdrop'>
      <div className='shared-modal'>
        {/* modal header */}
        <div className='shared-modal-header'> 
          <ModalHeader title={modalTitle} operation={operation} />
        </div>
        {/* modal content */}
        <div className='shared-modal-content'>
        {formData && renderModal}
        </div>
      </div>
    </div>
  )
}