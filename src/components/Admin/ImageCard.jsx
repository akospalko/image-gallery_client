import React, {useEffect} from 'react'
import Button from '../UI/Button'
import './ImageCard.css'
import {getAllImageEntries, getSingleImageEntry, deleteImageEntry} from '../../helper/axiosRequests'
import {generateDateString, transformDate} from '../../helper/dateUtilities'
import {useModalContext} from '../contexts/ToggleModalContext'
import {useFormContext} from '../contexts/FormContext'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import {updateImage} from '../../helper/dataStorage'

export default function ImageCard() {
  // CONTEXTS
  const {toggleModalHandler, setActiveID, setID} = useModalContext();
  const {data, setData, setMessage} = useFormContext();
  // HOOK
  const axiosPrivate = useAxiosPrivate();
  // EFFECT
  useEffect(() => { // get all data on initial render
    (async () => {
      const response = await getAllImageEntries(axiosPrivate); // fetch entries, update state  
      setData(response.imageEntries); // store entries in state
      setMessage(response.message); // set message
    })() 
  }, []) 
  // delete and refetch image entries
  const deleteImageEntryHandler = async (id) => {
    const responseDelete = await deleteImageEntry(id, axiosPrivate);
    setMessage(responseDelete.message);
    const responseGetAll = await getAllImageEntries( axiosPrivate); // fetch entries, update state  
    setData(responseGetAll.imageEntries); // store entries in state
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
                const response = await getSingleImageEntry(card._id, axiosPrivate); // fetch entry data
                setActiveID(response.imageEntry); // set active entry
                setMessage(response.message); // set message
                toggleModalHandler('updateImage'); // open modal
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
            <div className='image-card-content-data'> {card.gpsLatitude} </div>
            <div className='image-card-content-data'> {card.gpsLongitude} </div>
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