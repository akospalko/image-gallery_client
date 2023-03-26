// TODO: handle class && inline styles
import React, {useState} from 'react'

export default function useHideImagesWhileLoading() {
  // STATE
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  // HANDLER 
  const onLoadHandler = () => {
    setTimeout(() => { // force display skeleton loader (avoid jumping screens when resources are loaded too quickly))
      setIsImageLoaded(true);
    }, [500])
  }
  // hide img while it is being loaded
  const isImageLoadingStyle = isImageLoaded ? {} : {visibility: 'hidden', position: 'fixed'};
  // img tag to return
  const getImageFile = (src, style, key) => {
    return <img key={key || src} className='photo-entry-photo' src={src} style={style} onLoad={() => onLoadHandler()}/>
  }
  return {isImageLoaded, isImageLoadingStyle, getImageFile}
}