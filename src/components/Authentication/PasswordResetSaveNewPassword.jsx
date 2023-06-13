// Password reset - save new password
import React, { useState, useEffect } from 'react';
import './Authentication.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import Form from '../UI/Form';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { passwordResetSaveNewPassword } from '../../helper/dataStorage';
import { buildInputFields, convertFormData } from '../../helper/utilities';
import { checkPasswordResetLinkValidity, resetPassword } from '../../helper/axiosRequests';
import { isPasswordMatching } from '../../helper/formValiadation';
import { INPUT_VALIDATION_MESSAGES } from '../../helper/statusMessages' 
import { useThemeContext } from '../contexts/ThemeContext';
import { useFormContext } from '../contexts/FormContext';
import AuthenticationIllustrationTab, { AuthenticationHeader } from './AuthenticationIllustrationTab';
import { ForgotPasswordIllustration, AvatarIllustration } from '../SVG/Illustrations';
import LoaderIcon from '../SVG/Loader';
import useResponsiveBackground from '../hooks/useResponsiveBackground';

export default function PasswordResetSaveNewPassword() {
  // CONSTANTS
  // TODO: Outsource
  const titleText = 'Save new password';
  const subtitleText = 'make it secure!';
  // ROUTES
  const navigate = useNavigate();
  const { id, token } = useParams(); // get url parameters (id, token)
  // CONTEXT
  const { formData, setFormData, message, setMessage, setValidationMessages, isFormValid } = useFormContext();
  const { theme } = useThemeContext();
  // HOOK 
  const { pageBackground } = useResponsiveBackground();
  // STATE
  const [isSubmitting, setIsSubmitting] = useState(false);
  // EFFECT
  // initialize form validation state
  useEffect(() => {
    if(!Object.keys(passwordResetSaveNewPassword).length) return; 
    let validationObject = {};
    for(let field in passwordResetSaveNewPassword) {
      validationObject = { ...validationObject, [field]: { status: false, message: '', touched: false } }
    }
    setValidationMessages(validationObject);
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
      // setMessage(response.message);
      if(!response?.isTokenValid) { navigate('/error-page') } // invalid token -> nav to error page    
      setIsSubmitting(false);
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
    setIsSubmitting(true);
    const convertedData = convertFormData(formData); // simplyfy data before sending request  
    const { password, passwordConfirm } = convertedData; // destructure converted data values
    const resetPasswordData = { email: { ...formData.email }, password: { ...passwordResetSaveNewPassword.password }, passwordConfirm: { ...passwordResetSaveNewPassword.passwordConfirm } }; // empty pasword fields
    // check for matching PWs  
    const matchedPassword = isPasswordMatching(password, passwordConfirm); 
    if(!matchedPassword) {
      setFormData(resetPasswordData);
      setMessage(INPUT_VALIDATION_MESSAGES.PASSWORDS_MATCH); // TODO: outsource status message
      return;
    };
    const response = await resetPassword(id, token, convertedData); 
    const { success, message, errorField, isTokenValid } = response ?? {};
    try {
      if(success) {
        toast(`${ message }`, {
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
          setFormData({ email: {...passwordResetSaveNewPassword.email }, password: { ...formData.password }, passwordConfirm: { ...formData.passwordConfirm } }); // empty password field before next attempt
        }  
        if(errorField === 'password') { // wrong password: reset input 
          setFormData({ email: { ...formData.email }, password: { ...passwordResetSaveNewPassword.password }, passwordConfirm: { ...passwordResetSaveNewPassword.passwordConfirm } }); 
        } 
      }
    }
      catch (error) {
      setMessage('Error. Try again later!'); 
    } finally {
      setIsSubmitting(false);
      if(success) { setTimeout(()=> { navigate('/login'); return }, 1000) } // success: nav to login page
    }
  }

  // BUTTONS
  // Submit form button
  const saveNewPasswordButton = (
    <div className='shared-button-wrapper shared-button-wrapper--authentication'> 
      <Button 
        buttonStyle='button-authentication' 
        type='submit' 
        disabled={ !isFormValid }
        clicked={ (e) => { resetPasswordHandler(e, formData) } }
      >  <div className='auth-submit-button-content'>
          <span className='shared-submit-form-button-content'> 
          { isFormValid ? isSubmitting ? <div className='auth-modal-loader'> { isSubmitting &&  <LoaderIcon height='30px' width='30px' stroke='var(--text-color--high-emphasis)'/> } </div> : 'Log in' : 'Fill in form' } </span> 
        </div>
      </Button>      
    </div> 
  )

  // modal
  const saveNewPasswordModal = (
    <div className='auth-modal'>
      {/* Group 1: form */}
      <div className='auth-modal--group-1'>
        {/* header title */}
        { <AuthenticationHeader title= { titleText } subtitle= { subtitleText } /> }
        {/* header avatar */}
        <div className='auth-modal-avatar'>
          <AvatarIllustration color1='var(--color-accent)'/>
        </div>
        {/* form */}
        { formData && 
          <Form id='form-password-reset-save-new-password' formStyle='form-authentication' > 
            { buildInputFields(passwordResetSaveNewPassword).map(elem => (
              <Input key={ elem.name } name={ elem.name } inputStyle='input-authentication' validationStyle='input-validation-authentication' /> 
            )) }
          </Form>
        }
        {/* status message container */}
        { <div className='shared-status-message'> <p> { message || '' } </p> </div> }
        {/* submit form button */}
        { saveNewPasswordButton }
      </div>
    </div>
  );
  
  return (
    <div 
      style={ pageBackground } 
      className='shared-page-container shared-page-container--centered'
    >   
      {/* container: */}
      <div className='authentication-container'> 
        { /* modal opaque background layer */ }
        <div className='authentication-container-opaque-background'></div>
        { /* auth modal */ }
        { saveNewPasswordModal }
        { /* auth illustration tab + guest welcome */ }
        <AuthenticationIllustrationTab title={ titleText } subtitle={ subtitleText } illustration={ <ForgotPasswordIllustration color1='var(--color-accent)' /> } />
      </div>
    </div>
  )
}