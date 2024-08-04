// App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './AdminPanel/OATH/AuthContext';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import AppRoutes from './Route/Route';

const theme = createTheme({
  palette: {
    background: {
      default: '#f4f4f4', // Default background color
      paper: '#fff', // Background color for Paper components
    },
    primary: {
      main: '#1976d2', // Primary color
    },
    secondary: {
      main: '#dc004e', // Secondary color
    },
  },
  typography: {
    // Define your typography settings
  },
  // Add more theme customizations here
});

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
