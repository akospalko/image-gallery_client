// Photo entries: gallery 
import React, { useCallback, useEffect, useState } from 'react';
import './PhotoEntries.css';
import '../Shared.css';
import { useNavigate } from 'react-router';
import { getAllGalleryPhotoEntries } from '../../helper/axiosRequests';
import { CONSTANT_VALUES } from '../../helper/constantValues';
import PhotoEntryGallery from './PhotoEntryGallery';
import { useAuthContext } from '../contexts/AuthenticationContext';
import { useDataContext } from '../contexts/DataContext';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useHideImagesWhileLoading from '../hooks/useHideImagesWhileLoading';
import SkeletonPhotoEntryGallery from '../../skeletons/SkeletonPhotoEntryGallery';
import LoaderIcon from '../SVG/Loader';

export default function PhotoEntriesGallery() {
  // CONTEXTS
  const { galleryData, setGalleryData } = useDataContext();
  const { auth } = useAuthContext(); 

  // STATE
  const [ isLoading, setIsLoading ] = useState(true);

  // HOOKS
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const {
    allImagesLoaded,  
    hideImageStyle, 
    setCurrentlyLoadingImages,
    onLoadHandler,
  } = useHideImagesWhileLoading();

  // ROUTING
  const navToPrevPage = () => navigate('/login', { state: { from: location }, replace: true });
  
  // HANDLER
  const fetchPEGallery = useCallback( async () => {
    try {
      const response = await getAllGalleryPhotoEntries(axiosPrivate, auth.userID, 'all'); // fetch entries, update state  
      setGalleryData(response.photoEntries); // store entries in state
    } catch(error) {
      navToPrevPage(); // navigate unauth user back to login page
    } finally {
      setIsLoading(false);
    } 
  }, [])

  // EFFECT
  useEffect( () => { // get all data on initial render
    fetchPEGallery();
  }, [ fetchPEGallery ] );

  // RENDERED ELEMENTS
  // Loader
  const loader = (
    <div className={ `pes-gallery-container ${ isLoading ? 'pes-container--centered' : '' }` } >
      <div className='auth-modal-loader'> <LoaderIcon height='100px' width='100px' stroke='var(--text-color--high-emphasis)'/> </div>
    </div>
  )

  // Entries
  const photoEntries = (
    <div className='pes-gallery-container'>
      { /* data is fetched && img-s are not yet loaded: show data.length amount of skeleton components */ }
      { !allImagesLoaded && galleryData && galleryData.map(photoEntry => <SkeletonPhotoEntryGallery key={ photoEntry._id } /> ) }
      {/* empty gallery: display placeholder */}
      { !galleryData.length && <div className='pes-empty-container-container'> <h3> { CONSTANT_VALUES.INFO_PHOTO_ENTRY_EMPTY_GALLERY } </h3> </div> }
      { /* render photo entry && hide from view until ready to be displayed */ }
      { galleryData && galleryData.map(photoEntry => (
          <PhotoEntryGallery 
            key={ photoEntry._id } 
            photoEntry={ photoEntry } 
            dataSetter={ setGalleryData }
            onLoadHandler={ onLoadHandler }
            hideImageStyle={ hideImageStyle } 
            setCurrentlyLoadingImages={ setCurrentlyLoadingImages }
          />
      )) }
    </div>
  )
  return ( <> { isLoading ? loader : photoEntries } </> )
}