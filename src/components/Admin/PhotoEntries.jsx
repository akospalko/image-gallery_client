import React from 'react'
import './PhotoEntries.css'
import {useFormContext} from '../contexts/FormContext'
import PhotoEntry from './PhotoEntry'

export default function PhotoEntries({collection}) {
  // CONTEXTS
  const {data} = useFormContext();
  // RENDERED ELEMENTS
  // conditionally render page content: can't display content/ empty list / display content
  let photoEntries = (data && data.map(photoEntry => { return <PhotoEntry key={photoEntry._id} collection={collection} photoEntry={photoEntry} /> }))
  if(!data || typeof data === 'undefined') {
    photoEntries = <h4> Could not display photo entries </h4>
  } else if (data && data.length < 1) {
    photoEntries = <h4> Your list is empty </h4>
  }
  return (
    <div className='photo-entries-admin-container'>
      {photoEntries}
    </div>
  )
}