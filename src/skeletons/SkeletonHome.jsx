// home skeleton 
import React from 'react'
import './Skeleton.css'
import SkeletonElement from './SkeletonElement'
import ShimmerEffect from './ShimmerEffect';

export default function SkeletonHome() {
  return (
    <div className='skeleton-wrapper skeleton-wrapper--home'>
      <div className='skeleton-home'>
        <SkeletonElement type='element--30px-30p'/> 
        <SkeletonElement type='element--100p-100p'/>
      </div>
      <ShimmerEffect />
    </div>
  )
} 