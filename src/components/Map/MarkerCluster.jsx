// Map marker cluster wrapper
// Resources: customizing marker cluster: https://codesandbox.io/s/musing-montalcini-nvjk5x?file=/src/App.tsx:377-725
import React from 'react';
import './Map.css'
import L from "leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster';

export default function MarkerCluster({children}) {
  // ELEMENTS
  // custom marker cluster icon  
  const createMarkerClusterIcon = cluster => {
   return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: "custom--marker-cluster",
      iconSize: L.point(40, 40, true)
    });
  };

  return (
    <MarkerClusterGroup 
      polygonOptions={{
        fillColor: "var(--bg-color--accent-transparent-medium)",
        color: "var(--bg-color--accent)",
        weight: 1,
        opacity: 1,
        fillOpacity: 1
      }}
      chunkedLoading
      iconCreateFunction={createMarkerClusterIcon}
      spiderfyOnMaxZoom={true}
      zoomToBoundsOnClick={true}
      showCoverageOnHover={true}
      maxClusterRadius={150}
    >  {children} 
      </MarkerClusterGroup>
  )
}