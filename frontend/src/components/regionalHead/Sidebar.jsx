import React from "react";
import {
  LayoutDashboard,
  FileText,
  FilePlus2,
  GitBranch,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="rh-sidebar">

      <div className="rh-logo">

        <div className="logo-circle">
          <img
            src="/logo.png"
            alt="Sapiens"
          />
        </div>

        <div>
          <h2>Sapiens</h2>
          <span>REGIONAL HEAD</span>
        </div>

      </div>

      <nav className="rh-nav">

        <button className="active">
          <LayoutDashboard size={20} />
          <span>Overview</span>
        </button>

        <button>
          <FileText size={20} />
          <span>Notesheets</span>
        </button>

        <button>
          <FilePlus2 size={20} />
          <span>New Memo</span>
        </button>

        <button>
          <GitBranch size={20} />
          <span>Approval Flow</span>
        </button>

      </nav>

      <div className="rh-user">

        <p>testuser@gmail.com</p>

        <button className="logout-btn">
          <LogOut size={18} />
          Sign out
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;

