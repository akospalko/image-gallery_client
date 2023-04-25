// Reusable custom stylable content elements for photo entry 
import React from 'react'
import './PhotoEntries.css'
import Timestamp from '../Timestamp';

export default function PhotoEntryContentElement(props) {
  const {title, label, data, dataPositionTreshold, contentStyle, dataStyle, labelStyle, type, dateCreation, dateLastUpdate} = props;
  // CONDITIONAL STYLING
  // position text inside data container (start or center) depending on provided value  
  const positionTextConditionally = dataPositionTreshold && String(data)?.length >= dataPositionTreshold ? {justifyContent: 'initial'} : null; 
  // default content contains:
  // custom content (currently only used for a custom type: timestamp) 
  let contentType = (
    <>
      {/* label */}
      <div title={title} className={`photo-entry-admin-content-label ${labelStyle}`}>  <span> {label} </span> </div>
      {/* data */}
      <div style={positionTextConditionally} className={`photo-entry-admin-content-data ${dataStyle}`}> {data} </div>
    </>
  )
  if(type === 'timestamp') {
    contentType = (
    <>
      {/* label */}
      <div className={`photo-entry-admin-content-label ${labelStyle}`}>  <span> {label} </span> </div>
      {/* data */}
      <Timestamp dateCreation={dateCreation} dateLastUpdate={dateLastUpdate}></Timestamp>
    </>
    )    
  }

  return (
    // content group
    <div className={`photo-entry-admin-content ${contentStyle}`} >  
      {contentType}
    </div>
  )
}