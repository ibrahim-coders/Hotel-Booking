import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import Spinner from '../components/Spinner';

const PrivateRoute = ({ allowedRoles, children }) => {
  const user = useAuthStore(state => state.user);
  const loading = useAuthStore(state => state.loading);
  const location = useLocation();
  if (loading) return <Spinner />;

  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;

  if (!allowedRoles.includes(user?.role)) {
    if (user.role === 'Admin' && location.pathname !== '/deshboard/overview') {
      return <Navigate to={location.pathname} replace />;
    }
    if (
      user.role === 'Customer' &&
      location.pathname !== '/deshboard/browese-hotel'
    ) {
      return <Navigate to={location.pathname} replace />;
    }
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
