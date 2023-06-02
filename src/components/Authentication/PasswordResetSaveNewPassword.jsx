import React, { useState, useEffect } from 'react';
import './Authentication.css';
import 'react-toastify/dist/ReactToastify.css';
import LoaderIcon from '../SVG/Loader';
import Form from '../UI/Form';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { toast } from 'react-toastify';
import { passwordResetSaveNewPassword } from '../../helper/dataStorage';
import { buildInputFields, convertFormData } from '../../helper/utilities';
import { checkPasswordResetLinkValidity, resetPassword } from '../../helper/axiosRequests';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { useThemeContext } from '../contexts/ThemeContext';
import { useFormContext } from '../contexts/FormContext';
import { isPasswordMatching } from '../../helper/formValiadation';
import { INPUT_VALIDATION_MESSAGES } from '../../helper/statusMessages' 

export default function PasswordResetSaveNewPassword() {
  // ROUTES
  const navigate = useNavigate();
  const {id, token} = useParams(); // get url parameters (id, token)
  // CONTEXT
  const {formData, setFormData, message, setMessage, setValidationMessages, isFormValid } = useFormContext();
  const {theme} = useThemeContext();
  // STATE
  const [isLoading, setIsLoading] = useState(true);
  // EFFECT
  // initialize form validation state
  useEffect(() => {
    if(!Object.keys(passwordResetSaveNewPassword).length) return; 
    let validationObject = {};
    for(let field in passwordResetSaveNewPassword) {
      validationObject = {...validationObject, [field]: {status: false, message: '', touched: false}}
    }
    setValidationMessages(validationObject)
    return () => {
      setValidationMessages({});
    }
  }, []) 
  // check token validity, initialize state
  useEffect(() => {
    if(!id || !token) { // check for necessary data, if not provided navigate to error page
      setMessage('Missing ID/Token');
      navigate('/error-page'); // nav user to error page 
    } 
    // get initial token validity status: valid/invalid
    (async () => {
      const response = await checkPasswordResetLinkValidity(id, token); 
      setMessage(response.message)
      if(!response?.isTokenValid) { navigate('/error-page') } // invalid token -> nav to error page    
      setIsLoading(false);
    })() 
    return () => {
      setMessage('');
      setFormData(passwordResetSaveNewPassword);
    }
  }, [])

  // HANDLERS
  const resetPasswordHandler = async (e, formData) => {
    e.preventDefault();
    if(!id || !token) { // check for necessary data, if not provided navigate to error page
      setMessage('Missing ID/Token');
      navigate('/error-page'); // nav user to error page 
    } 
    setIsLoading(true);
    const convertedData = convertFormData(formData); // simplyfy data before sending request  
    const {password, passwordConfirm} = convertedData; // destructure converted data values
    const resetPasswordData = {email: {...formData.email}, password: {...passwordResetSaveNewPassword.password}, passwordConfirm: {...passwordResetSaveNewPassword.passwordConfirm}}; // empty pasword fields
    // check for matching PWs  
    const matchedPassword = isPasswordMatching(password, passwordConfirm); 
    if(!matchedPassword) {
      setFormData(resetPasswordData);
      setMessage(INPUT_VALIDATION_MESSAGES.PASSWORDS_MATCH); // TODO: outsource status message
      return;
    };
    const response = await resetPassword(id, token, convertedData); 
    const {success, message, errorField, isTokenValid } = response ?? {};
    try {
      if(success) {
        toast(`${message}`, {
          className: "shared-toast",
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: theme,
          });
      } else {
        setMessage(message);
        if(isTokenValid === false) { // invalid token -> nav to error page 
          navigate('/error-page'); 
        } 
        if(errorField === 'email') { // wrong email: reset input 
          setFormData({email: {...passwordResetSaveNewPassword.email}, password: {...formData.password}, passwordConfirm: {...formData.passwordConfirm}}); // empty password field before next login attempt
        }  
        if(errorField === 'password') {  // wrong password: reset input 
          setFormData({email: {...formData.email}, password: {...passwordResetSaveNewPassword.password}, passwordConfirm: {...passwordResetSaveNewPassword.passwordConfirm}}); 
        } 
      }
    }
      catch (error) {
      setMessage('Error. Try again later!'); 
    } finally {
      setIsLoading(false);
      if(success) { setTimeout(()=> { navigate('/login'); return }, 1000) } // success: nav to login page
    }
  }

  // BUTTON
  // submit form: create and save new password
  const saveNewPasswordButton = (
    <div className='shared-button-wrapper shared-button-wrapper--authentication'> 
      <Button 
        buttonStyle='button-authentication' 
        type='submit' 
        form='form-password-reset-save-new-password'
        disabled={!isFormValid}
        clicked={(e) => {resetPasswordHandler(e, formData)}}
      > Submit </Button>      
    </div>
  )

  return (
    <div className='shared-page-container shared-page-container--centered shared-page-container--with-padding'>   
      <div className='auth-modal'>
        {/* modal loader */}
        {isLoading ? <div className='auth-modal-loader'> <LoaderIcon height='100px' width='100px' stroke='var(--text-color--high-emphasis)'/> </div> : null }
        {/* modal background */}
        <div className='auth-modal-background'></div>
        {/* save new password form */}
        {formData && 
          <Form id='form-password-reset-save-new-password' title='Create new password'> 
            {buildInputFields(passwordResetSaveNewPassword).map(elem => (
              <Input inputStyle='input-authentication' key={elem.name} name={elem.name}/> 
            ))}
          </Form>
        }
        {/* submit form button */}
        {saveNewPasswordButton}
        {/* status message container */}
        <div className='shared-status-message'> <p> {message} </p> </div>
      </div>
    </div>
  )
}