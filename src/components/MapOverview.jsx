// display map with photo entry locations as markers
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import "leaflet/dist/leaflet.css";
import './MapOverview.css'
import './Shared.css'
import {useFormContext} from './contexts/FormContext'
import {getAllGalleryPhotoEntries} from '../helper/axiosRequests'
import useAxiosPrivate from './hooks/useAxiosPrivate';
import {useNavigate, useLocation} from 'react-router';
import {useAuthContext} from './contexts/AuthenticationContext';
import PhotoStatistics from './PhotoStatistics';
import Map from './Map/Map';
import PhotoEntryModal from './Admin/PhotoEntryModal';
import { useModalContext } from './contexts/ToggleModalContext';
import { OPERATIONS, MODAL_TITLES } from '../helper/dataStorage';
import PhotoInfo from './Modals/PhotoInfo';
import FullScreenView from './Modals/FullScreenView';

export default function MapOverview() {
  // ROUTING
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const navToPrevPage = () => navigate('/login', { state: {from: location}, replace: true});
  // STATE
  // CONTEXT
  const {data, setData} = useFormContext();
  const {auth} = useAuthContext();
  const {toggleModal} = useModalContext();
  // HOOK 
  const axiosPrivate = useAxiosPrivate();
  // EFFECT
  // fetch photo entries, update state
  useEffect(() => {
    if(!data) return;
    (async () => {
      try {
        const response = await getAllGalleryPhotoEntries(axiosPrivate, auth.userID, 'all'); // fetch entries, update state  
        setData(response.photoEntries); // store entries in state
      } catch(error) {
        navToPrevPage(); // navigate unauth user back to login page
        // setAuth({});
      }
    })() 
  }, [])

  return (
    <div className='shared-page-container shared-page-container--with-padding'>
      {data && data.length > 0 && 
        <> 
          {/* Map */}
          <Map mapData={data} />
          {/* Photo statistics */}
          <PhotoStatistics/>
          {/* Modals */}
          { toggleModal.PHOTO_INFO_VIEW && 
            <PhotoEntryModal 
              modalTitle={ MODAL_TITLES[OPERATIONS.PHOTO_INFO_VIEW] }
              modalContent={ <PhotoInfo/> } 
              contentStyle='shared-page-container--with-padding' 
              closeModal={ OPERATIONS.PHOTO_INFO_VIEW } 
            /> }
          { toggleModal.FULLSCREEN_VIEW && 
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