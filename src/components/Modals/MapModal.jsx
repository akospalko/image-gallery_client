// modal to display active (single) photo entry on a map
import React from 'react'
import './MapModal.css'
import "leaflet/dist/leaflet.css";
import {useModalContext} from '../contexts/ToggleModalContext'
import Map from '../Map/Map';

export default function MapModal() {
  // CONTEXT
  const {activePhotoEntry} = useModalContext();
  const {gpsLongitude, gpsLatitude} = activePhotoEntry ?? {};

  // displayed element if no gps is provided
  let mapDisplayError = (
    <div className='view-map-container'>
      <p> No geolocation for this entry</p>
    </div>
  )

  return (
    <> 
      { isNaN(gpsLongitude) && isNaN(gpsLatitude) ? mapDisplayError : <Map mapData={activePhotoEntry}/>  }
    </>
  )
}