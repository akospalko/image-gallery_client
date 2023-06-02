// TODO: outsource client side status messages
import React, {useEffect, useState} from 'react';
import '../Shared.css';
import './Authentication.css';
import 'react-toastify/dist/ReactToastify.css';
import Form from '../UI/Form';
import Input from '../UI/Input';
import Button from '../UI/Button';
import LoaderIcon from '../SVG/Loader';
import { register } from '../../helper/dataStorage';
import { buildInputFields, convertFormData } from '../../helper/utilities';
import { isPasswordMatching } from '../../helper/formValiadation';
import { createNewUser } from '../../helper/axiosRequests';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useFormContext } from '../contexts/FormContext';
import { useThemeContext } from '../contexts/ThemeContext';
import { INPUT_VALIDATION_MESSAGES } from '../../helper/statusMessages';

export default function Register() {
  // CONSTANTS
  // const operation = OPERATIONS.REGISTER;
  // HOOKS
  const navigate = useNavigate(); 
  // CONTEXT
  const {
    formData, setFormData, 
    message, setMessage, 
    isFormValid,
    setValidationMessages, 
    setShowPassword,
  } = useFormContext();
  const {theme} = useThemeContext();
  // STATE
    const [isLoading, setIsLoading] = useState(false);
  // EFFECT
  // initialize form validation state
  useEffect(() => {
    if(!Object.keys(register).length) return; 
    let validationObject = {};
    for(let field in register) {
      validationObject = {...validationObject, [field]: {status: false, message: '', touched: false}}
    }
    setValidationMessages(validationObject)
    return () => {
      setValidationMessages({});
    }
  }, [])
  // form cleanup
  useEffect(() => {
    setFormData(register); 
    // setValidationMessages(register);
    return () => {
      setFormData({});
      setMessage('');
      setShowPassword({});
      // setValidationMessages({});
    }
  }, [])
  // HANDLERS
  // register handler
  const registerHandler = async (e, formData) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const convertedData = convertFormData(formData); // simplyfy data before sending request  
      const {password, passwordConfirm} = convertedData; // destructure converted data values
      const resetPassword = {username: {...formData.username}, email: {...formData.email}, password: {...register.password}, passwordConfirm: {...register.passwordConfirm}}; // empty pasword fields
      // check for matching PWs  
      const matchedPassword = isPasswordMatching (password, passwordConfirm); 
      if(!matchedPassword) {
        setFormData(resetPassword);
        setMessage(INPUT_VALIDATION_MESSAGES.PASSWORDS_MATCH); // TODO: outsource status message
        return;
      };
      delete convertedData.passwordConfirm; // if pw matched -> delete pw confirm from convertedData
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
        setMessage('');
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
        disabled={!isFormValid}
        clicked={(e) => {registerHandler(e, formData)}}
      > Register </Button>      
    </div> 
  )

  return (
    <div className='shared-page-container shared-page-container--centered shared-page-container--with-padding'> 
      <div className='auth-modal'>
        {/* modal loader */}
        {isLoading ? <div className='auth-modal-loader'> <LoaderIcon height='100px' width='100px' stroke='var(--text-color--high-emphasis)'/> </div> : null }
        {/* modal background */}
        <div className='auth-modal-background'></div>
        {/* FORM: register */}
        {formData && 
          <Form id='form-register' title='Register'> 
          {buildInputFields(register).map(elem => (
            <Input inputStyle='input-authentication' key={elem.name} name={elem.name} label labelStyle='label-authentication' />
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