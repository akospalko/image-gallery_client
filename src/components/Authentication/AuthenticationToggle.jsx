// Navigation between login and register authentication pages
import React from 'react';
import { useNavigate } from 'react-router';
import './Authentication.css';

export default function AuthenticationToggle(props) {
  // PROPS
  const {
    navigateTo, // string. navigation link: /login
    title, // string. button title
    activeBorder, // string. 'left || 'right'. Decides active button's border: top + left || top + right 
    active // bool. check for active button
  } = props;
  // ROUTE
  const navigate = useNavigate();
    
  let activeStyle;
  if(active) {
    if(activeBorder === 'left') {
      activeStyle = 'auth-modal-navigate--active auth-modal-navigate--active-border-right';
    }
    else if(activeBorder === 'right') {
      activeStyle = 'auth-modal-navigate--active auth-modal-navigate--active-border-left';
    }
    else {
      activeStyle = 'auth-modal-navigate--active';
    }
  }

  return (
    <div 
      onClick={ navigateTo?.length && (() => navigate(navigateTo)) } 
      className={`auth-modal-navigate ${activeStyle}`}
    > <span className='auth-modal-navigate-content'> { title || '' } </span>
    </div>
  )
}