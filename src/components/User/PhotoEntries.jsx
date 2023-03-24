import React, {useCallback, useEffect, useState} from 'react'
import './PhotoEntries.css'
import '../Shared.css'
import {useFormContext} from '../contexts/FormContext'
import {getAllGalleryPhotoEntries} from '../../helper/axiosRequests'
import {useNavigate} from 'react-router'
import {useAuthContext} from '../contexts/AuthenticationContext';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import PhotoEntry from './PhotoEntry';
import SkeletonComponent from '../../skeletons/SkeletonComponent'

export default function PhotoEntries() {
  // CONTEXT
  const {data, setData} = useFormContext();
  const {auth} = useAuthContext(); 
  // HOOK
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  // STATE
  const [isImageLoaded, setIsImageLoaded] = useState(false);
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
  

 const isPhotoLoading = isImageLoaded ? {} : {visibility: 'hidden'};

//  const loader = (
//   <div style={!isImageLoaded ? {} : {visibility: 'hidden'}} className='photo-entries-container'>
//   {/* data is not yet fetched */}
//   { !isImageLoaded && !data && <SkeletonComponent/> } 
//   {/* data is fetched but images are still being loaded */}
//   { !isImageLoaded && data && data.map(photoEntry => { return <SkeletonComponent key={photoEntry._id}/ > })}
//   {/* photo entry is ready to be displayed */}
//   </div>
// )

// const photoEntries = (
//   <div style={isImageLoaded ? {} : {visibility: 'hidden'}} className='photo-entries-container'>
//   {data && data.map(photoEntry => {
//     return <PhotoEntry key={photoEntry._id} photoEntry={photoEntry} isImageLoaded={isImageLoaded} setIsImageLoaded={setIsImageLoaded} />
//   })}
// </div>
// )

  return (
    // <>
    //   { loader }
    //   { photoEntries }
    // </>
    <div className='photo-entries-container'>
      {/* data is not yet fetched */}
      { !data && <SkeletonComponent/> } 
      {/* data is fetched but images are still being loaded */}
      { !isImageLoaded && data && data.map(photoEntry => { return <SkeletonComponent key={photoEntry._id}/ > })}
      {/* photo entry is ready to be displayed */}
      {data && data.map(photoEntry => {
        return <PhotoEntry key={photoEntry._id} photoEntry={photoEntry} isImageLoaded={isImageLoaded} setIsImageLoaded={setIsImageLoaded} />
      })}
    </div>
  )
}