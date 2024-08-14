import React, { useState, useEffect, useContext } from 'react';
import { AppBar, Toolbar, IconButton, Typography, TextField, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import DrawerComponent from '../Drawar/Drawar';
import Cookies from 'js-cookie';
import { Height, Logout } from '@mui/icons-material';
import { ClientContext } from '../../Route/ClientAuth/ClientContext';
import user from './../../assets/images/user.png';
const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {userData} = useContext(ClientContext)
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

  const handleLogout = () => {
    // Clear authentication tokens and update state
    Cookies.remove('jwt');
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate('/login');
  };

  useEffect(() => {
    // Fetch the token from cookies
    const token = Cookies.get('jwt');
    if (token) {
      setIsAuthenticated(true);
      setIsAdmin(token.includes('admin')); // Replace with your own admin check
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
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
          {userData?.profileImage === null ? <img src={user} alt="Profile Image" className='profile-header' />:<img src={userData?.profileImage} alt="Profile Image" className='profile-header' />}
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
            {isAuthenticated && (
              <IconButton
                edge="end"
                color="inherit"
                aria-label="logout"
                onClick={handleLogout}
                sx={{ marginLeft: 1 }}
              >
                <Logout />
              </IconButton>
            )}
            {!isAuthenticated && (
              <>
                <button className='btn btn-primary' onClick={()=> navigate('/login')}>Login</button>
                <button className='btn btn-secondary m-lg-2' onClick={()=> navigate('/signup')}>Sign Up</button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <DrawerComponent open={drawerOpen} onClose={handleDrawerToggle} />
    </>
  );
};

export default Header;
