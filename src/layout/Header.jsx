// TODO: toggle menu elems on click -> menu bar (only for mobile / ?tablet) 
// TODO: swap modal menu toggle button text(close - open) to icon (hamburger - x) 
import React from 'react'
import './Header.css'
import {navElements, navElementsAdmin} from '../helper/dataStorage' 
import { useModalContext } from '../components/contexts/ToggleModalContext';
import { useAuthContext } from '../components/contexts/AuthenticationContext';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function Header({role = 'admin'}) {
  let currentNav = role === 'admin' ? navElementsAdmin :  navElements; 
  // ROUTE
  const navigate = useNavigate();
  // CONTEXT 
  const {toggleModal, toggleModalHandler} = useModalContext();
  const {auth} = useAuthContext();
  // RENDERED ELEMENTS
  // auth button auth: show auth modal || unauth: navigate to login pg
  let authenticationButton = (
  auth.username ?
    <div 
      className='header-container-menu-modal-element'
      onClick={() => {toggleModalHandler('headerAuth')}}
    > Login 
    </div>
    :
    <div 
      className='header-container-menu-modal-element'
      onClick={() => {navigate('/login')}}
    > Login 
    </div> 
  )

  let authenticationModal = 
  ( <div className='header-modal-container'>
      <p> Profile </p>
      <p> Logout </p>
    </div>
  )

  
  // menu modal (small screen devices)
  const menuModal = (
    <div className='header-container-menu-modal'>
      <div 
        className='header-container-menu-modal-element' 
        onClick={() => toggleModalHandler('headerNav')}
      > {toggleModal.headerNav ? 'CLOSE' : 'OPEN'} 
      </div>
      {/* authentication button */}
      {authenticationButton}
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
        </div>
      }
      {/* show authentication modal if toggled on */}
      {toggleModal.headerAuth && authenticationModal}
    </div> 
  )
  // menu bar (large screen devices)
  const menuBar = (
    <div className='header-container-menu-bar'> 
      <div className='header-dummy'></div>
      <div className='header-bar-container'>
        <div className='header-bar-navigation'>
            {currentNav && currentNav.map((elem) => {
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
      {authenticationButton}
    </div>
  )

  return (
    <> 
      {/* {console.log(auth)} */}
      {/* menu modal */}
      {menuModal}
      {/* menu bar */}
      {menuBar}
    </>
  )
}