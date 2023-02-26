// send logout request to server -> empty auth, 
import { useEffect } from 'react'
import { useAuthContext } from '../contexts/AuthenticationContext'
import { logoutUser } from '../../helper/axiosRequests';
import { useNavigate } from 'react-router';


export default function Logout() {
  // ROUTE
  const navigate = useNavigate();
  // CONTEXT
  const {setAuth} = useAuthContext();
  // HANDLER
  const logoutUserHandler = async () => {
    console.log('activated');
    try {
      const response = await logoutUser()  
      console.log(response); 
      // empty auth state
      setAuth({});
      navigate('/home');
    } catch(error) {
      // error message
    }
  }
  //EFFECT
  useEffect(() => {
      logoutUserHandler()
    }, [])


  return logoutUserHandler
}
