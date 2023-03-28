import React, {useState, useEffect} from 'react'
import { passwordResetSaveNewPassword, OPERATIONS } from '../../helper/dataStorage';
import { useFormContext } from '../contexts/FormContext';
import Form from '../UI/Form';
import Input from '../UI/Input';
import './Authentication.css'
import {buildInputFields} from '../../helper/buildInputFields'
import {convertFormData} from '../../helper/convertFormData'

export default function PasswordResetSaveNewPassword() {
  // CONTEXT
  const {formData, setFormData, message, setMessage} = useFormContext();
  // STATE
  const [isLoading, setIsLoading] = useState(false);
  // EFFECT
  useEffect(() => {
    setMessage('');
    setFormData(passwordResetSaveNewPassword);
  }, [setFormData, setMessage])
  // HANDLERS
  // send a mail with a password reset link to the provided email address
  const saveNewPasswordHandler = async (e, formData) => {
    e.preventDefault();
    console.log('password reset mail is sent')
    setMessage('Saved')
    // try {
    //   setIsLoading(true);
    //   const convertedData = convertFormData(formData); // simplify data before sending request  
    //   if(success) { // auth successfull
     
    //   } else { // auth failed
       
    //   }
    // } catch(error) {
    //   setMessage('Error. Try again later!'); // set status message (for both success and failed auth)
    // } finally {
    //   setIsLoading(false);     
    // }
  }
  return (
    <div className='shared-page-container shared-page-container--centered shared-page-container--with-padding'>   
    <div className='auth-modal'>
      {/* modal loader */}
      {isLoading ? <div className='auth-modal-loader'> <Loader height='50%' width='50%'/> </div> : null }
      {/* modal background */}
      <div className='auth-modal-background'></div>
      {/* send reset password form */}
      {formData && 
        <Form 
          customStyle='authentication'
          title='Create new password'
          operation={OPERATIONS.PASSWORD_RESET_SAVE_NEW_PASSWORD}
          submit={saveNewPasswordHandler}
        > 
          {buildInputFields(passwordResetSaveNewPassword).map(elem => (
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