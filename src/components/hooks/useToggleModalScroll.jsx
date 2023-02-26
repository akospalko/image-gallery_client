// hook to toggle modal scroll. Hide when modal is opened, show when modal is closed
import { useEffect, useState } from "react"
import { useModalContext } from "../contexts/ToggleModalContext"

const useToggleModalScroll = () => {
  const {toggleModal} = useModalContext();
  
  useEffect(() => {
    // disable scroll function when modal is opened (toggled)  
    let isToggled = false; // check if any toggle value in toggleModal is true
    for(let toggledElem in toggleModal) {
      isToggled = toggleModal[toggledElem] === true || isToggled;
    }
    if(isToggled) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
  }, [toggleModal])
}
export default useToggleModalScroll;

// backup
// EFFECT
  // useEffect(() => {
  //   // disable scroll function when modal is opened (toggled)  
  //   let isToggled = false; // check if any toggle value in toggleModal is true
  //   for(let toggledElem in toggleModal) {
  //     isToggled = toggleModal[toggledElem] === true || isToggled;
  //   }
  //   if(isToggled) {
  //     document.body.style.overflowY = 'hidden';
  //   } else {
  //     document.body.style.overflowY = 'scroll';
  //   }
  // }, [toggleModal])




  // {
  //   // DESCRIPTION
  //   // shouldToggle = true(default) -> is used when we want to apply modal scroll changes directly from the this hook. It applies to all the component.
  //   // shouldToggle = false -> if we want to apply modall scroll changes from the component based on the isToggled value. It lets you tweak which part of the component should this functionality be applied to.
  //   // CONTEXT 
  //   const {toggleModal} = useModalContext();
  //   // STATE
  //   const [isToggled, setIsToggled] = useState(false); // hold value if any toggle value in toggleModal is true
  //   // FUNCTIONALITIES 
  //   // show / hide scroll based on toggleValue
  //   const toggleScrollbar = (toggled) => {
  //     if(toggled) {
  //       document.body.style.overflowY = 'hidden';
  //     } else {
  //       document.body.style.overflowY = 'scroll';
  //     }
  //   }
  //   // EFFECT
  //   useEffect(() => {
  //     // disable scroll function when modal is opened (toggled)  
  //     let toggleValue = false;
  //     for(let toggledElem in toggleModal) {
  //       toggleValue = toggleModal[toggledElem] === true || toggleValue;
  //     }
  //     setIsToggled(prev => prev = toggleValue);
  //     // check if scroll changes(shouldToggle=true) should be applied (or the user wants to apply values indirectly)
  //     // if(shouldToggle) {
  //     //   toggleScrollbar(isToggled); 
  //     // }
  //   }, [toggleModal, isToggled, setIsToggled])
  //   return {isToggled, toggleScrollbar}
  // }