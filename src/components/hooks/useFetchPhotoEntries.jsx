// re/fetch photo entries data and update state  
import {useCallback} from 'react';
import { getAllGalleryPhotoEntries, getAllHomePhotos } from '../../helper/axiosRequests';
import useAxiosPrivate from './useAxiosPrivate';
import { useAuthContext } from '../contexts/AuthenticationContext';
import { useFormContext } from '../contexts/FormContext';

const useFetchPhotoEntries = () => {
  // CONTEXT
  const {auth} = useAuthContext();
  const {setData} = useFormContext();
  // HOOK
  const axiosPrivate = useAxiosPrivate();
  // fetch GALLERY photo entries (from gallery all / user's own collection) and update state
  const fetchGalleryPhotoEntries = useCallback(async (navToPrevPage, collectionType = 'all') => {
    try {
      const response = await getAllGalleryPhotoEntries(axiosPrivate, auth.userID, collectionType); // fetch gallery entries
      setData(response.photoEntries); // store entries in state
      return response;
    } catch(error) {
      // console.log(error);
      navToPrevPage(); // navigate unauth user back to login page
    } 
  }, [])
   // fetch gallery HOME entries and update state
  const fetchHomePhotoEntries = useCallback(async (navToPrevPage) => {
    try {
      const response = await getAllHomePhotos(axiosPrivate); // fetch home entries
      setData(response.photoEntries); // store entries in state
      return response;
    } catch(error) {
      // console.log(error);
      navToPrevPage(); // navigate unauth user back to login page
    } 
  }, [])
  return {fetchGalleryPhotoEntries , fetchHomePhotoEntries };
}

export default useFetchPhotoEntries;