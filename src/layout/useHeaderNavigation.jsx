// Header navigation logic for large (nav elems) and small (nav menu) views 
import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { OPERATIONS } from '../helper/dataStorage'
import { useModalContext } from '../components/contexts/ToggleModalContext';
import { useAuthContext } from '../components/contexts/AuthenticationContext';
import { useThemeContext } from '../components/contexts/ThemeContext';
import Button from '../components/UI/Button';
import ThemeToggler from '../components/UI/ThemeToggler';
import { MenuOpenIcon, MenuCloseIcon }  from '../components/SVG/Icons';


export default function useHeaderNavigation(navElements) {
  // CONTEXT 
  const { toggleModalHandler } = useModalContext();
  const { auth } = useAuthContext();
  const { toggleThemeHandler } = useThemeContext();

  // TOGGLERS
  // Open navigation menu toggle button
  const openNavigationMenuButton = (
    <Button 
      buttonStyle='button-header-menu' 
      clicked={ () => toggleModalHandler(OPERATIONS.HEADER_NAV, true) }
    > <MenuOpenIcon width='25px' height='25px' fill='var(--text-color--high-emphasis)'/>
    </Button>
  )
  // Close navigation menu toggle button
  const closeNavigationMenuButton = (
    <Button 
      buttonStyle='button-header-menu' 
      clicked={ () => toggleModalHandler(OPERATIONS.HEADER_NAV, false) }
    > <MenuCloseIcon width='25px' height='25px' fill='var(--text-color--high-emphasis)'/> 
    </Button>
  )

  // NAVIGATION ELEMENTS
  // For large view 
  // mapped nav 
  const navigationElements = navElements && navElements.map(elem => 
    <NavLink 
      key={ elem.id } 
      to={ typeof elem.path === 'function' ? elem.path(auth.username) : elem.path }
      className={ ({ isActive }) => ( isActive ? 'header-navigation-elem header-navigation-elem--active' : 'header-navigation-elem' ) }> 
      <div className='header-navigation-elem-spacer'> </div>
      <p> { elem.name } </p> 
    </NavLink>
  ) 
  // For small view
  // mapped nav with on click close modal functionality
  const navigationElementsForToggleMenu = navElements && navElements.map(elem => (
    <NavLink 
      key={ elem.id } 
      to={ typeof elem.path === 'function' ? elem.path(auth.username) : elem.path }
      onClick={ () => toggleModalHandler(OPERATIONS.HEADER_NAV, false) }
      className={ ({ isActive }) => 
      (isActive ? 'header-navigation-elem header-navigation-elem--active' : 'header-navigation-elem')}
    > <p> { elem.name } </p> 
    </NavLink>
  ))
  // navigation menu: toolbar, nav elements
  const navigationMenu = (
    <>
      { /* Backdrop */ }
      <div 
        className='header-backdrop header-backdrop--with-background' 
        onClick={ () => toggleModalHandler(OPERATIONS.HEADER_NAV, false) }
      > </div> 
        <div
          className='header-navigation-menu-container'
          onClick={ e => e.stopPropagation() }
        >
          { /* toolbar: theme toggler, close menu botton, etc */ }
          <div className='header-navigation-menu-toolbar'>
            { closeNavigationMenuButton }
            <div className='header-theme-toggler' onClick={ toggleThemeHandler } > <ThemeToggler size='30px' /> </div>
          </div>
          { /* navigation elements */ }
          <div className='header-navigation-elements'>
            { navigationElementsForToggleMenu }
          </div> 
        </div>
    </>
  );

  return { 
    navigationElements, // rendered navigation elements (nav links without any wrapper for large screens)
    navigationElementsForToggleMenu, // rendered navigation elements with toggle off functionality (nav links without any wrapper for small screens)
    navigationMenu, // rendered navigation menu with navigation elements included (for small screens)
    openNavigationMenuButton, // open nav menu toggler
    closeNavigationMenuButton // close nav menu toggler
  }
}