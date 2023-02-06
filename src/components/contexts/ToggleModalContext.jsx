import React, {useState, createContext, useContext} from 'react'

const ModalContext = createContext();
export const useModalContext = () => {
 return useContext(ModalContext);
}
export default function ToggleModalContext({children}) {
  const modalTemplate = {
    createImage: false,
    updateImage: false,
    viewImage: false
  }
  const [toggleModal, setToggleModal] = useState(modalTemplate);
  const [activeID, setActivID] = useState({});
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [data, setData] = useState([]);

  //handle toggle state for multiple modals (e.g. create, update image, etc)
  const toggleModalHandler = (operation) => {
    //handle single page modal (one opens at a time)
    setToggleModal(prev => {
      if(!operation) return;
      return {...prev, [operation]: !prev[operation]}
    })
  }

  return (
    <ModalContext.Provider
      value={{
        toggleModal, 
        setToggleModal,
        toggleModalHandler,
        activeID, 
        setActivID,
        isSubmittingForm, 
        setIsSubmittingForm,
        data, setData
      }}
    > 
      {children}
    </ModalContext.Provider>
  )
}