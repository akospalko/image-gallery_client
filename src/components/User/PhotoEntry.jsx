// Photo entry gallery feed displayed to authenticated users 
import React, { useCallback, useEffect } from 'react'
import './PhotoEntries.css'
import '../Shared.css'
import '../ControlPanelWrapper.css';
import { useNavigate } from 'react-router'
import { useMediaQuery } from 'react-responsive';
import { 
  addPhotoEntryLike, removePhotoEntryLike, 
  addPhotoEntryToCollection, removePhotoEntryFromCollection
} from '../../helper/axiosRequests'
import { cropStringToLength } from '../../helper/utilities';
import { useFormContext } from '../contexts/FormContext'
import { useLoaderContext } from '../contexts/LoaderContext'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import ControlPanel from './ControlPanel';

const PhotoEntry = (props) => {
  // PROPS
  const { 
    photoEntry, 
    dataSetter, // fetched data (gallery or collection) state setter  
    isCollection, // switch to check if active photo entry is collection
    hideImageStyle, 
    setCurrentlyLoadingImages, 
    onLoadHandler 
  } = props;
  const { title, photoURL, captureDate, _id } = photoEntry ?? {};
 
  // CONTEXT
  const { setMessage } = useFormContext();
  const { loaderToggleHandler } = useLoaderContext();

  // HOOK
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const isBelow350px = useMediaQuery({ query: '(max-width: 350px)' });
  
  // CONSTANTS
  const displayedTextLength = isBelow350px ? 25 : 35; // responsive photo title display length, measured in characters

  // NAVIGATION
  const navToPrevPage = () => navigate('/login', { state: { from: location }, replace: true });
  
  // EFFECT
  // Add currently loading image to loading state
  useEffect(() => {
    setCurrentlyLoadingImages(prev => {
      const isDuplicate =  Object.keys(prev ?? {}).includes(String(_id)) // img already added to the loading list
      if(!isDuplicate) {// if img id is not yet in state -> add
        const updatedState = { ...prev, [_id]: false };
        return updatedState;
      }
    })
  }, [])

  // HELPER
  // Update like/dislike add/remove collection states for photo entries (pe)  
  const uemSetter = (dataSetter, responsePE) => {
    dataSetter(prev => {
      const copyData = [...prev];
      const updatedData = copyData.map(entry => {
        // compare id-s, update storage with fetched data 
        if(entry._id === responsePE?.photoEntry._id) { 
          return { ...entry, ...responsePE.photoEntry } 
        } 
        else { return { ...entry } }
      })
      return updatedData;
    })
  } 
  
  // HANDLERS
  // Add photo entry to collection
  const addPEToCollectionHandler = useCallback(async (userID, photoEntryID) => {
    try {
      loaderToggleHandler('PHOTO_ENTRY_COLLECTION', _id, true);
      const responseAddToCollection = await addPhotoEntryToCollection(userID, photoEntryID, axiosPrivate);
      setMessage(responseAddToCollection.message);
      uemSetter(dataSetter, responseAddToCollection);
    } catch (error) {
    } finally {
      loaderToggleHandler('PHOTO_ENTRY_COLLECTION', _id, false);
    }
    // navToPrevPage(); // navigate unauth user back to login page
  }, [])
  
  // Remove photo entry from collection
  const removePEFromCollectionHandler = useCallback(async (userID, photoEntryID) => {
    try {
      loaderToggleHandler('PHOTO_ENTRY_COLLECTION', _id, true);
      const responseRemoveFromCollection = await removePhotoEntryFromCollection(userID, photoEntryID, axiosPrivate);
      setMessage(responseRemoveFromCollection.message);
      uemSetter(dataSetter, responseRemoveFromCollection);
      // update state: remove photo entry from collection 
      if(isCollection) {
        dataSetter(prev => prev.filter(entry => entry._id !== _id)); // remove entry from state
      }
    } catch (error) {
    } finally {
      loaderToggleHandler('PHOTO_ENTRY_COLLECTION', _id, false);
    }
    // navToPrevPage(); // navigate unauth user back to login page
  }, [])

  // Like photo entry
  const likePEHandler = useCallback(async (userID, photoEntryID) => {
    try {
      loaderToggleHandler('PHOTO_ENTRY_LIKE', _id, true);
      // send request to server get response
      const responseAddLike = await addPhotoEntryLike(userID, photoEntryID, axiosPrivate);
      setMessage(responseAddLike.message);
      // upate state with new data
      uemSetter(dataSetter, responseAddLike); 
    } catch(error) {
    } finally {
      loaderToggleHandler('PHOTO_ENTRY_LIKE', _id, false);
    }
    // navToPrevPage(); // navigate unauth user back to login page
  }, [])

  // Unlike (remove like) photo entry
  const unlikePEHandler = useCallback(async (userID, photoEntryID) => {
    try {
      loaderToggleHandler('PHOTO_ENTRY_LIKE', _id, true);
    // send request to server get response
    const responseRemoveLike = await removePhotoEntryLike(userID, photoEntryID, axiosPrivate);
    // upate state with new data
    uemSetter(dataSetter, responseRemoveLike);
    setMessage(responseRemoveLike.message); // set message
  } catch(error) {
  } finally {
    loaderToggleHandler('PHOTO_ENTRY_LIKE', _id, false);
  }
    // navToPrevPage(); // navigate unauth user back to login page
  }, [])

  // ELEMENTS
  // Title
  const photoTitle = (
    <div className='photo-entry-title'>
      <h3> { cropStringToLength(title, displayedTextLength) } </h3>
    </div>
  )
  // Photo (img file), capture date
  // img style
  const imgStyle= {
    objectFit: 'contain',
    height: '100%',
    width: '100%'
  } 
  const photo = (
    <div className='photo-entry-photo'>
      <img  
        src={ photoURL } 
        style={ imgStyle } 
        onLoad={ () => onLoadHandler(_id) } 
      />
      {/* photo capture date */}
      <div className='photo-entry-capture-date'> <strong> { captureDate } </strong>  </div>
    </div>
  )
  
  // Control panel
  const controlPanel = (
    <ControlPanel
      photoEntry = { photoEntry }
      onUnlikePE={ unlikePEHandler }
      onLikePE={ likePEHandler }
      onRemovePEFromCollection={ removePEFromCollectionHandler }
      addPEToCollection={ addPEToCollectionHandler }
   />
  )

  return (
    <div style={ hideImageStyle } className='photo-entry-container'>
      { photoTitle }
      { photo }
      { controlPanel }
    </div>
  )
}

export default React.memo(PhotoEntry); 