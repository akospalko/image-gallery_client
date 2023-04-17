// TODO: replace button icon
// header for modals containing title and close modal button
import React from 'react'
import '../Shared.css'
import Button from '../UI/Button';
import {useModalContext} from '../contexts/ToggleModalContext';
import {useFormContext} from '../contexts/FormContext';

export default function ModalHeader({title, operation}) {
    // CONTEXTS
    const {activeID, setActiveID, toggleModalHandler} = useModalContext();
    const {setMessage, setFormData, photoFile,  setPhotoFile} = useFormContext();

  return (
    // modal header: title, close button 
    <>
      <div className='shared-modal-dummy'> </div>
      <div className='shared-modal-title'> <b> {title} </b> </div>
      <div className='shared-button-wrapper shared-button-wrapper--modal-close'>  
        <Button 
          customStyle='button-modal-close'
          clicked={() => {
            setMessage('');
            setFormData(undefined);
            photoFile.name && setPhotoFile({});
            activeID && setActiveID({});
            toggleModalHandler(operation, false);
          }}
          > X 
        </Button>
      </div>
    </>
  )
}
