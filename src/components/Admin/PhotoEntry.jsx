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
import {Edit, ViewPhoto, LocationMark, Delete} from '../SVG/ControlPanel'

const PhotoEntry = ({collection, photoEntry, imgFile, isImageLoadingStyle, setIsLoading}) => {
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
      const responseGetAll = await getAllGalleryPhotoEntries(axiosPrivate, auth.userID, 'all'); // fetch entries, update state  
      setData(responseGetAll.photoEntries); // store entries in state
    } catch(error) {
      navToPrevPage(); // navigate unauth user back to login page
    }
  }
  // fetch photo data (of the clicked id) to populate update photo entry modal 
  const editPhotoEntryHandler = async (id) => {
    try {
      setIsLoading(true);
      const response = await getSinglePhotoEntry(id, axiosPrivate, collection); // fetch entry data
      setActiveID(response.photoEntry); // set active entry
      toggleModalHandler(OPERATIONS.UPDATE_PHOTO); // open modal
    } catch(error) {
      navToPrevPage(); // navigate unauth user back to login page
    } finally {
      setIsLoading(false);
    }
  }

// control panel buttons
const controlPanel = (
  <div className='photo-entry-admin-control-panel'>
    <span className='photo-entry-admin-control-panel--1'>
      {/* edit */}
      <Button 
        customStyle={'control-panel-edit'}
        clicked={() => editPhotoEntryHandler(id)}
      > <Edit /> </Button>
      {/* view */}
      <Button 
        customStyle={'control-panel-edit'}
        clicked={() => {
          setID(id)
          toggleModalHandler(OPERATIONS.FULLSCREEN_VIEW) }}
      > <ViewPhoto height='100%' width='100%'/> </Button>
      {/* map */}
      <Button 
        customStyle={'control-panel-edit'}
        clicked={() => {
          setID(id)
          toggleModalHandler(OPERATIONS.MAP_VIEW) }}
      > <LocationMark height='100%' width='100%' /> </Button>  
    </span>
    <span className='photo-entry-admin-control-panel--2'> 
      <Button 
          customStyle={'control-panel-edit'}
          clicked={() => deletePhotoEntryHandler(id)} 
      > <Delete /> </Button>
    </span>
  </div>
)

const photoContent = (
  <div className='photo-entry-admin-content-container'>
    {/* TIMESTAMP */}
    <div className='photo-entry-admin-content photo-entry-admin-content--timestamp'> 
      <Timestamp dateCreation={createdAt} dateLastUpdate={updatedAt} />
    </div>
    <div className='photo-entry-admin-content'> 
      <div className='photo-entry-admin-content-label'> <span> ID </span> </div>
      <div className='photo-entry-admin-content-data'>   {id} </div>
   
    </div>
    <div className='photo-entry-admin-content photo-entry-admin-content--title'> 
      <div className='photo-entry-admin-content-label'> <span> Title </span> </div>
      <div className='photo-entry-admin-content-data'> {title} </div>
    </div>
    <div className='photo-entry-admin-content'> 
      <div className='photo-entry-admin-content-label'> <span> Captured </span> </div>
      <div className='photo-entry-admin-content-data'> {transformDate(captureDate, '-', '.')} </div>
    </div>
    <div className='photo-entry-admin-content'> 
      <div className='photo-entry-admin-content-label'> <span> GPS lat </span> </div>
      <div className='photo-entry-admin-content-data'> {gpsLatitude} </div>
    </div>
    <div className='photo-entry-admin-content'> 
      <div className='photo-entry-admin-content-label'> <span> GPS lon </span> </div>
      <div className='photo-entry-admin-content-data'> {gpsLongitude} </div>
    </div>
    <div className='photo-entry-admin-content'> 
      <div className='photo-entry-admin-content-label'> <span> Author </span> </div>
      <div className='photo-entry-admin-content-data'> {author} </div>
    </div>
    <div className='photo-entry-admin-content photo-entry-admin-content--description'> 
      <div className='photo-entry-admin-content-label photo-entry-admin-content-label--vertical'> <span> Description </span>  </div>
      <div className='photo-entry-admin-content-data photo-entry-admin-content-data--text-start photo-entry-admin-content-data--scroll-y'> {description} </div>
    </div>
  </div>
)
  return (
    <div className='photo-entry-admin-container'>
      {/* CONTROL PANEL */}
      {controlPanel}
      {/* CONTENT */}
      {photoContent}
    </div>
  )
}

export default React.memo(PhotoEntry);