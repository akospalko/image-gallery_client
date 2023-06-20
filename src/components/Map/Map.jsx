// Display map: map overview (single marker), map modal (multiple markers) 
import React, { useMemo, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet/dist/leaflet.css';
import './Map.css'
import ReactDOMServer from 'react-dom/server';
import { MapContainer, Marker } from 'react-leaflet';
import FitMarkersToBounds from './FitMarkersToBounds'
import BaseMapLayers from './BaseMapLayers';
import FullscreenControl from './FullScreenControl';
import MarkerCluster from './MarkerCluster';
import { useModalContext } from '../contexts/ToggleModalContext';
import { useLoaderContext } from '../contexts/LoaderContext';
import { LocationIcon } from '../SVG/Icons';
import LoaderIcon from '../SVG/Loader';
import { useMediaQuery } from 'react-responsive';
import { OPERATIONS } from '../../helper/dataStorage';
import { CONSTANT_VALUES } from '../../helper/constantValues';

export default function Map(props) {
  // PROPS
  const { 
    mapData = [], // data to display on map
    isSingleMarker // display (default/omitted): multiple markers || single marker
  } = props; // array of object(s) ([{...}, ...]) - photo entry data   
  console.log(mapData, isSingleMarker);
  
  // CONSTANTS
  const centerPosition = [0, 0];
  // Responsive marker icon parameters 
  const iconS = { size: [30, 30], anchor: [15, 30] };
  const iconM = { size: [35, 35], anchor: [17.5, 35] };
  
  // CONTEXT
  const { setActivePhotoEntry, toggleModalHandler } = useModalContext();
  const { isLoading } = useLoaderContext();
  
  // HANDLERS
  // Memoize handler to filter out active entry on marker click 
  const setActivePhotoEntryHandler = useCallback((id) => {
    const filteredData = Array?.isArray(mapData) && mapData.filter(elem => elem._id === id);
    setActivePhotoEntry(filteredData?.[0]);
  }, [ mapData, setActivePhotoEntry ]);

  // HOOK
  // Media query: large screen
  const isLargeScreen = useMediaQuery({ query: '(max-width: 768px)' });

  // ELEMENTS
  // Memoized custom svg marker
  const customMarker = useMemo( () => {
    return L.divIcon( {
      className: 'leaflet-svg-icon',
      iconSize: isLargeScreen ? iconM.size : iconS.size,
      iconAnchor: isLargeScreen ? iconM.anchor : iconS.anchor,
      html: ReactDOMServer.renderToStaticMarkup(<LocationIcon stroke='var(--color-accent)' fill='var(--color-accent)' />),
    } );
  }, [] );

  // conditionally render map content
  const mapContent = useMemo(() => {
    if(Array.isArray(mapData) && mapData.length === 1 && isSingleMarker) { // single marker 
      const [ { gpsLatitude = 0, gpsLongitude = 0 } ] = mapData;
      const markerCoordinates = [gpsLatitude, gpsLongitude];
      return <Marker 
        key={ mapData[0]._id }
        position={ markerCoordinates } 
        icon={ customMarker }
      />
    } else if(Array.isArray(mapData) && mapData.length  && !isSingleMarker) { // multiple markers: render cluster
      return (
        <MarkerCluster>
          { mapData?.map((marker) => {
            const markerCoordinates = [marker?.gpsLatitude ?? 0, marker?.gpsLongitude ?? 0];
            if(!markerCoordinates[0] || !markerCoordinates[1]) return null;
            return (
              <Marker 
                eventHandlers={ { click: () => {
                  setActivePhotoEntryHandler(marker._id);
                  toggleModalHandler(OPERATIONS.PHOTO_INFO_VIEW);
                  } 
                } }
                key={ marker._id }
                position={ markerCoordinates } 
                icon={ customMarker }
              />
            )
          }) }
        </MarkerCluster>
      )
    }
    return null;
  }, [ mapData, customMarker, setActivePhotoEntryHandler, toggleModalHandler ]);

  return (
    <MapContainer
      className='map-container map-container--overview'
      center={ centerPosition } 
      minZoom={ 2 }
      zoom={ 12 } 
    >
      { /* map loader */ }
      { isLoading?.MAP_FETCH_DATA ? <div className='map-loader'> <LoaderIcon height='100px' width='100px' stroke='var(--text-color--high-emphasis)'/> </div> : null }
      { /* empty map content notification layer */ }
      { !mapData.length &&  <div className='map-empty-notification'>
        <h3> { CONSTANT_VALUES.INFO_MAP_NO_PLACES } </h3>
      </div> }
      { /* map background */ }
      <div className='map-background'></div>
      { /* layer control for base map selection */ }
      <BaseMapLayers />
      { /* lull screen control */ }
      <FullscreenControl />
      { /* place all markers in view */ }
      <FitMarkersToBounds mapData={ mapData } /> 
      { /* map with data */ }
      { mapContent && mapContent }
    </MapContainer> 
  )
}