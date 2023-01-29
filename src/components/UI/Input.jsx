// a component to create reusable input forms 
import React, {useContext} from 'react';
import './Input.css'
import {FormContext} from './Form';

const Input = (props) => {
  const {label, name, customStyle } = props;
  const{form, handleFormChange} = useContext(FormContext);
  
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
  const renderedLabel = label ? (
    <label> {name} </label>
  ): null  
  //input field type (input || textarea)
  const element = form[name]?.type ? (
    <input 
      className={inputStyle}
      name={name} 
      type={form[name].type} 
      placeholder={form[name].placeholder}
      onChange={handleFormChange}
      value={form[name].value}
    />
  ) : (
      <textarea 
        className={ textareaStyle }
        name={name} 
        placeholder={form[name].placeholder}
        onChange={handleFormChange}
        value={form[name].value}
      />
  );

  return(
    <>
      {renderedLabel}
      {element} 
    </>
  );
}

export default Input;