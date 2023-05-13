// Map full screen functionality 
import { useState, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet/dist/leaflet.css';
import './Map.css'

export default function FullscreenControl() {
  const map = useMap();
  const [fullscreenControl, setFullscreenControl] = useState(null);

  useEffect(() => {
    if (!fullscreenControl) {
      setFullscreenControl(L.control.fullscreen());
    } else {
      fullscreenControl.addTo(map);
    }
    return () => { fullscreenControl?.remove(); };
  }, [fullscreenControl, map]);
  return null;
}