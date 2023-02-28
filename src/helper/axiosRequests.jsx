// TODO: replace status message strings with CONSTANTS 
// list of requests made to the api
import {axiosAuthentication} from '../helper/axiosInstances'
import {statusMessages} from './dataStorage';
// IMAGE ENTRY 
// GET all image entries -> home, gallery protected resources 
export const getAllImageEntries = async (axiosInstance, collection) => {
  let fetchedData; 
  try {
    const response = await axiosInstance.get(`/api/v1/image-entry/${collection}`);
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
// GET all image entries -> home image entries with unprotected resources
export const getAllHomePhotos = async (axiosInstance) => {
  let fetchedData; 
  try {
    const response = await axiosInstance.get('/api/v1/home-photos');
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
export const getSingleImageEntry = async (activeID, axiosInstance, collection) => {
  if(!activeID) return;
  let fetchedData; 
  try { 
    const response = await axiosInstance.get(`/api/v1/image-entry/${collection}/${activeID}`);
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
export const postImageEntry = async (entryData, axiosInstance, collection) => {
  if(!entryData) return;
  let fetchResult; 
  try {
    const response = await axiosInstance.post(`/api/v1/image-entry/${collection}`, entryData);
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
export const updateImageEntry = async (activeID, entryData, axiosInstance, collection) => {
  if(!activeID && !entryData) return;
  let fetchResult; 
  try { 
    const response = await axiosInstance.patch(`/api/v1/image-entry/${collection}/${activeID}`, entryData);
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
export const deleteImageEntry = async (activeID, axiosInstance, collection) => { 
  if(!activeID) return;
  let fetchResult; 
  try { 
    const response = await axiosInstance.delete(`/api/v1/image-entry/${collection}/${activeID}`)
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