// Landing/home page with photo carousel display 
import React from 'react'
import './Home.css'
import '../Shared.css'
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
  // ROUTE
  const navigate = useNavigate(); 
  
  // CONTEXT
  const { homePhotos, isLoadingData } = useDataContext();
  const { auth } = useAuthContext();
  
  // HOOK
  const { allImagesLoaded, hideImageStyle, setCurrentlyLoadingImages, onLoadHandler} = useHideImagesWhileLoading();
  const { pageBackground } = useResponsiveBackground();

  // photo placeholder failed fetch || no data
  const photoPlaceholder = (
    <div className='home-photo'>
      <h3> { CONSTANT_VALUES.INFO_FAIL_TO_DISPLAY_IMGS } </h3>
    </div>
  )
  // photo carousel with rendered home photos
  const carousel = (
    <Carousel hideImageStyle={ hideImageStyle } >
      { homePhotos && homePhotos.map(photo => (
        <HomePhoto 
          key={ photo._id } 
          photo={ photo } 
          onLoadHandler={ onLoadHandler }
          setCurrentlyLoadingImages={ setCurrentlyLoadingImages}
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
  
  // ELEMENTS
  // Header
  const header = (
    <div className='home-header'>
      {/* title */}
      <div className='home-title'>
        <h1> { CONSTANT_VALUES.TITLE_HOME_USER } </h1>
      </div>
      {/* subtitle */}
      <div className='home-subtitle'>
        <h3> { CONSTANT_VALUES.SUBTITLE_HOME_USER } </h3>
      </div>
    </div>
  )
  // Carousel photos || placeholder
  const displayedPhotos = (
    <div className={ `home-photo ${ isLoadingData && homePhotos && homePhotos?.length > 0 ? '' : 'photo-placeholder' }` }>
      { isLoadingData ? <SkeletonHome/> : homePhotos && homePhotos?.length > 0 ? photos : photoPlaceholder }
    </div>
  )

  // CTA button
  const ctaButton = (
    <div className='home-button'>
      <Button clicked={ () => navigate(auth.userID ? `/${ auth.username }/gallery` : '/login') } buttonStyle='button-home-cta'>
        <span> { CONSTANT_VALUES.BUTTON_VISIT_GALLERY } </span>
      </Button>
    </div>
  )

  return (
    // home page content
    <article style={ pageBackground } className='shared-page-container shared-page-container--with-padding'>
      <div className='home-container'>
        {/* Header */}
        { header }
        {/* Photo carousel / placeholder */}
        { displayedPhotos }
        { /* Button container */ }
        { ctaButton }
      </div>
    </article> 
  )
}