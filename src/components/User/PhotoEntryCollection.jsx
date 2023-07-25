// Photo entry authenticated user's own collection
import React, { useEffect, useState, useRef} from 'react'
import './PhotoEntryCollection.css'
import '../Shared.css'
import { useNavigate } from 'react-router'
import { useMediaQuery } from 'react-responsive';
import { cropStringToLength } from '../../helper/utilities';
import { OPERATIONS } from '../../helper/dataStorage';
import { useModalContext } from '../contexts/ToggleModalContext';
import UEMCounter from './UEMCounter';
import UEMButtons from './UEMButtons';
import ModalButtons from './ModalButtons';
import Button from '../UI/Button';
import { MenuCloseIcon, MenuOpenIcon } from '../SVG/Icons';

const PhotoEntryCollection = (props) => {
  // PROPS
  const { 
    photoEntry, 
    dataSetter, // fetched data (gallery or collection) state setter  
    hideImageStyle, 
    setCurrentlyLoadingImages, 
    onLoadHandler, 
  } = props;
  const { title, photoURL, captureDate, _id, inCollection, likes, downloads } = photoEntry ?? {};

  // CONSTANT
  const isCollection = true;
  
  // STATE
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  
  // REF
  const photoEntryRef = useRef(null);

  // HANDLERS
  // open information modal
  const openModalHandler = () => {
    setIsModalOpen(true);
  }
  // open information modal
  const closeModalHandler = () => {
    setIsModalOpen(false);
  }
  // check if click happens outside photo entry  
  const handleOutsideClick = (e) => {
    if (!photoEntryRef.current.contains(e.target)) {
      closeModalHandler();
    }
  };

  // CONTEXT
  const { setActivePhotoEntry, toggleModalHandler } = useModalContext();

  // HOOK
  const navigate = useNavigate();
  const isBelow300px = useMediaQuery({ query: '(max-width: 299px)' });
  const iconSize = isBelow300px ? '15px' : '20px'; 
  
  // CONSTANTS
  const displayedTextLength = isBelow300px ? 30 : 35; // responsive photo title display length, measured in characters

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

  // listen to mouse click -> close modal 
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // ELEMENTS
  // Title
  const photoHeader = (
    <div className='pe-collection-header'>
      <div className='pe-collection-title'>
        <h3> { cropStringToLength(title, displayedTextLength) } </h3>
      </div>
      <div 
        className='pe-collection-header-modal-toggler-button'
        onClick={ isModalOpen ? closeModalHandler : openModalHandler }
      >
        <Button 
            buttonStyle='button-close'
            onClick={ isModalOpen ? closeModalHandler : openModalHandler }
        > { isModalOpen ? 
            <MenuCloseIcon  
              height={ iconSize } 
              width={ iconSize } 
              fill='var(--text-color-light--high-emphasis)' 
            /> : 
            <MenuOpenIcon 
              height={ iconSize } 
              width={ iconSize } 
              fill='var(--text-color-light--high-emphasis)' 
            /> 
          } 
        </Button>
      </div>
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

  // control panel to hold uem buttons and capture date
  const controlPanel = (
    <div className='pe-collection-control-panel'>
      <UEMButtons 
        isCollection={ isCollection }
        photoEntry={ photoEntry }
        dataSetter={ dataSetter }
      />
      <div className='pe-collection-capture-date'>        
        <strong> { captureDate } </strong> 
      </div>
    </div>
  );
  // modal buttons
  const modalButtons = (
    <div className='pe-collection-modal-buttons-wrapper'>
      <ModalButtons 
        isCollection={ isCollection }
        photoEntry={ photoEntry }
        customButtonsStyle='pe-collection-modal-buttons--modal'
        customItemStyle='pe-collection-modal-buttons-item--modal'
        isCustomIconSize
      />
      <UEMButtons 
        isCollection={ isCollection }
        photoEntry={ photoEntry }
        dataSetter={ dataSetter }
        customButtonsStyle='pe-collection-uem-buttons--modal'
        customItemStyle='pe-collection-uem-buttons-item--modal'
        isCustomIconSize
      />
    </div>
  );

  // displayed photo
  const photo = (
    <div className='pe-collection-photo'>
      <img  
        src={ photoURL } 
        style={ imgStyle } 
        onLoad={ () => onLoadHandler(_id) } 
        onClick={ () => {
          setActivePhotoEntry(photoEntry)
          toggleModalHandler(OPERATIONS.FULLSCREEN_VIEW) } }
      />
        { controlPanel }
    </div>
  );

  // photo information modal
  const photoInfoModal = (
    <div className='pe-collection-modal'>
      { modalButtons }
      <UEMCounter
        isCollection={ isCollection }
        likes={ likes }
        inCollection={ inCollection }
        downloads={ downloads }
        customContainerStyle='uem-counter--modal'
        customItemStyle='uem-counter-item--modal'
      />
    </div>
  );


  return ( 
    <div 
      className='pe-collection-container' 
      style={ hideImageStyle }
      ref={photoEntryRef}
    >
      { photoHeader }
      {/* { isModalOpen ? photoInfoModal : photo } */}
      { photo }
      { isModalOpen && photoInfoModal }
    </div>
  );
}

export default React.memo(PhotoEntryCollection); 