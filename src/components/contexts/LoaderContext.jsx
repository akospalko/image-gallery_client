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
	// toggle nested (LIKE:{e.g. id1: true, id:2 false} and simple(e.g. MODAL: true)) 
	const loaderToggleHandler = (type, id, toggleValue) => {
		if(!type || typeof toggleValue !== 'boolean') { return } 
		setIsLoading(prev => {
			let updatedLoader = {...prev}; // {LIKE: {...}, MODAL: false} 
			if(typeof updatedLoader[type] === 'object' && id && typeof id === 'string') { // toggle nested loader
				let nestedLoadingStates = {...updatedLoader[type]}; // {...}
				nestedLoadingStates[id] = toggleValue; // {..., id: boolean} 	
				updatedLoader = { ...updatedLoader, [type]: nestedLoadingStates };
			} else if (typeof updatedLoader[type] === 'boolean') {  // toggle simple loader
				updatedLoader = {...updatedLoader, [type]: toggleValue}; // {LIKE: {...}, type: boolean} 
			} else { return updatedLoader; }
			return updatedLoader;
		})
	}

	return(
		<LoaderLayoutPrvoider.Provider value={{isLoading, setIsLoading, loaderToggleHandler}}> 
			{children}
		</LoaderLayoutPrvoider.Provider>
  )  
}