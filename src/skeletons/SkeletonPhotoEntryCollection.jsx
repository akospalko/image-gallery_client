// gallery (user/my collection) skeleton component for photo entries 
import React from 'react'
import './Skeleton.css'
import SkeletonElement from './SkeletonElement'
import ShimmerEffect from './ShimmerEffect';

export default function SkeletonPhotoEntryCollection() {
  return (
    <div className='skeleton-wrapper skeleton-wrapper--user-collection' >
      <div className='skeleton-user-photo-entry'>
        <SkeletonElement type='element--350px element-margin--0' />
      </div>
      <ShimmerEffect />
    </div>
  )
}