import React, { useEffect, useCallback, useState } from 'react';
import L from 'leaflet';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import "leaflet/dist/leaflet.css";
import '../Shared.css';
import './Map.css';
import { useFormContext } from '../contexts/FormContext';
import { getAllGalleryPhotoEntries } from '../../helper/axiosRequests';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router';
import { useAuthContext } from '../contexts/AuthenticationContext';
import PhotoStatistics from '../PhotoStatistics';
import Map from './Map';
import PhotoEntryModal from '../Modals/PhotoEntryModal';
import { useModalContext } from '../contexts/ToggleModalContext';
import { OPERATIONS, MODAL_TITLES } from '../../helper/dataStorage';
import PhotoInfo from '../Modals/PhotoInfo';
import FullScreenView from '../Modals/FullScreenView';
import Button from '../UI/Button';
import { useLoaderContext } from '../contexts/LoaderContext';

export default function MapOverview() {
  // ROUTING
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const navToPrevPage = useCallback(() => {
    navigate('/login', { state: {from: location}, replace: true});
  }, [navigate, location]);
  // CONTEXT
  const { auth } = useAuthContext();
  const { toggleModal } = useModalContext();
  const { data, setData } = useFormContext();
  const { isLoading, loaderToggleHandler } = useLoaderContext();
  // STATE
  const [activeButton, setActiveButton] = useState('gallery');
  // HANDLERS
  // fetch photo entry logic
  const fetchPhotoEntries = useCallback(async (type) => {
    try {
      loaderToggleHandler('MAP_FETCH_DATA', undefined, true);
      const response = await getAllGalleryPhotoEntries(axiosPrivate, auth.userID, type);
      setData(response.photoEntries);
    } catch(error) {
      navToPrevPage();
      setData({});
    } finally {
      loaderToggleHandler('MAP_FETCH_DATA', undefined, false);
    }
  }, [axiosPrivate, auth.userID, setData, navToPrevPage]);

  // fetch gallery handler
  const getGalleryPhotoHandler = useCallback(() => {
    setActiveButton('gallery');
    fetchPhotoEntries('all');
  }, [fetchPhotoEntries]);
  // fetch collection handler
  const getCollctionPhotosHandler = useCallback(() => {
    setActiveButton('collection');
    fetchPhotoEntries('own');
  }, [fetchPhotoEntries]);

  // EFFECT
  // fetch default data display: gallery
  useEffect(() => {
    fetchPhotoEntries('all');
  }, [fetchPhotoEntries]);

  return (
    <div className='shared-page-container shared-page-container--with-padding'>
      {data.length > 0 && 
        <> 
          {/* Header */}
          <h1> Map overview </h1>
          {/* Switch map content: gallery || user collection */}
          <div className='map-content-switch'> 
            <Button buttonStyle='button-map-content-switch' disabled={isLoading.MAP_FETCH_DATA || activeButton === 'gallery'} title='map display: gallery' clicked={getGalleryPhotoHandler} > Gallery </Button>
            <Button buttonStyle='button-map-content-switch' disabled={isLoading.MAP_FETCH_DATA || activeButton === 'collection'} title='map display: user collection' clicked={getCollctionPhotosHandler}> Collection </Button>
          </div>
          {/* Map container */}
          <Map mapData={data} />
          {/* Photo statisitics */}
          <PhotoStatistics/>
          {/* Modals */}
          { toggleModal[OPERATIONS.PHOTO_INFO_VIEW] && 
            <PhotoEntryModal 
              modalTitle={ MODAL_TITLES[OPERATIONS.PHOTO_INFO_VIEW] }
              modalContent={ <PhotoInfo displayPhotoView displayTimestamp/> } 
              contentStyle='shared-page-container--with-padding' 
              closeModal={ OPERATIONS.PHOTO_INFO_VIEW } 
            /> }
          { toggleModal[OPERATIONS.FULLSCREEN_VIEW] && 
            <PhotoEntryModal 
              modalTitle={ MODAL_TITLES[OPERATIONS.FULLSCREEN_VIEW] }
              modalContent={ <FullScreenView/> } 
              contentStyle='shared-modal-content--centered' 
              closeModal={ OPERATIONS.FULLSCREEN_VIEW } 
              returnToModal={ OPERATIONS.PHOTO_INFO_VIEW }
            /> }
        </>
      }
    </div>
  )
}