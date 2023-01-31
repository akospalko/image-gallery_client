import React from 'react'
import Form from '../UI/Form'
import Input from '../UI/Input'
import { createImage, updateImage } from '../../helper/dataStorage'
import './ImageEntryModal.css'
import { buildInputFields } from '../../helper/buildInputFields'

export default function ImageEntryModal({operation}) {
  //submit form for createImage (create new image entry)
  const createImageEntryHandler = (e, form) => {
    e.preventDefault();
    console.log('create image entry');
    console.log('submitted values:', form);
  }
  //submit form for createImage (update new image entry)
  const updateImageEntryHandler = (e, form) => {
    e.preventDefault();
    console.log('update image entry');
    console.log('submitted values:', form);
  }
  return (
    <div className='modal-container'>
      { operation && operation === 'createImage' ?  
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
      :
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

      }
    </div>
  )
}