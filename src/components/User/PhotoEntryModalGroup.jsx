// modals for user view (gallery): (view, map, info)
import React from 'react'
import {useModalContext} from '../contexts/ToggleModalContext'
import PhotoEntryModal from '../User/PhotoEntryModal';
import {OPERATIONS} from '../../helper/dataStorage';

export default function PhotoEntryModalGroup() {
  // CONTEXT
  const {toggleModal} = useModalContext();

  return (
    <>
      {toggleModal.FULLSCREEN_VIEW ? <PhotoEntryModal operation={OPERATIONS.FULLSCREEN_VIEW}/> : null }
      {toggleModal.MAP_VIEW ? <PhotoEntryModal operation={OPERATIONS.MAP_VIEW}/> : null }
      {toggleModal.PHOTO_INFO_VIEW ? <PhotoEntryModal operation={OPERATIONS.PHOTO_INFO_VIEW}/> : null }
    </> 
  )
}