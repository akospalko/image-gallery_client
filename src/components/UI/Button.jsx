//custom reusable button
import React from 'react'
import './Button.css'

export default function Button({children, clicked, type, diasbled}) {
  
  //add styling to button based on passed type (form, add new img, etc) 
  let buttonStyle = 'button-default';
  // 'image-update'
  // 'image-delete', etc...
  switch(type) {
    case 'image-new':
      buttonStyle = 'button-image-new'
      break;
    default:
      buttonStyle = 'button-default'
  } 

  return (
  <>
   <button 
      className={buttonStyle}
      onClick={clicked}
      disabled= {diasbled}
    > {children}  
    </button>
  </>
 
  )
}
