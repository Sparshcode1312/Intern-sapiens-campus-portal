import React from "react";
import {
  LayoutDashboard,
  FileText,
  FilePlus,
  GitBranch,
  LogOut,
} from "lucide-react";

import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="rh-sidebar">

      {/* Logo */}

      <div className="sidebar-logo">

        <div className="logo-circle">
          S
        </div>

        <div>

          <h2>Sapiens</h2>

          <span>REGIONAL HEAD</span>

        </div>

      </div>

      {/* Navigation */}

      <nav className="sidebar-menu">

        <button className="active">

          <LayoutDashboard size={18} />

          Overview

        </button>

        <button>

          <FileText size={18} />

          Notesheets

        </button>

        <button>

          <FilePlus size={18} />

          New Memo

        </button>

        <button>

          <GitBranch size={18} />

          Approval Flow

        </button>

      </nav>

      {/* Footer */}

      <div className="sidebar-footer">

        <p>testuser@gmail.com</p>

        <button>

          <LogOut size={18} />

          Sign out

        </button>

      </div>

    </aside>
  );
};

export default Sidebar;
