import React from 'react'
import {transformDate} from '../helper/dateUtilities'
import './CustomPopup.css'

export default function CustomPopup({marker}) {

  return (
    <div className='popup-container'>
      <h3>  {marker.title} </h3>
      <img 
        className='popup-image'
        src={marker.photoURL} 
        alt={marker.title}
      />
      <div className='popup-info'>
        <span className='popup-info-title'> Author </span>
        <div> {marker.author} </div>
        <span className='popup-info-title'> Description </span>
        <div> {marker.description} </div>
        <span className='popup-info-date'> {transformDate(marker.captureDate, '-', '.')} </span>
      </div>
    </div> 
  )
}
