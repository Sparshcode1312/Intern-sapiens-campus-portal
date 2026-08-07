import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";

import Login from "./pages/Login";
import CentreHeadDashboard from "./pages/dashboards/CentreHeadDashboard";
import ApproverDashboard from "./pages/dashboards/ApproverDashboard";
import NewRequirement from "./pages/NewRequirement";

import RegionalDashboard from "./pages/RegionalHead/RegionalDashboard";
import Notesheets from "./pages/RegionalHead/Notesheets";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Default */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>

            {/* Centre Head */}
            <Route
              path="centre-head"
              element={
                <ProtectedRoute allowedRoles={["Centre Head"]}>
                  <CentreHeadDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="new-requirement"
              element={
                <ProtectedRoute allowedRoles={["Centre Head"]}>
                  <NewRequirement />
                </ProtectedRoute>
              }
            />

         
              
            {/* Cluster Manager */}
            <Route
              path="cluster-manager"
              element={
                <ProtectedRoute allowedRoles={["Cluster Manager"]}>
                  <ApproverDashboard roleName="Cluster Manager" />
                </ProtectedRoute>
              }
            />

            {/* Department Head */}
            <Route
              path="department-head"
              element={
                <ProtectedRoute allowedRoles={["Department Head"]}>
                  <ApproverDashboard roleName="Department Head" />
                </ProtectedRoute>
              }
            />

            {/* Director */}
            <Route
              path="director"
              element={
                <ProtectedRoute allowedRoles={["Director"]}>
                  <ApproverDashboard roleName="Director" />
                </ProtectedRoute>
              }
            />

            {/* Chairperson */}
            <Route
              path="chairperson"
              element={
                <ProtectedRoute allowedRoles={["Chairperson"]}>
                  <ApproverDashboard roleName="Chairperson" />
                </ProtectedRoute>
              }
            />

            {/* Purchase Manager */}
            <Route
              path="purchase-manager"
              element={
                <ProtectedRoute allowedRoles={["Purchase Manager"]}>
                  <ApproverDashboard roleName="Purchase Manager" />
                </ProtectedRoute>
              }
            />

            {/* Accounts */}
            <Route
              path="accounts"
              element={
                <ProtectedRoute allowedRoles={["Accounts"]}>
                  <ApproverDashboard roleName="Accounts" />
                </ProtectedRoute>
              }
            />

          </Route>

          <Route
    path="/regional-head"
    element={
        <ProtectedRoute allowedRoles={["Regional Head"]}>
            <RegionalDashboard />
        </ProtectedRoute>
    }
/>

<Route
    path="/regional-head/notesheets"
    element={
        <ProtectedRoute allowedRoles={["Regional Head"]}>
            <Notesheets />
        </ProtectedRoute>
    }
/>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
