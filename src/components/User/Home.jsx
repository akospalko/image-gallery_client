// Landing page with photo carousel display 
import React, { useState, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server';
import './Home.css'
import '../Shared.css'
import {useFormContext } from '../contexts/FormContext'
import {getAllHomePhotos} from '../../helper/axiosRequests'
import axios from '../../helper/axiosInstances'
import LoaderIcon from '../SVG/Loader'
import useHideImagesWhileLoading from '../hooks/useHideImagesWhileLoading'
import SkeletonHome from '../../skeletons/SkeletonHome'
import Carousel from './Carousel'
import HomePhoto from './HomePhoto'
import Button from '../UI/Button'
import { useNavigate } from 'react-router'
import { useAuthContext } from '../contexts/AuthenticationContext'
import { useMediaQuery } from 'react-responsive';
import { BlobLandscapeBackground, BlobPortraitBackground } from '../SVG/Backgrounds';
import { useThemeContext } from '../contexts/ThemeContext';

export default function Home() {
  // CONSTANTS
  // get css colors vars to pass to svg component as prop
  const colorMain = getComputedStyle(root).getPropertyValue('--bg-color--main');
  const colorTernary = getComputedStyle(root).getPropertyValue('--bg-color--ternary-transparent-high');
  // ROUTE
  const navigate =  useNavigate(); 
  // CONTEXT
  const { homePhotos, setHomePhotos } = useFormContext();
  const { auth } = useAuthContext();
  const { theme } = useThemeContext();
  // HOOK
  const { allImagesLoaded, hideImageStyle, setCurrentlyLoadingImages, getImageFile, onLoadHandler} = useHideImagesWhileLoading();
  const isLargeScreen = useMediaQuery({ query: '(min-width: 768px)' });
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

  useEffect(() => {console.log(colorMain, colorTernary)}, [theme])

  // RENDERED ELEMENTS
  // BACKGROUND
  // Set up responsive background
  const backgroundComponents = (
    <>
      {isLargeScreen ? (
        // Landscape for tablet/pc view
        <BlobLandscapeBackground color1={colorMain} color2={colorTernary} />
        ) : (
        // Portrait for mobile view
        <BlobPortraitBackground  color1={colorMain} color2={colorTernary} />
      )}
    </>
  )
  // Convert svg component to string 
  const renderedBackground = encodeURIComponent(ReactDOMServer.renderToString(backgroundComponents));
  // Define background as inline style
  const modalBackground = {
    backgroundPosition: 'center', 
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url("data:image/svg+xml, ${renderedBackground}")`,
    backgroundColor: 'var(--bg-color--main)'
  }

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
          getImageFile={getImageFile} 
          onLoadHandler={onLoadHandler}
          setCurrentlyLoadingImages={setCurrentlyLoadingImages}
        /> 
      )) }
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
    <div style={modalBackground} className='shared-page-container shared-page-container--centered shared-page-container--with-padding'>
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
        <div className={`home-photo ${homePhotos && homePhotos.length > 0 ? '' : 'photo-placeholder'}`}>
          { homePhotos && homePhotos.length > 0 ? photos : photoPlaceholder }
        </div>
        {/* Button container */}
        <div className='home-button'>
          <Button clicked={() => navigate(auth.userID ? `/${auth.username}/gallery` : '/login')} buttonStyle='button-home-cta'>
            <span> Visit Gallery </span>
          </Button>
        </div>
      </div>
    </div>
  ) 

  return (
    <>
      {isLoading ? loader : home}
    </>
  )
}
