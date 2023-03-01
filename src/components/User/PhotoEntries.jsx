import React, {useEffect} from 'react'
import '../Shared.css'
import './PhotoEntries.css'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Button from '../UI/Button';
import {useFormContext} from '../contexts/FormContext'
import {useModalContext} from '../contexts/ToggleModalContext';
import {getAllImageEntries} from '../../helper/axiosRequests'

export default function PhotoEntries({collection}) {
  // CONTEXT
  const {data, setData, setMessage} = useFormContext();
  const {toggleModalHandler, setActiveID, setID} = useModalContext();


  // HOOK
  const axiosPrivate = useAxiosPrivate();
  // EFFECT
  useEffect(() => { // get all data on initial render
    (async () => {
      try {
        const response = await getAllImageEntries(axiosPrivate, collection); // fetch entries, update state  
        setData(response.imageEntries); // store entries in state
        setMessage(response.message); // set message
      } catch(error) {
        // navToPrevPage(); // navigate unauth user back to login page
      }
    })() 
  }, []) 


  // 0 photo enty container
  // 1
  const title = (entryTitle) => (
    <div className='photo-entry-title'>
      {/* dummy */}
      <div className='photo-entry-title-dummy'></div>
      {/* title */}
      <p> {entryTitle} </p>
      {/* info */}
      {/* TODO: add modal toggle handler */}
      <div className='photo-entry-title-info'> {'->'} </div> 
    </div>
  )
  // 2
  const photo = (entryPhoto) => (
    <div className='photo-entry-photo' style={{backgroundImage: `url(${entryPhoto})`}}> </div> // photo
  )
  // 3
  const additionalInfo = (likeCount = 0, captureDate) => (
    <div className='photo-entry-additional-info'>
      {/* display likes */}
      <div className='photo-entry-additional-info-like-count'
      > {`${likeCount} ${likeCount > 0 ? 'likes' : 'like'}`} </div>
      {/* photo capture date */}  {/* TODO: convert date */}
      <div className='photo-entry-additional-info-capture-date'> {captureDate} </div>
    </div>
  )
  // 4
  const controlPanel = (entryID) => (
    <div className='photo-entry-control-panel'>
      {/* Like, Map, View */}
      <Button 
        customStyle={'image-control-panel'}
        // clicked={}
      > Like </Button>
      {/* delete */}
      {/* view photo */}
      <Button 
        customStyle={'image-control-panel'}
        clicked={() => {
          setID(entryID)
          toggleModalHandler('viewImage') }}
      > View </Button>
      {/* map */}
      <Button 
        customStyle={'image-control-panel'}
        clicked={() => {
          setID(entryID)
          toggleModalHandler('viewMap') }}
      > Map </Button>
    </div>
  )

  return (
    <div className='shared-page-container'>
      {data && data.map(photoEntry => (
        <div key={photoEntry._id} className='photo-entry-container'> 
          {title(photoEntry.title)}
          {photo(photoEntry.imageURL)}
          {/* additional info */}
          {additionalInfo(10, photoEntry.captureDate)}
          {controlPanel(photoEntry._id)}
        </div>
      ))}
    </div>
  )
}


