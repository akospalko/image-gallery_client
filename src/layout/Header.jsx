import React from 'react'
import './Header.css'
import {navElements, navElementsAdmin} from '../helper/dataStorage' 
import { NavLink } from 'react-router-dom'

export default function Header({role = 'admin'}) {
  let currentNav = role === 'admin' ? navElementsAdmin :  navElements; 

  return (
    <div className='header-container'> 
      <div className='header-container'>
        <ul> {
          currentNav.map((elem) => {
            return <NavLink 
              key={elem.id} 
              to={elem.path}
              className={({ isActive }) => 
              (isActive ? 'header-item--active' : null )}
            > 
              <li className='header-item'> <p> {elem.name} </p> </li>
            </NavLink>
          })
        } </ul> 
     </div>
    </div>
  )
}
