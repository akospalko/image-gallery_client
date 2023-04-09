// TODO: handle loading, disable button, img skeleton loader 
import React, {useState, useEffect} from 'react'
import '../Shared.css'
import FullScreenView from '../Modals/FullScreenView'
import MapView from '../Modals/MapView'
import {useModalContext} from '../contexts/ToggleModalContext'
import {useFormContext} from '../contexts/FormContext'
import {OPERATIONS, MODAL_TITLES} from '../../helper/dataStorage'
import ModalHeader from '../Modals/ModalHeader'
import CreateUpdatePhotoEntry from '../Modals/CreateUpdatePhotoEntry'

export default function PhotoEntryModal({operation, collection, formTemplate}) {
  // CONTEXTS
  const {activeID} = useModalContext();
  const {formData, setFormData} = useFormContext();
  // STATE
  const [isFormReady, setIsFormReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // EFFECTS
  // set up form if formTemplate value is passed
  useEffect(() => {
    if(!formTemplate) { setFormData({}); } 
    else { setFormData(formTemplate);  } 
  }, [formTemplate, operation])
  // update photo entry: populate form with active id on first render
  useEffect(() => {
    if(operation !== OPERATIONS.UPDATE_PHOTO || !activeID || !formData || isFormReady) return;
    // update state with filtered fields
    let updatedForm = {...formData}; // copy form
    for(let elem in formData) {
      const updatedItem = {...updatedForm[elem]}; 
      updatedItem.value = activeID[elem];
      updatedForm[elem] = updatedItem; 
    }
    setFormData(updatedForm);  
    setIsFormReady(true);      
  }, [formData, operation, isFormReady, setIsFormReady])
  // MODAL ELEMENTS  
  // create photo entry
  const createPhotoEntryModal =
    <CreateUpdatePhotoEntry 
      operation={operation} 
      formTemplate={formTemplate} 
      collection={collection}
      label={true}
      disabled={isLoading}
    />
  // update photo entry
  const updatePhotoEntryModal = 
    <CreateUpdatePhotoEntry 
      operation={operation} 
      formTemplate={formTemplate} 
      collection={collection}
      label={true} 
      disabled={isLoading}
    />
  // view entry's photo file
  const fullScreenViewModal = <FullScreenView/>;
  // view map if entry has coordinates 
  const mapViewModal = <MapView/>

  // RENDER MODALS CONDITIONALLY 
  let renderModal; 
  switch(operation) {
    case OPERATIONS.CREATE_PHOTO:
      renderModal = createPhotoEntryModal;
      break; 
    case OPERATIONS.UPDATE_PHOTO:
      renderModal = updatePhotoEntryModal;
      break; 
    case OPERATIONS.FULLSCREEN_VIEW:
      renderModal = fullScreenViewModal;
      break; 
    case OPERATIONS.MAP_VIEW:
      renderModal = mapViewModal;
      break; 
    default:
      renderModal = <p> couldn't display modal </p>;
  }

  return (
    <div className='shared-modal-backdrop'>
      <div className='shared-modal'>
        {/* modal header */}
        <div className='shared-modal-header'> 
          <ModalHeader title={operation ? MODAL_TITLES[operation] : ''} operation={operation} />
        </div>
        {/* modal content */}
        <div className='shared-modal-content'>
          {/* {renderModal} */}
          {formData && renderModal}
        </div>
      </div>
    </div>
  )
}