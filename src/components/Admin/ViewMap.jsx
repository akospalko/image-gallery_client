import React from 'react'
import './ViewMap.css'
import { MapContainer, TileLayer, Marker, Popup, useMap  } from 'react-leaflet'
import "leaflet/dist/leaflet.css";

export default function ViewMap() {
  return (
    // <div>ViewMap</div>
    <MapContainer
      className='view-map-container'
      center={[48.22305375, 22.829674916666665]} zoom={12} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <Marker position={[48.22305375, 22.829674916666665]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}
