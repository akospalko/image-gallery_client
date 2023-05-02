import React, {useCallback, useEffect, useState} from 'react'
import './PhotoEntries.css'
import '../Shared.css'
import {useFormContext} from '../contexts/FormContext'
import {getAllGalleryPhotoEntries} from '../../helper/axiosRequests'
import {useNavigate} from 'react-router'
import {useAuthContext} from '../contexts/AuthenticationContext';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import PhotoEntry from './PhotoEntry';
import SkeletonUserPhotoEntry from '../../skeletons/SkeletonUserPhotoEntry';
import useHideImagesWhileLoading from '../hooks/useHideImagesWhileLoading';
import LoaderIcon from '../SVG/Loader';

export default function PhotoEntries() {
  // CONTEXTS
  const {data, setData} = useFormContext();
  const {auth} = useAuthContext(); 
  // STATE
  const [isLoading, setIsLoading] = useState(true);
  // HOOKS
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const {
    allImagesLoaded,  
    hideImageStyle, 
    getImageFile,
    setCurrentlyLoadingImages
  } = useHideImagesWhileLoading();
  // ROUTING
  const navToPrevPage = () => navigate('/login', {state: {from: location}, replace: true});
  // HANDLER
  const fetchPhotoEntries = useCallback( async () => {
    try {
      const response = await getAllGalleryPhotoEntries(axiosPrivate, auth.userID, 'all'); // fetch entries, update state  
      setData(response.photoEntries); // store entries in state
    } catch(error) {
      navToPrevPage(); // navigate unauth user back to login page
    } finally {
      setIsLoading(false);
    } 
  }, [])
  // EFFECT
  useEffect(() => { // get all data on initial render
    fetchPhotoEntries();
  }, [fetchPhotoEntries]) 
  // RENDERED ELEMENTS
  const loader = (
    <div className='photo-entries-container'>
      <div className='auth-modal-loader'> <LoaderIcon height='100px' width='100px' stroke='var(--text-color--high-emphasis)'/> </div>
    </div>
  )
  const photoEntries = (
    <div className='photo-entries-container'>
      {/* data is fetched && img-s are not yet loaded: show data.length amount of skeleton components */}
      { !allImagesLoaded && data && data.map(photoEntry => <SkeletonUserPhotoEntry key={photoEntry._id}/> )}
      {/* render photo entry && hide from view until ready to be displayed */}
      { data && data.map(photoEntry => (
          <PhotoEntry 
            key={photoEntry._id} 
            photoEntry={photoEntry} 
            getImageFile={getImageFile} 
            hideImageStyle={hideImageStyle} 
            setCurrentlyLoadingImages={setCurrentlyLoadingImages}
          />
        )
      )}
    </div>
  )
  return (
    <>
      {isLoading ? loader : photoEntries}
    </>
  )
}