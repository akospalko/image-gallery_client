// Storage for fetched data used throughout the app: photo entries: gallery & collection, home
import { createContext, useContext, useState, useEffect } from 'react';

const DataLayoutProvider = createContext();
export const useDataContext = () => useContext(DataLayoutProvider);

export default function DataContext ({ children }) {
  // STATE
  const [ homeData, setHomeData ]  = useState([]); 
  const [ homePhotos, setHomePhotos ]  = useState([]); 
  const [ collectionData, setCollectionData ] = useState([]); 
  const [ galleryData, setGalleryData ] = useState([]); 
  const [ mapData, setMapData ] = useState([]); 

  return(
    <DataLayoutProvider.Provider
      value={ {
        homeData, setHomeData, // admin home   
        homePhotos, setHomePhotos, // landing home page carousel photo storage  
        collectionData, setCollectionData, // auth user collection data
        galleryData, setGalleryData, // auth user gallery data,
        mapData, setMapData // active map data displayed on map
      } }
    > { children }
    </DataLayoutProvider.Provider>
  )
}