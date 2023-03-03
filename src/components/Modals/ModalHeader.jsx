// header for modals containing title and close modal button
// TODO: replace button icon
import React from 'react'
import '../Shared.css'
import Button from '../UI/Button';
import {useModalContext} from '../contexts/ToggleModalContext';
import {useFormContext} from '../contexts/FormContext';

export default function ModalHeader({title, operation}) {
    // CONTEXTS
    const {toggleModalHandler} = useModalContext();
    const {setFormData} = useFormContext();

  return (
    // modal header: title, close button 
    <>
      <div className='shared-modal-dummy'> </div>
      <div className='shared-modal-title'> <b> {title} </b> </div>
      <div className='shared-modal-close-button'>  
        <Button 
          customStyle='modal-close'
          clicked={() => {
            setFormData(undefined);
            toggleModalHandler(operation);
          }}
          > X 
        </Button>
      </div>
    </>
  )
}
