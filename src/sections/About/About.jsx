
import React from "react";
import { motion } from "motion/react";
import "./About.css";

const details = [
  ["Name:", "Tharanidharan M"],
  ["Degree:", "B.E. Cyber Security"],
  ["College:", "Mahendra Engineering College"],
  ["Location:", "P. Velur, Namakkal, Tamil Nadu"],
  ["Email:", "mtharanidharan90@gmail.com"],
  ["Graduation:", "May 2027"],
];

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">

        {/* LEFT PORTRAIT */}

        <motion.div
          className="about-image"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <img
            src="/images/about-profile.png"
            alt="Tharanidharan"
          />
        </motion.div>

        {/* RIGHT CONTENT */}

        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <div className="about-heading">
            <h2>About Me</h2>
            <span>About</span>
          </div>

          <p className="about-description">
            I'm Tharanidharan M, an aspiring MERN Stack Developer
            pursuing B.E. Cyber Security at Mahendra Engineering
            College. I have knowledge of HTML, CSS, JavaScript,
            React.js, Node.js, Express.js, and MongoDB.
            I'm passionate about developing responsive web
            applications and building practical solutions
            using modern web technologies.
          </p>

          {/* PERSONAL DETAILS */}

          <div className="about-details">
            {details.map(([label, value], index) => (
              <motion.div
                className="about-detail-row"
                key={label}
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.25 + index * 0.1,
                }}
              >
                <strong>{label}</strong>
                <span>{value}</span>
              </motion.div>
            ))}
          </div>

          {/* DOWNLOAD CV */}

          <div className="about-bottom">
            <a
              href="/resume.pdf"
              download
              className="about-download-btn"
            >
              DOWNLOAD CV
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default About;
