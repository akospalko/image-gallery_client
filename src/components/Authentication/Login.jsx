// TODO: DELETE MODAL CONTEXT AUTH RELATED CODE
// TODO: DELETE AC token from auth state
// TODO: add remember me + forgot password group
// TODO: add status message container: appear always or only when there is a message to display?

import React, {useEffect, useState} from 'react'
import '../Shared.css'
import './Authentication.css'
import Form from '../UI/Form'
import Input from '../UI/Input'
import {useFormContext} from '../contexts/FormContext'
import {login, OPERATIONS} from '../../helper/dataStorage'
import {buildInputFields} from '../../helper/buildInputFields'
import {convertFormData} from '../../helper/convertFormData'
import {loginUser} from '../../helper/axiosRequests'
import {useAuthContext} from '../contexts/AuthenticationContext'
import {useNavigate} from 'react-router'
import Loader from '../SVG/Loader'

export default function Login() {
  // CONSTANTS
  const operation = OPERATIONS.LOGIN;
  // HOOKS
  const navigate = useNavigate(); 
  // ROUTE
  const from = location.state?.from?.pathname || "/";
  // CONTEXT
  const {formData, setFormData, message, setMessage} = useFormContext();
  const {setAuth} = useAuthContext(); 
  // STATE
  const [isLoading, setIsLoading] = useState(false);

  // EFFECT
  useEffect(() => {
    setMessage('');
    setFormData(login);
  }, [setFormData])
  // HANDLERS
  // login handler 
  const loginHandler = async (e, formData) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const convertedData = convertFormData(formData); // simplify data before sending request  
      const response = await loginUser(convertedData); // get response 
      const {roles, accessToken, userID, success, message} = response ?? {}; // destructure response values
      setMessage(message); // set status message (for both success and failed auth)
      console.log(message);
      if(success) {  // auth successfull
        setAuth({username: convertedData.username, roles, accessToken, userID});  // store auth data in state
        navigate(from, { replace: true }); // navigate user to default resource 
        setFormData(login); // reset form to initial state
      } else { // auth failed
        setFormData({username: {...formData.username}, password: {...login.password}}); // empty password field before next login attempt
      }
    } catch(error) {
      // TODO: empty pasword field
      setMessage('Error. Try again later!'); // set status message (for both success and failed auth)
    } 
    setIsLoading(false);
  }
  // STYLING
  // modal background
  const backgroundStyle= {
    // backgroundImage: `url(${'https://images.unsplash.com/photo-1524369609384-10ce89e42d14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2077&q=80'})`,
    backgroundColor: 'rgba(100, 0, 0, 0.5)',
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
      {/* login form */}
      {formData && 
        <Form 
          customStyle='authentication'
          title='Log in'
          operation={operation}
          submit={loginHandler}
        > 
          {formData && buildInputFields(login).map(elem => (
            <Input 
              customStyle='authentication'
              key={elem.name} 
              name={elem.name} 
            /> 
          ))}
          <div> <p> forgot password? </p> </div>
        </Form>
      }
        {/* status message container */}
        <div> <p> {message} </p> </div>
        {/* login-register navigation button */}
        <div className='auth-modal-navigate'>
          <div className='auth-modal-navigate auth-modal-navigate--active'> 
            Login 
          </div>  
          <div onClick={() => navigate('/register')} className='auth-modal-navigate'>
            Register 
          </div>
        </div>
      </div>
    </div>
  )
}