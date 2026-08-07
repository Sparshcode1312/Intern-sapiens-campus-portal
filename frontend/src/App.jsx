import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import Login from './pages/Login';
import CentreHeadDashboard from './pages/dashboards/CentreHeadDashboard';
import RegionalDashboard from "./pages/RegionalHead/RegionalDashboard";
import ApproverDashboard from './pages/dashboards/ApproverDashboard';
import NewRequirement from './pages/NewRequirement';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route 
              path="centre-head" 
              element={
                <ProtectedRoute allowedRoles={['Centre Head']}>
                  <CentreHeadDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route
  path="new-requirement"
  element={
    <ProtectedRoute allowedRoles={['Centre Head']}>
      <NewRequirement />
    </ProtectedRoute>
  }
/>
            
            <Route 
              path="cluster-manager" 
              element={
                <ProtectedRoute allowedRoles={['Cluster Manager']}>
                  <ApproverDashboard roleName="Cluster Manager" />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="department-head" 
              element={
                <ProtectedRoute allowedRoles={['Department Head']}>
                  <ApproverDashboard roleName="Department Head" />
                </ProtectedRoute>
              } 
            />
           <Route
  path="regional-head"
  element={
    <ProtectedRoute allowedRoles={['Regional Head']}>
      <RegionalDashboard />
    </ProtectedRoute>
  }
/>
            <Route 
              path="director" 
              element={
                <ProtectedRoute allowedRoles={['Director']}>
                  <ApproverDashboard roleName="Director" />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="chairperson" 
              element={
                <ProtectedRoute allowedRoles={['Chairperson']}>
                  <ApproverDashboard roleName="Chairperson" />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="purchase-manager" 
              element={
                <ProtectedRoute allowedRoles={['Purchase Manager']}>
                  <ApproverDashboard roleName="Purchase Manager" />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="accounts" 
              element={
                <ProtectedRoute allowedRoles={['Accounts']}>
                  <ApproverDashboard roleName="Accounts" />
                </ProtectedRoute>
              } 
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
