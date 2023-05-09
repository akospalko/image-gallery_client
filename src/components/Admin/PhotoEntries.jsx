import React from 'react'
import './PhotoEntries.css'
import {useFormContext} from '../contexts/FormContext'
import PhotoEntry from './PhotoEntry'

export default function PhotoEntries({collection}) {
  // CONTEXTS
  const {data} = useFormContext();
  // ELEMENTS
  //  conditional page content: display/error/empty 
  let photoEntries = (data && data.map(photoEntry => <PhotoEntry key={photoEntry._id} collection={collection} photoEntry={photoEntry} />))
  if(!data || typeof data === 'undefined') {
    photoEntries = <h4> Could not display photo entries </h4>
  } else if (data && data.length < 1) {
    photoEntries = <h4> Your list is empty </h4>
  }
  
  return <div className='photo-entries-container'> {photoEntries} </div>
}