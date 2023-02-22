import axios from '../../helper/axiosInstances'
import {useAuthContext} from '../contexts/AuthenticationContext'
// import {refreshToken} from '../../helper/axiosRequests'

const useRefreshToken = () => {
  const {auth, setAuth} = useAuthContext();
    // axios options
    // console.log('ref token auth: ', auth)
    const refreshToken = async () => {
      const response = await axios.get('/refresh', {
          withCredentials: true
      });
      setAuth(prev => {
          console.log(prev);
          console.log(response.data.accessToken);
          return { ...prev, accessToken: response.data.accessToken }
      });
      return response.data.accessToken;
  }
  return refreshToken;
}

export default useRefreshToken;