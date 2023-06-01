// TODO: validation data from backend -> update validation data storage -> update validationmessage state on mount 
// TODO: handle touched: if any of the fields are touched (touched: true) -> true || false
import React, { useState, createContext, useContext, useEffect } from 'react';
import { statusMessages } from '../../helper/dataStorage';
import { formatDateYear } from '../../helper/utilities';
import { basicInputFieldValidator, dateValidator, isPasswordMatching  } from '../../helper/formValiadation';
import { INPUT_VALIDATION_MESSAGES } from '../../helper/statusMessages';

// DEFINE && EXPORT CONTEXT
// create context
const FormLayoutProvider = createContext();
// export context
export const useFormContext = () => useContext(FormLayoutProvider);
// define layout provider
export default function FormContext({children}) {
  // STATES
  const [formData, setFormData] = useState({});
  const [statusMessage, setStatusMessage] = useState(statusMessages.EMPTY);
  const [data, setData] = useState([]);
  const [homePhotos, setHomePhotos] = useState([]);
  const [message, setMessage] = useState('');
  const [isGalleryFetched, setIsGalleryFetched] = useState(false); // fetch states: preventing rerenders/refetches for specific components (e.g. user's gallery)
  const [photoFile, setPhotoFile] = useState({}); // file upload
  const [showPassword, setShowPassword] = useState({}); // password visibility toggler   
  const [validationMessages, setValidationMessages] = useState({});
  const [isFormValid, setIsFormValid] = useState(false); // bool; determines if submit form is enabled/disabled 
  const [isFormInitialized, setIsFormInitialized] = useState(false); // bool; a switch that checks if form data is available (to set up form validation template)
  // EFFECTS
  // setup validationMessages template based on active form data
  useEffect(() => {
    if(isFormInitialized || !Object.keys(formData).length) return; 
    let validationObject = {};
    console.log(formData);
    for(let field in formData) {
      validationObject = {...validationObject, [field]: {status: false, message: '', touched: false}}
    }
    setValidationMessages(validationObject);
    setIsFormInitialized(true);
  }, [formData, setIsFormInitialized])

  // validate input field when it is password || passwordConfirm
  useEffect(() => {
    if (formData?.password || formData?.passwordConfirm) {
      updatePasswordValidation();
    }
  }, [formData?.password, formData?.passwordConfirm]);
  // validate form when validationMessages state is updated
  useEffect(() => {
    validateFormHandler();
  }, [validationMessages]);
  // HELPER FUNCTIONS
  // password matching and validation
  const updatePasswordValidation = (name, validationStatus) => {
    console.log(name, validationStatus);
    const { value: currentPassword } = formData?.password || {};
    const { value: currentConfirmPassword } = formData?.passwordConfirm || {};
    const isMatch = isPasswordMatching(currentPassword, currentConfirmPassword);
   
    const passwordConfirmValidationStatus = {
      status: isMatch,
      message: isMatch ? '' : INPUT_VALIDATION_MESSAGES.PASSWORDS_MATCH,
    };

    // Register page: password matching and validation is required
    if(formData.hasOwnProperty('passwordConfirm')) {
      // match password and passwordConfirm, update passwordConfirm's validation status 
      if(!name?.length && (!validationStatus || !Object.keys(validationStatus).length)) {
        setValidationMessages(prev => ({
          ...prev,
          passwordConfirm: { ...prev.passwordConfirm, ...passwordConfirmValidationStatus },
        }));
      // validate password, match password and passwordConfirm, update their validation status
      } else {
        setValidationMessages(prev => ({
          ...prev,
          [name]: { ...prev[name], ...validationStatus },
          passwordConfirm: { ...prev.passwordConfirm, ...passwordConfirmValidationStatus },
        }));
      }

    // Login page: no password confirm
    } else {
      setValidationMessages(prev => ({
        ...prev,
        [name]: { ...prev[name], ...validationStatus }
      }));
    }
  };

  // update form data with input field change  
  const updateFormField = (name, value) => {
    setFormData(prev => ({ 
      ...prev, [name]: { ...prev[name], value} 
    }));
  };

  // input field validation status updater
  const updateValidationStatus = (name, validationStatus) => {
    setValidationMessages(prev => ({ ...prev, [name]: { ...prev[name], ...validationStatus } }));
  };

  // check form input fields, set form validity (isFormValid): all fields are valid: true || false 
  const validateFormHandler = () => {
    const purifiedValidationMessages = {...validationMessages};
    delete purifiedValidationMessages.undefined;
    console.log(purifiedValidationMessages);
    const areAllFieldsValid = Object.values(purifiedValidationMessages).every(field => field.status);
    setIsFormValid(areAllFieldsValid);
  }

  // password visibility toggler 
  const togglePasswordVisibility = (e, name) => {
    e.preventDefault();
    setShowPassword(prev => ( {...prev, [name]: !prev[name] } ));
  }

  // HANDLERS (used in multiple components)
  // input, textarea change handler
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    updateFormField(name, value);
    const { required, minLength, maxLength, fieldName } = formData[name];
    const validationStatus = basicInputFieldValidator(name, value, required, minLength, maxLength, fieldName);
    if (name === 'password' || name === 'passwordConfirm') {
      updatePasswordValidation(name, validationStatus); 
    } else {
      updateValidationStatus(name, validationStatus);
    }
  };

  // date input handler
  const dateInputChangeHandler = (e) => {
    e.preventDefault();
    const captureDate = 'captureDate'; // active form input name
    const formattedValue = formatDateYear(e.target.value); // date value
    updateFormField(captureDate, formattedValue);   // update form captureDate field
    const validationStatus = dateValidator(formattedValue);  // validate input field
    updateValidationStatus(captureDate, validationStatus);
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
        showPassword, setShowPassword,
        isFormValid, setIsFormValid,
        isFormInitialized, setIsFormInitialized,
        inputChangeHandler,
        dateInputChangeHandler,
        togglePasswordVisibility
      }}
    > {children}
    </FormLayoutProvider.Provider>
  )
}