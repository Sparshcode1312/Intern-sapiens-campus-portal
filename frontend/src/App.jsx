import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";

import Login from "./pages/Login";
import CentreHeadDashboard from "./pages/dashboards/CentreHeadDashboard";
import ApproverDashboard from "./pages/dashboards/ApproverDashboard";
import NewRequirement from "./pages/NewRequirement";

import RegionalDashboard from "./pages/RegionalHead/RegionalDashboard";
import Notesheets from "./pages/RegionalHead/Notesheets";
import NewMemo from "./pages/RegionalHead/NewMemo";
import RegionalLayout from "./pages/RegionalHead/RegionalLayout";
import ApprovalFlow from "./pages/RegionalHead/ApprovalFlow";
import HQPortal from "./pages/hq/HQPortal";
import DirectorConsole from "./pages/director/DirectorConsole";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Default */}
          <Route
            path="/"
            element={<Navigate to="/login" replace />}
          />

          {/* Other dashboards */}
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


          {/* =============================== */}
          {/* REGIONAL HEAD SECTION */}
          {/* =============================== */}

          <Route
            path="/regional-head"
            element={
              <ProtectedRoute allowedRoles={["Regional Head"]}>
                <RegionalLayout />
              </ProtectedRoute>
            }
          >

            {/* /regional-head */}
            <Route
              index
              element={<RegionalDashboard />}
            />

            {/* /regional-head/notesheets */}
            <Route
              path="notesheets"
              element={<Notesheets />}
            />

            {/* /regional-head/new-memo */}
            <Route
              path="new-memo"
              element={<NewMemo />}
            />

            {/* /regional-head/approval-flow */}
            <Route
              path="approval-flow"
              element={<ApprovalFlow />}
            />

          </Route>


          {/* Fallback */}
          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />

          {/* HQ Portal */}
          <Route
            path="/hq"
            element={
              <ProtectedRoute allowedRoles={["HQ"]}>
                <HQPortal />
              </ProtectedRoute>
            }
          />

          {/* Director Console */}
          <Route
            path="/director-console"
            element={
              <ProtectedRoute allowedRoles={["DirectorConsole"]}>
                <DirectorConsole />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
