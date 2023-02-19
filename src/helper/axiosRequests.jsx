// list of requests made to the api
import axios from 'axios'

// INITIAL VALUES / SETTINGS
// request header settings to allow sending image file and form text in one req (for post/patch)  
const baseURL = 'http://localhost:3000';
// option to send image + text data when posting an image entry
const options = {
  headers: {"content-type": "multipart/form-data"}
}
// GET 
// all image entries
export const getAllImageEntries = async () => {
  let customResponseObj = {};
  const res = await axios.get(`${baseURL}/api/v1/image-entry`);
  try {
    if(String(res.status)[0] === '2') {
      customResponseObj = { data: res.data.imageEntries, resStatusMessage: 'GET_ALL_ENTRIES_SUCCESS' };
    } 
  } catch (error) {
    customResponseObj = { data: res.data.tasks, resStatusMessage: 'GET_ALL_ENTRIES_FAILED' };
  }
  return customResponseObj;
}
 // re/fetch entries and update state (data) with the result
 export const refetchImageEntries = async (dataSetter) => {
  const response = await getAllImageEntries();
  dataSetter(response.data);
}
// GET
// single entry
export const getSingleImageEntry = async (activeID) => {
  if(!activeID) return;
  let customResponseObj = {};
  try { 
    const response = await axios.get(`${baseURL}/api/v1/image-entry/${activeID}`);
    if(String(response.status)[0] === '2') {
      customResponseObj = { data: response.data.imageEntry, resStatus: 'GET_ENTRIES_SUCCESS' }
    } 
  } catch (error) {
    customResponseObj = { resStatus: 'GET_ENTRIES_FAILED' }
  }
  return customResponseObj;
}
 // fetch single entry
 export const fetchImageEntry = async (activeID, activeIDSetter) => {
  const response = await getSingleImageEntry(activeID); 
  activeIDSetter(response.data);
}
// POST
export const postImageEntry = async (imageEntry) => {
  if(!imageEntry) return;
  try {
    const res = await axios.post(`${baseURL}/api/v1/image-entry`, imageEntry, options);
    if(String(res.status)[0] === '2') {
      return 'CREATE_ENTRIES_SUCCESS'; 
    } 
  } catch (error) {
      return 'CREATE_ENTRIES_FAILED';
    }
}
// PATCH (update)
export const updateImageEntry = async (activeID, imageEntry) => {
  if(!activeID && !imageEntry) return;
  try { 
    const res = await axios.patch(`${baseURL}/api/v1/image-entry/${activeID}`, imageEntry, options);
    if(String(res.status)[0] === '2') {
      return 'UPDATE_ENTRIES_SUCCESS';
    } 
  } catch (error) {
    return 'UPDATE_ENTRIES_FAILED'; 
  }
}
// DELETE
export const deleteImageEntry = async (activeID) => { 
  if(!activeID) return;
  try {
    const res = await axios.delete(`${baseURL}/api/v1/image-entry/${activeID}`)
    if(String(res.status)[0] === '2') {
      return 'DELETE_ENTRIES_SUCCESS';
    } 
  } catch (error) {
    return 'DELETE_ENTRIES_FAILED';
  }
}
// REGISTER NEW USER
// POST
export const createNewUser = async (userData) => {
  if(!userData) return;
  // axios options
  const options = {
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
  }
  try {
    const res = await axios.post(`${baseURL}/api/v1/register`, userData, options);
    if(String(res.status)[0] === '2') {
      console.log(res.status)
      return 'CREATE_USER_SUCCESS'; 
    } 
  } catch (error) {
    if(!error?.response) {
      console.log(error)
      return 'No server response';
    } else if(error?.response.status === 409) {
      return 'Username taken';
    } else {
      return 'Registration failed';
    }
  }
}