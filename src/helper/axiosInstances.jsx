// axios instances, configuration
import axios from 'axios'
// URL
const BASE_URL = 'http://localhost:3000'; // TODO: change URL to live  api's URL after production
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
