// display all the images with coordinates on maps
import React, { useEffect } from 'react'
import './MapOverview.css'
import './Shared.css'
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet'
import L from 'leaflet'
import "leaflet/dist/leaflet.css";
import { useFormContext } from './contexts/FormContext'

//set map view to center so every markers are visible
function FitMarkersToBounds({ bounds }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds);
  }, [])
}

export default function MapOverview() {
  const {data, setFormData} = useFormContext();
  useEffect(() => {
    console.log(data);
  }, [data])
  
  const m1 = [45.42, 23.3541];
  const m2 = [45.56, 23.3841];
  const m3 = [47.13, 24.65];
  const m4 = [42.46, 20.21];
  const m5 = [43.16, 22.5];
  const m6 = [44.06, 21.0];
  const m7 = [47.13, 26.30];
  const markersArray = [m1,m2,m3,m4,m5,m6,m7];
  const markerBoundaries = L.latLngBounds(markersArray); // finds the NEmost and SWmost values of the passed coordinates -> creates a frame/boundary based on this data
  
  const mapElement = (
  <MapContainer
    className='map-container'
    center={m1} 
    zoom={12} 
    scrollWheelZoom={true}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <FitMarkersToBounds bounds={[markerBoundaries]}/>
    { markersArray.map((marker, index) => {
        return <Marker 
          position={[marker[0], marker[1]] || [0,0]} 
          key={index}
        > <Popup>  A pretty CSS3 popup. <br /> Easily customizable. </Popup>
        </Marker>
      }) 
    }
  </MapContainer>)

  const statistics = (
    <div>
      <p> Statistics </p>
    </div>
  )

return (
  // <ViewMap />
  <div className='shared-page-container'>
    <p> Map overview </p>
    {mapElement}
    {statistics}
  </div>
  )
}