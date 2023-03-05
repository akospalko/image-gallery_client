//TODO: DELETE MODAL CONTEXT AUTH RELATED CODE
import React, {useEffect} from 'react'
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

export default function Login() {
  // CONSTANTS
  const operation = OPERATIONS.LOGIN;
  // HOOKS
  const navigate = useNavigate(); 
  // ROUTE
  const from = location.state?.from?.pathname || "/";
  // CONTEXT
  const {formData, setFormData, message, setMessage} = useFormContext();
  const {auth, setAuth} = useAuthContext(); 
  // EFFECT
  useEffect(() => {
    setFormData(login);
  }, [setFormData])
  // HANDLERS
  // login handler 
  const loginHandler = async (e, formData) => {
    e.preventDefault();
    const convertedData = convertFormData(formData); // simplify data before sending request  
    const response = await loginUser(convertedData);
   try {
      const {roles, accessToken} = response;
      const authData = {username: convertedData.username, password: convertedData.password, roles, accessToken}; 
      setAuth(authData);  // store auth data in form
      setFormData(login);   // reset form to initial state
      navigate(from, { replace: true }); // navigate user to default resource
      console.log('auth');
    } catch(error) {
      // TODO: empty pasword field
    } 
    setMessage(response.message); // set status message
  }
  // STYLING
  // modal background
  const backgroundStyle= {
    backgroundImage: `url(${'https://images.unsplash.com/photo-1524369609384-10ce89e42d14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2077&q=80'})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center'
  }

  return (
    <div 
      style={backgroundStyle} 
      className='shared-page-container  shared-page-container--centered shared-page-container--with-padding'> 
      <div className='auth-modal'>
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
          </Form>
        }
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