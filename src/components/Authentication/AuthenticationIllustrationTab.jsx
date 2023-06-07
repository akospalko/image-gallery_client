// Reusable header and title component for authentication page,
// Authentication auxiliary tab with header / title +  svg illustration   
import React from 'react'
import './Authentication.css';
import { AuthenticationDoorIllustration } from '../SVG/Illustrations';

// title
export const AuthenticationTitle = ({ title, subtitle })  => (
  <div className='authentication-illustration-tab-header' >
    <h1> { title || 'Hey!' } </h1> 
    <span> { subtitle || 'Chill a little bit...' } </span>
  </div>
)

// header 
export const AuthenticationHeader = ({ title, subtitle })  => (
    <div className='authentication-illustration-tab-header authentication-illustration-tab-header--standalone'>
      <AuthenticationTitle title={ title } subtitle={ subtitle } />
    </div>
)

// auxiliary tab with header and title + svg illustration 
export default function AuthenticationIllustrationTab({ title, subtitle }) {
  return (
    <div className='authentication-illustration-tab'>
      {/* header title + background */}
      <AuthenticationTitle title={ title } subtitle={ subtitle } />
      {/* auth illustration */}
      <div className='authentication-illustration-tab-illustration'> 
        <AuthenticationDoorIllustration/>
      </div>
    </div>
  )
}