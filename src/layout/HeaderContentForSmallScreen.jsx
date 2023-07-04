// Header content for small screens
import React from 'react';
import './Header.css';
import { useModalContext } from '../components/contexts/ToggleModalContext';
import { useAuthContext } from '../components/contexts/AuthenticationContext';
import useHeaderNavigation from './useHeaderNavigation';
import UserProfileMenu from './UserProfileMenu';
import Button from '../components/UI/Button';
import { UserIcon }  from '../components/SVG/Icons';
import { PhotoEntryIcon } from '../components/SVG/Icons';
import { cropStringToLength } from '../helper/utilities';
import { useMediaQuery } from 'react-responsive';
import HeaderAuthenticationCTAButton from './HeaderAuthenticationCTAButton';

export default function HeaderContentForSmallScreen({ navElements }) {
  // CONSTANTS
  const usernameMaxDisplayLength = 20;
  const userProfileMenuMaxDisplayLength = 30;
  const loginRoute = '/login'; // login page route
  // CONTEXT 
  const { toggleModal, toggleDropdown, toggleDropdownHandler } = useModalContext();
  const { auth } = useAuthContext();
  // HOOK
  const isScreenBelow300Px = useMediaQuery({ query: '(max-width: 300px)' });
  const { navigationMenu, openNavigationMenuButton } = useHeaderNavigation(navElements);
  
  // USER PROFILE
  // Username + button/icon 
  const userProfile = ( 
    <>
      { /* display username */ }
      { !isScreenBelow300Px && <div className='header-container-user-profile-name' title={ auth?.username } > 
        <span> { auth.username && cropStringToLength(auth.username, usernameMaxDisplayLength) } </span>
      </div>}
      {/* profile icon: toggle user profile menu */}
      <Button 
        buttonStyle='button-header-menu'
        disabled={ toggleDropdown }
        clicked={ toggleDropdownHandler } // close menu
      > <UserIcon width='25px' height='25px' stroke='var(--text-color--high-emphasis)'/> 
      </Button>
    </>
  );

  return (
    <div className='header-bar'>
      { /* Group 1: nav menu button */ }
      { /* Header navigation */ }
      <div className='header-bar-group header-bar-group--1'>
        <div className='header-navigation-menu-button'>
          { openNavigationMenuButton }
        </div>
      </div>
      { /* Logo */ }
      <div className='header-logo'> <PhotoEntryIcon height='45px' width='45px' /> </div>
      { /* Group 2: logo */ }
      { /* User profile */ }
      <div className='header-bar-group header-bar-group--2'>
        <div className='header-container-user-profile'> 
          { /* user profile || authentication cta button */ }
          { auth.username ? userProfile : <HeaderAuthenticationCTAButton title='login' routeToNavigate={ loginRoute } /> }
        </div>
      </div>
      { /* Menus */ }
      { /* navigation menu */ }
      { toggleModal.HEADER_NAV && navigationMenu }
      { /* user profile menu */ }
      { auth.username && toggleDropdown && <UserProfileMenu cropTextLength={ userProfileMenuMaxDisplayLength } /> }
    </div>
  )
}