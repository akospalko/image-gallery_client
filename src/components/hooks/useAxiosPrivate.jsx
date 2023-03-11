// interceptor for axios private instance with content-type: multipart/form-data // add bearer token to reqs w/o AT || refresh expired AT
// TODO: create reusable axiosPrivate interceptors (one for application/json and the other is for multipart/form-data)
import {useEffect} from "react"
import {axiosPrivate} from "../../helper/axiosInstances"
import {useAuthContext} from "../contexts/AuthenticationContext"
import useRefreshToken from "./useRefreshToken"

const useAxiosPrivateApplicationJSON = () => {
  // CONTEXT
  const {auth} = useAuthContext();
  // HOOK
  const refresh = useRefreshToken();
  // EFFECT
  useEffect(() => {
    // INTERCEPTORS
    // for axios request
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config =>  {
        if(!config.headers['Authorization']) { // runs on first time user logs in
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`; // initial AT/ AT after refresh
        }
        return config;
      }, (error) => Promise.reject(error)
    );
    // for axios response
    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response, // if we have response -> return
      async (error) => { // if token has expired -> refresh token
        const prevRequest = error?.config;
        if(error?.response.status === 403 && !prevRequest?.sent) { // if 403 and request is not yet sent
          prevRequest.sent = true; // we only want to retry sending request once -> set sent to true  
          const newAccesToken = await refresh(); // get new accesToken
          prevRequest.headers['Authorization'] = `Bearer ${newAccesToken}`; // set up new token in the auth header
          return axiosPrivate(prevRequest); // pass request again with the renewed access token
        }
        return Promise.reject(error);
      }
    )
    // remove interceptors (on component unmount)
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept); // pass in interceptor to remove
      axiosPrivate.interceptors.response.eject(responseIntercept); 
    }
  },[auth, refresh])
  return axiosPrivate;
}

export default useAxiosPrivateApplicationJSON;