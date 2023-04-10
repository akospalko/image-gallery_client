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
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import Button from '../UI/Button';
import { getAllGalleryPhotoEntries, getSinglePhotoEntry, deletePhotoEntry } from '../../helper/axiosRequests';
import {Edit, ViewPhoto, LocationMark, Delete} from '../SVG/ControlPanel'
import PhotoEntryContentElement from './PhotoEntryContentElement'
import ControlPanelWrapper from '../ControlPanelWrapper'

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
      setIsLoading(true);
      const responseDelete = await deletePhotoEntry(id, axiosPrivate, collection);
      const responseGetAll = await getAllGalleryPhotoEntries(axiosPrivate, auth.userID, 'all'); // fetch entries, update state  
      setData(responseGetAll.photoEntries); // store entries in state
    } catch(error) {
      navToPrevPage(); // navigate unauth user back to login page
    } finally {
      setIsLoading(false);
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
    <ControlPanelWrapper wrapperStyle='control-panel-photo-entry' heightPx={50} backgroundColor='rgb(244, 164, 60)'>
      <span className='control-panel-photo-entry-group-1'>
        {/* edit */}
        <Button 
          buttonStyle='button-control-panel-edit'
          clicked={() => editPhotoEntryHandler(id)}
        > <Edit /> </Button>
        {/* view */}
        <Button 
          buttonStyle='button-control-panel-edit'
          clicked={() => {
            setID(id)
            toggleModalHandler(OPERATIONS.FULLSCREEN_VIEW) }}
        > <ViewPhoto height='100%' width='100%'/> </Button>
        {/* map */}
        <Button 
          buttonStyle='button-control-panel-edit'
          clicked={() => {
            setID(id)
            toggleModalHandler(OPERATIONS.MAP_VIEW) }}
        > <LocationMark height='100%' width='100%' /> </Button>  
      </span>
      <span className='control-panel-photo-entry-group-2'> 
        <Button 
          buttonStyle='button-control-panel-edit'
          clicked={() => deletePhotoEntryHandler(id)} 
        > <Delete /> </Button>
      </span>
    </ControlPanelWrapper>
  )

  const photoContent = (
    <div className='photo-entry-admin-content-container'>
      {/* TIMESTAMP */}
      <PhotoEntryContentElement 
        contentStyle='photo-entry-admin-content--timestamp' 
        type='timestamp' 
        dateCreation={createdAt} 
        dateLastUpdate={updatedAt} 
      />
      {/* ID */}
      <PhotoEntryContentElement 
        label='ID' 
        data={id} 
        dataStyle='photo-entry-admin-content-data--border-top' labelStyle='photo-entry-admin-content-data--border-top' 
      />
      {/* Title */}
      <PhotoEntryContentElement 
        label='Title' data={title} 
        dataPositionTreshold={40} 
        dataStyle='photo-entry-admin-content-data--border-top' labelStyle='photo-entry-admin-content-data--border-top' />
      {/* Author */}
      <PhotoEntryContentElement 
        label='Author' data={author} 
        dataPositionTreshold={45} 
      />
      {/* Capture date */}
      <PhotoEntryContentElement 
        label='Captured' 
        data={transformDate(captureDate, '-', '.')} 
      />
      {/* GPS latitude */}
      <PhotoEntryContentElement 
        label='GPS lat' 
        data={gpsLatitude} 
      />
      {/* GPS longitude */}
      <PhotoEntryContentElement 
        label='GPS lon' 
        data={gpsLongitude} 
      />
      {/* Description */}
      <PhotoEntryContentElement 
        label='Description' 
        data={description} 
        dataPositionTreshold={40} contentStyle='photo-entry-admin-content--fill-remaining-height' dataStyle='photo-entry-admin-content-data--description' labelStyle='photo-entry-admin-content-label--vertical-text photo-entry-admin-content-label--border-bottom-0'
      />
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