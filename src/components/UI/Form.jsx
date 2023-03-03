// reusable form
import React from 'react'
import './Form.css'
import Button from './Button'
import {useModalContext} from '../contexts/ToggleModalContext'
import {useFormContext} from '../contexts/FormContext'
import {statusMessages, OPERATIONS} from '../../helper/dataStorage'

export default function Form(props) {
  // PROPS
  const {
    children, 
    submit = () => {}, 
    customStyle,
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
    case OPERATIONS.CREATE_IMAGE: 
    case OPERATIONS.UPDATE_IMAGE: 
      buttonElement = imageEntryButton;
      break;
    case OPERATIONS.LOGIN:
    case OPERATIONS.REGISTER:
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
          {children} 
        </div>
        {/* button */}
        {buttonElement}
      </form>
    </>
  )
}