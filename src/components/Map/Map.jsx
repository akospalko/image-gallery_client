// Display map: map overview for 1+ marker(s)  & map modal for 1 marker 
import React, {useMemo, useCallback} from 'react';
import L from 'leaflet';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet/dist/leaflet.css';
import './Map.css'
import { MapContainer, Marker } from 'react-leaflet';
import FitMarkersToBounds from './FitMarkersToBounds'
import BaseMapLayers from './BaseMapLayers';
import FullscreenControl from './FullScreenControl';
import MarkerCluster from './MarkerCluster';
import ReactDOMServer from 'react-dom/server';
import { LocationIcon } from '../SVG/Icons';
import { useModalContext } from '../contexts/ToggleModalContext';
import { OPERATIONS } from '../../helper/dataStorage';

export default function Map({mapData = []}) {
  // PROP: mapData - array of object(s) ([{...}, ...]) - photo entry display data   
  // CONTEXT
  const {setActivePhotoEntry, toggleModalHandler} = useModalContext();
  // HANDLERS
  // memoize handler to filter out active entry on marker click 
  const setActivePhotoEntryHandler = useCallback((id) => {
    const filteredData = Array?.isArray(mapData) && mapData.filter(elem => elem._id === id);
    setActivePhotoEntry(filteredData?.[0]);
  }, [mapData, setActivePhotoEntry]);
  // ELEMENTS
  // memoized custom svg marker
  const customMarker = useMemo(() => {
    return L.divIcon({
      className: 'leaflet-svg-icon',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      html: ReactDOMServer.renderToStaticMarkup(<LocationIcon/>),
    });
  }, []);
  // conditionally render map content

  let centerPosition = [0, 0];
  const mapContent = useMemo(() => {
    if(Array.isArray(mapData) && mapData.length > 1) { // multiple markers: render cluster
      return (
        <MarkerCluster>
          {mapData?.map((marker) => {
            const markerCoordinates = [marker?.gpsLatitude ?? 0, marker?.gpsLongitude ?? 0];
            if(!markerCoordinates[0] || !markerCoordinates[1]) return null;
            return (
              <Marker 
                eventHandlers={{ click: () => {
                  setActivePhotoEntryHandler(marker._id);
                  toggleModalHandler(OPERATIONS.PHOTO_INFO_VIEW);
                  } 
                }}
                key={marker._id}
                position={markerCoordinates} 
                icon={customMarker}
              />
            )
          })}
        </MarkerCluster>
      )
    } else if(Array.isArray(mapData) && mapData.length === 1) { 
      const [{gpsLatitude = 0, gpsLongitude = 0}] = mapData;
      const markerCoordinates = [gpsLatitude, gpsLongitude];
      return <Marker 
          key={mapData[0]._id}
          position={markerCoordinates} 
          icon={customMarker}
        />;
    }
    return null;
  }, [mapData, customMarker, setActivePhotoEntryHandler, toggleModalHandler]);

  return (
    <MapContainer
      className='map-container'
      center={centerPosition} 
      minZoom={2}
      zoom={12} 
    >
      {/* Layer control for base map selection */}
      <BaseMapLayers />
      {/* Full screen control */}
      <FullscreenControl />
      {/* Place all markers in view */}
      <FitMarkersToBounds mapData={mapData} /> 
      {/*  map with data */}
      {mapContent && mapContent}
    </MapContainer> 
  )
}