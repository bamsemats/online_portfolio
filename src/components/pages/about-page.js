import React from 'react';
import "./pages.css";
import { 
  SiReact, SiJavascript, SiHtml5, SiCss3, 
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql,
  SiGit, SiDocker, SiFigma, SiVite
} from "react-icons/si";
import {
  FaJava, FaNodeJs
} from "react-icons/fa";
import {
  GrMysql
} from "react-icons/gr";
import profilePic from "../../profile_picture.jpg";

const skills = [
  { category: "Frontend", icons: [
    { name: "React", icon: <SiReact />, code: "const [state, setState] = useState();" },
    { name: "JavaScript", icon: <SiJavascript />, code: "array.map(item => item * 2);" },
    { name: "HTML5", icon: <SiHtml5 />, code: "<div className='container'>" },
    { name: "CSS3", icon: <SiCss3 />, code: "display: grid; gap: 2rem;" }
  ]},
  { category: "Backend", icons: [
    { name: "Java", icon: <FaJava />, code: "const fs = require('fs');" },
    { name: "MySQL", icon: <GrMysql />, code: "SELECT * FROM users;;" },
    { name: "MongoDB", icon: <SiMongodb />, code: "db.collection.find({});" },
    { name: "Node.js", icon: <FaNodeJs />, code: "const server = createServer((req, res) => {" }
  ]},
  { category: "Tools", icons: [
    { name: "Git", icon: <SiGit />, code: "git commit -m 'feat: update';" },
    { name: "Docker", icon: <SiDocker />, code: "docker-compose up -d" },
    { name: "Figma", icon: <SiFigma />, code: "/* Design to Code */" },
    { name: "Vite", icon: <SiVite />, code: "npm run dev" }
  ]}
];

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>Beyond the <span>Code</span></h1>
          <p className="lead-text">
            I'm a developer driven by the challenge of turning complex problems into 
            simple, elegant digital solutions. Based in Sweden, I'm currently 
            expanding my expertise in full-stack development and modern UI/UX principles.
          </p>
        </div>
      </section>

      <div className="about-content">
        <section className="about-bio">
          <h2 className="section-title">My Journey</h2>
          <div className="bio-grid">
            <div className="bio-image-wrapper">
              <img src={profilePic} alt="Mats Rönnqvist" className="about-profile-image" />
            </div>
            <div className="bio-text">
              <p>
                My interest in development started with a curiosity about how the web works, 
                which quickly evolved into a passion for building applications that matter. 
                I enjoy the intersection of logic and creativity, constantly learning new 
                technologies to stay at the forefront of the industry.
              </p>
              <p>
                Whether it's crafting a responsive frontend or architecting a robust backend, 
                I focus on writing clean, maintainable code and delivering exceptional 
                user experiences.
              </p>
            </div>
          </div>
        </section>

        <section className="skills-section">
          <h2 className="section-title">Technical Arsenal</h2>
          <div className="skills-grid-container">
            {skills.map((group) => (
              <div key={group.category} className="skill-category-group">
                <h3>{group.category}</h3>
                <div className="skills-bento">
                  {group.icons.map((skill) => (
                    <div key={skill.name} className="skill-card-bento">
                      <div className="skill-card-header">
                        {skill.icon}
                        <span>{skill.name}</span>
                      </div>
                      <div className="skill-card-code">
                        <code>{skill.code}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
