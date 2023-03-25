// gallery (user/my collection) skeleton component for photo entries 
import React from 'react'
import './Skeleton.css'
import SkeletonElement from './SkeletonElement'

export default function SkeletonUserPhotoEntry({theme}) {
  const themeStyle = theme || 'light'; // apply dark or light theme to component
  return (
    <div className={`skeleton-wrapper ${themeStyle}`}>
      <div className='skeleton-photo-entry'>
        <SkeletonElement type='title' />
        <SkeletonElement type='photo' />
        <SkeletonElement type='control-panel' />
      </div>
    </div>
  )
}