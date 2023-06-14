// Logic to hide images while they are being loaded (using css)
// display them when load is done (photos are loaded by the browser) 
// it uses <img/> tag and onLoad tag attribute to solve the problem. 

import { useEffect, useState } from 'react';

export default function useHideImagesWhileLoading() {
  // STATE
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [currentlyLoadingImages, setCurrentlyLoadingImages] = useState({}); 

  // EFFECT
  useEffect(() => {
    const loadingImagesArr = Object.values(currentlyLoadingImages || {});
    const isAllImageLoaded = loadingImagesArr.every(img => img === true);
    isAllImageLoaded === true ? setAllImagesLoaded(isAllImageLoaded) : null;
    return () => { setAllImagesLoaded(false) };
  }, [allImagesLoaded, currentlyLoadingImages, setAllImagesLoaded])
  
  // HANDLER 
  // update load state to true when image is finished loading 
  const onLoadHandler = (photoID) => {
    if(!photoID) return;
    // set current photo's state to true 
    setCurrentlyLoadingImages(prev => {
      const updatedLoadingState = { ...prev, [photoID]: true }
      return updatedLoadingState;
    })
  }
  // add style to hide loading img-s  
  const hideImageStyle = allImagesLoaded ? {} : { visibility: 'hidden', position: 'fixed' };

  return {
    currentlyLoadingImages, setCurrentlyLoadingImages, // loading state for all img-s currently being loaded  
    allImagesLoaded, setAllImagesLoaded, // stores the loading state for each loading image 
    hideImageStyle, // check if img-s are loaded -> apply hide element 
    onLoadHandler // handle loading state update when current img is loaded 
  }
}