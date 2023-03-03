// TODO: toggle menu elems on click -> menu bar (only for mobile / ?tablet) 
// TODO: swap modal menu toggle button text(close - open) to icon (hamburger - x) 
import React from 'react'
import './Header.css'
import {useModalContext} from '../components/contexts/ToggleModalContext';
import {useAuthContext} from '../components/contexts/AuthenticationContext';
import {useNavigate} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import useLogout from '../components/hooks/useLogout'
import {OPERATIONS} from '../helper/dataStorage';

export default function MenuModal({navElements}) {
  // ROUTE
  const navigate = useNavigate();
  // CONTEXT 
  const {toggleModal, toggleModalHandler} = useModalContext();
  const {auth} = useAuthContext();
  // HOOK
  const logoutUserHandler = useLogout();
  // RENDERED ELEMENTS
  // user profile button for modals (smaller screens) 
  const userProfileModalButton = (
    <div 
      className='header-container-menu-modal-element'
      onClick={
        auth.username ? 
        () => {toggleModalHandler(OPERATIONS.HEADER_AUTH)} // toggle modal 
        : 
        () => {navigate('/login')}  // unauth user: nav to login pg
      }
    > Login 
    </div>
  )
// modal displayed to auth users after clicking on userProfileModalButton
// user profile modal for small devices
let userProfileModal = 
( <div className='header-modal-container'>
    <div 
      className='user-profile-element'
      style={{'cursor': 'pointer'}} 
      onClick={() => {
        logoutUserHandler();
        toggleModalHandler(OPERATIONS.HEADER_AUTH, false);
      }}
    > Logout </div>
  </div>
);
  
  return (
    <div className='header-container-menu-modal'>
      <div 
        className='header-container-menu-modal-element' 
        onClick={() => toggleModalHandler(OPERATIONS.HEADER_NAV)}
      > {toggleModal.HEADER_NAV ? 'CLOSE' : 'OPEN'} 
      </div>
      {/* authentication button */}
      {userProfileModalButton}
      {/* display navigation elements */}
      {toggleModal.HEADER_NAV && 
        <div className='header-modal-container'>
          <div className='header-modal-navigation'>
            {navElements && navElements.map((elem) => {
              return <NavLink 
                key={elem.id} 
                to={elem.path}
                onClick={() => toggleModalHandler(OPERATIONS.HEADER_NAV, false)}
                className={({isActive}) => 
                (isActive ? 'header-navigation-item--active' : null)}
              > <p> {elem.name} </p> 
              </NavLink>
            })} 
          </div> 
        </div>}
      {/* show authentication modal if toggled on */}
      {toggleModal.HEADER_AUTH && userProfileModal}
    </div> 
  )
}