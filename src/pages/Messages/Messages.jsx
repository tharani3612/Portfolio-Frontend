
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FiGrid,
  FiMail,
  FiUsers,
  FiLogOut,
  FiRefreshCw,
  FiEye,
  FiTrash2,
  FiSearch,
  FiX,
  FiMenu,
} from "react-icons/fi";

import "../AdminDashboard/AdminDashboard.css";
import "./Messages.css";

// Render Backend API
const API_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL.replace(/\/+$/, "")}/contact`
  : "";

const Messages = () => {
  const navigate = useNavigate();

  const token = sessionStorage.getItem("adminToken");

  const adminData = useMemo(() => {
    try {
      return JSON.parse(
        sessionStorage.getItem("adminData") || "null"
      );
    } catch {
      return null;
    }
  }, []);

  // STATES
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // FETCH MESSAGES
  const fetchMessages = useCallback(async () => {
    if (!token) return;

    if (!API_URL) {
      setError("Backend API URL is not configured.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages(
        Array.isArray(response.data.data)
          ? response.data.data
          : []
      );
    } catch (err) {
      console.error("Messages API Error:", err);

      if ([401, 403].includes(err.response?.status)) {
        sessionStorage.removeItem("adminToken");
        sessionStorage.removeItem("adminData");

        navigate("/admin/login", {
          replace: true,
        });

        return;
      }

      setError(
        err.response?.data?.message ||
          "Unable to load messages."
      );
    } finally {
      setLoading(false);
    }
  }, [token, navigate]);

  // AUTHENTICATION AND INITIAL FETCH
  useEffect(() => {
    if (!token || !adminData) {
      navigate("/admin/login", {
        replace: true,
      });
      return;
    }

    fetchMessages();
  }, [token, adminData, navigate, fetchMessages]);

  // SEARCH FILTER
  const filteredMessages = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return messages;

    return messages.filter((message) =>
      [
        message.name,
        message.email,
        message.subject,
        message.message,
      ].some((value) =>
        String(value || "")
          .toLowerCase()
          .includes(keyword)
      )
    );
  }, [messages, search]);

  // FORMAT DATE
  const formatDate = (date) => {
    if (!date) return "--";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "--";
    }

    return parsedDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // DELETE MESSAGE
  const handleDelete = async (id) => {
    if (deletingId) return;

    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this message?"
    );

    if (!confirmed) return;

    if (!API_URL) {
      alert("Backend API URL is not configured.");
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      const response = await axios.delete(
        `${API_URL}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Remove message from frontend
        setMessages((previous) =>
          previous.filter(
            (message) => message._id !== id
          )
        );

        // Close modal if deleted message is open
        if (selectedMessage?._id === id) {
          setSelectedMessage(null);
        }
      } else {
        alert(
          response.data.message ||
            "Unable to delete message."
        );
      }
    } catch (err) {
      console.error("Delete Message Error:", err);

      if ([401, 403].includes(err.response?.status)) {
        sessionStorage.removeItem("adminToken");
        sessionStorage.removeItem("adminData");

        navigate("/admin/login", {
          replace: true,
        });

        return;
      }

      alert(
        err.response?.data?.message ||
          "Unable to delete message. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // LOGOUT
  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminData");

    navigate("/admin/login", {
      replace: true,
    });
  };

  // UNIQUE CONTACTS
  const uniqueContacts = new Set(
    messages
      .map((item) => item.email?.trim().toLowerCase())
      .filter(Boolean)
  ).size;

  if (!token || !adminData) {
    return null;
  }

  return (
    <div className="admin-dashboard messages-page">

      {/* SIDEBAR */}
      <aside
        className={`admin-sidebar ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-logo">T.</div>

          <div>
            <h2>
              THARANI<span>DHARAN</span>
            </h2>
            <p>ADMIN PANEL</p>
          </div>

          <button
            className="admin-mobile-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <FiX />
          </button>
        </div>

        <div className="admin-sidebar-label">
          MAIN MENU
        </div>

        <nav className="admin-sidebar-nav">
          <button
            className="admin-nav-item"
            onClick={() => {
              navigate("/admin/dashboard");
              setSidebarOpen(false);
            }}
          >
            <FiGrid />
            <span>Dashboard</span>
          </button>

          <button
            className="admin-nav-item active"
            onClick={() => setSidebarOpen(false)}
          >
            <FiMail />
            <span>Messages</span>

            <span className="admin-nav-count">
              {loading ? "..." : messages.length}
            </span>
          </button>
        </nav>

        {/* SIDEBAR BOTTOM */}
        <div className="admin-sidebar-bottom">
          <div className="admin-sidebar-user">
            <div className="admin-user-avatar">A</div>

            <div className="admin-user-details">
              <h4>Administrator</h4>
              <p>{adminData.email}</p>
            </div>
          </div>

          <button
            className="admin-logout-btn"
            onClick={handleLogout}
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">

        {/* TOPBAR */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              className="admin-mobile-menu"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <FiMenu />
            </button>

            <div>
              <span className="admin-breadcrumb">
                ADMIN / INBOX
              </span>

              <h1>Messages</h1>
            </div>
          </div>

          <div className="admin-topbar-right">
            <span className="admin-online-status">
              <span></span>
              Online
            </span>

            <button
              className="admin-refresh-btn"
              onClick={fetchMessages}
              disabled={loading}
              title="Refresh"
            >
              <FiRefreshCw
                className={
                  loading ? "refresh-spinning" : ""
                }
              />
            </button>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="admin-dashboard-content">

          {/* WELCOME */}
          <section className="messages-welcome">
            <div>
              <span>INBOX MANAGEMENT</span>
              <h2>Contact Messages</h2>

              <p>
                View and manage messages received through your portfolio.
              </p>
            </div>

            <div className="messages-welcome-icon">
              <FiMail />
            </div>
          </section>

          {/* SUMMARY CARDS */}
          <section className="messages-summary-grid">

            <div className="messages-summary-card">
              <div className="messages-summary-icon">
                <FiMail />
              </div>

              <div>
                <span>TOTAL MESSAGES</span>
                <h3>
                  {loading ? "..." : messages.length}
                </h3>
              </div>
            </div>

            <div className="messages-summary-card">
              <div className="messages-summary-icon">
                <FiUsers />
              </div>

              <div>
                <span>UNIQUE CONTACTS</span>
                <h3>
                  {loading ? "..." : uniqueContacts}
                </h3>
              </div>
            </div>

            <div className="messages-summary-card">
              <div className="messages-summary-icon">
                <FiSearch />
              </div>

              <div>
                <span>SEARCH RESULTS</span>
                <h3>
                  {loading ? "..." : filteredMessages.length}
                </h3>
              </div>
            </div>

          </section>

          {/* MESSAGES TABLE */}
          <section className="messages-content-card">

            {/* TABLE HEADER */}
            <div className="messages-content-header">
              <div>
                <span>ALL INQUIRIES</span>
                <h2>Received Messages</h2>
              </div>

              <button
                className="admin-view-refresh"
                onClick={fetchMessages}
                disabled={loading}
              >
                <FiRefreshCw />
                Refresh
              </button>
            </div>

            {/* SEARCH */}
            <div className="messages-search-area">
              <FiSearch />

              <input
                type="search"
                placeholder="Search name, email, subject or message..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <FiX />
                </button>
              )}
            </div>

            {/* ERROR */}
            {error && (
              <div className="admin-error">
                {error}
              </div>
            )}

            {/* LOADING / EMPTY / TABLE */}
            {loading ? (
              <div className="messages-empty-state">
                <FiRefreshCw className="refresh-spinning" />
                <h3>Loading messages...</h3>
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="messages-empty-state">
                <FiMail />

                <h3>
                  {search
                    ? "No matching messages"
                    : "No messages yet"}
                </h3>

                <p>
                  {search
                    ? "Try another search keyword."
                    : "Contact form submissions will appear here."}
                </p>
              </div>
            ) : (
              <div className="admin-table-wrapper">
                <table className="admin-messages-table">

                  <thead>
                    <tr>
                      <th>CONTACT</th>
                      <th>SUBJECT</th>
                      <th>RECEIVED DATE</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredMessages.map((message) => (
                      <tr key={message._id}>

                        {/* CONTACT */}
                        <td>
                          <div className="admin-contact-cell">
                            <div className="admin-contact-avatar">
                              {(message.name || "U")
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>
                              <h4>{message.name}</h4>
                              <p>{message.email}</p>
                            </div>
                          </div>
                        </td>

                        {/* SUBJECT */}
                        <td className="admin-subject-cell">
                          {message.subject}
                        </td>

                        {/* DATE */}
                        <td className="admin-date-cell">
                          {formatDate(message.createdAt)}
                        </td>

                        {/* ACTIONS */}
                        <td>
                          <div className="admin-action-buttons">

                            <button
                              className="admin-action-view"
                              onClick={() =>
                                setSelectedMessage(message)
                              }
                              title="View message"
                              aria-label="View message"
                            >
                              <FiEye />
                            </button>

                            <button
                              className="admin-action-delete"
                              onClick={() =>
                                handleDelete(message._id)
                              }
                              disabled={deletingId === message._id}
                              title="Delete message"
                              aria-label="Delete message"
                            >
                              {deletingId === message._id ? (
                                <FiRefreshCw className="refresh-spinning" />
                              ) : (
                                <FiTrash2 />
                              )}
                            </button>

                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            )}

            {/* TABLE FOOTER */}
            {!loading && filteredMessages.length > 0 && (
              <div className="messages-table-footer">
                Showing {filteredMessages.length} of{" "}
                {messages.length} messages
              </div>
            )}

          </section>

          {/* FOOTER */}
          <footer className="admin-dashboard-footer">
            © 2026 Tharanidharan. All rights reserved.
          </footer>

        </div>
      </main>

      {/* VIEW MESSAGE MODAL */}
      {selectedMessage && (
        <div
          className="admin-modal-overlay"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="admin-message-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="admin-modal-header">
              <div>
                <span>MESSAGE DETAILS</span>
                <h2>Contact Information</h2>
              </div>

              <button
                onClick={() => setSelectedMessage(null)}
                aria-label="Close modal"
              >
                <FiX />
              </button>
            </div>

            <div className="admin-modal-body">
              <div>
                <label>NAME</label>
                <p>{selectedMessage.name}</p>
              </div>

              <div>
                <label>EMAIL</label>
                <p>{selectedMessage.email}</p>
              </div>

              <div>
                <label>SUBJECT</label>
                <p>{selectedMessage.subject}</p>
              </div>

              <div>
                <label>MESSAGE</label>
                <p className="admin-full-message">
                  {selectedMessage.message}
                </p>
              </div>

              <div>
                <label>RECEIVED DATE</label>
                <p>
                  {formatDate(selectedMessage.createdAt)}
                </p>
              </div>
            </div>

            <button
              className="admin-modal-close-btn"
              onClick={() => setSelectedMessage(null)}
            >
              CLOSE
            </button>

          </div>
        </div>
      )}

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

    </div>
  );
};

export default Messages;
