// Control panel for user photo gallery / collection
import React, { useCallback }  from 'react';
import './PhotoEntries.css';
import './UEMButtons.css';
import Button from '../UI/Button';
import { useAuthContext } from '../contexts/AuthenticationContext';
import { useLoaderContext } from '../contexts/LoaderContext'
import { LikeIcon, AddToCollectionIcon, RemoveFromCollectionIcon, DownloadIcon } from '../SVG/Icons';
import LoaderIcon from '../SVG/Loader';
import { useMediaQuery } from 'react-responsive';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { 
  addPhotoEntryLike, removePhotoEntryLike, 
  addPhotoEntryToCollection, removePhotoEntryFromCollection, downloadPhotoEntry 
} from '../../helper/axiosRequests'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useStatusContext } from '../contexts/StatusContext';

const UEMButtons = (props) => {
  // PROPS
  const {
    isCollection, // check if button is related to collection or gallery
    photoEntry,
    dataSetter,
    customButtonsStyle,
    customItemStyle,
    isCustomIconSize 
  } = props;
  // destructured photo entry
  const { _id, isInCollection, isLiked } = photoEntry;

  // CONTEXT
  const { auth } = useAuthContext();
  const { isLoading } = useLoaderContext();
  const { setStatus, sendToast } = useStatusContext();
  const { loaderToggleHandler } = useLoaderContext();
  
  // HOOK
  const isBelow300px = useMediaQuery({ query: '(max-width: 299px)' });
  const isMobileLandscape = useMediaQuery({ query: '(max-height: 500px)' });
  const axiosPrivate = useAxiosPrivate();

  // CONSTANT
  const iconSizeGallery = isBelow300px || isMobileLandscape ? '20px' : '25px'; // responsive icon size: gallery 
  const iconSizeCollection = isBelow300px || isMobileLandscape ? '18px' : '23px'; // responsive icon size: collection
  const collectionModalIconSize = '30px'; // collection modal's layout allow for a bit larger icon to display  
  const activeIconSize = isCollection && isCustomIconSize ? collectionModalIconSize : isCollection ? iconSizeCollection : iconSizeGallery;

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
  
  // handle photo download: loader, download, update download count 
  const downloadPhotoHandler = useCallback(async (userID, photoEntryID) => {
    try {
      loaderToggleHandler('PHOTO_ENTRY_DOWNLOAD', _id, true);
      const responseDownloadPhoto = await downloadPhotoEntry(
        userID,
        photoEntryID,
        axiosPrivate
      );
      const { success, message, photoEntry } = responseDownloadPhoto;
      if (success) {
        await downloadPhoto(photoEntry.photoURL);
      }
      sendToast(message);
      uemSetter(dataSetter, responseDownloadPhoto);
    } catch (error) {
    } finally {
      loaderToggleHandler('PHOTO_ENTRY_DOWNLOAD', _id, false);
    }
  }, []);
  
  // Control panel: user engagement metrics (uem)
  // style
  const uemButtonsStyle = isCollection ? 'pe-collection-uem-buttons' : 'pe-gallery-uem-buttons' 
  const uemButtonsItemStyle = isCollection ? 'pe-collection-uem-buttons-item' : 'pe-gallery-uem-buttons-item'
  
  // like / remove photo like toggler
  const likeButton = ( 
    <div className={ `${ uemButtonsItemStyle } ${ customItemStyle}` } >
      <Button
        buttonStyle='button-control-panel-view-user'
        title={ isLiked ? 'like photo' : 'remove like' }
        disabled={ isLoading.PHOTO_ENTRY_LIKE[_id] }
        clicked={ isLiked ?
          async () => unlikePEHandler(auth.userID, _id)
          :
          async () => likePEHandler(auth.userID, _id)
        }
      > { isLiked ? isLoading.PHOTO_ENTRY_LIKE[_id] ? 
          <LoaderIcon width={ activeIconSize } height={ activeIconSize } stroke='var(--text-color--high-emphasis)'/> : <LikeIcon width={ activeIconSize } height={ activeIconSize } stroke='var(--bg-color--accent)'fill='var(--bg-color--accent)'/>
        :  isLoading.PHOTO_ENTRY_LIKE[_id]  ? 
          <LoaderIcon width={ activeIconSize } height={ activeIconSize } stroke='var(--text-color--high-emphasis)'/> : <LikeIcon width={ activeIconSize } height={ activeIconSize } stroke='var(--bg-color--accent)'/> } 
      </Button>
    </div>
  );

  // add / remove photo to/from collection
  const collectionButton = ( 
    <div className={ `${ uemButtonsItemStyle } ${ customItemStyle}` } >
      <Button
        buttonStyle='button-control-panel-view-user'
        title={ isInCollection ? 'remove photo from collection' : 'add photo to collection' }
        disabled={ isLoading.PHOTO_ENTRY_COLLECTION[_id] }
        clicked={
          isInCollection ?
          async () => removePEFromCollectionHandler(auth.userID, _id)
          :
          async () => addPEToCollectionHandler(auth.userID, _id)
        }
      > { isInCollection ? isLoading.PHOTO_ENTRY_COLLECTION[_id] ? 
          <LoaderIcon width={ activeIconSize } height={ activeIconSize } stroke='var(--text-color--high-emphasis)'/> : <RemoveFromCollectionIcon width={ activeIconSize } height={ activeIconSize } stroke='var(--text-color--high-emphasis)'/>
          : isLoading.PHOTO_ENTRY_COLLECTION[_id] ? 
          <LoaderIcon width={ activeIconSize } height={ activeIconSize } stroke='var(--text-color--high-emphasis)'/> : <AddToCollectionIcon width={ activeIconSize } height={ activeIconSize } stroke='var(--text-color--high-emphasis)'/> }
      </Button>
    </div>
  );
    
  // download photo
  const downloadButton = (
    <div className={ `${ uemButtonsItemStyle } ${ customItemStyle}` } >
      <Button
        buttonStyle='button-control-panel-view-user'
        title='download photo' 
        disabled={ isLoading.PHOTO_ENTRY_DOWNLOAD[_id] }
        clicked={ async () => downloadPhotoHandler(auth.userID, _id) }
      > 
        { isLoading.PHOTO_ENTRY_DOWNLOAD[_id] ? 
          <LoaderIcon width={ activeIconSize } height={ activeIconSize } stroke='var(--text-color--high-emphasis)'/> 
          : 
          <DownloadIcon width={ activeIconSize } height={ activeIconSize } fill='var(--text-color--high-emphasis)'/>
        }
      </Button>
    </div>
  );

  return ( 
    <div className={ `${ uemButtonsStyle } ${ customButtonsStyle }` }>
      { likeButton }
      { collectionButton } 
      { downloadButton }
    </div>
  )
};

export default React.memo(UEMButtons);