// reusable buttons
import React from 'react'
import './Button.css'

export default function Button(props) {
  const {children, buttonStyle, clicked, type, disabled} = props;

  return (
    <>
      <button 
          type={type}
          className={`button-default ${buttonStyle}`}
          onClick={clicked}
          disabled= {disabled}
        > {children}  
      </button>
    </>
  )
}