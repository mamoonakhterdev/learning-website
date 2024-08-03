// src/Components/Layout/Layout.js
import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from "./Footer"
import Cookies from 'js-cookie';

const Layout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get('jwt');
    setIsAuthenticated(!!token);
  }, []);

  // Determine if the current route is for admin
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CssBaseline />
      {!isAdminRoute && <Header />}
      <main style={{ padding: isAdminRoute ? '20px' : '20px 0px', margin: isAdminRoute ? '0':"5vw 0" }}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default Layout;
