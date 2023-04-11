// re/fetch photo entries data 
import {useCallback} from 'react';
import { getAllGalleryPhotoEntries } from '../../helper/axiosRequests';
import useAxiosPrivate from './useAxiosPrivate';
import { useAuthContext } from '../contexts/AuthenticationContext';
import { useFormContext } from '../contexts/FormContext';

const useGetPhotoEntries = () => {
  // CONTEXT
  const {auth} = useAuthContext();
  const {setData} = useFormContext();
  // HOOK
  const axiosPrivate = useAxiosPrivate();
  // get photo entries
  const getPhotoEntries = useCallback(async (navToPrevPage) => {
    try {
      // if(!isLoading) setIsLoading(true);
      const response = await getAllGalleryPhotoEntries(axiosPrivate, auth.userID, 'all'); // fetch entries, update state  
      setData(response.photoEntries); // store entries in state
    } catch(error) {
      navToPrevPage(); // navigate unauth user back to login page
    } 
    // finally {
    //   setIsLoading(false);
    // }
  }, [])
  return getPhotoEntries;
}

export default useGetPhotoEntries;