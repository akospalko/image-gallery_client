// TODO: replace status message strings with CONSTANTS 
// list of requests made to the api
import axios from 'axios';
import {axiosAuthentication} from '../helper/axiosInstances'
import {statusMessages} from './dataStorage';
// PHOTO ENTRY 
// GET all photo entries -> gallery (all gallery photos || photos added to user's own collection) protected resources 
export const getAllGalleryPhotoEntries = async (axiosInstance, userID, collectionType) => {
  let fetchedData; 
  try {
    const response = await axiosInstance.get(`/api/v1/photo-gallery/?userID=${userID}&collectionType=${collectionType}`);
    fetchedData = {...response?.data}; 
  } catch (error) {
    if(!error?.response) {
      fetchedData = {success: false, message: statusMessages.AXIOS_NO_SERVER_RESPONSE};
    } else {
      fetchedData = {...error?.response.data};
    }
  }
  return fetchedData;
}
// GET all photos for home page: unprotected resource
export const getAllHomePhotos = async (axiosInstance) => {
  let fetchedData; 
  try {
    const response = await axiosInstance.get('/api/v1/photo-home');
    fetchedData = {...response?.data}; 
  } catch (error) {
    if(!error?.response) {
      fetchedData = {success: false, message: statusMessages.AXIOS_NO_SERVER_RESPONSE};
    } else {
      fetchedData = {...error?.response.data};
    }
  }
  return fetchedData;
}
// GET single entry, update state with fetched response data
export const getSinglePhotoEntry = async (activeID, axiosInstance, collection, userID) => {
  if(!activeID) return;
  let fetchedData; 
  try { 
    const response = await axiosInstance.get(`/api/v1/photo-gallery/${collection}/${activeID}/?userID=${userID}`);
    fetchedData = {...response?.data}; 
  } catch (error) {
    if(!error?.response) {
      fetchedData = {success: false, message: statusMessages.AXIOS_NO_SERVER_RESPONSE};
    } else {
      fetchedData = {...error?.response.data};
    }
  }
  return fetchedData;
}
// POST
export const postPhotoEntry = async (entryData, axiosInstance, collection, userID) => {
  if(!entryData) return;
  let fetchResult; 
  try {
    const response = await axiosInstance.post(`/api/v1/photo-gallery/${collection}/?userID=${userID}`, entryData);
    fetchResult = {...response?.data};
  } catch (error) {
    if(!error?.response) {
      fetchResult = {success: false, message: statusMessages.AXIOS_NO_SERVER_RESPONSE};
    } else {
      fetchResult = {...error?.response.data};
    }
  }
  return fetchResult;
}
// PATCH (update)
export const updatePhotoEntry = async (activeID, entryData, axiosInstance, collection) => {
  if(!activeID || !entryData) return;
  let fetchResult; 
  try { 
    const response = await axiosInstance.patch(`/api/v1/photo-gallery/${collection}/${activeID}`, entryData);
    fetchResult = {...response?.data};
  } catch (error) {
    if(!error?.response) {
      fetchResult = {success: false, message: statusMessages.AXIOS_NO_SERVER_RESPONSE};
    } else {
      fetchResult = {...error?.response.data};
    }
  }
  return fetchResult;
}
// DELETE
export const deletePhotoEntry = async (activeID, axiosInstance, collection) => { 
  if(!activeID) return;
  let fetchResult; 
  try { 
    const response = await axiosInstance.delete(`/api/v1/photo-gallery/${collection}/${activeID}`)
    fetchResult = {...response?.data};
  } catch (error) {
    if(!error?.response) {
      fetchResult = {success: false, message: statusMessages.AXIOS_NO_SERVER_RESPONSE};
    } else {
      fetchResult = {...error?.response.data};
    }
  }
  return fetchResult;
}
// USER'S COLLECTION
// PATCH (create/update) // create user collection && add photo entry (if non existent) || add a new photo entry to an already existing one 
export const addPhotoEntryToCollection = async (userID, photoEntryID, axiosInstance) => {
  let fetchResult; 
  try { 
    const response = await axiosInstance.patch(`/api/v1/photo-user-collection/${userID}/${photoEntryID}`);
    fetchResult = {...response?.data};
  } catch (error) {
    if(!error?.response) {
      fetchResult = {success: false, message: statusMessages.AXIOS_NO_SERVER_RESPONSE};
    } else {
      fetchResult = {...error?.response.data};
    }
  }
  return fetchResult;
}
// DELETE // remove photo entry from user collection 
export const removePhotoEntryFromCollection = async (userID, photoEntryID, axiosInstance) => {
  let fetchResult; 
  try { 
    const response = await axiosInstance.delete(`/api/v1/photo-user-collection/${userID}/${photoEntryID}`);
    fetchResult = {...response?.data};
  } catch (error) {
    if(!error?.response) {
      fetchResult = {success: false, message: statusMessages.AXIOS_NO_SERVER_RESPONSE};
    } else {
      fetchResult = {...error?.response.data};
    }
  }
  return fetchResult;
}
// PHOTO ENTRY LIKE
// PATCH (create/update) // create user collection && add photo entry (if non existent) || add a new photo entry to an already existing one 
export const addPhotoEntryLike = async (userID, photoEntryID, axiosInstance) => {
  let fetchResult; 
  try { 
    const response = await axiosInstance.patch(`/api/v1/photo-user-like/${userID}/${photoEntryID}`);
    fetchResult = {...response?.data};
  } catch (error) {
    if(!error?.response) {
      fetchResult = {success: false, message: statusMessages.AXIOS_NO_SERVER_RESPONSE};
    } else {
      fetchResult = {...error?.response.data};
    }
  }
  return fetchResult;
}
// DELETE // remove photo entry from user collection 
export const removePhotoEntryLike = async (userID, photoEntryID, axiosInstance) => {
  let fetchResult; 
  try { 
    const response = await axiosInstance.delete(`/api/v1/photo-user-like/${userID}/${photoEntryID}`);
    fetchResult = {...response?.data};
  } catch (error) {
    if(!error?.response) {
      fetchResult = {success: false, message: statusMessages.AXIOS_NO_SERVER_RESPONSE};
    } else {
      fetchResult = {...error?.response.data};
    }
  }
  return fetchResult;
}
// AUTHENTICATION
// POST, register user
export const createNewUser = async (userData) => {
  if(!userData) return;
  let fetchResult; 
  try {
    const response = await axiosAuthentication.post(`/api/v1/register`, userData);
    fetchResult = {...response?.data}
  } catch (error) {
    if(!error?.response) {
      console.log(error)
     fetchResult = {success: false, message: statusMessages.AXIOS_NO_SERVER_RESPONSE};
    } else {
      fetchResult = {...error?.response.data};
    }
  }
  return fetchResult;
}
// POST, login user
export const loginUser = async (userData) => {
  if(!userData) return;
  let fetchResult; 
  try {
    const response = await axiosAuthentication.post(`/api/v1/login`, userData, { withCredentials: true });
    fetchResult = {...response?.data}
  } catch (error) {
    if(!error?.response) {
      fetchResult = {success: false, message: statusMessages.AXIOS_NO_SERVER_RESPONSE};
    } else {
      fetchResult = {...error?.response.data};
    }
  }
  return fetchResult;
}
// GET, refresh access token 
export const refreshToken = async () => {
  let fetchResult; 
  try {
    const response = await axiosAuthentication.get('/api/v1/refresh');
    fetchResult = {...response?.data}
  } catch(error) {
    if(!error?.response) {
      fetchResult = {success: false, message: statusMessages.AXIOS_NO_SERVER_RESPONSE};
    } else {
      fetchResult = {...error?.response.data};
    }
  }
  return fetchResult;
}
// GET, logout user
export const logoutUser = async () => {
  let fetchResult; 
  try {
    const response = await axiosAuthentication.get('/api/v1/logout', { withCredentials: true });
    fetchResult = {...response?.data}
  } catch (error) {
    if(!error?.response) {
      fetchResult = {success: false, message: statusMessages.AXIOS_NO_SERVER_RESPONSE};
    } else {
      fetchResult = {...error?.response.data};
    }
  }
  return fetchResult;
}
// POST, request new password reset link
export const requestPasswordResetLink = async (email) => {
  let fetchResult; 
  try {
    const response = await axiosAuthentication.post('/api/v1/password-forgot', email);
    fetchResult = {...response?.data};
  } catch (error) {
    if(!error?.response) {
      fetchResult = {success: false, message: statusMessages.AXIOS_NO_SERVER_RESPONSE};
    } else {
      fetchResult = {...error?.response.data};
    }
  }
  console.log(fetchResult)
  return fetchResult;
}
// GET, verify password reset link (token) validity before allowing users to change their password
export const checkPasswordResetLinkValidity = async (userID, token) => {
  let fetchResult; 
  try {
    const response = await axiosAuthentication.get(`/api/v1/password-reset/${userID}/${token}`);
    fetchResult = {...response?.data}
  } catch (error) {
    if(!error?.response) {
      fetchResult = {success: false, message: statusMessages.AXIOS_NO_SERVER_RESPONSE};
    } else {
      fetchResult = {...error?.response.data};
    }
  }
  return fetchResult;
}
  // POST: reset pass word
  export const resetPassword = async (userID, token, credentials) => {
    let fetchResult; 
    try {
      const response = await axiosAuthentication.post(`/api/v1/password-reset/${userID}/${token}`, credentials);
      fetchResult = {...response?.data}
    } catch (error) {
      if(!error?.response) {
        fetchResult = {success: false, message: statusMessages.AXIOS_NO_SERVER_RESPONSE};
      } else {
        fetchResult = {...error?.response.data};
      }
    }
    console.log(fetchResult)
    return fetchResult;
  }