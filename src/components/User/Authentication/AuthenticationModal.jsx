import React, {useEffect} from 'react'
import '../../Shared.css'
import './AuthenticationModal.css'
import Form from '../../UI/Form'
import Input from '../../UI/Input'
import Button from '../../UI/Button'
import {useModalContext} from '../../contexts/ToggleModalContext'
import {useFormContext} from '../../contexts/FormContext'
import {login, register} from '../../../helper/dataStorage'
import {buildInputFields} from '../../../helper/buildInputFields'
import {convertFormData} from '../../../helper/convertFormData'
import {createNewUser} from '../../../helper/axiosRequests'


export default function AuthenticationModal({operation}) {
  // CONTEXT
  const {authModalHandler} = useModalContext();
  const {formData, setFormData, setData} = useFormContext();
  // EFFECT
  useEffect(() => {
    // find initial value to set up modals with forms based on operation value
    let initialValue;
    switch(operation) { 
      case 'login':
        initialValue = login;
        break;
      case 'register':
        initialValue = register;
        break;
      default: 
        initialValue = login;
    }
    setFormData(initialValue);
  }, [operation, setFormData])
  // SUBMIT
  // submit login handler
  const loginHandler = async (e, formData) => {
    e.preventDefault();
    // logic
    console.log(formData)
    // reset form 
    setFormData(login);
  }
  // submit register handler
  const registerHandler = async (e, formData) => {
    e.preventDefault();
    const convertedData = convertFormData(formData); // simplyfy data before sending request  
    const {password, passwordConfirm, ...rest} = convertedData;
    // validate fields -> enable button
    // check for matching passwords  
    if(password !== passwordConfirm) return;
      delete convertedData.passwordConfirm; // delete pw from convertedData obj
      console.log(convertedData);
      const response = await createNewUser(convertedData);
      console.log(response);
      // reset form 
    setFormData(register);
  }
  // RENDERED ELEMENTS
  // login
  const loginModal = (
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
  )
  // register
  const registerModal = (
    <Form 
      title='Register'
      operation={operation}
      submit={registerHandler}
    > 
      {formData && buildInputFields(register).map(elem => (
        <Input 
          key={elem.name} 
          name={elem.name} 
          label={true}
        /> 
      ))}
    </Form>
  )
  // conditional rendering modals
  let renderModal; 
  switch(operation) {
    case 'login':
      renderModal = loginModal;
      break; 
    case 'register':
      renderModal = registerModal;
      break; 
    default:
      renderModal = <p> couldn't display modal </p>;
  }
  // buttons to toggle between login and register modals (we cannot pass down operations here thus they are hard coded)
  let toggleAuthModalButtonStyle = 'toggle-auth-modal';
  const toggleModalButton = (
    <div className='auth-modal-container'>
      <Button 
        clicked={() => authModalHandler('login')} 
        customStyle = { operation === 'login' ? [toggleAuthModalButtonStyle, 'active'].join(' '): toggleAuthModalButtonStyle}
      > Login </Button>  
      <Button 
        clicked={() => authModalHandler('register')}
        customStyle = { operation === 'register' ? [toggleAuthModalButtonStyle, 'active'].join(' '): toggleAuthModalButtonStyle}
      > Register </Button>
    </div>
  )

  return (
    <>
      {/* modal */}
      {formData && renderModal}
      {/* toggle login-register button */}
      {toggleModalButton}
    </>
  )
}