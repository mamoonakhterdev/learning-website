import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, TextField, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import DrawerComponent from '../Drawar/Drawar';
import Cookies from 'js-cookie';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  useEffect(() => {
    const token = Cookies.get('jwt');
    if (token) {
      setIsAdmin(true);
    }
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ marginRight: isMobile ? 0 : 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              textAlign: isMobile ? 'center' : 'left',
              marginBottom: isMobile ? 1 : 0,
            }}
          >
            <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
              Learning Fun Zone
            </Link>
          </Typography>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: isMobile ? 'column' : 'row',
              width: isMobile ? '100%' : 'auto',
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search Worksheets"
              size="small"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              sx={{
                marginBottom: isMobile ? 1 : 0,
                width: isMobile ? '100%' : '200px',
                background: "#fff",
              }}
            />
            <IconButton
              color="inherit"
              aria-label="search"
              onClick={handleSearchSubmit}
              sx={{ marginBottom: isMobile ? 1 : 0 }}
            >
              <SearchIcon />
            </IconButton>
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
          </div>
        </Toolbar>
      </AppBar>
      <DrawerComponent open={drawerOpen} onClose={handleDrawerToggle} />
    </>
  );
};

export default Header;
