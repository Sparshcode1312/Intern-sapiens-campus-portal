import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, ChevronDown, Check, Trash2 } from "lucide-react";
import "../../styles/cluster-manager.css";

const DEPARTMENTS = [
  "Academics",
  "HR",
  "Marketing",
  "Administration",
  "Operation",
  "Event",
];

const CAMPUSES = [
  "SGS Bharatpur",
  "SJS Gandhipath",
  "SHS Dhawas",
  "RIET",
  "SJS Hawasadak",
];

const NewWorkProposal = () => {
  const navigate = useNavigate();

  const [title, setTitle]             = useState("");
  const [scope, setScope]             = useState("Local"); // "Centre" | "Local"
  const [department, setDepartment]   = useState("Academics");
  const [campus, setCampus]           = useState("SGS Bharatpur");
  const [alreadyInStock, setAlreadyInStock] = useState(false);
  const [notes, setNotes]             = useState("");

  const [items, setItems] = useState([
    { id: 1, name: "", qty: 1, estimation: 0 },
  ]);

  const [deptOpen, setDeptOpen]     = useState(false);
  const [campusOpen, setCampusOpen] = useState(false);

  const deptRef   = useRef(null);
  const campusRef = useRef(null);

  const addItem = () =>
    setItems((prev) => [
      ...prev,
      { id: Date.now(), name: "", qty: 1, estimation: 0 },
    ]);

  const updateItem = (id, field, value) =>
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );

  const removeItem = (id) =>
    setItems((prev) =>
      prev.length === 1 ? prev : prev.filter((item) => item.id !== id)
    );

  const handleSubmit = () => {
    console.log("Work proposal created:", {
      title,
      scope,
      department,
      campus,
      alreadyInStock,
      items,
      notes,
    });
    navigate("/cluster-manager");
  };

  return (
    <div className="cm-content">

      {/* HEADER */}
      <div className="cm-header" style={{ marginBottom: 24 }}>
        <div className="cm-header-left">
          <div className="cm-eyebrow">GENERATE WORK PROPOSAL</div>
          <h1>New Requirement</h1>
          <p>Routes through Department → Director → Chairperson → Accounts.</p>
        </div>
      </div>

      {/* FORM CONTAINER */}
      <div className="cm-form-container">

        {/* CARD 1: Work proposal details */}
        <div className="cm-card">
          <h2 className="cm-card-title">Work proposal details</h2>

          {/* Title */}
          <div className="cm-field">
            <label>Title</label>
            <input
              type="text"
              placeholder="e.g. Lab projector replacement"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Scope radio buttons */}
          <div className="cm-field">
            <label>Scope</label>
            <div className="cm-scope-row">
              <label
                className="cm-radio-label"
                onClick={() => setScope("Centre")}
              >
                <div
                  className={`cm-radio-dot${
                    scope === "Centre" ? " cm-radio-dot-checked" : ""
                  }`}
                >
                  {scope === "Centre" && <div className="cm-radio-dot-inner" />}
                </div>
                <span>Centre</span>
              </label>

              <label
                className="cm-radio-label"
                onClick={() => setScope("Local")}
              >
                <div
                  className={`cm-radio-dot${
                    scope === "Local" ? " cm-radio-dot-checked" : ""
                  }`}
                >
                  {scope === "Local" && <div className="cm-radio-dot-inner" />}
                </div>
                <span>Local</span>
              </label>
            </div>
          </div>

          {/* 2-Column: Route to department + Campus */}
          <div className="cm-scope-row" style={{ gap: 16, marginBottom: 18 }}>

            {/* Department Custom Select */}
            <div className="cm-field" style={{ flex: 1, marginBottom: 0 }}>
              <label>Route to department</label>
              <div className="cm-custom-select-wrap" ref={deptRef}>
                <button
                  type="button"
                  className={`cm-select-btn${deptOpen ? " active" : ""}`}
                  onClick={() => {
                    setDeptOpen((o) => !o);
                    setCampusOpen(false);
                  }}
                >
                  <span>{department || "Select department"}</span>
                  <ChevronDown size={15} />
                </button>

                {deptOpen && (
                  <div className="cm-select-dropdown">
                    {DEPARTMENTS.map((d) => (
                      <button
                        key={d}
                        type="button"
                        className={`cm-select-option${
                          department === d ? " cm-select-option-highlight" : ""
                        }`}
                        onClick={() => {
                          setDepartment(d);
                          setDeptOpen(false);
                        }}
                      >
                        <span>{d}</span>
                        {department === d && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Campus Custom Select */}
            <div className="cm-field" style={{ flex: 1, marginBottom: 0 }}>
              <label>Campus</label>
              <div className="cm-custom-select-wrap" ref={campusRef}>
                <button
                  type="button"
                  className={`cm-select-btn${campusOpen ? " active" : ""}`}
                  onClick={() => {
                    setCampusOpen((o) => !o);
                    setDeptOpen(false);
                  }}
                >
                  <span>{campus || "Select campus"}</span>
                  <ChevronDown size={15} />
                </button>

                {campusOpen && (
                  <div className="cm-select-dropdown">
                    {CAMPUSES.map((c) => (
                      <button
                        key={c}
                        type="button"
                        className={`cm-select-option${
                          campus === c ? " cm-select-option-highlight" : ""
                        }`}
                        onClick={() => {
                          setCampus(c);
                          setCampusOpen(false);
                        }}
                      >
                        <span>{c}</span>
                        {campus === c && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Already in stock toggle banner */}
          <div className="cm-stock-banner">
            <div className="cm-stock-text">
              <strong>Already in stock</strong>
              <span>Skips purchase + accounts; dispatch after Chairperson.</span>
            </div>

            <div
              className={`cm-toggle${alreadyInStock ? " on" : ""}`}
              onClick={() => setAlreadyInStock((v) => !v)}
            >
              <div className="cm-toggle-knob" />
            </div>
          </div>

        </div>

        {/* CARD 2: Items */}
        <div className="cm-card">
          <div className="cm-card-header">
            <h2 className="cm-card-title">Items</h2>
            <button
              type="button"
              className="cm-add-item-btn"
              onClick={addItem}
            >
              <Plus size={15} />
              <span>Add more</span>
            </button>
          </div>

          <div className="cm-item-headers">
            <span>Item name</span>
            <span>Qty</span>
            <span>Estimation (₹)</span>
            <span />
          </div>

          {items.map((item) => (
            <div key={item.id} className="cm-item-row">
              <input
                type="text"
                placeholder="Item name"
                value={item.name}
                onChange={(e) => updateItem(item.id, "name", e.target.value)}
              />
              <input
                type="number"
                min="1"
                value={item.qty}
                onChange={(e) =>
                  updateItem(item.id, "qty", Number(e.target.value))
                }
              />
              <input
                type="number"
                min="0"
                value={item.estimation}
                onChange={(e) =>
                  updateItem(item.id, "estimation", Number(e.target.value))
                }
              />
              <button
                type="button"
                className="cm-del-btn"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* CARD 3: Notes */}
        <div className="cm-card">
          <h2 className="cm-card-title">Notes</h2>
          <textarea
            className="cm-notes-textarea"
            placeholder="Any special case, urgency, vendor preference, justification..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* FOOTER ACTIONS */}
        <div className="cm-form-actions">
          <button
            type="button"
            className="cm-cancel-btn"
            onClick={() => navigate("/cluster-manager")}
          >
            Cancel
          </button>

          <button
            type="button"
            className="cm-submit-btn"
            onClick={handleSubmit}
          >
            Generate Work proposal
          </button>
        </div>

      </div>

    </div>
  );
};

export default NewWorkProposal;
