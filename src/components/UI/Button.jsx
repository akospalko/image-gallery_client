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
    case 'control-panel-edit': // admin/editor -> edit buttons (edit, delete, view, map) 
      buttonStyle = 'button-control-panel-edit';
      break;
    case 'control-panel-view': // user -> view buttons (like, map, view, info) 
      buttonStyle = 'button-control-panel-view';
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