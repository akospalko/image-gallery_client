import {useLocation, Navigate, Outlet} from 'react-router-dom';
import {useAuthContext} from '../../contexts/AuthenticationContext';

const RequireAuth = ({allowedRoles}) => {
  const {auth} = useAuthContext();
  const location = useLocation();

  return (
    auth?.roles?.find(role => allowedRoles?.includes(role)) ? 
    <Outlet />  
    : 
    <Navigate to="/authentication" state={{ from: location }} replace />
  );
}

export default RequireAuth;