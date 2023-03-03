import React, {useState, useEffect} from 'react'
import '../Shared.css'
import Form from '../UI/Form'
import Input from '../UI/Input'
import FullScreenView from '../Modals/FullScreenView'
import MapView from '../Modals/MapView'
import {useModalContext} from '../contexts/ToggleModalContext'
import {useFormContext} from '../contexts/FormContext'
import {convertFormData} from '../../helper/convertFormData'
import {postImageEntry, getAllImageEntries, updateImageEntry} from '../../helper/axiosRequests'
import {buildInputFields} from '../../helper/buildInputFields'
import {createImage, updateImage, OPERATIONS, MODAL_TITLES} from '../../helper/dataStorage'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import ModalHeader from '../Modals/ModalHeader'



export default function PhotoEntryModal({operation, collection}) {
  // CONTEXTS
  const {activeID, toggleModalHandler} = useModalContext();
  const {formData, setFormData, setData, setMessage} = useFormContext();
  // HOOK
  const axiosPrivate = useAxiosPrivate();
  // STATE
  const [isFormReady, setIsFormReady] = useState(false);
  // EFFECTS
  useEffect(() => {
    // find initial value to set up modals with forms based on operation value
    let initialValue;
    switch(operation) { 
      case OPERATIONS.CREATE_IMAGE:
        initialValue = createImage;
        break;
      case OPERATIONS.UPDATE_IMAGE:
        initialValue = updateImage;
        break;
      default: 
        initialValue = createImage;
    }
    setFormData(initialValue);
  }, [operation, setFormData])

  // populate form with active id on first render
  useEffect(() => {
    if(operation !== OPERATIONS.UPDATE_IMAGE) return;
    if(!formData || formData !== updateImage) return;
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
  }, [formData, operation, isFormReady, setIsFormReady]) // setIsFormReady
  // HANDLERS
  // submit form for createImage (create new image entry)
  const createImageEntryHandler = async(e, formData) => {
    e.preventDefault();
    try {
      const convertedData = convertFormData(formData); // simplyfy data before sending request  
      const responseCreate = await postImageEntry(convertedData, axiosPrivate, collection); // post entry to server
      setMessage(responseCreate.message);
      const responseGetAll = await getAllImageEntries(axiosPrivate, collection); // fetch entries, update state  
      setData(responseGetAll.imageEntries); // store entries in state
      setFormData(undefined); // reset form 
      toggleModalHandler(operation);
    } catch (error) {  }
  }
  // submit form for createImage (update new image entry)
  const updateImageEntryHandler = async (e, formData) => {
    e.preventDefault();
    try {
      const convertedData = convertFormData(formData); 
      const responseUpdate = await updateImageEntry(activeID._id, convertedData, axiosPrivate, collection);
      setMessage(responseUpdate.message);
      const responseGetAll = await getAllImageEntries(axiosPrivate, collection); // fetch entries, update state  
      setData(responseGetAll.imageEntries); // store entries in state
      // if succes post request -> reset form 
      setFormData(undefined);
      toggleModalHandler(operation);
    } catch(error) {
      // TODO: error handling
    }
  }
  // RENDERED ELEMENTS  
  // create image entry
  const createImageEntryModal = (  
    <Form 
      operation = {operation}
      submit={createImageEntryHandler}
      customStyle='image-create-update'
    >
      { buildInputFields(createImage).map(elem => (
        <Input 
          key={elem.name} 
          name={elem.name} 
          label={true}
          customStyle='image-create-update'
        />  
      )) }
    </Form>
  )
  // update image entry
  const updateImageEntryModal = (
    <Form 
      operation={operation}
      submit={updateImageEntryHandler}
      customStyle='image-create-update'
    > 
      { formData && buildInputFields(updateImage).map(elem => (
        <Input 
          key={elem.name} 
          name={elem.name} 
          label={true}
          customStyle='image-create-update'
        /> 
      )) }
    </Form>
  )
  // view image entry's image
  const fullScreenViewModal = <FullScreenView/>;
  // view map if entry has coordinates 
  const mapViewModal = <MapView/>
  // RENDER MODALS CONDITIONALLY 
  let renderModal; 
  let modalTitle = operation ? MODAL_TITLES[operation] : '';
  switch(operation) {
    case OPERATIONS.CREATE_IMAGE:
      renderModal = createImageEntryModal;
      break; 
    case OPERATIONS.UPDATE_IMAGE:
      renderModal = updateImageEntryModal;
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