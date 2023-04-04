// gallery gallery/home skeleton component for photo entries 
import React from 'react'
import './Skeleton.css'
import SkeletonElement from './SkeletonElement'
import ShimmerEffect from './ShimmerEffect';

export default function SkeletonAdminPhotoEntry({theme}) {
  const themeStyle = theme || 'light'; // apply dark or light theme to component
  return (
    <div className={`skeleton-wrapper ${themeStyle}`}>
      <div className='skeleton-admin-photo-entry'>
        {/* control panel buttons */}
        <SkeletonElement type='element--50px' />
        {/* data field: small */}
        <SkeletonElement type='element--60px element-margin-top--0' />
        <SkeletonElement type='element--60px element-margin-top--0' />
        <SkeletonElement type='element--60px element-margin-top--0' />
        <SkeletonElement type='element--60px element-margin-top--0' />
        <SkeletonElement type='element--60px element-margin-top--0' />
        <SkeletonElement type='element--60px element-margin-top--0' />
        {/* data field: large */}
        <SkeletonElement type='element--150px element-margin-top--0' />
        {/* data field: small */}
        <SkeletonElement type='element--60px element-margin--0' />
      </div>
      <ShimmerEffect />
    </div>
  )
}