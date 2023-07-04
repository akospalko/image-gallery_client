// Display the active theme's corresponding icon 
import React from 'react'
import { useThemeContext } from '../contexts/ThemeContext'
import { MoonIcon, SunIcon } from '../SVG/Icons'

export default function ThemeToggler(prop) {
  // PROPS
  const { size } = prop; // height || width value e.g. 30px  
  // CONTEXT 
  const { theme } = useThemeContext();
 
  return (
    <>
      { theme === 'dark' ? 
      <MoonIcon height={ size } width={ size } color='var(--text-color-light--high-emphasis)' />
      :
      <SunIcon height={ size } width={ size } color='var(--text-color-dark--high-emphasis)' /> }
    </>
  )
}