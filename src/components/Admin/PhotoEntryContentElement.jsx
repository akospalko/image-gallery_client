// Photo entry content template with reusable customly styled elements 
import React from 'react'
import './PhotoEntries.css'

export default function PhotoEntryContentElement(props) {
  // PROPS
  const {title, label, data, dataPositionTreshold, recordStyle, dataStyle, labelStyle} = props;
  // position text inside data container based on provided prop (start or center)   
  const positionTextConditionally = dataPositionTreshold && String(data)?.length >= dataPositionTreshold ? {justifyContent: 'initial'} : null; 

  return (
    <div className={`_photo-entry-content-row ${recordStyle}`}>  
      {/* label */}
      <div title={title || ''} className={`_photo-entry-content-label ${labelStyle}`}>  <span> {label} </span> </div>
      {/* data */}
      <div style={positionTextConditionally} className={`_photo-entry-content-data ${dataStyle}`}> {data} </div>
    </div> 
  )
}