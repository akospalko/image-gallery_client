 // TODO: add skeleton loader for text elements 
import React, {useState} from 'react'
import './PhotoEntries.css'
import {useFormContext} from '../contexts/FormContext'
import PhotoEntry from './PhotoEntry'
import Loader from '../SVG/Loader'

export default function PhotoEntries({collection}) {
  // STATE
  const [isLoading, setIsLoading] = useState(false);
  // CONTEXTS
  const {data} = useFormContext();
  // HOOKS
  // const {isImageLoaded, isImageLoadingStyle, getImageFile} = useHideImagesWhileLoading();
  // RENDERED ELEMENTS
  const loader = (
    <div className='photo-entries-admin-container'>
      <div className='auth-modal-loader'> <Loader height='50%' width='50%'/> </div>
    </div>
  )
  const photoEntries = (
    <div className='photo-entries-admin-container'>
      {/* { !isImageLoaded && data && data.map(photoEntry => { return <SkeletonUserPhotoEntry key={photoEntry._id} theme={'dark'} /> })} */}
      {/* photo entry is ready to be displayed: display photo entries */}
      {data && data.map(photoEntry => { return <PhotoEntry key={photoEntry._id} collection={collection} photoEntry={photoEntry} setIsLoading={setIsLoading} />
      })}
    </div>
  )
  return ( <> {isLoading ? loader : photoEntries} </> )
}