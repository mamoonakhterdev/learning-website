import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import TableComponent from './Components/TableComponent';
import Admin from "./AdminPanel/Components/Admin/Admin";
import AdminLogin from './AdminPanel/OATH/AdminLogin';
import { AuthProvider, useAuth } from './AdminPanel/OATH/AuthContext';
import Cookies from 'js-cookie';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import EnglishWorksheets from './Components/Worksheets/English/EnglishWorksheets';
import ScienceWorksheets from './Components/Worksheets/Science/ScienceWorksheets';
import SearchFilter from './Components/Worksheets/SearchFilter/searchFilter';
// const AdminRoutes = () => {
//   const { isAuthenticated } = useAuth();

//   if (!isAuthenticated) {
//     return <Navigate to="/wp-admin" />;
//   }

//   return <Admin />;
// };
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
  // const [isLoading, setIsLoading] = useState(true);
  // const { setIsAuthenticated } = useAuth();

  // useEffect(() => {
  //   const token = Cookies.get('jwt');
  //   const isAdmin = localStorage.getItem('isAdmin');
  //   setIsAuthenticated(!!token && isAdmin === 'true');
  //   setIsLoading(false);
  // }, [setIsAuthenticated]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/wp-admin" element={<AdminLogin />} />
          <Route path="/admin/*" element={<Admin />} />

          {/* Client Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/english" element={<Layout><EnglishWorksheets /></Layout>} />
          <Route path="/science" element={<Layout><ScienceWorksheets /></Layout>} />
          
          {/* Science Routes */}
          <Route path="/science/kindergarten" element={<Layout><TableComponent subject="Science" grade="Kindergarten" category="worksheet" /></Layout>} />
          <Route path="/science/grade-1" element={<Layout><TableComponent subject="Science" grade="Grade 1" category="worksheet" /></Layout>} />
          <Route path="/science/grade-2" element={<Layout><TableComponent subject="Science" grade="Grade 2" category="worksheet" /></Layout>} />
          <Route path="/science/grade-3" element={<Layout><TableComponent subject="Science" grade="Grade 3" category="worksheet" /></Layout>} />
          <Route path="/science/grade-4" element={<Layout><TableComponent subject="Science" grade="Grade 4" category="worksheet" /></Layout>} />
          <Route path="/science/grade-5" element={<Layout><TableComponent subject="Science" grade="Grade 5" category="worksheet" /></Layout>} />
          <Route path="/science/grade-6" element={<Layout><TableComponent subject="Science" grade="Grade 6" category="worksheet" /></Layout>} />
          <Route path="/science/grade-7" element={<Layout><TableComponent subject="Science" grade="Grade 7" category="worksheet" /></Layout>} />
          <Route path="/science/grade-8" element={<Layout><TableComponent subject="Science" grade="Grade 8" category="worksheet" /></Layout>} />
          

          {/* English Routes */}
          <Route path="/english/kindergarten" element={<Layout><TableComponent subject="Math" grade="Kindergarten" category="worksheet" /></Layout>} />
          <Route path="/english/grade-1" element={<Layout><TableComponent subject="Math" grade="Grade 1" category="worksheet" /></Layout>} />
          <Route path="/english/grade-2" element={<Layout><TableComponent subject="Math" grade="Grade 2" category="worksheet" /></Layout>} />
          <Route path="/english/grade-3" element={<Layout><TableComponent subject="Math" grade="Grade 3" category="worksheet" /></Layout>} />
          <Route path="/english/grade-4" element={<Layout><TableComponent subject="Math" grade="Grade 4" category="worksheet" /></Layout>} />
          <Route path="/english/grade-5" element={<Layout><TableComponent subject="Math" grade="Grade 5" category="worksheet" /></Layout>} />
          <Route path="/english/grade-6" element={<Layout><TableComponent subject="Math" grade="Grade 6" category="worksheet" /></Layout>} />
          <Route path="/english/grade-7" element={<Layout><TableComponent subject="Math" grade="Grade 7" category="worksheet" /></Layout>} />
          <Route path="/english/grade-8" element={<Layout><TableComponent subject="Math" grade="Grade 8" category="worksheet" /></Layout>} />
          


          <Route path="/:subject/:grade" element={<Layout><TableComponent /></Layout>} />

          <Route path="/search" element={<Layout><SearchFilterWrapper /></Layout>} />
          {/* Not Found */}
          <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};
const SearchFilterWrapper = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  return query ? <SearchFilter query={query} /> : <Navigate to="/" />;
};

export default App;