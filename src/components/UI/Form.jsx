// reusable form
import React from 'react'
import './Form.css'
import Button from './Button'
import {useModalContext} from '../contexts/ToggleModalContext'
import {useFormContext} from '../contexts/FormContext'
import {statusMessages} from '../../helper/dataStorage'

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
  // BUTTONS
  // rendered button element
  let buttonElement;
  // image entry (create/udate)
  const imageEntryButton = (
    <div className='form-button-container'> 
      { toggleModalHandler ?  
        <Button 
          customStyle='form-submit' 
          type='button' 
          clicked={() => {
            setFormData(undefined);
            setImageFile(statusMessages.UPLOAD_IMAGE_FILE_INITIAL);
            toggleModalHandler(operation);
          }}
        > Cancel 
        </Button> : null
      }      
      <Button 
        customStyle='form-submit' 
        type='submit' 
        clicked={ (e) => {
            submit(e, formData); 
            setImageFile(statusMessages.UPLOAD_IMAGE_FILE_INITIAL);
        }}
      > Submit </Button>      
    </div> 
  );
  // authentication (login/register)
  const authenticationButton = (
    <div className='form-button-container form-button-container--centered'> 
      <Button 
        customStyle='form-submit' 
        type='submit' 
        clicked={(e) => {submit(e, formData)}}
      > Submit 
      </Button>      
    </div> 
  )
  // decide rendered button element
  switch(operation) {
    case 'createImage': 
    case 'updateImage': 
      buttonElement = imageEntryButton;
      break;
    case 'login':
    case 'register':
      buttonElement = authenticationButton;
      break;
    default: 
      buttonElement = <Button> Default </Button>;
  }

  return (
    <>
      <form className={formStyle}>
        {/* form */}
        <div className='form-form-container'> 
          {title && <h1> {title} </h1>}
          {children} 
        </div>
        {/* button */}
        {buttonElement}
      </form>
    </>
  )
}