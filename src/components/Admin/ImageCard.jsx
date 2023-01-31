/*
TODO: data fixed length:150-200 for description field; 100char for all the others 
*/
import React from 'react'
import Button from '../UI/Button'
import './ImageCard.css'
import {imageCardTestData} from '../../helper/dataStorage'
import {useModalContext} from '../contexts/ToggleModalContext'

export default function ImageCard() {
  const { toggleModalHandler, setActiveEntryHandler } = useModalContext();
  const operation = 'updateImage'

  return (
    <>
      {imageCardTestData.map(card => (
        /* card container */
        <div key={card.id} className='image-card-container'>
          {/* control panel: delete, edit buttons */}
          <div className='image-card-control-panel'>
            <Button 
              style={'image-control-panel'}
              clicked={() => {
                setActiveEntryHandler(card.id, imageCardTestData);
                toggleModalHandler(operation)
              }}
            >  Edit 
            </Button>
            <Button style={'image-control-panel'}> Delete </Button>
            <Button style={'image-control-panel'}> View  </Button>
            <Button style={'image-control-panel'}> Map </Button>
          </div>
        {/* content */}
        <div className='image-card-content'>
          <div className='image-card-content-data'> {card.id} </div>
          <div className='image-card-content-data image-card-content-data--title'> 
            <p> {card.title} </p>
          </div>
          <div className='image-card-content-data'> {card.date} </div>
          <div className='image-card-content-data'> {card.coordinate} </div>
          <div className='image-card-content-data'> {card.author} </div>
          <div className='image-card-content-data image-card-content-data--description'> 
            <p>
              {card.description}
            </p>
          </div>
        </div>
        </div>
      ))}
    </>
  )
}