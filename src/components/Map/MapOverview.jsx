
// Page to display gallery / collection geolocated photos on map  
import React, { useEffect, useCallback, useState } from 'react';
import L from 'leaflet';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import "leaflet/dist/leaflet.css";
import '../Shared.css';
import './Map.css';
import { useNavigate, useLocation } from 'react-router';
import Map from './Map';
import { useAuthContext } from '../contexts/AuthenticationContext';
import { useModalContext } from '../contexts/ToggleModalContext';
import { useLoaderContext } from '../contexts/LoaderContext';
import { useDataContext } from '../contexts/DataContext';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useSetUpModal from '../hooks/useSetUpModal';
import { getAllGalleryPhotoEntries } from '../../helper/axiosRequests';
import { CONSTANT_VALUES } from '../../helper/constantValues';
import Button from '../UI/Button';

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
  const { mapData, setMapData } = useDataContext();
  const { isLoading, loaderToggleHandler } = useLoaderContext();
  
  // STATE
  const [activeButton, setActiveButton] = useState('gallery');
  
  // HOOK
  const { photoViewWithReturnButtonModal, infoViewWithPhotoDisplayModal } = useSetUpModal(toggleModal);

  // HANDLERS
  // Fetch photo entry logic
  const fetchPhotoEntries = useCallback(async (type) => {
    try {
      loaderToggleHandler('MAP_FETCH_DATA', undefined, true);
      const response = await getAllGalleryPhotoEntries(axiosPrivate, auth.userID, type);
      setMapData(response.photoEntries);
    } catch(error) {
      navToPrevPage();
      setData({});
    } finally {
      loaderToggleHandler('MAP_FETCH_DATA', undefined, false);
    }
  }, [axiosPrivate, auth.userID, setMapData, navToPrevPage]);

  // Fetch gallery handler
  const getGalleryPhotoHandler = useCallback(() => {
    setActiveButton('gallery');
    fetchPhotoEntries('all');
  }, [ fetchPhotoEntries ]);
  // Fetch collection handler
  const getCollctionPhotosHandler = useCallback(() => {
    setActiveButton('collection');
    fetchPhotoEntries('own');
  }, [ fetchPhotoEntries ]);

  // EFFECT
  // Fetch default data display: gallery
  useEffect(() => {
    fetchPhotoEntries('all');
  }, [ fetchPhotoEntries ]);

  // ELEMENTS
  // Switch buton style
  const mapContentStyle = (activeContent) => {
    // activeContent: 'gallery' | 'data' - map active content switch 
    return typeof activeContent === 'string' && `button-map-content-switch ${ activeButton === activeContent && 'button-map-content-switch--active' }`
  } 
  
  // Map content switch buttons 
  const mapContentSwitch = (
    <div className='map-overview-content-switch'> 
      <Button 
        buttonStyle={ mapContentStyle('gallery') } 
        disabled={ isLoading.MAP_FETCH_DATA || activeButton === 'gallery' } 
        title='map display: gallery' 
        clicked={ getGalleryPhotoHandler } 
      > <span className='map-content-switch-button-text'> { CONSTANT_VALUES.BUTTON_GALLERY }   </span> </Button>
      <Button 
        buttonStyle={ mapContentStyle('collection') } 
        disabled={ isLoading.MAP_FETCH_DATA || activeButton === 'collection' } 
        title='map display: user collection' 
        clicked={ getCollctionPhotosHandler }
      > <span className='map-content-switch-button-text'> { CONSTANT_VALUES.BUTTON_COLLECTION } </span> </Button>
    </div>
  )

  return (
    <div className='shared-page-container shared-page-container--centered-vertically'>
      <> 
        { /* Header */ }
        <div className='shared-header-wrapper'>
          <h1> { CONSTANT_VALUES.TITLE_MAP_OVERVIEW } </h1>
        </div>
        { /* Instruction */ }
        <div className='map-overview-instruction'>
          <h3> { CONSTANT_VALUES.SUBTITLE_MAP_OVERVIEW_CTA } </h3>
        </div>
        { /* Wrap switch - map container, used for easier layout positioning */ }
        <div className='map-wrapper--map-overview'>
          { /* switch map content: gallery || user collection */ }
          { mapContentSwitch }
          { /* map container */ }
          <Map className='map-container--overview' mapData={ mapData?.length > 0 && mapData } />
        </div>
        {/* Modals */}
        { photoViewWithReturnButtonModal }
        { infoViewWithPhotoDisplayModal }
      </>
    </div>
  )
}