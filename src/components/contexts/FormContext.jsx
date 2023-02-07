import React, {useState, createContext, useContext} from 'react'
import {statusMessages} from '../../helper/dataStorage'

// DEFINE && EXPORT CONTEXT
// create context
const FormLayoutProvider = createContext();
// export context
export const useFormContext = () => {
  return useContext(FormLayoutProvider);
}
// define layout provider
export default function FormContext({children}) {
  // STATES
  const [formData, setFormData] = useState();
  const [imageFile, setImageFile] = useState(statusMessages.UPLOAD_IMAGE_FILE_INITIAL)
  const [statusMessage, setStatusMessage] = useState(statusMessages.EMPTY);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [data, setData] = useState([]);
  // HANDLERS
  // input fields change handler (input, textarea)
  const inputChangeHandler = (e) => {
    // get event name, value 
    const { name, value } = e.target; // get event name, value 
    let updatedForm = {...formData}; // copy form
    const updatedItem = {...updatedForm[name]}; // copy and update nested form properties
    updatedItem.value = value; // update prop value
    updatedForm[name] = updatedItem; // update form with updated property
    setFormData(updatedForm);  // update state
  };
  // add image to file api handler  && validate selected image file (check file extension, update state)
  const validateImageFile = (selected) => {
    console.log(selected)
    const types = ['image/png', "image/jpeg"];  // allowed image file types
    if (selected && types.includes(selected.type)) { // file's format is listed in types arr
      setImageFile(selected);
    } else { // if invalid
      setImageFile(statusMessages.UPLOAD_IMAGE_FILE_NOT_SUPPORTED_FORMAT);
      selected = statusMessages.EMPTY;
    } 
  }
  // upload image
  const imageFileChangeHandler = (e) => {
    e.preventDefault();
    // get selected file
    let selectedFile = e.target.files[0] 
    validateImageFile(selectedFile); // validate file, update state
    // update form with image file
    let updatedForm = {...formData}; // copy form
    const updatedItem = {...updatedForm['imageFile']}; // copy and update nested form properties
    updatedItem.value = selectedFile; // update prop value
    updatedForm['imageFile'] = updatedItem; // update form with updated property
    setFormData(updatedForm); // update state
  }
  
  return (
    <FormLayoutProvider.Provider
      value={{
        formData, setFormData,
        imageFile, setImageFile,
        statusMessage, setStatusMessage,
        isSubmittingForm, setIsSubmittingForm,
        data, setData,
        inputChangeHandler,
        imageFileChangeHandler
      }}
    > {children}
    </FormLayoutProvider.Provider>
  )
}