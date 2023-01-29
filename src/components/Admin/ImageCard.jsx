/*
TODO: data fixed length:150-200 for description field; 100char for all the others 

*/

import React from 'react'
import Button from '../UI/Button'
import './ImageCard.css'

export default function ImageCard() {
  return (
    /* card container */
    <div className='image-card-container'>
      {/* control panel: delete, edit buttons */}
      <div className='image-card-control-panel'>
        <Button style={'image-control-panel'}> Edit </Button>
        <Button style={'image-control-panel'}> Delete </Button>
        <Button style={'image-control-panel'}> View  </Button>
        <Button style={'image-control-panel'}> Map </Button>
      </div>
      {/* content */}
      <div className='image-card-content'>
        <div className='image-card-content-data'> 1412412400</div>
        <div className='image-card-content-data image-card-content-data--title'> 
          <p> aerial photgraphy about a beautiful lake aerial photgraphy about a beautiful lake  a beautiful lake </p>
        </div>
        <div className='image-card-content-data'> 2023.01.29 </div>
        <div className='image-card-content-data'> beautiful lake, beautiful place </div>
        <div className='image-card-content-data'> 000001, 000002 </div>
        <div className='image-card-content-data'> author </div>
        <div className='image-card-content-data image-card-content-data--description'> 
          <p>
            11111 1a beautiful lake with spectecular scenery, made by  a beautiful lake with spectecular scenery, made by   a beautiful lake with spectecular scenery, made by   a beautiful lake with spectecular scenery, made by  a beautiful lake with spectecular scenery, made by  a beautiful lake with spectecular scenery, made by  a beautiful lake with spectecular scenery, made by  
          </p>
        </div>
      </div>
  </div>
  )
}