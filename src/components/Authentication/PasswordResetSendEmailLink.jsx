import React, {useState, useEffect} from 'react'
import { passwordResetSendEmailLink, OPERATIONS } from '../../helper/dataStorage';
import { useFormContext } from '../contexts/FormContext';
import Form from '../UI/Form';
import Input from '../UI/Input';
import './Authentication.css'
import {buildInputFields} from '../../helper/buildInputFields'
import {requestPasswordResetLink} from '../../helper/axiosRequests'
import Loader from '../SVG/Loader';

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
  return (
    <div className='shared-page-container shared-page-container--centered shared-page-container--with-padding'>   
      <div className='auth-modal'>
        {/* modal loader */}
        {isLoading ? <div className='auth-modal-loader'> <Loader width='50%'/> </div> : null }
        {/* modal background */}
        <div className='auth-modal-background'></div>
        {/* send reset password form */}
        {formData && 
          <Form 
            customStyle='authentication'
            title='Reset your password'
            operation={OPERATIONS.PASSWORD_RESET_SEND_EMAIL_LINK}
            submit={sendPasswordResetEmailHandler}
          > 
            {buildInputFields(passwordResetSendEmailLink).map(elem => (
              <Input 
                customStyle='authentication'
                key={elem.name} 
                name={elem.name} 
              /> 
            ))}
          </Form>
        }
        {/* status message container */}
        <div className='auth-modal-status-message'> <p> {message} </p> </div>
      </div>
    </div>
  )
}