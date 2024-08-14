import React, { useContext, useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, Collapse, ListItemIcon, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ExpandLess, ExpandMore, Home, Science, TextFields, Dashboard, Settings } from '@mui/icons-material';
import { ClientContext } from '../../Route/ClientAuth/ClientContext';

const drawerWidth = 240;

const drawerItems = [
  { text: 'Home', path: '/' },
  {text: 'Setting', path: '/setting'}
];



const DrawerComponent = ({ open, onClose, isAuthenticated }) => {

  const { userData } = useContext(ClientContext);
  const [openDropdown, setOpenDropdown] = useState('');


  // Function to handle closing the drawer and hiding dropdowns
  const handleClose = () => {
    onClose();
    setOpenDropdown(''); // Hide dropdowns when closing the drawer
  };

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={handleClose}
      ModalProps={{
        keepMounted: true,
        onBackdropClick: handleClose,
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#3f51b5',
          color: '#fff',
        },
      }}
    >
      <Box sx={{ padding: '16px' }}>
        <Typography variant="h6">{userData === null ? "Login":userData.name}</Typography>
        <Typography variant="h6">Menu</Typography>
      </Box>
      <Divider />
      <List>
        {drawerItems.map((item) => (
          <ListItem button component={Link} to={item.path} key={item.text} onClick={handleClose}>
            <ListItemIcon>
              {item.text === "Home" ? <Home sx={{ color: '#fff' }} />:<Settings sx={{color: '#fff'}} />}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        {/* Admin routes */}
        {isAuthenticated && (
          <>
            <Divider />
            <ListItem button component={Link} to="/admin-dashboard" onClick={handleClose}>
              <ListItemIcon>
                <Dashboard sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Admin Dashboard" />
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );
};

export default DrawerComponent;
