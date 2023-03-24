//form to create/update photo entries
import React, {useEffect} from 'react'
import '../Shared.css'
import Button from '../UI/Button'
import PhotoCard from './PhotoCard'
import {useModalContext} from '../contexts/ToggleModalContext'
import PhotoEntryModalGroup from './PhotoEntryModalGroup'
import {COLLECTIONS, OPERATIONS} from '../../helper/dataStorage'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import {useNavigate, useLocation} from 'react-router';
import {getAllGalleryPhotoEntries} from '../../helper/axiosRequests'
import {useFormContext} from '../contexts/FormContext'
import {useAuthContext} from '../contexts/AuthenticationContext'

export default function Gallery() {
  // ROUTING
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const navToPrevPage = () => navigate('/login', { state: {from: location}, replace: true});
  // CONTEXT
  const {toggleModalHandler} = useModalContext();
  const {setData} = useFormContext();
  const {auth} = useAuthContext();
  // HOOK
  const axiosPrivate = useAxiosPrivate();
  // EFFECT
  useEffect(() => { // get all data on initial render
    (async () => {
      try {
        const response = await getAllGalleryPhotoEntries(axiosPrivate, auth.userID, 'all'); // fetch entries, update state  
        setData(response.photoEntries); // store entries in state
      } catch(error) {
        navToPrevPage(); // navigate unauth user back to login page
      }
    })() 
  }, []) 

  return (
    <div className='shared-page-container'>
      {/* title */}
      <h1> Gallery Dashboard </h1>  
      {/* add new photo entry button */}
      <Button 
        clicked={() => toggleModalHandler(OPERATIONS.CREATE_PHOTO)}
        style={'image-new'}
      > Create Photo Entry 
      </Button>
      {/* photo cards container */}
      <div className='shared-image-cards-container'>
        <PhotoCard collection={COLLECTIONS.GALLERY} />
      </div>
      {/* control group modals */}
      <PhotoEntryModalGroup collection={COLLECTIONS.GALLERY}/>
    </div>
  )
}