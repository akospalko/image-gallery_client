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

  // set active entry based on the passed id
  const setActiveEntryHandler = (id, data) => {
    console.log('active entry');
    //filter entry from data with the help of id
    //id comes from the clicked (rendered) entry, data is from fetching/data storage  
    const filteredEntry = data.filter(elem => elem.id === id); 
    console.log(filteredEntry)
    setActivID(filteredEntry);
  }
  return (
    <ModalContext.Provider
      value={{
        toggleModal, 
        setToggleModal,
        toggleModalHandler,
        activeID, 
        setActivID,
        setActiveEntryHandler,
        isSubmittingForm, 
        setIsSubmittingForm,
        data, setData
      }}
    > 
      {children}
    </ModalContext.Provider>
  )
}
