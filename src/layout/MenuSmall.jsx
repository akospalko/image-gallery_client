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

export default function MenuSmall({navElements}) {
  // ROUTE
  const navigate = useNavigate();
  // CONTEXT 
  const {toggleModal, toggleModalHandler} = useModalContext();
  const {auth} = useAuthContext();
  // RENDERED ELEMENTS
  // nav
  const {userProfileModal} = MenuUserProfile();
  const {menuModalNavigationElements} = MenuNavigationElements(navElements);
  // button to toggle modal with navigation elements
  const navigationMenuModalButton = (
    <div 
      className='header-menu-modal-icon' 
      onClick={() => toggleModalHandler(OPERATIONS.HEADER_NAV)}
    > 
      {toggleModal.HEADER_NAV ? 'CLOSE' : 'OPEN'} 
    </div>
  )
  // button to toggle modal with user profile details: logout, etc. ( only for smaller screens) 
  const userProfileModalButton = (
    <div 
      className='header-menu-modal-icon'
      onClick={
        auth.username ? 
        () => {toggleModalHandler(OPERATIONS.HEADER_AUTH)} // toggle modal 
        : 
        () => {
          navigate('/login')
          toggleModalHandler(OPERATIONS.HEADER_NAV, false)
        }  // unauth user: nav to login pg
      }
    > Login 
    </div>
  )
  
  return (
    <div className='header-container-menu-modal'>
      {/* menu modal toggle button */}
      {navigationMenuModalButton}
      {/* authentication button */}
      {userProfileModalButton}
      {/* display navigation elements */}
      {menuModalNavigationElements}
      {/* show authentication modal if toggled on */}
      {toggleModal.HEADER_AUTH && userProfileModal}
    </div> 
  )
}