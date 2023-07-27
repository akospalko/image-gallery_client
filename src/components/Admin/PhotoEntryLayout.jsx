// Layout templates for Photo entries content
// Used in: admin view gallery/home, photo info modal
import React from 'react';
import ToggleText from '../ToggleText';
import PhotoEntryContentUEM from './PhotoEntryContentUEM';
import { transformDate } from '../../helper/utilities';

// Photo entry layout text data wrapper
const TextData = ({ data }) => {
  return ( <span> { data } </span> );
}

export default function PhotoEntryLayout(activePhotoEntry) {
  // PROPS
  const {
    _id,
    title, 
    author, 
    captureDate, 
    description, 
    gpsLatitude, 
    gpsLongitude, 
    likes,
    inCollection,
    downloads
  } = activePhotoEntry || {};
  
  // CONTENT MODULES
  const idContent = { // id
    name: 'id', // entry's name used as key
    data: <TextData data={ _id } />, // entry content data
    title: 'photo entry id', // on hover elem - info about the record
    label: 'ID', // displayed label
  }

  const titleContentInfo = { // photo info page
    name: 'title', 
    data: <TextData data={ title } />,
    title: 'photo title', 
    label: 'Title',
  };
  const titleContentAdmin = { 
    name: 'title', 
    data: <TextData data={ title } />, 
    title: 'photo title',
    label: 'Title',
  };
  const authorContent = { 
    name: 'author', 
    data: <TextData data={ author } />,
    title: 'the person who captured the photo',
    label: 'Author',
  };
  const captureDateContent = {  
    name: 'captureDate', 
    data: <TextData data={ transformDate(captureDate, '-', '.')  } />,
    title: 'photo capture date',
    label: 'Captured',
  };
  const gpsLatitudeContent = { 
    name: 'gpsLatitude', 
    data: <TextData data={ gpsLatitude.toFixed(2) } />, 
    title: 'GPS latitude(°) in WGS 1984 coordinate system' ,
    label: 'Lat.°',
  };
  const gpsLongitudeContent = { 
    name: 'gpsLongitude', 
    data: <TextData data={ gpsLongitude.toFixed(2) } />, 
    title: 'GPS longitude(°) in WGS 1984 coordinate system', 
    label: 'Lon.°',
  };
  const descriptionContent = { 
    id: 'description',
    name: 'description', 
    data: <ToggleText text={ description } />, 
    title: 'few words about the photo', 
    label: 'Description',
  };
  const uemContent = { 
    id: 'uem',
    name: 'uem', 
    data: <PhotoEntryContentUEM collectedUEM={ { likes, inCollection, downloads } } />, 
    title: 'User engagement metrics', 
    label: 'Metrics',
  };
  
  // TEMPLATES
  // Layout 1 
  // photo entry admin view
  const photoEntryLayoutInfo = [
    titleContentInfo,
    authorContent,
    captureDateContent,
    gpsLatitudeContent,
    gpsLongitudeContent,
    uemContent,
    descriptionContent,
  ];
  // photo entry info view
  const photoEntryLayoutAdmin = [
    idContent,
    titleContentAdmin, // removes border top when mapping admin content
    authorContent,
    captureDateContent,
    gpsLatitudeContent,
    gpsLongitudeContent,
    uemContent,
    descriptionContent,
  ];

  return { photoEntryLayoutInfo, photoEntryLayoutAdmin }
}