// Password reset - request password reset email link
import React, { useState, useEffect } from 'react';
import './Authentication.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import Form from '../UI/Form';
import Input from '../UI/Input';
import Button from '../UI/Button';
import FormInitializers from '../../helper/FormInitializers';
import { CONSTANT_VALUES } from '../../helper/constantValues';
import { buildInputFields } from '../../helper/utilities';
import { requestPasswordResetLink } from '../../helper/axiosRequests';
import { STATUS_MESSAGES, statusDefault } from '../../helper/statusMessages';
import { useThemeContext } from '../contexts/ThemeContext';
import { useFormContext } from '../contexts/FormContext';
import { useStatusContext } from '../contexts/StatusContext';
import useResponsiveBackground from '../hooks/useResponsiveBackground';
import AuthenticationIllustrationTab, { AuthenticationHeader } from './AuthenticationIllustrationTab';
import { ForgotPasswordIllustration } from '../SVG/Illustrations';
import LoaderIcon from '../SVG/Loader';
import { ArrowIcon } from '../SVG/Icons';

export default function PasswordResetSendLink() {
  // ROUTE
  const navigate = useNavigate();

  // CONTEXT
  const { 
    formData, setFormData, 
    isFormValid, 
    setValidationMessages } = useFormContext();
  const { theme } = useThemeContext();
  const { status, setStatus, sendToast } = useStatusContext();


  // HOOK 
  const { pageBackground } = useResponsiveBackground();
 
  // STATE
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // MISC
  // form template
  const { passwordResetSendEmailLink } = FormInitializers();

  // EFFECT
  // initialize form validation state 
  useEffect(() => {
    if(!Object.keys(passwordResetSendEmailLink).length) return; 
    let validationObject = {};
    for(let field in passwordResetSendEmailLink) {
      validationObject = {...validationObject, [field]: {status: false, message: '', touched: false}}
    }
    setValidationMessages(validationObject)
    return () => {
      setValidationMessages({});
    }
  }, [])
  // initialize form 
  useEffect(() => {
    setFormData(passwordResetSendEmailLink);
  }, [])
  // HANDLERS
  // send a mail with a password reset link to the provided email address
  const sendPasswordResetEmailHandler = async (e, formData) => {
    console.log('clicked')
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await requestPasswordResetLink({ email: formData?.email?.value }); // get reet link by posting email
      const {success, message} = response ?? {};
      if(success) {
        sendToast(message);
      } else {
        setStatus({ 
          code: 'CODE',
          success: success,
          message: message,
        });
      }
    }
    catch (error) {
      setStatus({...statusDefault , message: STATUS_MESSAGES.ERROR_REQUEST}); 
      console.log(error)
    } finally {
      setIsSubmitting(false);
    }
  }

  // BUTTONS
  // submit form: request password reset link 
  const requestPasswordResetLinkButton = (
    <div className='shared-button-wrapper shared-button-wrapper--authentication'> 
      <Button 
        buttonStyle='button-authentication' 
        type='submit' 
        disabled={ !isFormValid }
        clicked={ (e) => { sendPasswordResetEmailHandler(e, formData) } }
      > 
        <div className='auth-submit-button-content'>
          <span className='shared-button-content'> 
          { isFormValid ? isSubmitting ? <div className='auth-modal-loader'> { isSubmitting && <LoaderIcon height='30px' width='30px' stroke='var(--text-color--high-emphasis)'/> } </div> : CONSTANT_VALUES.BUTTON_RESET_PASSWORD : CONSTANT_VALUES.BUTTON_FILL_IN_FORM } </span> 
        </div>
      </Button>      
    </div> 
  )

  // Reset password modal
  const resetPasswordModal = (
    <div className='auth-modal auth-modal--vertical-positioning'>
      { /* Group 1: form */ }
      <div className='auth-modal--group-1'>
        { /* form */ }
        { formData && 
          <Form id='form-password-reset-link' formStyle='form-authentication'> 
            { buildInputFields(passwordResetSendEmailLink).map(elem => (
              <Input key={ elem.name } name={ elem.name } inputStyle='input-authentication' validationStyle='input-validation-authentication' /> 
            )) }
          </Form>
        }
        { /* status message container */ }
        { <div className='shared-status-message'> <p> { status.message || '' } </p> </div> }
        { /* submit form button */ }
        { requestPasswordResetLinkButton }
      </div>
    </div>
  );

  return (
    <div 
      style={ pageBackground } 
      className='shared-page-container shared-page-container--centered'
    >   
      {/* container: */}
      <div className='authentication-container authentication-container--vertical-positioning'> 
        {/* nav to login page btn container */}
        <div className='authentication-return-back-button'> 
          <Button title={ CONSTANT_VALUES.BUTTON_BACK_TO_LOGIN } buttonStyle='button-return-back' clicked={ () => { navigate('/login') } } > 
            <ArrowIcon height='25px' width='25px' fill='var(--text-color--high-emphasis)'/>
          </Button>
        </div>
        { /* modal opaque background layer */ }
        <div className='authentication-container-opaque-background'></div>
        { /* header title */ }
        { <AuthenticationHeader title= { CONSTANT_VALUES.TITLE_PASSWORD_RESET_EMAIL } subtitle= { CONSTANT_VALUES.SUBTITLE_PASSWORD_RESET_EMAIL } /> }
        { /* auth illustration tab + guest welcome */ }
        <AuthenticationIllustrationTab isLayoutVertical={ 'vertical' } title={ CONSTANT_VALUES.TITLE_PASSWORD_RESET_EMAIL } subtitle={ CONSTANT_VALUES.SUBTITLE_PASSWORD_RESET_EMAIL } illustration={ <ForgotPasswordIllustration color1='var(--color-accent)' /> } />
        { /* auth modal */ }
        { resetPasswordModal }
      </div>
    </div>
  )
}