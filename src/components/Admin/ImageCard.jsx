import React, { useState, useEffect, useCallback, useContext } from 'react'
import Button from '../UI/Button'
import './ImageCard.css'
import {imageCardTestData} from '../../helper/dataStorage'
import {useModalContext} from '../contexts/ToggleModalContext'
import {getAllImageEntries, deleteImageEntry} from '../../helper/axiosRequests'
import {FormContext} from '../UI/Form'
import {transformDate} from '../../helper/transformDate'
import ImageUpload from '../UI/ImageUpload'

export default function ImageCard() {
  const {data, setData, isSubmittingForm, setIsSubmittingForm, toggleModalHandler, setActiveEntryHandler} = useModalContext();
  const {statusMessage, setStatusMessage} = useContext(FormContext);
  // const [data, setData] = useState([]);
  
  // fetch data
  let fetchAllImageEntries = useCallback(async () => {
    const response = await getAllImageEntries();
    setData(response.data);
    // updateState(setStatusMessage, 'getAllTasks', resStatusMessage);
    // updateState(toggleLoader, 'getAllTasks', false); 
  }, [setData, setStatusMessage])

  // data initial fetch
  useEffect(() => {
    fetchAllImageEntries();
  }, [fetchAllImageEntries, setData, setStatusMessage])
  
  // refetch data each time form is submitted
  useEffect(() => {
    if(!isSubmittingForm) return;
    fetchAllImageEntries();
  }, [data, fetchAllImageEntries, isSubmittingForm])

  const deleteImageEntryHandler = async (id) => {
    setIsSubmittingForm(true);
    await deleteImageEntry(id);
    setIsSubmittingForm(false);
  }

  return (
    <>
      {data.map(card => (
        /* card container */
        <div key={card._id} className='image-card-container'>
          {/* control panel: delete, edit buttons */}
          <div className='image-card-control-panel'>
            <Button 
              customStyle={'image-control-panel'}
              clicked={() => {
                setActiveEntryHandler(card._id, imageCardTestData);
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
              clicked={() => toggleModalHandler('viewImage')}
            > View  
            </Button>
            <Button customStyle={'image-control-panel'}> Map </Button>
          </div>
          {/* content */}
          <div className='image-card-content'>
            <div className='image-card-content-data'> {card._id} </div>
            <div className='image-card-content-data image-card-content-data--title'> 
              <p> {card.title} </p>
            </div>
            {/* <div className='image-card-content-data'> {card.date} </div> */}
            <div className='image-card-content-data'> 2023. 02. 05. dummy date </div>
            <div className='image-card-content-data'> {card.coordinate} </div>
            <div className='image-card-content-data'> {card.author} </div>
            <div className='image-card-content-data image-card-content-data--description'> 
              <p> {card.description} </p>
            </div>
            <ImageUpload />
            <div className='image-card-content-data image-card-content-data--timestamp'> 
              <i> <span> Created at: {transformDate(card.createdAt)} </span> </i> 
              <i> <span> Last updated: {transformDate(card.updatedAt)} </span> </i> 
            </div>
          </div>
        </div>
      ))}
    </>
  )
}