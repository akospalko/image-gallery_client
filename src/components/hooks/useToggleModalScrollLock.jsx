// hook to toggle modal scroll lock. Lock scroll when modal is opened, Unlock when modal is closed
import {useEffect} from "react"
import {useModalContext} from "../contexts/ToggleModalContext"

const useToggleModalScrollLock = () => {
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
export default useToggleModalScrollLock;