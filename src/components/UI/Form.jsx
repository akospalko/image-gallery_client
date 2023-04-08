// reusable form
import React from 'react'
import './Form.css'

export default function Form(props) {
  // PROPS
  const { children, id, title, formStyle, titleStyle } = props;
  // ELEMENT
  // title
  const renderedTitle = (
    <div className={`form-title-default ${titleStyle}`}>
      {title && <h2> {title} </h2>}
    </div>
  )
  return (
    <form id={id} className={`form-default ${formStyle}`}>
      {/* form title: optional */}
      { title && renderedTitle}
      {/* form content */}
      {children} 
    </form>
  )
}