import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AdminHeader = ({ onDrawerToggle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem('isAdmin');
      Cookies.remove('jwt');
      navigate('/'); // Redirect to login or admin page
    } catch (error) {
      console.error('Logout failed:', error); // Error handling
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2E3B55' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          <LogoutIcon />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
