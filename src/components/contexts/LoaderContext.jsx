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
	// toggle loader(type) to the specified value (toggleValue) state
	const loaderToggleHandler = (type, toggleValue) => {
		if(!type || typeof toggleValue !== 'boolean') { 
			return;
		}
		setIsLoading(prev => {
			let updatedLoader = {...prev};
			// hide all modals -> set to false
			for(let loader in updatedLoader) {
				updatedLoader = {...updatedLoader, [loader]: false}
			}
			// show the specified loader(named type)
			updatedLoader = {...updatedLoader, [type]: toggleValue}
			return updatedLoader;
		})
	}
	return(
		<LoaderLayoutPrvoider.Provider value={{isLoading, setIsLoading, loaderToggleHandler}}> 
			{children}
		</LoaderLayoutPrvoider.Provider>
  )  
}