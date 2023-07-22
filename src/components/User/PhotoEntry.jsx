// Photo entry gallery feed displayed to authenticated users 
import React, { useState, useCallback, useEffect } from 'react'
import './PhotoEntries.css'
import '../Shared.css'
import '../ControlPanelWrapper.css';
import { useNavigate } from 'react-router'
import { useMediaQuery } from 'react-responsive';
import { 
  addPhotoEntryLike, removePhotoEntryLike, 
  addPhotoEntryToCollection, removePhotoEntryFromCollection, downloadPhotoEntry } from '../../helper/axiosRequests'
import { cropStringToLength } from '../../helper/utilities';
import { OPERATIONS } from '../../helper/dataStorage';
import { useStatusContext } from '../contexts/StatusContext';
import { useLoaderContext } from '../contexts/LoaderContext'
import { useModalContext } from '../contexts/ToggleModalContext';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import ControlPanel from './ControlPanel';
import { saveAs } from 'file-saver';
import axios from 'axios';

const PhotoEntry = (props) => {
  // PROPS
  const { 
    displayedContentStyle, // Switch to apply specific style: collection and gallery 
    photoEntry, 
    dataSetter, // fetched data (gallery or collection) state setter  
    isCollection, // switch to check if active photo entry is collection
    hideImageStyle, 
    setCurrentlyLoadingImages, 
    onLoadHandler 
  } = props;
  const { title, photoURL, captureDate, _id, inCollection, likes, downloads } = photoEntry ?? {};
  // STATE
  const [isHovered, setIsHovered] = useState(false); // photo entry collection - panel (title, control) toggle state

  // CONTEXT  
  const { setStatus, sendToast } = useStatusContext();
  const { loaderToggleHandler } = useLoaderContext();
  const { setActivePhotoEntry, toggleModalHandler } = useModalContext();
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
  // Update like/dislike add/remove collection, download states for photo entries (pe)  
  const uemSetter = (dataSetter, responsePE) => {
    if(!responsePE?.photoEntry?._id) return;
    dataSetter( prev => {
      const copyData = [ ...prev ];
      const updatedData = copyData.map(entry => {
        // compare id-s, update storage with fetched data 
        if(entry?._id === responsePE?.photoEntry?._id) { 
          return { ...entry, ...responsePE?.photoEntry } 
        } 
        else { return { ...entry } }
      })
      return updatedData;
    } )
  } 
  
  // HANDLERS
  // Add photo entry to collection
  const addPEToCollectionHandler = useCallback(async (userID, photoEntryID) => {
    try {
      loaderToggleHandler('PHOTO_ENTRY_COLLECTION', _id, true);
      const responseAddToCollection = await addPhotoEntryToCollection(userID, photoEntryID, axiosPrivate);
      const { success, message } = responseAddToCollection;
      setStatus({ 
        code: 'CODE',
        success: success,
        message: message
      });
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
      const { message, success } = responseRemoveFromCollection;
      setStatus({ 
        code: 'CODE',
        success: success,
        message: message
      });
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
      const { success, message } = responseAddLike;
      setStatus({ 
        code: 'CODE',
        success: success,
        message: message
      });
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
      const { success, message } = responseRemoveLike;
      uemSetter(dataSetter, responseRemoveLike); // upate state with new data
      setStatus({ 
        code: 'CODE',
        success: success,
        message: message
      });
    } catch(error) {
    } finally {
      loaderToggleHandler('PHOTO_ENTRY_LIKE', _id, false);
    }
    // navToPrevPage(); // navigate unauth user back to login page
  }, [])

  // Download photo entry
  // convert url to blob, save it
  const downloadPhoto = async (url) => {
    try {
      const response = await axios.get(url, { responseType: 'blob' });
      // Determine the content type from the response headers
      const contentType = response.headers['content-type'];
      let fileExtension = '';
      if (contentType === 'image/jpeg') {
        fileExtension = 'jpg';
      } else if (contentType === 'image/png') {
        fileExtension = 'png';
      } else {
        console.error('Unsupported image format:', contentType);
        return;
      }
      // save image as Blob (fileSaver)
      const blob = new Blob([response.data], { type: contentType });
      saveAs(blob, `downloaded-image.${fileExtension}`);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };
  
  // handle photo downloading: loader, download, update download count 
  const downloadPhotoHandler = useCallback(async (userID, photoEntryID) => {
    try {
      loaderToggleHandler('PHOTO_ENTRY_DOWNLOAD', _id, true);
      const responseDownloadPhoto = await downloadPhotoEntry(
        userID,
        photoEntryID,
        axiosPrivate
      );
      const { success, message, photoEntry } = responseDownloadPhoto;
      console.log(photoEntry.photoURL)
      if (success) {
        await downloadPhoto(photoEntry.photoURL);
      }
      sendToast(message);
      uemSetter(dataSetter, responseDownloadPhoto);
    } catch (error) {
      console.log(error);
    } finally {
      loaderToggleHandler('PHOTO_ENTRY_DOWNLOAD', _id, false);
    }
  }, []);

  // toggle on handler: control title + panel
  const showPanelHandler = () => {
    setIsHovered(true);
  } 
  // toggle off handler: control title + panel
  const hidePanelHandler = () => {
    setIsHovered(false);
  } 
  
  // ELEMENTS
  // Title
  const photoTitle = (
    <div 
      className={ isCollection ? `pe-title-collection ${ isHovered ? 'pe-title-collection--visible' : '' }` : 'pe-title-gallery' }
    >
      <h3> { cropStringToLength(title, displayedTextLength) } </h3>
    </div>
  )

  // Photo (img file), capture date
  // img style
  const imgStyle= {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    verticalAlign: 'center'
  } 
  const photo = (
    <div className={ isCollection ? 'pe-photo-collection' : 'pe-photo-gallery' } >
      <img  
        src={ photoURL } 
        style={ imgStyle } 
        onLoad={ () => onLoadHandler(_id) } 
        onClick={() => {
          setActivePhotoEntry(photoEntry)
          toggleModalHandler(OPERATIONS.FULLSCREEN_VIEW) } }

      />
      {/* photo capture date */}
      <div className='pe-photo-capture-date'> <strong> { captureDate } </strong>  </div>
    </div>
  )
  
  // Control panel
  const controlPanel = (
    <ControlPanel
      isCollection={ isCollection }
      photoEntry={ photoEntry }
      isHovered={ isHovered }
      onUnlikePE={ unlikePEHandler }
      onLikePE={ likePEHandler }
      onRemovePEFromCollection={ removePEFromCollectionHandler }
      addPEToCollection={ addPEToCollectionHandler }
      downloadPhoto={ downloadPhotoHandler }
    />
  )

  // Uem counter
  const uemCounter = (
    <div className='pe-uem-counter'>
      <div className='pe-uem-counter-item'>
        <span> likes: { likes && likes } </span>
      </div>
      <div className='pe-uem-counter-item'>
        <span> in collection: { inCollection && inCollection } </span>
      </div> 
      <div className='pe-uem-counter-item'>
        <span> downloads: { downloads } </span>
      </div> 
    </div> 
  )

  // photo entry's footer. contains control panel, uem counter
  const photoFooter = (
    <div className='pe-footer'>
      { controlPanel }
      { uemCounter }
    </div>
  )

  // Rendered schemas: gallery || collection
  const renderedGallery = (
    <div 
      style={ hideImageStyle } 
      className='pe-container-gallery' 
    >
      { photoTitle }
      { photo }
      { photoFooter }
    </div>
  )
  const renderedCollection = (
    <div 
      className='pe-container-collection'
      // style={ hideImageStyle } 
      onMouseOver={ showPanelHandler } 
      onTouchStart={ showPanelHandler }
      onMouseLeave={ hidePanelHandler } 
    >
      { photoTitle }
      { photo }
      { controlPanel }
    </div>
  )

  return ( <> { isCollection ? renderedCollection : renderedGallery } </> )
}

export default React.memo(PhotoEntry); 