// Resources: https://codepen.io/Umer_Farooq/pen/eYJgKGN
import React from 'react'
import './ThemeToggler.css'
import { useThemeContext } from '../contexts/ThemeContext'

export default function ThemeToggler() {
  const {theme, toggleThemeHandler} = useThemeContext();
  return (
    <>
      <input type="checkbox" className="checkbox" id="checkbox" onChange={toggleThemeHandler} checked={theme === 'dark'}/>
      <label htmlFor="checkbox" className={`checkbox-label theme-${theme}`}>
        <span className="ball"></span>
      </label>
    </>
  )
}