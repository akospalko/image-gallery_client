// Get modal related data, set up & return modal
// used with photo entries (admin / user) 
import React from 'react';
import { COLLECTIONS, OPERATIONS, MODAL_TITLES, createPhoto, updatePhoto } from '../../helper/dataStorage';
import PhotoEntryModal from '../Modals/PhotoEntryModal';
import CreateUpdatePhotoEntry from '../Modals/CreateUpdatePhotoEntry';
import MapModal from '../Modals/MapModal';
import FullScreenView from '../Modals/FullScreenView';
import PhotoInfo from '../Modals/PhotoInfo';

export default function useSetUpModal(toggleModal) {
  // MODALS
  // create photo entry view 
  const createPhotoEntryModal = (
    toggleModal[OPERATIONS.CREATE_PHOTO] && 
    <PhotoEntryModal  
      modalTitle={ MODAL_TITLES[OPERATIONS.CREATE_PHOTO] }
      closeModal={ OPERATIONS.CREATE_PHOTO }  
      modalContent={
        <CreateUpdatePhotoEntry 
          operation={ OPERATIONS.CREATE_PHOTO } 
          collection={ COLLECTIONS.GALLERY }
          formTemplate={createPhoto } 
          label={ true } 
        /> } 
    />
  );
  // update photo entry view
  const updatePhotoEntryModal = (
    toggleModal[OPERATIONS.UPDATE_PHOTO] && 
      <PhotoEntryModal  
        modalTitle={ MODAL_TITLES[OPERATIONS.UPDATE_PHOTO] }
        collection={ COLLECTIONS.GALLERY } 
        closeModal={ OPERATIONS.UPDATE_PHOTO } 
        modalContent={
          <CreateUpdatePhotoEntry 
            operation={ OPERATIONS.UPDATE_PHOTO } 
            collection={ COLLECTIONS.GALLERY }
            formTemplate={ updatePhoto } 
            label={ true } 
          /> }
      /> 
  );
  // map view 
  const mapViewModal = (
    toggleModal[OPERATIONS.MAP_VIEW] && 
      <PhotoEntryModal 
        modalTitle={ MODAL_TITLES[OPERATIONS.MAP_VIEW] }
        modalContent={ <MapModal /> } 
        contentStyle='shared-page-container--with-padding' 
        closeModal={ OPERATIONS.MAP_VIEW } 
      />
  );

  // photo view 
  const photoViewModal = (
    toggleModal[OPERATIONS.FULLSCREEN_VIEW] && 
      <PhotoEntryModal 
        modalTitle={ MODAL_TITLES[OPERATIONS.FULLSCREEN_VIEW] }
        modalContent={ <FullScreenView /> } 
        contentStyle='shared-modal-content--centered' 
        closeModal={ OPERATIONS.FULLSCREEN_VIEW } 
      />
  )    
  // photo info view
  const infoViewModal = (
    toggleModal[OPERATIONS.PHOTO_INFO_VIEW] && 
    <PhotoEntryModal 
      modalTitle={ MODAL_TITLES[OPERATIONS.PHOTO_INFO_VIEW] }
      modalContent={ <PhotoInfo displayTimestamp /> } 
      contentStyle='shared-page-container--with-padding' 
      closeModal={ OPERATIONS.PHOTO_INFO_VIEW } 
    /> 
  )




















  return { createPhotoEntryModal, updatePhotoEntryModal, mapViewModal, photoViewModal, infoViewModal } 
}
