import React, { useState, useEffect } from 'react';
import { Plus, Copy, Clock, CheckCircle2 } from 'lucide-react';
import '../../styles/dashboard.css';

const CentreHeadDashboard = () => {
  const [requirements, setRequirements] = useState([]);

  useEffect(() => {
    setRequirements([
      { id: 1, title: 'New Laptops for IT Lab', type: 'Purchase Required', status: 'Pending', currentStage: 'Cluster Manager', date: '2023-10-27' },
      { id: 2, title: 'Whiteboard Markers', type: 'Material Already in Stock', status: 'Approved', currentStage: 'Completed', date: '2023-10-25' }
    ]);
  }, []);

  return (
    <div className="dashboard-container">
      
      <div className="page-header">
        <span className="page-subtitle">OVERVIEW</span>
        <h2 className="page-title">Welcome back</h2>
        <div className="header-actions">
          <button className="primary-button-dark">
            <Plus size={18} />
            New Requirement
          </button>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card border-blue">
          <div className="stat-header">
            <span className="stat-title">Total Generated</span>
            <Copy size={18} className="stat-icon" />
          </div>
          <div className="stat-value">{requirements.length}</div>
        </div>
        <div className="stat-card border-yellow">
          <div className="stat-header">
            <span className="stat-title">Pending</span>
            <Clock size={18} className="stat-icon" />
          </div>
          <div className="stat-value">{requirements.filter(r => r.status === 'Pending').length}</div>
        </div>
        <div className="stat-card border-green">
          <div className="stat-header">
            <span className="stat-title">Approved</span>
            <CheckCircle2 size={18} className="stat-icon" />
          </div>
          <div className="stat-value">{requirements.filter(r => r.status === 'Approved').length}</div>
        </div>
      </div>

      <div className="panel full-width">
        <div className="panel-header space-between">
          <h3 className="panel-title-clean">Recent Requirements</h3>
          <span className="clean-badge">{requirements.length} total</span>
        </div>
        
        {requirements.length === 0 ? (
          <div className="empty-state">No requirements yet.</div>
        ) : (
          <div className="clean-list">
            <div className="loading-state">Loading...</div>
          </div>
        )}
      </div>

    </div>
  );
};

export default CentreHeadDashboard;
