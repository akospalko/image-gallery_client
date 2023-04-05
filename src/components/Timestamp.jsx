// date timestamp for photo entries 
import React from 'react'
import {generateDateString} from '../helper/dateUtilities'
import './Timestamp.css'

export default function Timestamp({dateCreation, dateLastUpdate}) {
  return (
    <div className='timestamp-container'>
      <span> <i> Created: {generateDateString(dateCreation)} </i>  </span> 
      <span> <i> Updated: {generateDateString(dateLastUpdate)} </i> </span>  
    </div>
  )
} 