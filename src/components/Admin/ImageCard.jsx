import React, {useEffect} from 'react'
import Button from '../UI/Button'
import './ImageCard.css'
import {refetchImageEntries, fetchImageEntry, deleteImageEntry} from '../../helper/axiosRequests'
import {generateDateString, transformDate} from '../../helper/dateUtilities'
import {useModalContext} from '../contexts/ToggleModalContext'
import {useFormContext} from '../contexts/FormContext'

export default function ImageCard() {
  // CONTEXTS
  const {toggleModalHandler, setActiveID, setID} = useModalContext();
  const {data, setData} = useFormContext();
  // EFFECT
  useEffect(() => { // get all data on initial render
    (async () => {
      await refetchImageEntries(setData);
    })() 
  }, []) 
 
  const deleteImageEntryHandler = async (id) => {
    const responseDelete = await deleteImageEntry(id);
    // TODO: if delete is successful: re-fetch entries
    await refetchImageEntries(setData);
  }
  //elements
  const timestamp = (entry) => ( 
    <div className='image-card-content-data image-card-content-data--timestamp'> 
      <i> <span> Created at: {generateDateString(entry.createdAt)} </span> </i> 
      <i> <span> Last updated: {generateDateString(entry.updatedAt)} </span> </i> 
    </div>
  )

  return (
    <>
      {data?.map(card => (
        /* card container */
        <div key={card._id} className='image-card-container'>
          {/* control panel: delete, edit buttons */}
          <div className='image-card-control-panel'>
            <Button 
              customStyle={'image-control-panel'}
              clicked={async () => {
                await fetchImageEntry(card._id, setActiveID);
                toggleModalHandler('updateImage')
              }}
            >  Edit 
            </Button>
            <Button 
              customStyle={'image-control-panel'}
              clicked={() => deleteImageEntryHandler(card._id)} 
            > Delete 
            </Button>
            <Button 
              customStyle={'image-control-panel'}
              clicked={() => {
                setID(card._id)
                toggleModalHandler('viewImage') }}
            > View  
            </Button>
            <Button 
              customStyle={'image-control-panel'}
              clicked={() => {
                setID(card._id)
                toggleModalHandler('viewMap') }}
            > Map 
            </Button>
          </div>
          {/* content */}
          <div className='image-card-content'>
            <div className='image-card-content-data'> {card._id} </div>
            <div className='image-card-content-data image-card-content-data--title'> 
              <p> {card.title} </p>
            </div>
            <div className='image-card-content-data'> {transformDate(card.captureDate, '-', '.')} </div>
            <div className='image-card-content-data'> {card.gps} </div>
            <div className='image-card-content-data'> {card.author} </div>
            <div className='image-card-content-data image-card-content-data--description'> 
              <p> {card.description} </p>
            </div>
            { timestamp(card) }
          </div>
        </div>
      ))}
    </>
  )
}