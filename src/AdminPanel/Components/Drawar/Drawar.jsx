// src/AdminPanel/Components/AdminDrawer.jsx
import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const AdminDrawer = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        <ListItem button onClick={() => handleNavigation('/admin/dashboard')}>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/admin/datatable')}>
          <ListItemText primary="View Table" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/admin/form')}>
          <ListItemText primary="Add Form" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AdminDrawer;
