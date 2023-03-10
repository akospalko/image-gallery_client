// reusable input fields 
import React from 'react'
import './Input.css'
import PhotoUpload from './PhotoUpload'
import DatePicker from './DatePicker'
import {useFormContext} from '../contexts/FormContext'

const Input = (props) => {
  // PROPS
  const {label, name, customStyle } = props;
  // CONTEXT
  const {formData, inputChangeHandler} = useFormContext();
  // CONDITIONAL STYLING
  // input & textarea
  let inputStyle;
  let textareaStyle;
  let labelStyle; 
  switch(customStyle) {
    case 'image-create-update':
      inputStyle = 'input-image-create-update';
      textareaStyle = 'textarea-image-create-update';
      break;
    case 'authentication':
      inputStyle = 'input-authentication';
      // textareaStyle = ''; // default for now
      break;
    default:
      inputStyle = 'input-default';
      textareaStyle = 'textarea-default';
  } 
  // RENDERED ELEMENTS
  // label 
  const renderedLabel = (label ? 
    <label className={labelStyle}> {formData[name]?.label} </label>
  : null ) 
  // input fields
  const input = (
    <input 
      className={inputStyle}
      name={name} 
      type={formData[name]?.type} 
      placeholder={formData[name]?.placeholder}
      onChange={inputChangeHandler}
      value={formData[name]?.value || ''}
      disabled={formData[name]?.disabled}
    /> )
  const email = (
    <input 
      className={inputStyle}
      name={name} 
      type={formData[name]?.type} 
      placeholder={formData[name]?.placeholder}
      onChange={inputChangeHandler}
      value={formData[name]?.value || ''}
      disabled={formData[name]?.disabled}
    /> )
  const password = (
    <input 
      className={inputStyle}
      name={name} 
      type={formData[name]?.type} 
      placeholder={formData[name]?.placeholder}
      onChange={inputChangeHandler}
      value={formData[name]?.value || ''}
      disabled={formData[name]?.disabled}
    /> )
  const textarea = ( 
    <textarea 
      className={textareaStyle}
      name={name} 
      placeholder={formData[name]?.placeholder}
      onChange={inputChangeHandler}
      value={formData[name]?.value || ''}
    /> )
  const file = <PhotoUpload />
  const date = <DatePicker />
  //decide input field type to render
  let element; 
  switch(formData[name]?.field) {
    case 'input':
      element = input; 
      break;
    case 'email':
      element = email; 
      break;
    case 'password':
      element = password; 
      break;
    case 'textarea':
      element = textarea; 
      break;
    case 'file':
      element = file; 
      break;
    case 'date':
      element = date; 
      break;
    default:
      element = input; 
  }

  return(
    <>
      {renderedLabel}
      {formData && element} 
    </>
  );
}

export default Input;