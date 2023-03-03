import React, {useState, createContext, useContext} from 'react'
// DEFINE && EXPORT CONTEXT
// create context
const ModalContext = createContext();
// export context
export const useModalContext = () => {
 return useContext(ModalContext);
}
// define layout provider
export default function ToggleModalContext({children}) {
  // INIT VALUES
  const modalTemplate = {
    CREATE_IMAGE: false,
    UPDATE_IMAGE: false,
    FULLSCREEN_VIEW: false,
    MAP_VIEW: false,
    PHOTO_INFO_VIEW: false,
    HEADER_NAV: false, // header navigation menu containing the pages (hamburger menu) 
    HEADER_AUTH: false, // header authentication menu: shows login page if unauth else show a modal (profile info, logout )  
  }
  // STATES
  const [toggleModal, setToggleModal] = useState(modalTemplate);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [activeID, setActiveID] = useState({});
  const [id, setID] = useState(''); // id passed from ImageCaards to ViewImage. Helps in finding the clicked entry's corresponding img
  // HANDLERS
  // handle toggle state for multiple modals (e.g. create, update image, etc). Can set a specified value(true||false) if provided (forcedValue) 
  const toggleModalHandler = (operation, forcedValue) => {
    setToggleModal(prev => {
      if(!operation) return;
      let updatedModal = {...prev};
      let newValue = forcedValue ? forcedValue : !prev[operation]; 
      // hide all modals -> set to false
      for(let modal in updatedModal) {
        updatedModal = {...updatedModal, [modal]: false}
      }
      // show the specified modal(named operation)
      if(operation){
        updatedModal = {...updatedModal, [operation]: newValue}
      }
      return updatedModal;
    })
  }
  // handle toggle state for a single dropdown  
  const toggleDropdownHandler = (forcedValue) => {
    setToggleDropdown(prev => {
      return forcedValue ? forcedValue : !prev; 
    })
  }

  return (
    <ModalContext.Provider
      value={{
        toggleModal, setToggleModal,
        toggleDropdown, setToggleDropdown,
        activeID, setActiveID,
        id, setID,
        toggleModalHandler,
        toggleDropdownHandler
      }}
    > 
      {children}
    </ModalContext.Provider>
  )
}