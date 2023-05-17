// Admin mode photo entry content 
import React from 'react';
import './PhotoEntries.css';
import '../Shared.css';
import 'react-toastify/dist/ReactToastify.css';
import { transformDate } from '../../helper/utilities';
import PhotoEntryContentElement from '../PhotoEntryContentElement';
import PhotoEntryControlPanel from './PhotoEntryControlPanel';
import Timestamp from '../Timestamp';
import ToggleText from '../ToggleText';

const PhotoEntry = ({collection, photoEntry}) => {
  // PROPS
  const {title, description, createdAt, captureDate, updatedAt, _id:id, gpsLatitude, gpsLongitude, author} = photoEntry ?? {};
  // TEMPLATE
  // template used to map out photo entry content
  const photoEntryTemplate = [
    { // id
      name: 'id', // entry's name used as key
      data: id, // 
      title: 'photo entry id', // on hover elem - info about the record
      label: 'ID' ,
      dataPositionTreshold: 40,
      labelStyle: 'photo-entry-content--border-left', 
    }, { // title
      name: 'title', // entry's name used as key
      data: title, // 
      title: 'photo title', // on hover elem - info about the record
      label: 'Title' ,
      dataPositionTreshold: 40,
      labelStyle: 'photo-entry-content--border-left', 
    }, { // author
      name: 'author', 
      data: author,
      title: 'the person who captured the photo',
      label: 'Author',
      dataPositionTreshold: 45,
      labelStyle: 'photo-entry-content--border-left',
    }, {  // capture date
      name: 'captureDate', 
      data: transformDate(captureDate, '-', '.'),
      title: 'photo capture date',
      label: 'Captured',
      labelStyle: 'photo-entry-content--border-left',
    }, { // gpsLatitude
      name: 'gpsLatitude', 
      data: gpsLatitude, 
      title: 'geographic coordinate: latitude', 
      label: 'GPS lat',
      labelStyle: 'photo-entry-content--border-left', 
    }, { // gpsLongitude
      name: 'gpsLongitude', 
      data: gpsLongitude, 
      title: 'geographic coordinate: longitude', 
      label: 'GPS lon',
      labelStyle: 'photo-entry-content--border-left', 
    }, { // description
      name: 'description', 
      data: <ToggleText text={description} />, 
      title: 'few words about the photo', 
      label: 'Description',
      dataPositionTreshold: 40,
      recordStyle: '_photo-entry-content-record--description', 
      labelStyle: 'photo-entry-content-label--vertical-text',
      dataStyle: '_photo-entry-content-data--description photo-entry--border-bottom-0 photo-entry-content--height-150px' 
    }
  ];
  // ELEMENTS
  // photo entry content 
  const photoEntryContent = (
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
      <Timestamp dateCreation={createdAt} dateLastUpdate={updatedAt} customStyle='timestamp-container--photo-info' />
    </>
  )

  return (
    <div className='_photo-entry-container _photo-entry-container--admin'>
      {/* CONTROL PANEL */}
      <PhotoEntryControlPanel collection={collection} photoEntry={photoEntry} />
      {/* CONTENT */}
      {photoEntryContent}
    </div>
  )
}

export default React.memo(PhotoEntry); // NOTE: memo won't work here as long as each refetch will have a freshly signed img url