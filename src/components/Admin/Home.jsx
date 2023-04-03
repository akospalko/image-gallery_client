// content management for home photo collection 
import React, {useEffect} from 'react'
import '../Shared.css'
import Button from '../UI/Button'
import PhotoEntries from './PhotoEntries'
import {useModalContext} from '../contexts/ToggleModalContext'
import PhotoEntryModalGroup from './PhotoEntryModalGroup'
import {COLLECTIONS, OPERATIONS} from '../../helper/dataStorage'
import {useFormContext} from '../contexts/FormContext'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import {getAllHomePhotos} from '../../helper/axiosRequests'

export default function Home() {
  // CONTEXT
  const {toggleModalHandler} = useModalContext();
  const {setData} = useFormContext();
  // HOOK
  const axiosPrivate = useAxiosPrivate();
  // EFFECT
  useEffect(() => { // get all data on initial render
    (async () => {
      try {
        console.log('fetch home')
        const response = await getAllHomePhotos(axiosPrivate); // fetch entries, update state  
        console.log(response);
        setData(response.photoEntries); // store entries in state
      } catch(error) {
        navToPrevPage(); // navigate unauth user back to login page
      }
    })() 
  }, []) 

  return (
    <div className='shared-page-container'>
      {/* header title */}
      <h1> Home Dashboard </h1>  
      {/* add new photo entry button */}
      <Button 
        clicked={() => toggleModalHandler(OPERATIONS.CREATE_PHOTO)} 
        customStyle='photo-new'
      > Create Photo Entry 
      </Button>
      {/* photo cards container */}
      <div className='shared-image-cards-container'>
        <PhotoEntries collection={COLLECTIONS.HOME} /> 
      </div>
      {/* control group modals */}
      <PhotoEntryModalGroup collection={COLLECTIONS.HOME}/>
    </div>
  )
}