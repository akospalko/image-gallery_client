// TODO: reusable PhotoEntryContentElement 
// Admin mode photo entry: control panel & photo content 
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
import {Edit, ViewPhoto, LocationMark, Delete} from '../SVG/Icons'
import PhotoEntryContentElement from '../PhotoEntryContentElement'
import ControlPanelWrapper from '../ControlPanelWrapper'
import useFetchPhotoEntries from '../hooks/useFetchPhotoEntries'
import { useLoaderContext } from '../contexts/LoaderContext'
import LoaderIcon from '../SVG/Loader'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useThemeContext } from '../contexts/ThemeContext'
import Timestamp from '../Timestamp'

const PhotoEntry = ({collection, photoEntry}) => {
  // PROPS
  const {title, description, createdAt, captureDate, updatedAt, _id:id, gpsLatitude, gpsLongitude, author} = photoEntry ?? {};
  // CONTEXT
  const {setMessage} = useFormContext();
  const {toggleModalHandler, setActivePhotoEntry} = useModalContext();
  const {isLoading, loaderToggleHandler} = useLoaderContext();
  const {theme} = useThemeContext();
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
      loaderToggleHandler('PHOTO_ENTRY_DELETE', id, true);
      const responseDelete = await deletePhotoEntry(id, axiosPrivate, collection);
      const {success, message, photoEntry } = responseDelete ?? {};
        toast(`${message}`, { // send toast
          className: "shared-toast",
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: theme
        });
        collection === 'gallery' ? await fetchGalleryPhotoEntries(navToPrevPage) : await fetchHomePhotoEntries(navToPrevPage); 
    } catch(error) {
      setMessage('Error. Try again later!'); 
      navToPrevPage(); // navigate unauth user back to login page
    } finally {
      loaderToggleHandler('PHOTO_ENTRY_DELETE', id, false);
    }
  }
  // fetch photo data (of the clicked id) to populate update photo entry modal 
  const editPhotoEntryHandler = async (id) => {
    try {
      loaderToggleHandler('PHOTO_ENTRY_EDIT', id, true);
      const response = await getSinglePhotoEntry(id, axiosPrivate, collection); // fetch entry data
      const {success, message, photoEntry } = response ?? {};
      if(success === false) {
        toast(`${message}`, { // send toast
          className: "shared-toast",
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: theme,
        });
      };
      setActivePhotoEntry(photoEntry); // set active entry
      toggleModalHandler(OPERATIONS.UPDATE_PHOTO); // open modal
    } catch(error) {
      setMessage('Error. Try again later!'); 
      navToPrevPage(); // navigate unauth user back to login page
    } finally {
      loaderToggleHandler('PHOTO_ENTRY_EDIT', id, false);
    }
  }
  // ELEMENTS
  // control panel buttons
  const controlPanel = (
    <ControlPanelWrapper wrapperStyle='control-panel-photo-entry' heightPx={50} backgroundColor='var(--bg-color--secondary)'>
      <span className='control-panel-photo-entry-group-1'>
        {/* edit */}
        <Button 
          buttonStyle='button-control-panel-edit'
          title='edit photo entry'
          disabled={isLoading.PHOTO_ENTRY_DELETE[id] || isLoading.PHOTO_ENTRY_EDIT[id]}
          clicked={() => {
            editPhotoEntryHandler(id);
            setMessage('');
          }}
        > {isLoading.PHOTO_ENTRY_EDIT[id] ? 
          <LoaderIcon width='70%' height='70%' stroke='var(--text-color--high-emphasis)'/> 
          : 
          <Edit height='80%' width='80%' fill='var(--bg-color--accent)'/> } 
        </Button>
        {/* view */}
        <Button 
          buttonStyle='button-control-panel-edit'
          title='view photo'
          clicked={() => {
            setActivePhotoEntry(photoEntry); 
            toggleModalHandler(OPERATIONS.FULLSCREEN_VIEW) }}
        > <ViewPhoto height='80%' width='80%' fill='var(--bg-color--accent)'/> </Button>
        {/* map */}
        <Button 
          buttonStyle='button-control-panel-edit'
          title='view geographic location'
          disabled={!gpsLatitude || !gpsLongitude}
          clicked={() => {
            setActivePhotoEntry(photoEntry); 
            toggleModalHandler(OPERATIONS.MAP_VIEW) }}
        > <LocationMark height='80%' width='80%' fill='var(--bg-color--accent)'/> </Button>  
      </span>
      <span className='control-panel-photo-entry-group-2'> 
        <Button 
          buttonStyle='button-control-panel-edit'
          title='delete photo entry'
          disabled={isLoading.PHOTO_ENTRY_DELETE[id] || isLoading.PHOTO_ENTRY_EDIT[id]}
          clicked={() => deletePhotoEntryHandler(id)} 
        > 
        {isLoading.PHOTO_ENTRY_DELETE[id] ? 
          <LoaderIcon width='70%' height='70%' stroke='var(--text-color--high-emphasis)'/> 
          : 
          <Delete height='80%' width='80%' stroke='var(--bg-color--accent)'/> } 
        </Button>
      </span>
    </ControlPanelWrapper>
  )
  const photoContent = (
    <>
      {/* ID */}
      <PhotoEntryContentElement
        title='photo entry ID' 
        label='ID' 
        data={id} 
        labelStyle='photo-entry-content--border-right' 
        />
      {/* Title */}
      <PhotoEntryContentElement
        title='photo title' 
        label='Title' 
        data={title} 
        dataPositionTreshold={40} 
        labelStyle='photo-entry-content--border-right'
        />
      {/* Author */}
      <PhotoEntryContentElement
        title='the person who captured the photo' 
        label='Author' data={author} 
        dataPositionTreshold={45} 
        labelStyle='photo-entry-content--border-right'
      />
      {/* Capture date */}
      <PhotoEntryContentElement
        title='time when photo was captured' 
        label='Captured' 
        data={transformDate(captureDate, '-', '.')} 
        labelStyle='photo-entry-content--border-right' 
      />
      {/* GPS latitude */}
      <PhotoEntryContentElement
        title='geographic coordinate: latitude' 
        label='GPS lat' 
        data={gpsLatitude} 
        labelStyle='photo-entry-content--border-right' 
      />
      {/* GPS longitude */}
      <PhotoEntryContentElement
        title='geographic coordinate: longitude' 
        label='GPS lon' 
        data={gpsLongitude} 
        labelStyle='photo-entry-content--border-right' 
      />
      {/* Description */}
      <PhotoEntryContentElement
        title='a few words about the photo' 
        label='Description' 
        data={description} 
        dataPositionTreshold={40} 
        labelStyle='photo-entry-content-label--vertical-text photo-entry-content--border-bottom photo-entry-content--border-right'
        recordStyle='_photo-entry-content-record--description' 
        dataStyle='_photo-entry-content-data--description' 
      />
      <Timestamp dateCreation={createdAt} dateLastUpdate={updatedAt}/>
    </>
  )

  return (
    <div className='_photo-entry-container _photo-entry--admin'>
      {/* CONTROL PANEL */}
      {controlPanel}
      {/* CONTENT */}
      <div className='_photo-entry-content'>
        {photoContent}
      </div>
    </div>
  )
}

export default React.memo(PhotoEntry); // NOTE: memo won't work here as long as each refetch will have a freshly signed img url