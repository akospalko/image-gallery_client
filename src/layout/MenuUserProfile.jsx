// user profile modal for small devices and dropdown for large devices
// TODO: swap modal menu toggle button text(close - open) to icon (hamburger - x) 
import React from 'react'
import './Header.css'
import {useModalContext} from '../components/contexts/ToggleModalContext'
import useLogout from '../components/hooks/useLogout'
import {OPERATIONS} from '../helper/dataStorage'
import {NavLink} from 'react-router-dom'
import { useAuthContext } from '../components/contexts/AuthenticationContext'

export default function useMenuUserProfile() {
  // CONTEXT 
  const {toggleModal, toggleModalHandler, toggleDropdownHandler} = useModalContext();
  const {auth} = useAuthContext();
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
        <NavLink
          to={`${auth.username}/collection`}
          onClick={() => toggleModalHandler(OPERATIONS.HEADER_AUTH, false)}
          className={'header-navigation-item'} 
        >  <p> collection </p> </NavLink>
        {/* { ({isActive}) => (isActive ? 'header-navigation-item header-navigation-item--active' : 'header-navigation-item')} */}
        {/* <NavLink
          key={elem.id} 
          to={elem.path}
          onClick={() => toggleModalHandler(OPERATIONS.HEADER_NAV, false)}
          className={'header-navigation-item'} 
        >
          <p> {elem.name} </p>
        </NavLink> */}
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