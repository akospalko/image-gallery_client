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
  ViewPhoto, 
  LocationMark, 
  InfoIcon 
} from '../SVG/Icons';
import LoaderIcon from '../SVG/Loader';
import { useMediaQuery } from 'react-responsive';
import { OPERATIONS } from '../../helper/dataStorage';

const ControlPanel = ({
  photoEntry, // photo entry
  onUnlikePE, // unlike
  onLikePE, // like photo
  onRemovePEFromCollection, // remove photo from collettion
  addPEToCollection // add photo to collection
}) => {
  // PROPS
  const { 
    gpsLatitude,
    gpsLongitude,
    _id, 
    inCollection,
    isInCollection, 
    isLiked,
    likes 
  } = photoEntry ?? {};

  // CONTEXT
  const { setActivePhotoEntry, toggleModalHandler } = useModalContext();
  const { auth } = useAuthContext();
  const { isLoading } = useLoaderContext();
  
  // HOOK
  const isBelow350px = useMediaQuery({ query: '(max-width: 350px)' });
  const iconSize = isBelow350px ? '20px' : '25px'; // responsive button icon size  

  // Control panel: user engagement metrics (uem)
  const controlPanelUEM = (
    <div className='photo-entry-control-panel-uem'>
      { /* like/remove photo like toggler */ }
      <div className='photo-entry-control-panel-uem-item'>
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
        <div className='photo-entry-control-panel-uem-counter'>
          <span> { likes } </span>
        </div>
      </div>
      {/* add/remove photo to/from collection */}
      <div className='photo-entry-control-panel-uem-item'>
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
        <div className='photo-entry-control-panel-uem-counter'>
          <span> { inCollection } </span>
        </div>
      </div>
    </div>
  );

  // Control panel: user engagement metrics (uem)
  const controlPanelModals = (
    <div className='photo-entry-control-panel-modal'>
      {/* view */}
      <div className='photo-entry-control-panel-modal--item'>
        <Button
          buttonStyle='button-control-panel-view-user'
          title='view image'
          clicked={() => {
            setActivePhotoEntry(photoEntry)
            toggleModalHandler(OPERATIONS.FULLSCREEN_VIEW) } }
        > <ViewPhoto height={ iconSize } width={ iconSize } fill='var(--text-color--high-emphasis)'/> </Button>
      </div>
      {/* map */}
      <div className='photo-entry-control-panel-modal--item'>
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
      <div className='photo-entry-control-panel-modal--item'>
        <Button
          buttonStyle='button-control-panel-view-user'
          clicked={ () => {
            setActivePhotoEntry(photoEntry);
            toggleModalHandler(OPERATIONS.PHOTO_INFO_VIEW) } }
        > <InfoIcon height={ iconSize } width={ iconSize } stroke='var(--text-color--high-emphasis)'/> 
        </Button>
      </div>
    </div>
  )

  return (
    <div className='photo-entry-control-panel'>
      {/* uem buttons */}
      { controlPanelUEM }
      { /* modal buttons */ }
      { controlPanelModals }
    </div>
  );
};

export default ControlPanel;