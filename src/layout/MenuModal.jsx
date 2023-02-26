// TODO: toggle menu elems on click -> menu bar (only for mobile / ?tablet) 
// TODO: swap modal menu toggle button text(close - open) to icon (hamburger - x) 
import React from 'react'
import './Header.css'
import {navElements, navElementsAdmin, profileNavElements} from '../helper/dataStorage' 
import {useModalContext} from '../components/contexts/ToggleModalContext';
import {useAuthContext} from '../components/contexts/AuthenticationContext';
import {useNavigate} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import useLogout from '../components/hooks/useLogout'


export default function MenuModal(props) {
  const {role} = props;
   let currentNav = role === 'admin' ? navElementsAdmin :  navElements; 
  // ROUTE
  const navigate = useNavigate();
  // CONTEXT 
  const {toggleModal, toggleModalHandler} = useModalContext();
  const {auth} = useAuthContext();
  // RENDERED ELEMENTS
  // user profile button for modals (smaller screens) 
  const userProfileButtonModal = (
    <div 
      className='header-container-menu-modal-element'
      onClick={
        auth.username ? 
        () => {toggleModalHandler('headerAuth')} // toggle modal 
        : 
        () => {navigate('/login')}  // unauth user: nav to login pg
      }
    > Login 
    </div>
  )
// modal displayed to auth users after clicking on userProfileButtonModal
// user profile modal for small devices
let userProfileModal = 
( <div className='header-modal-container'>
    {profileNavElements && profileNavElements.map(elem => (
      <p key={elem.id}>
        {elem.name}
      </p>
    ))}
  </div>
);
  
  return (
    <div className='header-container-menu-modal'>
      <div 
        className='header-container-menu-modal-element' 
        onClick={() => toggleModalHandler('headerNav')}
      > {toggleModal.headerNav ? 'CLOSE' : 'OPEN'} 
      </div>
      {/* authentication button */}
      {userProfileButtonModal}
      {/* display navigation elements */}
      {toggleModal.headerNav && 
        <div className='header-modal-container'>
          <div className='header-modal-navigation'>
            {currentNav.map((elem) => {
              return <NavLink 
                key={elem.id} 
                to={elem.path}
                onClick={() => toggleModalHandler('headerNav', false)}
                className={({isActive}) => 
                (isActive ? 'header-navigation-item--active' : null)}
              > <p> {elem.name} </p> 
              </NavLink>
            })} 
          </div> 
        </div>}
      {/* show authentication modal if toggled on */}
      {toggleModal.headerAuth && userProfileModal}
    </div> 
  )
}