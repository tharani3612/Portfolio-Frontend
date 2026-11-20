
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
  FiClock,
  FiArrowUpRight,
  FiMenu,
  FiX,
  FiPieChart,
} from "react-icons/fi";

import "./AdminDashboard.css";

const API_URL = "http://localhost:5000/api/contact";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Get admin token
  const token = sessionStorage.getItem("adminToken");

  // IMPORTANT: Keep adminData stable between renders
  const adminData = useMemo(() => {
    try {
      return JSON.parse(
        sessionStorage.getItem("adminData") || "null"
      );
    } catch {
      return null;
    }
  }, []);

  // Fetch contact messages
  const fetchMessages = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages(response.data.data || []);
    } catch (err) {
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
          "Unable to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  }, [token, navigate]);

  // Load messages only when authentication is valid
  useEffect(() => {
    if (!token || !adminData) {
      navigate("/admin/login", {
        replace: true,
      });

      return;
    }

    fetchMessages();
  }, [token, adminData, navigate, fetchMessages]);

  // Dashboard statistics
  const totalMessages = messages.length;

  const uniqueContacts = new Set(
    messages
      .map((item) => item.email?.trim().toLowerCase())
      .filter(Boolean)
  ).size;

  const repeatMessages = Math.max(
    totalMessages - uniqueContacts,
    0
  );

  const firstPercentage = totalMessages
    ? (uniqueContacts / totalMessages) * 100
    : 0;

  const repeatPercentage = totalMessages
    ? (repeatMessages / totalMessages) * 100
    : 0;

  // Latest message
  const latestMessage = messages.reduce((latest, current) => {
    if (!latest) return current;

    return new Date(current.createdAt) >
      new Date(latest.createdAt)
      ? current
      : latest;
  }, null);

  // Format date
  const formatDate = (date) => {
    if (!date) return "--";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Logout
  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminData");

    navigate("/admin/login", {
      replace: true,
    });
  };

  if (!token || !adminData) return null;

  return (
    <div className="admin-dashboard">

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
          >
            <FiX />
          </button>
        </div>

        <div className="admin-sidebar-label">
          MAIN MENU
        </div>

        <nav className="admin-sidebar-nav">
          <button
            className="admin-nav-item active"
            onClick={() => setSidebarOpen(false)}
          >
            <FiGrid />
            <span>Dashboard</span>
          </button>

          <button
            className="admin-nav-item"
            onClick={() => {
              navigate("/admin/messages");
              setSidebarOpen(false);
            }}
          >
            <FiMail />
            <span>Messages</span>

            <span className="admin-nav-count">
              {loading ? "..." : totalMessages}
            </span>
          </button>
        </nav>

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
            >
              <FiMenu />
            </button>

            <div>
              <span className="admin-breadcrumb">
                ADMIN / OVERVIEW
              </span>

              <h1>Dashboard</h1>
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

          {/* WELCOME SECTION */}
          <section className="admin-welcome">
            <div>
              <span>WELCOME BACK</span>

              <h2>
                Hello, <span>Administrator!</span>
              </h2>

              <p>
                Here's what's happening with your portfolio today.
              </p>
            </div>

            <div className="admin-welcome-icon">
              <FiGrid />
            </div>
          </section>

          {/* STATISTICS */}
          <section className="admin-stats-grid">

            <div className="admin-stat-card">
              <div className="admin-stat-top">
                <div className="admin-stat-icon">
                  <FiMail />
                </div>

                <FiArrowUpRight className="admin-stat-arrow" />
              </div>

              <p>TOTAL MESSAGES</p>

              <h3>
                {loading ? "..." : totalMessages}
              </h3>

              <span>All received messages</span>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-top">
                <div className="admin-stat-icon">
                  <FiUsers />
                </div>

                <FiArrowUpRight className="admin-stat-arrow" />
              </div>

              <p>UNIQUE CONTACTS</p>

              <h3>
                {loading ? "..." : uniqueContacts}
              </h3>

              <span>Distinct email addresses</span>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-top">
                <div className="admin-stat-icon">
                  <FiClock />
                </div>

                <FiArrowUpRight className="admin-stat-arrow" />
              </div>

              <p>LATEST MESSAGE</p>

              <h3 className="admin-stat-date">
                {loading
                  ? "..."
                  : formatDate(latestMessage?.createdAt)}
              </h3>

              <span>Most recent submission</span>
            </div>

          </section>

          {/* ANALYTICS CHART */}
          <section className="admin-chart-section">

            <div className="admin-chart-heading">
              <div>
                <span>MESSAGE ANALYTICS</span>

                <h2>Contact Overview</h2>

                <p>
                  First-time contacts compared with repeat messages.
                </p>
              </div>

              <div className="admin-chart-heading-icon">
                <FiPieChart />
              </div>
            </div>

            <div className="admin-chart-content">

              <div className="admin-pie-area">
                <div
                  key={totalMessages}
                  className={`admin-pie-chart ${
                    !totalMessages ? "pie-empty" : ""
                  }`}
                  style={{
                    "--first-share": `${firstPercentage}%`,
                  }}
                >
                  <div className="admin-pie-center">
                    <span>TOTAL</span>

                    <strong>
                      {loading ? "..." : totalMessages}
                    </strong>

                    <small>Messages</small>
                  </div>
                </div>
              </div>

              <div className="admin-chart-legend">

                {/* FIRST-TIME CONTACTS */}
                <div className="admin-legend-item">
                  <div className="admin-legend-info">
                    <span className="admin-legend-dot first-time-dot"></span>

                    <div>
                      <h4>First-time contacts</h4>
                      <p>Unique email addresses</p>
                    </div>
                  </div>

                  <div className="admin-legend-value">
                    <strong>
                      {loading ? "..." : uniqueContacts}
                    </strong>

                    <span>
                      {firstPercentage.toFixed(0)}%
                    </span>
                  </div>
                </div>

                {/* REPEAT MESSAGES */}
                <div className="admin-legend-item">
                  <div className="admin-legend-info">
                    <span className="admin-legend-dot repeat-dot"></span>

                    <div>
                      <h4>Repeat messages</h4>
                      <p>
                        Additional messages from existing contacts
                      </p>
                    </div>
                  </div>

                  <div className="admin-legend-value">
                    <strong>
                      {loading ? "..." : repeatMessages}
                    </strong>

                    <span>
                      {repeatPercentage.toFixed(0)}%
                    </span>
                  </div>
                </div>

                <div className="admin-chart-note">
                  <FiPieChart />

                  <span>
                    Statistics are calculated from your contact records.
                  </span>
                </div>

              </div>
            </div>
          </section>

          {/* QUICK ACCESS */}
          <section className="admin-quick-access">
            <div>
              <span>INBOX MANAGEMENT</span>

              <h2>Manage your messages</h2>

              <p>
                View, search and manage portfolio contact messages.
              </p>
            </div>

            <button
              className="admin-open-messages"
              onClick={() => navigate("/admin/messages")}
            >
              <FiMail />
              Open Messages
              <FiArrowUpRight />
            </button>
          </section>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="admin-error">
              {error}
            </div>
          )}

          {/* FOOTER */}
          <footer className="admin-dashboard-footer">
            © 2026 Tharanidharan. All rights reserved.
          </footer>

        </div>
      </main>

      {/* MOBILE SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

    </div>
  );
};

export default AdminDashboard;
