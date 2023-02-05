// list of requests made to the api
import axios from 'axios';
const baseURL = 'http://localhost:3000';

// get all image entries
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

// get entry
export const getSingleImageEntry = async (activeID) => {
  let customResponseObj = {};
  if(!activeID) return;
  try { 
    const res = await axios.patch(`${baseURL}/api/v1/image-entry/${activeID}`)
    if(String(res.status)[0] === '2') {
      customResponseObj = { data: res.data.task, resStatus: 'GET_ENTRIES_SUCCESS' }
    } 
  } catch (error) {
    customResponseObj = { data: res.data.task, resStatus:  'GET_ENTRIES_FAILED' }
  }
  return customResponseObj;
}
// create entry
export const postImageEntry = async (imageEntry) => {
  if(!imageEntry) return;
  try {
    const res = await axios.post(`${baseURL}/api/v1/image-entry`, imageEntry)
    if(String(res.status)[0] === '2') {
      return 'CREATE_ENTRIES_SUCCESS'; 
    } 
  } catch (error) {
      return 'CREATE_ENTRIES_FAILED';
    }
}
// update entry

// delete entry
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
