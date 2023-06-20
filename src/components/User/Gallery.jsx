// User view photo gallery page
import React from 'react';
import '../Shared.css';
import PhotoEntriesGallery from './PhotoEntriesGallery';
import { useModalContext } from '../contexts/ToggleModalContext';
import useSetUpModal from '../hooks/useSetUpModal';
import { CONSTANT_VALUES } from '../../helper/constantValues';

export default function Gallery() {
  // CONTEXT
  const { toggleModal } = useModalContext();
  
  // HOOK
  const { mapViewModal, photoViewModal, infoViewModal } = useSetUpModal(toggleModal);
 
  return (
    <div className='shared-page-container'>
      { /* Header title */ }
      <div className='shared-header-wrapper'> 
        <h1> { CONSTANT_VALUES.TITLE_GALLERY_USER } </h1>  
      </div> 
      { /* Photo entries */ }
      <PhotoEntriesGallery /> 
      { /* Modals */ }
      { mapViewModal }
      { photoViewModal }
      { infoViewModal } 
    </div>
  )
}