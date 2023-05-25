// TODO: validation data from backend -> update validation data storage -> update validationmessage state on mount 
import React, { useState, createContext, useContext } from 'react';
import { statusMessages } from '../../helper/dataStorage';
import { formatDateYear } from '../../helper/utilities';
import { basicInputFieldValidator, dateValidator, isPasswordMatching  } from '../../helper/formValiadation';

// DEFINE && EXPORT CONTEXT
// create context
const FormLayoutProvider = createContext();
// export context
export const useFormContext = () => useContext(FormLayoutProvider);
// define layout provider
export default function FormContext({children}) {
  // TEMPLATE
  const REQUIRED = 'Required field';
  // const errorMessageTemplate = {username: REQUIRED, password: REQUIRED, email: REQUIRED, passwordConfirm: REQUIRED};
  const errorMessageTemplate = {
    username: {},
    password: {}, 
    passwordConfirm: {},
    email: {}, 
  };
  // STATES
  const [formData, setFormData] = useState();
  const [statusMessage, setStatusMessage] = useState(statusMessages.EMPTY);
  const [data, setData] = useState([]);
  const [homePhotos, setHomePhotos] = useState([]);
  const [message, setMessage] = useState('');
  const [validationMessages, setValidationMessages] = useState(errorMessageTemplate);
  const [isGalleryFetched, setIsGalleryFetched] = useState(false); // fetch states: preventing rerenders/refetches for specific components (e.g. user's gallery)
  const [photoFile, setPhotoFile] = useState({}); // file upload
  // HANDLERS (used in multiple components)
  // input, textarea change handler
  const inputChangeHandler = (e) => {
    const { name, value } = e.target; // get event name, value 
    let updatedForm = {...formData}; // copy form
    const updatedItem = {...updatedForm[name]}; // copy and update nested form properties
    updatedItem.value = value; // update prop value
    updatedForm[name] = updatedItem; // update form with updated property
    setFormData(updatedForm); // update state
    const {required, minLength, maxLength, fieldName} = updatedForm[name];
    // validate input field
    const validationStatus = basicInputFieldValidator(name, value, required, minLength, maxLength, fieldName);
    console.log(validationStatus);
    setValidationMessages(prev => ({ ...prev, [name]: { ...prev[name], ...validationStatus } }))
  };


  const dateInputChangeHandler = (e) => {
    e.preventDefault();
    // update form captureDate field
    let updatedForm = {...formData}; // copy form
    const updatedItem = {...updatedForm['captureDate']}; // copy and update nested form properties
    const formattedValue = formatDateYear(e.target.value);
    updatedItem.value = formattedValue; // update prop value, limit year digit count
    updatedForm['captureDate'] = updatedItem; // update form with updated property
    setFormData(updatedForm); // update state
    // validate input field
    const {value} = updatedForm['captureDate'];
    const validationStatus = dateValidator(value);
    setValidationMessages(prev => ({ ...prev, ['captureDate']: { ...prev['captureDate'], ...validationStatus } }))
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