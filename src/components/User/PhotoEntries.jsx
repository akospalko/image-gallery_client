//TODO: reusable loader class (currently used: auth-modal-loader)
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
import Loader from '../SVG/Loader';

export default function PhotoEntries() {
  // CONTEXTS
  const {data, setData} = useFormContext();
  const {auth} = useAuthContext(); 
  // STATE
  const [isLoading, setIsLoading] = useState(true);
  // HOOKS
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const {isImageLoaded, isImageLoadingStyle, getImageFile} = useHideImagesWhileLoading();
  // ROUTING
  const navToPrevPage = () => navigate('/login', {state: {from: location}, replace: true});
  // HANDLER
  const fetchPhotoEntries = useCallback( async () => {
    // setIsLoading(true);
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
      <div className='auth-modal-loader'> <Loader height='50%' width='50%'/> </div>
    </div>
  )
  const photoEntries = (
    <div className='photo-entries-container'>
      {/* data is fetched but images are still being loaded: display amount of fetched array.length skeleton component */}
      { !isImageLoaded && data && data.map(photoEntry => { return <SkeletonUserPhotoEntry key={photoEntry._id} theme={'dark'} /> })}
      {/* photo entry is ready to be displayed: display photo entries */}
      {data && data.map(photoEntry => { return <PhotoEntry key={photoEntry._id} photoEntry={photoEntry} imgFile={getImageFile} isImageLoadingStyle={isImageLoadingStyle} />
      })}
    </div>
  )
  return (
    <>
      {isLoading ? loader : photoEntries}
    </>
  )
}
