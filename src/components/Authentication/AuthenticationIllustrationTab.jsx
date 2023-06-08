// Reusable header and title component for authentication page,
// Authentication auxiliary tab with header / title +  svg illustration   
import React from 'react'
import './Authentication.css';
import { AuthenticationDoorIllustration } from '../SVG/Illustrations';
import { useMediaQuery } from 'react-responsive';

// Title
export const AuthenticationTitle = ({ title, subtitle })  => (
  <div className='authentication-illustration-tab-header' >
    <h1> { title || 'Hey!' } </h1> 
    <span> { subtitle || 'Chill a little bit...' } </span>
  </div>
)

// Header 
export const AuthenticationHeader = ({ title, subtitle })  => {
  // HOOK 
  const isLargeScreen = useMediaQuery({ query: '(min-width: 768px)' });

  return (
    !isLargeScreen && <AuthenticationTitle title={ title } subtitle={ subtitle } />
  )
}

// Auxiliary tab with header and title + svg illustration 
export default function AuthenticationIllustrationTab({ title, subtitle }) {
  // HOOK 
  const isLargeScreen = useMediaQuery({ query: '(min-width: 768px)' });

  return (
    <div className='authentication-illustration-tab'>
      {/* header title + background */}
      { isLargeScreen && <AuthenticationTitle title={ title } subtitle={ subtitle } /> }
      {/* auth illustration */}
      <div className='authentication-illustration-tab-illustration'> 
        <AuthenticationDoorIllustration/>
      </div>
    </div>
  )
}