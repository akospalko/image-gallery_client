// user profile modal for small devices and dropdown for large devices
// TODO: swap modal menu toggle button text(close - open) to icon (hamburger - x) 
import React from 'react'
import './Header.css'
import {useModalContext} from '../components/contexts/ToggleModalContext'
import useLogout from '../components/hooks/useLogout'
import {OPERATIONS} from '../helper/dataStorage'

export default function useMenuUserProfile() {
  // CONTEXT 
  const {toggleModal, toggleModalHandler, toggleDropdownHandler} = useModalContext();
  // HOOK
  const logoutUserHandler = useLogout();
  // RENDERED ELEMENTS
  // modal
  const userProfileModal = ( 
    toggleModal.HEADER_AUTH && ( 
      <div className='header-modal-container'>
        <div className='header-modal-navigation'>
        <div 
          className='header-navigation-item'
          onClick={() => {
            logoutUserHandler();
            toggleModalHandler(OPERATIONS.HEADER_AUTH, false);
          }}
        > <p> logout </p> </div>
      </div>
    </div>
  )); 
  // dropdown
  let userProfileDropdown = ( 
    <>
      <div 
        className='header-dropdown-backdrop' 
        onClick={() => toggleDropdownHandler()}
      > </div> 
      <div className ='header-dropdown-container'
        onClick={e => e.stopPropagation()}
      >
        <div 
          className='header-dropdown-navigation-item'
          style={{'cursor': 'pointer'}} 
          onClick={() => {
            logoutUserHandler();
            toggleDropdownHandler(false);
          }}
        > Logout </div>
      </div>
    </>
  )
  return {userProfileModal, userProfileDropdown}
}