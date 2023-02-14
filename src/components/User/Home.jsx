import React from 'react'
import './Home.css'
import '../Shared.css'
import PhotoSlider from './PhotoSlider'
import {temporarySlides} from '../../helper/dataStorage'
import useBreakpoints from '../hooks/useBreakpoints'

export default function Home() {
  // HOOK
  const {active} = useBreakpoints();
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
  console.log(active);
  return (
    <div className='shared-page-container shared-page-container--centered '>
      <div className='home-title'>
        <h1> Photo Gallery </h1>
      </div>
      <div className='home-photo-slider' style={{margin: '0 auto', height: `${activeParentSize.height}px`, width: `${activeParentSize.width}px`}}>
        <PhotoSlider slides={temporarySlides} parentWidth={activeParentSize.width} />
      </div>
      <div className='home-subtitle'>
        <p> footages for you </p>
      </div>
    </div>
  )
}