// src/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from '../Components/Layout/Layout';
import Home from '../Components/Home/Home';
import TableComponent from '../Components/TableComponent';
import Admin from '../AdminPanel/Components/Admin/Admin';
import AdminLogin from '../AdminPanel/OATH/AdminLogin';
import EnglishWorksheets from '../Components/Worksheets/English/EnglishWorksheets';
import ScienceWorksheets from '../Components/Worksheets/Science/ScienceWorksheets';
import SearchFilter from '../Components/Worksheets/SearchFilter/searchFilter';
import BrowseWorksheets from '../Components/Worksheets/BrowseWorksheets/browseWorksheets';
import Login from './ClientAuth/Login';
import Signup from './ClientAuth/SignUp';
import ClientRoute from './ClientAuth/ClientRoute';
import ClientProvider from './ClientAuth/ClientContext'; // Correct import for ClientProvider
import { AuthProvider } from '../AdminPanel/OATH/AuthContext';
import Setting from '../Components/Setting/Setting';

// Wrapper for SearchFilter with query handling
const SearchFilterWrapper = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  return query ? <SearchFilter query={query} /> : <Navigate to="/" />;
};

// Main Routes component
const AppRoutes = () => (
  <ClientProvider>
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Client Routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/setting" element={<ClientRoute element={<Layout><Setting /></Layout>} />} />
        <Route path="/free-worksheets/english" element={<ClientRoute element={<Layout><EnglishWorksheets /></Layout>} />} />
        <Route path="/free-worksheets/science" element={<ClientRoute element={<Layout><ScienceWorksheets /></Layout>} />} />
        <Route path="/search" element={<ClientRoute element={<SearchFilterWrapper />} />} />
        <Route path="/free-worksheets" element={<ClientRoute element={<BrowseWorksheets />} />} />

        {/* Additional Routes for Different Grades and Subjects */}
        {/* Science Routes */}
        <Route path="/free-worksheets/science/kindergarten" element={<ClientRoute element={<Layout><TableComponent subject="Science" grade="Kindergarten" category="worksheet" /></Layout>} />} />
        <Route path="/free-worksheets/science/grade-1" element={<ClientRoute element={<Layout><TableComponent subject="Science" grade="Grade 1" category="worksheet" /></Layout>} />} />
        <Route path="/free-worksheets/science/grade-2" element={<ClientRoute element={<Layout><TableComponent subject="Science" grade="Grade 2" category="worksheet" /></Layout>} />} />
        <Route path="/free-worksheets/science/grade-3" element={<ClientRoute element={<Layout><TableComponent subject="Science" grade="Grade 3" category="worksheet" /></Layout>} />} />
        <Route path="/free-worksheets/science/grade-4" element={<ClientRoute element={<Layout><TableComponent subject="Science" grade="Grade 4" category="worksheet" /></Layout>} />} />
        <Route path="/free-worksheets/science/grade-5" element={<ClientRoute element={<Layout><TableComponent subject="Science" grade="Grade 5" category="worksheet" /></Layout>} />} />
        <Route path="/free-worksheets/science/grade-6" element={<ClientRoute element={<Layout><TableComponent subject="Science" grade="Grade 6" category="worksheet" /></Layout>} />} />
        <Route path="/free-worksheets/science/grade-7" element={<ClientRoute element={<Layout><TableComponent subject="Science" grade="Grade 7" category="worksheet" /></Layout>} />} />
        <Route path="/free-worksheets/science/grade-8" element={<ClientRoute element={<Layout><TableComponent subject="Science" grade="Grade 8" category="worksheet" /></Layout>} />} />

        {/* English Routes */}
        <Route path="/free-worksheets/english/kindergarten" element={<ClientRoute element={<Layout><TableComponent subject="English" grade="Kindergarten" category="worksheet" /></Layout>} />} />
        <Route path="/free-worksheets/english/grade-1" element={<ClientRoute element={<Layout><TableComponent subject="English" grade="Grade 1" category="worksheet" /></Layout>} />} />
        <Route path="/free-worksheets/english/grade-2" element={<ClientRoute element={<Layout><TableComponent subject="English" grade="Grade 2" category="worksheet" /></Layout>} />} />
        <Route path="/free-worksheets/english/grade-3" element={<ClientRoute element={<Layout><TableComponent subject="English" grade="Grade 3" category="worksheet" /></Layout>} />} />
        <Route path="/free-worksheets/english/grade-4" element={<ClientRoute element={<Layout><TableComponent subject="English" grade="Grade 4" category="worksheet" /></Layout>} />} />
        <Route path="/free-worksheets/english/grade-5" element={<ClientRoute element={<Layout><TableComponent subject="English" grade="Grade 5" category="worksheet" /></Layout>} />} />
        <Route path="/free-worksheets/english/grade-6" element={<ClientRoute element={<Layout><TableComponent subject="English" grade="Grade 6" category="worksheet" /></Layout>} />} />
        <Route path="/free-worksheets/english/grade-7" element={<ClientRoute element={<Layout><TableComponent subject="English" grade="Grade 7" category="worksheet" /></Layout>} />} />
        <Route path="/free-worksheets/english/grade-8" element={<ClientRoute element={<Layout><TableComponent subject="English" grade="Grade 8" category="worksheet" /></Layout>} />} />

        {/* Admin Routes */}
        <Route path="/wp-admin" element={<AdminLogin />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </AuthProvider>
  </ClientProvider>
);

export default AppRoutes;
