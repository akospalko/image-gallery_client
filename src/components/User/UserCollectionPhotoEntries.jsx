import React, {useCallback, useEffect} from 'react'
import './PhotoEntries.css'
import '../Shared.css'
import {useFormContext} from '../contexts/FormContext'
import {getAllGalleryPhotoEntries} from '../../helper/axiosRequests'
import {useNavigate} from 'react-router'
import {useAuthContext} from '../contexts/AuthenticationContext';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import PhotoEntry from './PhotoEntry';

export default function UserCollectionPhotoEntries() {
  // CONTEXT
  const {data, setData, setMessage} = useFormContext();
  const {auth} = useAuthContext(); 
  // HOOK
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  // ROUTING
  const navToPrevPage = () => navigate('/login', {state: {from: location}, replace: true});
  // HANDLER

  const fetchUserCollection = useCallback( async () => {
    try {
      console.log('get user collection');
      const response = await getAllGalleryPhotoEntries(axiosPrivate, auth.userID, 'own'); // get user's collection photo entries
      setData(response.photoEntries); // store entries in state
      setMessage(response.message); // set message
    } catch(error) {
      navToPrevPage(); // navigate unauth user back to login page
    }
  }, [])
  // EFFECT
  useEffect(() => { // get all data on initial render
   fetchUserCollection()
  }, [fetchUserCollection]) 

  return (
    <div className='photo-entries-container'>
      {data && data.map(photoEntry => {
        return <PhotoEntry key={photoEntry._id} photoEntry={photoEntry} />
      })}
    </div>
  )
}