
import React from "react";
import {
  FiMapPin,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiArrowRight,
} from "react-icons/fi";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  const links = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Resume", id: "resume" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Certifications", id: "certifications" },
    { name: "Contact", id: "contact" },
  ];

  const skills = [
    "Frontend Development",
    "React.js",
    "Node.js & Express.js",
    "MongoDB",
    "REST API Development",
  ];

  const socialLinks = [
    {
      icon: <FiGithub />,
      url: "https://github.com/tharani3612",
      label: "GitHub",
    },
    {
      icon: <FiLinkedin />,
      url: "https://linkedin.com/in/tharanidharan-m",
      label: "LinkedIn",
    },
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Footer Columns */}
        <div className="footer-grid">

          {/* ABOUT */}
          <div className="footer-column footer-about">
            <h3>About</h3>

            <p>
              I'm Tharanidharan, a MERN Stack Developer
              passionate about creating modern, responsive
              and user-friendly web applications.
            </p>

            <div className="footer-socials">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="footer-column footer-links">
            <h3>Links</h3>

            <ul>
              {links.map((link) => (
                <li key={link.id}>
                  <button onClick={() => scrollToSection(link.id)}>
                    <FiArrowRight />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* SKILLS */}
          <div className="footer-column footer-skills">
            <h3>Skills</h3>

            <ul>
              {skills.map((skill) => (
                <li key={skill}>
                  <FiArrowRight />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="footer-column footer-contact">
            <h3>Have a Questions?</h3>

            <div className="footer-contact-item">
              <FiMapPin />

              <p>
                P. Velur, Namakkal,
                Tamil Nadu, India
              </p>
            </div>

            <div className="footer-contact-item">
              <FiMail />

              <a href="mailto:mtharanidharan90@gmail.com">
                mtharanidharan90@gmail.com
              </a>
            </div>

            <div className="footer-contact-item">
              <FiGithub />

              <a
                href="https://github.com/tharani3612"
                target="_blank"
                rel="noreferrer"
              >
                github.com/tharani3612
              </a>
            </div>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="footer-bottom">
          <p>
            Copyright © {year} All rights reserved |
            This portfolio is made with <span>♥</span> by{" "}
            <strong>Tharanidharan M</strong>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
