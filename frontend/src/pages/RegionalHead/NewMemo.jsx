import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  ChevronDown,
  Trash2,
  Circle,
} from "lucide-react";

import Sidebar from "../../components/regionalHead/Sidebar";
import "../../styles/regionalHead.css";
import "../../styles/newMemo.css";

const NewMemo = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("Marketing");
  const [campus, setCampus] = useState("SHS Dhawas");

  const [requiresPurchase, setRequiresPurchase] = useState(false);
  const [alreadyInStock, setAlreadyInStock] = useState(false);

  const [notes, setNotes] = useState("");

  const [items, setItems] = useState([
    {
      id: 1,
      name: "",
      qty: 1,
      unitPrice: 0,
    },
  ]);

  const total = useMemo(() => {
    return items.reduce(
      (sum, item) =>
        sum + Number(item.qty || 0) * Number(item.unitPrice || 0),
      0
    );
  }, [items]);

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        qty: 1,
        unitPrice: 0,
      },
    ]);
  };

  const updateItem = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => {
      if (prev.length === 1) {
        return prev;
      }

      return prev.filter((item) => item.id !== id);
    });
  };

  const handleGenerateMemo = () => {
    console.log("Memo data:", {
      title,
      department,
      campus,
      requiresPurchase,
      alreadyInStock,
      items,
      notes,
      total,
    });

    // Backend/API integration can be added here later.
  };

  return (
    <div className="rh-page">
      <Sidebar />

      <main className="new-memo-main">
        <div className="new-memo-container">

          {/* ================= HEADER ================= */}

          <section className="new-memo-header">

            <div>
              <p className="new-memo-label">
                NEW MEMO
              </p>

              <h1 className="new-memo-title">
                Generate a memo
              </h1>

              <p className="new-memo-subtitle">
                Capture the requirement and route it through the approval flow.
              </p>
            </div>

          </section>


          {/* ================= MAIN GRID ================= */}

          <div className="new-memo-grid">

            {/* ================= LEFT COLUMN ================= */}

            <div className="new-memo-left">


              {/* ================= DETAILS ================= */}

              <section className="memo-card details-card">

                <h2 className="memo-card-title">
                  Details
                </h2>


                {/* TITLE */}

                <div className="form-group full-width">

                  <label>
                    Title
                  </label>

                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Procurement of projectors for Academics block"
                  />

                </div>


                {/* DEPARTMENT + CAMPUS */}

                <div className="form-row">

                  <div className="form-group">

                    <label>
                      Department
                    </label>

                    <div className="select-wrapper">

                      <select
                        value={department}
                        onChange={(e) =>
                          setDepartment(e.target.value)
                        }
                      >
                        <option>Marketing</option>
                        <option>HR</option>
                        <option>Operations</option>
                        <option>Academics</option>
                        <option>Events</option>
                        <option>Administration</option>
                      </select>

                      <ChevronDown size={18} />

                    </div>

                  </div>


                  <div className="form-group">

                    <label>
                      Campus
                    </label>

                    <div className="select-wrapper">

                      <select
                        value={campus}
                        onChange={(e) =>
                          setCampus(e.target.value)
                        }
                      >
                        <option>SHS Dhawas</option>
                        <option>Sapiens Main Campus</option>
                        <option>North Campus</option>
                        <option>South Campus</option>
                      </select>

                      <ChevronDown size={18} />

                    </div>

                  </div>

                </div>


                {/* ROUTING */}

                <div className="routing-section">

                  <label className="routing-label">
                    Routing
                  </label>


                  <button
                    type="button"
                    className="toggle-row"
                    onClick={() =>
                      setRequiresPurchase(!requiresPurchase)
                    }
                  >

                    <span>
                      Requires purchase
                    </span>

                    <span
                      className={`toggle ${
                        requiresPurchase ? "on" : ""
                      }`}
                    >
                      <span className="toggle-knob" />
                    </span>

                  </button>


                  <button
                    type="button"
                    className="toggle-row"
                    onClick={() =>
                      setAlreadyInStock(!alreadyInStock)
                    }
                  >

                    <span>
                      Already in stock
                    </span>

                    <span
                      className={`toggle ${
                        alreadyInStock ? "on" : ""
                      }`}
                    >
                      <span className="toggle-knob" />
                    </span>

                  </button>

                </div>

              </section>


              {/* ================= ITEMS ================= */}

              <section className="memo-card items-card">

                <div className="memo-section-header">

                  <h2 className="memo-card-title">
                    Items
                  </h2>

                  <button
                    type="button"
                    className="add-item-btn"
                    onClick={addItem}
                  >
                    <Plus size={18} />
                    Add item
                  </button>

                </div>


                <div className="items-table-header">

                  <span>
                    Item name
                  </span>

                  <span>
                    Qty
                  </span>

                  <span>
                    Est. unit ₹
                  </span>

                  <span />

                </div>


                <div className="items-list">

                  {items.map((item) => (

                    <div
                      className="item-row"
                      key={item.id}
                    >

                      <input
                        type="text"
                        placeholder="Item description"
                        value={item.name}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "name",
                            e.target.value
                          )
                        }
                      />


                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "qty",
                            Number(e.target.value)
                          )
                        }
                      />


                      <input
                        type="number"
                        min="0"
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "unitPrice",
                            Number(e.target.value)
                          )
                        }
                      />


                      <button
                        type="button"
                        className="delete-item-btn"
                        onClick={() =>
                          removeItem(item.id)
                        }
                        aria-label="Delete item"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  ))}

                </div>


                <div className="estimated-total">

                  <span>
                    Estimated total
                  </span>

                  <strong>
                    ₹ {total.toLocaleString("en-IN")}
                  </strong>

                </div>

              </section>


              {/* ================= NOTES ================= */}

              <section className="memo-card notes-card">

                <h2 className="memo-card-title">
                  Notes
                </h2>

                <textarea
                  value={notes}
                  onChange={(e) =>
                    setNotes(e.target.value)
                  }
                  placeholder="Any special case, justification or attachment reference..."
                />

              </section>


              {/* ================= ACTIONS ================= */}

              <div className="memo-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    navigate("/regional-head")
                  }
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="generate-memo-btn"
                  onClick={handleGenerateMemo}
                >
                  Generate memo
                </button>

              </div>

            </div>


            {/* ================= RIGHT COLUMN ================= */}

            <aside className="approval-card">

              <h2>
                Approval flow
              </h2>

              <p className="approval-subtitle">
                Standard pipeline
              </p>


              <div className="approval-list">

                <div className="approval-step active">

                  <div className="approval-icon active-icon">
                    <Circle size={7} fill="currentColor" />
                  </div>

                  <div>
                    <strong>
                      Regional Head
                    </strong>

                    <span>
                      Pending action
                    </span>
                  </div>

                </div>


                <div className="approval-line" />


                <div className="approval-step">

                  <div className="approval-icon">
                    <Circle size={7} />
                  </div>

                  <div>
                    <strong>
                      Director
                    </strong>

                    <span>
                      Awaiting
                    </span>
                  </div>

                </div>


                <div className="approval-line" />


                <div className="approval-step">

                  <div className="approval-icon">
                    <Circle size={7} />
                  </div>

                  <div>
                    <strong>
                      Chairperson
                    </strong>

                    <span>
                      Awaiting
                    </span>
                  </div>

                </div>


                <div className="approval-line" />


                <div className="approval-step">

                  <div className="approval-icon">
                    <Circle size={7} />
                  </div>

                  <div>
                    <strong>
                      Accounts
                    </strong>

                    <span>
                      Awaiting
                    </span>
                  </div>

                </div>

              </div>

            </aside>

          </div>

        </div>
      </main>
    </div>
  );
};

export default NewMemo;
