// display photo gallery and user collection
import React from 'react'
import '../Shared.css'
import PhotoEntries from './PhotoEntries'
import UserCollectionPhotoEntries from './UserCollectionPhotoEntries'
import PhotoEntryModalGroup from './PhotoEntryModalGroup'

export default function Gallery({isUserCollection}) {
  return (
    <div className='shared-page-container'>
      {/* title */}
      <h1> {isUserCollection ? 'My Collection' : 'Gallery' } </h1>  
      {/* photo entries */}
      <div className='shared-image-cards-container'>
        {isUserCollection ? <UserCollectionPhotoEntries/> : <PhotoEntries/>}
      </div>
      {/* modals: map, view, view post/details */}
      <PhotoEntryModalGroup/>
    </div>
  )
}