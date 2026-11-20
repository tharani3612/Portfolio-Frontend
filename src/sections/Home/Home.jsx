
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiArrowDown,
} from "react-icons/fi";
import "./Home.css";

const roles = [
  "MERN Stack Developer",
  "Full Stack Developer",
  "Frontend Developer",
];

const profileImages = [
  "/images/profile.png",
  "/images/about-profile.png",
];

const Home = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
      setImageIndex((prev) => (prev + 1) % profileImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="home-section" id="home">

      <div className="home-container">

        {/* LEFT CONTENT */}
        <motion.div
          className="home-content"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >

          <span className="home-greeting">
            HELLO!
          </span>

          <h1 className="home-title">
            I'm <span>Tharanidharan</span>
          </h1>

          {/* ANIMATED ROLE */}
          <div className="home-role-wrapper">
            <AnimatePresence mode="wait">
              <motion.h2
                key={roleIndex}
                className="home-role"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.5 }}
              >
                {roles[roleIndex]}
              </motion.h2>
            </AnimatePresence>
          </div>

          <p className="home-description">
            I build modern, responsive and user-friendly
            web applications using React, Node.js,
            Express.js and MongoDB.
          </p>

          {/* BUTTONS */}
          <div className="home-buttons">

            <a href="#contact" className="home-btn home-btn-primary">
              HIRE ME
            </a>

            <a href="#projects" className="home-btn home-btn-outline">
              MY WORKS
            </a>

          </div>

          {/* SOCIAL LINKS */}
          <div className="home-socials">

            <a
              href="https://github.com/tharani3612"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>

            <a
              href="https://linkedin.com/in/tharanidharan-m"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>

            <a
              href="mailto:mtharanidharan90@gmail.com"
              aria-label="Email"
            >
              <FiMail />
            </a>

          </div>

        </motion.div>

        {/* RIGHT IMAGE */}
        <div className="home-image-wrapper">

          <AnimatePresence mode="sync">
            <motion.img
              key={imageIndex}
              src={profileImages[imageIndex]}
              alt="Tharanidharan"
              className="home-profile-image"
              initial={{ opacity: 0, x: 60, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.96 }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
            />
          </AnimatePresence>

        </div>

      </div>

      {/* SCROLL INDICATOR */}
      <a href="#about" className="home-scroll">
        <FiArrowDown />
      </a>

    </section>
  );
};

export default Home;
