// home skeleton 
import React from 'react'
import './Skeleton.css'
import SkeletonElement from './SkeletonElement'
import ShimmerEffect from './ShimmerEffect';

export default function SkeletonHome() {
  return (
    <div className='skeleton-wrapper skeleton-wrapper-home'>
      <div className='skeleton-home'>
        <SkeletonElement type='element--350px '/>
        <SkeletonElement type='element--30px-30p element-margin-bottom--0' /> 
      </div>
      <ShimmerEffect />
    </div>
  )
} 