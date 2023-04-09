// TODO: outsource client side status messages
import React, {useEffect, useState} from 'react'
import '../Shared.css'
import './Authentication.css'
import Form from '../UI/Form'
import Input from '../UI/Input'
import {useFormContext} from '../contexts/FormContext'
import {OPERATIONS, register} from '../../helper/dataStorage'
import {buildInputFields} from '../../helper/buildInputFields'
import {convertFormData} from '../../helper/convertFormData'
import {createNewUser} from '../../helper/axiosRequests'
import {useNavigate} from 'react-router'
import Loader from '../SVG/Loader'
import Button from '../UI/Button'

export default function Register() {
  // CONSTANTS
  const operation = OPERATIONS.REGISTER;
  // HOOKS
  const navigate = useNavigate(); 
  // CONTEXT
  const {formData, setFormData, message, setMessage} = useFormContext();
    // STATE
    const [isLoading, setIsLoading] = useState(false);
  // EFFECT
  useEffect(() => {
    setMessage('');
    setFormData(register); // set up form initial data
  }, [setFormData, setMessage])
  // HANDLERS
  // register handler
  const registerHandler = async (e, formData) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const convertedData = convertFormData(formData); // simplyfy data before sending request  
      const {password, passwordConfirm} = convertedData; // destructure converted data values
      const resetPassword = {username: {...formData.username}, email: {...formData.email}, password: {...register.password}, passwordConfirm: {...register.passwordConfirm}}; // empty pasword fields
      // check for matching pw-s  
      if(password !== passwordConfirm) {
        setFormData(resetPassword);
        setMessage('Passwords are not matching');
        return;
      };
      delete convertedData.passwordConfirm; // if matching -> delete pw from convertedData obj
      const response = await createNewUser(convertedData);
      const {success, message} = response ?? {}; // destructure response values
      setMessage(message); 
      if(success) {  // register successfull
        navigate('/login'); //navigate to login page after successful registration
        setFormData(register); // reset form 
      } else { // register failed
        setFormData(resetPassword); // empty pasword fields
      }
    } catch(error) {
      setMessage('Error. Try again later!'); 
    } finally {
      setIsLoading(false);     
    }
  }
  // BUTTON
  // submit form: register
  const registerButton = (
    <div className='shared-button-wrapper shared-button-wrapper--authentication'> 
      <Button 
        buttonStyle='button-authentication' 
        type='submit' 
        form='form-register'
        disabled={false}
        clicked={(e) => {registerHandler(e, formData)}}
      > Register </Button>      
    </div> 
  )
  // STYLING
  // modal background
  const backgroundStyle= {
    backgroundImage: `url(${'https://images.unsplash.com/photo-1554570731-63bcddda4dcd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2127&q=80'})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center'
  }

  return (
    <div style={backgroundStyle} className='shared-page-container shared-page-container--centered shared-page-container--with-padding'> 
      <div className='auth-modal'>
        {/* modal loader */}
        {isLoading ? <div className='auth-modal-loader'> <Loader height='50%' width='50%'/> </div> : null }
        {/* modal background */}
        <div className='auth-modal-background'></div>
        {/* FORM: register */}
        {formData && 
          <Form id='form-register' title='Register'> 
          {buildInputFields(register).map(elem => (
            <Input inputStyle='input-authentication' key={elem.name} name={elem.name}/>
          ))}
          </Form>
        }
        {/* submit form button */}
        {registerButton}
        {/* status message container */}
        <div className='auth-modal-status-message'> <p> {message} </p> </div>
        {/* login-register navigation button */}
        <div className='auth-modal-navigate'>
          <div className='auth-modal-navigate' onClick={() => navigate('/login')}> 
            Login 
          </div>  
          <div className='auth-modal-navigate auth-modal-navigate--active'>
            Register 
          </div>
        </div>
      </div>
    </div>
  )
}