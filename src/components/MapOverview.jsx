// TODO: outsource STATE template
// display all the photos with coordinates on maps
import React, { useState, useEffect } from 'react'
import {MapContainer, TileLayer, LayersControl, Marker, Popup} from 'react-leaflet'
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


export default function MapOverview() {
  // ROUTING
    const navigate = useNavigate(); 
    const location = useLocation(); 
    const navToPrevPage = () => navigate('/login', { state: {from: location}, replace: true});
  // STATE
  // template
  const statisticsTemplate = {
    numberOfEntries: 0, // photos w + w/o coordinates
    numberOfPlaces: 0, // photos w coordinates
    authors: 0
  };
  const [statistics, setStatistics] = useState(statisticsTemplate);
  // CONTEXT
  const {data, setData, setMessage} = useFormContext();
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
  // EFFECTS
  // calculate statistics on each state change
  useEffect(() => {
    if(!data) return;
    calculateStatistics(data);
    return () => {setStatistics(statisticsTemplate)} 
  }, [data])
  
  // FUNCTIONS
  // collect all entries' coordinates: used for calculating marker bounds 
  const collectMarkerCoordinates = (data) => {
    if(!data) return
    // transform data to array of arrays
    const markerCoordinates = data.map(entryCoordinate => {
      if(!entryCoordinate.gpsLatitude || !entryCoordinate.gpsLongitude) return;
      return [[entryCoordinate.gpsLatitude, entryCoordinate.gpsLongitude]]
    })
    return markerCoordinates;
  } 
  // calculate statistics, update state with new values
  const calculateStatistics = (data) => {
    if(!data) return
    setStatistics(prev => {
      let statTemp = { ...prev } // create state copy
      let authors = []; // store unique authors (no duplicate values) 
      data.map((elem, i) => {
        statTemp['numberOfEntries']++; // calc photos: total No. entries 
        if(elem?.gpsLatitude && elem?.gpsLongitude) {
          statTemp['numberOfPlaces']++; // calc places: entries with lat-long coord.s 
        }
        if(!authors.includes(elem.author)) { // calc authors
          authors = [...authors, elem.author];
          statTemp['authors']++;
        }
      })
      return statTemp;
    });
  }
  // RENDERED ELEMENTS 
  const mapElement = (
  <MapContainer
    className='map-container'
    center={[0,0]} 
    zoom={12} 
    scrollWheelZoom={true}
  >
    {/* Layer control for base map selection */}
    <BaseMapLayers />
    {/* place all markers in view */}
    <FitMarkersToBounds markerCoordinates={collectMarkerCoordinates(data)}/>
    { data?.map((marker) => {
        if(!marker.gpsLatitude || !marker.gpsLongitude) return
        return <Marker 
          position={[marker.gpsLatitude, marker.gpsLongitude] || [0,0]} 
          key={marker._id}
        > <Popup> <CustomPopup marker={marker} />  </Popup>
      </Marker>
    })}
  </MapContainer>)

  const statisticsElement = (
    <div>
      <p> Authors: {statistics.authors} </p>
      <p> Number of Photos: {statistics.numberOfEntries} </p>
      <p> Number of Places: {statistics.numberOfPlaces} </p>
    </div>
  )

return (
  <div className='shared-page-container'>
    {data && data.length > 0 && 
      <> 
        <p> Map overview </p>
        {mapElement}
        {statisticsElement}  
      </>
    }
  </div>
  )
}