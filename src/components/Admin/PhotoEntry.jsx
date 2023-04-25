// photo entry with control panel buttons
import React from 'react'
import './PhotoEntries.css'
import '../Shared.css'
import {transformDate} from '../../helper/dateUtilities'
import {useModalContext} from '../contexts/ToggleModalContext'
import {useFormContext} from '../contexts/FormContext'
import {useNavigate, useLocation} from 'react-router'
import {OPERATIONS} from '../../helper/dataStorage'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import Button from '../UI/Button';
import { getSinglePhotoEntry, deletePhotoEntry } from '../../helper/axiosRequests';
import {Edit, ViewPhoto, LocationMark, Delete} from '../SVG/ControlPanel'
import PhotoEntryContentElement from './PhotoEntryContentElement'
import ControlPanelWrapper from '../ControlPanelWrapper'
import useFetchPhotoEntries from '../hooks/useFetchPhotoEntries'
import { useLoaderContext } from '../contexts/LoaderContext'

const PhotoEntry = ({collection, photoEntry, imgFile, hideImageStyle}) => {
  // PROPS
  const {title, description, createdAt, captureDate, updatedAt, _id:id, gpsLatitude, gpsLongitude, author} = photoEntry ?? {};
  // CONTEXT
  const {setMessage} = useFormContext();
  const {toggleModalHandler, setActiveID, setID} = useModalContext();
  const {loaderToggleHandler} = useLoaderContext();
  // HOOKS
  const axiosPrivate = useAxiosPrivate();
  const {fetchHomePhotoEntries, fetchGalleryPhotoEntries} = useFetchPhotoEntries();
  
  // NAVIGATION & ROUTING
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const navToPrevPage = () => navigate('/login', { state: {from: location}, replace: true});
  // HANDLERS
  // delete and refetch photo entries
  const deletePhotoEntryHandler = async (id) => {
    try {
      loaderToggleHandler('PHOTO_ENTRY_MODAL', undefined, true);
      const responseDelete = await deletePhotoEntry(id, axiosPrivate, collection);
      collection === 'gallery' ? await fetchGalleryPhotoEntries(navToPrevPage) : await fetchHomePhotoEntries(navToPrevPage); 
      setMessage(responseDelete.message);
    } catch(error) {
      navToPrevPage(); // navigate unauth user back to login page
    } finally {
      loaderToggleHandler('PHOTO_ENTRY_MODAL', undefined, false);
    }
  }
  // fetch photo data (of the clicked id) to populate update photo entry modal 
  const editPhotoEntryHandler = async (id) => {
    try {
      loaderToggleHandler('PHOTO_ENTRY_MODAL', undefined, true);
      const response = await getSinglePhotoEntry(id, axiosPrivate, collection); // fetch entry data
      setActiveID(response.photoEntry); // set active entry
      if(response.success === false) {
        // setMessage(response.message);
        return;
      }
      toggleModalHandler(OPERATIONS.UPDATE_PHOTO); // open modal
    } catch(error) {
      navToPrevPage(); // navigate unauth user back to login page
    } finally {
      loaderToggleHandler('PHOTO_ENTRY_MODAL', undefined, false);
    }
  }
  // control panel buttons
  const controlPanel = (
    <ControlPanelWrapper wrapperStyle='control-panel-photo-entry' heightPx={50} backgroundColor='var(--bg-color--secondary)'>
      <span className='control-panel-photo-entry-group-1'>
        {/* edit */}
        <Button 
          buttonStyle='button-control-panel-edit'
          title='edit photo entry'
          clicked={() => {
            editPhotoEntryHandler(id);
            setMessage('');
          }}
        > <Edit height='80%' width='80%' fill='var(--bg-color--accent)'/> </Button>
        {/* view */}
        <Button 
          buttonStyle='button-control-panel-edit'
          title='view photo'
          clicked={() => {
            setID(id)
            toggleModalHandler(OPERATIONS.FULLSCREEN_VIEW) }}
        > <ViewPhoto height='80%' width='80%' fill='var(--bg-color--accent)'/> </Button>
        {/* map */}
        <Button 
          buttonStyle='button-control-panel-edit'
          title='view geographic location'
          clicked={() => {
            setID(id)
            toggleModalHandler(OPERATIONS.MAP_VIEW) }}
        > <LocationMark height='80%' width='80%' fill='var(--bg-color--accent)'/> </Button>  
      </span>
      <span className='control-panel-photo-entry-group-2'> 
        <Button 
          buttonStyle='button-control-panel-edit'
          title='delete photo entry'
          clicked={() => deletePhotoEntryHandler(id)} 
        > <Delete height='80%' width='80%' stroke='var(--bg-color--accent)'/> </Button>
      </span>
    </ControlPanelWrapper>
  )
  const photoContent = (
    <div className='photo-entry-admin-content-container'>
      {/* ID */}
      <PhotoEntryContentElement
        title='photo entry ID' 
        label='ID' 
        labelStyle='photo-entry-admin-content-data--border-top' 
        data={id} 
        dataStyle='photo-entry-admin-content-data--border-top' 
      />
      {/* Title */}
      <PhotoEntryContentElement
        title='photo title' 
        label='Title' 
        data={title} 
        dataPositionTreshold={40} 
      />
      {/* Author */}
      <PhotoEntryContentElement
        title='the person who captured the photo' 
        label='Author' data={author} 
        dataPositionTreshold={45} 
      />
      {/* Capture date */}
      <PhotoEntryContentElement
        title='time when photo was captured' 
        label='Captured' 
        data={transformDate(captureDate, '-', '.')} 
      />
      {/* GPS latitude */}
      <PhotoEntryContentElement
        title='geographic coordinate: latitude' 
        label='GPS lat' 
        data={gpsLatitude} 
      />
      {/* GPS longitude */}
      <PhotoEntryContentElement
        title='geographic coordinate: longitude' 
        label='GPS lon' 
        data={gpsLongitude} 
      />
      {/* Description */}
      <PhotoEntryContentElement
        title='a few words about the photo' 
        label='Description' 
        labelStyle='photo-entry-admin-content-label--vertical-text photo-entry-admin-content-label--border-bottom-0'
        data={description} 
        dataPositionTreshold={40} 
        contentStyle='photo-entry-admin-content--fill-remaining-height' 
        dataStyle='photo-entry-admin-content-data--description ' 
      />
      {/* TIMESTAMP */}
      <PhotoEntryContentElement
        title='photo entry related date' 
        contentStyle='photo-entry-admin-content--timestamp' 
        type='timestamp' 
        dateCreation={createdAt} 
        dateLastUpdate={updatedAt} 
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

export default React.memo(PhotoEntry); // NOTE: memo won't work here as long as each refetch will have a freshly signed img url