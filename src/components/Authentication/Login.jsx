// TODO: outsource client side status messages, constants
// Authentication: login 
import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import '../Shared.css';
import './Authentication.css';
import 'react-toastify/dist/ReactToastify.css';
import Form from '../UI/Form';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { login } from '../../helper/dataStorage';
import { buildInputFields, convertFormData} from '../../helper/utilities';
import { loginUser } from '../../helper/axiosRequests';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useFormContext } from '../contexts/FormContext';
import { useAuthContext} from '../contexts/AuthenticationContext';
import { useThemeContext } from '../contexts/ThemeContext';
import AuthenticationToggle from './AuthenticationToggle';
import LoaderIcon from '../SVG/Loader';
import { AvatarIllustration } from '../SVG/Illustrations';
import { BlobLandscapeBackground, BlobPortraitBackground } from '../SVG/Backgrounds';
import AuthenticationIllustrationTab, { AuthenticationHeader } from './AuthenticationIllustrationTab';
import { useMediaQuery } from 'react-responsive';

export default function Login() {
  // CONSTANTS
  // TODO: Outsource
  const titleText = 'Welcome back,';
  const subtitleText = 'Log in to continue...';
  // ROUTE
  const navigate = useNavigate(); 
  const from = location.state?.from?.pathname || "/";
  // HOOK 
  const isLargeScreen = useMediaQuery({ query: '(min-width: 768px)' });
  // CONTEXT
  const {
    formData, setFormData, 
    message, setMessage, 
    setShowPassword, 
    setValidationMessages, 
    isFormValid } = useFormContext();
  const { setAuth } = useAuthContext(); 
  const { theme, colors } = useThemeContext();
  

  // STATE
  const [isSubmitting, setIsSubmitting] = useState(false); // handles form submit loading
  // EFFECT
  // initialize form validation state 
  useEffect(() => {
    if(!Object.keys(login).length) return; 
    let validationObject = {};
    for(let field in login) {
      validationObject = {...validationObject, [field]: {status: false, message: '', touched: false}}
    }
    setValidationMessages(validationObject)
    return () => {
      setValidationMessages({});
    }
  }, [])
  // form cleanup
  useEffect(() => {
    setFormData(login); 
    // setValidationMessages(login);
    return () => {
      setFormData({});
      // setIsFormInitialized(false);
      setMessage('');
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
      const {username, email, createdAt, roles, accessToken, userID, success, message} = response ?? {}; // destructure response values
      if(success) { // auth successfull
        toast(`${message}`, {
          className: "shared-toast",
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: theme,
          });
        setAuth({username, email, createdAt, roles, accessToken, userID}); // store auth data in state
        navigate(`/${success && convertedData.username}/gallery`, { replace: true }); // navigate user to default resource 
        setFormData(login); // reset form to initial state
      } else { // auth failed
        setMessage(message); // set status message (for both success and failed auth)
        setFormData({username: {...formData.username}, password: {...login.password}}); // empty password field before next login attempt
      }
    } catch(error) {
      setMessage('Error. Try again later!'); // set status message (for both success and failed auth)
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
          <span className='shared-submit-form-button-content'> 
          { isFormValid ? isSubmitting ? <div className='auth-modal-loader'> { isSubmitting &&  <LoaderIcon height='30px' width='30px' stroke='var(--text-color--high-emphasis)'/> } </div> : 'Log in' : 'Fill in form' } </span> 
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
      {/* Group 1: form */}
      <div className='auth-modal--group-1'>
        {/* header title */}
        { <AuthenticationHeader title= { titleText } subtitle= { subtitleText } /> }
        {/* header avatar */}
        <div className='auth-modal-avatar'>
          <AvatarIllustration color1='var(--color-accent)'/>
        </div>
        {/* login form */}
        { formData && 
          <Form id='form-login' formStyle='form-authentication'> 
            { buildInputFields(login).map(elem => (
              <Input key={elem.name} name={elem.name} inputStyle='input-authentication' validationStyle='input-validation-authentication' /> 
            )) }
            {/* control group: reset password */}
            <div onClick={() => navigate('/password-reset')} className='auth-modal-reset-password'> 
              <span className='auth-modal-reset-password--content'> Forgot password? </span>
            </div>
          </Form>
        }
        {/* status message container */}
        { <div className='shared-status-message'> <p> { message || '' } </p> </div> }
        {/* submit form button */}
        { loginButton }
      </div>
      {/* group 2: modal sticky bottom */}
      <div className='auth-modal--group-2'>   
        { navigationToggle }
      </div>
    </div>
  );
  
  // BACKGROUND
  // Set up responsive background
  const backgroundComponents = (
    <>
      {isLargeScreen ? 
        // Landscape for tablet/pc view
        <BlobLandscapeBackground color1={colors.colorMain} color2={colors.colorTernaryTransparentHigh} />
        : 
        // Portrait for mobile view
        <BlobPortraitBackground  color1={colors.colorMain} color2={colors.colorTernaryTransparentHigh} />
      }
    </>
  )
  // Convert svg component to string 
  const renderedBackground = encodeURIComponent(ReactDOMServer.renderToString(backgroundComponents));
  // Define background as inline style
  const modalBackground = {
    backgroundPosition: 'center', 
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url("data:image/svg+xml, ${renderedBackground}")`,
    backgroundColor: 'var(--bg-color--main)'
  }

  return (
    <div 
      style={modalBackground} 
      className='shared-page-container shared-page-container--centered'
    >   
      {/* container: */}
      <div className='authentication-container'> 
        {/* modal opaque background layer */}
        <div className='authentication-container-opaque-background'></div>
        { /* auth modal */ }
        { loginModal }
        { /* auth illustration tab + guest welcome */ }
        <AuthenticationIllustrationTab title={ titleText } subtitle={ subtitleText } />
      </div>
    </div>
  )
}