import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layout/components/MainLayout';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AdminRoutes;
