// Responsive header component
import React, { useState, useEffect } from 'react'
import './Header.css'
import HeaderContentForSmallScreen from './HeaderContentForSmallScreen';
import HeaderContentForLargeScreen from './HeaderContentForLargeScreen';
import { useMediaQuery } from 'react-responsive';
import { useAuthContext } from '../components/contexts/AuthenticationContext';
import { useModalContext } from '../components/contexts/ToggleModalContext';
import { navElementsUnauthenticated, navElementsUser, navElementsAdmin } from '../helper/dataStorage';
import { ROLES } from '../helper/userRoles';

export default function Header() {
  // STATE
  const [activeNavigation, setActiveNavigation] = useState(navElementsUnauthenticated);
  
  // CONTEXT
  const { auth } = useAuthContext();
  
  // HOOK
  const isLargeScreen = useMediaQuery({ query: '(min-width: 768px)' });

  // EFFECT
  // get and set what navigation elements should be rendered on the screen based on user roles
  useEffect( () => {
    if(!auth?.username || !auth?.roles ) return;
    // find out the rendered navigation elements based on user roles
    const getActiveNavigation = () => {
      let activeRole;
      auth?.roles.forEach(role => {
        if(role === ROLES.admin || role === ROLES.editor) {
          activeRole = navElementsAdmin;
          return;
        } else if(role === ROLES.user) {
          activeRole = navElementsUser;
          return;
        } 
        // TODO: editor role
      })
      return activeRole;
    }
    setActiveNavigation(getActiveNavigation()); // initialize state
    return () => {setActiveNavigation(navElementsUnauthenticated)}; // reset state back to the initial value (unauthenticated) 
  }, [auth, setActiveNavigation] )
  
  return isLargeScreen ? <HeaderContentForLargeScreen navElements={activeNavigation} /> : <HeaderContentForSmallScreen navElements={activeNavigation} />
}
