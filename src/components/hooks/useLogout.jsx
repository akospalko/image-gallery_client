// send logout request to server -> empty auth state, navigate
import { useAuthContext } from '../contexts/AuthenticationContext'
import { logoutUser } from '../../helper/axiosRequests'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useThemeContext } from '../contexts/ThemeContext';

const useLogout = () => {
  // ROUTE
  const navigate = useNavigate();
  // CONTEXT
  const {auth, setAuth} = useAuthContext();
  const {theme} = useThemeContext();
  // HANDLER
  const logoutUserHandler = async () => {
    try {
      navigate(`/${auth.username}/logout`); // nav to loader page 
      const response = await logoutUser(); // logout request 
      const {message} = response ?? {};
      toast(`${message}`, { // send toast
        className: "shared-toast",
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: theme
      });
      setAuth({});  // empty auth state
      
    } catch(error) {
      // error message
    } finally {
      navigate('/'); // nav to home
    }
  }
  return logoutUserHandler;
}

export default useLogout;