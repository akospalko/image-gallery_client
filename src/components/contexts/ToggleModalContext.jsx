// TODO: outsource  activePhotoEntry to dataContext
// storage for loader/modal toggle states, handlers 
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
    CREATE_PHOTO: false, // create photo entry
    UPDATE_PHOTO: false, // update photo entry
    FULLSCREEN_VIEW: false, // photo view modal 
    MAP_VIEW: false, // map modal
    PHOTO_INFO_VIEW: false, // photo info: for user photo entry & map overview popup modal 
    HEADER_NAV: false, // header navigation menu containing the pages (hamburger menu) 
    HEADER_AUTH: false, // header authentication menu: shows login page if unauth else show a modal (profile info, logout )  
  }
  // STATES
  const [toggleModal, setToggleModal] = useState(modalTemplate);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [activePhotoEntry, setActivePhotoEntry] = useState({}); // photo entry data, used with displayed modals
  // HANDLERS
  // handle toggle state for multiple modals (e.g. create, update photo, etc). Can set a specified value(true||false) if provided (forcedValue) 
  const toggleModalHandler = (operation, forcedValue) => {
    setToggleModal(prev => {
      if(!operation) return;
      let updatedModal = {...prev};
      // hide all modals -> set to false
      for(let modal in updatedModal) {
        updatedModal = {...updatedModal, [modal]: false}
      }
      // show the specified modal(named operation)
      updatedModal = {...updatedModal, [operation]: forcedValue || !prev[operation]}
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
        activePhotoEntry, setActivePhotoEntry,
        toggleModalHandler,
        toggleDropdownHandler
      }}
    > {children}
    </ModalContext.Provider>
  )
}