//form to create/update image entries
import React, {useEffect} from 'react'
import './Dashboard.css'
import '../Shared.css'
import Button from '../UI/Button'
import ImageCard from './ImageCard'
import ImageEntryModal from './ImageEntryModal'
import {useModalContext} from '../contexts/ToggleModalContext'

export default function Dashboard() {
  const { toggleModal, toggleModalHandler} = useModalContext();
  const operation = 'createImage'; // used with create new image entry  
  useEffect(() => {
    let isToggled = false; // check if any toggle value in toggleModal is true
    for(let toggledElem in toggleModal) {
      isToggled = toggleModal[toggledElem] === true || isToggled;
    }
    if(isToggled) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
  }, [toggleModal])

  return (
    <div className='shared-page-container'>
      {/* title */}
      <h1> Dashboard </h1>  
      {/* add new image button */}
      <Button 
        clicked={() => toggleModalHandler(operation)}
        style={'image-new'}
      > 
        Crete Image Entry 
      </Button>
      {/* image cards container */}
      <div className='dashboard-image-container'>
      {/* image card (single) */}
        <ImageCard />
      </div>
      {/* form modal: add/update image */}
      { toggleModal.createImage ? <ImageEntryModal operation ='createImage' toggleHandler={toggleModalHandler} /> : null }
      { toggleModal.updateImage ? <ImageEntryModal operation ='updateImage'  toggleHandler={toggleModalHandler} /> : null }
    </div>
  )
}