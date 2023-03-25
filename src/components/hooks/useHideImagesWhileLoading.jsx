// TODO: handle class && inline styles
import React, {useState} from 'react'

export default function useHideImagesWhileLoading() {
  // STATE
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // hide img while it is being loaded
  const isImageLoadingStyle = isImageLoaded ? {} : {visibility: 'hidden', position: 'fixed'};
  // img tag to return
  const getImageFile = (src, style) => {
    return <img className='photo-entry-photo' src={src} style={style} onLoad={() => setIsImageLoaded(true)}/>
  }
  return {isImageLoaded, isImageLoadingStyle, getImageFile}
}