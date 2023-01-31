// a component to create reusable forms using react context
import React, {useState, createContext} from 'react'
import './Form.css'
import Button from './Button';
import {useModalContext} from '../contexts/ToggleModalContext'
//create context
export const FormContext = createContext({form: {}});

export default function Form(props) {
  //get props
  const {
    children, 
    submit = () => {}, 
    initialValues, 
    customStyle,
    title,
    operation} = props;
  const { toggleModalHandler = () => {}} = useModalContext();
  //state
  const [form, setForm] = useState(initialValues);
  //change handler
  const handleFormChange = (event) => {
    // get event name, value 
    const { name, value } = event.target;
    // copy form
    let updatedForm = {
      ...form,
    };
    //copy and update nested form properties
    const updatedItem = {...updatedForm[name]};
    //update prop value
    updatedItem.value = value;
    //update form with updated property
    updatedForm[name] = updatedItem
    // update state
    setForm(updatedForm);
  };

  //conditional styling form
  let formStyle = 'form-default';
  // 'image-update'
  // 'image-delete', etc...
  switch(customStyle) {
    case 'image-create-update':
      formStyle = 'form-image-create-update';
      break;
    default:
      formStyle = 'form-default';
  } 

  return (
    <>
      <form className={formStyle}>
        <h1> {title} </h1>
        <FormContext.Provider value={{form, handleFormChange}}> 
          {children} 
        </FormContext.Provider>
        <div className='form-button-container'> 
          {toggleModalHandler ?  
            <Button 
              customStyle='form-submit' 
              type='submit' 
              clicked={() => toggleModalHandler(operation)}
              > Cancel </Button> : null }      
            <Button 
              customStyle='form-submit' 
              type='submit' 
              clicked={(e) => {submit(e, form); toggleModalHandler(operation)}}
              > Submit 
            </Button>      
        </div>
      </form>
    </>
  )
}