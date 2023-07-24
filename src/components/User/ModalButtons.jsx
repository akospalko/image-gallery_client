// Control panel for user photo gallery / collection
import React from 'react';
import './PhotoEntries.css';
import './ModalButtons.css';
import Button from '../UI/Button';
import { useModalContext } from '../contexts/ToggleModalContext';
import { ViewPhoto, LocationMark, InfoIcon } from '../SVG/Icons';
import { useMediaQuery } from 'react-responsive';
import { OPERATIONS } from '../../helper/dataStorage';

const ModalButtons = (props) => {
  // PROPS
  const {
    isCollection, // check if button is related to collection or gallery
    photoEntry,
    customButtonsStyle,
    customItemStyle,
    isCustomIconSize
  } = props;
   // destructured photo entry
  const { gpsLatitude, gpsLongitude } = photoEntry; // if no lat || long coord -> disable map modal button

  // CONTEXT
  const { setActivePhotoEntry, toggleModalHandler } = useModalContext();
  
  // HOOK
  const isBelow300px = useMediaQuery({ query: '(max-width: 299px)' });
  const isMobileLandscape = useMediaQuery({ query: '(max-height: 500px)' });

  // CONSTANT
  const iconSizeGallery = isBelow300px || isMobileLandscape ? '20px' : '25px'; // responsive icon size: gallery 
  const iconSizeCollection = isBelow300px || isMobileLandscape ? '18px' : '23px'; // responsive icon size: collection
  const collectionModalIconSize = '30px'; // collection modal's layout allow for a bit larger icon to display  
  const activeIconSize = isCollection && isCustomIconSize ? collectionModalIconSize : isCollection ? iconSizeCollection : iconSizeGallery;

  // STYLES
  const modalButtonsStyle = isCollection ? 'pe-collection-modal-buttons' : 'pe-gallery-modal-buttons';
  const modalButtonsItemStyle = isCollection ? 'pe-collection-modal-buttons-item' : 'pe-gallery-modal-buttons-item';
  
  // Control panel modals
  const controlPanelModalButtons = (
    <div className={ `${ modalButtonsStyle } ${ customButtonsStyle }` }>
      { /* view */ }
      <div className={ `${ modalButtonsItemStyle } ${ customItemStyle }` } >
        <Button
          buttonStyle='button-control-panel-view-user'
          title='view image'
          clicked={() => {
            setActivePhotoEntry(photoEntry)
            toggleModalHandler(OPERATIONS.FULLSCREEN_VIEW) } }
        > <ViewPhoto height={ activeIconSize } width={ activeIconSize } fill='var(--text-color--high-emphasis)'/> </Button>
      </div>
      { /* map */ }
      <div className={ `${ modalButtonsItemStyle } ${ customItemStyle }` }>
      <Button
        buttonStyle='button-control-panel-view-user'
        title='view geographic location'
        disabled={ !gpsLatitude || !gpsLongitude }
        clicked={ () => {
          setActivePhotoEntry(photoEntry);
          toggleModalHandler(OPERATIONS.MAP_VIEW) } }
      > <LocationMark height={ activeIconSize } width={ activeIconSize } fill='var(--text-color--high-emphasis)'/> </Button>
      </div>
      { /* info */ }
      <div className={ `${ modalButtonsItemStyle } ${ customItemStyle }` }>
        <Button
          buttonStyle='button-control-panel-view-user'
          title='view description'
          clicked={ () => {
            setActivePhotoEntry(photoEntry);
            toggleModalHandler(OPERATIONS.PHOTO_INFO_VIEW) } }
        > <InfoIcon height={ activeIconSize } width={ activeIconSize } stroke='var(--text-color--high-emphasis)' /> 
        </Button>
      </div>
    </div>
  )

  return ( controlPanelModalButtons );
};

export default React.memo(ModalButtons, (prevProps, nextProps) => {
  // Check for change in props (gps lat-long), rerender if they are modified
  return (
    prevProps.gpsLatitude === nextProps.gpsLatitude &&
    prevProps.gpsLongitude === nextProps.gpsLongitude
  );
});