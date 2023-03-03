//form to create/update image entries
import React from 'react'
import '../Shared.css'
import Button from '../UI/Button'
import ImageCard from './ImageCard'
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
      {/* add new image button */}
      <Button 
        clicked={() => toggleModalHandler(OPERATIONS.CREATE_IMAGE)}
        style={'image-new'}
      > Create Image Entry 
      </Button>
      {/* image cards container */}
      <div className='shared-image-cards-container'>
        <ImageCard collection={COLLECTIONS.gallery} />
      </div>
      {/* control group modals */}
      <PhotoEntryModalGroup collection={COLLECTIONS.gallery}/>
    </div>
  )
}