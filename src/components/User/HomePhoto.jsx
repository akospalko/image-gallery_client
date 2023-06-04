// render photo for home page carousel, handle image loading logic  
import React, { useEffect } from "react";
import "./Home.css";
import styled from 'styled-components';

 // Styled image component
 const StyledImage = styled.img`
  object-fit: contain; // cover
  height: 100%;
  width: 100%; 
  background-color: var(--bg-color--secondary-transparent-high);

  @media (min-width: 768px) {
    // object-fit: contain;
  }

 @media screen and (min-width: 1024px) {
    height: 506px;
    width: auto;
    padding: 10px;
    background-color: var(--bg-color--secondary-transparent-high);
  } 
`
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
