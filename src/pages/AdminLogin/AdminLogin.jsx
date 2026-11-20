
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiAlertCircle,
} from "react-icons/fi";

import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          email: formData.email.trim(),
          password: formData.password,
        }
      );

      if (response.data.success && response.data.token) {
        sessionStorage.setItem("adminToken", response.data.token);

        sessionStorage.setItem(
          "adminData",
          JSON.stringify(response.data.admin)
        );

        navigate("/admin/dashboard");
      } else {
        setError(response.data.message || "Login failed.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-login-section">
      <div className="admin-login-card">

        {/* LEFT IMAGE */}
        <div className="admin-login-image">
          <img
            src="/images/profile.png"
            alt="Profile"
            className="admin-login-profile"
          />
        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="admin-login-form-panel">

          <div className="admin-form-content">

            <div className="admin-form-heading">
              <span className="admin-form-label">
                PRIVATE ADMIN AREA
              </span>

              <h1>
                Admin <span>Login</span>
              </h1>

              <p>
                Enter your credentials to access your dashboard.
              </p>
            </div>

            <form
              className="admin-login-form"
              onSubmit={handleSubmit}
              autoComplete="off"
            >

              {/* EMAIL */}
              <div className="admin-input-group">
                <label htmlFor="admin-email">
                  EMAIL ADDRESS
                </label>

                <div className="admin-input-wrapper">
                  <FiMail className="admin-input-icon" />

                  <input
                    id="admin-email"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="off"
                    spellCheck="false"
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="admin-input-group">
                <label htmlFor="admin-password">
                  PASSWORD
                </label>

                <div className="admin-input-wrapper">
                  <FiLock className="admin-input-icon" />

                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Your Password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                  />

                  <button
                    type="button"
                    className="admin-password-toggle"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* ERROR */}
              {error && (
                <div className="admin-login-error" role="alert">
                  <FiAlertCircle />
                  <span>{error}</span>
                </div>
              )}

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="admin-login-button"
                disabled={loading}
              >
                <span>
                  {loading ? "PLEASE WAIT..." : "SIGN IN TO DASHBOARD"}
                </span>

                {!loading && <FiArrowRight />}

                {loading && (
                  <span className="admin-login-spinner"></span>
                )}
              </button>

            </form>

            <div className="admin-login-footer">
              <span>© 2026 THARANIDHARAN</span>
              <span>ADMIN ACCESS ONLY</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
