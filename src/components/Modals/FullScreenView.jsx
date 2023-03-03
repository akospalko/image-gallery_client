import React, {useEffect, useState} from 'react'
import './FullScreenView.css' 
import {useModalContext} from './../contexts/ToggleModalContext'
import {useFormContext} from './../contexts/FormContext'

export default function FullScreenView() {
  // CONTEXTS
  const {id} = useModalContext();
  const {data} = useFormContext();
  const [imageData, setImageData] = useState();
  // EFFECT
  // filter out imageURL for the current entry with the help of id (from modal context) 
  useEffect(() => {
    if(!data) return;
    const filtered = data.filter(elem => elem._id === id);
    setImageData(prev => {
      return {
        ...prev, 
        title: filtered[0].title, 
        url: filtered[0].imageURL
      }
    })
  }, [data, id])
  //RENDERED ELEMENT
  let rendered = <p> loading... </p>
  if(imageData) {
    rendered = <div style={{backgroundImage: `url(${imageData.url})`}} 
    className='view-image-photo'> </div> 
  }
  return(
    <>
    {/* image file */}
    {rendered}
    </>
  )
}