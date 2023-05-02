// menu bar for small screens
// TODO: toggle menu elems on click -> menu bar (only for mobile / ?tablet) 
// TODO: swap modal menu toggle button text(close - open) to icon (hamburger - x) 
import React from 'react'
import './Header.css'
import {useModalContext} from '../components/contexts/ToggleModalContext'
import {useAuthContext} from '../components/contexts/AuthenticationContext'
import {useNavigate} from 'react-router-dom'
import {OPERATIONS} from '../helper/dataStorage'
import MenuUserProfile from './MenuUserProfile';
import MenuNavigationElements from './MenuNavigationElements';
import {UserIcon, MenuOpenIcon, MenuCloseIcon}  from '../components/SVG/Icons'
import Button from '../components/UI/Button'

export default function MenuSmall({navElements}) {
  // ROUTE
  const navigate = useNavigate();
  // CONTEXT 
  const {toggleModal, toggleModalHandler} = useModalContext();
  const {auth} = useAuthContext();
  // RENDERED ELEMENTS
  // user profile menu
  const {userProfileModal} = MenuUserProfile();
  // nav menu
  const {menuModalNavigationElements} = MenuNavigationElements(navElements);
  // button to toggle modal with navigation elements
  const navigationMenuModalButton = (
    <Button 
      buttonStyle='button-header-menu' 
      clicked={() => toggleModalHandler(OPERATIONS.HEADER_NAV)}
    > {toggleModal.HEADER_NAV ? 
      <MenuCloseIcon width='50%' height='50%' fill='var(--text-color--high-emphasis)'/> 
    : 
      <MenuOpenIcon width='50%' height='50%' fill='var(--text-color--high-emphasis)'/>} 
    </Button>
  )
  // button to toggle modal with user profile details: logout, etc. (only for small screens) 
  const userProfileModalButton = (
    <Button 
      buttonStyle='button-header-menu'
      clicked={
        auth.username ? 
        () => {toggleModalHandler(OPERATIONS.HEADER_AUTH)} // toggle modal 
        : 
        () => {
          navigate('/login') // navigate unauth user to login page 
          toggleModalHandler(OPERATIONS.HEADER_NAV, false) // close modal 
        }  // unauth user: nav to login pg
      }
    > { auth.username ? 
      <UserIcon width='50%' height='50%' stroke='var(--text-color--high-emphasis)'/> 
      : <span> login </span>
    } 
    </Button>
  )
  return (
    <div className='header-container-menu-modal'>
      {/* menu modal toggle button */}
      {navigationMenuModalButton}
      {/* authentication button */}
      <div className='header-container-user-profile'> 
        <div className='header-container-user-profile-name'> 
          <span> { auth.username && auth.username } </span>
        </div>
        {userProfileModalButton}
      </div>
      {/* display navigation elements */}
      {menuModalNavigationElements}
      {/* show authentication modal if toggled on */}
      {toggleModal.HEADER_AUTH && userProfileModal}
    </div> 
  )
}