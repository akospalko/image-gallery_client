// add more stats: likes sum, collectionized items sum
// create separate state to store fetched stats 
// TODO: remove unecessary icons
// TODO: calc stats on backend

// Display basic metrics about the project: number of authors, locations, photos   
import React, { useState, useEffect } from 'react';
import './About.css';
import { useFormContext } from '../contexts/FormContext'
import { PhotographerMaleIcon, PhotoEntryIcon, PhotoEntryIcon2, LocationsIcon, LocationsIcon2 } from '../SVG/Icons';
import { CONSTANT_VALUES } from '../../helper/constantValues';
export default function ProjectMetrics() {
  // CONSTANTS && TEMPLATE
  // template
  const statisticsTemplate = [
    { name: 'photos', icon: <PhotoEntryIcon2 height='100%' width='100%' />, amount: 0 }, // add icon: <icon/> // photos w + w/o coordinates
    { name: 'locations', icon: <LocationsIcon2 height='100%' width='100%' /> , amount: 0 }, // photos w coordinates
    { name: 'authors', icon: <PhotographerMaleIcon height='100%' width='100%' />, amount: 0 },
  ];

  // STATE 
  const [ statistics, setStatistics ] = useState(statisticsTemplate);
  
  // CONTEXT
  const { data } = useFormContext();
  
  // EFFECT
  // calculate statistics on first render
  useEffect( () => {
    if (!data) return;
    setStatistics( prev => {
      let statsCopy = [ ...prev ]; // create state copy
      let authors = []; // store unique authors (no duplicate values)
      statsCopy = statsCopy.map(stat => {
        // copied (update) obj
        const statCopy = { ...stat };
        data.forEach( entry => {
          // update statistics based on entry content
          if (statCopy.name === 'photos') {
            statCopy.amount++; // calc photos: total No. entries
          } else if (statCopy.name === 'locations' && (entry?.gpsLatitude && entry?.gpsLongitude)) {
            statCopy.amount++; // calc locations: entries with lat-long coord.s
          } else if (statCopy.name === 'authors' && !authors.includes(entry.author)) {
            // calc authors
            authors = [ ...authors, entry.author ];
            statCopy.amount++;
          }
        });
        return statCopy;
      });
      return statsCopy;
    });
    return () => { setStatistics(statisticsTemplate) } 
  }, []) 

return (
    <div className='about-project-metrics'>
      { /* title */ }
      <h2> { CONSTANT_VALUES.TITLE_ABOUT_PROJECT_METRICS } </h2>
      {/* TODO: basic intro what this article is */}
      { /* statistics card */ }
      <div className='about-project-metrics-cards'>
        { statistics.map( card => (
        <div key={ card.name } title={ `number of ${ card.name }` } className='about-project-metrics-card'>
          <div className='about-project-metrics-cards-icon'> { card?.icon } </div>
          <div className='about-project-metrics-cards-label'> 
            <span> { card.amount } </span> 
            <span> { card.name } </span> 
          </div>
        </div>
        )) }
      </div>
    </div> 
  )
}