import React, { useContext } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, LayoutDashboard, FilePlus, Shield } from 'lucide-react';
import '../styles/dashboard.css';

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo-icon">
            <Shield size={20} color="#F4B400" />
          </div>
          <div className="brand-text">
            <span className="brand-title">SAPIENS GROUP</span>
            <span className="brand-subtitle">Campus Portal</span>
          </div>
        </div>
        
        <nav className="header-center">
          <button className={`nav-item ${location.pathname.includes('/dashboard') ? 'active' : ''}`}>
            <LayoutDashboard size={18} />
            Dashboard
          </button>
          {user?.role === 'Centre Head' && (
            <button className="nav-item">
              <FilePlus size={18} />
              New Requirement
            </button>
          )}
        </nav>

        <div className="header-right">
          <div className="user-profile-info">
            <span className="user-email">{user?.email}</span>
            <span className="user-role-text">— {user?.role}</span>
          </div>
          <button onClick={handleLogout} className="logout-button" title="Logout">
            <LogOut size={20} />
          </button>
        </div>
      </header>
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
