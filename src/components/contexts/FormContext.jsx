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
  const [showPassword, setShowPassword] = useState(false); // password visibility toggler   

  // HANDLERS (used in multiple components)
  // input, textarea change handler


  // const inputChangeHandler = (e) => {
  //   const { name, value } = e.target;
  //   let updatedForm = { ...formData };
  //   const updatedItem = { ...updatedForm[name] };
  //   updatedItem.value = value;
  //   updatedForm[name] = updatedItem;
  //   setFormData(updatedForm);
  
  //   const { required, minLength, maxLength, fieldName } = updatedForm[name];
  //   const validationStatus = basicInputFieldValidator(name, value, required, minLength, maxLength, fieldName);
  
  //   if (name === 'password' || name === 'passwordConfirm') {
  //     const currentPassword = updatedForm['password']?.value;
  //     const currentConfirmPassword = updatedForm['passwordConfirm']?.value;
  //     const isMatch = isPasswordMatching(currentPassword, currentConfirmPassword);
  
  //     const passwordConfirmValidationStatus = {
  //       name: 'passwordConfirm',
  //       status: isMatch,
  //       message: isMatch ? 'Passwords match' : 'Passwords do not match',
  //     };
  
  //     setValidationMessages(prev => ({
  //       ...prev,
  //       [name]: { ...prev[name], ...validationStatus },
  //       passwordConfirm: { ...prev.passwordConfirm, ...passwordConfirmValidationStatus },
  //     }));
  //   } else {
  //     setValidationMessages(prev => ({ ...prev, [name]: { ...prev[name], ...validationStatus } }));
  //   }
  // };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...formData };
    const updatedItem = { ...updatedForm[name] };
    updatedItem.value = value;
    updatedForm[name] = updatedItem;
    setFormData(updatedForm);
  
    const { required, minLength, maxLength, fieldName } = updatedForm[name];
    const validationStatus = basicInputFieldValidator(name, value, required, minLength, maxLength, fieldName);
  
    if (name === 'password' || name === 'passwordConfirm') {
      const currentPassword = updatedForm['password']?.value;
      const currentConfirmPassword = updatedForm['passwordConfirm']?.value;
  
      // Check if the password field regex condition is true
      // const isPasswordValid = minLength && !new RegExp(`^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{${minLength},}$`).test(currentPassword);
      // Compare passwords
      const isMatch = isPasswordMatching(currentPassword, currentConfirmPassword);
      // 
      const passwordConfirmValidationStatus = {
        //name: 'passwordConfirm',
        status: isMatch,
        message: isMatch ? 'matchs' : 'Passwords do not match',
        // message: isMatch ? 'Passwords match' : (isPasswordValid ? 'Passwords do not match' : 'Password must meet the requirements'),
      };
  
      setValidationMessages(prev => ({
        ...prev,
        [name]: { ...prev[name], ...validationStatus },
        passwordConfirm: { ...prev.passwordConfirm, ...passwordConfirmValidationStatus },
      }));
    } else {
      setValidationMessages(prev => ({ ...prev, [name]: { ...prev[name], ...validationStatus } }));
    }
  };

  // date input handler
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
  // password visibility toggler 
  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(prev => !prev);
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
        showPassword,
        inputChangeHandler,
        dateInputChangeHandler,
        togglePasswordVisibility
      }}
    > {children}
    </FormLayoutProvider.Provider>
  )
}