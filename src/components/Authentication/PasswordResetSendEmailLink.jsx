// Password reset - request password reset email link
import React, { useState, useEffect } from 'react';
import './Authentication.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import Form from '../UI/Form';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { buildInputFields } from '../../helper/utilities';
import { requestPasswordResetLink } from '../../helper/axiosRequests';
import { passwordResetSendEmailLink } from '../../helper/dataStorage';
import { useThemeContext } from '../contexts/ThemeContext';
import { useFormContext } from '../contexts/FormContext';
import useResponsiveBackground from '../hooks/useResponsiveBackground';
import AuthenticationIllustrationTab, { AuthenticationHeader } from './AuthenticationIllustrationTab';
import { ForgotPasswordIllustration } from '../SVG/Illustrations';
import LoaderIcon from '../SVG/Loader';
import { ArrowIcon } from '../SVG/Icons';

export default function PasswordResetSendLink() {
  // ROUTE
  const navigate = useNavigate();
  // CONSTANTS
  // TODO: Outsource
  const titleText = 'Forgot password ?';
  const subtitleText = 'request a new one';
  const navBackButtonTitle='return back to login page';
  // CONTEXT
  const { formData, setFormData, message, setMessage, isFormValid, setValidationMessages } = useFormContext();
  const { theme } = useThemeContext();
  // HOOK 
  const { pageBackground } = useResponsiveBackground();
  // STATE
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await requestPasswordResetLink({ email: formData?.email?.value }); // get reet link by posting email
      const {success, message} = response ?? {};
      if(success) {
        console.log(response);
        toast(`${message}`, {
          className: "shared-toast",
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: theme,
          });
        } else {
          setMessage(response.message);
        }
      }
      catch (error) {
        setMessage('Error. Try again later!'); 
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
        disabled={!isFormValid}
        clicked={ (e) => { sendPasswordResetEmailHandler(e, formData) } }
      > 
        <div className='auth-submit-button-content'>
          <span className='shared-button-content'> 
          { isFormValid ? isSubmitting ? <div className='auth-modal-loader'> { isSubmitting && <LoaderIcon height='30px' width='30px' stroke='var(--text-color--high-emphasis)'/> } </div> : 'Reset password' : 'Fill in form' } </span> 
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
        { <div className='shared-status-message'> <p> { message || '' } </p> </div> }
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
          <Button title={ navBackButtonTitle } buttonStyle='button-return-back' clicked={ () => { navigate('/login') } } > 
            <ArrowIcon height='25px' width='25px' fill='var(--text-color--high-emphasis)'/>
          </Button>
        </div>
        { /* modal opaque background layer */ }
        <div className='authentication-container-opaque-background'></div>
        { /* header title */ }
        { <AuthenticationHeader title= { titleText } subtitle= { subtitleText } /> }
        { /* auth illustration tab + guest welcome */ }
        <AuthenticationIllustrationTab isLayoutVertical={ 'vertical' } title={ titleText } subtitle={ subtitleText } illustration={ <ForgotPasswordIllustration color1='var(--color-accent)' /> } />
        { /* auth modal */ }
        { resetPasswordModal }
      </div>
    </div>
  )
}