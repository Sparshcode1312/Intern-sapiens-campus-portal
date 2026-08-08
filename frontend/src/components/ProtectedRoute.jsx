import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const roleToPath = {
  'Centre Head': '/dashboard/centre-head',
  'Cluster Manager': '/dashboard/cluster-manager',
  'Department Head': '/dashboard/department-head',
  'Regional Head': '/dashboard/regional-head',
  Director: '/dashboard/director',
  Chairperson: '/dashboard/chairperson',
  'Purchase Manager': '/dashboard/purchase-manager',
  Accounts: '/dashboard/accounts',
  HQ: '/hq',
  DirectorConsole: '/director-console',
};

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const correctPath = roleToPath[user.role] || '/login';
    return <Navigate to={correctPath} replace />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;