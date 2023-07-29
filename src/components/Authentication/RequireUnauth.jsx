// Navigate auth users to home page when trying to access auth pages (e.g. using mobile nav back button )
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthenticationContext';

const RequireUnauth = () => {
  const { auth } = useAuthContext();
  const location = useLocation();

  return (
    auth?.username ? 
    <Navigate to="/" state={{ from: location }} replace />
    : 
    <Outlet />  
  );
}

export default RequireUnauth;