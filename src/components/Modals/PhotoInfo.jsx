// Display info about the currently opened modal 
import React from 'react'
import '../Shared.css'
import '../Admin/PhotoEntries.css'
import {useModalContext} from '../contexts/ToggleModalContext'
import Timestamp from '../Timestamp'
import PhotoEntryContentElement from '../PhotoEntryContentElement'
import { transformDate } from '../../helper/dateUtilities'
import Button from '../UI/Button'
import { OPERATIONS } from '../../helper/dataStorage'
import { ViewPhoto } from '../SVG/Icons'
import ToggleText from '../ToggleText'

export default function PhotoInfo({displayPhotoView, displayTimestamp}) {
  // PROPS
  // displayPhotoView - display button to view photo
  // displayTimestamp - display timestamp
  // HOOKS
  // CONTEXTS
  const {activePhotoEntry, toggleModalHandler} = useModalContext();
  const {title, author, captureDate, description, gpsLatitude, gpsLongitude, createdAt, updatedAt} = activePhotoEntry || {};
  // TEMPLATE
  // template used to map out photo entry content for info modal
  const photoEntryTemplate = [
    { // title
      name: 'title', // entry's name used as key
      data: title, // 
      title: 'photo title', // on hover elem - info about the record
      label: 'Title' ,
      dataPositionTreshold: 40,
      labelStyle: 'photo-entry-content--border-right', 
    }, { // author
      name: 'author', 
      data: author,
      title: 'the person who captured the photo',
      label: 'Author',
      dataPositionTreshold: 45,
      labelStyle: 'photo-entry-content--border-right',
    }, {  // capture date
      name: 'captureDate', 
      data: transformDate(captureDate, '-', '.'),
      title: 'photo capture date',
      label: 'Captured',
      labelStyle: 'photo-entry-content--border-right',
    }, { // gpsLatitude
      name: 'gpsLatitude', 
      data: gpsLatitude, 
      title: 'geographic coordinate: latitude', 
      label: 'GPS lat',
      labelStyle: 'photo-entry-content--border-right', 
    }, { // gpsLongitude
      name: 'gpsLongitude', 
      data: gpsLongitude, 
      title: 'geographic coordinate: longitude', 
      label: 'GPS lon',
      labelStyle: 'photo-entry-content--border-right', 
    }, { // description
      name: 'description', 
      data: <ToggleText text={description} />, 
      title: 'few words about the photo', 
      label: 'Description',
      dataPositionTreshold: 40,
      labelStyle: 'photo-entry-content--border-bottom photo-entry-content--border-right',
      recordStyle: '_photo-entry-content-record--description', 
      dataStyle: '_photo-entry-content-data--description' 
    }
  ];
  // ELEMENTS
  // open view photo modal
  const viewPhotoButton = (
    displayPhotoView && 
    <Button 
      buttonStyle='button-photo-info' 
      clicked={ () => {
        toggleModalHandler(OPERATIONS.PHOTO_INFO_VIEW, false);
        toggleModalHandler(OPERATIONS.FULLSCREEN_VIEW);} } 
    > 
      <ViewPhoto height='30px' width='30px' fill='var(--text-color--high-emphasis)'/> 
      <span>  View Photo </span> 
    </Button>
  )
  // photo info records 
  const photoContent = (
    <>
      {photoEntryTemplate?.map(record => (
        <PhotoEntryContentElement
          key={record?.name}
          title={record?.title} 
          label={record?.label} 
          data={record?.data} 
          dataPositionTreshold={record?.dataPositionTreshold}
          labelStyle={record?.labelStyle}
          recordStyle={record?.recordStyle}
          dataStyle={record?.dataStyle}
        /> )
      )}
      { displayTimestamp && <Timestamp dateCreation={createdAt} dateLastUpdate={updatedAt} customStyle='timestamp-container--photo-info' /> }
    </>
  )
 

  return (
    <div className="_photo-entry-container"> 
      {/* VIEW PHOTO BUTTON */}
      {viewPhotoButton}
      {/* CONTENT */}
      {photoContent}
    </div>
  )
}