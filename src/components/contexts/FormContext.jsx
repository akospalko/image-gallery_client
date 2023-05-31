// TODO: validation data from backend -> update validation data storage -> update validationmessage state on mount 
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
  const [formData, setFormData] = useState();
  const [statusMessage, setStatusMessage] = useState(statusMessages.EMPTY);
  const [data, setData] = useState([]);
  const [homePhotos, setHomePhotos] = useState([]);
  const [message, setMessage] = useState('');
  const [validationMessages, setValidationMessages] = useState({});
  const [isGalleryFetched, setIsGalleryFetched] = useState(false); // fetch states: preventing rerenders/refetches for specific components (e.g. user's gallery)
  const [photoFile, setPhotoFile] = useState({}); // file upload
  const [showPassword, setShowPassword] = useState({}); // password visibility toggler   
  const [isFormValid, setIsFormValid] = useState(false); // bool; determines if submit form is enabled/disabled 
  // EFFECTS
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
  // validate password fields: match pattern, compare 
  const updatePasswordValidation = (validationStatus) => {
    const { value: currentPassword } = formData?.password || {};
    const { value: currentConfirmPassword } = formData?.passwordConfirm || {};
    const isMatch = isPasswordMatching(currentPassword, currentConfirmPassword);
   
    setValidationMessages(prev => ({ 
      ...prev,
      passwordConfirm: { ...prev.passwordConfirm, status: isMatch, message: isMatch ? '' : INPUT_VALIDATION_MESSAGES.PASSWORDS_MATCH } 
    }));
  };

  // update form data with input field change  
  const updateFormField = (name, value) => {
    setFormData(prev => ({ 
      ...prev,
      [name]: { ...prev[name], value} 
    }));
  };
  // input field validation status updater
  const updateValidationStatus = (name, validationStatus) => {
    setValidationMessages(prev => ({ ...prev, [name]: { ...prev[name], ...validationStatus } }));
  };
  // check form input fields, set form validity (isFormValid): all fields are valid: true || false 
  const validateFormHandler = () => {
    const areAllFieldsValid = Object.values(validationMessages).every(field => field.status);
    setIsFormValid(areAllFieldsValid);
  }
  // password visibility toggler 
  const togglePasswordVisibility = (e, name) => {
    e.preventDefault();
    setShowPassword(prev => ( {...prev, [name]: !prev[name] } ));
  }
  // HANDLERS
  // input, textarea
  // const inputChangeHandler = (e) => {
  //   const { name, value } = e.target;
  //   // update form input field 
  //   updateFormField(name, value);
  //   // validate input field
  //   const { required, minLength, maxLength, fieldName } = formData[name];
  //   const validationStatus = basicInputFieldValidator(name, value, required, minLength, maxLength, fieldName);
  //   if (name === 'password' || name === 'passwordConfirm') {
  //     // pass input handler validationStatus return value to updatePasswordValidation
  //     // replace status updater with current setter -> pass validation status to setter
  //     updatePasswordValidation(validationStatus);
  //   } else {
  //     updateValidationStatus(name, validationStatus);
  //   }
  // };

  // HANDLERS (used in multiple components)
  // input, textarea change handler
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
      // Compare passwords
      const isMatch = isPasswordMatching(currentPassword, currentConfirmPassword);
      // 
      const passwordConfirmValidationStatus = {
        //name: 'passwordConfirm',
        status: isMatch,
        message: isMatch ? '' : INPUT_VALIDATION_MESSAGES.PASSWORDS_MATCH,
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
    // validate form
    validateFormHandler();
  };


  // date input handler
  const dateInputChangeHandler = (e) => {
    e.preventDefault();
    const formattedValue = formatDateYear(e.target.value);
    const captureDate = 'captureDate'; // active form input name
    // update form captureDate field
    updateFormField(captureDate, formattedValue);
    // validate input field
    const { value } = formData[captureDate];
    const validationStatus = dateValidator(value);
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
        inputChangeHandler,
        dateInputChangeHandler,
        togglePasswordVisibility
      }}
    > {children}
    </FormLayoutProvider.Provider>
  )
}