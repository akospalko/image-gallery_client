// List of requests made to the api
import axios from 'axios';
import { axiosAuthentication } from '../helper/axiosInstances'
import { STATUS_MESSAGES } from './statusMessages';

// PHOTO ENTRY 
// GET all photo entries -> gallery (all gallery photos || photos added to user's own collection) protected resources 
export const getAllGalleryPhotoEntries = async (axiosInstance, userID, collectionType) => {
  let fetchedData; 
  try {
    const response = await axiosInstance.get(`/api/v1/photo-gallery/?userID=${userID}&collectionType=${collectionType}`);
    fetchedData = {...response?.data}; 
  } catch (error) {
    if(!error?.response) {
      fetchedData = {success: false, message: STATUS_MESSAGES.AXIOS_NO_SERVER_RESPONSE};
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
      fetchedData = {success: false, message: STATUS_MESSAGES.AXIOS_NO_SERVER_RESPONSE};
    } else {
      fetchedData = {...error?.response.data};
    }
  }
  return fetchedData;
}
// GET single entry, update state with fetched response data
export const getSinglePhotoEntry = async (activePhotoEntry, axiosInstance, collection, userID) => {
  if(!activePhotoEntry) return;
  let fetchedData; 
  try { 
    const response = await axiosInstance.get(`/api/v1/photo-gallery/${collection}/${activePhotoEntry}/?userID=${userID}`);
    fetchedData = {...response?.data}; 
  } catch (error) {
    if(!error?.response) {
      fetchedData = {success: false, message: STATUS_MESSAGES.AXIOS_NO_SERVER_RESPONSE};
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
      fetchResult = {success: false, message: STATUS_MESSAGES.AXIOS_NO_SERVER_RESPONSE};
    } else {
      fetchResult = {...error?.response.data};
    }
  }
  return fetchResult;
}
// PATCH (update)
export const updatePhotoEntry = async (activePhotoEntry, entryData, axiosInstance, collection) => {
  if(!activePhotoEntry || !entryData) return;
  let fetchResult; 
  try { 
    const response = await axiosInstance.patch(`/api/v1/photo-gallery/${collection}/${activePhotoEntry}`, entryData);
    fetchResult = {...response?.data};
  } catch (error) {
    if(!error?.response) {
      fetchResult = {success: false, message: STATUS_MESSAGES.AXIOS_NO_SERVER_RESPONSE};
    } else {
      fetchResult = {...error?.response.data};
    }
  }
  return fetchResult;
}
// DELETE
export const deletePhotoEntry = async (activePhotoEntry, axiosInstance, collection) => { 
  if(!activePhotoEntry) return;
  let fetchResult; 
  try { 
    const response = await axiosInstance.delete(`/api/v1/photo-gallery/${collection}/${activePhotoEntry}`)
    fetchResult = {...response?.data};
  } catch (error) {
    if(!error?.response) {
      fetchResult = {success: false, message: STATUS_MESSAGES.AXIOS_NO_SERVER_RESPONSE};
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
      fetchResult = {success: false, message: STATUS_MESSAGES.AXIOS_NO_SERVER_RESPONSE};
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
      fetchResult = {success: false, message: STATUS_MESSAGES.AXIOS_NO_SERVER_RESPONSE};
    } else {
      fetchResult = {...error?.response.data};
    }
  }
  return fetchResult;
}
// PHOTO ENTRY LIKE
// PATCH (create/update) // update photo entry like state: add 
export const addPhotoEntryLike = async (userID, photoEntryID, axiosInstance) => {
  let fetchResult; 
  try { 
    const response = await axiosInstance.patch(`/api/v1/photo-user-like/${userID}/${photoEntryID}`);
    fetchResult = {...response?.data};
  } catch (error) {
    if(!error?.response) {
      fetchResult = {success: false, message: STATUS_MESSAGES.AXIOS_NO_SERVER_RESPONSE};
    } else {
      fetchResult = {...error?.response.data};
    }
  }
  return fetchResult;
}
// DELETE // update photo entry like state: remove 
export const removePhotoEntryLike = async (userID, photoEntryID, axiosInstance) => {
  let fetchResult; 
  try { 
    const response = await axiosInstance.delete(`/api/v1/photo-user-like/${userID}/${photoEntryID}`);
    fetchResult = {...response?.data};
  } catch (error) {
    if(!error?.response) {
      fetchResult = {success: false, message: STATUS_MESSAGES.AXIOS_NO_SERVER_RESPONSE};
    } else {
      fetchResult = {...error?.response.data};
    }
  }
  return fetchResult;
}
// PHOTO ENTRY DOWNLOAD
// PATCH // update photo downloads tracker, download file
export const downloadPhotoEntry = async (userID, photoEntryID, axiosInstance) => {
  let fetchResult; 
  try { 
    const response = await axiosInstance.patch(`/api/v1/photo-downloads/${ userID }/${ photoEntryID }`);
    fetchResult = { ...response?.data };
  } catch (error) {
    if(!error?.response) {
      fetchResult = { success: false, message: STATUS_MESSAGES.AXIOS_NO_SERVER_RESPONSE };
    } else {
      fetchResult = { ...error?.response.data };
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
      // console.log(error)
     fetchResult = {success: false, message: STATUS_MESSAGES.AXIOS_NO_SERVER_RESPONSE};
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
      fetchResult = {success: false, message: STATUS_MESSAGES.AXIOS_NO_SERVER_RESPONSE};
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
      fetchResult = {success: false, message: STATUS_MESSAGES.AXIOS_NO_SERVER_RESPONSE};
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
      fetchResult = {success: false, message: STATUS_MESSAGES.AXIOS_NO_SERVER_RESPONSE};
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
      fetchResult = {success: false, message: STATUS_MESSAGES.AXIOS_NO_SERVER_RESPONSE};
    } else {
      fetchResult = {...error?.response.data};
    }
  }
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
      fetchResult = {success: false, message: STATUS_MESSAGES.AXIOS_NO_SERVER_RESPONSE};
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
        fetchResult = {success: false, message: STATUS_MESSAGES.AXIOS_NO_SERVER_RESPONSE};
      } else {
        fetchResult = {...error?.response.data};
      }
    }
    return fetchResult;
  }

  // PROJECT METRICS
  // GET project metrics: unprotected resource
  export const getProjectMetrics = async (axiosInstance) => {
    let fetchedData; 
    try {
      const response = await axiosInstance.get('/api/v1/project-metrics');
      fetchedData = {...response?.data}; 
    } catch (error) {
      if(!error?.response) {
        fetchedData = {success: false, message: STATUS_MESSAGES.AXIOS_NO_SERVER_RESPONSE};
      } else {
        fetchedData = {...error?.response.data};
      }
    }
    return fetchedData;
  }