// Photo entries: collection 
import React, { useCallback, useEffect, useState } from 'react';
import './PhotoEntries.css';
import '../Shared.css';
import { useNavigate } from 'react-router';
import { getAllGalleryPhotoEntries } from '../../helper/axiosRequests';
import { CONSTANT_VALUES } from '../../helper/constantValues';
import PhotoEntryCollection from './PhotoEntryCollection';
import { useAuthContext } from '../contexts/AuthenticationContext';
import { useDataContext } from '../contexts/DataContext';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useHideImagesWhileLoading from '../hooks/useHideImagesWhileLoading';
import SkeletonPhotoEntryCollection from '../../skeletons/SkeletonPhotoEntryCollection';
import LoaderIcon from '../SVG/Loader';

export default function PhotoEntriesCollection() {
  // CONTEXT
  const { collectionData, setCollectionData } = useDataContext();
  const { auth } = useAuthContext(); 
  
  // STATE
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isModalOpen, setIsModalOpen ] = useState(false);


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

  // HANDLERS
  // fetch user collection photo entries
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
  useEffect( () => { // get all data on initial render
    fetchPECollection()
  }, [ fetchPECollection ] ) 

  // ELEMENTS
  // Loader
  const loader = (
    <div className={ `pes-collection-container ${ isLoading ? 'pes-container--centered' : '' }` } >
      <div className='auth-modal-loader'> <LoaderIcon height='100px' width='100px' stroke='var(--text-color--high-emphasis)'/> </div>
    </div>
  )

  // Entries
  const photoEntries = (
    <div className={ `pes-collection-container ${ !collectionData?.length ? 'pes-empty-container' : '' }`} >
      { /* data is fetched && img-s are not yet loaded: show data.length amount of skeleton components */ }
      { !allImagesLoaded && collectionData.length > 1 
        && collectionData.map(photoEntry => 
          <SkeletonPhotoEntryCollection 
            key={ photoEntry._id } 
            wrapperStyle='skeleton-wrapper--user-collection' 
          /> 
      ) }
      {/* empty collection: display placeholder */}
      { !collectionData.length && 
      <div className='pes-empty-container'> 
        <h3> { CONSTANT_VALUES.INFO_PHOTO_ENTRY_EMPTY_COLLECTION } </h3> 
      </div> }
      { /* render photo entry && hide from view until ready to be displayed */ }
      { collectionData && collectionData.map(photoEntry => (
        <PhotoEntryCollection 
          key={ photoEntry._id } 
          photoEntry={ photoEntry } 
          dataSetter={ setCollectionData }
          onLoadHandler={ onLoadHandler } 
          hideImageStyle={ hideImageStyle } 
          setCurrentlyLoadingImages={ setCurrentlyLoadingImages }
        />
      )) }
    </div>
  )
  
  return ( <> { isLoading ? loader : photoEntries } </> )
}