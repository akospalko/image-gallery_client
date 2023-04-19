import React, {useEffect, useState} from 'react'

export default function useHideImagesWhileLoading() {
  // STATE
  const [allImagesLoaded, setAllImagesLoaded] = useState(false); // switch to indicate whether all active img-s are loaded or not  
  const [currentlyLoadingImages, setCurrentlyLoadingImages] = useState({}); // stores the loading state for each loading image 
  // EFFECT
  useEffect(() => {
    const isAllImgLoaded = Object.values(currentlyLoadingImages || {}).every(img => img === true);
    isAllImgLoaded === true ? setAllImagesLoaded(isAllImgLoaded) : null;
    return () => {setAllImagesLoaded(false)};
  }, [allImagesLoaded, currentlyLoadingImages, setAllImagesLoaded])
  // HANDLER 
  // actions done when the image is loaded 
  const onLoadHandler = (photoID) => {
    if(!photoID) return;
    // set current photo's state to true 
    setCurrentlyLoadingImages(prev => {
      const updatedLoadingState = {...prev, [photoID]: true}
      return updatedLoadingState;
    })
  }
  // add style to hide rendered photo entry while the img is being loaded
  const hideImageStyle = allImagesLoaded ? {} : { visibility: 'hidden', position: 'fixed' };
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
        key={key || '1'} 
        src={src} 
        style={imgStyle || {}} 
        onLoad={() => onLoadHandler(key || '1')} 
        alt={alt || ''}
      />
    )
  }
  return {
    currentlyLoadingImages, setCurrentlyLoadingImages,
    allImagesLoaded, 
    hideImageStyle, 
    getImageFile
  }
}