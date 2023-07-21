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
import SkeletonPhotoEntryCollection from '../../skeletons/SkeletonPhotoEntryCollection';
import { useAuthContext } from '../contexts/AuthenticationContext';
import { useDataContext } from '../contexts/DataContext';
import { CONSTANT_VALUES } from '../../helper/constantValues';

export default function PhotoEntriesCollection() {
  // CONSTANT
  const isCollection = true; // switch to check btw collection and photo entry (used in photo entry)
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
  const fetchPECollection = useCallback( async () => {
    try {
      const response = await getAllGalleryPhotoEntries(axiosPrivate, auth.userID, 'own'); // get user's collection photo entries
      setCollectionData(response.photoEntries); // store entries in state
    } catch(error) {
      navToPrevPage(); // navigate unauth user back to login page
    } finally {
      setIsLoading(false);
    }
  }, [])

  // EFFECT
  useEffect(() => { // get all data on initial render
    fetchPECollection()
  }, [ fetchPECollection ]) 

  // RENDERED ELEMENTS
  const loader = (
    <div className={ `pes-container-collection ${ isLoading ? 'pes-container--centered' : '' }` } >
      <div className='auth-modal-loader'> <LoaderIcon height='100px' width='100px' stroke='var(--text-color--high-emphasis)'/> </div>
    </div>
  )
  const photoEntries = (
    <div className='pes-container-collection' >
      { /* data is fetched && img-s are not yet loaded: show data.length amount of skeleton components */ }
      { !allImagesLoaded && collectionData.length > 1 && collectionData.map(photoEntry => <SkeletonPhotoEntryCollection wrapperStyle='skeleton-wrapper--user-collection' key={ photoEntry._id } /> ) }
      {/* empty collection: display placeholder */}
      { !collectionData.length && <div className='pes-empty'> <h3> { CONSTANT_VALUES.INFO_PHOTO_ENTRY_EMPTY_COLLECTION } </h3> </div> }
      { /* render photo entry && hide from view until ready to be displayed */ }
      { collectionData && collectionData.map(photoEntry => (
          <PhotoEntry 
            key={ photoEntry._id } 
            photoEntry={ photoEntry } 
            dataSetter={ setCollectionData }
            isCollection={ isCollection }
            onLoadHandler={ onLoadHandler } 
            hideImageStyle={ hideImageStyle } 
            setCurrentlyLoadingImages={ setCurrentlyLoadingImages }
          />
      ) ) }
    </div>
  )
  
  return ( <> { isLoading ? loader : photoEntries } </> )
}