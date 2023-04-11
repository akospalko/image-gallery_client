import React, {useState, createContext, useContext} from 'react'
import { LOADER } from '../../helper/dataStorage';

const LoaderLayoutPrvoider = createContext();
export function useLoaderContext() {
    return useContext(LoaderLayoutPrvoider);    
}
export default function LoaderContext({children}) {
    // STATE
    const [isLoading, setIsLoading] = useState(LOADER);
    // HANDLER
    const loaderToggleHandler = (loader, toggleValue) => {
			if(!loader) { 
				console.log('loader type is missing'); 
				return;
			}
			setIsLoading(prev => {
				const updatedState = {...prev};
				if(toggleValue && typeof toggleValue === 'boolean') {
					updatedState[loader] = toggleValue;
				} else {
					updatedState[loader] = !updatedState[loader];
				}
					console.log(updatedState); 
					return updatedState;
				})
    }

    return(
    <LoaderLayoutPrvoider.Provider value={{isLoading, setIsLoading, loaderToggleHandler}}> 
        {children}
    </LoaderLayoutPrvoider.Provider>
  )  
}