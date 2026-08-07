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
  <div className="rh-layout">

    <Sidebar />

    <main className="rh-main">

      {/* HERO */}

      <section className="hero-section">

        <div className="hero-left">

          <p className="hero-label">
            REGIONAL HEAD · OVERVIEW
          </p>

          <h1 className="hero-title">
            Good day, Regional Head
          </h1>

          <p className="hero-subtitle">
            Notesheets from across the institutes, awaiting your action.
          </p>

        </div>

        <div className="hero-right">

          <button className="memo-btn">
            Generate new memo
          </button>

        </div>

      </section>

      {/* STATS */}

      <section className="stats-grid">

        <StatCard
          title="NOTESHEETS"
          value="0"
          icon={<FileText size={20} />}
        />

        <StatCard
          title="PENDING"
          value="0"
          icon={<Clock3 size={20} />}
          highlight
        />

        <StatCard
          title="APPROVED / COMPLETED"
          value="0"
          icon={<CircleCheckBig size={20} />}
        />

        <StatCard
          title="MEMOS ISSUED"
          value="2"
          icon={<FilePlus2 size={20} />}
        />

      </section>

      {/* LOWER GRID */}

      <section className="content-grid">

        {/* LEFT */}

        <div className="recent-card">

          <div className="card-header">

            <h3>Recent notesheets</h3>

            <button className="view-btn">
              View all →
            </button>

          </div>

          <div className="empty-box">

            <div className="empty-icon">
              📄
            </div>

            <h4>No notesheets yet</h4>

            <p>
              Once departments submit notesheets they'll appear here.
            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div className="department-card">

          <h3>By department</h3>

          <div className="dept-list">

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

      </section>

    </main>

  </div>
);
};  
