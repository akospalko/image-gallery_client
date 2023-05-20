// TODO: add required check
// TODO: add state to store validity: 1. form validity, 2. input field validity
// TODO: add input error message 
// Reusable input component 
import React from 'react';
import './Input.css';
import FileUpload from './FileUpload';
import DatePicker from './DatePicker';
import { useFormContext } from '../contexts/FormContext';

const Input = (props) => {
  // PROPS
  const {label, name, inputStyle, textareaStyle, labelStyle } = props;
  // CONTEXT
  const {formData, inputChangeHandler, validationMessages} = useFormContext();
  // ELEMENTS
  // label 
  const renderedLabel = (label && formData[name]?.label ? 
    <label className={`label-default ${labelStyle}`}> {formData[name]?.label} </label>
  : null ) 
  // error message container
  const renderedErrorMessage = (  
  <div className='validation-message'> 
    { validationMessages?.[name] && <span> {validationMessages?.[name]} </span> }
  </div>
  );
  
  // basic input fields: text, number, email, password
  const input = (
    <input 
      className={`input-default ${inputStyle}`}
      name={name} 
      type={formData[name]?.type} 
      placeholder={formData[name]?.placeholder}
      onChange={inputChangeHandler}
      value={formData[name]?.value || ''}
      disabled={formData[name]?.disabled}
      maxLength={formData[name]?.maxLength + 1 || null}
    /> )
  const textarea = ( 
    <textarea 
      className={`textarea-default ${textareaStyle}`}
      name={name} 
      placeholder={formData[name]?.placeholder}
      onChange={inputChangeHandler}
      value={formData[name]?.value || ''}
      maxLength={formData[name]?.maxLength + 1 || null}
    /> )
  const file = <FileUpload />
  const date = <DatePicker />
  // CONDITIONAL RENDER INPUT ELEMENTS
  let renderedElement; 
  switch(formData[name]?.type) {
    case 'text':
    case 'number':
    case 'email':
    case 'password':
      renderedElement = input; 
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
      {renderedErrorMessage}
    </>
  );
}

export default Input;