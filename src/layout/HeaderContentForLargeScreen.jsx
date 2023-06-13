// Header content for large screens
import React from 'react';
import './Header.css';
import { useModalContext } from '../components/contexts/ToggleModalContext';
import { useAuthContext } from '../components/contexts/AuthenticationContext';
import { useThemeContext } from '../components/contexts/ThemeContext';
import UserProfileMenu from './UserProfileMenu';
import useHeaderNavigation from './useHeaderNavigation';
import ThemeToggler from '../components/UI/ThemeToggler';
import Button from '../components/UI/Button';
import { PhotoEntryIcon } from '../components/SVG/Icons';
import { UserIcon } from '../components/SVG/Icons'
import { cropText } from '../helper/utilities';
import HeaderAuthenticationCTAButton from './HeaderAuthenticationCTAButton';

export default function HeaderContentForLargeScreen({ navElements }) {
  // CONSTANTS
  const usernameMaxDisplayLength = 30;
  const userProfileMenuMaxDisplayLength = 40;
  const loginRoute = '/login'; // login page route
  // CONTEXT 
  const { toggleDropdown, toggleDropdownHandler } = useModalContext();
  const { auth } = useAuthContext();
  const { toggleThemeHandler } = useThemeContext();
  const { navigationElements } = useHeaderNavigation(navElements);
  
  // RENDERED ELEMENTS
  // USER PROFILE
  // Username and profile icon/button   
  const userProfile = (
    <>
      { /* display username */ }
      <div className='header-container-user-profile-name' title={ auth?.username }>  
        <span> { auth.username && cropText(auth.username, usernameMaxDisplayLength) } </span>
      </div>
      {/* profile icon: toggle profile menu */}
      <div className='header-container-user-profile-button'>
        <Button 
          buttonStyle='button-header-menu'
          disabled={ toggleDropdown }
          clicked={ toggleDropdownHandler } // toggle menu 
          > <UserIcon width='25px' height='25px' stroke='var(--text-color--high-emphasis)'/> 
        </Button>
      </div>
    </>
  )

  return (
    // Header bar
    <div className='header-bar'>
      { /* Group 1: logo, navigation */ }
      <div className='header-bar-group header-bar-group--1'>
        { /* Logo */ }
        <div className='header-logo'> <PhotoEntryIcon height='50px' width='50px' /> </div>
        { /* Header navigation */ }
        <div className='header-navigation-elements'>
          { navigationElements }
        </div>
      </div>
      { /* Group 2: theme toggle, user profile */ }
      <div className='header-bar-group header-bar-group--2'>
        {/* Theme toggler */}
        <div className='header-theme-toggler' onClick={ toggleThemeHandler }> <ThemeToggler size='25px' /> </div>
        { /* User profile */ }
        <div className='header-container-user-profile'> 
          { /* user profile || authentication cta button */ }
          { auth.username ? userProfile : <HeaderAuthenticationCTAButton title='login' routeToNavigate={ loginRoute } /> }
        </div>
      </div>
      { /* User profile menu */ }
      { auth.username && toggleDropdown && <UserProfileMenu cropTextLength={ userProfileMenuMaxDisplayLength } /> }
    </div>
  )
}