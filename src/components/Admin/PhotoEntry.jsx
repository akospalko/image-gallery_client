// photo entry with control panel buttons
import React from 'react'
import './PhotoEntries.css'
import '../Shared.css'
import {transformDate} from '../../helper/dateUtilities'
import {useModalContext} from '../contexts/ToggleModalContext'
import {useFormContext} from '../contexts/FormContext'
import {useAuthContext} from '../contexts/AuthenticationContext'
import {useNavigate, useLocation} from 'react-router'
import {OPERATIONS} from '../../helper/dataStorage'
import Timestamp from '../Timestamp'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import Button from '../UI/Button';
import { getAllGalleryPhotoEntries, getSinglePhotoEntry, deletePhotoEntry } from '../../helper/axiosRequests';

const PhotoEntry = ({collection, photoEntry, imgFile, isImageLoadingStyle}) => {
  // PROPS
  const {title, description, createdAt, captureDate, updatedAt, _id:id, gpsLatitude, gpsLongitude, author} = photoEntry ?? {};
  // // CONTEXT
  const {setData, setMessage} = useFormContext();
  const {toggleModalHandler, setActiveID, setID} = useModalContext();
  const {auth} = useAuthContext();
  // HOOK
  const axiosPrivate = useAxiosPrivate();
  // NAVIGATION & ROUTING
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const navToPrevPage = () => navigate('/login', { state: {from: location}, replace: true});
  // HANDLERS
  // delete and refetch photo entries
  const deletePhotoEntryHandler = async (id) => {
    try {
      const responseDelete = await deletePhotoEntry(id, axiosPrivate, collection);
      setMessage(responseDelete.message);
      const responseGetAll = await getAllGalleryPhotoEntries(axiosPrivate, auth.userID, 'all'); // fetch entries, update state  
      setData(responseGetAll.photoEntries); // store entries in state
    } catch(error) {
      navToPrevPage(); // navigate unauth user back to login page
    }
  }
  // fetch photo data (of the clicked id) to populate update photo entry modal 
  const editPhotoEntryHandler = async (id) => {
    try {
      const response = await getSinglePhotoEntry(id, axiosPrivate, collection); // fetch entry data
      setActiveID(response.photoEntry); // set active entry
      toggleModalHandler(OPERATIONS.UPDATE_PHOTO); // open modal
      setMessage(response.message); // set message
    } catch(error) {
      navToPrevPage(); // navigate unauth user back to login page
    }
  }

  return (
    <div className='image-card-container'>
      {/* CONTROL PANEL */}
      <div className='image-card-control-panel'>
      {/* edit */}
      <Button 
        customStyle={'control-panel-edit'}
        clicked={() => editPhotoEntryHandler(id)}
      > Edit </Button>
        {/* delete */}
        <Button 
          customStyle={'control-panel-edit'}
          clicked={() => deletePhotoEntryHandler(id)} 
        > Delete </Button>
        {/* view */}
        <Button 
          customStyle={'control-panel-edit'}
          clicked={() => {
            setID(id)
            toggleModalHandler(OPERATIONS.FULLSCREEN_VIEW) }}
        > View </Button>
          {/* map */}
        <Button 
          customStyle={'control-panel-edit'}
          clicked={() => {
            setID(id)
            toggleModalHandler(OPERATIONS.MAP_VIEW) }}
        > Map </Button>
      </div>
      {/* CONTENT */}
      <div className='image-card-content'>
        <div className='image-card-content-data'> {id} </div>
        <div className='image-card-content-data image-card-content-data--title'> 
          <p> {title} </p>
        </div>
        <div className='image-card-content-data'> {transformDate(captureDate, '-', '.')} </div>
        <div className='image-card-content-data'> {gpsLatitude} </div>
        <div className='image-card-content-data'> {gpsLongitude} </div>
        <div className='image-card-content-data'> {author} </div>
        <div className='image-card-content-data image-card-content-data--description'> 
          <p> {description} </p>
        </div>
        {/* TIMESTAMP */}
        <div className='image-card-content-data image-card-content-data--timestamp'> 
          <Timestamp dateCreation={createdAt} dateLastUpdate={updatedAt} />
        </div>
      </div>
    </div>
  )
}

export default React.memo(PhotoEntry);