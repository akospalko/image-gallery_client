// grouping of modals used with img entries control groups (edit, view, delete, map)
import React from 'react'
import {useModalContext} from '../contexts/ToggleModalContext'
import ImageEntryModal from './ImageEntryModal';

export default function ImageEntryModalGroup({collection}) {
  // CONTEXT
  const {toggleModal, toggleModalHandler} = useModalContext();

  return (
    <>
      {toggleModal.createImage ? <ImageEntryModal collection={collection} operation ='createImage' toggleHandler={toggleModalHandler} /> : null }
      {toggleModal.updateImage ? <ImageEntryModal collection={collection} operation ='updateImage' toggleHandler={toggleModalHandler} /> : null }
      {toggleModal.viewImage ? <ImageEntryModal collection={collection} operation ='viewImage' toggleHandler={toggleModalHandler} /> : null }
      {toggleModal.viewMap ? <ImageEntryModal collection={collection} operation ='viewMap' toggleHandler={toggleModalHandler} /> : null }
    </>
  )
}