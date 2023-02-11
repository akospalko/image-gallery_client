import React, { useEffect, useState } from 'react'
import Button from './UI/Button'
import './ViewImage.css' 
import { useModalContext } from './contexts/ToggleModalContext'
import { useFormContext } from './contexts/FormContext'

export default function ViewImage() {
  // CONTEXTS
  const {toggleModalHandler, id} = useModalContext();
  const {data, setFormData} = useFormContext();
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
    rendered = (
    <div className='view-image-image' > 
      <img src={imageData.url} alt={imageData.title} /> 
    </div> )
  }
  return(
    <div className='view-image-container'>
      {/* close button */}
      <div className='view-image-button'> 
        <Button 
          clicked={() => {
            setFormData(undefined);
            toggleModalHandler('viewImage')
          }}
          customStyle='view-image-close'> X 
        </Button>
      </div>
      {/* image file */}
      {rendered}
    </div>
  )
}