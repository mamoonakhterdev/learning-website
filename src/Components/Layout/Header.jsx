import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link, useNavigate } from 'react-router-dom';
import DrawerComponent from '../Drawar/Drawar';
import Cookies from 'js-cookie';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    const token = Cookies.get('jwt');
    if (token) {
      // Here you should have a better check to validate if the user is an admin.
      setIsAdmin(true);
    }
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
              Learning Fun Zone
            </Link>
          </Typography>
          {isAdmin && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="admin-panel"
              onClick={() => navigate('/admin/dashboard')}
            >
              <AdminPanelSettingsIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <DrawerComponent open={drawerOpen} onClose={handleDrawerToggle} />
    </>
  );
};

export default Header;
