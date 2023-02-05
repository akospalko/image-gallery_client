import React from 'react'
import Form from '../UI/Form'
import Input from '../UI/Input'
import {createImage, updateImage} from '../../helper/dataStorage'
import './ImageEntryModal.css'
import {buildInputFields} from '../../helper/buildInputFields'
import {postImageEntry} from '../../helper/axiosRequests'
import {useModalContext} from '../contexts/ToggleModalContext'
import ViewImage from './viewImage'

export default function ImageEntryModal({operation}) {
  const {isSubmittingForm, setIsSubmittingForm} = useModalContext();
  console.log('submit form.',isSubmittingForm)

  // SUBMIT
  // submit form for createImage (create new image entry)
  const createImageEntryHandler = async(e, form) => {
    e.preventDefault();
    setIsSubmittingForm(true);
    console.log('create image entry');
    console.log('submitted values:', form);
    await postImageEntry(form);
    setIsSubmittingForm(false);
  }
  //submit form for createImage (update new image entry)
  const updateImageEntryHandler = (e, form) => {
    e.preventDefault();
    setIsSubmittingForm(true);
    console.log('update image entry');
    console.log('submitted values:', form);
    setIsSubmittingForm(false);
  }

  //types of modals that we render based on the suplplied operation value
  const createImageEntryModal = (  
    <Form 
      title={'Create Image Entry'}
      operation = {operation}
      submit={createImageEntryHandler}
      initialValues={createImage}
      customStyle='image-create-update'
    >
      { buildInputFields(createImage).map(elem => (
        <Input 
          key={elem.name} 
          name={elem.name} 
          // label={true}
          customStyle='image-create-update'
        />  
      )) }
    </Form>
  )
  const updateImageEntryModal = (
    <Form 
      title={'Update Image Entry'}
      operation={operation}
      submit={updateImageEntryHandler}
      initialValues={updateImage}
      style='image-create-update'
    > 
      { buildInputFields(updateImage).map(elem => (
        <Input 
          key={elem.name} 
          name={elem.name} 
          label={true}
          customStyle='image-create-update'
        /> 
      )) }
    </Form>
  )

  const viewImageModal = <ViewImage/>;
  // render modal based on the supplied operation value
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
  }

  return (
    <div className='modal-container'>
      { operation && renderModal }
    </div>
  )
}

