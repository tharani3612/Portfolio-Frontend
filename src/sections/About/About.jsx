
import React from "react";
import { motion } from "motion/react";
import "./About.css";

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
          {/* HEADING */}

          <div className="about-heading">
            <h2>About Me</h2>
            <span>About</span>
          </div>

          {/* ABOUT PARAGRAPH */}

          <p className="about-description">
            I'm a passionate MERN Stack Developer who enjoys
            designing and developing modern, responsive, and
            user-friendly web applications. With hands-on
            experience in HTML, CSS, JavaScript, React.js,
            Node.js, Express.js, and MongoDB, I focus on building
            efficient and scalable full-stack solutions. I enjoy
            turning creative ideas into functional applications,
            exploring new technologies, and solving real-world
            problems through clean and maintainable code.
            My goal is to continuously grow as a developer and
            create meaningful digital experiences.
          </p>

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
