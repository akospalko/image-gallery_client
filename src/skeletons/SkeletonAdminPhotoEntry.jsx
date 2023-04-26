// gallery gallery/home skeleton component for photo entries 
import React from 'react'
import './Skeleton.css'
import SkeletonElement from './SkeletonElement'
import ShimmerEffect from './ShimmerEffect';

export default function SkeletonAdminPhotoEntry() {
  return (
    <div className='skeleton-wrapper'>
      <div className='skeleton-admin-photo-entry'>
        <SkeletonElement type='element--50px element-margin-top--0' />
        <SkeletonElement type='element--50px element-margin-top--0' />
        <SkeletonElement type='element--50px element-margin-top--0' />
        <SkeletonElement type='element--50px element-margin-top--0' />
        <SkeletonElement type='element--50px element-margin-top--0' />
        <SkeletonElement type='element--50px element-margin-top--0' />
        <SkeletonElement type='element--50px element-margin-top--0' />
        <SkeletonElement type='element--50px element-margin--0' />
        <SkeletonElement type='element--200px element-margin-bottom--0' />
      </div>
      <ShimmerEffect />
    </div>
  )
}