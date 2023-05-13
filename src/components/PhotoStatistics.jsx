// TODO: remove unecessary icons
// Basic statistics component about photo: number of authors, locations, photos   
import React, { useState, useEffect } from 'react';
import {useFormContext} from './contexts/FormContext'
import { PhotographerMaleIcon, PhotoEntryIcon, PhotoEntryIcon2, LocationsIcon, LocationsIcon2 } from './SVG/Icons';
import './PhotoStatistics.css'

export default function PhotoStatistics() {
  // TEMPLATE
  const statisticsTemplate = [
    {name: 'photos', icon: <PhotoEntryIcon2 height='100%' width='100%' />, amount: 0}, // add icon: <icon/> // photos w + w/o coordinates
    {name: 'locations', icon: <LocationsIcon2 height='100%' width='100%' /> , amount: 0}, // photos w coordinates
    {name: 'authors', icon: <PhotographerMaleIcon height='100%' width='100%' />, amount: 0}
  ]
  // STATE
  const [statistics, setStatistics] = useState(statisticsTemplate);
  // CONTEXT
  const {data} = useFormContext();
  // EFFECT
  // calculate statistics on first render
  useEffect(() => {
    if (!data) return;
    setStatistics(prev => {
      let statsCopy = [...prev]; // create state copy
      let authors = []; // store unique authors (no duplicate values)
      statsCopy = statsCopy.map(stat => {
        // copied (update) obj
        const statCopy = { ...stat };
        data.forEach(entry => {
          // update statistics based on entry content
          if (statCopy.name === 'photos') {
            statCopy.amount++; // calc photos: total No. entries
          } else if (statCopy.name === 'locations' && (entry?.gpsLatitude && entry?.gpsLongitude)) {
            statCopy.amount++; // calc locations: entries with lat-long coord.s
          } else if (statCopy.name === 'authors' && !authors.includes(entry.author)) {
            // calc authors
            authors = [...authors, entry.author];
            statCopy.amount++;
          }
        });
        return statCopy;
      });
      return statsCopy;
    });
    return () => {setStatistics(statisticsTemplate)} 
  }, []) 

return (
    <div className='statistics-container'>
      {/* title */}
      <h2> Overall statistics </h2>
      {/* statistics card */}
      <div className='statistics-card'>
        {statistics.map(stat => (
        <div key={stat.name} title={`number of ${stat.name}`} className='statistics-elem'>
          <div className='statistics-icon'> {stat?.icon} </div>
          <div className='statistics-label'> 
            <span> {stat.amount} </span> 
            <span> {stat.name} </span> 
          </div>
        </div>
        ))}
        </div>
    </div> 
  )
}