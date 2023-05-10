// Photo entry related modal wrapper (modals: create/update, photo, map, info )
import React from 'react'
import '../Shared.css'
import ModalHeader from '../Modals/ModalHeader'

export default function PhotoEntryModal(props) {
  // PROPS
  const {
    closeModal, // reference to the active modal which is to be closed when button is clicked  
    returnToModal, // reference to which modal to return when button is clicked 
    modalTitle,  // modal header title 
    modalContent, // component to hold the modal's unique content    
    contentStyle // modal component's content style 
  } = props;

  return (
    <div className='shared-modal-backdrop'>
      <div className='shared-modal'>
        {/* modal header */}
        <div className='shared-modal-header'> 
          <ModalHeader title={modalTitle} closeModal={closeModal} returnToModal={returnToModal} />
        </div>
        {/* modal content */}
        <div className={`shared-modal-content ${contentStyle}`}> 
          {modalContent ? modalContent :<p> Couldn't display modal </p>  }
        </div>
      </div>
    </div>
  )
}
 