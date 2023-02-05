import React from 'react'
import Button from '../UI/Button'
import './ViewImage.css' 
import { useModalContext } from '../contexts/ToggleModalContext';


export default function ViewImage() {
  const {data, toggleModalHandler} = useModalContext();
  const {imageURL, title} = data[0];
  console.log('URL',imageURL);

  return(
    <div className='view-image-container'>
      {/* close button */}
      <div className='view-image-button'> 
        <Button 
          clicked={() => toggleModalHandler('viewImage')}
          customStyle='view-image-close'> X 
        </Button>
      </div>
      {/* image file */}
      <div className='view-image-image' > 
        <img src={imageURL} alt={title} /> 
      </div>
    </div>
  )
}