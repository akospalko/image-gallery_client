import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import '../Shared.css'
import Button from '../UI/Button'
import ImageCard from './ImageCard'
import AddNewImage from './AddNewImage'

export default function Dashboard() {

  const [toggleModal, setToggleModal] = useState(false);
  //TODO: add toggle modal handler (outsource it later)
  const toggleModalHandler = () => {
    console.log('toggled:', toggleModal);
    setToggleModal(prev => !prev);

  }
  
  useEffect(() => {
    if(toggleModal) {
      document.body.overflowY = 'hidden';
    } else {
      document.body.overflowY = 'scroll';
    }
  }, [toggleModal])
  //TODO: toggle on -> turn off body scroll when toggle is active




  return (
    <div className='shared-page-container'>
      {/* title */}
      <h1> Dashboard </h1>  
      {/* add new image button */}
      <Button 
        clicked={toggleModalHandler}
        style={'image-new'}> 
      Add new Image </Button>
      {/* image cards container */}
      <div className='dashboard-image-container'>
      {/* image card (single) */}
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
      </div>
      {/* form modal: add/update image */}
      { toggleModal ? <AddNewImage /> : null }
    </div>
  )
}
