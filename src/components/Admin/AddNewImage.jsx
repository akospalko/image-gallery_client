import React from 'react'
import Form from '../UI/Form'
import Input from '../UI/Input'
import { newImage } from '../../helper/dataStorage'
import './AddNewImage.css'

export default function AddNewImage({toggleHandler}) {
  //submit form
  const submitFormHandler = (e, form) => {
    e.preventDefault();
    console.log('form is submitted!');
    console.log('submitted values:', form);
  }
  return (
    <div className='modal-container'>
      <Form 
        submit={submitFormHandler}
        initialValues={newImage}
        style={'image-new-update'}
      >
        <Input name='title' customStyle={'image-new-update'}/> 
        <Input name='author' customStyle={'image-new-update'}/> 
        <Input name='description' customStyle={'image-new-update'}/> 
      </Form>
    </div>
  )
}
