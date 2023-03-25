import React, {useCallback, useEffect} from 'react'
import './PhotoEntries.css'
import '../Shared.css'
import {useFormContext} from '../contexts/FormContext'
import {getAllGalleryPhotoEntries} from '../../helper/axiosRequests'
import {useNavigate} from 'react-router'
import {useAuthContext} from '../contexts/AuthenticationContext';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import PhotoEntry from './PhotoEntry';
import SkeletonUserPhotoEntry from '../../skeletons/SkeletonUserPhotoEntry'
import useHideImagesWhileLoading from '../hooks/useHideImagesWhileLoading'

export default function PhotoEntries() {
  // CONTEXT
  const {data, setData} = useFormContext();
  const {auth} = useAuthContext(); 
  // HOOK
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const {isImageLoaded, setIsImageLoaded, isImageLoadingStyle, getImageFile} = useHideImagesWhileLoading();
  // ROUTING
  const navToPrevPage = () => navigate('/login', {state: {from: location}, replace: true});
  // HANDLER
  const fetchPhotoEntries = useCallback( async () => {
    try {
      console.log('fetch photo entries')
      const response = await getAllGalleryPhotoEntries(axiosPrivate, auth.userID, 'all'); // fetch entries, update state  
      setData(response.photoEntries); // store entries in state
    } catch(error) {
      navToPrevPage(); // navigate unauth user back to login page
    }
  }, [])
  // EFFECT
  useEffect(() => { // get all data on initial render
    fetchPhotoEntries();
  }, [fetchPhotoEntries]) 

  return (
    // TESTING SKELETONS
    // <div className='photo-entries-container'>
    //   {/* data is not yet fetched: display  single skeleton component */}
    //   { <SkeletonUserPhotoEntry theme={'dark'} /> } 
    // </div>
    <div className='photo-entries-container'>
      {/* data is not yet fetched: display  single skeleton component */}
      { !isImageLoaded && <SkeletonUserPhotoEntry /> } 
      {/* data is fetched but images are still being loaded: display amount of fetched array.length skeleton component */}
      { !isImageLoaded && data && data.map(photoEntry => { return <SkeletonUserPhotoEntry key={photoEntry._id} theme={'dark'} /> })}
      {/* photo entry is ready to be displayed: display photo entries */}
      {data && data.map(photoEntry => { return <PhotoEntry key={photoEntry._id} photoEntry={photoEntry} imgFile={getImageFile} isImageLoadingStyle={isImageLoadingStyle} />
      })}
    </div>
  )
}