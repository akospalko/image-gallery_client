// Password reset - save new password
import React, { useState, useEffect } from 'react';
import './Authentication.css';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import Form from '../UI/Form';
import Input from '../UI/Input';
import Button from '../UI/Button';
import FormInitializers from '../../helper/FormInitializers';
import { CONSTANT_VALUES } from '../../helper/constantValues';
import { buildInputFields, convertFormData } from '../../helper/utilities';
import { checkPasswordResetLinkValidity, resetPassword } from '../../helper/axiosRequests';
import { isPasswordMatching } from '../../helper/formValiadation';
import { INPUT_VALIDATION_MESSAGES, STATUS_MESSAGES, statusDefault } from '../../helper/statusMessages' 
import { useThemeContext } from '../contexts/ThemeContext';
import { useFormContext } from '../contexts/FormContext';
import { useStatusContext } from '../contexts/StatusContext';
import AuthenticationIllustrationTab, { AuthenticationHeader } from './AuthenticationIllustrationTab';
import { ForgotPasswordIllustration, AvatarIllustration } from '../SVG/Illustrations';
import LoaderIcon from '../SVG/Loader';
import useResponsiveBackground from '../hooks/useResponsiveBackground';

export default function PasswordResetSaveNewPassword() {
  // ROUTES
  const navigate = useNavigate();
  const { id, token } = useParams(); // get url parameters (id, token)
 
  // CONTEXT
  const { 
    formData, 
    setFormData,  
    setValidationMessages, 
    isFormValid 
  } = useFormContext();
  const { theme } = useThemeContext();
  const { status, setStatus, sendToast } = useStatusContext();
  
  // HOOK 
  const { pageBackground } = useResponsiveBackground();
 
  // STATE
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // MISC
  // form template
  const { passwordResetSaveNewPassword } = FormInitializers();

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
      setStatus({ ...statusDefault, message: STATUS_MESSAGES.ERROR_MISSING_ID_TOKEN }); 
      navigate('/error-page'); // nav user to error page 
    } 
    // get initial token validity status: valid/invalid
    (async () => {
      const response = await checkPasswordResetLinkValidity(id, token); 
      if(!response?.isTokenValid) { navigate('/error-page') } // invalid token -> nav to error page    
      setIsSubmitting(false);
    })() 
    return () => {
      setStatus(statusDefault);
      setFormData(passwordResetSaveNewPassword);
    }
  }, [])

  // HANDLERS
  const resetPasswordHandler = async (e, formData) => {
    e.preventDefault();
    if(!id || !token) { // check for necessary data, if not provided navigate to error page
      setStatus({ statusDefault, message: ERROR_MISSING_ID_TOKEN });
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
      setStatus({ statusDefault, message: INPUT_VALIDATION_MESSAGES.PASSWORDS_MATCH }); 
      return;
    };
    const response = await resetPassword(id, token, convertedData); 
    const { success, message, errorField, isTokenValid } = response ?? {};
    try {
      if(success) {
        sendToast(message);
      } else {
        setStatus({ 
            code: 'CODE' ,
            success: success,
            message: message 
          });
        if(isTokenValid === false) { // invalid token -> nav to error page 
          navigate('/error-page'); 
        } 
        if(errorField === 'email') { // wrong email: reset input 
          setFormData({ email: { ...passwordResetSaveNewPassword.email }, password: { ...formData.password }, passwordConfirm: { ...formData.passwordConfirm } }); // empty password field before next attempt
        }  
        if(errorField === 'password') { // wrong password: reset input 
          setFormData({ email: { ...formData.email }, password: { ...passwordResetSaveNewPassword.password }, passwordConfirm: { ...passwordResetSaveNewPassword.passwordConfirm } }); 
        } 
      }
    }
      catch (error) {
      setStatus(INPUT_VALIDATION_MESSAGES.PASSWORDS_MATCH); 
    } finally {
      setIsSubmitting(false);
      if(success) { setTimeout( ()=> { navigate('/login'); return }, 1000) } // success: nav to login page
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
          <span className='shared-button-content'> 
          { isFormValid ? isSubmitting ? <div className='auth-modal-loader'> { isSubmitting &&  <LoaderIcon height='30px' width='30px' stroke='var(--text-color--high-emphasis)'/> } </div> : CONSTANT_VALUES.BUTTON_RESET_PASSWORD : CONSTANT_VALUES.BUTTON_FILL_IN_FORM } </span> 
        </div>
      </Button>      
    </div> 
  )

  // Modal
  const saveNewPasswordModal = (
    <div className='auth-modal'>
      { /* Group 1: form */ }
      <div className='auth-modal--group-1'>
        { /* header title */ }
        { <AuthenticationHeader title= { CONSTANT_VALUES.TITLE_PASSWORD_RESET_SAVE_NEW } subtitle= { CONSTANT_VALUES.SUBTITLE_PASSWORD_RESET_SAVE_NEW } /> }
        { /* header avatar */ }
        <div className='auth-modal-avatar'>
          <AvatarIllustration color1='var(--color-accent)'/>
        </div>
        { /* form */ }
        { formData && 
          <Form id='form-password-reset-save-new-password' formStyle='form-authentication' > 
            { buildInputFields(passwordResetSaveNewPassword).map(elem => (
              <Input key={ elem.name } name={ elem.name } validationStyle='input-validation-authentication' /> 
            )) }
          </Form>
        }
        { /* status message container */ }
        { <div className='shared-status-message'> <p> { status.message || '' } </p> </div> }
        { /* submit form button */ }
        { saveNewPasswordButton }
      </div>
    </div>
  );
  
  return (
    <div 
      style={ pageBackground } 
      className='shared-page-container shared-page-container--centered'
    > { /* container: */ }
      <div className='authentication-container'> 
        { /* modal opaque background layer */ }
        <div className='authentication-container-opaque-background'></div>
        { /* auth modal */ }
        { saveNewPasswordModal }
        { /* auth illustration tab + guest welcome */ }
        <AuthenticationIllustrationTab title={ CONSTANT_VALUES.TITLE_PASSWORD_RESET_SAVE_NEW } subtitle={ CONSTANT_VALUES.SUBTITLE_PASSWORD_RESET_SAVE_NEW } illustration={ <ForgotPasswordIllustration color1='var(--color-accent)' /> } />
      </div>
    </div>
  )
}