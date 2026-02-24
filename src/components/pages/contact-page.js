import React from 'react';
import "./pages.css";
import { BsEnvelope, BsLinkedin, BsGithub, BsGeoAlt } from "react-icons/bs";

export default function ContactPage() {
  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Let's <span>Connect</span></h1>
          <p className="lead-text">
            I'm currently looking for new opportunities and collaborations. 
            Whether you have a question or just want to say hi, I'll try my best 
            to get back to you!
          </p>
        </div>
      </section>

      <div className="contact-bento-grid">
        <div className="contact-info-panel">
          <h2 className="section-title">Reach Out</h2>
          <div className="contact-methods-bento">
            <a href="mailto:mats.f.ronnqvist@gmail.com" className="contact-item email">
              <div className="contact-item-icon"><BsEnvelope /></div>
              <div className="contact-item-text">
                <span className="label">Email</span>
                <span className="value">mats.f.ronnqvist@gmail.com</span>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/mats-r%C3%B6nnqvist-3504b2381/" target="_blank" rel="noreferrer" className="contact-item linkedin">
              <div className="contact-item-icon"><BsLinkedin /></div>
              <div className="contact-item-text">
                <span className="label">LinkedIn</span>
                <span className="value">mats-rönnqvist</span>
              </div>
            </a>
            <a href="https://github.com/bamsemats" target="_blank" rel="noreferrer" className="contact-item github">
              <div className="contact-item-icon"><BsGithub /></div>
              <div className="contact-item-text">
                <span className="label">GitHub</span>
                <span className="value">bamsemats</span>
              </div>
            </a>
            <div className="contact-item location">
              <div className="contact-item-icon"><BsGeoAlt /></div>
              <div className="contact-item-text">
                <span className="label">Location</span>
                <span className="value">Kävlinge, Sweden</span>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-panel">
          <h2 className="section-title">Message</h2>
          <div className="contact-form">
            <div className="form-row">
              <div className="form-field">
                <input type="text" placeholder="Name" disabled />
              </div>
              <div className="form-field">
                <input type="email" placeholder="Email" disabled />
              </div>
            </div>
            <div className="form-field">
              <textarea placeholder="Tell me about your project..." rows="6" disabled></textarea>
            </div>
            <button className="contact-submit-btn" disabled>
              Send Message
              <span className="btn-status">Coming Soon</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
