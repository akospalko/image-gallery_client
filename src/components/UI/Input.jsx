// a component to create reusable input forms 
import React, {useContext} from 'react';
import './Input.css'
import {FormContext} from './Form';
import ImageUpload from './ImageUpload';

const Input = (props) => {
  const {label, name, customStyle } = props;
  const {form, inputChangeHandler} = useContext(FormContext);
  
  //conditional styling input & textarea
  let inputStyle = 'input-default';
  let textareaStyle = 'textarea-default';

  switch(customStyle) {
    case 'image-new-update':
      inputStyle = 'input-image-new-update';
      textareaStyle = 'textarea-image-new-update';
      break;
    default:
      inputStyle = 'input-default';
      textareaStyle = 'textarea-default';
  } 
    
  //render label conditionaly
  const renderedLabel = (label ? 
    <label> {name} </label>
  : null ) 

  //input field types
  const input = (
    <input 
      className={inputStyle}
      name={name} 
      type={form[name].type} 
      placeholder={form[name].placeholder}
      onChange={inputChangeHandler}
      value={form[name].value}
      disabled={form[name].disabled}
    /> )
  const textarea = ( 
    <textarea 
      className={ textareaStyle }
      name={name} 
      placeholder={form[name].placeholder}
      onChange={inputChangeHandler}
      value={form[name].value}
    /> )
  const file = <ImageUpload />

  //decide input field type to render
  let element; 
  switch(form[name].field) {
    case 'input':
      element = input; 
      break;
    case 'textarea':
      element = textarea; 
      break;
    case 'file':
      element = file; 
      break;
    default:
      element = input; 
  }

  return(
    <>
      {renderedLabel}
      {element} 
    </>
  );
}

export default Input;