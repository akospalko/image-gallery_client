// TODO: dont render label/content for entries w/o data
import React, {useState, useEffect} from 'react'
import './PhotoInfo.css'
import '../Shared.css'
import {useModalContext} from './../contexts/ToggleModalContext'
import {useFormContext} from './../contexts/FormContext'
import Timestamp from '../Timestamp'

export default function PhotoInfo() {
  // CONTEXTS
  const {id} = useModalContext();
  const {data} = useFormContext();
  // STATE
  const [photoInfo, setPhotoInfo] = useState({}); 
  // EFFECT
  // filter out photoURL for the current entry with the help of id (from modal context) 
  useEffect(() => {
    if(!data) return;
    console.log(data);
    const filtered = data.filter(elem => elem._id === id);
    console.log(filtered)
    setPhotoInfo(prev => {
      return {...prev, ...filtered[0]}
    });
  }, [data, id, setPhotoInfo])

return (
    <>
      { photoInfo ? <div className='photo-info-container'> 
        <div className='photo-info-group'>  
          <div className='photo-info-label'> Title </div>
          <div className='photo-info-information'> {photoInfo.title} </div>
        </div>
        <div className='photo-info-group'> 
          <div className='photo-info-label'> Author </div>
          <div className='photo-info-information'> {photoInfo.author} </div>
        </div>
        <div className='photo-info-group'> 
          <div className='photo-info-label'> Capture date </div>      
          <div className='photo-info-information'> {photoInfo.captureDate} </div>
        </div> 
        <div className='photo-info-group'> 
          <div className='photo-info-label'> Description </div>
          <div className='photo-info-information photo-info-information--justify-text'> {photoInfo.description} </div>
        </div>
        <div className='photo-info-group'> 
          <div className='photo-info-label'> Coordinates </div>
          <div className='photo-info-information'>
            <div className='photo-info-information-coordinates'> {`Lat. ${photoInfo?.gpsLatitude ? photoInfo?.gpsLatitude.toFixed(3): 0}`} </div>
            <div className='photo-info-information-coordinates'> {`Lon. ${photoInfo?.gpsLongitude ? photoInfo?.gpsLongitude.toFixed(3): 0}`} </div>
          </div>
        </div>
        <div className='photo-info-group'> 
          <div className='photo-info-information photo-info-information--dates'>
          <Timestamp dateCreation={photoInfo.createdAt} dateLastUpdate={photoInfo.updatedAt}/>
          </div>
        </div>
      </div> : null }
    </>
  )
}