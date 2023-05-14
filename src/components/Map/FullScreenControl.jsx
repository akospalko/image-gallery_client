// Map full screen functionality 
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import './Map.css'

export default function FullscreenControl() {
  // HOOK
  const map = useMap();
  // EFFECT
  useEffect(() => {
    const fullscreenControl = L.control.fullscreen();
    fullscreenControl.addTo(map);
    return () => fullscreenControl.remove();
  }, [map]);

  return null;
}