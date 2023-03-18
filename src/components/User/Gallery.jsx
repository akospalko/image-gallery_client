//form to create/update photo entries
import React from 'react'
import '../Shared.css'
import PhotoEntries from './PhotoEntries'
import {COLLECTIONS} from '../../helper/dataStorage'
import PhotoEntryModal from './PhotoEntryModalGroup'

export default function Gallery() {
  return (
    <div className='shared-page-container'>
      {/* title */}
      <h1> Gallery </h1>  
      {/* photo entries */}
      <div className='shared-image-cards-container'>
        <PhotoEntries collection={COLLECTIONS.GALLERY} />
      </div>
      {/* modals: map, view, view post/details */}
      <PhotoEntryModal collection={COLLECTIONS.GALLERY}/>
    </div>
  )
}