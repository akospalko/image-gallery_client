// User view photo gallery and user collection logic
import React from 'react'
import '../Shared.css'
import PhotoEntries from './PhotoEntries'
import UserCollectionPhotoEntries from './UserCollectionPhotoEntries'
import {OPERATIONS, MODAL_TITLES} from '../../helper/dataStorage'
import PhotoEntryModal from '../Modals/PhotoEntryModal'
import { useModalContext } from '../contexts/ToggleModalContext'
import MapModal from '../Modals/MapModal'
import FullScreenView from '../Modals/FullScreenView'
import PhotoInfo from '../Modals/PhotoInfo'

export default function Gallery({isUserCollection}) {
  // PROPS: isUserCollection - display user collection || gallery
  // CONTEXT
  const {toggleModal} = useModalContext();
  return (
    <div className='shared-page-container'>
      {/* Title */}
      <h1> {isUserCollection ? 'My Collection' : 'Gallery' } </h1>  
      {/* Photo entries */}
      {isUserCollection ? <UserCollectionPhotoEntries/> : <PhotoEntries/>}
      {/* Modals */}
      {/* map view */}
      { toggleModal[OPERATIONS.MAP_VIEW] && 
        <PhotoEntryModal 
          modalTitle={ MODAL_TITLES[OPERATIONS.MAP_VIEW] }
          modalContent={ <MapModal/> } 
          contentStyle='shared-page-container--with-padding' 
          closeModal={ OPERATIONS.MAP_VIEW } 
        /> }
      {/* Photo view */}
      { toggleModal[OPERATIONS.FULLSCREEN_VIEW] && 
        <PhotoEntryModal 
          modalTitle={ MODAL_TITLES[OPERATIONS.FULLSCREEN_VIEW] }
          modalContent={ <FullScreenView/> } 
          contentStyle='shared-modal-content--centered' 
          closeModal={ OPERATIONS.FULLSCREEN_VIEW } 
        /> }
      {/* Photo entry info */}
      { toggleModal[OPERATIONS.PHOTO_INFO_VIEW] && 
        <PhotoEntryModal 
          modalTitle={ MODAL_TITLES[OPERATIONS.PHOTO_INFO_VIEW] }
          modalContent={ <PhotoInfo displayTimestamp/> } 
          contentStyle='shared-page-container--with-padding' 
          closeModal={ OPERATIONS.PHOTO_INFO_VIEW } 
        /> }
    </div>
  )
}