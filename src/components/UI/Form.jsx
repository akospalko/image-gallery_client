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
    title, // title for non-modal forms
    submit = () => {}, 
    customStyle,
    operation} = props;
  const {toggleModalHandler} = useModalContext();
  const {formData, setFormData, setPhotoFile} = useFormContext();
  // CONDITIONAL STYLING
  let formStyle;
  let formTitleStyle;
  switch(customStyle) {
    case 'image-create-update':
      formStyle = 'form-image-create-update';
      formTitleStyle = 'form-image-create-update--title'
      break;
    case 'authentication':
      formStyle = 'form-authentication';
      formTitleStyle = 'form-authentication--title'
      break;
    default:
      formStyle = 'form-default';
      formTitleStyle = 'form-default--title'; 
  } 
  // BUTTONS
  // rendered button element
  let buttonElement;
  // photo entry (create/udate)
  const photoEntryButton =  () => (
    <div className='form-button-container'> 
      { toggleModalHandler ?  
        <Button 
          customStyle={'form-submit'} 
          type='button' 
          clicked={() => {
            setFormData(undefined);
            setPhotoFile(statusMessages.UPLOAD_PHOTO_FILE_INITIAL);
            toggleModalHandler(operation);
          }}
        > Cancel 
        </Button> : null }      
      <Button 
        customStyle={'form-submit'}
        type='submit' 
        clicked={ (e) => {
            submit(e, formData); 
            setPhotoFile(statusMessages.UPLOAD_PHOTO_FILE_INITIAL);
        }}
      > Submit </Button>      
    </div> 
  );
  // authentication (login/register)
  const authenticationButton = () => {
    // find out user title 
    let buttonTitle;
    if(operation === OPERATIONS.LOGIN) {buttonTitle = 'Login'}
    else if(operation === OPERATIONS.REGISTER) {buttonTitle = 'Register'}
    else if (operation === OPERATIONS.PASSWORD_RESET_SEND_EMAIL_LINK) {buttonTitle = 'Reset'}
    else if (operation === OPERATIONS.PASSWORD_RESET_SAVE_NEW_PASSWORD) {buttonTitle = 'Save'}
    else {buttonTitle = 'Submit'}
    return <div className='form-button-container form-button-container--centered form-button-container--authentication'> 
      <Button 
        customStyle='authentication' 
        type='submit' 
        clicked={(e) => {submit(e, formData)}}
      > {buttonTitle}
      </Button>      
    </div> 
  }
  // conditionally rendere button elements
  switch(operation) {
    case OPERATIONS.CREATE_PHOTO: 
    case OPERATIONS.UPDATE_PHOTO: 
      buttonElement = photoEntryButton;
      break;
    case OPERATIONS.LOGIN:
    case OPERATIONS.REGISTER:
    case OPERATIONS.PASSWORD_RESET_SEND_EMAIL_LINK:
    case OPERATIONS.PASSWORD_RESET_SAVE_NEW_PASSWORD:
      buttonElement = authenticationButton;
      break;
    default: 
      buttonElement = (() => <Button> Default </Button>);
  }


  return (
    <>
      <form className={formStyle}>
        {/* title */}
        <div className={formTitleStyle}>
          {title && <h2> {title} </h2>}
        </div>
        {/* form */}
        {/* <div className='form-form-container'>  */}
        {children} 
        {/* </div> */}
        {/* button */}
        {buttonElement()}
      </form>
    </>
  )
}