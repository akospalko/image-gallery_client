// CTA authentication (login) button for header
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';

export default function HeaderAuthenticationCTAButton(props) {
  // PROPS
  const { 
    title, // button title
    routeToNavigate // link where the button should navigate to
  } = props; 

  // ROUTE
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <Button 
      buttonStyle='button-authentication-cta' 
      disabled={ location.pathname === routeToNavigate }
      clicked={ () => { navigate(routeToNavigate) } }
    > <span className='header-authentication-cta-button-content'> { title } </span> 
    </Button>
  )
}