import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../../styles/notesheets.css";

import Sidebar from "../../components/regionalHead/Sidebar";
import { ChevronDown, Plus, FileText } from "lucide-react";
import api from "../../utils/api";

const Notesheets = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const department = searchParams.get("department");

  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setLoading(true);
        const params = {};
        if (status) params.status = status;
        if (department) params.department = department;

        const response = await api.get("/api/requirements", { params });
        if (isMounted) setRequirements(response.data);
      } catch (err) {
        console.error("Failed to load requirements:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [status, department]);

  const filterLabel = department || (status ? `${status}` : "All departments");

  return (
    <div className="rh-layout">
      <Sidebar />

      <main className="notes-main">
        {/* Header */}
        <section className="notes-header">
          <div>
            <p className="notes-label">INBOX</p>
            <h1 className="notes-title">Departmental notesheets</h1>
            <p className="notes-subtitle">
              All notesheets from Marketing, HR, Operations, Academics, Events and Administration.
            </p>
          </div>

          <div className="notes-actions">
            <button className="filter-btn">
              {filterLabel}
              <ChevronDown size={18} />
            </button>

            <button className="log-btn">
              <Plus size={18} />
              Log notesheet
            </button>
          </div>
        </section>

        {/* List / Empty state */}
        <section className="notes-card">
          {!loading && requirements.length > 0 ? (
            <div className="notes-list">
              {requirements.map((item) => (
                <div key={item._id} className="notes-list-row">
                  <div>
                    <div className="notes-list-title">{item.title}</div>
                    <div className="notes-list-meta">
                      {item.department} · {item.centreName} · {item.currentStage}
                    </div>
                  </div>
                  <span className={`notes-status-pill notes-status-${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <FileText size={42} />
              <h3>No notesheets here yet</h3>
              <p>Log the first one to see it appear.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Notesheets;
