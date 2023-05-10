// modals header with title, return & close modal buttons
import React from 'react'
import '../Shared.css'
import Button from '../UI/Button';
import {useModalContext} from '../contexts/ToggleModalContext';
import {useFormContext} from '../contexts/FormContext';
import { ArrowIcon } from '../SVG/Icons';

export default function ModalHeader({title, closeModal, returnToModal}) {
    // CONTEXTS
    const {activeID, setActiveID, toggleModalHandler} = useModalContext();
    const {setMessage, setFormData, photoFile, setPhotoFile} = useFormContext();
    
  return (
    // modal header: title, close button 
    <>
      <div className='shared-modal-dummy'> 
      {returnToModal && <Button 
            buttonStyle='button-modal-close'
            clicked={() => {
              setMessage('');
              setFormData(undefined);
              photoFile.name && setPhotoFile({});
              activeID && setActiveID({});
              toggleModalHandler(closeModal, true);
            }}
          > <ArrowIcon height='70%' width='70%' fill={'var(--text-color--high-emphasis)'} />
        </Button>}
      </div>
      <div className='shared-modal-title'> <h2> {title} </h2> </div>
      <div className='shared-button-wrapper shared-button-wrapper--modal-close'>  
        <Button 
          buttonStyle='button-modal-close'
          clicked={() => {
            setMessage('');
            setFormData(undefined);
            photoFile.name && setPhotoFile({});
            activeID && setActiveID({});
            toggleModalHandler(returnToModal, false);
          }}
          > X 
        </Button>
      </div>
    </>
  )
}
