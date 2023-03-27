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
  const getImageFile = (src, style, key, alt) => {
    return <img key={key || ''} className='photo-entry-photo' src={src} style={style || {}} onLoad={() => onLoadHandler()} alt={alt || ''}/>
  }
  return {isImageLoaded, isImageLoadingStyle, getImageFile}
}