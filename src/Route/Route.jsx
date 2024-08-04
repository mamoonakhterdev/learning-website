// Route.jsx
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from "../Components/Layout/Layout"
import Home from '../Components/Home/Home';
import TableComponent from '../Components/TableComponent';
import Admin from "../AdminPanel/Components/Admin/Admin";
import AdminLogin from '../AdminPanel/OATH/AdminLogin';
import EnglishWorksheets from '../Components/Worksheets/English/EnglishWorksheets';
import ScienceWorksheets from '../Components/Worksheets/Science/ScienceWorksheets';
import SearchFilter from '../Components/Worksheets/SearchFilter/searchFilter';
import BrowseWorksheets from '../Components/Worksheets/BrowseWorksheets/browseWorksheets';

const SearchFilterWrapper = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  return query ? <SearchFilter query={query} /> : <Navigate to="/" />;
};

const AppRoutes = () => (
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
    <Route path="/free-worksheets" element={<Layout><BrowseWorksheets /></Layout>} />
    <Route path="/free-worksheets/english" element={<Layout><EnglishWorksheets /></Layout>} />
    <Route path="/free-worksheets/science" element={<Layout><ScienceWorksheets /></Layout>} />

    <Route path="/search" element={<Layout><SearchFilterWrapper /></Layout>} />
    
    {/* Not Found */}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRoutes;
