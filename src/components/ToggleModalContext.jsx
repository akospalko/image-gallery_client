import React, {useState, createContext, useContext} from 'react'

const ModalContext = createContext({toggled: false});
export const useModalContext = () => {
 return useContext(ModalContext);
}
export default function ToggleModalContext({children}) {
  // const [toggleModal, setToggleModal] = useState({

  // });
  const [toggleModal, setToggleModal] = useState(false);
  //toggle modal handler
  const toggleModalHandler = () => {
    console.log(toggleModal)
    setToggleModal(prev => !prev);
  }

  // //toggle state for multiple modals (e.g. edit image)
  // const toggleModalHandler = (modal, id) => {
  //   //handle single page modal (one opens at a time)
  //   console.log(toggleModal)
  //   setToggleModal(prev => !prev);
  // }

  return (
    <ModalContext.Provider
      value={{
        toggleModal, 
        setToggleModal,
        toggleModalHandler
      }}
    > 
      {children}
    </ModalContext.Provider>
  )
}
