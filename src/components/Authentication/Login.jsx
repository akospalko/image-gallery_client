// Authentication: login 
// TODO: outsource client side status messages
import React, { useEffect, useState } from 'react';
import '../Shared.css';
import './Authentication.css';
import 'react-toastify/dist/ReactToastify.css';
import Form from '../UI/Form';
import Input from '../UI/Input';
import Button from '../UI/Button';
import LoaderIcon from '../SVG/Loader';
import { login, OPERATIONS } from '../../helper/dataStorage';
import { buildInputFields, convertFormData} from '../../helper/utilities';
import { loginUser } from '../../helper/axiosRequests';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useFormContext } from '../contexts/FormContext';
import { useAuthContext} from '../contexts/AuthenticationContext';
import { useThemeContext } from '../contexts/ThemeContext';

export default function Login() {
  // CONSTANTS
  const operation = OPERATIONS.LOGIN;
  // HOOKS
  const navigate = useNavigate(); 
  // ROUTE
  const from = location.state?.from?.pathname || "/";
  // CONTEXT
  const {formData, setFormData, message, setMessage, setShowPassword, setValidationMessages, setIsFormInitialized, isFormValid} = useFormContext();
  const {setAuth} = useAuthContext(); 
  const {theme} = useThemeContext();
  // STATE
  const [isLoading, setIsLoading] = useState(false);
  // EFFECT
  // form cleanup
  useEffect(() => {
    setFormData(login); 
    return () => {
      setFormData({});
      setIsFormInitialized(false);
      setMessage('');
      setShowPassword({});
      setValidationMessages({});
    }
  }, [])
  // HANDLERS
  // login handler 
  const loginHandler = async (e, formData) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const convertedData = convertFormData(formData); // simplify data before sending request  
      const response = await loginUser(convertedData); // get response 
      const {roles, accessToken, userID, success, message} = response ?? {}; // destructure response values
      if(success) { // auth successfull
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
        setAuth({username: convertedData.username, roles, accessToken, userID}); // store auth data in state
        navigate(`/${success && convertedData.username}/gallery`, { replace: true }); // navigate user to default resource 
        setFormData(login); // reset form to initial state
      } else { // auth failed
        setMessage(message); // set status message (for both success and failed auth)
        setFormData({username: {...formData.username}, password: {...login.password}}); // empty password field before next login attempt
      }
    } catch(error) {
      setMessage('Error. Try again later!'); // set status message (for both success and failed auth)
    } finally {
      setIsLoading(false);     
    }
  }
  // BUTTON
  // submit form: login
  const loginButton = (
    <div className='shared-button-wrapper shared-button-wrapper--authentication'> 
      <Button 
        buttonStyle='button-authentication' 
        type='submit' 
        form='form-login'
        disabled={!isFormValid}
        clicked={(e) => {loginHandler(e, formData)}}
      > Login </Button>      
    </div> 
  )

  return (
    <div className='shared-page-container shared-page-container--centered shared-page-container--with-padding'>   
      <div className='auth-modal'>
        {/* modal loader */}
        {isLoading ? <div className='auth-modal-loader'> <LoaderIcon height='100px' width='100px' stroke='var(--text-color--high-emphasis)'/> </div> : null }
        {/* modal background */}
        <div className='auth-modal-background'></div>
        {/* login form */}
        {formData && 
          <Form id='form-login' title='Log in' formStyle='form-authentication' > 
            {buildInputFields(login).map(elem => (
              <Input key={elem.name} name={elem.name} inputStyle='input-authentication' label labelStyle='label-authentication'/> 
            ))}
            {/* control group: reset password */}
            <div onClick={() => navigate('/password-reset')} className='auth-modal-reset-password'> 
              Forgot password?
            </div>
          </Form>
        }
        {/* status message container */}
        {message && <div className='shared-status-message'> <p> {message} </p> </div>}
        {/* submit form button */}
        {loginButton}
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