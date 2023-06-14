// Landing page with photo carousel display 
import React, { useState, useEffect } from 'react'
import './Home.css'
import '../Shared.css'
import { useFormContext } from '../contexts/FormContext'
import { getAllHomePhotos } from '../../helper/axiosRequests'
import axios from '../../helper/axiosInstances'
import LoaderIcon from '../SVG/Loader'
import useHideImagesWhileLoading from '../hooks/useHideImagesWhileLoading'
import SkeletonHome from '../../skeletons/SkeletonHome'
import Carousel from './Carousel'
import HomePhoto from './HomePhoto'
import Button from '../UI/Button'
import { useNavigate } from 'react-router'
import { useAuthContext } from '../contexts/AuthenticationContext'
import useResponsiveBackground from '../../components/hooks/useResponsiveBackground';

export default function Home() {
  // CONSTANTS
  // ROUTE
  const navigate =  useNavigate(); 
  // CONTEXT
  const { homePhotos, setHomePhotos } = useFormContext();
  const { auth } = useAuthContext();
  // HOOK
  const { allImagesLoaded, hideImageStyle, setCurrentlyLoadingImages, onLoadHandler} = useHideImagesWhileLoading();
  const { pageBackground } = useResponsiveBackground();

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
    <div className='shared-page-container shared-page-container--centered shared-page-container--with-padding'>   
    <LoaderIcon height='100px' width='100px' stroke='var(--text-color--high-emphasis)'/>
    </div>
  )

  // photo placeholder failed fetch || no data
  const photoPlaceholder = (
    <div className='home-photo'>
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
          onLoadHandler={onLoadHandler}
          setCurrentlyLoadingImages={setCurrentlyLoadingImages}
        /> 
      )) }
    </Carousel>
  )
  // display photo || skeleton loader
  const photos =  ( 
    <>
      { /* SkeletonLoader for photo */ }
      { !allImagesLoaded && <SkeletonHome/> }
      { /* Photo carousel */ }
      { homePhotos && homePhotos.length && carousel }
    </>
  )
  // home page content
  const home = (
    <div style={ pageBackground } className='shared-page-container shared-page-container--centered shared-page-container--with-padding'>
      <div className='home-container'>
        {/* Header */}
        <div className='home-header'>
          {/* title */}
          <div className='home-title'>
            <h1> Photo Gallery </h1>
          </div>
          {/* subtitle */}
          <div className='home-subtitle'>
            <span> footages for you </span>
          </div>
        </div>
        {/* Photo carousel / placeholder */}
        <div className={ `home-photo ${ homePhotos && homePhotos.length > 0 ? '' : 'photo-placeholder' }` }>
          { homePhotos && homePhotos.length > 0 ? photos : photoPlaceholder }
        </div>
        { /* Button container */ }
        <div className='home-button'>
          <Button clicked={ () => navigate(auth.userID ? `/${auth.username}/gallery` : '/login') } buttonStyle='button-home-cta'>
            <span> Visit Gallery </span>
          </Button>
        </div>
      </div>
    </div>
  ) 

  return (
    <>
      { isLoading ? loader : home }
    </>
  )
}