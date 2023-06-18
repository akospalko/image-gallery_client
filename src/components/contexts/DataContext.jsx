// Storage for fetched data used throughout the app: photo entries: gallery & collection, home
import { createContext, useContext, useState, useEffect } from 'react';

const DataLayoutProvider = createContext();
export const useDataContext = () => useContext(DataLayoutProvider);

export default function DataContext ({ children }) {
  // STATE
  const [ homeData, setHomeData ]  = useState([]); // admin home  
  const [ homePhotos, setHomePhotos ]  = useState([]); // landing home page carousel photo storage 
  const [ collectionData, setCollectionData ] = useState([]); // auth user collection data
  const [ galleryData, setGalleryData ] = useState([]); // 

  return(
    <DataLayoutProvider.Provider
      value={ {
        homeData, setHomeData,
        homePhotos, setHomePhotos,
        collectionData, setCollectionData,
        galleryData, setGalleryData
      } }
    > { children }
    </DataLayoutProvider.Provider>
  )
}