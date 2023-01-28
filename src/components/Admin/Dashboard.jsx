import React from 'react'
import './Dashboard.css'
import '../Shared.css'
import Button from '../UI/Button'

export default function Dashboard() {
  return (
    // <div className='dashboard-container'>
    <div className='shared-page-container'>
      {/* title */}
      <h1> Dashboard </h1>  
      {/* add new image button */}
      <Button type={'image-new'}> Add new Image </Button>
      {/* image cards container */}
      <div className='dashboard-image-container'>
        <div className='dashboard-image-card'> 1 </div>
        <div className='dashboard-image-card'> 2 </div>

      </div>
      {/* image card (single) */}
    </div>
  )
}
