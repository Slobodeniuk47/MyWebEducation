import { Navigate } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
