//set map view to center so every markers are visible
import {useEffect} from 'react'
import {useMap} from 'react-leaflet'
import L from 'leaflet' 

export default function FitMarkersToBounds({markerCoordinates}) {
  // HOOK
  const map = useMap();
  // EFFECT
  useEffect(() => {
    if(!markerCoordinates || markerCoordinates < 1) return
    const markerBounds = L.latLngBounds(markerCoordinates); // finds the NEmost and SWmost values of the passed coordinates -> creates a frame/boundary around markers
    map.fitBounds(markerBounds);
  }, [])
  return null
}