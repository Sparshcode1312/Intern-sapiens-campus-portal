import React from "react";
import {
  LayoutDashboard,
  FileText,
  FilePlus,
  GitBranch,
  LogOut,
} from "lucide-react";

import "./Sidebar.css";

const NAV_ITEMS = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Notesheets", icon: FileText },
  { label: "New Memo", icon: FilePlus },
  { label: "Approval Flow", icon: GitBranch },
];

const Sidebar = ({ userEmail = "testuser@gmail.com", onSignOut }) => {
  return (
    <aside className="rh-sidebar">
      <div className="sidebar-logo">
        <div className="logo-circle">
          <img src="/sapiens-logo.png" alt="Sapiens" />
        </div>

        <div>
          <h2>Sapiens</h2>
          <span>REGIONAL HEAD</span>
        </div>
      </div>

      <nav className="sidebar-menu">
        {NAV_ITEMS.map(({ label, icon: Icon, active }) => (
          <button key={label} className={active ? "active" : ""} type="button">
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p>{userEmail}</p>
        <button type="button" onClick={onSignOut}>
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
