// display all the images with coordinates on maps
import React, { useState, useEffect } from 'react'
import './MapOverview.css'
import './Shared.css'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import {useFormContext} from './contexts/FormContext'
import FitMarkersToBounds from './FitMarkersToBounds'
import {refetchImageEntries} from '../helper/axiosRequests'
import CustomPopup from './CustomPopup';

export default function MapOverview() {
  // STATE
  // template
  const statisticsTemplate = {
    numberOfEntries: 0, // images w + w/o coordinates
    numberOfPlaces: 0, // images w coordinates
    authors: 0
  };
  const [statistics, setStatistics] = useState(statisticsTemplate);
  // CONTEXT
  const {data, setData} = useFormContext();
  // EFFECT
  useEffect(() => {
    if(!data) return;
    (async () => {
      await refetchImageEntries(setData); // map is not updated automatically when we modify data    
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
    { data.map((marker) => {
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
      <p> Number of Images: {statistics.numberOfEntries} </p>
      <p> Number of Places: {statistics.numberOfPlaces} </p>
    </div>
  )

return (
  // <ViewMap />
  <div className='shared-page-container'>
    <p> Map overview </p>
    {data && data.length > 0 && 
      <> 
        {mapElement}
        {statisticsElement}  
      </>
    }
  </div>
  )
}