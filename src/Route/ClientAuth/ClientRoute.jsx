// src/ClientAuth/ClientRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ClientContext } from './ClientContext'; // Import ClientContext
import { useLocation } from 'react-router-dom';

const ClientRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(ClientContext); // Access authentication status
  const location = useLocation();

  // Allow access to login and signup pages only for unauthenticated users
  if (!isAuthenticated && (location.pathname === '/login' || location.pathname === '/signup')) {
    return Element;
  }

  // Redirect authenticated users away from login and signup pages
  if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/signup')) {
    return <Navigate to="/" replace />;
  }

  // Handle private routes
  return isAuthenticated ? Element : <Navigate to="/login" replace />;
};

export default ClientRoute;
