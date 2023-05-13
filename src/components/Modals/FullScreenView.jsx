// RESOURCE: zoom/pan functionality - https://www.npmjs.com/package/react-zoom-pan-pinch
import React, {useEffect} from 'react'
import './FullScreenView.css' 
import {useModalContext} from '../contexts/ToggleModalContext'
import useHideImagesWhileLoading from '../hooks/useHideImagesWhileLoading'
import LoaderIcon from '../SVG/Loader'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Button from '../UI/Button'
import { ZoomInIcon, ZoomOutIcon, RestoreViewIcon } from '../SVG/Icons'

export default function FullScreenView() {
  // CONTEXTS
  const {activePhotoEntry} = useModalContext();
  // HOOKS
  const {
    allImagesLoaded, setAllImagesLoaded, 
    hideImageStyle, 
    getImageFile,
  } = useHideImagesWhileLoading();
  
  // EFFECT
  // filter out photoURL for the current entry with the help of id (from modal context) 
  useEffect(() => {
    if(!activePhotoEntry) return;
    setAllImagesLoaded(false); 
  }, [activePhotoEntry])
  // RENDERED ELEMENT
  // loader: shown while photo is being loaded  
  const loader = (!allImagesLoaded && 
    <div className='full-screen-view-photo-container'> 
      <LoaderIcon height='100px' width='100px' stroke='var(--text-color--high-emphasis)'/> 
    </div> 
  )
  // photo with zoom/pan/reset functionality
  const displayedPhoto = (
    <>
      <TransformWrapper>
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <div className='full-screen-view-photo-container' style={hideImageStyle}>
           <div className="full-screen-view-photo">
              <div className="full-screen-view-tools"> {/* TODO: rename, photo-view-tools */}
                <Button 
                  clicked={() => zoomIn()} 
                  buttonStyle='button-photo-view-tools'
                > <ZoomInIcon height='100%' width='100%' fill='var(--text-color--high-emphasis)'/>
                </Button>
                <Button 
                  clicked={() => zoomOut()} 
                  buttonStyle='button-photo-view-tools'
                > <ZoomOutIcon height='100%' width='100%' fill='var(--text-color--high-emphasis)'/>
                </Button>
                <Button 
                  clicked={() => resetTransform()} buttonStyle='button-photo-view-tools'
                > <RestoreViewIcon height='100%' width='100%' fill='var(--text-color--high-emphasis)'/>
                </Button>
              </div>
              <TransformComponent>
                {getImageFile(activePhotoEntry.photoURL, {objectFit: 'contain'}, activePhotoEntry._id)}
              </TransformComponent>
            </div>
          </div>
        )}
      </TransformWrapper>
    </>
  )

  return( 
    <div className='full-screen-view-container'> 
      {loader}
      {displayedPhoto} 
    </div> 
  )
}