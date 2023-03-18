// display all the photos with coordinates on maps
import React, { useState, useEffect } from 'react'
import './MapOverview.css'
import './Shared.css'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import {useFormContext} from './contexts/FormContext'
import {getAllPhotoEntries} from '../helper/axiosRequests'
import FitMarkersToBounds from './FitMarkersToBounds'
import useAxiosPrivate from './hooks/useAxiosPrivate';
import CustomPopup from './CustomPopup';
import {useNavigate, useLocation} from 'react-router';
import {useAuthContext} from './contexts/AuthenticationContext';
import {COLLECTIONS} from '../helper/dataStorage';

export default function MapOverview() {
  // ROUTE
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
  const {auth, setAuth} = useAuthContext();
  // HOOK 
  const axiosPrivate = useAxiosPrivate();
  // EFFECT
  useEffect(() => {
    if(!data) return;
    (async () => {
      try {
        const response = await getAllPhotoEntries(axiosPrivate, COLLECTIONS.GALLERY, auth.userID); // fetch entries, update state  
        setData(response.photoEntries); // store entries in state
        setMessage(response.message); // set message
      } catch(error) {
        navToPrevPage(); // navigate unauth user back to login page
        // setAuth({});
      }
    })() 
  }, [])
  useEffect(() => {
    if(!data) return;
    calculateStatistics(data);
  }, [data])
  
  // FUNCTIONS
  // collect all entries' coordinates from fetched data -> it is needed to calculate marker bounds 
  const collectMarkerCoordinates = (data) => {
    if(!data) return
    //transform data to array of arrays
    const markerCoordinates = data.map(entryCoordinate => {
      if(!entryCoordinate.gpsLatitude && !entryCoordinate.gpsLongitude) return
      return [[entryCoordinate.gpsLatitude, entryCoordinate.gpsLongitude]]
    })
    return markerCoordinates;
  } 
  // calculate statistics
  const calculateStatistics = (data) => {
    //calculated values
    if(!data) return
    let statTemp = {
      ...statisticsTemplate
    }
    let authors = []; // store unique authors (no duplicate values) 

    data.map((elem, i) => {
      // number of photos (full number of entries)
      statTemp['numberOfEntries'] += 1;
      if(elem?.gpsLatitude && elem?.gpsLongitude) {
        // places (entries only with lat-long coordinates)
        statTemp['numberOfPlaces'] += 1;
      }
      if(!authors.includes(elem.author)) {
        authors = [...authors, elem.author];
        statTemp['authors'] += 1;
      }
    })
    //store results in state
    setStatistics(statTemp);
  }
  // RENDERED ELEMENTS 
  const mapElement = (
  <MapContainer
    className='map-container'
    center={[0,0]} 
    zoom={12} 
    scrollWheelZoom={true}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <FitMarkersToBounds markerCoordinates={collectMarkerCoordinates(data)}/>
    { data?.map((marker) => {
        if(!marker.gpsLatitude && !marker.gpsLongitude) return
        return <Marker 
          position={[marker.gpsLatitude, marker.gpsLongitude] || [0,0]} 
          key={marker._id}
        > 
          <Popup> 
            <CustomPopup marker={marker} />
          </Popup>
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