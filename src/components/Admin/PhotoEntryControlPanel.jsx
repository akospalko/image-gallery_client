// Admin mode photo entry control panel
import React from 'react';
import './PhotoEntryControlPanel.css';
import '../Shared.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router';
import { useModalContext } from '../contexts/ToggleModalContext';
import { useStatusContext } from '../contexts/StatusContext';
import { useLoaderContext } from '../contexts/LoaderContext';
import { useThemeContext } from '../contexts/ThemeContext';
import { OPERATIONS } from '../../helper/dataStorage';
import { getSinglePhotoEntry, deletePhotoEntry } from '../../helper/axiosRequests';
import { STATUS_MESSAGES, statusDefault } from '../../helper/statusMessages';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useFetchPhotoEntries from '../hooks/useFetchPhotoEntries';
import Button from '../UI/Button';
import { Edit, ViewPhoto, LocationMark, Delete } from '../SVG/Icons';
import LoaderIcon from '../SVG/Loader';

export default function PhotoEntryControlPanel ({ collection, photoEntry }) {
  // CONSTANTS
  const iconColor = 'var(--text-color--high-emphasis)';
  const loaderIconSize = '25px';
  const iconSize = '25px';

  // PROPS
  const { _id:id, gpsLatitude, gpsLongitude } = photoEntry ?? {};
  
  // CONTEXTS
  const { setStatus } = useStatusContext();
  const { toggleModalHandler, setActivePhotoEntry } = useModalContext();
  const { isLoading, loaderToggleHandler } = useLoaderContext();
  const { theme } = useThemeContext();
  
  // HOOKS
  const axiosPrivate = useAxiosPrivate();
  const { fetchHomePhotoEntries, fetchGalleryPhotoEntries } = useFetchPhotoEntries();
  
  // NAVIGATION & ROUTING
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const navToPrevPage = () => navigate('/login', { state: { from: location }, replace: true});
  
  // HANDLERS
  // delete and refetch photo entries
  const deletePhotoEntryHandler = async (id) => {
    try {
      loaderToggleHandler('PHOTO_ENTRY_DELETE', id, true);
      const responseDelete = await deletePhotoEntry(id, axiosPrivate, collection);
      const { message } = responseDelete ?? {};
        toast(`${ message }`, { // send toast
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
      setStatus({ ...statusDefault, message: STATUS_MESSAGES.ERROR_REQUEST } ); 
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
      const { success, message, photoEntry } = response ?? {};
      if(success === false) {
        toast(`${ message }`, { // send toast
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
      setStatus({ ...statusDefault, message: STATUS_MESSAGES.ERROR_REQUEST } ); 
      navToPrevPage(); // navigate unauth user back to login page
    } finally {
      loaderToggleHandler('PHOTO_ENTRY_EDIT', id, false);
    }
  }

  // ELEMENTS
  // Displayed buttons
  const controlPanelButtons = (
    <>
      { /* edit */ }
      <Button 
        id='edit'
        buttonStyle='button-control-panel-edit'
        title='edit photo entry'
        disabled={ isLoading.PHOTO_ENTRY_DELETE[id] || isLoading.PHOTO_ENTRY_EDIT[id] }
        clicked={ () => {
          editPhotoEntryHandler(id);
          setStatus(statusDefault);
        } }
      > { isLoading.PHOTO_ENTRY_EDIT[id] ? 
        <LoaderIcon width={ loaderIconSize } height={ loaderIconSize } stroke='var(--text-color--high-emphasis)' /> 
        : 
        <Edit height={ iconSize } width={ iconSize } fill={ iconColor } /> } 
      </Button>
      { /* view */ }
      <Button 
        id='view'
        buttonStyle='button-control-panel-edit'
        title='view photo'
        clicked={ () => {
          setActivePhotoEntry(photoEntry); 
          toggleModalHandler(OPERATIONS.FULLSCREEN_VIEW) } }
      > <ViewPhoto height={ iconSize } width={ iconSize } fill={ iconColor } /> </Button>
      { /* map */ }
      <Button
        id='map' 
        buttonStyle='button-control-panel-edit'
        title='view geographic location'
        disabled={ !gpsLatitude || !gpsLongitude }
        clicked={ () => {
          setActivePhotoEntry(photoEntry); 
          toggleModalHandler(OPERATIONS.MAP_VIEW) } }
      > <LocationMark height={ iconSize } width={ iconSize } fill={ iconColor } /> </Button>  
      { /* delete */ }
      <Button 
        id='delete' 
        buttonStyle='button-control-panel-edit'
        title='delete photo entry'
        disabled={ isLoading.PHOTO_ENTRY_DELETE[id] || isLoading.PHOTO_ENTRY_EDIT[id] }
        clicked={ () => deletePhotoEntryHandler(id) } 
      > 
      { isLoading.PHOTO_ENTRY_DELETE[id] ? 
        <LoaderIcon width={ loaderIconSize } height={ loaderIconSize } stroke={ iconColor } /> 
        : 
        <Delete height={ iconSize } width={ iconSize } stroke={ iconColor } /> } 
      </Button>
    </>
  )

  return (
    <div className='pe-admin-control-panel'>
       { controlPanelButtons }
    </div>
  )
}