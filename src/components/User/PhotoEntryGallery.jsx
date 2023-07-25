// Photo entry gallery displayed to authenticated users 
import React, { useEffect } from 'react'
import '../Shared.css'
import './PhotoEntryGallery.css'
import { useNavigate } from 'react-router'
import { useMediaQuery } from 'react-responsive';
import { cropStringToLength } from '../../helper/utilities';
import { OPERATIONS } from '../../helper/dataStorage';
import { useModalContext } from '../contexts/ToggleModalContext';
import UEMCounter from './UEMCounter';
import UEMButtons from './UEMButtons';
import ModalButtons from './ModalButtons';

const PhotoEntryGallery = (props) => {
  // PROPS
  const { 
    photoEntry, 
    dataSetter, // fetched data (gallery or collection) state setter  
    hideImageStyle, 
    setCurrentlyLoadingImages, 
    onLoadHandler 
  } = props;
  const { title, photoURL, captureDate, _id, inCollection, likes, downloads } = photoEntry ?? {};

  // CONTEXT  
  const { setActivePhotoEntry, toggleModalHandler } = useModalContext();
  
  // HOOK
  const navigate = useNavigate();
  const isBelow300px = useMediaQuery({ query: '(max-width: 299px)' });
  
  // CONSTANTS
  const displayedTextLength = isBelow300px ? 25 : 35; // responsive photo title display length, measured in characters

  // NAVIGATION
  const navToPrevPage = () => navigate('/login', { state: { from: location }, replace: true });
  
  // EFFECT
  // Add currently loading image to loading state
  useEffect(() => {
    setCurrentlyLoadingImages(prev => {
      const isDuplicate =  Object.keys(prev ?? {}).includes(String(_id)) // img already added to the loading list
      if(!isDuplicate) { // if img id is not yet in state -> add
        const updatedState = { ...prev, [_id]: false };
        return updatedState;
      }
    })
  }, [])

  // ELEMENTS
  // Title
  const photoTitle = (
    <div className='pe-gallery-title'>
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

  // displayed photo
  const photo = (
    <div className='pe-gallery-photo'>
      <img  
        src={ photoURL } 
        style={ imgStyle } 
        onLoad={ () => onLoadHandler(_id) } 
        onClick={() => {
          setActivePhotoEntry(photoEntry)
          toggleModalHandler(OPERATIONS.FULLSCREEN_VIEW) } }
      />
    </div>
  );
  
  // control panel with uem and modal buttons
  const controlPanel = (
    <div className='pe-gallery-control-panel'>
      <UEMButtons 
        photoEntry={ photoEntry }
        dataSetter={ dataSetter }
      /> 
      <ModalButtons 
        photoEntry={ photoEntry }
      />
    </div>
  );

  // photo entry's footer. contains control panel, uem counter
  const photoFooter = (
    <div className='pe-gallery-footer'>
      { controlPanel }
      <UEMCounter
        likes={ likes }
        inCollection={ inCollection }
        downloads={ downloads }
      />
      {/* photo capture date */}
      <div className='pe-gallery-photo-capture-date'> 
        <strong> { captureDate } </strong>  
      </div>
    </div>
  );

  return (
    <div>
      <div 
        style={ hideImageStyle } 
        className='pe-gallery-container' 
      >
        { photoTitle }
        { photo }
        { photoFooter }
      </div>
    </div>
  )
}

export default React.memo(PhotoEntryGallery); 