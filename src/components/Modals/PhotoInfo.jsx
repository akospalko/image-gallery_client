// Display info about the photo entry 
import React from 'react';
import '../Shared.css';
import '../Admin/PhotoEntries.css';
import Timestamp from '../Timestamp';
import PhotoEntryContentElement from '../Admin/PhotoEntryContentElement';
import { OPERATIONS } from '../../helper/dataStorage';
import { CONSTANT_VALUES } from '../../helper/constantValues';
import { ViewPhoto } from '../SVG/Icons';
import Button from '../UI/Button';
import { useModalContext } from '../contexts/ToggleModalContext';
import PhotoEntryLayout from '../Admin/PhotoEntryLayout';

export default function PhotoInfo({ displayPhotoView, displayTimestamp }) {
  // CONTEXTS
  const { activePhotoEntry, toggleModalHandler } = useModalContext();
  const { createdAt, updatedAt } = activePhotoEntry || {};
  
  // LAYOUT TEMPLATE
  // get photo entry layout1 template 
  const { photoEntryLayoutInfo } = PhotoEntryLayout(activePhotoEntry); 
  
  // ELEMENTS
  // open modal: view photo 
  const viewPhotoButton = (
    displayPhotoView && 
    <Button 
      buttonStyle='button-photo-info' 
      clicked={ () => {
        toggleModalHandler(OPERATIONS.PHOTO_INFO_VIEW, false);
        toggleModalHandler(OPERATIONS.FULLSCREEN_VIEW); } } 
    > 
      <ViewPhoto height='30px' width='30px' fill='var(--text-color-light--high-emphasis)'/> 
      <span> { CONSTANT_VALUES.BUTTON_PHOTO_VIEW } </span> 
    </Button>
  )
  // photo info records 
  const photoContent = (
    <>
      { photoEntryLayoutInfo?.map(record => (
        <PhotoEntryContentElement
          key={ record?.name }
          title={ record?.title } 
          label={ record?.label } 
          data={ record?.data } 
          labelStyle={ record?.labelStyle }
          recordStyle={ record?.recordStyle }
          dataStyle={ record?.dataStyle }
        /> )
      )}
      { displayTimestamp && <Timestamp dateCreation={ createdAt } dateLastUpdate={ updatedAt } customStyle='timestamp-container--layout' /> }
    </>
  )

  return (
    <div className="pe-layout-container"> 
      { /* VIEW PHOTO BUTTON */ }
      { viewPhotoButton }
      { /* CONTENT */ }
      { photoContent }
    </div>
  )
}