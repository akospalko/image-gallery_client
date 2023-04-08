// reusable input field component 
import React from 'react'
import './Input.css'
import PhotoUpload from './PhotoUpload'
import DatePicker from './DatePicker'
import {useFormContext} from '../contexts/FormContext'

const Input = (props) => {
  // PROPS
  const {label, name, inputStyle, textareaStyle, labelStyle } = props;
  // CONTEXT
  const {formData, inputChangeHandler} = useFormContext();
  // ELEMENTS
  // label 
  const renderedLabel = (label && formData[name]?.label ? 
    <label className={`label-default ${labelStyle}`}> {formData[name]?.label} </label>
  : null ) 
  // input fields
  const input = (
    <input 
      className={`input-default ${inputStyle}`}
      name={name} 
      type={formData[name]?.type} 
      placeholder={formData[name]?.placeholder}
      onChange={inputChangeHandler}
      value={formData[name]?.value || ''}
      disabled={formData[name]?.disabled}
    /> )
  const email = (
    <input 
      className={`input-default ${inputStyle}`}
      name={name} 
      type={formData[name]?.type} 
      placeholder={formData[name]?.placeholder}
      onChange={inputChangeHandler}
      value={formData[name]?.value || ''}
      disabled={formData[name]?.disabled}
    /> )
  const password = (
    <input 
      className={`input-default ${inputStyle}`}
      name={name} 
      type={formData[name]?.type} 
      placeholder={formData[name]?.placeholder}
      onChange={inputChangeHandler}
      value={formData[name]?.value || ''}
      disabled={formData[name]?.disabled}
    /> )
  const textarea = ( 
    <textarea 
      className={`textarea-default ${textareaStyle}`}
      name={name} 
      placeholder={formData[name]?.placeholder}
      onChange={inputChangeHandler}
      value={formData[name]?.value || ''}
    /> )
  const file = <PhotoUpload />
  const date = <DatePicker />
  // CONDITIONAL RENDER INPUT ELEMENTS
  let renderedElement; 
  switch(formData[name]?.field) {
    case 'input':
      renderedElement = input; 
      break;
    case 'email':
      renderedElement = email; 
      break;
    case 'password':
      renderedElement = password; 
      break;
    case 'textarea':
      renderedElement = textarea; 
      break;
    case 'file':
      renderedElement = file; 
      break;
    case 'date':
      renderedElement = date; 
      break;
    default:
      renderedElement = input; 
  }

  return(
    <>
      {renderedLabel}
      {formData && renderedElement} 
    </>
  );
}

export default Input;