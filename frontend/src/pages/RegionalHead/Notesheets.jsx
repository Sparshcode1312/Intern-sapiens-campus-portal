import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ChevronDown,
  Plus,
  FileText,
} from "lucide-react";

import "../../styles/notesheets.css";
import api from "../../utils/api";

const Notesheets = () => {
  const [searchParams] = useSearchParams();

  const status = searchParams.get("status");
  const department = searchParams.get("department");

  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);


  /* =====================================================
     LOAD NOTESHEETS
  ===================================================== */

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setLoading(true);

        const params = {};

        if (status) {
          params.status = status;
        }

        if (department) {
          params.department = department;
        }

        const response = await api.get(
          "/api/requirements",
          { params }
        );

        if (isMounted) {
          setRequirements(response.data);
        }
      } catch (err) {
        console.error(
          "Failed to load requirements:",
          err
        );

        if (isMounted) {
          setRequirements([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [status, department]);


  /* =====================================================
     FILTER LABEL
  ===================================================== */

  const filterLabel =
    department ||
    (status ? status : "All departments");


  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="notes-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="notes-header">

        <div className="notes-header-left">

          <div className="notes-eyebrow">
            INBOX
          </div>

          <h1>
            Departmental notesheets
          </h1>

          <p>
            All notesheets from Marketing, HR,
            Operations, Academics, Events and
            Administration.
          </p>

        </div>


        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="notes-actions">

          <button
            type="button"
            className="filter-btn"
          >
            <span>
              {filterLabel}
            </span>

            <ChevronDown size={18} />
          </button>


          <button
            type="button"
            className="log-btn"
          >
            <Plus size={18} />

            <span>
              Log notesheet
            </span>
          </button>

        </div>

      </section>


      {/* =================================================
          NOTESHEETS LIST
      ================================================= */}

      <section className="notes-card">

        {loading ? (

          <div className="empty-state">

            <FileText size={42} />

            <h3>
              Loading notesheets...
            </h3>

            <p>
              Please wait while we load the
              latest notesheets.
            </p>

          </div>

        ) : requirements.length > 0 ? (

          <div className="notes-list">

            {requirements.map((item) => (

              <div
                key={item._id}
                className="notes-list-row"
              >

                <div className="notes-list-main">

                  <div className="notes-list-title">
                    {item.title}
                  </div>

                  <div className="notes-list-meta">
                    {item.department}
                    {" · "}
                    {item.centreName}
                    {" · "}
                    {item.currentStage}
                  </div>

                </div>


                <span
                  className={`notes-status-pill notes-status-${String(
                    item.status
                  ).toLowerCase()}`}
                >
                  {item.status}
                </span>

              </div>

            ))}

          </div>

        ) : (

          <div className="empty-state">

            <div className="empty-state-icon">
              <FileText size={42} />
            </div>

            <h3>
              No notesheets here yet
            </h3>

            <p>
              Log the first one to see it appear.
            </p>

          </div>

        )}

      </section>

    </div>
  );
};

export default Notesheets;
