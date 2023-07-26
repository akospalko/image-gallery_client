// Date timestamp for photo entries 
import React from 'react';
import './Timestamp.css';
import { generateDateString } from '../helper/utilities';

export default function Timestamp({ dateCreation, dateLastUpdate, customStyle, customContentStyle }) {
  
  const timestampTemplate = [
    {
      id: 0,
      label: 'Created',
      title: 'photo entry created',
      value: dateCreation,
    },
    {
      id: 1,
      label: 'Created',
      title: 'photo entry created',
      value: dateCreation,
    }
  ]
  
  return (
    <div className={ `timestamp-container ${ customStyle }` } >
      { timestampTemplate?.map(timestamp => (
        <div  key={ timestamp.id }  className={ `timestamp-content ${ customContentStyle}` } title={ timestamp.title }>
          <div className='timestamp-title' > 
            <span> { timestamp.label } </span> 
          </div>
          <div className='timestamp-date'> 
            <span> { timestamp?.value ? generateDateString(timestamp?.value) : '-' } </span> 
          </div>
        </div>    
      )) }
    </div>
  )
} 