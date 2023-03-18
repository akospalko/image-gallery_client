import React, {useCallback, useState} from 'react'
import './PhotoEntries.css'
import '../Shared.css'
import Button from '../UI/Button';
import {useFormContext} from '../contexts/FormContext'
import {useModalContext} from '../contexts/ToggleModalContext';
import {addPhotoEntryToCollection, removePhotoEntryFromCollection, getUserCollectionPhotoEntries} from '../../helper/axiosRequests'
import {useNavigate, useLocation} from 'react-router'
import {OPERATIONS} from '../../helper/dataStorage';
import {useAuthContext} from '../contexts/AuthenticationContext';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const PhotoEntry = ({photoEntry, collection}) => {
  // PROPS
  const {title, photoURL, captureDate, _id, isInCollection } = photoEntry;
  const [isToggled, setIsToggled] = useState(false);
  // CONTEXT
  const {setData, setMessage} = useFormContext();
  const {toggleModalHandler, setID} = useModalContext();
  const {auth} = useAuthContext(); 
  // HOOK
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  // NAVIGATION
  const navToPrevPage = () => navigate('/login', {state: {from: location}, replace: true});
  
  // HANDLERS
  // add photo entry from collection
  const addPhotoEntryToCollectionHandler = useCallback(async (userID, photoEntryID) => {
    const responseAddToCollection = await addPhotoEntryToCollection(userID, photoEntryID, axiosPrivate);
    setMessage(responseAddToCollection.message); 
    setData(prev => {  
      const copyData = [...prev];
      const updatedData = copyData.map(entry => { 
        if(entry._id === responseAddToCollection.photoEntry._id) { return {...entry, ...responseAddToCollection.photoEntry} } // update entry in state with the entry fetched (if state entry id === fetched entry id) 
        else { return {...entry} }
      })
      return updatedData;
    }) 
    setMessage(responseAddToCollection.message); // set message
    // navToPrevPage(); // navigate unauth user back to login page
  }, [])
  // remove photo entry from collection
  const removePhotoEntryFromCollectionHandler = useCallback(async (userID, photoEntryID) => {
    const responseRemoveFromCollection = await removePhotoEntryFromCollection(userID, photoEntryID, axiosPrivate);
    setMessage(responseRemoveFromCollection.message);
    setData(prev => {  
      const copyData = [...prev];
      const updatedData = copyData.map(entry => { 
        if(entry._id === responseRemoveFromCollection.photoEntry._id) { return {...entry, ...responseRemoveFromCollection.photoEntry} } // update entry in state with the entry fetched (if state entry id === fetched entry id) 
        else { return {...entry} }
      })
      return updatedData;
    })   
    setMessage(responseRemoveFromCollection.message); // set message
    // navToPrevPage(); // navigate unauth user back to login page
  }, [])

  // TODO: replace it to my collection component
  const getUserCollectionPhotoEntriesHandler = useCallback(async (userID) => {
    const responseRemoveFromCollection = await getUserCollectionPhotoEntries(userID, axiosPrivate);
    setMessage(responseRemoveFromCollection.message);
    // TODO: store fetch entries in a separate 
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
  const photoTitle = (entryTitle) => (
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
  // control panel buttons
  const controlPanel = (entryID) => (
    <div style={controlPanelStyle} className='photo-entry-control-panel'>
      {/* group 1 */}
      <span className='photo-entry-control-panel--1'> 
        {/* add/remove photo to/from collection toggler */}
        <Button 
          customStyle={'control-panel-view'}
          clicked={
            isInCollection ?
              async () => removePhotoEntryFromCollectionHandler(auth.userID, entryID) 
              :
              async () => addPhotoEntryToCollectionHandler(auth.userID, entryID)
          }
        > {isInCollection ? '-' : '+'} 
        </Button>
        <Button 
          customStyle={'control-panel-view'}
          clicked={
          async () => getUserCollectionPhotoEntriesHandler(auth.userID)
          }
        > Get </Button>
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
    <div className='photo-entry-container'> 
      {photoTitle(title)}
      {photo(photoURL, captureDate)}
      {photoLikes()}
      {controlPanel(_id)}
    </div>
  )
}

export default React.memo(PhotoEntry);