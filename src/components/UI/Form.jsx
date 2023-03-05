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
  const {formData, setFormData, setImageFile} = useFormContext();
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
  // image entry (create/udate)
  const imageEntryButton =  () => (
    <div className='form-button-container'> 
      { toggleModalHandler ?  
        <Button 
          customStyle={'form-submit'} 
          type='button' 
          clicked={() => {
            setFormData(undefined);
            setImageFile(statusMessages.UPLOAD_IMAGE_FILE_INITIAL);
            toggleModalHandler(operation);
          }}
        > Cancel 
        </Button> : null }      
      <Button 
        customStyle={'form-submit'}
        type='submit' 
        clicked={ (e) => {
            submit(e, formData); 
            setImageFile(statusMessages.UPLOAD_IMAGE_FILE_INITIAL);
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
    case OPERATIONS.CREATE_IMAGE: 
    case OPERATIONS.UPDATE_IMAGE: 
      buttonElement = imageEntryButton;
      break;
    case OPERATIONS.LOGIN:
      buttonElement = authenticationButton;
      break;
    case OPERATIONS.REGISTER:
      buttonElement = authenticationButton;
      break;
    default: 
      buttonElement = <Button> Default </Button>;
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