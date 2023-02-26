//form to create/update image entries
import React from 'react'
import './Dashboard.css'
import '../Shared.css'
import Button from '../UI/Button'
import ImageCard from './ImageCard'
import ImageEntryModal from './ImageEntryModal'
import {useModalContext} from '../contexts/ToggleModalContext'
import useToggleModalScroll from '../hooks/useToggleModalScroll'

export default function Dashboard() {
  // CONTEXT
  const { toggleModal, toggleModalHandler} = useModalContext();
  // HOOK
  // TODO: relocate
  useToggleModalScroll();

  return (
    <div className='shared-page-container'>
      {/* title */}
      <h1> Dashboard </h1>  
      {/* add new image button */}
      <Button 
        clicked={() => toggleModalHandler('createImage')}
        style={'image-new'}
      > Create Image Entry 
      </Button>
      {/* image cards container */}
      <div className='dashboard-image-container'>
        <ImageCard /> {/* image card (single) */}
      </div>
      {/* form modal: add/update image */}
      { toggleModal.createImage ? <ImageEntryModal operation ='createImage' toggleHandler={toggleModalHandler} /> : null }
      { toggleModal.updateImage ? <ImageEntryModal operation ='updateImage' toggleHandler={toggleModalHandler} /> : null }
      { toggleModal.viewImage ? <ImageEntryModal operation ='viewImage' toggleHandler={toggleModalHandler} /> : null }
      { toggleModal.viewMap ? <ImageEntryModal operation ='viewMap' toggleHandler={toggleModalHandler} /> : null }
    </div>
  )
}