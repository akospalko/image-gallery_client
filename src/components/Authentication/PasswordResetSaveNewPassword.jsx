import React, {useState, useEffect} from 'react'
import { passwordResetSaveNewPassword, OPERATIONS } from '../../helper/dataStorage';
import { useFormContext } from '../contexts/FormContext';
import Form from '../UI/Form';
import Input from '../UI/Input';
import './Authentication.css'
import {buildInputFields} from '../../helper/buildInputFields'
import {convertFormData} from '../../helper/convertFormData'
import {useParams} from 'react-router-dom';
import {checkPasswordResetLinkValidity, resetPassword} from '../../helper/axiosRequests'
import Loader from '../SVG/Loader';
import {useNavigate} from 'react-router'

export default function PasswordResetSaveNewPassword() {
  // ROUTES
  const navigate = useNavigate();
  const {id, token} = useParams(); // get url parameters (id, token)
  // CONTEXT
  const {formData, setFormData, message, setMessage} = useFormContext();
  // STATE
  const [isLoading, setIsLoading] = useState(true);
  // EFFECT
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
    console.log(passwordResetSaveNewPassword);
    if(!id || !token) { // check for necessary data, if not provided navigate to error page
      setMessage('Missing ID/Token');
      navigate('/error-page'); // nav user to error page 
    } 
    setIsLoading(true); 
    const convertedData = convertFormData(formData); // simplify data before sending request  
    const response = await resetPassword(id, token, convertedData); 
    setMessage(response.message);
    if(response?.isTokenValid === false) { // invalid token -> nav to error page 
      console.log(message);
      navigate('/error-page'); 
    } 
    if(response?.errorField === 'email') { // wrong email: reset input 
      setFormData({email: {...passwordResetSaveNewPassword.email}, password: {...formData.password}, passwordConfirm: {...formData.passwordConfirm}}); // empty password field before next login attempt
    }  
    if(response?.errorField === 'password') {  // wrong password: reset input 
      setFormData({email: {...formData.email}, password: {...passwordResetSaveNewPassword.password}, passwordConfirm: {...passwordResetSaveNewPassword.passwordConfirm}}); 
    } 
    setIsLoading(false);
    if(response?.success) { setTimeout(()=> { navigate('/login'); return }, 1000) } // success: nav to login page
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
            submit={resetPasswordHandler}
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