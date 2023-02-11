import React, {useState, useEffect} from 'react'
import './ViewMap.css'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { useFormContext } from './contexts/FormContext'
import { useModalContext } from './contexts/ToggleModalContext'
import Button from './UI/Button'

export default function ViewMap() {
  // CONTEXT
  const {toggleModalHandler, id} = useModalContext();
  const {data, setFormData} = useFormContext();
  // STATE
  const [gpsCoordinates, setGPSCoordinates] = useState({gpsLatitude: null, gpsLongitude: null}); 
  // EFFECT
  // filter out imageURL for the current entry with the help of id (from modal context) 
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
    <div className='view-image-button'> 
      <Button 
        clicked={() => {
          setFormData(undefined);
          toggleModalHandler('viewMap')
        }}
        customStyle='view-image-close'> X 
      </Button>
    </div>
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
      <div className='view-image-button'> 
        <Button 
          clicked={() => {
            setFormData(undefined);
            toggleModalHandler('viewMap')
          }}
          customStyle='view-image-close'> X 
        </Button>
      </div>
      <p> No geolocation for this entry</p>
  </div>
  )

  return (
    <> 
      {gpsCoordinates.gpsLatitude && gpsCoordinates.gpsLongitude ? mapElement : displayNoGPS}
    </>
  )
}
