
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children, role }) => {
  const { auth } = useContext(AuthContext);

  if (!auth.isAuthenticated) {

    return <Navigate to={`/${role}/login`} />;
  }

  if (auth.user.role !== role) {

    return <Navigate to={`/${auth.user.role}/dashboard`} />;
  }

  return children;
};

export default PrivateRoute;
