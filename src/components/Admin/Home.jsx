// Close modal management for photo home collection 
// Admin view home photos content managment logic
import React, {useState, useEffect} from 'react'
import '../Shared.css'
import Button from '../UI/Button'
import PhotoEntries from './PhotoEntries'
import {useModalContext} from '../contexts/ToggleModalContext'
import {COLLECTIONS, OPERATIONS, MODAL_TITLES} from '../../helper/dataStorage'
import {useNavigate, useLocation} from 'react-router'
import SkeletonAdminPhotoEntry from '../../skeletons/SkeletonAdminPhotoEntry'
import useFetchPhotoEntries from '../hooks/useFetchPhotoEntries'
import { useFormContext } from '../contexts/FormContext'
import PhotoEntryModal from '../Modals/PhotoEntryModal'
import MapModal from '../Modals/MapModal'
import FullScreenView from '../Modals/FullScreenView'
import CreateUpdatePhotoEntry from '../Modals/CreateUpdatePhotoEntry'
import { createPhoto, updatePhoto } from '../../helper/dataStorage'

export default function Home() {
  // ROUTING
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const navToPrevPage = () => navigate('/login', { state: {from: location}, replace: true});
  // STATE
  const [showSkeleton, setShowSkeleton] = useState(true);
  // CONTEXT
  const {toggleModal, toggleModalHandler} = useModalContext();
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
      {renderedElement}
      {/* Modals */}
      {/* create photo entry*/}
      { toggleModal[OPERATIONS.CREATE_PHOTO] && 
        <PhotoEntryModal  
          modalTitle={ MODAL_TITLES[OPERATIONS.CREATE_PHOTO] }
          closeModal={ OPERATIONS.CREATE_PHOTO } 
          modalContent={
            <CreateUpdatePhotoEntry 
              operation={OPERATIONS.CREATE_PHOTO} 
              collection={COLLECTIONS.HOME}
              formTemplate={createPhoto} 
              label={true} /> }
        />}
      {/* update photo entry*/} 
      { toggleModal[OPERATIONS.UPDATE_PHOTO] && 
        <PhotoEntryModal  
          modalTitle={ MODAL_TITLES[OPERATIONS.UPDATE_PHOTO] }
          closeModal={ OPERATIONS.UPDATE_PHOTO } 
          modalContent={
            <CreateUpdatePhotoEntry 
              operation={OPERATIONS.UPDATE_PHOTO} 
              collection={COLLECTIONS.HOME}
              formTemplate={updatePhoto} 
              label={true} /> }
        />}
      {/* map view */}
      { toggleModal[OPERATIONS.MAP_VIEW] && 
        <PhotoEntryModal 
          modalTitle={ MODAL_TITLES[OPERATIONS.MAP_VIEW] }
          modalContent={ <MapModal/> } 
          contentStyle='shared-page-container--with-padding' 
          closeModal={ OPERATIONS.MAP_VIEW } 
        /> }
      {/* photo view */}
      { toggleModal[OPERATIONS.FULLSCREEN_VIEW] && 
        <PhotoEntryModal 
          modalTitle={ MODAL_TITLES[OPERATIONS.FULLSCREEN_VIEW] }
          modalContent={ <FullScreenView/> } 
          contentStyle='shared-modal-content--centered' 
          closeModal={ OPERATIONS.FULLSCREEN_VIEW } 
        /> }
    </div>
    )
}