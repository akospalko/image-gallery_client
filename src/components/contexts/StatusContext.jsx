// Context to:
// 1. store app related status: code, success, message, 
// 2. send toast if status code is not to be stored
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { statusDefault } from "../../helper/statusMessages";
import { useThemeContext } from "./ThemeContext";

// create context 
const StatusProvider = createContext();
// export consumed context - ready to be used
export const useStatusContext = () => useContext(StatusProvider);

// set up provider
export default function StatusContext({ children }) {
  // STATE
  const [ status, setStatus ] = useState(statusDefault);
  
  // CONTEXT
  const { theme } = useThemeContext();

  // HANDLER
  // Send toast with status message
  const sendToast = (message) => {
    if(!message) return; 
    toast(`${ message }`, { 
      className: "shared-toast",
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: theme
    });
  }
  
  return (
    <StatusProvider.Provider 
      value={{ 
        status, setStatus, // store status { code: number, success: boolean, message: string }
        sendToast // send toast with passed in status 
      }}
    >  { children }
    </StatusProvider.Provider>
  )
}