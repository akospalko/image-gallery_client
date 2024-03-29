// TODO: outsource client side status messages
// Authentication: login 
import React, { useEffect, useState } from 'react';
import '../Shared.css';
import './Authentication.css';
import Form from '../UI/Form';
import Input from '../UI/Input';
import Button from '../UI/Button';
import FormInitializers from '../../helper/FormInitializers';
import { buildInputFields, convertFormData} from '../../helper/utilities';
import { loginUser } from '../../helper/axiosRequests';
import { CONSTANT_VALUES } from '../../helper/constantValues';
import { statusDefault } from '../../helper/statusMessages';
import { useNavigate } from 'react-router';
import { useFormContext } from '../contexts/FormContext';
import { useStatusContext } from '../contexts/StatusContext';
import { useAuthContext} from '../contexts/AuthenticationContext';
import AuthenticationToggle from './AuthenticationToggle';
import LoaderIcon from '../SVG/Loader';
import { AvatarIllustration, AuthenticationDoorIllustration } from '../SVG/Illustrations';
import AuthenticationIllustrationTab, { AuthenticationHeader } from './AuthenticationIllustrationTab';
import useResponsiveBackground from '../hooks/useResponsiveBackground';

export default function Login() {
  // ROUTE
  const navigate = useNavigate(); 
  const from = location.state?.from?.pathname || "/";
 
  // HOOK 
  const { pageBackground } = useResponsiveBackground();
 
  // CONTEXT
  const {
    formData, setFormData, 
    setShowPassword, 
    setValidationMessages, 
    isFormValid } = useFormContext();
  const { status, setStatus, sendToast } = useStatusContext();
  const { setAuth } = useAuthContext(); 
  
  // STATE
  const [isSubmitting, setIsSubmitting] = useState(false); // handles form submit loading
  
  // MISC
  // form template
  const { login } = FormInitializers();

  // EFFECT
  // initialize form validation state 
  useEffect( () => {
    if(!Object.keys(login).length) return; 
    let validationObject = {};
    for(let field in login) {
      validationObject = {...validationObject, [field]: { status: false, message: '', touched: false }}
    }
    setValidationMessages(validationObject)
    return () => {
      setValidationMessages({});
    }
  }, [] )
  // form cleanup
  useEffect( () => {
    setFormData(login); 
    // setValidationMessages(login);
    return () => {
      setFormData({});
      // setIsFormInitialized(false);
      setStatus(statusDefault);
      setShowPassword({});
    }
  }, [])
  
  // HANDLERS
  // login handler 
  const loginHandler = async (e, formData) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const convertedData = convertFormData(formData); // simplify data before sending request  
      const response = await loginUser(convertedData); // get response 
      const { username, email, createdAt, roles, accessToken, userID, success, message } = response ?? {}; // destructure response values
      if(success) { // auth successfull
        sendToast(message);
        setAuth({ username, email, createdAt, roles, accessToken, userID }); // store auth data in state
        navigate(`/${ success && convertedData.username }/gallery`, { replace: true }); // navigate user to default resource 
        setFormData(login); // reset form to initial state
      } else { // auth failed
        setStatus({
          code: 'TODO PASS STATUS CODE',
          success: success, 
          message: message }); // set status message (for both success and failed auth)
        setFormData({ username: { ...formData.username }, password: { ...login.password } }); // empty password field before next login attempt
      }
    } catch(error) {
      setStatus(statusDefault); // set status message (for both success and failed auth)
    } finally {
      setIsSubmitting(false); 
      // invalidate password field
      setValidationMessages(prev => ({
        ...prev,
        username: { ...prev.username, touched: false, message: '' },
        password: { ...prev.password, status: false, touched: false, message: '' },
      }));
    }
  }
  
  // BUTTONS
  // submit form: login
  const loginButton = (
    <div className='shared-button-wrapper shared-button-wrapper--authentication'> 
      <Button 
        buttonStyle='button-authentication' 
        type='submit' 
        disabled={!isFormValid}
        clicked={(e) => {loginHandler(e, formData)}}
      > 
        <div className='auth-submit-button-content'>
          <span className='shared-button-content'> 
            { isFormValid ? isSubmitting ? 
              <div className='auth-modal-loader'> 
                { isSubmitting &&  <LoaderIcon height='30px' width='30px' stroke='var(--text-color--high-emphasis)'/> } 
              </div> 
              : CONSTANT_VALUES.BUTTON_LOG_IN 
                : 
                CONSTANT_VALUES.BUTTON_FILL_IN_FORM 
            } 
          </span> 
        </div>
      </Button>      
    </div> 
  )

  // navigation toggle button: login-register
  const navigationToggle = (
    <div className='auth-modal-navigate'>
      <AuthenticationToggle title='Login' active activeBorder='right'/>
      <AuthenticationToggle navigateTo='/register' title='Register'/>
    </div>
  ) 

  // Login modal
  const loginModal = (
    <div className='auth-modal'>
      { /* Group 1: form */ }
      <div className='auth-modal--group-1'>
        {/* header title */}
        { <AuthenticationHeader title= { CONSTANT_VALUES.TITLE_LOGIN } subtitle= { CONSTANT_VALUES.SUBTITLE_LOGIN } /> }
        { /* header avatar */ }
        <div className='auth-modal-avatar'>
          <AvatarIllustration color1='var(--color-accent)'/>
        </div>
        { /* login form */ }
        { formData && 
          <Form id='form-login' formStyle='form-authentication'> 
            { buildInputFields(login).map(elem => (
              <Input key={elem.name} name={elem.name} validationStyle='input-validation-authentication' /> 
            )) }
            {/* control group: reset password */}
            <div onClick={() => navigate('/password-reset')} className='auth-modal-reset-password'> 
              <span className='auth-modal-reset-password--content'> Forgot password? </span>
            </div>
          </Form>
        }
        { /* status message container */ }
        { 
          <div className='shared-status-message'> 
            <p> { status.message || '' } </p> 
          </div> 
          }
        { /* submit form button */ }
        { loginButton }
      </div>
      { /* group 2: modal sticky bottom */ }
      <div className='auth-modal--group-2'>   
        { navigationToggle }
      </div>
    </div>
  );
  
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
        { loginModal }
        { /* auth illustration tab + guest welcome */ }
        <AuthenticationIllustrationTab title={ CONSTANT_VALUES.TITLE_LOGIN } subtitle={ CONSTANT_VALUES.SUBTITLE_LOGIN } illustration={ <AuthenticationDoorIllustration/> } />
      </div>
    </div>
  )
}