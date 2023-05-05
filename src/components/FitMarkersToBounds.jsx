// set map view to center so every markers are visible
import {useEffect, useMemo} from 'react'
import {useMap} from 'react-leaflet'
import L from 'leaflet' 
import { useFormContext } from './contexts/FormContext'

export default function FitMarkersToBounds() {
  // CONTEXT
  const {data} = useFormContext();
  // CUSTOM HOOK
  const map = useMap();
  // FUNCTIONALITY
  // collect all entries' coordinates to calculate marker bounds 
  const collectMarkerCoordinates = (data) => {
    if(!data) return
    // transform data to array of arrays of gps coord. pairs
    const markerCoordinates = data.map(entryCoordinate => {
      if(!entryCoordinate.gpsLatitude || !entryCoordinate.gpsLongitude) return;
      return [[entryCoordinate.gpsLatitude + 1, entryCoordinate.gpsLongitude + 1]]
    })
    return markerCoordinates;
  } 
  // MEMO
  // memoized marker coordinates // recompute value when data changes 
  const memoziedMarkerCoordinates = useMemo(() => collectMarkerCoordinates(data), [data]);
  // EFFECT
  // fit view based on the calculated marker boundary
  useEffect(() => {
    if(!memoziedMarkerCoordinates || memoziedMarkerCoordinates < 1) return
    const markerBounds = L.latLngBounds(memoziedMarkerCoordinates); // finds the NEmost and SWmost values of the passed coordinates -> creates a frame/boundary around markers
    map.fitBounds(markerBounds);
  }, [])
  return null
}