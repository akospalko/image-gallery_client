// Photo entries: collection 
import React, { useCallback, useEffect, useState } from 'react'
import './PhotoEntries.css'
import '../Shared.css'
import { useNavigate } from 'react-router'
import PhotoEntry from './PhotoEntry';
import { getAllGalleryPhotoEntries } from '../../helper/axiosRequests'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useHideImagesWhileLoading from '../hooks/useHideImagesWhileLoading';
import LoaderIcon from '../SVG/Loader';
import SkeletonUserPhotoEntry from '../../skeletons/SkeletonUserPhotoEntry';
import { useAuthContext } from '../contexts/AuthenticationContext';
import { useDataContext } from '../contexts/DataContext';

export default function PhotoEntriesCollection() {
  // CONTEXT
  const { collectionData, setCollectionData } = useDataContext();
  const { auth } = useAuthContext(); 
  
  // STATE
  const [ isLoading, setIsLoading ] = useState(true);

  // HOOK
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const {
    allImagesLoaded,  
    hideImageStyle, 
    setCurrentlyLoadingImages,
    onLoadHandler
  } = useHideImagesWhileLoading();

  // ROUTING
  const navToPrevPage = () => navigate('/login', { state: { from: location }, replace: true });

  // HANDLER
  const fetchUserCollection = useCallback( async () => {
    try {
      const response = await getAllGalleryPhotoEntries(axiosPrivate, auth.userID, 'own'); // get user's collection photo entries
      setCollectionData(response.photoEntries); // store entries in state
      // setMessage(response.message); // set message
    } catch(error) {
      navToPrevPage(); // navigate unauth user back to login page
    } finally {
      setIsLoading(false);
    }
  }, [])

  // EFFECT
  useEffect(() => { // get all data on initial render
   fetchUserCollection()
  }, [ fetchUserCollection ]) 

  // RENDERED ELEMENTS
  const loader = (
    <div className='photo-entries-container'>
      <div className='auth-modal-loader'> <LoaderIcon height='100px' width='100px' stroke='var(--text-color--high-emphasis)'/> </div>
    </div>
  )
  const photoEntries = (
    <div className='photo-entries-container'>
      {/* data is fetched && img-s are not yet loaded: show data.length amount of skeleton components */ }
      { !allImagesLoaded && collectionData && collectionData.map(photoEntry => <SkeletonUserPhotoEntry key={ photoEntry._id }/> ) }
      {/* render photo entry && hide from view until ready to be displayed */}
      { collectionData && collectionData.map(photoEntry => (
          <PhotoEntry 
            key={ photoEntry._id } 
            photoEntry={ photoEntry } 
            dataSetter={ setCollectionData }
            isCollection
            onLoadHandler={ onLoadHandler } 
            hideImageStyle={ hideImageStyle } 
            setCurrentlyLoadingImages={ setCurrentlyLoadingImages }
          />
        )
      ) }
    </div>
  )
  return ( <> { isLoading ? loader : photoEntries } </> )
}