// Admin view gallery dashbord layout
import React, { useState, useEffect } from 'react';
import '../Shared.css';
import { useNavigate, useLocation } from 'react-router';
import PhotoEntries from './PhotoEntries';
import { COLLECTIONS, OPERATIONS } from '../../helper/dataStorage';
import { CONSTANT_VALUES } from '../../helper/constantValues';
import SkeletonAdminPhotoEntry from '../../skeletons/SkeletonAdminPhotoEntry';
import useFetchPhotoEntries from '../hooks/useFetchPhotoEntries';
import useSetUpModal from '../hooks/useSetUpModal';
import { useModalContext } from '../contexts/ToggleModalContext';
import { useFormContext } from '../contexts/FormContext';
import Button from '../UI/Button';

export default function Gallery() { 
  // CONSTANT
  const activeCollection = COLLECTIONS.GALLERY; // component's active collection 
 
  // ROUTE
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const navToPrevPage = () => navigate('/login', { state: { from: location }, replace: true });
  
  // STATE
  const [showSkeleton, setShowSkeleton] = useState(true);

  // CONTEXT
  const { toggleModal, toggleModalHandler } = useModalContext();
  const { setMessage } = useFormContext();
  
  // HOOKS
  const { fetchGalleryPhotoEntries } = useFetchPhotoEntries();
  const { 
    createPhotoEntryModal, 
    updatePhotoEntryModal, 
    mapViewModal, 
    photoViewModal 
  } = useSetUpModal(toggleModal, activeCollection); 
  
  // EFFECT
  // get all data on initial render
  useEffect(() => {
    (async ()=> {
      try {
        setShowSkeleton(true); // Set loading status to true before fetching data
        await fetchGalleryPhotoEntries(navToPrevPage);
      } catch(error) {
        navToPrevPage(); 
      } finally {
        setShowSkeleton(false);
      }
    })()
  }, []) 

  // BUTTON
  const createPhotoEntryButton = (
    <Button 
      title='create new photo entry'
      clicked={ () => {
        toggleModalHandler(OPERATIONS.CREATE_PHOTO);
        setMessage('');
      } }
      buttonStyle='button-photo-new'
  > { CONSTANT_VALUES.BUTTON_ENTRY_CREATE } </Button>
  );

  // ELEMENTS
  // Data is loading -> display skeleton -> data is loaded -> display photo entries
  const photoEntries = showSkeleton ? <SkeletonAdminPhotoEntry /> : <PhotoEntries collection={ activeCollection } /> 

  return (
    <div className='shared-page-container shared-page-container--align-items-center'>
      { /* Header title */ }
      <div className='shared-header-wrapper'> 
        <h1> { CONSTANT_VALUES.TITLE_GALLERY_ADMIN } </h1>  
      </div> 
      { /* Add new photo entry button */ }
      { createPhotoEntryButton }
      { /* Photo cards container || photo entry skeleton */ }
      { photoEntries }
      { /* Modals */ }
      { createPhotoEntryModal }
      { updatePhotoEntryModal }
      { mapViewModal }
      { photoViewModal }
    </div>
  )
}