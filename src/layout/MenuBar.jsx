// TODO: toggle menu elems on click -> menu bar (only for mobile / ?tablet) 
// TODO: swap modal menu toggle button text(close - open) to icon (hamburger - x) 
import React from 'react'
import './Header.css'
import {useModalContext} from '../components/contexts/ToggleModalContext';
import {useAuthContext} from '../components/contexts/AuthenticationContext';
import {useNavigate} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import useLogout from '../components/hooks/useLogout'

export default function MenuBar({navElements}) {
  // ROUTE
  const navigate = useNavigate();
  // CONTEXT 
  const {toggleDropdown, toggleDropdownHandler} = useModalContext();
  const {auth} = useAuthContext();
  // HOOK
  const logoutUserHandler = useLogout();
  // RENDERED ELEMENTS
  // header button for dropdowns (which means larger screens) unauth user: nav to login pg
  const userProfileDropdownButton = (
    <div 
      className='header-container-menu-modal-element'
      onClick={
        auth.username ? 
        () => {toggleDropdownHandler()} 
        : 
        () => {navigate('/login')}
      }
    > Login 
    </div>
  )

  // profileDropdown for large devices
  let userProfileDropdown = ( 
    <>
      <div className='header-dropdown-backdrop' onClick={() => toggleDropdownHandler()}> </div> 
        <div className ='header-dropdown-container'
          onClick={e => e.stopPropagation()}
        >
          <div 
            className='user-profile-element'
            style={{'cursor': 'pointer'}} 
            onClick={() => {
              logoutUserHandler();
              toggleDropdownHandler(false);
            }}
          > Logout </div>
      </div>
    </>
  )

  // navigation menu bar for large screen devices
  return (
    <div className='header-container-menu-bar'> 
      <div className='header-dummy'></div>
      <div className='header-bar-container'>
        <div className='header-bar-navigation'>
            {navElements && navElements.map((elem) => {
              return <NavLink 
                key={elem.id} 
                to={elem.path}
                className={({isActive}) => 
                (isActive ? 'header-navigation-item--active' : null)}
              > 
                <p> {elem.name} </p> 
              </NavLink>
            })} 
        </div> 
      </div>
      {/* authentication button */}
      {userProfileDropdownButton}
      {/* authentication dropdown */}
      {toggleDropdown && userProfileDropdown} 
    </div>
  )
}