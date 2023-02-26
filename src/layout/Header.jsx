// TODO: toggle menu elems on click -> menu bar (only for mobile / ?tablet) 
// TODO: swap modal menu toggle button text(close - open) to icon (hamburger - x) 
import React from 'react'
import './Header.css'
import MenuModal from './menuModal';
import MenuBar from './menuBar';

export default function Header({role}) {

  return (
    <> 
      {/* menu modal */}
      <MenuBar role={role} />
      {/* menu bar */}
      <MenuModal role={role}/>
    </>
  )
}