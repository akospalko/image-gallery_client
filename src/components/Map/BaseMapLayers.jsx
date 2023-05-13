// Map layer toggle button: toggle and select from list of basemap layers
import React from 'react';
import './Map.css';
import {TileLayer, LayersControl} from 'react-leaflet';

import { useThemeContext } from '../contexts/ThemeContext';
export default function BaseMapLayers() {
  // CONTEXT
  const {theme} = useThemeContext(); 
  // TEMPLATE
  // map base layer data
  const baseLayers = [
    {
      name: 'OpenStreetMap',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      checked: theme === 'light'
    }, {
      name: 'OpenStreetMap Dark',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      customClass: 'custom-layer',
      checked: theme === 'dark'
    }, {
      name: 'OpenTopoMap',
      url: 'https://tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: '© OpenTopoMap contributors, CC-BY-SA',
    }, {
      name: 'Stamen Toner Background',
      url: 'https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    }, {
      name: 'Esri World Imagery',
      url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri',
    }
  ];
  
 // set up layers
 const {BaseLayer} = LayersControl;

  return (
    <LayersControl> 
      {baseLayers.map(layer => (
        <BaseLayer key={layer?.name} checked={layer?.checked} name={layer?.name}>  
          <TileLayer attribution={layer?.attribution} url={layer?.url} className={layer?.customClass}/>
        </BaseLayer>
      ))}
    </LayersControl>
  )
}