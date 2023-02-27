// Hook: axios get request to refresh AT, update state with new auth data 
import {useAuthContext} from '../contexts/AuthenticationContext'
import {refreshToken} from '../../helper/axiosRequests'

const useRefreshToken = () => {
  // CONTEXT
  const {setAuth} = useAuthContext();
  // HANDLER
  const refresh = async () => {
    const response = await refreshToken();
    setAuth(prev => {
      return {...prev, accessToken: response.accessToken}
    });
    return response.accessToken;
  }
  return refresh;
} 

export default useRefreshToken;