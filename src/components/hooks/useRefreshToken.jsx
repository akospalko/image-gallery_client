import { useAuthContext } from '../contexts/AuthenticationContext'
import {refreshToken} from '../../helper/axiosRequests'

export default async function useRefreshToken() {
  const {setAuth} = useAuthContext();
  //axios request
  const response = refreshToken(setAuth);
  console.log(response)
  return response;
}
