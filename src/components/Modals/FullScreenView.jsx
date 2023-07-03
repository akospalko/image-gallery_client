// RESOURCE: zoom/pan functionality - https://www.npmjs.com/package/react-zoom-pan-pinch

import React, { useEffect } from 'react'
import './FullScreenView.css' 
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useModalContext } from '../contexts/ToggleModalContext'
import useHideImagesWhileLoading from '../hooks/useHideImagesWhileLoading'
import Button from '../UI/Button'
import LoaderIcon from '../SVG/Loader'
import { ZoomInIcon, ZoomOutIcon, RestoreViewIcon } from '../SVG/Icons'

export default function FullScreenView() {
  // CONSTANTS
  // icon params
  const toolIconSize = '100%'; 
  const loaderIconSize = '100px'; // width and height value
  const iconColor = 'var(--text-color--high-emphasis)'; // fill / stroke value
  
  // CONTEXTS
  const { activePhotoEntry } = useModalContext();
  // HOOKS
  const {
    allImagesLoaded, setAllImagesLoaded, 
    hideImageStyle, 
    onLoadHandler } = useHideImagesWhileLoading();
  
  // EFFECT
  // filter out photoURL for the current entry with the help of id (from modal context) 
  useEffect(() => {
    if(!activePhotoEntry) return;
    setAllImagesLoaded(false); 
  }, [ activePhotoEntry ])

  // HELPER
  // get photo view tools 
  const getPhotoViewTool = (toolHandler, displayedIcon) => {
    // toolHandler - callback handler to run the tool  
    return <Button 
      clicked={ () => toolHandler() } 
      buttonStyle='button-photo-view-tools'
    > { displayedIcon }
    </Button>
  }

  // STYLE
  // fit react-zoom-pan-pinch wrapper to parent container  
  const transformComponentStyle= {
    height: '100%',
    width: '100%',
  }
  // displayed image
  const imgStyle= {
    display: 'flex',
    objectFit: 'contain',
    maxHeight: '100%',
    width: '100%',
  }

  // RENDERED ELEMENT
  // loader: shown while photo is being loaded  
  const loader = (!allImagesLoaded && 
    <div className='photo-view-loader-container'> 
      <LoaderIcon height={ loaderIconSize } width={ loaderIconSize } stroke={ iconColor } /> 
    </div> 
  )

  // photo with zoom/pan/reset functionality
  const displayedPhoto = (
    <TransformWrapper
      limitToBounds={ true }
      alignmentAnimation={ { sizeX: 0, sizeY: 0 } }
      centerZoomedOut={ true }
      minScale={ 1 }
      maxScale={ 10 }
    >
      { ( { zoomIn, zoomOut, resetTransform, ...rest } ) => (
        <div className='photo-view-loader-container' style={ hideImageStyle } >
          {/* photo view toolbar */}
          <div className='photo-view-tools'> 
            { getPhotoViewTool(zoomIn, <ZoomInIcon height={ toolIconSize } width={ toolIconSize } fill={ iconColor } />) }
            { getPhotoViewTool(zoomOut, <ZoomOutIcon height={ toolIconSize } width={ toolIconSize } fill={ iconColor } />) }
            { getPhotoViewTool(resetTransform, <RestoreViewIcon height={ toolIconSize } width={ toolIconSize } fill={ iconColor } />) }
          </div>
          <TransformComponent
            wrapperStyle={ transformComponentStyle }
            contentStyle={ transformComponentStyle }
          >
            <img
              src={ activePhotoEntry.photoURL } 
              style={ imgStyle } 
              onLoad={ () => onLoadHandler(activePhotoEntry._id) } 
              />
          </TransformComponent>
        </div>
      )}
    </TransformWrapper>
  )

  return( 
    <div className='photo-view-container'> 
      { loader }
      { displayedPhoto } 
    </div> 
  )
}