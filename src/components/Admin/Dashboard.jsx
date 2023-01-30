import React, {useEffect} from 'react'
import './Dashboard.css'
import '../Shared.css'
import Button from '../UI/Button'
import ImageCard from './ImageCard'
import AddNewImage from './AddNewImage'
import {useModalContext} from '../ToggleModalContext'

export default function Dashboard() {
  const { toggleModal, toggleModalHandler} = useModalContext();

  useEffect(() => {
    //enable/disable scrolling on body based on toggleModal state
    if(toggleModal) {
      document.body.style.overflowY = 'hidden';
      console.log(document.body.overflowY)
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
        clicked={toggleModalHandler}
        style={'image-new'}
      > 
        Add new Image 
      </Button>
      {/* image cards container */}
      <div className='dashboard-image-container'>
      {/* image card (single) */}
        <ImageCard />
  
      </div>
      {/* form modal: add/update image */}
      { toggleModal ? <AddNewImage  toggleHandler={toggleModalHandler}  /> : null }
    </div>
  )
}
