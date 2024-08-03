// src/Components/DrawerComponent.js
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, Collapse, ListItemIcon, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ExpandLess, ExpandMore, Home, Science, Calculate, Dashboard } from '@mui/icons-material';

const drawerWidth = 240;

const drawerItems = [
  { text: 'Home', path: '/' },
];

const subjects = [
  {
    subject: 'Science',
    icon: <Science sx={{ color: '#fff' }} />,
    grades: ['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'],
  },
  {
    subject: 'Math',
    icon: <Calculate sx={{ color: '#fff' }} />,
    grades: ['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'],
  },
];

const DrawerComponent = ({ open, onClose, isAuthenticated }) => {
  const [openDropdown, setOpenDropdown] = useState('');

  const handleDropdownClick = (subject) => {
    setOpenDropdown(openDropdown === subject ? '' : subject);
  };

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
        keepMounted: true, // Better open performance on mobile.
        onBackdropClick: handleClose,
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#3f51b5', // Match with header background
          color: '#fff',
        },
      }}
    >
      <Box sx={{ padding: '16px' }}>
        <Typography variant="h6">Menu</Typography>
      </Box>
      <Divider />
      <List>
        {drawerItems.map((item) => (
          <ListItem button component={Link} to={item.path} key={item.text} onClick={handleClose}>
            <ListItemIcon>
              <Home sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        {subjects.map((subject) => (
          <React.Fragment key={subject.subject}>
            <ListItem button onClick={() => handleDropdownClick(subject.subject)}>
              <ListItemIcon>
                {subject.icon}
              </ListItemIcon>
              <ListItemText primary={subject.subject} />
              {openDropdown === subject.subject ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openDropdown === subject.subject} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {subject.grades.map((grade) => (
                  <ListItem
                    button
                    component={Link}
                    to={`/${subject.subject.toLowerCase()}/${grade.toLowerCase().replace(' ', '-')}`}
                    key={grade}
                    sx={{ pl: 4 }}
                    onClick={handleClose} // Close the drawer on item click
                  >
                    <ListItemText primary={grade} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
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
