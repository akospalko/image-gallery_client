// send logout request to server -> empty auth state, navigate
import { useAuthContext } from '../contexts/AuthenticationContext'
import { logoutUser } from '../../helper/axiosRequests'
import { useNavigate } from 'react-router'

const useLogout = () => {
  // ROUTE
  const navigate = useNavigate();
  // CONTEXT
  const {setAuth} = useAuthContext();
  // HANDLER
  const logoutUserHandler = async () => {
    try {
      const response = await logoutUser();
      console.log(response); 
      // empty auth state
      setAuth({});
      navigate('/');
    } catch(error) {
      // error message
    }
  }
  return logoutUserHandler;
}

export default useLogout