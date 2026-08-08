import React, { useContext, useEffect, useState } from "react";
import {
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  LayoutDashboard,
  FileText,
  FilePlus2,
  GitBranch,
  LogOut,
  FileCheck2,
  Clock3,
  CheckCircle2,
  FileOutput,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

import { AuthContext } from "../../context/AuthContext";
import api from "../../utils/api";

import "./regional-head.css";


/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({
  label,
  value,
  icon: Icon,
  cardClass = "",
  onClick,
  active,
}) => {
  return (
    <button
      type="button"
      className={`rh-stat-card${
        cardClass ? ` ${cardClass}` : ""
      }${onClick ? " rh-stat-card-clickable" : ""}${
        active ? " rh-stat-card-active" : ""
      }`}
      onClick={onClick}
    >
      <div className="rh-stat-card-top">
        <span>{label}</span>

        {Icon && <Icon size={21} />}
      </div>

      <div className="rh-stat-value">
        {value}
      </div>
    </button>
  );
};


/* =========================================================
   SIDEBAR NAVIGATION
========================================================= */

const NAV_ITEMS = [
  {
    label: "Overview",
    path: "/regional-head",
    icon: LayoutDashboard,
  },
  {
    label: "Notesheets",
    path: "/regional-head/notesheets",
    icon: FileText,
  },
  {
    label: "New Memo",
    path: "/regional-head/new-memo",
    icon: FilePlus2,
  },
  {
    label: "Approval Flow",
    path: "/regional-head/approval-flow",
    icon: GitBranch,
  },
];


/* =========================================================
   REGIONAL OVERVIEW
========================================================= */

const RegionalOverview = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    notesheets: 0,
    pending: 0,
    approved: 0,
    memosIssued: 0,
    recent: [],
    byDepartment: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);


  /* =====================================================
     LOAD DASHBOARD STATS
  ===================================================== */

  useEffect(() => {
    let isMounted = true;

    const loadStats = async () => {
      try {
        setLoading(true);

        const response = await api.get(
          "/api/requirements/dashboard-stats"
        );

        if (isMounted) {
          setStats(response.data);

          setError(null);
        }
      } catch (err) {
        console.error(
          "Failed to load dashboard stats:",
          err
        );

        if (isMounted) {
          setError(
            "Couldn't load live data. Showing defaults."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadStats();

    return () => {
      isMounted = false;
    };
  }, []);


  /* =====================================================
     NAVIGATION
  ===================================================== */

  const goTo = (path) => {
    navigate(path);
  };


  const handleStatClick = (filterKey, status) => {
    setActiveFilter(filterKey);

    if (status) {
      navigate(
        `/regional-head/notesheets?status=${encodeURIComponent(
          status
        )}`
      );
    } else {
      navigate("/regional-head/notesheets");
    }
  };


  const handleDepartmentClick = (department) => {
    navigate(
      `/regional-head/notesheets?department=${encodeURIComponent(
        department
      )}`
    );
  };


  return (
    <div className="rh-page">

      {/* =================================================
          OVERVIEW CONTENT
      ================================================= */}

      <div className="rh-content">

        {/* HERO */}
        <section className="rh-hero">

          <div className="rh-hero-left">

            <div className="rh-eyebrow">
              REGIONAL HEAD · OVERVIEW
            </div>

            <h1>
              Good day, Regional Head
            </h1>

            <p>
              Notesheets from across the institutes,
              awaiting your action.
            </p>

            {error && (
              <p className="rh-error-note">
                {error}
              </p>
            )}

          </div>


          <div className="rh-hero-right">

            <button
              type="button"
              className="rh-primary-button"
              onClick={() =>
                goTo("/regional-head/new-memo")
              }
            >
              <FilePlus2 size={20} />

              <span>
                Generate new memo
              </span>
            </button>

          </div>

        </section>


        {/* =================================================
            STATS
        ================================================= */}

        <section className="rh-stats-grid">

          <StatCard
            label="NOTESHEETS"
            value={
              loading ? "…" : stats.notesheets
            }
            icon={FileCheck2}
            onClick={() =>
              handleStatClick("all", null)
            }
            active={activeFilter === "all"}
          />


          <StatCard
            label="PENDING"
            value={
              loading ? "…" : stats.pending
            }
            icon={Clock3}
            cardClass="rh-stat-card-highlight"
            onClick={() =>
              handleStatClick(
                "pending",
                "Pending"
              )
            }
            active={activeFilter === "pending"}
          />


          <StatCard
            label="APPROVED / COMPLETED"
            value={
              loading ? "…" : stats.approved
            }
            icon={CheckCircle2}
            onClick={() =>
              handleStatClick(
                "approved",
                "Approved"
              )
            }
            active={activeFilter === "approved"}
          />


          <StatCard
            label="MEMOS ISSUED"
            value={
              loading ? "…" : stats.memosIssued
            }
            icon={FileOutput}
            onClick={() =>
              goTo("/regional-head/new-memo")
            }
          />

        </section>


        {/* =================================================
            BOTTOM GRID
        ================================================= */}

        <section className="rh-dashboard-grid">

          {/* RECENT NOTESHEETS */}

          <div className="rh-panel">

            <div className="rh-panel-header">

              <h2>
                Recent notesheets
              </h2>

              <button
                type="button"
                className="rh-view-all"
                onClick={() =>
                  goTo("/regional-head/notesheets")
                }
              >
                View all

                <ChevronRight size={17} />
              </button>

            </div>


            {!loading &&
            stats.recent &&
            stats.recent.length > 0 ? (

              <div className="rh-recent-list">

                {stats.recent.map((item) => (

                  <button
                    key={item._id}
                    type="button"
                    className="rh-recent-row"
                    onClick={() =>
                      goTo(
                        `/regional-head/notesheets?id=${item._id}`
                      )
                    }
                  >

                    <div className="rh-recent-row-main">

                      <span className="rh-recent-title">
                        {item.title}
                      </span>

                      <span className="rh-recent-meta">
                        {item.department}
                        {" · "}
                        {item.centreName}
                      </span>

                    </div>


                    <span
                      className={`rh-status-pill rh-status-${String(
                        item.status
                      ).toLowerCase()}`}
                    >
                      {item.status}
                    </span>

                  </button>

                ))}

              </div>

            ) : (

              <div className="rh-empty-state">

                <div className="rh-empty-icon">
                  <FileText size={28} />
                </div>

                <h3>
                  No notesheets yet
                </h3>

                <p>
                  Once departments submit
                  notesheets they'll appear here.
                </p>

              </div>

            )}

          </div>


          {/* BY DEPARTMENT */}

          <div className="rh-panel">

            <div className="rh-panel-header">

              <h2>
                By department
              </h2>

            </div>


            <div className="rh-department-list">

              {(
                stats.byDepartment &&
                stats.byDepartment.length
                  ? stats.byDepartment
                  : [
                      {
                        department: "Marketing",
                        count: 0,
                      },
                      {
                        department: "HR",
                        count: 0,
                      },
                      {
                        department: "Operations",
                        count: 0,
                      },
                      {
                        department: "Academics",
                        count: 0,
                      },
                      {
                        department: "Events",
                        count: 0,
                      },
                      {
                        department: "Administration",
                        count: 0,
                      },
                    ]
              ).map(
                ({ department, count }) => (

                  <button
                    key={department}
                    type="button"
                    className="rh-department-row"
                    onClick={() =>
                      handleDepartmentClick(
                        department
                      )
                    }
                  >

                    <span>
                      {department}
                    </span>

                    <strong>
                      {loading ? "…" : count}
                    </strong>

                  </button>

                )
              )}

            </div>

          </div>

        </section>

      </div>

    </div>
  );
};


/* =========================================================
   MAIN REGIONAL DASHBOARD LAYOUT
========================================================= */

const RegionalDashboard = () => {
  const { user, logout } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();


  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };


  /* =====================================================
     ACTIVE SIDEBAR ITEM
  ===================================================== */

  const isNavActive = (path) => {

    if (path === "/regional-head") {
      return location.pathname === path;
    }

    return location.pathname.startsWith(path);
  };


  return (
    <div className="rh-layout">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside className="rh-sidebar">

        {/* BRAND */}

        <div className="rh-sidebar-brand">

          <div className="rh-brand-logo">
            <GraduationCap size={27} />
          </div>

          <div className="rh-brand-text">

            <div className="rh-brand-name">
              Sapiens
            </div>

            <div className="rh-brand-role">
              REGIONAL HEAD
            </div>

          </div>

        </div>


        {/* NAVIGATION */}

        <nav className="rh-sidebar-nav">

          {NAV_ITEMS.map(
            ({
              label,
              path,
              icon: Icon,
            }) => (

              <button
                key={path}
                type="button"
                className={`rh-nav-item${
                  isNavActive(path)
                    ? " rh-nav-item-active"
                    : ""
                }`}
                onClick={() =>
                  navigate(path)
                }
              >

                <Icon size={20} />

                <span>
                  {label}
                </span>

              </button>

            )
          )}

        </nav>


        {/* SIDEBAR BOTTOM */}

        <div className="rh-sidebar-bottom">

          <div className="rh-user-email">
            {user?.email ||
              "regional@sapiens.edu"}
          </div>


          <button
            type="button"
            className="rh-signout-button"
            onClick={handleLogout}
          >

            <LogOut size={19} />

            <span>
              Sign out
            </span>

          </button>

        </div>

      </aside>


      {/* =================================================
          RIGHT SIDE / CONTENT
      ================================================= */}

      <main className="rh-main">

        <Outlet />

      </main>

    </div>
  );
};


/* =========================================================
   EXPORT
========================================================= */

export default RegionalDashboard;
