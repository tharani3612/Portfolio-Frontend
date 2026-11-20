
import React from "react";
import { motion } from "motion/react";
import {
  FiCode,
  FiShield,
  FiDatabase,
} from "react-icons/fi";
import "./Certifications.css";

const certifications = [
  {
    title: "AI-TERAHACK",
    organization: "24-Hour Hackathon",
    description:
      "Participated in AI-TERAHACK, a 24-hour hackathon.",
    icon: <FiCode />,
  },
  {
    title: "CTF Competition",
    organization: "Spring Fest 2K25 – KSR College",
    description:
      "Participated in the Capture The Flag (CTF) competition at Spring Fest 2K25.",
    icon: <FiShield />,
  },
  {
    title: "MongoDB Hackathon",
    organization: "24-Hour College-Level Hackathon",
    description:
      "Participated in a 24-hour college-level MongoDB hackathon.",
    icon: <FiDatabase />,
  },
];

const Certifications = () => {
  return (
    <section className="certifications-section" id="certifications">
      <div className="certifications-container">

        {/* SECTION HEADING */}

        <motion.div
          className="certifications-heading"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span>MY ACHIEVEMENTS</span>

          <h2>
            My <strong>Certifications</strong>
          </h2>

          <p>
            Hackathons and technical competitions
            that showcase my learning and problem-solving experience.
          </p>
        </motion.div>

        {/* ACHIEVEMENT CARDS */}

        <div className="certifications-grid">
          {certifications.map((item, index) => (
            <motion.article
              className="certification-card"
              key={item.title}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
              }}
            >

              {/* ICON AREA */}

              <div className="certificate-image">

                <div className="achievement-placeholder">
                  {item.icon}
                </div>

                {/* HOVER OVERLAY */}

                <div className="certificate-overlay">
                  {item.icon}
                  <span>ACHIEVEMENT</span>
                </div>

              </div>

              {/* CARD CONTENT */}

              <div className="certificate-content">

                <span className="certificate-organization">
                  {item.organization}
                </span>

                <h3>{item.title}</h3>

                <p className="certificate-description">
                  {item.description}
                </p>

              </div>

            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Certifications;
