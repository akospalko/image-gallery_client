// gallery (user/my collection) skeleton component for photo entries 
import React from 'react'
import './Skeleton.css'
import SkeletonElement from './SkeletonElement'
import ShimmerEffect from './ShimmerEffect';

export default function SkeletonUserPhotoEntry({theme}) {
  const themeStyle = theme || 'light'; // apply dark or light theme to component
  return (
    <div className={`skeleton-wrapper ${themeStyle}`}>
      <div className='skeleton-user-photo-entry'>
        <SkeletonElement type='element--80px' />
        <SkeletonElement type='element--450px' />
        <SkeletonElement type='element--80px element-margin-bottom--0' />
      </div>
      <ShimmerEffect />
    </div>
  )
}