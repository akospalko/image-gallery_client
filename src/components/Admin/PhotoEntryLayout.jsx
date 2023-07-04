// Layout templates for Photo entries content
// Used in: admin view gallery/home, photo info modal
import React from 'react';
import ToggleText from '../ToggleText';
import PhotoEntryContentUEM from './PhotoEntryContentUEM';
import { transformDate } from '../../helper/utilities';

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
    inCollection
  } = activePhotoEntry || {};
  
  // CONTENT MODULES
  const idContent = { // id
    name: 'id', // entry's name used as key
    data: _id, //  entry content data
    title: 'photo entry id', // on hover elem - info about the record
    label: 'ID', // displayed label
    // labelStyle: 'pe-layout-content--border-top', // custom style for label 
    // dataStyle: 'pe-layout-content--border-top' // custom style for data 
  }
  // const titleContent = {
  //   name: 'title', 
  //   data: title,
  //   title: 'photo title', 
  //   label: 'Title',
  // };
  const titleContentInfo = { // photo info page
    name: 'title', 
    data: title,
    title: 'photo title', 
    label: 'Title',
    labelStyle: 'pe-layout-content--margin-top-double',
    dataStyle: 'pe-layout-content--margin-top-double' 
  };
  const titleContentAdmin = { 
    name: 'title', 
    data: title, 
    title: 'photo title',
    label: 'Title',
  };
  const authorContent = { 
    name: 'author', 
    data: author,
    title: 'the person who captured the photo',
    label: 'Author',
  };
  const captureDateContent = {  
    name: 'captureDate', 
    data: transformDate(captureDate, '-', '.'),
    title: 'photo capture date',
    label: 'Captured',
  };
  const gpsLatitudeContent = { 
    name: 'gpsLatitude', 
    data: gpsLatitude, 
    title: 'geographic coordinate: latitude', 
    label: 'GPS lat',
  };
  const gpsLongitudeContent = { 
    name: 'gpsLongitude', 
    data: gpsLongitude, 
    title: 'geographic coordinate: longitude', 
    label: 'GPS lon',
  };
  const descriptionContent = { 
    name: 'description', 
    data: <ToggleText text={ description } />, 
    title: 'few words about the photo', 
    label: 'Description',
    recordStyle: 'pe-layout-content-record--auto-height',  // custom style for record 
    labelStyle: 'pe-layout-content-label--vertical-text',
    dataStyle: 'pe-layout-content-data--description' 
  };
  const uemContent = { 
    name: 'uem', 
    data: <PhotoEntryContentUEM collectedUEM={ { likes, inCollection } } />, 
    title: 'User engagement metrics', 
    label: 'Metrics',
    recordStyle: 'pe-layout-content-record--auto-height', 
    dataStyle: 'pe-layout-content-data--uem pe-layout-content--height-75px'
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
    descriptionContent,
    uemContent
  ];
  // photo entry info view
  const photoEntryLayoutAdmin = [
    idContent,
    titleContentAdmin, // removes border top when mapping admin content
    authorContent,
    captureDateContent,
    gpsLatitudeContent,
    gpsLongitudeContent,
    descriptionContent,
    uemContent
  ];

  return { photoEntryLayoutInfo, photoEntryLayoutAdmin }
}