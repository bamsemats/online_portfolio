import React, { useState } from 'react';
import "../../App.css";
import "./pages.css";
import { BsGithub, BsBoxArrowUpRight } from "react-icons/bs";
import ProjectImageSlider from "./ProjectImageSlider";

// Widget Imports
import Accordian from "../accordian/accordian";
import RandomColor from "../randomcolor/randomcolor";
import Stars from "../stars/stars";
import ImageSlider from "../image-slider/image-slider";
import LoadMore from "../load-more/load-more";
import TreeView from "../tree-view/tree-view";
import HangMan from "../hangman/hangman";
import Tenzies from "../tenzies/tenzies";

// Movie DB Images
import movie1 from "../../assets/example_images/movie_db_example_1.png";
import movie2 from "../../assets/example_images/movie_db_example_2.png";
import movie3 from "../../assets/example_images/movie_db_example_3.png";
import movie4 from "../../assets/example_images/movie_db_example_4.png";

const featuredProjects = [
  {
    id: 1,
    title: "Modern Notebook Interface",
    description: "A sophisticated rich-text editor built on the TipTap library. Features a highly configurable typewriting interface with real-time controls for typography, color systems, and structural formatting.",
    tech: ["React", "TipTap", "CSS Modules", "Rich Text"],
    link: "#",
    github: "#",
    size: "large",
    images: [] // Placeholder for future screenshots
  },
  {
    id: 2,
    title: "Dota 2 Live Translator",
    description: "A real-time utility for translating in-game chat. Utilizes local OCR for text extraction and integrates with the Google Translate API for automated language recognition and translation.",
    tech: ["Python", "OCR", "Google API", "Real-time"],
    link: "#",
    github: "https://github.com/bamsemats/Dota2Translator",
    size: "medium",
    images: [] // Placeholder
  },
  {
    id: 3,
    title: "Java Movie Database & GUI",
    description: "A Java-based desktop application for movie information searches and local database storage. Features a custom JavaFX GUI designed for efficient local data handling and relational database interaction.",
    tech: ["Java", "JavaFX", "MySQL DB", "OOP", "TMDB API", "Docker"],
    link: "#",
    github: "https://github.com/ithsjava25/project-jpa-project-jpa-grupp-2-d",
    size: "medium",
    images: [movie1, movie2, movie3, movie4]
  },
  {
    id: 4,
    title: "Java HTTP Webserver",
    description: "A custom-built server implementation exploring the fundamentals of the HTTP protocol. Handles concurrent requests via socket programming and serves both static and dynamic content from a local directory.",
    tech: ["Java", "Sockets", "Networking", "Multithreading"],
    link: "https://juv25d.coolify.fungover.org/index.html",
    github: "#https://github.com/ithsjava25/project-webserver-juv25d",
    size: "medium",
    images: [] // Placeholder
  }
];

const labComponents = [
  { id: 'accordian', name: 'Accordian', component: <Accordian /> },
  { id: 'hangman', name: 'Hangman', component: <HangMan /> },
  { id: 'random-color', name: 'Random Color', component: <RandomColor /> },
  { id: 'stars', name: 'Star Rating', component: <Stars /> },
  { id: 'image-slider', name: 'Image Slider', component: <ImageSlider /> },
  { id: 'tree-view', name: 'TreeView', component: <TreeView /> },
  { id: 'tenzies', name: 'Tenzies', component: <Tenzies /> },
  { id: 'load-more', name: 'Load More', component: <LoadMore /> },
];

export default function ProjectsPage() {
  const [activeLab, setActiveLab] = useState(null);

  const activeWidget = labComponents.find(c => c.id === activeLab);

  return (
    <div className="projects-page">
      <div className="projects-intro">
        <h1>Work & <span>Projects</span></h1>
        <p>A collection of my developed applications and academic projects.</p>
      </div>

      <section className="featured-section">
        <h2 className="section-title">Featured Work</h2>
        <div className="projects-bento">
          {featuredProjects.map((project) => (
            <div key={project.id} className={`project-card ${project.size}`}>
              <div className="project-header">
                {project.images && project.images.length > 0 && (
                  <ProjectImageSlider images={project.images} />
                )}
                <div className="tech-stack">
                  {project.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
                </div>
              </div>
              <div className="project-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className="project-footer">
                <div className="project-links">
                  <a href={project.github} className="icon-link" target="_blank" rel="noreferrer"><BsGithub /> Code</a>
                  <a href={project.link} className="icon-link" target="_blank" rel="noreferrer" style={{
                    visibility: (project.link === "#" || !project.link) ? "hidden" : "visible" }}><BsBoxArrowUpRight /> Demo</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="lab-section">
        <h2 className="section-title">Component Lab</h2>
        <p className="section-subtitle">Interactive UI widgets and logic experiments built to master React fundamentals.</p>
        
        <div className="lab-grid">
          {labComponents.map((item) => (
            <div 
              key={item.id} 
              className={`lab-item ${activeLab === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveLab(item.id);
                // Smooth scroll to viewport on mobile
                if (window.innerWidth < 768) {
                  document.getElementById('lab-viewport').scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {item.name}
            </div>
          ))}
        </div>

        <div id="lab-viewport" className="lab-viewport">
          {activeWidget ? (
            <div className="viewport-content">
              <div className="viewport-header">
                <h3>{activeWidget.name} Preview</h3>
                <button className="clear-btn" onClick={() => setActiveLab(null)}>Reset View</button>
              </div>
              <div className="widget-wrapper">
                {activeWidget.component}
              </div>
            </div>
          ) : (
            <div className="viewport-placeholder">
              <p>Select a component from the lab above to interact with it here.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
