import React from 'react'
import '../Shared.css'
import FullScreenView from '../Modals/FullScreenView'
import MapView from '../Modals/MapView'
import PhotoInfo from '../Modals/PhotoInfo'
import ModalHeader from '../Modals/ModalHeader'
import {MODAL_TITLES, OPERATIONS} from '../../helper/dataStorage'

export default function PhotoEntryModal({operation}) {
  // RENDERED ELEMENTS  
  // view entry's photo
  const fullScreenViewModal = <FullScreenView/>;
  // view map if entry has coordinates 
  const mapViewModal = <MapView/>
  // view information about the photo
  const photoInfoViewModal = <PhotoInfo/>

  // RENDER MODALS CONDITIONALLY 
  let renderModal; // currently active/displayed modal
  let modalTitle = operation ? MODAL_TITLES[operation] : '';
  switch(operation) {
    case OPERATIONS.FULLSCREEN_VIEW:
      renderModal = fullScreenViewModal;
      break; 
    case OPERATIONS.MAP_VIEW:
      renderModal = mapViewModal;
      break; 
    case OPERATIONS.PHOTO_INFO_VIEW:
      renderModal = photoInfoViewModal;
      break; 
    default:
      renderModal = <p> couldn't display modal </p>;
  }

  return (
    <div className='shared-modal-backdrop'>
      <div className='shared-modal'>
        {/* modal header */}
        <div className='shared-modal-header'> 
          <ModalHeader title={modalTitle} operation={operation} />
        </div>
        {/* modal content */}
        <div className='shared-modal-content'>
          {renderModal}
        </div>
      </div>
    </div>
  )
}