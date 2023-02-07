// reusable form
import React from 'react'
import './Form.css'
import Button from './Button'
import {useModalContext} from '../contexts/ToggleModalContext'
import { useFormContext } from '../contexts/FormContext'
import { statusMessages } from '../../helper/dataStorage'

export default function Form(props) {
  // PROPS
  const {
    children, 
    submit = () => {}, 
    customStyle,
    title,
    operation} = props;
  const {toggleModalHandler = () => {}} = useModalContext();
  const {formData, setFormData, setImageFile} = useFormContext();
  // CONDITIONAL STYLING
  let formStyle = 'form-default';
  switch(customStyle) {
    case 'image-create-update':
      formStyle = 'form-image-create-update';
      break;
    default:
      formStyle = 'form-default';
  } 

  return (
    <>
      <form className={formStyle}>
        <div className='form-form-container'> 
          <h1> {title} </h1>
          {children} 
        </div>
        <div className='form-button-container'> 
          { toggleModalHandler ?  
            <Button 
              customStyle='form-submit' 
              type='button' 
              clicked={() => {
                setFormData(undefined);
                setImageFile(statusMessages.UPLOAD_IMAGE_FILE_INITIAL)
                toggleModalHandler(operation)}}
            > Cancel 
            </Button> : null }      
            <Button 
              customStyle='form-submit' 
              type='submit' 
              clicked={
                (e) => {
                  submit(e, formData); 
                  setImageFile(statusMessages.UPLOAD_IMAGE_FILE_INITIAL)
                  toggleModalHandler(operation);
                }
              }
            > Submit 
            </Button>      
        </div>
      </form>
    </>
  )
}