import React, {useEffect, useState} from 'react'
import './FullScreenView.css' 
import {useModalContext} from './../contexts/ToggleModalContext'
import {useFormContext} from './../contexts/FormContext'
import useHideImagesWhileLoading from '../hooks/useHideImagesWhileLoading'
import Loader from '../SVG/Loader'

export default function FullScreenView() {
  // CONTEXTS
  const {id} = useModalContext();
  const {data} = useFormContext();
  const [photo, setPhoto] = useState();
  // HOOKS
  const {
    allImagesLoaded, setAllImagesLoaded, 
    hideImageStyle, 
    getImageFile,
  } = useHideImagesWhileLoading();
  
  // EFFECT
  // filter out photoURL for the current entry with the help of id (from modal context) 
  useEffect(() => {
    // console.log(allImagesLoaded)
    if(!data) return;
    setAllImagesLoaded(false); 
    const filtered = data.filter(elem => elem._id === id);
    setPhoto(prev => {
      return {
        ...prev, 
        title: filtered[0].title, 
        url: filtered[0].photoURL
      }
    })
  }, [])
  //RENDERED ELEMENT
  const displayedPhoto = (
    <>
      { !allImagesLoaded && <div className='full-screen-view-photo'> <Loader height='50%' width='50%'/> </div> }
      {photo &&  
      <div className='full-screen-view-photo' style={hideImageStyle} >
        {getImageFile(photo.url, {objectFit: 'contain'}, id)}
      </div>}
    </> 
  )

  return( 
    <div className='full-screen-view-container'> 
      {displayedPhoto} 
    </div> 
  )
}