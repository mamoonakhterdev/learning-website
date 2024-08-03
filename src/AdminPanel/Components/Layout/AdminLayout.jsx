// src/AdminPanel/Components/AdminLayout.jsx
import React, { useState } from 'react';
import AdminHeader from '../Layout/Header'; // Correct path
import AdminDrawer from '../Drawar/Drawar'; // Correct path
import { Outlet } from 'react-router-dom';
import AdminFooter from './Footer';

const AdminLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AdminHeader onDrawerToggle={handleDrawerToggle} />
      <AdminDrawer open={drawerOpen} onClose={handleDrawerToggle} />
      <main style={{ padding: '20px', margin: "7vw 0" }}>
        <Outlet />
      </main>
      <AdminFooter />
    </>
  );
};

export default AdminLayout;
