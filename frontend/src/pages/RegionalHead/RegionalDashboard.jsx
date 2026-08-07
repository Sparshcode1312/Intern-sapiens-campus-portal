import React from "react";
import "../../styles/regionalHead.css";

import Sidebar from "../../components/regionalHead/Sidebar";
import DashboardHeader from "../../components/regionalHead/DashboardHeader";
import StatCard from "../../components/regionalHead/StatCard";
import RecentNotesheets from "../../components/regionalHead/RecentNotesheets";
import DepartmentSummary from "../../components/regionalHead/DepartmentSummary";

const RegionalDashboard = () => {
  return (
    <div className="regional-dashboard">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="dashboard-content">

        <DashboardHeader />

        <div className="stats-grid">

          <StatCard
            title="NOTESHEETS"
            value="0"
            icon="📄"
          />

          <StatCard
            title="PENDING"
            value="0"
            icon="🕒"
          />

          <StatCard
            title="APPROVED / COMPLETED"
            value="0"
            icon="✔"
          />

          <StatCard
            title="MEMOS ISSUED"
            value="2"
            icon="➕"
          />

        </div>

        <div className="dashboard-bottom">

          <RecentNotesheets />

          <DepartmentSummary />

        </div>

      </div>

    </div>
  );
};

export default RegionalDashboard;
