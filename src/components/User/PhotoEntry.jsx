import React, {useCallback, useEffect} from 'react'
import './PhotoEntries.css'
import '../Shared.css'
import Button from '../UI/Button';
import {useFormContext} from '../contexts/FormContext'
import {useModalContext} from '../contexts/ToggleModalContext';
import { 
  addPhotoEntryLike, removePhotoEntryLike, 
  addPhotoEntryToCollection, removePhotoEntryFromCollection
} from '../../helper/axiosRequests'
import {useNavigate} from 'react-router'
import {OPERATIONS} from '../../helper/dataStorage';
import {useAuthContext} from '../contexts/AuthenticationContext';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import ControlPanelWrapper from '../ControlPanelWrapper';
import '../ControlPanelWrapper.css';
import { useLoaderContext } from '../contexts/LoaderContext'
import LoaderIcon from '../SVG/Loader';
import { LikeIcon, AddToCollectionIcon, RemoveFromCollectionIcon, ViewPhoto, LocationMark, InfoIcon } from '../SVG/Icons';

const PhotoEntry = ({photoEntry, getImageFile, hideImageStyle, setCurrentlyLoadingImages}) => {
  // PROPS
  const {title, photoURL, captureDate, gpsLatitude, gpsLongitude, _id, inCollection, isInCollection, isLiked, likes} = photoEntry ?? {};
  // CONTEXT
  const {setData, setMessage} = useFormContext();
  const {setActivePhotoEntry, toggleModalHandler} = useModalContext();
  const {auth} = useAuthContext();
  const {isLoading, loaderToggleHandler} = useLoaderContext();
  // HOOK
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  // NAVIGATION
  const navToPrevPage = () => navigate('/login', {state: {from: location}, replace: true});
  // EFFECT
  // add currently loading image to loading state
  useEffect(() => {
    setCurrentlyLoadingImages(prev => {
      const isDuplicate =  Object.keys(prev ?? {}).includes(String(_id)) // img already added to the loading lis
      if(!isDuplicate) {// if img id is not yet in state -> add
        const updatedState = {...prev, [_id]: false};
        return updatedState
      }
    })
  }, [])
  // HANDLERS
  // add photo entry to collection
  const addPhotoEntryToCollectionHandler = useCallback(async (userID, photoEntryID) => {
    try {
      loaderToggleHandler('PHOTO_ENTRY_COLLECTION', _id, true);
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
    } catch (error) {
      console.log(error)
    } finally {
      loaderToggleHandler('PHOTO_ENTRY_COLLECTION', _id, false);
    }
    // navToPrevPage(); // navigate unauth user back to login page
  }, [])
  // remove photo entry from collection
  const removePhotoEntryFromCollectionHandler = useCallback(async (userID, photoEntryID) => {
    try {
      loaderToggleHandler('PHOTO_ENTRY_COLLECTION', _id, true);
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
    } catch (error) {
      console.log(error)
    } finally {
      loaderToggleHandler('PHOTO_ENTRY_COLLECTION', _id, false);
    }
    // navToPrevPage(); // navigate unauth user back to login page
  }, [])

  // add like to photo entry
  const addLikeHandler = useCallback(async (userID, photoEntryID) => {
    try {
      loaderToggleHandler('PHOTO_ENTRY_LIKE', _id, true);
      // send request to server get response
      const responseAddLike = await addPhotoEntryLike(userID, photoEntryID, axiosPrivate);
      setMessage(responseAddLike.message);
      // upate state with new data
      setData(prev => {
        const copyData = [...prev];
        const updatedData = copyData.map(entry => {
          if(entry._id === responseAddLike?.photoEntry?._id) {
            // console.log('photoid', photoEntryID, 'mapped entry id', entry._id, 'response data id', responseAddLike.photoEntry['_id']);
            return {...entry, ...responseAddLike.photoEntry}
          } // update entry in state with the fetched entry (if state entry id === fetched entry id)
          else { return {...entry} }
        })
        return updatedData;
      })
    } catch(error) {
      console.log(error)
    } finally {
      loaderToggleHandler('PHOTO_ENTRY_LIKE', _id, false);
    }
    // navToPrevPage(); // navigate unauth user back to login page
  }, [])
  // remove like from photo entry
  const removeLikeHandler = useCallback(async (userID, photoEntryID) => {
    try {
      loaderToggleHandler('PHOTO_ENTRY_LIKE', _id, true);
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
  } finally {
    loaderToggleHandler('PHOTO_ENTRY_LIKE', _id, false);
  }
    // navToPrevPage(); // navigate unauth user back to login page
  }, [])

  // ELEMENTS
  // title
  const photoTitle = (
    <div className='photo-entry-title'>
      <p> {title} </p>
    </div>
  )
  // photo (img file) and capture date
  const photo = (
    <div className='photo-entry-photo'>
      {/* photo */}
      {getImageFile(photoURL, {objectFit: 'contain'}, _id)}
    </div>
  )
  // display basic info about photo: num of users liked/collectionized the photo
  const photoDisplayInfo = (
    <div className='photo-entry-info-panel'>
      {/* counter: amount of users liked photo */}
      <div className='photo-entry-info-panel--like'> <b>{`${likes > 1 ? 'likes' : 'like'}: ${likes || 0} `} </b> </div>
      {/* counter: amount of users added photo to their collection */}
      <div className='photo-entry-info-panel--collection'> <b> {`saved: ${inCollection || 0}`} </b> </div>
      {/* photo capture date */}
      <div className='photo-entry-info-panel--capture-date'> <strong> {captureDate} </strong>  </div>
    </div>
  )
  // control panel buttons
  const controlPanel = ( 
  <ControlPanelWrapper wrapperStyle='control-panel-photo-entry' heightPx={40}>
    {/* group 1 */}
    <span className='control-panel-photo-entry-group-1 control-panel-padding-default-left'>
      {/* like/remove photo like toggler */}
      <Button
        buttonStyle='button-control-panel-view'
        title={isLiked ? 'like photo' : 'remove like'}
        disabled={isLoading.PHOTO_ENTRY_LIKE[_id]}
        clicked={ isLiked ?
          async () => removeLikeHandler(auth.userID, _id)
          :
          async () => addLikeHandler(auth.userID, _id)
        }
      > {isLiked ? isLoading.PHOTO_ENTRY_LIKE[_id] ? 
          <LoaderIcon width='100%' height='100%' stroke='var(--text-color--high-emphasis)'/> : <LikeIcon width='100%' height='100%' stroke='var(--bg-color--accent)' fill='var(--bg-color--accent)'/>
        :  isLoading.PHOTO_ENTRY_LIKE[_id]  ? 
          <LoaderIcon width='100%' height='100%' stroke='var(--text-color--high-emphasis)'/>  : <LikeIcon width='100%' height='100%' stroke='var(--bg-color--accent)'/>} 
      </Button>
      {/* add/remove photo to/from collection */}
      <Button
        buttonStyle='button-control-panel-view'
        title={isInCollection ? 'remove photo from collection' : 'add photo to collection'}
        disabled={isLoading.PHOTO_ENTRY_COLLECTION[_id]}
        clicked={
          isInCollection ?
            async () => removePhotoEntryFromCollectionHandler(auth.userID, _id)
            :
            async () => addPhotoEntryToCollectionHandler(auth.userID, _id)
        }
      > {isInCollection ? isLoading.PHOTO_ENTRY_COLLECTION[_id] ? 
          <LoaderIcon width='100%' height='100%' stroke='var(--text-color--high-emphasis)'/> : <RemoveFromCollectionIcon width='100%' height='100%' stroke='var(--text-color--high-emphasis)'/>
        :  isLoading.PHOTO_ENTRY_COLLECTION[_id] ? 
        <LoaderIcon width='100%' height='100%' stroke='var(--text-color--high-emphasis)'/> : <AddToCollectionIcon width='100%' height='100%' stroke='var(--text-color--high-emphasis)'/> }
      </Button>
      <Button
        buttonStyle='button-control-panel-view'
        title='view image'
        clicked={() => {
          setActivePhotoEntry(photoEntry)
          toggleModalHandler(OPERATIONS.FULLSCREEN_VIEW)}}
      > <ViewPhoto height='100%' width='100%' fill='var(--text-color--high-emphasis)'/> </Button>
      {/* map */}
      <Button
        buttonStyle='button-control-panel-view'
        title='view geographic location'
        disabled={!gpsLatitude || !gpsLongitude}
        clicked={() => {
          setActivePhotoEntry(photoEntry);
          toggleModalHandler(OPERATIONS.MAP_VIEW)}}
      > <LocationMark height='100%' width='100%' fill='var(--text-color--high-emphasis)'/> </Button>
    </span>
    {/* group 2 */}
    <span className='control-panel-photo-entry-group-2 control-panel-padding-default-right'>
      {/* info */}
      <Button
        buttonStyle='button-control-panel-view'
        clicked={() => {
          setActivePhotoEntry(photoEntry);
          toggleModalHandler(OPERATIONS.PHOTO_INFO_VIEW)}}
      > <InfoIcon height='100%' width='100%' stroke='var(--text-color--high-emphasis)'/> </Button>
    </span>
  </ControlPanelWrapper> );

  return (
    <div style={hideImageStyle} className='photo-entry-container'>
      {photoTitle}
      {photo}
      {photoDisplayInfo}
      {controlPanel}
    </div>
  )
}

export default React.memo(PhotoEntry); 