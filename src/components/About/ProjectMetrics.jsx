// Display basic metrics about the project: number of authors, locations, photos, likes, items in collection etc   
import React, { useState, useEffect } from 'react';
import './About.css';
import { 
  PhotoIcon,
  PhotoCollectionIcon,
  PhotoLikedIcon,
  PhotoDownloadIcon,
  PhotoLocationIcon,
  PhotoAuthorIcon } from '../SVG/Icons';
import { CONSTANT_VALUES } from '../../helper/constantValues';
import { getProjectMetrics } from '../../helper/axiosRequests';
import axios from '../../helper/axiosInstances';

export default function ProjectMetrics() {
  // TEMPLATE
  const metricsTemplate = [
    { // all photos 
      name: 'photos', 
      label: 'all photos',
      title: 'number of photos you can explore', 
      icon: <PhotoIcon height='100%' width='100%' />, amount: 0 
    }, 
    { // amount of times a photo was added to user's collection 
      name: 'collectionized', 
      label: 'in collection',
      title: 'number of times a photo was added to the user\'s collection', 
      icon: <PhotoCollectionIcon height='100%' width='100%' />, amount: 0 
    },
    { // amount of times a photo was added to user's collection 
      name: 'likes', 
      label: 'liked',
      title: 'number of photo likes',
      icon: <PhotoLikedIcon height='100%' width='100%' />, amount: 0 
    }, 
    { // amount of times a photo was added to user's collection 
      name: 'downloads', 
      label: 'downloads',
      title: 'number of photo downloads', 
      icon: <PhotoDownloadIcon height='100%' width='100%' />, amount: 0 
    },
    { // photos with geolocation
      name: 'locations', 
      label: 'locations',
      title: 'number of photos with geolocation (gps coordinates)', 
      icon: <PhotoLocationIcon height='120%' width='120%' /> , amount: 0 }, 
    { // photographers 
      name: 'authors', 
      label: 'authors',
      title: 'photographer, artist, creator', 
      icon: <PhotoAuthorIcon height='120%' width='120%' />, amount: 0 
    },
  ];

  // STATE 
  const [ metrics, setMetrics ] = useState(metricsTemplate); // store project metrics data 

  // EFFECT
  // fetch project metrics, update state
  useEffect(() => {  
      (async () => {
        try {
          // update local metrics (state with initialized template) with fetched metrics data (amount)
          const response = await getProjectMetrics(axios); // fetch entries, update state
          if(response && response.success) {
            const fetchedMetrics = response?.metrics; 
            setMetrics(prevMetrics => {
              let metricsCopy = [ ...prevMetrics ]; // create state copy
              metricsCopy = metricsCopy.map(localMetric => {
                const metricCopy = { ...localMetric };
                fetchedMetrics.forEach( fetchedMetric => {
                  if (localMetric.name === fetchedMetric.name ) {
                    localMetric.amount = fetchedMetric.value
                  }
                });
                return metricCopy;
              });
              return metricsCopy;
            })
          } else { // fetch unsuccessful
            console.log(response.message);
          }
        } catch (error) {
          console.log(error);
        }
      })() 
  }, []) 

return (
    <div className='about-project-metrics'>
      { /* title */ }
      <h2> { CONSTANT_VALUES.TITLE_ABOUT_PROJECT_METRICS } </h2>
      { /* statistics card */ }
      <div className='about-project-metrics-cards'>
        { metrics.map( card => (
        <div key={ card.name } title={ card.title } className='about-project-metrics-card'>
          <div className='about-project-metrics-cards-icon'> { card?.icon } </div>
          <div className='about-project-metrics-cards-label'> 
            <span> { card.amount } </span> 
            <span> { card.label } </span> 
          </div>
        </div>
        )) }
      </div>
    </div> 
  )
}