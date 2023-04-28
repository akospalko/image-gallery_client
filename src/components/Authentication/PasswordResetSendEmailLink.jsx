import React, {useState, useEffect} from 'react'
import { passwordResetSendEmailLink } from '../../helper/dataStorage';
import { useFormContext } from '../contexts/FormContext';
import Form from '../UI/Form';
import Input from '../UI/Input';
import './Authentication.css'
import {buildInputFields} from '../../helper/buildInputFields'
import {requestPasswordResetLink} from '../../helper/axiosRequests'
import Loader from '../SVG/Loader';
import Button from '../UI/Button';

export default function PasswordResetSendLink() {
  // CONTEXT
  const {formData, setFormData, message, setMessage} = useFormContext();
  // STATE
  const [isLoading, setIsLoading] = useState(false);
  // EFFECT
  useEffect(() => {
    setFormData(passwordResetSendEmailLink);
    // return () => setMessage('');
  }, [setFormData, setMessage])
  // HANDLERS
  // send a mail with a password reset link to the provided email address
  const sendPasswordResetEmailHandler = async (e, formData) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await requestPasswordResetLink({email: formData?.email?.value }); // get reet link by posting email
    setMessage(response.message);
    setIsLoading(false);
  }
  // BUTTON
  // submit form: request password reset link 
  const requestPasswordResetLinkButton = (
    <div className='shared-button-wrapper shared-button-wrapper--authentication'> 
      <Button 
        buttonStyle='button-authentication' 
        type='submit' 
        form='form-password-reset-link'
        disabled={false}
        clicked={(e) => {sendPasswordResetEmailHandler(e, formData)}}
      > Submit </Button>      
    </div> 
  )
  return (
    <div className='shared-page-container shared-page-container--centered shared-page-container--with-padding'>   
      <div className='auth-modal'>
        {/* modal loader */}
        {isLoading ? <div className='auth-modal-loader'> <Loader width='50%'/> </div> : null }
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