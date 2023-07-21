// Admin mode photo entry control panel
import React from 'react'
import './PhotoEntries.css'
import '../Shared.css'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router'
import { useModalContext } from '../contexts/ToggleModalContext'
import { useStatusContext } from '../contexts/StatusContext';
import { useLoaderContext } from '../contexts/LoaderContext'
import { useThemeContext } from '../contexts/ThemeContext'
import { OPERATIONS } from '../../helper/dataStorage'
import { getSinglePhotoEntry, deletePhotoEntry } from '../../helper/axiosRequests';
import { STATUS_MESSAGES } from '../../helper/statusMessages';
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import useFetchPhotoEntries from '../hooks/useFetchPhotoEntries'
import Button from '../UI/Button';
import ControlPanelWrapper from '../ControlPanelWrapper'
import { Edit, ViewPhoto, LocationMark, Delete } from '../SVG/Icons'
import LoaderIcon from '../SVG/Loader'


export default function PhotoEntryControlPanel ({ collection, photoEntry }) {
  // CONSTANT
  const controlPanelIconColor = 'var(--color-accent)';
  
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

  return (
    <ControlPanelWrapper wrapperStyle='control-panel-photo-entry' heightPx={ 50 } >
      <span className='control-panel-photo-entry-group-1'>
        { /* edit */ }
        <Button 
          buttonStyle='button-control-panel-edit'
          title='edit photo entry'
          disabled={ isLoading.PHOTO_ENTRY_DELETE[id] || isLoading.PHOTO_ENTRY_EDIT[id] }
          clicked={ () => {
            editPhotoEntryHandler(id);
            setStatus(statusDefault);
          } }
        > { isLoading.PHOTO_ENTRY_EDIT[id] ? 
          <LoaderIcon width='70%' height='70%' stroke='var(--text-color--high-emphasis)' /> 
          : 
          <Edit height='25px' width='25px' fill={ controlPanelIconColor } /> } 
        </Button>
        { /* view */ }
        <Button 
          buttonStyle='button-control-panel-edit'
          title='view photo'
          clicked={ () => {
            setActivePhotoEntry(photoEntry); 
            toggleModalHandler(OPERATIONS.FULLSCREEN_VIEW) } }
        > <ViewPhoto height='25px' width='25px' fill={ controlPanelIconColor } /> </Button>
        { /* map */ }
        <Button 
          buttonStyle='button-control-panel-edit'
          title='view geographic location'
          disabled={ !gpsLatitude || !gpsLongitude }
          clicked={ () => {
            setActivePhotoEntry(photoEntry); 
            toggleModalHandler(OPERATIONS.MAP_VIEW) } }
        > <LocationMark height='25px' width='25px' fill={ controlPanelIconColor } /> </Button>  
      </span>
      <span className='control-panel-photo-entry-group-2'> 
        <Button 
          buttonStyle='button-control-panel-edit'
          title='delete photo entry'
          disabled={ isLoading.PHOTO_ENTRY_DELETE[id] || isLoading.PHOTO_ENTRY_EDIT[id] }
          clicked={ () => deletePhotoEntryHandler(id) } 
        > 
        { isLoading.PHOTO_ENTRY_DELETE[id] ? 
          <LoaderIcon width='70%' height='70%' stroke='var(--text-color--high-emphasis)' /> 
          : 
          <Delete height='25px' width='25px' stroke={ controlPanelIconColor } /> } 
        </Button>
      </span>
    </ControlPanelWrapper>
  )
}