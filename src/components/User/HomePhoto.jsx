// Render photo for home page carousel, handle image loading logic  
import React, { useEffect } from "react";
import "./Home.css";

export default function HomePhoto(props) {
  // PROPS
  const { 
    photo, // photo data obj, extracted from home photos array
    setCurrentlyLoadingImages, // add photos to the loading list 
    onLoadHandler // when photo is loaded: set loading status to true 
  } = props;
  const { photoURL, _id } = photo ?? {}; //url & id associated with the photo 
  // EFFECT
  // Add currently loading image to loading state
  useEffect(()=> {
    setCurrentlyLoadingImages(prev => {
      const isDuplicate =  Object.keys(prev ?? {}).includes(String(_id)) // img already added to the loading list
      if(!isDuplicate) {// if img id is not yet in state -> add
        const updatedState = { ...prev, [_id]: false };
        return updatedState;
      } else {
        return prev; // Return the current state when the image ID is duplicate
      }
    })
  }, [])
  
  // STYLE
  const imgStyle= {
    display: 'flex',
    objectFit: 'contain',
    height: '100%',
    width: '100%'
  }

  return(
    <img  
      src={ photoURL } 
      style={ imgStyle } 
      onLoad={ () => onLoadHandler(_id) } 
    />
  )
};