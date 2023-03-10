// menu modal nav elements for small devices and menu bar nav elements for large devices
// TODO: swap modal menu toggle button text(close - open) to icon (hamburger - x) 
// TODO: own style file
import React from 'react'
import './Header.css'
import {NavLink} from 'react-router-dom'
import {useModalContext} from '../components/contexts/ToggleModalContext'
import {OPERATIONS} from '../helper/dataStorage'

export default function useMenuNavigationElements(navElements) {
  // CONTEXT 
  const {toggleModal, toggleModalHandler} = useModalContext();
  // RENDERED ELEMENTS
  // menu modal navigation elements
  const menuModalNavigationElements = (
    toggleModal.HEADER_NAV && 
      <div className='header-modal-container'>
        <div className='header-modal-navigation'>
        {/* <div className='header-modal-navigation'> */}
          {navElements && navElements.map((elem) => {
            return <NavLink 
              key={elem.id} 
              to={elem.path}
              onClick={() => toggleModalHandler(OPERATIONS.HEADER_NAV, false)}
              className={ ({isActive}) => 
              (isActive ? 'header-navigation-item header-navigation-item--active' : 'header-navigation-item')}
            > <p> {elem.name} </p> 
            </NavLink>
          })} 
        </div> 
      </div>
  );
  // menu bar navigation elements
  const menuBarNavigationElements = (
    navElements && navElements.map((elem) => {
      return <NavLink 
        key={elem.id} 
        to={elem.path}
        className={({isActive}) => 
        (isActive ? 'header-navigation-item header-navigation-item--active' : 'header-navigation-item')}
      > 
        <p> {elem.name} </p> 
      </NavLink>
    }) 
  );
  return {menuModalNavigationElements, menuBarNavigationElements}
}