import React, {useState, useEffect} from 'react'
import './MapView.css'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import {useFormContext} from '../contexts/FormContext'
import {useModalContext} from '../contexts/ToggleModalContext'

export default function MapView() {
  // CONTEXT
  const {id} = useModalContext();
  const {data} = useFormContext();
  // STATE
  const [gpsCoordinates, setGPSCoordinates] = useState({gpsLatitude: null, gpsLongitude: null}); 
  // EFFECT
  // filter out photoURL for the current entry with the help of id (from modal context) 
  useEffect(() => {
    if(!data) return;
    const filtered = data.filter(elem => elem._id === id);
    setGPSCoordinates(prev => {
     return {...prev, gpsLatitude: filtered[0].gpsLatitude , gpsLongitude: filtered[0].gpsLongitude}
    });
  }, [data, id, setGPSCoordinates])
  
  let mapElement = (
    <MapContainer
      className='view-map-container'
      center={[gpsCoordinates.gpsLatitude, gpsCoordinates.gpsLongitude]} 
      zoom={12} 
      scrollWheelZoom={true}
    >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[gpsCoordinates.gpsLatitude, gpsCoordinates.gpsLongitude]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
  )
  // displayed element if no gps is provided
  let displayNoGPS = (
    <div className='view-map-container'>
      <p> No geolocation for this entry</p>
  </div>
  )

  return (
    <> 
      {gpsCoordinates.gpsLatitude && gpsCoordinates.gpsLongitude ? mapElement : displayNoGPS}
    </>
  )
}
