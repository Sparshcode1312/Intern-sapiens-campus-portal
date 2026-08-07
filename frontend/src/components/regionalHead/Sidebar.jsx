import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  FilePlus,
  GitBranch,
  LogOut,
} from "lucide-react";

import "./Sidebar.css";

const NAV_ITEMS = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    path: "/regional-head",
  },
  {
    label: "Notesheets",
    icon: FileText,
    path: "/regional-head/notesheets",
  },
  {
    label: "New Memo",
    icon: FilePlus,
    path: "/regional-head/new-memo",
  },
  {
    label: "Approval Flow",
    icon: GitBranch,
    path: "/regional-head/approval-flow",
  },
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
  {NAV_ITEMS.map(({ label, icon: Icon, path }) => (
    <NavLink
      key={label}
      to={path}
      className={({ isActive }) =>
        isActive ? "sidebar-link active" : "sidebar-link"
      }
    >
      <Icon size={18} />
      <span>{label}</span>
    </NavLink>
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
