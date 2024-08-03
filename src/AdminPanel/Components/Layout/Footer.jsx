// src/AdminPanel/Components/AdminFooter.js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const AdminFooter = () => {
  return (
    <AppBar position="static" color="primary" style={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <Typography variant="body1" style={{ flexGrow: 1 }}>
          Admin Panel Footer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AdminFooter;
