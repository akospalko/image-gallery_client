import React, { useState, createContext, useContext } from 'react';
import { statusMessages } from '../../helper/dataStorage';
import { validateInputField } from '../Valiadation';


// DEFINE && EXPORT CONTEXT
// create context
const FormLayoutProvider = createContext();
// export context
export const useFormContext = () => useContext(FormLayoutProvider);
// define layout provider
export default function FormContext({children}) {
  // TEMPLATE
  const errorMessageTemplate = {username: '', password: ''};
  // STATES
  const [formData, setFormData] = useState();
  const [statusMessage, setStatusMessage] = useState(statusMessages.EMPTY);
  const [data, setData] = useState([]);
  const [homePhotos, setHomePhotos] = useState([]);
  const [message, setMessage] = useState('');
  const [validationMessages, setValidationMessages] = useState(errorMessageTemplate);

  // fetch states: preventing rerenders/refetches for specific components (e.g. user's gallery)
  const [isGalleryFetched, setIsGalleryFetched] = useState(false);
  // file upload
  const [photoFile, setPhotoFile] = useState({});
  // HANDLERS (used in multiple components)
  //input, textarea change handler
  const inputChangeHandler = (e) => {
    const { name, value } = e.target; // get event name, value 
    let updatedForm = {...formData}; // copy form
    const updatedItem = {...updatedForm[name]}; // copy and update nested form properties
    updatedItem.value = value; // update prop value
    updatedForm[name] = updatedItem; // update form with updated property
    setFormData(updatedForm); // update state
    // validate input field
    const {required, minLength, maxLength} = updatedForm[name];
    console.log(updatedForm[name]);
    const validationMessage = validateInputField(name, value, required, minLength, maxLength);
    setValidationMessages(prev => ({...prev, [name]: validationMessage}))
    console.log(validationMessage);
  };
  // date input 
  const dateInputChangeHandler = (e) => {
    e.preventDefault();
    // update form captureDate field
    let updatedForm = {...formData}; // copy form
    const updatedItem = {...updatedForm['captureDate']}; // copy and update nested form properties
    updatedItem.value = e.target.value; // update prop value
    updatedForm['captureDate'] = updatedItem; // update form with updated property
    setFormData(updatedForm); // update state
  }
  
  return (
    <FormLayoutProvider.Provider
      value={{
        formData, setFormData,
        photoFile, setPhotoFile,
        statusMessage, setStatusMessage,
        validationMessages, setValidationMessages,
        data, setData,
        homePhotos, setHomePhotos,
        message, setMessage,
        isGalleryFetched, setIsGalleryFetched,
        inputChangeHandler,
        dateInputChangeHandler
      }}
    > {children}
    </FormLayoutProvider.Provider>
  )
}