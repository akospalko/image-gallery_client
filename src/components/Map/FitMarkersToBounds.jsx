// Fit markers to view boundary - make all markers visible on initial map view
import { useEffect, useMemo } from 'react'
import L from 'leaflet' 
import {useMap} from 'react-leaflet'

export default function FitMarkersToBounds({mapData}) {
  // CUSTOM HOOK
  const map = useMap();
  // FUNCTIONALITY
  // collect all entries' coordinates to calculate marker bounds 
  const collectMarkerCoordinates = (mapData) => {
    if(!Array.isArray(mapData) || !mapData.length) return []; 
    // transform mapData to array of arrays of gps coord. pairs
    const photoCoordinates = mapData
    .filter(photo => photo.gpsLatitude && photo.gpsLongitude) // filter photos with coordinates
    .map(photo => [[photo.gpsLatitude, photo.gpsLongitude]]) // map array of coordinate pairs into an array
    return photoCoordinates; // [[0,0], [1,1], ...]
  }
  // MEMO
  // memoized marker coordinates // recompute value when data changes 
  const memoziedMarkerCoordinates = useMemo(() => collectMarkerCoordinates(mapData), [mapData]);
  // EFFECT
  // fit view based on the calculated marker boundary
  useEffect(() => {
    if(memoziedMarkerCoordinates.length < 1) return;
    const markerBounds = L.latLngBounds(memoziedMarkerCoordinates); // finds the NEmost and SWmost values of the passed coordinates -> creates a frame/boundary around markers
    map.fitBounds(markerBounds);
  }, [memoziedMarkerCoordinates])

  return null;
}