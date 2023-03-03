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
    const convertedData = convertFormData(formData); // simplyfy data before sending request  
    const {password, passwordConfirm, ...rest} = convertedData;
    // validate fields -> enable button
    // check for matching pw-s  
    if(password !== passwordConfirm) {
      setMessage('Passwords are not matching');
      return;
    };
    delete convertedData.passwordConfirm; // if matching -> delete pw from convertedData obj
    const response = await createNewUser(convertedData);
    try {
      setFormData(register); // reset form 
      navigate('/login'); //navigate to login page after successful registration
      }
    catch(error) {
     // TODO: empty pasword fields
    }      
    setMessage(response.message); // set status message
  }

  return (
    <div className='shared-page-container'> 
      {/* register */}
      {formData && 
        <Form 
          title='Register'
          operation={operation}
          submit={registerHandler}
        > 
          {buildInputFields(register).map(elem => (
            <Input 
              key={elem.name} 
              name={elem.name} 
              label={true}
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
  )
}