import React, {useEffect, useState} from 'react'
import './FullScreenView.css' 
import {useModalContext} from './../contexts/ToggleModalContext'
import {useFormContext} from './../contexts/FormContext'

export default function FullScreenView() {
  // CONTEXTS
  const {id} = useModalContext();
  const {data} = useFormContext();
  const [photoData, setImageData] = useState();
  // EFFECT
  // filter out photoURL for the current entry with the help of id (from modal context) 
  useEffect(() => {
    if(!data) return;
    const filtered = data.filter(elem => elem._id === id);
    setImageData(prev => {
      return {
        ...prev, 
        title: filtered[0].title, 
        url: filtered[0].photoURL
      }
    })
  }, [data, id])
  //RENDERED ELEMENT
  let rendered = <p> loading... </p>
  if(photoData) {
    rendered = <div style={{backgroundImage: `url(${photoData.url})`}} 
    className='view-image-photo'> </div> 
  }
  return(
    <>
    {/* photo */}
    {rendered}
    </>
  )
}