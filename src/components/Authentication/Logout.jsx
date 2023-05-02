// full page loader component for user logout 
import React from 'react'
import LoaderIcon from '../SVG/Loader'

export default function Logout() {
  return (
    <div className='shared-page-container shared-page-container--centered shared-page-container--with-padding'>   
      <LoaderIcon height='100px' width='100px' stroke='var(--text-color--high-emphasis)'/>
    </div>
  )
}