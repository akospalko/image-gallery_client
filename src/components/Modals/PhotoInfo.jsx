// TODO: handle empty data fields
// TODO: make jsx more reusable by mapping through vlaues ??? 
// add img view button
import React from 'react'
import './PhotoInfo.css'
import '../Shared.css'
import {useModalContext} from '../contexts/ToggleModalContext'
import Timestamp from '../Timestamp'
import PhotoEntryContentElement from '../Admin/PhotoEntryContentElement'
import { transformDate } from '../../helper/dateUtilities'
import Button from '../UI/Button'
import { OPERATIONS } from '../../helper/dataStorage'
import { ViewPhoto } from '../SVG/Icons'


export default function PhotoInfo() {
  // CONTEXTS
  const {activePhotoEntry, toggleModalHandler} = useModalContext();
  console.log(activePhotoEntry)
  const {title, author, captureDate, description, gpsLatitude, gpsLongitude, createdAt, updatedAt} = activePhotoEntry ?? {};
  
  const photoContent = (
    <div className="_photo-entry-container"> 
      {/* View Photo Button */}
      <Button buttonStyle='button-photo-info' clicked={ () => {
        toggleModalHandler(OPERATIONS.PHOTO_INFO_VIEW, false);
        toggleModalHandler(OPERATIONS.FULLSCREEN_VIEW); }} 
      > <ViewPhoto height='30px' width='30px' fill='var(--text-color--high-emphasis)'/> 
        <span>  View Photo </span> 
      </Button>
      {/* Title */}
      <PhotoEntryContentElement
        title='photo title' 
        label='Title' 
        data={title} 
        dataPositionTreshold={40} 
        labelStyle='photo-entry-content--border-right'
        />
      {/* Author */}
      <PhotoEntryContentElement
        title='the person who captured the photo' 
        label='Author' data={author} 
        dataPositionTreshold={45} 
        labelStyle='photo-entry-content--border-right'
      />
      {/* Capture date */}
      <PhotoEntryContentElement
        title='time when photo was captured' 
        label='Captured' 
        data={transformDate(captureDate, '-', '.')} 
        labelStyle='photo-entry-content--border-right' 
      />
      {/* GPS latitude */}
      <PhotoEntryContentElement
        title='geographic coordinate: latitude' 
        label='GPS lat' 
        data={gpsLatitude} 
        labelStyle='photo-entry-content--border-right' 
      />
      {/* GPS longitude */}
      <PhotoEntryContentElement
        title='geographic coordinate: longitude' 
        label='GPS lon' 
        data={gpsLongitude} 
        labelStyle='photo-entry-content--border-right' 
      />
      {/* Description */}
      <PhotoEntryContentElement
        title='a few words about the photo' 
        label='Description' 
        data={description} 
        dataPositionTreshold={40} 
        labelStyle='photo-entry-content-label--vertical-text photo-entry-content--border-bottom photo-entry-content--border-right'
        recordStyle='_photo-entry-content-record--description' 
        dataStyle='_photo-entry-content-data--description' 
      />
      <Timestamp dateCreation={createdAt} dateLastUpdate={updatedAt} customStyle='timestamp-container--photo-info' />
    </div>
  );

return photoContent;
}