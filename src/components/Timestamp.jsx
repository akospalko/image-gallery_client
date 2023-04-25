// date timestamp for photo entries 
import React from 'react'
import {generateDateString} from '../helper/dateUtilities'
import './Timestamp.css'

export default function Timestamp({dateCreation, dateLastUpdate}) {
  return (
    <div className='timestamp-container'>
      <div className='timestamp-content' title='photo entry created'>
        <div className='timestamp-title' > 
          <span> Created </span> 
        </div>
        <div className='timestamp-date'> 
          <span> {generateDateString(dateCreation)} </span> 
        </div>
      </div>
      <div className='timestamp-content' title='photo entry last updated' >
        <div className='timestamp-title'> 
          <span> Updated </span>  
        </div>
        <div className='timestamp-date'> 
          <span> {generateDateString(dateLastUpdate)} </span>  
        </div>
      </div>
    </div>
  )
} 