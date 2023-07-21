// Authentication: register 
import React, {useEffect, useState} from 'react';
import '../Shared.css';
import './Authentication.css';
import 'react-toastify/dist/ReactToastify.css';
import Form from '../UI/Form';
import Input from '../UI/Input';
import Button from '../UI/Button';
import LoaderIcon from '../SVG/Loader';
import FormInitializers from '../../helper/FormInitializers';
import { buildInputFields, convertFormData } from '../../helper/utilities';
import { isPasswordMatching } from '../../helper/formValiadation';
import { createNewUser } from '../../helper/axiosRequests';
import { CONSTANT_VALUES } from '../../helper/constantValues';
import { INPUT_VALIDATION_MESSAGES, STATUS_MESSAGES, statusDefault } from '../../helper/statusMessages';
import { useNavigate } from 'react-router';
import { useFormContext } from '../contexts/FormContext';
import { useThemeContext } from '../contexts/ThemeContext';
import { useStatusContext } from '../contexts/StatusContext';
import { AvatarIllustration, AuthenticationDoorIllustration } from '../SVG/Illustrations';
import AuthenticationToggle from './AuthenticationToggle';
import AuthenticationIllustrationTab, { AuthenticationHeader } from './AuthenticationIllustrationTab';
import useResponsiveBackground from '../hooks/useResponsiveBackground';

export default function Register() {
  // HOOKS
  const navigate = useNavigate(); 
  const { pageBackground } = useResponsiveBackground();
  
  // CONTEXT
  const {
    formData, setFormData, 
    isFormValid,
    setValidationMessages, 
    setShowPassword,
  } = useFormContext();
  const { theme } = useThemeContext();
  const { status, setStatus, sendToast } = useStatusContext();
  // STATE
    const [isSubmitting, setIsSubmitting] = useState(false); // handles form submit loading
  
  // MISC
  // form template
  const { register } = FormInitializers();

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
      setStatus(statusDefault);
      setShowPassword({});
      // setValidationMessages({});
    }
  }, [])
  // HANDLERS
  // register handler
  const registerHandler = async (e, formData) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const convertedData = convertFormData(formData); // simplyfy data before sending request  
      const { password, passwordConfirm } = convertedData; // destructure converted data values
      const resetPassword = {username: { ...formData.username }, email: { ...formData.email}, password: { ...register.password }, passwordConfirm: { ...register.passwordConfirm } }; // empty pasword fields
      // check for matching PWs  
      const matchedPassword = isPasswordMatching (password, passwordConfirm); 
      if(!matchedPassword) {
        setFormData(resetPassword);
        setStatus({ ...statusDefault, message: INPUT_VALIDATION_MESSAGES.PASSWORDS_MATCH });
        return;
      };
      delete convertedData.passwordConfirm; // if pw matched -> delete pw confirm from convertedData
      const response = await createNewUser(convertedData);
      const { success, message } = response ?? {}; // destructure response values
      if(success) { // register successfull
        sendToast(message);
        navigate('/login'); // navigate to login page after successful registration
        setFormData(register); // reset form 
        setStatus(statusDefault);
      } else { // register failed
        setStatus({ 
          code: 'CODE',
          success: success,
          message: message
        }); 
        setFormData(resetPassword); // empty pasword fields
      }
    } catch(error) {
      setStatus({ ...statusDefault, message: STATUS_MESSAGES.ERROR_REQUEST }); 
    } finally {
      setIsSubmitting(false);     
    }
  }

  // BUTTON
  // submit form: register
  const registerButton = (
    <div className='shared-button-wrapper shared-button-wrapper--authentication'> 
      <Button 
        buttonStyle='button-authentication' 
        type='submit' 
        disabled={ !isFormValid }
        clicked={ (e) => { registerHandler(e, formData) } }
      > 
        <div className='auth-submit-button-content'>
          <span className='shared-button-content'> 
          { isFormValid ? isSubmitting ? <div className='auth-modal-loader'> { isSubmitting &&  <LoaderIcon height='30px' width='30px' stroke='var(--text-color--high-emphasis)'/> } </div> : CONSTANT_VALUES.BUTTON_REGISTER : CONSTANT_VALUES.BUTTON_FILL_IN_FORM } </span> 
        </div>
      </Button>      
    </div> 
  )

  // navigation toggle button: login-register
  const navigationToggle = (
    <div className='auth-modal-navigate'>
      <AuthenticationToggle navigateTo='/login' title='Login' />
      <AuthenticationToggle title='Register' active activeBorder='left'/>
    </div>
  ) 

  // Register modal
  const registerModal = (
    <div className='auth-modal'>
      {/* group 1: form */}
      <div className='auth-modal--group-1'>
        { /* header title */ }
        { <AuthenticationHeader title= { CONSTANT_VALUES.TITLE_REGISTER } subtitle= { CONSTANT_VALUES.SUBTITLE_REGISTER } /> }
        { /* header avatar */ }
        <div className='auth-modal-avatar'>
          <AvatarIllustration color1='var(--color-accent)'/>
        </div>
        { /* register form */ }
        { formData && 
          <Form id='form-register' formStyle='form-authentication'> 
            { buildInputFields(register).map(elem => (
              <Input key={elem.name} name={elem.name} validationStyle='input-validation-authentication' /> 
            )) }
          </Form>
        }
        { /* status message container */ }
        { <div className='shared-status-message'> <p> { status.message || '' } </p> </div> }
        { /* submit form button */ }
        { registerButton }
      </div>
      { /* group 2: modal sticky bottom */ }
      <div className='auth-modal--group-2'>   
        { navigationToggle }
      </div>
    </div>
  )

  return (
    <div 
      style={ pageBackground } 
      className='shared-page-container shared-page-container--centered'
    >   
      { /* container: */ }
      <div className='authentication-container'> 
        { /* modal opaque background layer */ }
        <div className='authentication-container-opaque-background'></div>
        { /* auth modal */ }
        { registerModal }
        { /* auth illustration tab + guest welcome */ }
        <AuthenticationIllustrationTab title={ CONSTANT_VALUES.TITLE_REGISTER } subtitle={ CONSTANT_VALUES.SUBTITLE_REGISTER } illustration={ <AuthenticationDoorIllustration /> } />
      </div>
    </div>
  )
}