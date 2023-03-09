//form to create/update photo entries
import React from 'react'
import '../Shared.css'
import Button from '../UI/Button'
import PhotoCard from './PhotoCard'
import {useModalContext} from '../contexts/ToggleModalContext'
import PhotoEntryModalGroup from './PhotoEntryModalGroup'
import {COLLECTIONS, OPERATIONS} from '../../helper/dataStorage'

export default function Gallery() {
  // CONTEXT
  const {toggleModalHandler} = useModalContext();

  return (
    <div className='shared-page-container'>
      {/* title */}
      <h1> Gallery Dashboard </h1>  
      {/* add new photo entry button */}
      <Button 
        clicked={() => toggleModalHandler(OPERATIONS.CREATE_PHOTO)}
        style={'image-new'}
      > Create Photo Entry 
      </Button>
      {/* photo cards container */}
      <div className='shared-image-cards-container'>
        <PhotoCard collection={COLLECTIONS.GALLERY} />
      </div>
      {/* control group modals */}
      <PhotoEntryModalGroup collection={COLLECTIONS.GALLERY}/>
    </div>
  )
}