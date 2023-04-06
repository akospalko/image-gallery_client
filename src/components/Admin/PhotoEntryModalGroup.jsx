// modals for user view (gallery) (edit, view, delete, map)
import React from 'react'
import {useModalContext} from '../contexts/ToggleModalContext'
import PhotoEntryModal from './PhotoEntryModal';
import {OPERATIONS} from '../../helper/dataStorage';
import { createPhoto, updatePhoto } from '../../helper/dataStorage';

export default function PhotoEntryModalGroup({collection}) {
  // CONTEXT
  const {toggleModal} = useModalContext();

  return (
    <>
      {toggleModal.CREATE_PHOTO ? <PhotoEntryModal collection={collection} operation={OPERATIONS.CREATE_PHOTO} formTemplate={createPhoto} /> : null }
      {toggleModal.UPDATE_PHOTO ? <PhotoEntryModal collection={collection} operation={OPERATIONS.UPDATE_PHOTO} formTemplate={updatePhoto} /> : null }
      {toggleModal.FULLSCREEN_VIEW ? <PhotoEntryModal collection={collection} operation={OPERATIONS.FULLSCREEN_VIEW}/> : null }
      {toggleModal.MAP_VIEW ? <PhotoEntryModal collection={collection} operation={OPERATIONS.MAP_VIEW}/> : null }
    </> 
  )
}