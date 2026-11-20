
import React from "react";
import { motion } from "motion/react";
import "./Skills.css";

const skillCategories = [
  {
    title: "Frontend Development",
    skills: [
      { name: "HTML", level: 90 },
      { name: "CSS", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "React.js", level: 75 },
    ],
  },
  {
    title: "Backend Development",
    skills: [
      { name: "Node.js", level: 75 },
      { name: "Express.js", level: 70 },
      { name: "MongoDB", level: 70 },
      { name: "REST API", level: 75 },
    ],
  },
  {
    title: "Tools & Programming",
    skills: [
      { name: "Git & GitHub", level: 80 },
      { name: "Java", level: 65 },
      { name: "Postman", level: 75 },
      { name: "AWS Basics", level: 60 },
    ],
  },
];

const Skills = () => {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">

        <motion.div
          className="skills-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="skills-subtitle">MY SPECIALITY</span>
          <h2>
            My <span>Skills</span>
          </h2>
          <p>
            Technical skills and technologies I use
            to build responsive and functional web applications.
          </p>
        </motion.div>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <motion.div
              className="skills-card"
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <h3>{category.title}</h3>

              {category.skills.map((skill, skillIndex) => (
                <div className="skill-item" key={skill.name}>
                  <div className="skill-info">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>

                  <div className="skill-progress">
                    <motion.div
                      className="skill-progress-bar"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        delay: skillIndex * 0.1,
                      }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
