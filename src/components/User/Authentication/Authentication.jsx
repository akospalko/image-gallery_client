import React from 'react'
import '../../Shared.css';
import AuthenticationModal from './AuthenticationModal'
import {useModalContext} from '../../contexts/ToggleModalContext'

export default function Authentication() {
  // CONTEXT
  const {toggleModal} = useModalContext(); 
  // CONDITONALLY RENDER ELEMENTS
  let renderedModal;
  // login or register modal
  if(toggleModal.authentication === 'login') {
    renderedModal = <AuthenticationModal operation='login'/>;
  } else if(toggleModal.authentication === 'register') {
    renderedModal = <AuthenticationModal operation='register'/>;
  } else {<p> cannot display modal </p>}

  return (
      <div className='shared-page-container'> 
        {renderedModal}
      </div>
    )
}