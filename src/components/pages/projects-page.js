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

// Text Editor Images
import textEditor1 from "../../assets/example_images/text_editor_example_1.png";
import textEditor2 from "../../assets/example_images/text_editor_example_2.png";
import textEditor3 from "../../assets/example_images/text_editor_example_3.png";

// HTTP Server Images
import httpServerExample1 from "../../assets/example_images/http_server_example_1.png";
import httpServerExample2 from "../../assets/example_images/http_server_example_2.png";
import httpServerExample3 from "../../assets/example_images/http_server_example_3.png";

// Translator Images
import translatorExample1 from "../../assets/example_images/translator_example_1.png";
import translatorExample2 from "../../assets/example_images/translator_example_2.png";
import translatorExample3 from "../../assets/example_images/translator_example_3.png";
import translatorExample4 from "../../assets/example_images/translator_example_4.png";

// Pathfinder Images
import pathfinderExample1 from "../../assets/example_images/pathfinder_example_1.png";
import pathfinderExample2 from "../../assets/example_images/pathfinder_example_2.png";
import pathfinderExample3 from "../../assets/example_images/pathfinder_example_3.png";
import pathfinderExample4 from "../../assets/example_images/pathfinder_example_4.png";

// CV Builder Images
import cvBuilderExample1 from "../../assets/example_images/cv_builder_example_1.png";
import cvBuilderExample2 from "../../assets/example_images/cv_builder_example_2.png";
import cvBuilderExample3 from "../../assets/example_images/cv_builder_example_3.png";
import cvBuilderExample4 from "../../assets/example_images/cv_builder_example_4.png";

const featuredProjects = [
  {
    id: 1,
    title: "Java Movie Database & GUI",
    description: "A Java-based desktop application for movie information searches and local database storage. Features a custom JavaFX GUI designed for efficient local data handling and relational database interaction. Built as a collaborative school project, it allows the user to search The Movie Database through their API to populate a local database. Movie can then be browsed, added to favorites, and their IMDB page can be visited from a link in the app. Similar app available for demo on the web (see 'Demo').",
    tech: ["Java", "JavaFX", "MySQL DB", "OOP", "TMDB API", "Docker"],
    link: "https://bamsemats.github.io/movie_db/",
    github: "https://github.com/ithsjava25/project-jpa-project-jpa-grupp-2-d",
    size: "large",
    images: [movie1, movie2, movie3, movie4]
  },
  {
    id: 2,
    title: "Dota 2 Live Translator",
    description: "A real-time utility for translating in-game chat. Utilizes local OCR for text extraction and integrates with the Google Translate API for automated language recognition and translation.",
    tech: ["Python", "OCR", "Google API", "Real-time", "Work in progress"],
    link: "#",
    github: "https://github.com/bamsemats/Dota2Translator",
    size: "medium",
    images: [translatorExample1, translatorExample2, translatorExample3, translatorExample4]
  },
  {
    id: 3,
    title: "Modern Text Editor Interface",
    description: "A sophisticated rich-text editor built on the Tiptap library. Features a highly configurable typewriting interface with real-time controls for typography, color systems, and structural formatting. Can be adjusted for the need of the application.",
    tech: ["React", "Tiptap", "CSS Modules", "Rich Text"],
    link: "https://bamsemats.github.io/logbook/",
    github: "https://github.com/bamsemats/logbook",
    size: "medium",
    images: [textEditor1, textEditor2, textEditor3]
  },
  {
    id: 4,
    title: "Java HTTP Webserver",
    description: "A custom-built server implementation exploring the fundamentals of the HTTP protocol. Handles concurrent requests via socket programming and serves both static and dynamic content from a local directory.",
    tech: ["Java", "Sockets", "Networking", "Multithreading"],
    link: "https://juv25d.coolify.fungover.org/index.html",
    github: "https://github.com/ithsjava25/project-webserver-juv25d",
    size: "large",
    images: [httpServerExample1, httpServerExample2, httpServerExample3] 
  },
  {
    id: 5,
    title: "Pathfinder Visualizer",
    description: "A custom-built server implementation exploring the fundamentals of the HTTP protocol. Handles concurrent requests via socket programming and serves both static and dynamic content from a local directory.",
    tech: ["React", "Vite", "Framer Motion", "Lucide"],
    link: "https://bamsemats.github.io/pathfinding-visualizer/",
    github: "https://github.com/bamsemats/pathfinding-visualizer",
    size: "large",
    images: [pathfinderExample1, pathfinderExample2, pathfinderExample3, pathfinderExample4] 
  },
    {
    id: 6,
    title: "Online CV Architect",
    description: "CV Architect is a high-performance React application designed to transform raw career data into polished, print-ready PDF resumes  in real-time. A standout technical achievement is the  custom-built heuristic parsing engine, which allows users to instantly import and structure data from plain text and .docx files.",
    tech: ["React", "Vite", "Mammoth", "Framer Motion", "Lucide"],
    link: "https://bamsemats.github.io/cv-builder/",
    github: "https://github.com/bamsemats/cv-builder",
    size: "medium",
    images: [cvBuilderExample1, cvBuilderExample2, cvBuilderExample3, cvBuilderExample4] 
  }
];

const labComponents = [
  { id: 'accordian', name: 'Accordian', component: <Accordian />, desc: "Smooth animated collapsible sections." },
  { id: 'hangman', name: 'Hangman', component: <HangMan />, desc: "Word guessing game with API integration." },
  { id: 'random-color', name: 'Random Color', component: <RandomColor />, desc: "Procedural HEX/RGB generator." },
  { id: 'stars', name: 'Star Rating', component: <Stars />, desc: "Interactive feedback system." },
  { id: 'image-slider', name: 'Image Slider', component: <ImageSlider />, desc: "Dynamic content carousel." },
  { id: 'tree-view', name: 'TreeView', component: <TreeView />, desc: "Recursive file explorer UI." },
  { id: 'tenzies', name: 'Tenzies', component: <Tenzies />, desc: "Fast-paced dice matching game." },
  { id: 'load-more', name: 'Load More', component: <LoadMore />, desc: "Asynchronous data pagination." },
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
                  {project.tech.map(t => <span key={t} className={`tech-badge ${t === "Work in progress" ? "wip-badge" : ""}`}>{t}</span>)}
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
        <p className="section-subtitle">A sandbox of modular UI components and logic experiments. Each widget is built from scratch to explore React's state, effects, and animation patterns.</p>
        
        <div className="lab-grid">
          {labComponents.map((item) => (
            <div 
              key={item.id} 
              className={`lab-item ${activeLab === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveLab(item.id);
                if (window.innerWidth < 768) {
                  document.getElementById('lab-viewport').scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <div className="lab-item-header">
                <span className="lab-name">{item.name}</span>
              </div>
              <p className="lab-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        <div id="lab-viewport" className="lab-viewport">
          {activeWidget ? (
            <div className="viewport-content">
              <div className="viewport-header">
                <div className="viewport-info">
                  <span className="live-indicator"></span>
                  <h3>{activeWidget.name} Workbench</h3>
                </div>
                <button className="clear-btn" onClick={() => setActiveLab(null)}>Close Workbench</button>
              </div>
              <div className="widget-wrapper">
                {activeWidget.component}
              </div>
            </div>
          ) : (
            <div className="viewport-placeholder">
              <div className="placeholder-icon"><BsBoxArrowUpRight /></div>
              <p>Select a module from the lab to initialize the workbench.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
