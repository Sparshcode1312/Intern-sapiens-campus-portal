import React from "react";
import "../../styles/notesheets.css";

import Sidebar from "../../components/regionalHead/Sidebar";
import { ChevronDown, Plus, FileText } from "lucide-react";

const Notesheets = () => {
  return (
    <div className="rh-layout">

      <Sidebar />

      <main className="notes-main">

        {/* Header */}

        <section className="notes-header">

          <div>

            <p className="notes-label">
              INBOX
            </p>

            <h1 className="notes-title">
              Departmental notesheets
            </h1>

            <p className="notes-subtitle">
              All notesheets from Marketing, HR, Operations,
              Academics, Events and Administration.
            </p>

          </div>

          <div className="notes-actions">

            <button className="filter-btn">

              All departments

              <ChevronDown size={18} />

            </button>

            <button className="log-btn">

              <Plus size={18} />

              Log notesheet

            </button>

          </div>

        </section>

        {/* Empty Card */}

        <section className="notes-card">

          <div className="empty-state">

            <FileText size={42} />

            <h3>No notesheets here yet</h3>

            <p>
              Log the first one to see it appear.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
};

export default Notesheets;
