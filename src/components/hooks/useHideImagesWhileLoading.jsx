import React, {useEffect, useState} from 'react'

export default function useHideImagesWhileLoading() {
  // STATE
  const [allImagesLoaded, setAllImagesLoaded] = useState(false); // switch to indicate whether all active img-s are loaded or not  
  const [currentlyLoadingImages, setCurrentlyLoadingImages] = useState({}); // stores the loading state for each loading image 
  // EFFECT
  useEffect(() => {
    const loadingImagesArr = Object.values(currentlyLoadingImages || {});
    const isAllImageLoaded = loadingImagesArr.every(img => img === true);
    isAllImageLoaded === true ? setAllImagesLoaded(isAllImageLoaded) : null;
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
  const getImageFile = (src, style, photoID, alt) => {
    // img styling
    const imgStyle = { 
      height: '100%',
      width: '100%', 
      ...style
    }

    return (
      <img 
        src={src} 
        style={imgStyle || {}} 
        onLoad={() => onLoadHandler(photoID)} 
        alt={alt || ''}
      />
    )
  }
  return {
    currentlyLoadingImages, setCurrentlyLoadingImages,
    allImagesLoaded, setAllImagesLoaded, 
    hideImageStyle, 
    getImageFile
  }
}