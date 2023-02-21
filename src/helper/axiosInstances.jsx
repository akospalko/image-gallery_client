// axios instances, configuration
import axios from 'axios'
// URL
const BASE_URL = 'http://localhost:3000';
// INSTANCES
// access private resources  
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {"content-type": "multipart/form-data"},
  withCredentials: true
});

// TODO: instances for other requests (e.g. auth)...
