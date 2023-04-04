// content management for home photo collection 
import React, {useState, useEffect} from 'react'
import '../Shared.css'
import Button from '../UI/Button'
import PhotoEntries from './PhotoEntries'
import {useModalContext} from '../contexts/ToggleModalContext'
import PhotoEntryModalGroup from './PhotoEntryModalGroup'
import {COLLECTIONS, OPERATIONS} from '../../helper/dataStorage'
import {useFormContext} from '../contexts/FormContext'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import {getAllHomePhotos} from '../../helper/axiosRequests'
import {useNavigate, useLocation} from 'react-router'
import SkeletonAdminPhotoEntry from '../../skeletons/SkeletonAdminPhotoEntry'

export default function Home() {
  // ROUTING
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const navToPrevPage = () => navigate('/login', { state: {from: location}, replace: true});
  // STATE
  const [isLoading, setIsLoading] = useState(true);
  // CONTEXT
  const {toggleModalHandler} = useModalContext();
  const {setData} = useFormContext();
  // HOOK
  const axiosPrivate = useAxiosPrivate();
  // EFFECT
  useEffect(() => { // get all data on initial render
    (async () => {
      try {
        const response = await getAllHomePhotos(axiosPrivate); // fetch entries, update state  
        console.log(response);
        setData(response.photoEntries); // store entries in state
      } catch(error) {
        navToPrevPage(); // navigate unauth user back to login page
      } finally {
        setIsLoading(false);
      }
    })() 
  }, []) 

  // RENDERED ELEMENTS
  // data is loading -> skeleton loader || photo entries
  const renderedElement = isLoading ? <SkeletonAdminPhotoEntry /> : <PhotoEntries collection={COLLECTIONS.HOME} /> 
  return (
    <div className='shared-page-container shared-page-container--with-padding'>
      {/* header title */}
      <h1> Home Dashboard </h1>  
      {/* add new photo entry button */}
      <Button 
        clicked={() => toggleModalHandler(OPERATIONS.CREATE_PHOTO)}
        customStyle='photo-new'
      > Create Photo Entry 
      </Button>
      {/* photo cards container */}
      <div className='shared-image-cards-container'>
        {renderedElement}
      </div>
      {/* control group modals */}
      <PhotoEntryModalGroup collection={COLLECTIONS.HOME}/>
    </div>
    )
}