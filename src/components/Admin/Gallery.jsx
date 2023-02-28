//form to create/update image entries
import React from 'react'
import '../Shared.css'
import Button from '../UI/Button'
import ImageCard from './ImageCard'
import {useModalContext} from '../contexts/ToggleModalContext'
import ImageEntryModalGroup from './ImageEntryModalGroup'
import {COLLECTIONS} from '../../helper/dataStorage'

export default function Dashboard() {
  // CONTEXT
  const {toggleModalHandler} = useModalContext();

  return (
    <div className='shared-page-container'>
      {/* title */}
      <h1> Gallery Dashboard </h1>  
      {/* add new image button */}
      <Button 
        clicked={() => toggleModalHandler('createImage')}
        style={'image-new'}
      > Create Image Entry 
      </Button>
      {/* image cards container */}
      <div className='shared-image-cards-container'>
        <ImageCard collection={COLLECTIONS.gallery} />
      </div>
      {/* control group modals */}
      <ImageEntryModalGroup collection={COLLECTIONS.gallery}/>
    </div>
  )
}