// Modal header: title, return & close modal buttons
import React from 'react'
import '../Shared.css'
import Button from '../UI/Button';
import { useModalContext } from '../contexts/ToggleModalContext';
import { useFormContext } from '../contexts/FormContext';
import { useStatusContext } from '../contexts/StatusContext';
import { ArrowIcon, MenuCloseIcon } from '../SVG/Icons';
import { useMediaQuery } from 'react-responsive';
import { statusDefault } from '../../helper/statusMessages';

export default function ModalHeader(props) {
  // PROPS
  const { title, closeModal, returnToModal } = props;
  
  // CONTEXTS
  const { activePhotoEntry, setActivePhotoEntry, toggleModalHandler } = useModalContext();
  const { photoFile, setFormData, setPhotoFile } = useFormContext();
  const { setStatus } = useStatusContext(); 
  // HOOOK
  const isLargeScreen = useMediaQuery({ query: '(min-width: 768px)' });

  // CONSTANT
  const iconColor = 'var(--text-color--high-emphasis)';
  const iconReturnBackArrowSize = isLargeScreen ? '35px' : '30px';
  const iconCloseModalSize = isLargeScreen ? '25px' : '20px';

  return (
    <>
      <div className='shared-button-wrapper shared-button-wrapper--modal-header'> 
        { returnToModal && <Button 
              buttonStyle='button-close'
              clicked={ () => {
                setStatus(statusDefault);
                setFormData({});
                photoFile.name && setPhotoFile({});
                toggleModalHandler(returnToModal);
              } } 
            > <ArrowIcon height={ iconReturnBackArrowSize } width={ iconReturnBackArrowSize } fill={ iconColor } />
          </Button> }
      </div>
      <div className='shared-modal-title'> <h2> { title } </h2> </div>
      <div className='shared-button-wrapper shared-button-wrapper--modal-header'>  
        <Button 
          buttonStyle='button-close'
          clicked={ () => {
            setStatus(statusDefault);
            setFormData({});
            photoFile.name && setPhotoFile({});
            activePhotoEntry && setActivePhotoEntry({});
            toggleModalHandler(closeModal);
          } }
        > <MenuCloseIcon height={ iconCloseModalSize } width={ iconCloseModalSize } fill={ iconColor } /> 
        </Button>
      </div>
    </>
  )
}