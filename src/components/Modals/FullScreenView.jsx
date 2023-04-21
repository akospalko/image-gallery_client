// RESOURCE: zoom/pan functionality - https://www.npmjs.com/package/react-zoom-pan-pinch
// TODO: add icon to btn-s
import React, {useEffect, useState} from 'react'
import './FullScreenView.css' 
import {useModalContext} from '../contexts/ToggleModalContext'
import {useFormContext} from '../contexts/FormContext'
import useHideImagesWhileLoading from '../hooks/useHideImagesWhileLoading'
import Loader from '../SVG/Loader'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Button from '../UI/Button'

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
  // RENDERED ELEMENT
  // loader: shown while photo is being loaded  
  const loader = (!allImagesLoaded && 
    <div className='full-screen-view-photo-container'> 
      <Loader height='50%' width='50%'/> 
    </div> 
  )
  // photo with zoom/pan/reset functionality
  const displayedPhoto = (photo && 
    <div className='full-screen-view-photo-container' style={hideImageStyle}>
      <TransformWrapper>
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <>
           <div className="full-screen-view-photo">
              <div className="full-screen-view-tools"> {/* TODO: rename, photo-view-tools */}
                <Button clicked={() => zoomIn()} buttonStyle='button-photo-view-tools'>+</Button>
                <Button clicked={() => zoomOut()} buttonStyle='button-photo-view-tools'>-</Button>
                <Button clicked={() => resetTransform()} buttonStyle='button-photo-view-tools'>x</Button>
              </div>
              <TransformComponent>
                {getImageFile(photo.url, {objectFit: 'contain'}, id)}
              </TransformComponent>
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  )

  return( 
    <div className='full-screen-view-container'> 
      {loader}
      {displayedPhoto} 
     </div> 
  )
}