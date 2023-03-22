import React, {useEffect} from 'react'
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

export default function Register() {
  // CONSTANTS
  const operation = OPERATIONS.REGISTER;
  // HOOKS
  const navigate = useNavigate(); 
  // ROUTE
  const from = location.state?.from?.pathname || "/";
  // CONTEXT
  const {formData, setFormData, message, setMessage} = useFormContext();
  // EFFECT
  useEffect(() => {
    setFormData(register); // set up form initial data
  }, [])
  // HANDLERS
  // register handler
  const registerHandler = async (e, formData) => {
    e.preventDefault();
    try {
      const convertedData = convertFormData(formData); // simplyfy data before sending request  
      const {password, passwordConfirm, username, email} = convertedData;
      console.log(password, passwordConfirm, username, email);
      // check for matching pw-s  
      if(password !== passwordConfirm) {
        const resetPassword = {username: {...formData.username}, email: {...formData.email}, password: {...register.password}, passwordConfirm: {...register.passwordConfirm}};
        setFormData(resetPassword);
        setMessage('Passwords are not matching');
       console.log(resetPassword);
        return;
      };
      delete convertedData.passwordConfirm; // if matching -> delete pw from convertedData obj
      const response = await createNewUser(convertedData);
      const {success, message} = response ?? {}; // destructure response values
      console.log(response);
      if(success) {  // register successfull
        setFormData(register); // reset form 
        navigate('/login'); //navigate to login page after successful registration
      } else { // register failed

      }

    } catch(error) {
      // TODO: empty pasword fields
      console.log(error);
    }      
  }

  // if(success) {  // auth successfull
  //   const authData = {username: convertedData.username, password: convertedData.password, roles, accessToken, userID}; 
  //   navigate(from, { replace: true }); // navigate user to default resource
  //   setAuth(authData);  // store auth data in form
  //   setFormData(login);   // reset form to initial state
  // } else { // auth failed
  //   // empty password field before next login attempt
  //   const resetPassword = {username: {...username}, password: {...login.password}};
  //   setFormData(resetPassword); // reset form to initial state
  // }

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
        {/* modal background */}
        <div className='auth-modal-background'></div>
        {/* register form */}
        {formData && 
          <Form 
            customStyle='authentication'
            title='Register'
            operation={operation}
            submit={registerHandler}
          > 
            {buildInputFields(register).map(elem => (
              <Input 
                customStyle='authentication'
                key={elem.name} 
                name={elem.name} 
              />
            ))}
          </Form>}
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