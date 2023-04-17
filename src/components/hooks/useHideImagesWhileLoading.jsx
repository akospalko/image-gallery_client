import React, {useState} from 'react'

export default function useHideImagesWhileLoading() {
  // STATE
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  // HANDLER 
  const onLoadHandler = () => {
    setTimeout(() => { // force display skeleton loader (avoid jumping screens when resources are loaded too quickly))
      setIsImageLoaded(true);
    }, [300])
  }
  // hide img while it is being loaded
  const isImageLoadingStyle = isImageLoaded ? {} : {visibility: 'hidden', position: 'fixed'};
  // return an img element
  const getImageFile = (src, style, key, alt) => {
    // img styling
    const imgStyle = { 
      height: '100%',
      width: '100%', 
      backgroundColor: 'rgb(59, 59, 59)',
      ...style
    }

    return (
      <img 
      key={key || ''} 
      src={src} 
      style={imgStyle || {}} 
      onLoad={() => onLoadHandler()} 
      alt={alt || ''}
    />
    )
  }
  return {isImageLoaded, isImageLoadingStyle, getImageFile}
}