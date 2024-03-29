// axios instances, configuration
import axios from 'axios'
// URL
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// INSTANCES
// basic/default
export default axios.create({
  baseURL: BASE_URL
});
// access private resources with multipart/form-data
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {"Content-Type": "multipart/form-data"},
  withCredentials: true
});
export const axiosAuthentication = axios.create({
  baseURL: BASE_URL,
  headers: {'Content-Type': 'application/json'},
  withCredentials: true
});
