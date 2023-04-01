import React, { useEffect } from 'react'
import { useFormContext } from '../components/contexts/FormContext';

export default function ErrorPage() {
  // CONTEXT
  const {message} = useFormContext();

  return (
  <div className='shared-page-container shared-page-container--centered shared-page-container--with-padding'>   
    <h1> Oh no, looks like something is wrong here...</h1>
   {message && <h3> {message}  </h3>}
  </div>
  )
}
