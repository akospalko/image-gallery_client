// Photo entry content template with reusable, custom styled elements 
import React from 'react'
import './PhotoEntries.css'
import { useMediaQuery } from 'react-responsive';

export default function PhotoEntryContentElement(props) {
  // PROPS
  const { title, label, data, recordStyle, dataStyle, labelStyle } = props || {};
  // HOOKS
  const isBelow350Px = useMediaQuery({ query: '(max-width: 350px)' });
  
  return (
    <div className={ `pe-layout-content-row ${ recordStyle }` }>  
      { /* label */ }
      <div title={ title || '' } className={ `pe-layout-content-label ${ labelStyle }` }> <span> { label } </span> </div>
      { /* data */ }
      <div style={ isBelow350Px ? { justifyContent: 'flex-start' } : {} } className={ `pe-layout-content-data ${ dataStyle }` }> { data || '-' } </div>
    </div> 
  )
}