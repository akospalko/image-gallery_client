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
    createImage: false,
    updateImage: false,
    viewImage: false
  }
  // STATES
  const [toggleModal, setToggleModal] = useState(modalTemplate);
  const [activeID, setActiveID] = useState({});
  const [id, setID] = useState(''); //id passed from ImageCaards to ViewImage. Helps in finding the clicked entry's corresponding img
  // HANDLERS
  // handle toggle state for multiple modals (e.g. create, update image, etc)
  const toggleModalHandler = (operation) => {
    setToggleModal(prev => {
      if(!operation) return;
      return {...prev, [operation]: !prev[operation]}
    })
  }

  return (
    <ModalContext.Provider
      value={{
        toggleModal, setToggleModal,
        activeID, setActiveID,
        id, setID,
        toggleModalHandler
      }}
    > 
      {children}
    </ModalContext.Provider>
  )
}