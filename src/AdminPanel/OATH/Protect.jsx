// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from './AuthContext';
const PrivateRoute = ({ children }) => {


  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/wp-admin" />;
  }
  return children;
};


export default PrivateRoute;
