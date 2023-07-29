// Storage for fetched data used throughout the app: photo entries: gallery & collection, home
import { createContext, useContext, useState, useEffect } from 'react';

import axios from '../../helper/axiosInstances'
import { getAllHomePhotos } from '../../helper/axiosRequests';

const DataLayoutProvider = createContext();
export const useDataContext = () => useContext(DataLayoutProvider);

export default function DataContext ({ children }) {
  // STATE
  const [ homeData, setHomeData ]  = useState([]); 
  const [ homePhotos, setHomePhotos ]  = useState([]); 
  const [ collectionData, setCollectionData ] = useState([]); 
  const [ galleryData, setGalleryData ] = useState([]); 
  const [ mapData, setMapData ] = useState([]); 
  
  // track data fetching state // TODO: outsource it to loader context
  const [ isLoadingData, setIsLoadingData ] = useState(true);

  // EFFECTS
  // fetch & update home photos on initial render 
  useEffect(() => {
    (async () => {
      try {
        const response = await getAllHomePhotos(axios); 
        if (response.success) {
          setHomePhotos(response?.photoEntries);
        } else {
          setHomePhotos([]);
        }
        setIsLoadingData(false); 
      } catch (error) {
        // handle error 
        setIsLoadingData(false); 
      } 
    })();
  }, []);

  return(
    <DataLayoutProvider.Provider
      value={ {
        homeData, setHomeData, // admin home   
        homePhotos, setHomePhotos, // landing home page carousel photo storage  
        collectionData, setCollectionData, // auth user collection data
        galleryData, setGalleryData, // auth user gallery data,
        mapData, setMapData, // active map data displayed on map
        isLoadingData, setIsLoadingData // track loading state for fetched data
      } }
    > { children }
    </DataLayoutProvider.Provider>
  )
}