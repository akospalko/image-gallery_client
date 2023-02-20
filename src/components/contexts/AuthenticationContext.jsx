import React, {useState, createContext, useContext} from 'react'
const AuthenticationLayoutPrvoider = createContext();
export function useAuthContext() {
    return useContext(AuthenticationLayoutPrvoider);    
}
export default function AuthenticationContext({children}) {
    const [auth, setAuth] = useState({});
    return(
    <AuthenticationLayoutPrvoider.Provider value={{auth, setAuth}}> 
        {children}
    </AuthenticationLayoutPrvoider.Provider>
  )  
}