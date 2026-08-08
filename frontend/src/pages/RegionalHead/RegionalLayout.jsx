import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const RegionalLayout = () => {
  return (
    <div className="regional-layout">

      {/* ================= SIDEBAR ================= */}
      <aside className="regional-sidebar">

        {/* Logo / Brand */}
        <div className="regional-brand">

          <div className="regional-logo">
            🎓
          </div>

          <div>
            <div className="regional-brand-name">
              Sapiens
            </div>

            <div className="regional-brand-role">
              REGIONAL HEAD
            </div>
          </div>

        </div>


        {/* Navigation */}
        <nav className="regional-nav">

          {/* Overview */}
          <NavLink
            to="/regional-head"
            end
            className={({ isActive }) =>
              `regional-nav-item ${isActive ? "active" : ""}`
            }
          >
            <span>▦</span>
            <span>Overview</span>
          </NavLink>


          {/* Notesheets */}
          <NavLink
            to="/regional-head/notesheets"
            className={({ isActive }) =>
              `regional-nav-item ${isActive ? "active" : ""}`
            }
          >
            <span>▤</span>
            <span>Notesheets</span>
          </NavLink>


          {/* New Memo */}
          <NavLink
            to="/regional-head/new-memo"
            className={({ isActive }) =>
              `regional-nav-item ${isActive ? "active" : ""}`
            }
          >
            <span>⊞</span>
            <span>New Memo</span>
          </NavLink>


          {/* Approval Flow */}
          <NavLink
            to="/regional-head/approval-flow"
            className={({ isActive }) =>
              `regional-nav-item ${isActive ? "active" : ""}`
            }
          >
            <span>⌘</span>
            <span>Approval Flow</span>
          </NavLink>

        </nav>


        {/* Bottom section */}
        <div className="regional-sidebar-bottom">

          <div className="regional-email">
            regional@sapiens.edu
          </div>

          <button className="regional-signout">
            <span>↪</span>
            <span>Sign out</span>
          </button>

        </div>

      </aside>


      {/* ================= RIGHT CONTENT ================= */}

      <main className="regional-main">
        <Outlet />
      </main>

    </div>
  );
};

export default RegionalLayout;
