// skeleton loader sub components for different types: title, text, photo, etc.
import React from 'react'
import './Skeleton.css'

export default function SkeletonElement({type}) {
  const classes = `skeleton ${type}`;
  console.log(classes)
  return (<div className={classes}> </div>)
}
