// Render photo for home page carousel, handle image loading logic  
import React, { useEffect } from "react";
import "./Home.css";
import styled from 'styled-components';

 // Styled image component
 const StyledImage = styled.img`
  display: flex;
  object-fit: contain;
  height: 100%;
  width: 100%; 
}`

export default function HomePhoto({photo, getImageFile, setCurrentlyLoadingImages, onLoadHandler}) {
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
      } else {
        return prev; // Return the current state when the image ID is a duplicate
      }
    })
  }, [])
  
  return(
    <>
      <StyledImage 
        src={photoURL} 
        onLoad={() => onLoadHandler(_id)} 
      />
    </>
  )
};
