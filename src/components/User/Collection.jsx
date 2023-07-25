// User view photo collection page
import React from 'react';
import '../Shared.css';
import PhotoEntriesCollection from './PhotoEntriesCollection';
import { useModalContext } from '../contexts/ToggleModalContext';
import useSetUpModal from '../hooks/useSetUpModal';
import { CONSTANT_VALUES } from '../../helper/constantValues';

export default function Collection() {
  // CONTEXT
  const { toggleModal } = useModalContext();
  
  // HOOK
  const { mapViewModal, photoViewModal, infoViewModal } = useSetUpModal(toggleModal);
  /* centered vertically */

  return (
    <div className='shared-page-container shared-page-container--align-items-center'>
      { /* Header title */ }
      <div className='shared-header-wrapper'> 
        <h1> { CONSTANT_VALUES.TITLE_MY_COLLECTION } </h1>  
      </div> 
      { /* Photo entries */ }
      <PhotoEntriesCollection />
      { /* Modals */ }
      { mapViewModal }
      { photoViewModal }
      { infoViewModal } 
    </div>
  )
}