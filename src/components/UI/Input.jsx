// Reusable input component 
import React from 'react';
import './Input.css';
import FileUpload from './FileUpload';
import DatePicker from './DatePicker';
import { useFormContext } from '../contexts/FormContext';
import { OpenEyeIcon, CloseEyeIcon } from '../SVG/Icons';

const Input = (props) => {
  // PROPS
  const { label, name, textareaStyle, labelStyle, validationStyle } = props;
 
  // CONTEXT
  const { formData, inputChangeHandler, validationMessages, showPassword, togglePasswordVisibility } = useFormContext();
  // ELEMENTS
  // label 
  const labelWithRequiredMarkerStyle = formData[name]?.required ? 'label-with-required-marker' : ''; 
  const renderedLabel = (label && formData[name]?.label ? 
    <label className={ `label-default ${ labelStyle } ${ labelWithRequiredMarkerStyle}` }> { formData[name]?.label } </label>
  : null ) 
  // error message container
  const renderedErrorMessage = (  
  <div className={ `validation-message ${ validationStyle }` } > 
    { validationMessages?.[name]?.message && <span> {validationMessages?.[name]?.message} </span> }
  </div>
  );
  // input fields: text, number, email, password
  const input = (
    <div className='input-container'>
      <input 
        className={ `input-content ${ formData[name]?.disabled ? 'input-content--disabled' : '' }` }
        name={ name }
        type={ showPassword[name] ? 'text' : formData[name]?.type } // text - type
        placeholder={ formData[name]?.placeholder }
        onChange={ inputChangeHandler }
        value={ formData[name]?.value || '' }
        disabled={ formData[name]?.disabled }
        maxLength={ formData[name]?.maxLength + 1 || null }
      /> 
      { /* input field icon */ }
      { formData[name]?.icon && <div className='input-icon'> { formData[name]?.icon } </div> }
    </div>
  )
  // custom input field: contains an icon (optional: clickable) inside
  const inputWithIcon = (
    <div className='input-container'>
      <input 
        className='input-content'
        name={ name } 
        type={ showPassword[name] ? 'text' : formData[name]?.type } // text - type
        placeholder={ formData[name]?.placeholder }
        onChange={ inputChangeHandler }
        value={ formData[name]?.value || '' }
        disabled={ formData[name]?.disabled }
        maxLength={ formData[name]?.maxLength + 1 || null }
      /> 
      { /* password visibility toggler */ }
      <div className='input-icon' onClick={ (e) => togglePasswordVisibility(e, name) }>
        <span> { showPassword[name] ? 
          <OpenEyeIcon height='var(--input-icon-dimension)' width='var(--input-icon-dimension)' fill='var(--text-color--medium-emphasis)' /> 
          : 
          <CloseEyeIcon height='var(--input-icon-dimension)' width='var(--input-icon-dimension)' fill='var(--text-color--medium-emphasis)' /> } 
        </span>
      </div>
    </div>
  )

  const textarea = ( 
    <textarea 
      className={ `textarea-default ${ textareaStyle }` }
      name={ name } 
      placeholder={ formData[name]?.placeholder }
      onChange={ inputChangeHandler }
      value={ formData[name]?.value || '' }
      maxLength={ formData[name]?.maxLength || null }
    /> 
  )

  const file = <FileUpload name={ name } />
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
      renderedInput = inputWithIcon; 
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
      { renderedLabel }
      { formData && renderedInput } 
      { renderedErrorMessage }
    </>
  );
}

export default Input;