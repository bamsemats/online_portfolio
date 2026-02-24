import "./pages.css";
import "./media-queries.css";
import { Link } from "react-router-dom";
import { BsArrowRight, BsGithub, BsLinkedin } from "react-icons/bs";
import profilePic from "../../profile_picture.jpg";

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-content">
            <h1 className="hero-title">
              Crafting Digital <br />
              <span>Experiences</span>
            </h1>
            <p className="hero-subtitle">
              I'm Mats Rönnqvist, a developer focused on building functional, 
              beautiful, and user-centric applications. Welcome to my professional portfolio.
            </p>
            <div className="hero-cta">
              <Link to="/apps" className="primary-btn">
                View My Work <BsArrowRight />
              </Link>
              <div className="social-links">
                <a href="https://github.com/bamsemats" target="_blank" rel="noreferrer"><BsGithub /></a>
                <a href="https://www.linkedin.com/in/mats-r%C3%B6nnqvist-3504b2381/" target="_blank" rel="noreferrer"><BsLinkedin /></a>
              </div>
            </div>
          </div>
          <div className="hero-image-container">
            <div className="profile-image-wrapper">
              <img src={profilePic} alt="Mats Rönnqvist" className="profile-image" />
            </div>
          </div>
        </div>
      </section>

      <div className="bento-grid">
        <Link to="/apps" className="bento-item featured-projects">
          <div className="bento-content">
            <h3>Featured Projects</h3>
            <p>A showcase of my most developed applications, including my Notebook app and school projects.</p>
          </div>
          <div className="bento-badge">Portfolio</div>
        </Link>

        <Link to="/about" className="bento-item about-me">
          <div className="bento-content">
            <h3>About Me</h3>
            <p>Learn more about my background, skills, and my journey as a developer.</p>
          </div>
        </Link>

        <Link to="/apps" className="bento-item component-lab">
          <div className="bento-content">
            <h3>Component Lab</h3>
            <p>Mini-apps and UI widgets built to master React fundamentals.</p>
          </div>
        </Link>

        <Link to="/contact" className="bento-item contact-card">
          <div className="bento-content">
            <h3>Let's Connect</h3>
            <p>Available for internships and junior roles. Get in touch!</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
