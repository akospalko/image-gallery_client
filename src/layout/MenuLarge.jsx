// Menu bar for large screens
import React from 'react';
import './Header.css';
import MenuUserProfile from './MenuUserProfile';
import MenuNavigationElements from './MenuNavigationElements';
import { useNavigate } from 'react-router-dom';
import { useModalContext } from '../components/contexts/ToggleModalContext';
import { useAuthContext } from '../components/contexts/AuthenticationContext';

export default function MenuLarge({navElements}) {
  // ROUTE
  const navigate = useNavigate();
  // CONTEXT 
  const {toggleDropdown, toggleDropdownHandler} = useModalContext();
  const {auth} = useAuthContext();
  // HOOK
  const {userProfileDropdown} = MenuUserProfile();
  const {menuBarNavigationElements} = MenuNavigationElements(navElements);
  // RENDERED ELEMENTS
  // header button for dropdowns (which means larger screens) unauth user: nav to login pg
  const userProfileDropdownButton = (
    <div 
      className='header-menu-modal-icon'
      onClick={
        auth.username ? 
        () => {toggleDropdownHandler()} 
        : 
        () => {navigate('/login')}
      }
    > Login 
    </div>
  )

  return (
    <div className='header-container-menu-bar'> 
      <div className='header-dummy'></div>
      <div className='header-bar-container'>
        {/* menu bar navigaiton elements */}
        <div className='header-bar-navigation'>
          {menuBarNavigationElements}
        </div> 
      </div>
      {/* user profile button */}
      {userProfileDropdownButton}
      {/* user profile dropdown */}
      {toggleDropdown && userProfileDropdown} 
    </div>
  )
}