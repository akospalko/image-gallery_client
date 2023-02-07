// reusable buttons
import React from 'react'
import './Button.css'

export default function Button(props) {
  const {children, customStyle, clicked, type, diasbled} = props;
  
  //add styling to button based on passed type (form, add new img, etc) 
  let buttonStyle = 'button-default';
  // 'image-update'
  // 'image-delete', etc...
  switch(customStyle) {
    case 'image-create-update':
      buttonStyle = 'button-image-create-update';
      break;
    case 'image-control-panel':
      buttonStyle = 'button-image-control-panel';
      break;
    case 'form-submit':
      buttonStyle = 'button-form-submit';
      break;
    case 'view-image-close':
      buttonStyle = 'button-view-image-close';
      break;
    default:
      buttonStyle = 'button-default'
  } 

  return (
  <>
   <button 
      type={type}
      className={buttonStyle}
      onClick={clicked}
      disabled= {diasbled}
    > {children}  
    </button>
  </>
  )
}