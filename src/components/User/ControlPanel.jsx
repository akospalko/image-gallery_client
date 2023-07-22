// Control panel for user photo gallery / collection
import React from 'react';
import './PhotoEntries.css'
import Button from '../UI/Button';
import { useModalContext } from '../contexts/ToggleModalContext';
import { useAuthContext } from '../contexts/AuthenticationContext';
import { useLoaderContext } from '../contexts/LoaderContext'
import { 
  LikeIcon, 
  AddToCollectionIcon, 
  RemoveFromCollectionIcon,
  DownloadIcon,
  ViewPhoto, 
  LocationMark, 
  InfoIcon 
} from '../SVG/Icons';
import LoaderIcon from '../SVG/Loader';
import { useMediaQuery } from 'react-responsive';
import { OPERATIONS } from '../../helper/dataStorage';

const ControlPanel = ({
  isCollection, // check if control panel is related to collection or gallery
  photoEntry, // photo entry
  onUnlikePE, // unlike photo, update tracker
  onLikePE, // like photo, update tracker
  onRemovePEFromCollection, // remove photo from collection
  addPEToCollection, // add photo to collection, update tracker
  downloadPhoto, // download photo, update tracker 
  isHovered // photo entry hovered (used: photo entry on hover, display control panel) 
}) => {

  // PROPS
  const { 
    gpsLatitude,
    gpsLongitude,
    _id, 
    isInCollection, 
    isLiked,
  } = photoEntry ?? {};
  // CONTEXT
  const { setActivePhotoEntry, toggleModalHandler } = useModalContext();
  const { auth } = useAuthContext();
  const { isLoading } = useLoaderContext();
  
  // HOOK
  const isBelow350px = useMediaQuery({ query: '(max-width: 350px)' });
  const isMobileLandscape = useMediaQuery({ query: '(max-height: 500px)' });
  
  // CONSTANT
  const iconSize = isBelow350px || isMobileLandscape ? '20px' : '25px'; // responsive button icon size  

  // Control panel: user engagement metrics (uem)
  const controlPanelUEM = (
    <div className='pe-control-panel-uem'>
      { /* like/remove photo like toggler */ }
      <div className={ isCollection ? 'pe-control-panel-uem-item-collection' : 'pe-control-panel-uem-item-gallery' } >
        <Button
          buttonStyle='button-control-panel-view-user'
          title={ isLiked ? 'like photo' : 'remove like' }
          disabled={ isLoading.PHOTO_ENTRY_LIKE[_id] }
          clicked={ isLiked ?
            async () => onUnlikePE(auth.userID, _id)
            :
            async () => onLikePE(auth.userID, _id)
          }
        > { isLiked ? isLoading.PHOTO_ENTRY_LIKE[_id] ? 
            <LoaderIcon width={ iconSize } height={ iconSize } stroke='var(--text-color--high-emphasis)'/> : <LikeIcon width={ iconSize } height={ iconSize } stroke='var(--bg-color--accent)'fill='var(--bg-color--accent)'/>
          :  isLoading.PHOTO_ENTRY_LIKE[_id]  ? 
            <LoaderIcon width={ iconSize } height={ iconSize } stroke='var(--text-color--high-emphasis)'/> : <LikeIcon width={ iconSize } height={ iconSize } stroke='var(--bg-color--accent)'/> } 
        </Button>
      </div>
      {/* add/remove photo to/from collection */}
      <div className={ isCollection ? 'pe-control-panel-uem-item-collection' : 'pe-control-panel-uem-item-gallery' } >
        <Button
          buttonStyle='button-control-panel-view-user'
          title={ isInCollection ? 'remove photo from collection' : 'add photo to collection' }
          disabled={ isLoading.PHOTO_ENTRY_COLLECTION[_id] }
          clicked={
            isInCollection ?
            async () => onRemovePEFromCollection(auth.userID, _id)
            :
            async () => addPEToCollection(auth.userID, _id)
          }
        > { isInCollection ? isLoading.PHOTO_ENTRY_COLLECTION[_id] ? 
            <LoaderIcon width={ iconSize } height={ iconSize } stroke='var(--text-color--high-emphasis)'/> : <RemoveFromCollectionIcon width={ iconSize } height={ iconSize } stroke='var(--text-color--high-emphasis)'/>
            : isLoading.PHOTO_ENTRY_COLLECTION[_id] ? 
            <LoaderIcon width={ iconSize } height={ iconSize } stroke='var(--text-color--high-emphasis)'/> : <AddToCollectionIcon width={ iconSize } height={ iconSize } stroke='var(--text-color--high-emphasis)'/> }
        </Button>
      </div>
      {/* download photo */}
      <div className={ isCollection ? 'pe-control-panel-uem-item-collection' : 'pe-control-panel-uem-item-gallery' } >
        <Button
          buttonStyle='button-control-panel-view-user'
          title='download photo' 
          disabled={ isLoading.PHOTO_ENTRY_DOWNLOAD[_id] }
          clicked={ async () => downloadPhoto(auth.userID, _id) }
        > 
          { isLoading.PHOTO_ENTRY_DOWNLOAD[_id] ? 
            <LoaderIcon width={ iconSize } height={ iconSize } stroke='var(--text-color--high-emphasis)'/> 
            : <DownloadIcon width={ iconSize } height={ iconSize } fill='var(--text-color--high-emphasis)'/>
          }
        </Button>
      </div>
    </div>
  );

  // Control panel modals
  const controlPanelModals = (
    <div className='pe-control-panel-modal'>
      { /* view */ }
      <div className={ isCollection ? 'pe-control-panel-modal-item-collection' : 'pe-control-panel-modal-item-gallery' } >
        <Button
          buttonStyle='button-control-panel-view-user'
          title='view image'
          clicked={() => {
            setActivePhotoEntry(photoEntry)
             (OPERATIONS.FULLSCREEN_VIEW) } }
        > <ViewPhoto height={ iconSize } width={ iconSize } fill='var(--text-color--high-emphasis)'/> </Button>
      </div>
      { /* map */ }
      <div className={ isCollection ? 'pe-control-panel-modal-item-collection' : 'pe-control-panel-modal-item-gallery' }>
      <Button
        buttonStyle='button-control-panel-view-user'
        title='view geographic location'
        disabled={ !gpsLatitude || !gpsLongitude }
        clicked={ () => {
          setActivePhotoEntry(photoEntry);
          toggleModalHandler(OPERATIONS.MAP_VIEW) } }
      > <LocationMark height={ iconSize } width={ iconSize } fill='var(--text-color--high-emphasis)'/> </Button>
      </div>
      { /* info */ }
      <div className={ isCollection ? 'pe-control-panel-modal-item-collection' : 'pe-control-panel-modal-item-gallery' }>
        <Button
          buttonStyle='button-control-panel-view-user'
          clicked={ () => {
            setActivePhotoEntry(photoEntry);
            toggleModalHandler(OPERATIONS.PHOTO_INFO_VIEW) } }
        > <InfoIcon height={ iconSize } width={ iconSize } stroke='var(--text-color--high-emphasis)' /> 
        </Button>
      </div>
    </div>
  )

  return (
    <div className={ isCollection ? 'pe-control-panel-collection' : 'pe-control-panel-gallery' } >
      { /* uem buttons */ }
      { controlPanelUEM }
      { /* modal buttons */ }
      { controlPanelModals }
    </div>
  );
};

export default ControlPanel;