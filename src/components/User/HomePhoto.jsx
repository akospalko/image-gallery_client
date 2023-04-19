// render photo for home page carousel, handle image loading logic  
import React, { useEffect } from "react";
import "./Home.css";

export default function HomePhoto({photo , getImageFile , hideImageStyle , setCurrentlyLoadingImages}) {
  // PROPS
  const {photoURL, _id } = photo ?? {};
  // EFFECT
  // add currently loading image to loading state
  useEffect(()=> {
    setCurrentlyLoadingImages(prev => {
      const isDuplicate =  Object.keys(prev ?? {}).includes(String(_id)) // img already added to the loading lis
      if(!isDuplicate) {// if img id is not yet in state -> add
        const updatedState = {...prev, [_id]: false};
        return updatedState
      }
    })
  }, [])
  
  return(
    <>
      <div style={hideImageStyle} className='home-photo'>
        {getImageFile(photoURL, {objectFit: 'cover'}, _id)}
      </div>
    </>
  )
};
