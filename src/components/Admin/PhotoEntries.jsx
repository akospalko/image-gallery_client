// Display photo entries for admin view
import React from 'react';
import './PhotoEntries.css'
import { useFormContext } from '../contexts/FormContext';
import PhotoEntry from './PhotoEntry';
import { CONSTANT_VALUES } from '../../helper/constantValues';

export default function PhotoEntries({ collection }) {
  // CONTEXTS
  const { data } = useFormContext();
  
  // ELEMENTS
  // Conditional page content: display/error/empty 
  let photoEntries = ( data && data.map( photoEntry => <PhotoEntry key={ photoEntry._id } collection={ collection } photoEntry={ photoEntry } /> ))
  if(!data || typeof data === 'undefined') {
    photoEntries = <h4> { CONSTANT_VALUES.INFO_PHOTO_ENTRY_ERROR } </h4>
  } else if (data && data.length < 1) {
    photoEntries = <h4> { CONSTANT_VALUES.INFO_PHOTO_ENTRY_EMPTY } </h4>
  }
  
  return <div className='pes-layout-container'> { photoEntries } </div>
}