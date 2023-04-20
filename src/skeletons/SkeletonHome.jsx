// home skeleton 
import React from 'react'
import './Skeleton.css'
import SkeletonElement from './SkeletonElement'
import ShimmerEffect from './ShimmerEffect';

export default function SkeletonHome({theme}) {
  const themeStyle = theme || 'light'; // apply dark or light theme to component
  return (
    <div className={`skeleton-wrapper skeleton-wrapper-home ${themeStyle}`}>
      <div className='skeleton-home'>
        <SkeletonElement type='element--350px '/>
        <SkeletonElement type='element--30px-30p element-margin-bottom--0' /> 
      </div>
      <ShimmerEffect />
    </div>
  )
} 