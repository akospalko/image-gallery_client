import React, { useState, useEffect } from 'react';
import './Authentication.css';
import 'react-toastify/dist/ReactToastify.css';
import Form from '../UI/Form';
import Input from '../UI/Input';
import Button from '../UI/Button';
import LoaderIcon from '../SVG/Loader';
import { buildInputFields } from '../../helper/utilities';
import { requestPasswordResetLink } from '../../helper/axiosRequests';
import { passwordResetSendEmailLink } from '../../helper/dataStorage';
import { toast } from 'react-toastify';
import { useThemeContext } from '../contexts/ThemeContext';
import { useFormContext } from '../contexts/FormContext';

export default function PasswordResetSendLink() {
  // CONTEXT
  const {formData, setFormData, message, setMessage, isFormValid, setValidationMessages} = useFormContext();
  const {theme} = useThemeContext();
  // STATE
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      const response = await requestPasswordResetLink({email: formData?.email?.value }); // get reet link by posting email
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
        setIsLoading(false);
      }
    }
  // BUTTONS
  // submit form: request password reset link 
  const requestPasswordResetLinkButton = (
    <div className='shared-button-wrapper shared-button-wrapper--authentication'> 
      <Button 
        buttonStyle='button-authentication' 
        type='submit' 
        form='form-password-reset-link'
        disabled={!isFormValid}
        clicked={(e) => {sendPasswordResetEmailHandler(e, formData)}}
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
        {/* send reset password form */}
        {formData && 
          <Form id='form-password-reset-link' title='Password reset'> 
            {buildInputFields(passwordResetSendEmailLink).map(elem => (
              <Input inputStyle='input-authentication' key={elem.name} name={elem.name}/> 
            ))}
          </Form>
        }
        {/* status message container */}
        {message && <div className='shared-status-message'> <p> {message} </p> </div>}
        {/* submit form button */}
        {requestPasswordResetLinkButton}
      </div>
    </div>
  )
}