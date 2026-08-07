import React from "react";
import "../../styles/regionalHead.css";

import Sidebar from "../../components/regionalHead/Sidebar";
import StatCard from "../../components/regionalHead/StatCard";

import {
  FileText,
  Clock3,
  CircleCheckBig,
  FilePlus2,
} from "lucide-react";

const RegionalDashboard = () => {
  return (
    <div className="rh-page">

      <Sidebar />

      <main className="rh-content">

        {/* Header */}
        <div className="rh-header">

          <div>

            <p className="rh-title-small">
              REGIONAL HEAD · OVERVIEW
            </p>

            <h1 className="rh-title">
              Good day, Regional Head
            </h1>

            <p className="rh-subtitle">
              Notesheets from across the institutes, awaiting your action.
            </p>

          </div>

          <button className="memo-btn">
            Generate new memo
          </button>

        </div>

        {/* Statistics */}

        <div className="stats-grid">

          <StatCard
            title="NOTESHEETS"
            value="0"
            icon={<FileText size={22} />}
          />

          <StatCard
            title="PENDING"
            value="0"
            icon={<Clock3 size={22} />}
            highlight
          />

          <StatCard
            title="APPROVED / COMPLETED"
            value="0"
            icon={<CircleCheckBig size={22} />}
          />

          <StatCard
            title="MEMOS ISSUED"
            value="2"
            icon={<FilePlus2 size={22} />}
          />

        </div>

        {/* Bottom */}

        <div className="dashboard-bottom">

          {/* Left */}

          <div className="recent-card">

            <div className="card-header">

              <h3>
                Recent notesheets
              </h3>

              <button className="view-btn">
                View all →
              </button>

            </div>

            <div className="empty-box">

              <div className="empty-icon">
                📄
              </div>

              <h4>
                No notesheets yet
              </h4>

              <p>
                Notesheets received from department heads
                will appear here.
              </p>

            </div>

          </div>

          {/* Right */}

          <div className="department-card">

            <h3>
              By department
            </h3>

            <div className="dept-row">
              <span>Marketing</span>
              <span>0</span>
            </div>

            <div className="dept-row">
              <span>HR</span>
              <span>0</span>
            </div>

            <div className="dept-row">
              <span>Operations</span>
              <span>0</span>
            </div>

            <div className="dept-row">
              <span>Academics</span>
              <span>0</span>
            </div>

            <div className="dept-row">
              <span>Events</span>
              <span>0</span>
            </div>

            <div className="dept-row">
              <span>Administration</span>
              <span>0</span>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default RegionalDashboard;
