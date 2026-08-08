import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  FilePlus2,
  GitBranch,
  LogOut,
  FileCheck2,
  Clock3,
  CheckCircle2,
  FileOutput,
  ChevronRight,
} from "lucide-react";

import { AuthContext } from "../../context/AuthContext";
import "./regional-head.css";

const StatCard = ({ label, value, icon: Icon, iconClass = "" }) => {
  return (
    <div className="rh-stat-card">
      <div className="rh-stat-card-top">
        <span>{label}</span>
        <Icon size={22} className={iconClass} />
      </div>

      <div className="rh-stat-value">{value}</div>
    </div>
  );
};

const RegionalDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="rh-layout">
      {/* ================= SIDEBAR ================= */}
      <aside className="rh-sidebar">
        {/* Brand */}
        <div className="rh-brand">
          <div className="rh-brand-logo">
            <span>SG</span>
          </div>

          <div className="rh-brand-text">
            <div className="rh-brand-title">Sapiens</div>
            <div className="rh-brand-subtitle">REGIONAL HEAD</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="rh-sidebar-nav">
          <button
            type="button"
            className="rh-nav-item rh-nav-item-active"
            onClick={() => goTo("/regional-head")}
          >
            <LayoutDashboard size={20} />
            <span>Overview</span>
          </button>

          <button
            type="button"
            className="rh-nav-item"
            onClick={() => goTo("/regional-head/notesheets")}
          >
            <FileText size={20} />
            <span>Notesheets</span>
          </button>

          <button
            type="button"
            className="rh-nav-item"
            onClick={() => goTo("/regional-head/new-memo")}
          >
            <FilePlus2 size={20} />
            <span>New Memo</span>
          </button>

          <button
            type="button"
            className="rh-nav-item"
            onClick={() => goTo("/regional-head/approval-flow")}
          >
            <GitBranch size={20} />
            <span>Approval Flow</span>
          </button>
        </nav>

        {/* User section */}
        <div className="rh-sidebar-bottom">
          <div className="rh-user-email">
            {user?.email || "regional@sapiens.edu"}
          </div>

          <button
            type="button"
            className="rh-signout-button"
            onClick={handleLogout}
          >
            <LogOut size={19} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="rh-main">
        <div className="rh-content">
          {/* Hero */}
          <section className="rh-hero">
            <div className="rh-hero-left">
              <div className="rh-eyebrow">
                REGIONAL HEAD · OVERVIEW
              </div>

              <h1>Good day, Regional Head</h1>

              <p>
                Notesheets from across the institutes, awaiting your action.
              </p>
            </div>

            <div className="rh-hero-right">
              <button
                type="button"
                className="rh-primary-button"
                onClick={() => goTo("/regional-head/new-memo")}
              >
                <FilePlus2 size={20} />
                <span>Generate new memo</span>
              </button>
            </div>
          </section>

          {/* Stats */}
          <section className="rh-stats-grid">
            <StatCard
              label="NOTESHEETS"
              value="0"
              icon={FileCheck2}
            />

            <StatCard
              label="PENDING"
              value="0"
              icon={Clock3}
              iconClass="rh-icon-pending"
            />

            <StatCard
              label="APPROVED / COMPLETED"
              value="0"
              icon={CheckCircle2}
            />

            <StatCard
              label="MEMOS ISSUED"
              value="2"
              icon={FileOutput}
            />
          </section>

          {/* Bottom grid */}
          <section className="rh-dashboard-grid">
            {/* Recent notesheets */}
            <div className="rh-panel">
              <div className="rh-panel-header">
                <h2>Recent notesheets</h2>

                <button
                  type="button"
                  className="rh-view-all"
                  onClick={() => goTo("/regional-head/notesheets")}
                >
                  View all
                  <ChevronRight size={17} />
                </button>
              </div>

              <div className="rh-empty-state">
                <div className="rh-empty-icon">
                  <FileText size={28} />
                </div>

                <h3>No notesheets yet</h3>

                <p>
                  Once departments submit notesheets they'll
                  appear here.
                </p>
              </div>
            </div>

            {/* Department */}
            <div className="rh-panel">
              <div className="rh-panel-header">
                <h2>By department</h2>
              </div>

              <div className="rh-department-list">
                <div className="rh-department-row">
                  <span>Marketing</span>
                  <strong>0</strong>
                </div>

                <div className="rh-department-row">
                  <span>HR</span>
                  <strong>0</strong>
                </div>

                <div className="rh-department-row">
                  <span>Operations</span>
                  <strong>0</strong>
                </div>

                <div className="rh-department-row">
                  <span>Academics</span>
                  <strong>0</strong>
                </div>

                <div className="rh-department-row">
                  <span>Events</span>
                  <strong>0</strong>
                </div>

                <div className="rh-department-row">
                  <span>Administration</span>
                  <strong>0</strong>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RegionalDashboard;
