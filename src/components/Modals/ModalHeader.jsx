// modals header with title, return & close modal buttons
import React from 'react'
import '../Shared.css'
import Button from '../UI/Button';
import {useModalContext} from '../contexts/ToggleModalContext';
import {useFormContext} from '../contexts/FormContext';
import { ArrowIcon, MenuCloseIcon } from '../SVG/Icons';

export default function ModalHeader(props) {
  // PROPS
  const {title, closeModal, returnToModal} = props;
  // CONTEXTS
  const {activePhotoEntry, setActivePhotoEntry, toggleModalHandler} = useModalContext();
  const {setMessage, setFormData, photoFile, setPhotoFile} = useFormContext();
  
  return (
    <>
      <div className='shared-modal-dummy'> 
      {returnToModal && <Button 
            buttonStyle='button-modal-close'
            clicked={() => {
              setMessage('');
              setFormData({});
              photoFile.name && setPhotoFile({});
              toggleModalHandler(returnToModal);
            }}
          > <ArrowIcon height='70%' width='70%' fill={ 'var(--text-color--high-emphasis)' } />
        </Button>}
      </div>
      <div className='shared-modal-title'> <h2> {title} </h2> </div>
      <div className='shared-button-wrapper shared-button-wrapper--modal-close'>  
        <Button 
          buttonStyle='button-modal-close'
          clicked={() => {
            setMessage('');
            setFormData({});
            photoFile.name && setPhotoFile({});
            activePhotoEntry && setActivePhotoEntry({});
            toggleModalHandler(closeModal);
          }}
          > <MenuCloseIcon height='50%' width='50%' fill={ 'var(--text-color--high-emphasis)' } /> 
        </Button>
      </div>
    </>
  )
}
