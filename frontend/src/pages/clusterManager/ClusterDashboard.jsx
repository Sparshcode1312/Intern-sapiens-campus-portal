import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Clock,
  CheckCircle2,
  Building2,
  ChevronDown,
  ArrowRight,
  Check,
} from "lucide-react";

import api from "../../utils/api";
import "../../styles/cluster-manager.css";

const DEMO_REQUIREMENTS = [
  {
    _id: "1",
    workProposalNo: "SGI-20260604-716a64",
    title: "edufest",
    campus: "SHS Dhawas",
    department: "Marketing",
    scope: "Centre",
    status: "Pending Department Head",
  },
  {
    _id: "2",
    workProposalNo: "SGI-20260604-eff491",
    title: "Staff Requirement",
    campus: "SHS Dhawas",
    department: "HR",
    scope: "Centre",
    status: "Pending Department Head",
  },
  {
    _id: "3",
    workProposalNo: "SGI-20260603-961893",
    title: "Tent",
    campus: "SHS Dhawas",
    department: "Event",
    scope: "Local",
    status: "Pending Department Head",
  },
  {
    _id: "4",
    workProposalNo: "SGI-20260603-b785fc",
    title: "SHS dhawas Fan",
    campus: "SHS Dhawas",
    department: "Operation",
    scope: "Centre",
    status: "Pending Chairperson",
  },
];

const CAMPUSES = [
  "All campuses",
  "SGS Bharatpur",
  "SJS Gandhipath",
  "SHS Dhawas",
  "RIET",
  "SJS Hawasadak",
];

const DEPARTMENTS = [
  "All departments",
  "Academics",
  "HR",
  "Marketing",
  "Administration",
  "Operation",
  "Event",
];

const StatCard = ({ label, value, icon: Icon }) => (
  <div className="cm-stat-card">
    <div className="cm-stat-card-top">
      <span>{label}</span>
      {Icon && <Icon size={18} />}
    </div>
    <div className="cm-stat-value">{value}</div>
  </div>
);

const ClusterDashboard = () => {
  const navigate = useNavigate();

  const [requirements, setRequirements] = useState(DEMO_REQUIREMENTS);
  const [loading, setLoading]           = useState(false);

  const [searchQuery, setSearchQuery]         = useState("");
  const [selectedCampus, setSelectedCampus]   = useState("All campuses");
  const [selectedDept, setSelectedDept]       = useState("All departments");

  const [campusDropdownOpen, setCampusDropdownOpen] = useState(false);
  const [deptDropdownOpen, setDeptDropdownOpen]     = useState(false);

  const campusRef = useRef(null);
  const deptRef   = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (campusRef.current && !campusRef.current.contains(e.target)) {
        setCampusDropdownOpen(false);
      }
      if (deptRef.current && !deptRef.current.contains(e.target)) {
        setDeptDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/requirements");
        if (isMounted && Array.isArray(response.data) && response.data.length > 0) {
          const formatted = response.data.map((r) => ({
            _id: r._id,
            workProposalNo: r.workProposalNo || `SGI-${r._id?.slice(-12)}`,
            title: r.title,
            campus: r.centreName || "SHS Dhawas",
            department: r.department || "Marketing",
            scope: r.isPurchaseRequired ? "Centre" : "Local",
            status: r.status ? `Pending ${r.status}` : "Pending Department Head",
          }));
          setRequirements(formatted);
        }
      } catch (err) {
        console.log("Using default demo requirements:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => { isMounted = false; };
  }, []);

  const filteredRequirements = requirements.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.workProposalNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCampus =
      selectedCampus === "All campuses" || item.campus === selectedCampus;

    const matchesDept =
      selectedDept === "All departments" || item.department === selectedDept;

    return matchesSearch && matchesCampus && matchesDept;
  });

  return (
    <div className="cm-content">

      {/* HEADER */}
      <div className="cm-header">
        <div className="cm-header-left">
          <div className="cm-eyebrow">OVERVIEW</div>
          <h1>Requirements Dashboard</h1>
          <p>All work proposals raised across the five Sapiens campuses.</p>
        </div>

        <div className="cm-header-right">
          <button
            type="button"
            className="cm-primary-btn"
            onClick={() => navigate("/cluster-manager/new-proposal")}
          >
            <span>New Work proposal</span>
            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="cm-stats-grid">
        <StatCard
          label="TOTAL WORK PROPOSALS"
          value={requirements.length}
          icon={FileText}
        />
        <StatCard
          label="IN PROGRESS"
          value={requirements.length}
          icon={Clock}
        />
        <StatCard
          label="COMPLETED / DISPATCHED"
          value={0}
          icon={CheckCircle2}
        />
        <StatCard
          label="CAMPUSES ACTIVE"
          value={1}
          icon={Building2}
        />
      </div>

      {/* REQUIREMENTS TABLE PANEL */}
      <div className="cm-panel">

        <div className="cm-panel-header">
          <h2>Requirements</h2>

          <div className="cm-table-filters">
            <input
              type="text"
              className="cm-search-input"
              placeholder="Search work proposal no. or tit"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Campus Custom Filter Dropdown */}
            <div className="cm-custom-select-wrap" ref={campusRef} style={{ width: 170 }}>
              <button
                type="button"
                className={`cm-select-btn${campusDropdownOpen ? " active" : ""}`}
                style={{ height: 40, fontSize: 13 }}
                onClick={() => {
                  setCampusDropdownOpen((o) => !o);
                  setDeptDropdownOpen(false);
                }}
              >
                <span>{selectedCampus}</span>
                <ChevronDown size={15} />
              </button>

              {campusDropdownOpen && (
                <div className="cm-select-dropdown" style={{ minWidth: 170 }}>
                  {CAMPUSES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`cm-select-option${
                        selectedCampus === c ? " cm-select-option-highlight" : ""
                      }`}
                      style={{ fontSize: 13, padding: "10px 14px" }}
                      onClick={() => {
                        setSelectedCampus(c);
                        setCampusDropdownOpen(false);
                      }}
                    >
                      <span>{c}</span>
                      {selectedCampus === c && <Check size={14} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Department Custom Filter Dropdown */}
            <div className="cm-custom-select-wrap" ref={deptRef} style={{ width: 170 }}>
              <button
                type="button"
                className={`cm-select-btn${deptDropdownOpen ? " active" : ""}`}
                style={{ height: 40, fontSize: 13 }}
                onClick={() => {
                  setDeptDropdownOpen((o) => !o);
                  setCampusDropdownOpen(false);
                }}
              >
                <span>{selectedDept}</span>
                <ChevronDown size={15} />
              </button>

              {deptDropdownOpen && (
                <div className="cm-select-dropdown" style={{ minWidth: 170 }}>
                  {DEPARTMENTS.map((d) => (
                    <button
                      key={d}
                      type="button"
                      className={`cm-select-option${
                        selectedDept === d ? " cm-select-option-highlight" : ""
                      }`}
                      style={{ fontSize: 13, padding: "10px 14px" }}
                      onClick={() => {
                        setSelectedDept(d);
                        setDeptDropdownOpen(false);
                      }}
                    >
                      <span>{d}</span>
                      {selectedDept === d && <Check size={14} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="cm-table-wrap">
          <table className="cm-table">
            <thead>
              <tr>
                <th>WORK PROPOSAL</th>
                <th>TITLE</th>
                <th>CAMPUS</th>
                <th>DEPT</th>
                <th>SCOPE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequirements.map((row) => (
                <tr key={row._id}>
                  <td className="cm-code">{row.workProposalNo}</td>
                  <td className="cm-title-bold">{row.title}</td>
                  <td>{row.campus}</td>
                  <td>{row.department}</td>
                  <td>{row.scope}</td>
                  <td>
                    <span className="cm-badge-pending">
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <span className="cm-view-link">View</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};

export default ClusterDashboard;
