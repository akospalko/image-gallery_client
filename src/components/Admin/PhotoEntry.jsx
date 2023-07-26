// Admin mode photo entry content 
import React from 'react';
import './PhotoEntries.css';
import '../Shared.css';
import 'react-toastify/dist/ReactToastify.css';
import PhotoEntryControlPanel from './PhotoEntryControlPanel';
import Timestamp from '../Timestamp';
import PhotoEntryContentElement from './PhotoEntryContentElement';
import PhotoEntryLayout from './PhotoEntryLayout';

const PhotoEntry = ({ collection, photoEntry }) => {
  // PROPS
  const { createdAt, updatedAt } = photoEntry ?? {};

  // LAYOUT TEMPLATE
  // photo entry admin layout  
  const { photoEntryLayoutAdmin } = PhotoEntryLayout(photoEntry); 
  
  // ELEMENTS
  // Photo entry content 
  const photoEntryContent = (
    <>
      { photoEntryLayoutAdmin?.map(record => (
        <PhotoEntryContentElement
          key={ record?.name }
          id={ record?.id }
          title={ record?.title } 
          label={ record?.label } 
          data={ record?.data } 
          labelStyle={ record?.labelStyle }
          recordStyle={ record?.recordStyle }
          dataStyle={ record?.dataStyle }
        /> )
      ) }
      <Timestamp 
        dateCreation={ createdAt } 
        dateLastUpdate={ updatedAt } 
        customStyle='timestamp-container--layout' 
        customContentStyle='timestamp-content--layout' 
      />
    </>
  )

  return (
    <div className='pe-layout-container pe-layout-container--admin'>
      { /* Control panel */ }
      <PhotoEntryControlPanel collection={ collection } photoEntry={ photoEntry } />
      { /* Content */ }
      { photoEntryContent }
    </div>
  )
}

export default React.memo(PhotoEntry);