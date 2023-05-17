// Date timestamp for photo entries 
import React from 'react';
import './Timestamp.css';
import { generateDateString } from '../helper/utilities';

export default function Timestamp({dateCreation, dateLastUpdate, customStyle}) {
  return (
    <div className={`timestamp-container ${customStyle}`}>
      <div className='timestamp-content' title='photo entry created'>
        <div className='timestamp-title' > 
          <span> Created </span> 
        </div>
        <div className='timestamp-date'> 
          <span> { dateCreation ? generateDateString(dateCreation) : '-'} </span> 
        </div>
      </div>
      <div className='timestamp-content' title='photo entry last updated' >
        <div className='timestamp-title'> 
          <span> Updated </span>  
        </div>
        <div className='timestamp-date'> 
          <span> { dateCreation ? generateDateString(dateLastUpdate) : '-'} </span>  
        </div>
      </div>
    </div>
  )
} 