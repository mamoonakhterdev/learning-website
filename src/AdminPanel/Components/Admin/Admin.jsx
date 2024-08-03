// src/AdminPanel/Admin.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../Layout/AdminLayout';
import AdminHome from '../Home/Home';
import PrivateRoute from '../../OATH/Protect';
import DataTable from '../DataTable/DataTable';
import DataForm from '../Form/Form';
import { useAuth } from '../../OATH/AuthContext';

const Admin = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<PrivateRoute><AdminHome /></PrivateRoute>} />
        <Route path="datatable" element={<PrivateRoute><DataTable /></PrivateRoute>} />
        <Route path="form" element={<PrivateRoute><DataForm /></PrivateRoute>} />
        <Route path="*" element={<PrivateRoute><AdminHome /></PrivateRoute>} />
      </Route>
    </Routes>
  );
};

export default Admin;
