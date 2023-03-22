import React, {useCallback, useEffect} from 'react'
import './PhotoEntries.css'
import '../Shared.css'
import {useFormContext} from '../contexts/FormContext'
import {getAllGalleryPhotoEntries} from '../../helper/axiosRequests'
import {useNavigate} from 'react-router'
import {useAuthContext} from '../contexts/AuthenticationContext';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import PhotoEntry from './PhotoEntry';

export default function PhotoEntries({collection}) {
  // CONTEXT
  const {data, setData, setMessage} = useFormContext();
  const {auth} = useAuthContext(); 
  // HOOK
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  // ROUTING
  const navToPrevPage = () => navigate('/login', {state: {from: location}, replace: true});
  // HANDLER
  const fetchPhotoEntries = useCallback( async () => {
    try {
      console.log('fetch photo entries')
      const response = await getAllGalleryPhotoEntries(axiosPrivate, auth.userID, 'all'); // fetch entries, update state  
      setData(response.photoEntries); // store entries in state
      // setMessage(response.message); // set message
    } catch(error) {
      navToPrevPage(); // navigate unauth user back to login page
    }
  }, [])
  // EFFECT
  useEffect(() => { // get all data on initial render
    fetchPhotoEntries();
  }, [fetchPhotoEntries]) 

  return (
    <div className='photo-entries-container'>
      {data && data.map(photoEntry => {
        return <PhotoEntry key={photoEntry._id} photoEntry={photoEntry} />
      })}
    </div>
  )
}