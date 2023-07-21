// Error page to handle errors and non existent routes
import React from 'react'
import { useFormContext } from '../components/contexts/FormContext';

export default function ErrorPage() {
  // CONTEXT
  const { status } = useFormContext();

  return (
  <div className='shared-page-container shared-page-container--centered shared-page-container--with-padding'>   
    <h1> Oh no, looks like something is wrong here...</h1>
   {status?.message && <h3> { status?.message }  </h3>}
  </div>
  )
}