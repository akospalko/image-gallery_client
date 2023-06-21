// Get modal related data, set up & return modal
// used with photo entries (admin / user) 
import React from 'react';
import { OPERATIONS, MODAL_TITLES, createPhoto, updatePhoto } from '../../helper/dataStorage';
import PhotoEntryModal from '../Modals/PhotoEntryModal';
import CreateUpdatePhotoEntry from '../Modals/CreateUpdatePhotoEntry';
import MapModal from '../Modals/MapModal';
import FullScreenView from '../Modals/FullScreenView';
import PhotoInfo from '../Modals/PhotoInfo';

export default function useSetUpModal(toggleModal, collection='none') {
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
          collection={ collection }
          formTemplate={ createPhoto } 
          label={ true } 
        /> } 
    />
  );
  // update photo entry view
  const updatePhotoEntryModal = (
    toggleModal[OPERATIONS.UPDATE_PHOTO] && 
      <PhotoEntryModal  
        modalTitle={ MODAL_TITLES[OPERATIONS.UPDATE_PHOTO] }
        collection={ collection } 
        closeModal={ OPERATIONS.UPDATE_PHOTO } 
        modalContent={
          <CreateUpdatePhotoEntry 
            operation={ OPERATIONS.UPDATE_PHOTO } 
            collection={ collection }
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
        containerStyle='shared-modal--map-view'
        headerStyle='shared-modal-header--map-view'
        contentStyle='shared-modal-content--map-view' 
        closeModal={ OPERATIONS.MAP_VIEW } 
      />
  );

  // photo fullscreen view 
  const photoViewModal = (
    toggleModal[OPERATIONS.FULLSCREEN_VIEW] && 
      <PhotoEntryModal 
        // modalTitle={ MODAL_TITLES[OPERATIONS.FULLSCREEN_VIEW] }
        modalContent={ <FullScreenView /> } 
        contentStyle='shared-modal-content--photo-view'
        closeModal={ OPERATIONS.FULLSCREEN_VIEW } 
      />
  )  

  // photo fullscreen view with return button (used: map overview)
  const photoViewWithReturnButtonModal = (
    toggleModal[OPERATIONS.FULLSCREEN_VIEW] && 
      <PhotoEntryModal 
        modalContent={ <FullScreenView /> } 
        closeModal={ OPERATIONS.FULLSCREEN_VIEW } 
        contentStyle='shared-modal-content--photo-view'
        returnToModal={ OPERATIONS.PHOTO_INFO_VIEW }
      /> 
  )

  // photo info view
  const infoViewModal = (
    toggleModal[OPERATIONS.PHOTO_INFO_VIEW] && 
    <PhotoEntryModal 
      modalTitle={ MODAL_TITLES[OPERATIONS.PHOTO_INFO_VIEW] }
      modalContent={ <PhotoInfo displayTimestamp /> } 
      containerStyle='shared-modal--photo-info'
      headerStyle='shared-modal-header--info-view'
      contentStyle='shared-modal-content--photo-info'
      closeModal={ OPERATIONS.PHOTO_INFO_VIEW } 
    /> 
  )

  // photo info view with additional button to display photo modal (used: map overview)
  const infoViewWithPhotoDisplayModal = (
    toggleModal[OPERATIONS.PHOTO_INFO_VIEW] && 
      <PhotoEntryModal 
      modalTitle={ MODAL_TITLES[OPERATIONS.PHOTO_INFO_VIEW] }
      modalContent={ <PhotoInfo displayPhotoView displayTimestamp/> } 
      containerStyle='shared-modal--photo-info'
      headerStyle='shared-modal-header--info-view'
      contentStyle='shared-modal-content--photo-info'
      closeModal={ OPERATIONS.PHOTO_INFO_VIEW } 
    /> 
  )

  return {
    createPhotoEntryModal, 
    updatePhotoEntryModal, 
    mapViewModal,
    photoViewModal, photoViewWithReturnButtonModal,
    infoViewModal, infoViewWithPhotoDisplayModal
  } 
}