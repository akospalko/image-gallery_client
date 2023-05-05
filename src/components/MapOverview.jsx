// display map with photo entry locations as markers
import React, { useEffect } from 'react';
import { MapContainer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import "leaflet/dist/leaflet.css";
import './MapOverview.css'
import './Shared.css'
import {useFormContext} from './contexts/FormContext'
import {getAllGalleryPhotoEntries} from '../helper/axiosRequests'
import FitMarkersToBounds from './FitMarkersToBounds'
import useAxiosPrivate from './hooks/useAxiosPrivate';
import CustomPopup from './CustomPopup';
import {useNavigate, useLocation} from 'react-router';
import {useAuthContext} from './contexts/AuthenticationContext';
import BaseMapLayers from './BaseMapLayers';
import PhotoStatistics from './PhotoStatistics';
import FullscreenControl from './FullScreenControl';
import {LocationIcon} from './SVG/Icons';
import ReactDOMServer from 'react-dom/server';

export default function MapOverview() {
  // ROUTING
    const navigate = useNavigate(); 
    const location = useLocation(); 
    const navToPrevPage = () => navigate('/login', { state: {from: location}, replace: true});
  // STATE
  // CONTEXT
  const {data, setData} = useFormContext();
  const {auth} = useAuthContext();
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

  // ELEMENTS
  // custom svg marker
  const customMarker = L.divIcon({
    className: 'leaflet-svg-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    html: ReactDOMServer.renderToStaticMarkup(<LocationIcon/>),
  });
  // map
  const mapElement = (
  <MapContainer
    className='map-container'
    center={[0,0]} 
    zoom={12} 
    scrollWheelZoom={true}
  >
    {/* Layer control for base map selection */}
    <BaseMapLayers />
    {/* Full screen control */}
    <FullscreenControl />
    {/* Place all markers in view */}
    <FitMarkersToBounds /> 
    <MarkerClusterGroup chunkedLoading>
      { data?.map((marker) => {
        if(!marker.gpsLatitude || !marker.gpsLongitude) return
        console.log(data);
        return <Marker 
          key={marker._id}
          position={[marker.gpsLatitude, marker.gpsLongitude] || [0,0]} 
          icon={customMarker}
          >
          {/* <Popup> <CustomPopup marker={marker} />  </Popup> */}
        </Marker>
      })}
    </MarkerClusterGroup>
  </MapContainer>)


return (
  <div className='shared-page-container'>
    {data && data.length > 0 && 
      <> 
        {/* Map  */}
        {mapElement}
        {/* Photo statistics */}
        <PhotoStatistics/>
      </>
    }
  </div>
  )
}