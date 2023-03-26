import React, {useCallback} from 'react'
import './PhotoEntries.css'
import '../Shared.css'
import Button from '../UI/Button';
import {useFormContext} from '../contexts/FormContext'
import {useModalContext} from '../contexts/ToggleModalContext';
import {
  addPhotoEntryLike,
  removePhotoEntryLike,
  addPhotoEntryToCollection,
  removePhotoEntryFromCollection
} from '../../helper/axiosRequests'
import {useNavigate} from 'react-router'
import {OPERATIONS} from '../../helper/dataStorage';
import {useAuthContext} from '../contexts/AuthenticationContext';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const PhotoEntry = ({photoEntry, imgFile, isImageLoadingStyle}) => {
  // PROPS
  const {title, photoURL, captureDate, _id, isInCollection, isLiked, likes} = photoEntry ?? {};
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
  // add photo entry to collection
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

  // add like to photo entry
  const addLikeHandler = useCallback(async (userID, photoEntryID) => {
    try {
      // send request to server get response
      const responseAddLike = await addPhotoEntryLike(userID, photoEntryID, axiosPrivate);
      setMessage(responseAddLike.message);
      // upate state with new data
      console.log(responseAddLike)
      setData(prev => {
        const copyData = [...prev];
        const updatedData = copyData.map(entry => {
          if(entry._id === responseAddLike?.photoEntry?._id) { 
            // console.log('photoid', photoEntryID, 'mapped entry id', entry._id, 'response data id', responseAddLike.photoEntry['_id']);
            return {...entry, ...responseAddLike.photoEntry} 
          } // update entry in state with the fetched entry (if state entry id === fetched entry id)
          else { return {...entry} }
        })
        console.log('updated data after added like', updatedData);
        return updatedData;
       // return prev;
      })
    } catch(error) {
      console.log(error)
    }
    // navToPrevPage(); // navigate unauth user back to login page
  }, [])
  
  // remove like from photo entry
  const removeLikeHandler = useCallback(async (userID, photoEntryID) => {
    try {
    // send request to server get response
    const responseRemoveLike = await removePhotoEntryLike(userID, photoEntryID, axiosPrivate);
    // upate state with new data
    setData(prev => {
      const copyData = [...prev];
      const updatedData = copyData.map(entry => {
        if(entry._id === responseRemoveLike?.photoEntry?._id) { 
          return {...entry, ...responseRemoveLike.photoEntry} 
        } // update entry in state with the fetched entry (if state entry id === fetched entry id)
        else { return {...entry} }
      })
      return updatedData;
    })
    setMessage(responseRemoveLike.message); // set message
  } catch(error) {
    console.log(error)
  }
    // navToPrevPage(); // navigate unauth user back to login page
  }, [])

  // STYLES
  // NOTE: for some elements class selectors didn't apply. I solved the problem in these cases using inline styles.
  const photoStyle = {
    display: 'flex',
    height: '450px',
    position: 'relative',
    width: '100%',
    // backgroundImage: `url(${entryPhoto})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center'
  }
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
  
  //TODO: fix img positioning, remove redundant code 
  const photo = (photoURL, captureDate) => (
    <div className='photo-entry-photo' style={photoStyle}>
      {/* photo */}
      {imgFile(photoURL, photoStyle)} 
      {/* capture date */}
      <div className='photo-entry-capture-date' style={captureDateStyle}>
        <strong> {captureDate} </strong>
      </div>
    </div>
  )
  const photoLikes = (likeCount) => (
    // display likes
    <div style={photoLikesStyle}>
      <b>{`${likeCount || 0} ${likeCount > 1 ? 'likes' : 'like'}`}</b>
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
            isLiked ?
            async () => removeLikeHandler(auth.userID, entryID)
            :
            async () => addLikeHandler(auth.userID, entryID)
          }
        > {isLiked ? 'X' : '<3'}
        </Button>
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
    <div style={isImageLoadingStyle} className='photo-entry-container'>
      {photoTitle(title)}
      {photo(photoURL, captureDate)}
      {photoLikes(likes)}
      {controlPanel(_id)}
    </div>
  )
}

export default React.memo(PhotoEntry);