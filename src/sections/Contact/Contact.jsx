
import React, { useState } from "react";
import { motion } from "motion/react";
import axios from "axios";

import {
  FiMapPin,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiSend,
} from "react-icons/fi";

import "./Contact.css";

const API_URL = "http://localhost:5000/api/contact";

const contactInfo = [
  {
    icon: <FiMapPin />,
    title: "ADDRESS",
    value: "P. Velur, Namakkal, Tamil Nadu",
    link: "https://www.google.com/maps/search/?api=1&query=P.+Velur%2C+Namakkal%2C+Tamil+Nadu",
    external: true,
  },
  {
    icon: <FiMail />,
    title: "EMAIL ADDRESS",
    value: "mtharanidharan90@gmail.com",
    link: "https://mail.google.com/mail/?view=cm&fs=1&to=mtharanidharan90@gmail.com",
    external: true,
  },
  {
    icon: <FiGithub />,
    title: "GITHUB",
    value: "github.com/tharani3612",
    link: "https://github.com/tharani3612",
    external: true,
  },
  {
    icon: <FiLinkedin />,
    title: "LINKEDIN",
    value: "linkedin.com/in/tharanidharan-m",
    link: "https://linkedin.com/in/tharanidharan-m",
    external: true,
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await axios.post(API_URL, formData);

      setStatus({
        type: "success",
        message: response.data.message,
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Unable to send message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">

        {/* CONTACT HEADING */}

        <motion.div
          className="contact-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="contact-heading-bg">
            Contact
          </div>

          <h2>
            Contact <span>Me</span>
          </h2>

          <p>
            Feel free to reach out for opportunities,
            collaborations, or any queries.
          </p>
        </motion.div>

        {/* CONTACT INFORMATION */}

        <div className="contact-info-grid">
          {contactInfo.map((item, index) => (
            <motion.div
              className="contact-info-item"
              key={item.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
              }}
            >
              <div className="contact-icon">
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <a
                href={item.link}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
              >
                {item.value}
              </a>
            </motion.div>
          ))}
        </div>

        {/* CONTACT FORM AREA */}

        <motion.div
          className="contact-form-section"
          initial={{ opacity: 0, y: 65 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          {/* LEFT IMAGE */}

          <div className="contact-image-panel">
            <img
              src="/images/profile.png"
              alt="Tharanidharan"
              className="contact-profile-image"
            />

            <div className="contact-image-caption">
              <span>LET'S CONNECT</span>
              <h3>Have a project in mind?</h3>
            </div>
          </div>

          {/* RIGHT FORM */}

          <div className="contact-form-panel">
            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >
              <div className="contact-form-field">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-form-field">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-form-field">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-form-field">
                <textarea
                  name="message"
                  placeholder="Message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* STATUS MESSAGE */}

              {status.message && (
                <p
                  className={`contact-status ${status.type}`}
                  role="status"
                >
                  {status.message}
                </p>
              )}

              <button
                type="submit"
                className="contact-submit-btn"
                disabled={loading}
              >
                {loading ? "SENDING..." : "SEND MESSAGE"}
                <FiSend />
              </button>
            </form>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
