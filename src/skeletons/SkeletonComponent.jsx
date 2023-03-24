// gallery (user/my collection) skeleton component for photo entries 
import React from 'react'
import './Skeleton.css'
import SkeletonElement from './SkeletonElement'

export default function SkeletonComponent() {
  return (
    <div className='photo-entry-skeleton'>
    <SkeletonElement type='title' />
    <SkeletonElement type='photo' />
    <SkeletonElement type='control-panel' />
  </div>
  )
}
