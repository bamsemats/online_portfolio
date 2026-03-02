import "./pages.css";
import "./media-queries.css";
import { Link } from "react-router-dom";
import { BsArrowRight, BsGithub, BsLinkedin, BsPerson, BsCodeSquare, BsChatDots } from "react-icons/bs";
import profilePic from "../../profile_picture.jpg";
import Faux3DCarousel from "./Faux3DCarousel";
import ActivityChart from "./ActivityChart";

// Project Preview Images
import movieImg from "../../assets/example_images/movie_db_example_1.png";
import serverImg from "../../assets/example_images/http_server_example_1.png";
import editorImg from "../../assets/example_images/text_editor_example_1.png";
import pathfinderImg from "../../assets/example_images/pathfinder_example_3.png";
import cvArchitectImg from "../../assets/example_images/cv_builder_example_3.png";

const SplitText = ({ text = "" }) => (
  <>
  {text && text.split("").map((char, i) => (
    <span key={i} className={`split-${text.toLowerCase()}-${i}`}>{char}</span>
  ))}
  </>
)

export default function HomePage() {
  const previewImages = [movieImg, serverImg, editorImg, pathfinderImg, cvArchitectImg];

  return (
    <div className="home-page">
      {/* Test Marker to ensure HomePage renders */}
      <span style={{ display: 'none' }}>Home Ready</span>
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-image-container mobile-only">
            <div className="profile-image-wrapper">
              <img src={profilePic} alt="Mats Rönnqvist" className="profile-image" />
            </div>
          </div>
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="crafting-span">Crafting Digital</span> <br />
              <span className="experience-span"><SplitText text="Experiences"/></span>
            </h1>
            <p className="hero-subtitle">
              I'm Mats Rönnqvist, a developer focused on building functional, 
              beautiful, and user-centric applications. Welcome to my professional portfolio.
            </p>
            <div className="hero-cta">
              <div className="cta-left-column">
                <Link to="/apps" className="primary-btn">
                  View My Work <BsArrowRight />
                </Link>
                <div className="social-links">
                  <a href="https://github.com/bamsemats" target="_blank" rel="noreferrer"><BsGithub /></a>
                  <a href="https://www.linkedin.com/in/mats-r%C3%B6nnqvist-3504b2381/" target="_blank" rel="noreferrer"><BsLinkedin /></a>
                </div>
              </div>
              
              <div className="hero-activity-group">
                <ActivityChart />
              </div>
            </div>
          </div>
          <div className="hero-image-container desktop-only">
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
            <Faux3DCarousel images={previewImages} />
            <p>A showcase of my most developed applications, including my Text Editor app and school projects.</p>
          </div>
          <div className="bento-badge">Portfolio</div>
        </Link>

        <Link to="/about" className="bento-item about-me">
          <div className="bento-content">
            <BsPerson className="bento-icon" />
            <h3>About Me</h3>
            <p>Learn more about my background, skills, and my journey as a developer.</p>
          </div>
        </Link>

        <Link to="/apps" className="bento-item component-lab">
          <div className="bento-content">
            <BsCodeSquare className="bento-icon" />
            <h3>Component Lab</h3>
            <p>Mini-apps and UI widgets built to practice coding fundamentals.</p>
          </div>
        </Link>

        <Link to="/contact" className="bento-item contact-card">
          <div className="bento-content">
            <BsChatDots className="bento-icon" />
            <h3>Let's Connect</h3>
            <p>Available for internships and junior roles. Get in touch!</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
