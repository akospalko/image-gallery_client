import React, {useState, useEffect} from 'react'
import './Header.css'
import MenuSmall from './MenuSmall';
import MenuLarge from './MenuLarge';
import {navElementsUnauthenticated, navElementsUser, navElementsAdmin} from '../helper/dataStorage';
import {useAuthContext} from '../components/contexts/AuthenticationContext';
import {ROLES} from '../helper/userRoles';
export default function Header() {
  // STATE
  const [activeNavigation, setActiveNavigation] = useState(navElementsUnauthenticated);
  // CONTEXT
  const {auth} = useAuthContext();
  // EFFECT
  // get and set what navigation elements should be rendered on the screen based on user roles
  useEffect(() => {
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
  }, [auth, setActiveNavigation])
  
  return (
    <> 
      {/* menu bar for small screens */}
      <MenuSmall navElements={activeNavigation} />
      {/* menu modal for large screens */}
      <MenuLarge navElements={activeNavigation} />
    </>
  )
}