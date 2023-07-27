// Landing page with photo carousel display 
import React, { useEffect } from 'react'
import './Home.css'
import '../Shared.css'
import { getAllHomePhotos } from '../../helper/axiosRequests'
import axios from '../../helper/axiosInstances'
import useHideImagesWhileLoading from '../hooks/useHideImagesWhileLoading'
import SkeletonHome from '../../skeletons/SkeletonHome'
import Carousel from './Carousel'
import HomePhoto from './HomePhoto'
import Button from '../UI/Button'
import { useNavigate } from 'react-router'
import { useAuthContext } from '../contexts/AuthenticationContext'
import useResponsiveBackground from '../../components/hooks/useResponsiveBackground';
import { useDataContext } from '../contexts/DataContext';
import { CONSTANT_VALUES } from '../../helper/constantValues'

export default function Home() {
  // CONSTANTS
  // ROUTE
  const navigate =  useNavigate(); 
  // CONTEXT
  const { homePhotos, setHomePhotos } = useDataContext();
  const { auth } = useAuthContext();
  // HOOK
  const { allImagesLoaded, hideImageStyle, setCurrentlyLoadingImages, onLoadHandler} = useHideImagesWhileLoading();
  const { pageBackground } = useResponsiveBackground();

  // EFFECT
  useEffect(() => {  
  if(homePhotos?.length) return; // fetch photos if photo storage is empty  
    (async () => {
      const response = await getAllHomePhotos(axios); // fetch entries, update state
      response.success ? setHomePhotos(response?.photoEntries) : setHomePhotos(null) // set state with fetched photo-s || []  
    })() 
}, []) 
  
  // photo placeholder failed fetch || no data
  const photoPlaceholder = (
    <div className='home-photo'>
      <span> { CONSTANT_VALUES.INFO_FAIL_TO_DISPLAY_IMGS } </span>
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
 
  return (
    // home page content
    <div style={ pageBackground } className='shared-page-container shared-page-container--centered shared-page-container--with-padding'>
      <div className='home-container'>
        {/* Header */}
        <div className='home-header'>
          {/* title */}
          <div className='home-title'>
            <h1> { CONSTANT_VALUES.TITLE_HOME_USER } </h1>
          </div>
          {/* subtitle */}
          <div className='home-subtitle'>
            <span> { CONSTANT_VALUES.SUBTITLE_HOME_USER } </span>
          </div>
        </div>
        {/* Photo carousel / placeholder */}
        <div className={ `home-photo ${ homePhotos && homePhotos.length > 0 ? '' : 'photo-placeholder' }` }>
          { homePhotos && homePhotos.length > 0 ? photos : photoPlaceholder }
        </div>
        { /* Button container */ }
        <div className='home-button'>
          <Button clicked={ () => navigate(auth.userID ? `/${ auth.username }/gallery` : '/login') } buttonStyle='button-home-cta'>
            <span> { CONSTANT_VALUES.BUTTON_VISIT_GALLERY } </span>
          </Button>
        </div>
      </div>
    </div> 
  )
}