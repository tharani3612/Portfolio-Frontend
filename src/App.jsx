
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./sections/Home/Home";
import About from "./sections/About/About";
import Resume from "./sections/Resume/Resume";
import Skills from "./sections/Skills/Skills";
import Projects from "./sections/Projects/Projects";
import Certifications from "./sections/Certifications/Certifications";
import Contact from "./sections/Contact/Contact";

import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Messages from "./pages/Messages/Messages";

import "./App.css";
import "./styles/variables.css";
import "./styles/global.css";
import "./styles/responsive.css";

const Portfolio = () => (
  <div className="app">
    <Navbar />
    <main>
      <Home />
      <About />
      <Resume />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
    </main>
    <Footer />
  </div>
);

const ProtectedAdminRoute = ({ children }) => {
  const token = sessionStorage.getItem("adminToken");
  const adminData = sessionStorage.getItem("adminData");

  if (!token || !adminData) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Portfolio />} />

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />

      <Route
        path="/admin/messages"
        element={
          <ProtectedAdminRoute>
            <Messages />
          </ProtectedAdminRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
