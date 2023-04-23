// reusable buttons
import React from 'react'
import './Button.css'

export default function Button(props) {
  const {children, buttonStyle, clicked, type, title, disabled} = props;

  return (
    <>
      <button 
          type={type}
          className={`button-default ${buttonStyle}`}
          onClick={clicked}
          title={title || ''}
          disabled= {disabled}
        > {children}  
      </button>
    </>
  )
}