import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import "./pages.css";
import { BsEnvelope, BsLinkedin, BsGithub, BsGeoAlt, BsSend, BsCheckCircle, BsExclamationCircle } from "react-icons/bs";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus('sending');

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    // Check if keys exist
    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS keys are missing. Please check your .env file.");
      setTimeout(() => {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }, 1000);
      return;
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Mats',
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      }, (err) => {
        console.error('FAILED...', err);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      });
  };

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
            <a href="https://www.google.se/maps/place/K%C3%A4vlinge/" target="_blank" className="contact-item location">
              <div className="contact-item-icon"><BsGeoAlt /></div>
              <div className="contact-item-text">
                <span className="label">Location</span>
                <span className="value">Kävlinge, Sweden</span>
              </div>
            </a>
          </div>
        </div>

        <div className="contact-form-panel">
          <h2 className="section-title">Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-field">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>
            <div className="form-field">
              <textarea 
                name="message"
                placeholder="Tell me about your project..." 
                rows="6" 
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className={`contact-submit-btn ${status}`}
              disabled={status === 'sending'}
            >
              {status === 'idle' && (
                <>
                  Send Message <BsSend />
                </>
              )}
              {status === 'sending' && (
                <>
                  Sending... <span className="spinner"></span>
                </>
              )}
              {status === 'success' && (
                <>
                  Sent Successfully! <BsCheckCircle />
                </>
              )}
              {status === 'error' && (
                <>
                  Failed to Send <BsExclamationCircle />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
