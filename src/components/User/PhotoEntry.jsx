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
import ControlPanelWrapper from '../ControlPanelWrapper';
import '../ControlPanelWrapper.css';

const PhotoEntry = ({photoEntry, getImageFile, isImageLoadingStyle}) => {
  // PROPS
  const {title, photoURL, captureDate, _id, inCollection, isInCollection, isLiked, likes} = photoEntry ?? {};
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
    navToPrevPage(); // navigate unauth user back to login page
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
    navToPrevPage(); // navigate unauth user back to login page
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
    navToPrevPage(); // navigate unauth user back to login page
  }, [])

  // ELEMENTS
  // title
  const photoTitle = (
    <div className='photo-entry-title'>
      <p> {title} </p>
    </div>
  )
  // photo (img file) + style and capture date
  const customImgStyle = {objectFit: 'contain'};
  const photo = (
    <div className='photo-entry-photo'>
      {/* photo */}
      {getImageFile(photoURL, customImgStyle)} 
      {/* capture date */}
      <div className='photo-entry-capture-date'>
        <strong> {captureDate} </strong>
      </div>
    </div>
  )
  // display basic info about photo: num of users liked/collectionized the photo
  const photoDisplayInfo = (
    <div className={'photo-entry-display-additional-info'}>
      <div className={'photo-entry-display-additional-info-like'}>  
        <b>{`${likes || 0} ${likes > 1 ? 'likes' : 'like'}`} </b>
      </div>
      <div className={'photo-entry-display-additional-info-collection'}>  
        <b> {`saved: ${inCollection || 0}`} </b>
      </div>
    </div>
  )
  // control panel buttons
  const controlPanel = (
  <ControlPanelWrapper wrapperStyle='control-panel-photo-entry' heightPx={40} backgroundColor='rgb(244, 164, 60)'> 
    {/* group 1 */}
    <span className='control-panel-photo-entry-group-1 control-panel-padding-default-left'>
      {/* add/remove photo to/from collection toggler */}
      <Button
        buttonStyle='button-control-panel-view'
        clicked={
          isLiked ?
          async () => removeLikeHandler(auth.userID, _id)
          :
          async () => addLikeHandler(auth.userID, _id)
        }
      > {isLiked ? 'X' : '<3'}
      </Button>
      <Button
        buttonStyle='button-control-panel-view'
        clicked={
          isInCollection ?
            async () => removePhotoEntryFromCollectionHandler(auth.userID, _id)
            :
            async () => addPhotoEntryToCollectionHandler(auth.userID, _id)
        }
      > {isInCollection ? '-' : '+'}
      </Button>
      <Button
        buttonStyle='button-control-panel-view'
        clicked={() => {
          setID(_id)
          toggleModalHandler(OPERATIONS.FULLSCREEN_VIEW)}}
      > View </Button>
      {/* map */}
      <Button
        buttonStyle='button-control-panel-view'
        clicked={() => {
          setID(_id)
          toggleModalHandler(OPERATIONS.MAP_VIEW)}}
      > Map </Button>
    </span>
    {/* group 2 */}
    <span className='control-panel-photo-entry-group-2 control-panel-padding-default-right'>
      {/* info */}
      <Button
        buttonStyle='button-control-panel-view'
        clicked={() => {
          setID(_id)
          toggleModalHandler(OPERATIONS.PHOTO_INFO_VIEW)}}
      > Info </Button>
    </span>
  </ControlPanelWrapper> ); 

  return (
    <div style={isImageLoadingStyle} className='photo-entry-container'>
      {photoTitle}
      {photo}
      {photoDisplayInfo}
      {controlPanel}
    </div>
  )
}

export default React.memo(PhotoEntry);