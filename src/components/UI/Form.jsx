// a component to create reusable forms using react context
import React, {useEffect, useState, createContext} from 'react'
import './Form.css'
import Button from './Button';
import {useModalContext} from '../contexts/ToggleModalContext'
//create context
export const FormContext = createContext({form: {}});

export default function Form(props) {
  // PROPS
  const {
    children, 
    submit = () => {}, 
    initialValues, 
    customStyle,
    title,
    operation} = props;
  const { toggleModalHandler = () => {}} = useModalContext();
  // STATES
  const [form, setForm] = useState(initialValues);
  const [imageFile, setImageFile] = useState('select image to upload (png or jpg)')
  const [statusMessage, setStatusMessage] = useState('EMPTY');

  // HANDLERS
  // input fields change handler (input, textarea)
  const inputChangeHandler = (e) => {
    // get event name, value 
    const { name, value } = e.target; // get event name, value 
    let updatedForm = {...form}; // copy form
    const updatedItem = {...updatedForm[name]}; //copy and update nested form properties
    updatedItem.value = value; // update prop value
    updatedForm[name] = updatedItem; //update form with updated property
    setForm(updatedForm);  // update state
  };
  // Add image to file api handler
  // validate selected image file (check file extension, update state)
  const validateImageFile = (selected) => {
    console.log(selected)
    const types = ['image/png', "image/jpeg"];  // allowed image file types
    if (selected && types.includes(selected.type)) { // file's format is listed in types arr
      setImageFile(selected);
    } else { // if invalid
      setImageFile('Not supported file format');
      selected = '';
    } 
  }
  // upload image
  const imageFileChangeHandler = (e) => {
    e.preventDefault();
    // get selected file
    let selectedFile = e.target.files[0] 
    validateImageFile(selectedFile); // validate file, update state
    // update form with image file
    let updatedForm = {...form}; // copy form
    console.log(updatedForm);
    const updatedItem = {...updatedForm['imageFile']}; // copy and update nested form properties
    updatedItem.value = selectedFile; // update prop value
    updatedForm['imageFile'] = updatedItem; // update form with updated property
    setForm(updatedForm); // update state
  }
  // CONDITIONAL STYLING
  let formStyle = 'form-default';
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
        <div className='form-form-container'> 
          <h1> {title} </h1>
          <FormContext.Provider value={{
            form, setForm,
            imageFile, setImageFile,
            statusMessage, setStatusMessage,
            inputChangeHandler,
            imageFileChangeHandler
          }}> 
            {children} 
          </FormContext.Provider>
        </div>
        <div className='form-button-container'> 
          { toggleModalHandler ?  
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