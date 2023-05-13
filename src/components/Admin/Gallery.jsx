// TODO: outsource home - gallery header titles -> more reusable
// Admin view photo gallery content managment logic
import React, {useState, useEffect} from 'react'
import '../Shared.css'
import Button from '../UI/Button'
import PhotoEntries from './PhotoEntries'
import {useModalContext} from '../contexts/ToggleModalContext'
import {COLLECTIONS, OPERATIONS, MODAL_TITLES, createPhoto, updatePhoto} from '../../helper/dataStorage'
import {useNavigate, useLocation} from 'react-router';
import SkeletonAdminPhotoEntry from '../../skeletons/SkeletonAdminPhotoEntry'
import useFetchPhotoEntries from '../hooks/useFetchPhotoEntries'
import { useFormContext } from '../contexts/FormContext'
import PhotoEntryModal from '../Modals/PhotoEntryModal'
import MapModal from '../Modals/MapModal'
import FullScreenView from '../Modals/FullScreenView'
import CreateUpdatePhotoEntry from '../Modals/CreateUpdatePhotoEntry'

export default function Gallery() {
  // ROUTING
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const navToPrevPage = () => navigate('/login', { state: {from: location}, replace: true});
  // STATE
  const [showSkeleton, setShowSkeleton] = useState(true);
  // CONTEXT
  const {toggleModal, toggleModalHandler} = useModalContext();
  const {setMessage} = useFormContext();
  // HOOKS
  const {fetchGalleryPhotoEntries} = useFetchPhotoEntries();
  // EFFECT
  // get all data on initial render
  useEffect(() => {
    (async ()=> {
      try {
        await fetchGalleryPhotoEntries(navToPrevPage);
      } catch(error) {
        navToPrevPage(); 
      } finally {
        setShowSkeleton(false);
      }
    })()
  }, []) 
  // ELEMENTS
  // data is loading -> display skeleton -> data is loaded -> display photo entries
  const renderedElement = showSkeleton ? <SkeletonAdminPhotoEntry/> : <PhotoEntries collection={COLLECTIONS.GALLERY} /> 
  
  return (
    <div className='shared-page-container shared-page-container--with-padding'>
      {/* header title */}
      <h1> Gallery Dashboard </h1>  
      {/* add new photo entry button */ }
      <Button 
        title='create new photo entry'
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
              collection={COLLECTIONS.GALLERY}
              formTemplate={createPhoto} 
              label={true} /> } 
        />}
      {/* update photo entry*/}
      { toggleModal[OPERATIONS.UPDATE_PHOTO] && 
        <PhotoEntryModal  
          modalTitle={ MODAL_TITLES[OPERATIONS.UPDATE_PHOTO] }
          collection={COLLECTIONS.GALLERY } 
          closeModal={ OPERATIONS.UPDATE_PHOTO } 
          modalContent={
            <CreateUpdatePhotoEntry 
              operation={OPERATIONS.UPDATE_PHOTO} 
              collection={COLLECTIONS.GALLERY}
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