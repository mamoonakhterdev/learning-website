import React, { useState } from 'react';
import Header from './Header';
import DrawerComponent from '../Drawar/Drawar';
import Footer from './Footer';
import { Box } from '@mui/material';

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header onDrawerToggle={handleDrawerToggle} />
      <DrawerComponent open={drawerOpen} onClose={handleDrawerToggle} />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
