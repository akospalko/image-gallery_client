import React from 'react'
import './ControlPanelWrapper.css'

export default function ControlPanelWrapper(props) {
  const {children, wrapperStyle, heightPx, backgroundColor} = props;
  return (
    <div className={`${wrapperStyle}`} style={{height: `${heightPx}px`, backgroundColor: `${backgroundColor}`}}> 
      {children} 
    </div>
  )
}