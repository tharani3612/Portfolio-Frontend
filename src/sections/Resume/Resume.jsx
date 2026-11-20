
import React from "react";
import { motion } from "motion/react";
import {
  FaGraduationCap,
  FaBriefcase,
} from "react-icons/fa6";

import "./Resume.css";

const education = [
  {
    title: "Mahendra Engineering College (Autonomous)",
    subtitle: "B.E. – Cyber Security",
    description: "CGPA: 7.92 | Expected Graduation: May 2027",
  },
  {
    title: "K.K. Hr. Sec. School – P. Velur",
    subtitle: "Secondary Education",
    description: "",
  },
];

const experience = [
  {
    title: "Cloud Security Engineering Intern",
    company: "SkyLena Info Technology Pvt. Ltd., Coimbatore",
    date: "Dec 2025 – Feb 2026",
    description:
      "Gained practical exposure to AWS services, cloud security concepts, infrastructure configuration, and troubleshooting techniques.",
  },
  {
    title: "Cloud Computing Intern",
    company: "Corizo Edutech Private Limited",
    date: "Oct 2025 – Nov 2025",
    description:
      "Gained knowledge of cloud computing fundamentals, cloud service configuration, and deployment workflows.",
  },
];

const Resume = () => {
  return (
    <section className="resume-section" id="resume">
      <div className="resume-container">

        {/* SECTION HEADING */}

        <motion.div
          className="resume-heading"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="resume-subtitle">
            MY JOURNEY
          </span>

          <h2>Resume</h2>
          <span className="resume-bg-text">RESUME</span>
        </motion.div>

        {/* RESUME CARDS */}

        <div className="resume-grid">

          {/* EDUCATION */}

          <motion.div
            className="resume-card"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <div className="resume-card-heading">
              <FaGraduationCap />
              <h3>Education</h3>
            </div>

            <div className="resume-timeline">
              {education.map((item, index) => (
                <div className="resume-timeline-item" key={index}>
                  <span className="resume-dot"></span>

                  <div className="resume-item-content">
                    <h4>{item.title}</h4>
                    <p className="resume-item-subtitle">
                      {item.subtitle}
                    </p>

                    {item.description && (
                      <p className="resume-item-description">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* EXPERIENCE */}

          <motion.div
            className="resume-card"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <div className="resume-card-heading">
              <FaBriefcase />
              <h3>Experience</h3>
            </div>

            <div className="resume-timeline">
              {experience.map((item, index) => (
                <div className="resume-timeline-item" key={index}>
                  <span className="resume-dot"></span>

                  <div className="resume-item-content">

                    <div className="resume-experience-top">
                      <h4>{item.title}</h4>

                      <span className="resume-date">
                        {item.date}
                      </span>
                    </div>

                    <p className="resume-item-subtitle">
                      {item.company}
                    </p>

                    <p className="resume-item-description">
                      {item.description}
                    </p>

                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Resume;
