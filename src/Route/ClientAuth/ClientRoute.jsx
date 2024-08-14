import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ClientContext } from './ClientContext';
import Cookies from 'js-cookie';
const ClientRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(ClientContext);
  const token = Cookies.get("jwt");
  if (isAuthenticated === null) {
    // Return null or a loading spinner if `isAuthenticated` is still being determined
    return <div>Loading...</div>;
  }

  if (token) {
    console.log("Authenticated");
    return Element;
  } else {
    console.log("Not Authenticated");
    return <Navigate to="/login" replace />;
  }
};

export default ClientRoute;
