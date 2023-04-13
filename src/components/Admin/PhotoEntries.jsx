import React from 'react'
import './PhotoEntries.css'
import {useFormContext} from '../contexts/FormContext'
import PhotoEntry from './PhotoEntry'
import Loader from '../SVG/Loader'
import { useLoaderContext } from '../contexts/LoaderContext'

export default function PhotoEntries({collection}) {
  // CONTEXTS
  const {data} = useFormContext();
  const {isLoading} = useLoaderContext();
  // HOOKS
  // const {isImageLoaded, isImageLoadingStyle, getImageFile} = useHideImagesWhileLoading();
  // RENDERED ELEMENTS
  const loader = (
    <div className='photo-entries-admin-container'>
      <div className='auth-modal-loader'> <Loader height='50%' width='50%'/> </div>
    </div>
  )
  // conditionally render page content: can't display content/ empty list / display content
  let photoEntries = (data && data.map(photoEntry => { return <PhotoEntry key={photoEntry._id} collection={collection} photoEntry={photoEntry} /> }))
  if(!data || typeof data === 'undefined') {
    photoEntries = <h4> Could not display photo entries </h4>
  } else if (data && data.length < 1) {
    photoEntries = <h4> Your list is empty </h4>
  }
  const renderedContent = (
    <div className='photo-entries-admin-container'>
      {/* { !isImageLoaded && data && data.map(photoEntry => { return <SkeletonUserPhotoEntry key={photoEntry._id} theme={'dark'} /> })} */}
      {/* photo entry is ready to be displayed: display photo entries */}
      {photoEntries}
    </div>
  )
  return ( <> {isLoading.PHOTO_ENTRY_MODAL ? loader : renderedContent} </> )
}