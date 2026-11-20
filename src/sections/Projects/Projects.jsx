
import React from "react";
import { motion } from "motion/react";
import {
  FiGithub,
  FiExternalLink,
} from "react-icons/fi";
import "./Projects.css";

const projects = [
  {
    title: "FoodEase",
    category: "Food Ordering Application",
    image: "/images/foodease.png",
    technologies: "HTML • CSS • JAVASCRIPT • REACT.JS",
    github: "https://github.com/tharani3612/FoodEase",
    demo: "https://food-ease-eight.vercel.app/",
  },
  {
    title: "BlogSphere",
    category: "Blog Web Application",
    image: "/images/blogsphere.png",
    technologies: "HTML • CSS • JAVASCRIPT • REACT.JS",
    github: "https://github.com/tharani3612/BlogSphere",
    demo: "https://blog-sphere-topaz.vercel.app/",
  },
  {
    title: "ShopNexa",
    category: "E-commerce Website",
    image: "/images/shopnexa.png",
    technologies:
      "MERN STACK • MONGODB • EXPRESS.JS • REACT.JS • NODE.JS",
    github: "https://github.com/tharani3612/shopnexa-frontend",
    demo: "https://shopnexa-frontend-zhns.vercel.app/",
  },
];

const Projects = () => {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">

        {/* SECTION HEADING */}

        <motion.div
          className="projects-heading"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2>
            My <span>Projects</span>
          </h2>

          <p>
            Far beyond ideas, I turn concepts into
            meaningful digital experiences.
          </p>
        </motion.div>

        {/* PROJECTS GRID */}

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.article
              className="project-item"
              key={project.title}
              initial={{ opacity: 0, y: 55 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.8,
                delay: index * 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              {/* PROJECT IMAGE */}

              <div className="project-image-wrapper">

                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  loading="lazy"
                />

                {/* HOVER OVERLAY */}

                <div className="project-overlay">
                  <div className="project-overlay-content">

                    <span className="project-category">
                      {project.category}
                    </span>

                    <h3>{project.title}</h3>

                    <span className="project-type">
                      {project.technologies}
                    </span>

                  </div>
                </div>

              </div>

              {/* PROJECT BUTTONS */}

              <div className="project-actions">

                {/* GITHUB SOURCE CODE */}

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn source-btn"
                  aria-label={`${project.title} Source Code`}
                >
                  <FiGithub />
                  <span>Source Code</span>
                </a>

                {/* LIVE WEBSITE */}

                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn demo-btn"
                  aria-label={`${project.title} Live Demo`}
                >
                  <FiExternalLink />
                  <span>Live Demo</span>
                </a>

              </div>

            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
