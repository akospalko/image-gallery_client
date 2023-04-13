// content management for home photo collection 
import React, {useState, useEffect} from 'react'
import '../Shared.css'
import Button from '../UI/Button'
import PhotoEntries from './PhotoEntries'
import {useModalContext} from '../contexts/ToggleModalContext'
import PhotoEntryModalGroup from './PhotoEntryModalGroup'
import {COLLECTIONS, OPERATIONS} from '../../helper/dataStorage'
import {useNavigate, useLocation} from 'react-router'
import SkeletonAdminPhotoEntry from '../../skeletons/SkeletonAdminPhotoEntry'
import useFetchPhotoEntries from '../hooks/useFetchPhotoEntries'
import { useFormContext } from '../contexts/FormContext'

export default function Home() {
  // ROUTING
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const navToPrevPage = () => navigate('/login', { state: {from: location}, replace: true});
  // STATE
  const [showSkeleton, setShowSkeleton] = useState(true);
  // CONTEXT
  const {toggleModalHandler} = useModalContext();
  const {setMessage} = useFormContext();
  // HOOK
  const {fetchHomePhotoEntries} = useFetchPhotoEntries(); 
  // EFFECT
  // get all data on initial render
  useEffect(() => { 
    (async () => {
      try {
        await fetchHomePhotoEntries(navToPrevPage); 
      } catch(error) {
        navToPrevPage(); 
      } finally {
        setShowSkeleton(false);
      }
    })() 
  }, []) 

  // RENDERED ELEMENTS
  // data is loading -> skeleton loader || photo entries
  const renderedElement = showSkeleton ? <SkeletonAdminPhotoEntry /> : <PhotoEntries collection={COLLECTIONS.HOME} /> 
  return (
    <div className='shared-page-container shared-page-container--with-padding'>
      {/* header title */}
      <h1> Home Dashboard </h1>  
      {/* add new photo entry button */}
      <Button 
        clicked={() => {
          toggleModalHandler(OPERATIONS.CREATE_PHOTO);
          setMessage('');
        }}
        buttonStyle='button-photo-new'
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