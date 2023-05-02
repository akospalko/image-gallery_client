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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useThemeContext } from '../contexts/ThemeContext'

export default function Register() {
  // CONSTANTS
  const operation = OPERATIONS.REGISTER;
  // HOOKS
  const navigate = useNavigate(); 
  // CONTEXT
  const {formData, setFormData, message, setMessage} = useFormContext();
  const {theme} = useThemeContext();
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
      if(success) {  // register successfull
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
        navigate('/login'); //navigate to login page after successful registration
        setFormData(register); // reset form 
      } else { // register failed
        setMessage(message); 
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

  return (
    <div className='shared-page-container shared-page-container--centered shared-page-container--with-padding'> 
      <div className='auth-modal'>
        {/* modal loader */}
        {isLoading ? <div className='auth-modal-loader'> <Loader height='30%' width='30%' stroke='var(--text-color--high-emphasis)'/> </div> : null }
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
        {/* status message container */}
        {message && <div className='shared-status-message'> <p> {message} </p> </div>}
        {/* submit form button */}
        {registerButton}
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