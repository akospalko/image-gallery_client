// Photo entry content template with reusable, custom styled elements 
import React from 'react'
import './PhotoEntries.css'
import { useMediaQuery } from 'react-responsive';

export default function PhotoEntryContentElement(props) {
  // PROPS
  const { title, label, id, data, recordStyle, dataStyle, labelStyle } = props || {};
  // HOOKS
  const isBelow350Px = useMediaQuery({ query: '(max-width: 350px)' });
  
  return (
    <div id={ id } className='pe-layout-content'>
      { /* content label */ }
      <div title={ title || '' } className={ `pe-layout-content-label`}> 
        <span> { label } </span> 
      </div>
      { /* content data */ }
      <div className={ `pe-layout-content-data` }> 
        { data || '-' } 
      </div>
    </div>
  )
}