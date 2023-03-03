import React, {useEffect} from 'react'
import './PhotoEntries.css'
import '../Shared.css'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Button from '../UI/Button';
import {useFormContext} from '../contexts/FormContext'
import {useModalContext} from '../contexts/ToggleModalContext';
import {getAllImageEntries} from '../../helper/axiosRequests'
// import {useNavigate, useLocation} from 'react-router'
import {OPERATIONS} from '../../helper/dataStorage';

export default function PhotoEntries({collection}) {
  // ROUTING
  const navToPrevPage = () => navigate('/login', { state: {from: location}, replace: true});
  // CONTEXT
  const {data, setData, setMessage} = useFormContext();
  const {toggleModalHandler, setActiveID, setID} = useModalContext();
  // HOOK
  const axiosPrivate = useAxiosPrivate();
  // EFFECT
  useEffect(() => { // get all data on initial render
    (async () => {
      try {
        const response = await getAllImageEntries(axiosPrivate, collection); // fetch entries, update state  
        setData(response.imageEntries); // store entries in state
        setMessage(response.message); // set message
      } catch(error) {
        navToPrevPage(); // navigate unauth user back to login page
      }
    })() 
  }, []) 

  // STYLES
  // NOTE: for some elements class selectors didn't apply. I solved the problem in these cases using inline styles.
  const photoStyle = (entryPhoto) => ({ 
    display: 'flex',
    height: '450px',
    position: 'relative',
    width: '100%',
    backgroundImage: `url(${entryPhoto})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center'
  })
  const captureDateStyle = { 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '30px',
    fontSize: '0.75rem',
    position: 'absolute', 
    bottom: 0, 
    right: 0,
    padding: 'var(--padding-default)',
    backgroundColor: 'rgba(0, 0, 0, 0.15)'
  }
  const photoLikesStyle = { 
    display: 'flex',
    height: '30px',
    alignItems: 'center',
    width: '100%',
    fontSize: '0.75rem',
    paddingLeft: 'calc(2 * var(--padding-default))'
  }
  const controlPanelStyle = {
    display:'flex',
    height: '40px',
    width: '100%',    
    flexDirection: 'row',
  }
  // ELEMENTS
  const title = (entryTitle) => (
    <div className='photo-entry-title'>
      <p> {entryTitle} </p>
    </div>
  )
  const photo = (entryPhoto, captureDate) => (
    <div className='photo-entry-photo' style={photoStyle(entryPhoto)}>
      <div className='photo-entry-capture-date' style={captureDateStyle}> 
        <strong> {captureDate} </strong>  
      </div>
    </div> 
  )  
  const photoLikes = (likeCount = 0) => (
    // display likes
    <div style={photoLikesStyle}> 
      <b>{`${likeCount} ${likeCount > 0 ? 'likes' : 'like'}`}</b>
    </div>
  )
  const controlPanel = (entryID) => (
    <div style={controlPanelStyle} className='photo-entry-control-panel'>
      {/* group 1 */}
      <span className='photo-entry-control-panel--1'> 
        <Button 
          customStyle={'control-panel-view'}
          // clicked={}
        > Like </Button>
        {/* view photo */}
        <Button 
          customStyle={'control-panel-view'}
          clicked={() => {
            setID(entryID)
            toggleModalHandler(OPERATIONS.FULLSCREEN_VIEW)}}
        > View </Button>
        {/* map */}
        <Button 
          customStyle={'control-panel-view'}
          clicked={() => {
            setID(entryID)
            toggleModalHandler(OPERATIONS.MAP_VIEW)}}
        > Map </Button>
      </span>
      {/* group 2 */}
      <span className='photo-entry-control-panel--2'> 
        {/* info */}
        <Button 
          customStyle={'control-panel-view'}
          clicked={() => {
            setID(entryID)
            toggleModalHandler(OPERATIONS.PHOTO_INFO_VIEW)}}
        > Info </Button>
      </span>
    </div>
  )

  return (
    <div className='photo-entries-container'>
      {data && data.map(photoEntry => (
        <div key={photoEntry._id} className='photo-entry-container'> 
          {title(photoEntry.title)}
          {photo(photoEntry.imageURL, photoEntry.captureDate)}
          {photoLikes()}
          {controlPanel(photoEntry._id)}
        </div>
      ))}
    </div>
  )
}