// interceptor for axios private instance: add bearer token to reqs w/o AT  
import {axiosPrivate} from "../../helper/axiosInstances"
import {useAuthContext} from "../contexts/AuthenticationContext"
import {useEffect} from "react"
import useRefreshToken from "./useRefreshToken"

const useAxiosPrivate = () => {
  const {auth, setAuth} = useAuthContext();
  const refreshToken = useRefreshToken(setAuth);
  useEffect(() => {
    // INTERCEPTORS
    // for axios request()
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config =>  {
        if(!config.headers['Authorization']) { // runs on first time user logs in
          config.headers['Authorization'] = `Bearer ${auth?.accesToken}` // initial AT/ AT after refresh
        }
        return config;
      }, (error) => {
        Promise.reject(error);
      }
    )
    // for axios response
    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response, // if we have response -> return
      async (error) => { // if token has expired -> refresh token
        const prevRequest = error?.config;
        if(error?.response.status === 403 && !prevRequest?.sent) { // if 403 and request is not yet sent
          prevRequest.sent = true; // we only want to retry sending request once -> set sent to true  
          const newAccesToken = await refreshToken(setAuth); // get new accesToken
          prevRequest.headers['Authorization'] = `Bearer ${newAccesToken}`; // set up new token in the auth header
          return axiosPrivate(newAccesToken); // make request again with the renewed access token
        }
        return Promise.reject(error);
      }
    )
    // remove interceptors (component unmount)
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept); // pass in interceptor to remove
      axiosPrivate.interceptors.response.eject(responseIntercept); 
    }
  },[auth, setAuth, refreshToken])
  return refreshToken;
}

export default useAxiosPrivate;