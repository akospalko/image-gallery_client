//TODO: DELETE MODAL CONTEXT AUTH RELATED CODE
import React, {useEffect} from 'react'
import '../../Shared.css'
import './Authentication.css'
import Form from '../../UI/Form'
import Input from '../../UI/Input'
import {useFormContext} from '../../contexts/FormContext'
import {login} from '../../../helper/dataStorage'
import {buildInputFields} from '../../../helper/buildInputFields'
import {convertFormData} from '../../../helper/convertFormData'
import {loginUser} from '../../../helper/axiosRequests'
import {useAuthContext} from '../../contexts/AuthenticationContext'
import {useNavigate} from 'react-router'

export default function Login() {
  // CONSTANTS
  const operation = 'register';
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
 
  return (
    <div className='shared-page-container'> 
      {/* login form */}
      {formData && 
        <Form 
          title='Log in'
          operation={operation}
          submit={loginHandler}
        > 
          {formData && buildInputFields(login).map(elem => (
            <Input 
              key={elem.name} 
              name={elem.name} 
              label={true}
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
  )
}