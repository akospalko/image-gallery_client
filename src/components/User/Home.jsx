import React, {useState, useEffect} from 'react'
import './Home.css'
import '../Shared.css'
import {useFormContext } from '../contexts/FormContext'
import {getAllHomePhotos} from '../../helper/axiosRequests'
import axios from '../../helper/axiosInstances'
import Loader from '../SVG/Loader'
import useHideImagesWhileLoading from '../hooks/useHideImagesWhileLoading'
import SkeletonHome from '../../skeletons/SkeletonHome'
import Carousel from './Carousel'
import HomePhoto from './HomePhoto'

export default function Home() {
  // CONTEXT
  const {homePhotos, setHomePhotos} = useFormContext();
  // HOOK
  const {allImagesLoaded, hideImageStyle, setCurrentlyLoadingImages, getImageFile} = useHideImagesWhileLoading();
  // STATE
  const [isLoading, setIsLoading] = useState(true);
  // EFFECT
   useEffect(() => {  
    if(!isLoading) return; // get home photos only when data is not yet loaded   
      (async () => {
        const response = await getAllHomePhotos(axios); // fetch entries, update state
        response.success ? setHomePhotos(response?.photoEntries) : setHomePhotos(null) // set state with fetched photo-s || []  
        setIsLoading(false); 
      })() 
  }, []) 
  // RENDERED ELEMENTS
  // loader
  const loader = (
    <div className='shared-page-container shared-page-container--centered'>
      <Loader height='50%' width='50%'/>
    </div>
  )
  // photo placeholder if fetch was unsuccessfull && no data
  const photoPlaceholder = (
    <div className='home-photo photo-placeholder'>
      <span> error displaying images </span>
    </div>
  )
  // photo carousel with rendered home photos
  const carousel = (
    <Carousel hideImageStyle={hideImageStyle} >
      { homePhotos && homePhotos.map(photo => (
        <HomePhoto 
          key={photo._id} 
          photo={photo} 
          getImageFile={getImageFile} 
          setCurrentlyLoadingImages={setCurrentlyLoadingImages}
        /> 
      ))}
    </Carousel>
  )
  // display photo || skeleton loader
  const photos =  ( 
    <>
      {/* SkeletonLoader for photo */}
      {!allImagesLoaded && <SkeletonHome/>}
      {/* Photo carousel */}
      { homePhotos && homePhotos.length && carousel }
    </>
  )
  // home page content
  const home = (
    <>
      {/* Header title */}
      <div className='home-title'>
        <h1> Photo Gallery </h1>
      </div>
      { homePhotos && homePhotos.length > 0 ? photos : photoPlaceholder }
      {/* Subtitle */}
      <div className='home-subtitle'>
        <p> footages for you </p>
      </div>
    </>
  ) 
  return (
    <div className='shared-page-container shared-page-container--centered'>
      {isLoading ? loader : home}
    </div>
  )
}