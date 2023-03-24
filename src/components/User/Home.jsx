import React, {useState, useEffect} from 'react'
import './Home.css'
import '../Shared.css'
import PhotoSlider from './PhotoSlider'
import useBreakpoints from '../hooks/useBreakpoints'
import {useFormContext } from '../contexts/FormContext'
import { getAllHomePhotos } from '../../helper/axiosRequests'
import axios from '../../helper/axiosInstances'
import Loader from '../SVG/Loader'

export default function Home() {
  // CONTEXT
  const {homePhotos, setHomePhotos} = useFormContext();
  // HOOK
  const {active} = useBreakpoints();
  // STATE
  const [isLoading, setIsLoading] = useState(false);
  // EFFECT
   useEffect(() => {  
     // TODO: maybe should use isFetched state instead of checking for arr.length
     if(homePhotos.length > 0) return; // get all home photos if photo container is empty
     setIsLoading(true);
     (async () => {
      const response = await getAllHomePhotos(axios); // fetch entries, update state
      console.log(response);
      if(response?.success) {
      } else {
        // nav to error pge
      }
      setIsLoading(false); 
      setHomePhotos(response?.photoEntries); // store entries in state
    })() 
  }, [homePhotos, isLoading]) 
 
  // STYLES
  // media query for parent width (required for slider responsive design) 
  let activeParentSize = {
    width: 300,
    height: 300,
  };
  switch(active) {
    case 'isMobile_250':
      activeParentSize = {
        width: 250,
        height: 450,
      };
      break;
    case 'isMobile_300':
      activeParentSize = {
        width: 290,
        height: 450,
      };
      break;
    case 'isMobile_350':
      activeParentSize = {
        width: 350,
        height: 450,
      };
      break;
    case 'isMobile_350_750':
      activeParentSize = {
        width: 350,
        height: 400,
      };
      break;
    case 'isMobile_400':
      activeParentSize = {
        width: 400,
        height: 500,
      };
      break;
    case 'isMobile_500':
      activeParentSize = {
        width: 480,
        height: 550,
      };
      break;
    case 'isTablet_750':
      activeParentSize = {
        width: 740,
        height: 550,
      };
      break;
    case 'isPC_1080':
      activeParentSize = {
        width: 1000,
        height: 600,
      };
      break;
      default:
        activeParentSize = {
          width: 300,
          height: 300,
        };
      break;
  }
  const loader = (
    <div className='shared-page-container shared-page-container--centered'>
      <Loader height='50%' width='50%'/>
    </div>
  )
 const photos = (
  <div className='shared-page-container shared-page-container--centered'>
    <div className='home-title'>
      <h1> Photo Gallery </h1>
    </div>
    <div className='home-photo-slider' style={{margin: '0 auto', height: `${activeParentSize.height}px`, width: `${activeParentSize.width}px`}}>
      <PhotoSlider slides={homePhotos} parentWidth={activeParentSize.width} />
    </div>
    <div className='home-subtitle'>
      <p> footages for you </p>
    </div>
  </div>
 ) 
  return (
    <>
    {/* {homePhotos && homePhotos.length > 0 ? photos : loader} */}
    {isLoading ? loader : photos}
    </>
    
  )
}