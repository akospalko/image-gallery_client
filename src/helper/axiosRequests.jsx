// TODO: replace status message strings with CONSTANTS 
// list of requests made to the api
import {axiosAuthentication} from '../helper/axiosInstances'
import {statusMessages} from './dataStorage';
// IMAGE ENTRY 
// GET all image entries, update state with fetched response data
export const getAllImageEntries = async (axiosInstance) => {
  let fetchedData; 
  try {
    const response = await axiosInstance.get('/api/v1/image-entry');
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
export const getSingleImageEntry = async (activeID, axiosInstance) => {
  if(!activeID) return;
  let fetchedData; 
  try { 
    const response = await axiosInstance.get(`/api/v1/image-entry/${activeID}`);
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
export const postImageEntry = async (entryData, axiosInstance) => {
  if(!entryData) return;
  let fetchResult; 
  try {
    const response = await axiosInstance.post(`/api/v1/image-entry`, entryData);
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
export const updateImageEntry = async (activeID, entryData, axiosInstance) => {
  if(!activeID && !entryData) return;
  let fetchResult; 
  try { 
    const response = await axiosInstance.patch(`/api/v1/image-entry/${activeID}`, entryData);
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
export const deleteImageEntry = async (activeID, axiosInstance) => { 
  if(!activeID) return;
  let fetchResult; 
  try { 
    const response = await axiosInstance.delete(`/api/v1/image-entry/${activeID}`)
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