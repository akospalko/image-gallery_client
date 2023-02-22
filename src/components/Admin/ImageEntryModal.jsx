import React, {useState, useEffect} from 'react'
import '../Shared.css'
import Form from '../UI/Form'
import Input from '../UI/Input'
import ViewImage from '../ViewImage'
import ViewMap from '../ViewMap'
import {useModalContext} from '../contexts/ToggleModalContext'
import {useFormContext} from '../contexts/FormContext'
import {convertFormData} from '../../helper/convertFormData'
import {postImageEntry, getAllImageEntries, updateImageEntry} from '../../helper/axiosRequests'
import {buildInputFields} from '../../helper/buildInputFields'
import {createImage, updateImage} from '../../helper/dataStorage'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

export default function ImageEntryModal({operation}) {
  // CONTEXTS
  const {activeID} = useModalContext();
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
      case 'createImage':
        initialValue = createImage;
        break;
      case 'updateImage':
        initialValue = updateImage;
        break;
      default: 
        initialValue = createImage;
    }
    setFormData(initialValue);
  }, [operation, setFormData])

  // populate form with active id on first render
  useEffect(() => {
    if(operation !== 'updateImage') return;
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
    const convertedData = convertFormData(formData); // simplyfy data before sending request  
    const responseCreate = await postImageEntry(convertedData, axiosPrivate); // post entry to server
    setMessage(responseCreate.message);
    const responseGetAll = await getAllImageEntries(axiosPrivate); // fetch entries, update state  
    setData(responseGetAll.imageEntries); // store entries in state
    // reset form 
    setFormData(undefined);
  }
  // submit form for createImage (update new image entry)
  const updateImageEntryHandler = async (e, formData) => {
    e.preventDefault();
    const convertedData = convertFormData(formData); 
    const responseUpdate = await updateImageEntry(activeID._id, convertedData, axiosPrivate);
    setMessage(responseUpdate.message);
    const responseGetAll = await getAllImageEntries(axiosPrivate); // fetch entries, update state  
    setData(responseGetAll.imageEntries); // store entries in state
    // if succes post request -> reset form 
    setFormData(undefined);
  }
  // RENDERED ELEMENTS  
  // create image entry
  const createImageEntryModal = (  
    <Form 
      title={'Create Image Entry'}
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
      title={'Update Image Entry'}
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
  const viewImageModal = <ViewImage/>;
  // view map if entry has coordinates 
  const viewMapModal = <ViewMap/>
  // RENDER MODALS CONDITIONALLY 
  let renderModal; 
  switch(operation) {
    case 'createImage':
      renderModal = createImageEntryModal;
      break; 
    case 'updateImage':
      renderModal = updateImageEntryModal;
      break; 
    case 'viewImage':
      renderModal = viewImageModal;
      break; 
    case 'viewMap':
      renderModal = viewMapModal;
      break; 
    default:
      renderModal = <p> couldn't display modal </p>;
  }

  return (
    <div className='shared-modal-container'>
      {formData && renderModal}
    </div>
  )
}