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
  const [isLoading, setIsLoading] = useState(false);
  // EFFECT
   useEffect(() => {  
     // TODO: maybe should use isFetched state instead of checking for arr.length
     if(homePhotos.length > 0) return; // get all home photos if photo container is empty
     setIsLoading(true);  
     (async () => {
      const response = await getAllHomePhotos(axios); // fetch entries, update state
      setHomePhotos(response?.photoEntries); // store entries in state
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
  // photo carousel with rendered home photos
  const carousel = (
    <Carousel hideImageStyle={hideImageStyle} >
      { homePhotos && homePhotos.map(photo => (
        <HomePhoto 
          key={photo._id} 
          photo={photo} 
          getImageFile={getImageFile} 
          hideImageStyle={hideImageStyle} 
          setCurrentlyLoadingImages={setCurrentlyLoadingImages}
        /> 
      ))}
    </Carousel>
  )
  // home 
  const home = (
    <>
      {/* Header title */}
      <div style={hideImageStyle} className='home-title'>
        <h1> Photo Gallery </h1>
      </div>
      {/* Skeleton loader */}
      {!allImagesLoaded && <SkeletonHome/>}
      {carousel}
      {/* Subtitle */}
      <div style={hideImageStyle} className='home-subtitle'>
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