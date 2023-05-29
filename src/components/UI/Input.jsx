// TODO: add required check
// TODO: add state to store validity: 1. form validity, 2. input field validity
// TODO: add input error message 
// Reusable input component 
import React from 'react';
import './Input.css';
import FileUpload from './FileUpload';
import DatePicker from './DatePicker';
import { useFormContext } from '../contexts/FormContext';
import Button from './Button';

const Input = (props) => {
  // PROPS
  const {label, name, inputStyle, textareaStyle, labelStyle,  } = props;
  // CONTEXT
  const {formData, inputChangeHandler, validationMessages, showPassword, togglePasswordVisibility} = useFormContext();
  // ELEMENTS
  // label 
  const labelWithRequiredMarkerStyle = formData[name]?.required ? 'label-with-required-marker' : ''; 
  const renderedLabel = (label && formData[name]?.label ? 
    <label className={`label-default ${labelStyle} ${labelWithRequiredMarkerStyle}`}> {formData[name]?.label} </label>
  : null ) 

  // error message container
  const renderedErrorMessage = (  
  <div className='validation-message'> 
    { validationMessages?.[name]?.message && <span> {validationMessages?.[name]?.message} </span> }
  </div>
  );
  
  // input fields: text, number, email
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
    /> 
  )
  // input fields: password with toggle visibility 
  const customPassword = (
    <div className={`input-password-container`}>
      <input 
        className={`input-content`}
        name={name} 
        type={showPassword ? 'text' : formData[name]?.type} // text - type
        placeholder={formData[name]?.placeholder}
        onChange={inputChangeHandler}
        value={formData[name]?.value || ''}
        disabled={formData[name]?.disabled}
        maxLength={formData[name]?.maxLength + 1 || null}
      /> 
      {/* password visibility toggler */}
      <div className='input-password-toggler' onClick={togglePasswordVisibility}>
        <span> 
          {showPassword ? 'Hide' : 'Show'}
        </span>
      </div>
    </div>
  )
  const textarea = ( 
    <textarea 
      className={`textarea-default ${textareaStyle}`}
      name={name} 
      placeholder={formData[name]?.placeholder}
      onChange={inputChangeHandler}
      value={formData[name]?.value || ''}
      maxLength={formData[name]?.maxLength || null}
    /> )
  const file = <FileUpload />
  const date = <DatePicker />
  // CONDITIONAL RENDER INPUT ELEMENTS
  let renderedInput; 
  switch(formData[name]?.type) {
    case 'text':
    case 'number':
    case 'email':
      renderedInput = input; 
      break;
    case 'password':
      renderedInput = customPassword; 
      break;
    case 'textarea':
      renderedInput = textarea; 
      break;
    case 'file':
      renderedInput = file; 
      break;
    case 'date':
      renderedInput = date; 
      break;
    default:
      renderedInput = input; 
  }

  
  return(
    <>
      {renderedLabel}
      {formData && renderedInput} 
      {renderedErrorMessage}
    </>
  );
}

export default Input;