import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Youtube, ExternalLink, Download, Map } from 'lucide-react';
import '../../styles/Footer.css';
import nrupathungaLogo from '../../assets/nrupathunga_logo.png';
import karnatakaLogo from '../../assets/karnataka_logo.svg';

export default function Footer() {
  return (
    <footer className="university-footer">
      <div className="footer-content-wrapper">
        
        {/* 1. Branding Section */}
        <div className="footer-brand">
          <div className="footer-logo-container">
            <img src={nrupathungaLogo} alt="Nrupathunga University Logo" />
            <img src={karnatakaLogo} alt="Govt of Karnataka" />
          </div>
          <div>
            <h3 className="footer-university-name">Nrupathunga University</h3>
            <p className="footer-department">Department of Higher Education, Govt of Karnataka</p>
          </div>
          <p className="footer-description">
            Empowering students with world-class education, advanced research facilities, and a commitment to academic excellence since 2020.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-btn"><Facebook size={20} /></a>
            <a href="#" className="social-btn"><Instagram size={20} /></a>
            <a href="#" className="social-btn"><Linkedin size={20} /></a>
            <a href="#" className="social-btn"><Youtube size={20} /></a>
          </div>
        </div>

        {/* 2. Main Navigation */}
        <div className="footer-section">
          <h4>Main Navigation</h4>
          <ul className="footer-links">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about/overview">About University</Link></li>
            <li><Link to="/about/academics">Academics</Link></li>
            <li><Link to="/about/admissions">Admissions</Link></li>
            <li><Link to="/about/events">Events</Link></li>
            <li><Link to="/about/placements">Placements</Link></li>
            <li><Link to="/contact-us">Contact Us</Link></li>
          </ul>
        </div>

        {/* 3. Admissions Quick Links */}
        <div className="footer-section">
          <h4>Admissions</h4>
          <ul className="footer-links">
            <li><Link to="/admissions-info">Admission Process</Link></li>
            <li><Link to="#">Eligibility Criteria</Link></li>
            <li><Link to="#">Fee Structure</Link></li>
            <li><Link to="#">Scholarships</Link></li>
            <li><Link to="#">Important Dates</Link></li>
            <li><Link to="#">Download Prospectus</Link></li>
          </ul>
        </div>

        {/* 4. Student Services */}
        <div className="footer-section">
          <h4>Helpful Links</h4>
          <ul className="footer-links">
            <li><Link to="#">Library</Link></li>
            <li><Link to="#">Examination Portal</Link></li>
            <li><Link to="/login-portal">Student Login</Link></li>
            <li><Link to="#">Academic Calendar</Link></li>
            <li><Link to="#">Training & Placement Cell</Link></li>
            <li><Link to="#">Grievance Cell</Link></li>
          </ul>
        </div>

        {/* 5. Contact Information & Actions */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <div className="footer-contact-info">
            <div className="contact-item">
              <MapPin className="contact-icon" size={20} />
              <div className="contact-details">
                <a href="https://maps.app.goo.gl/mcPMjBytqdMeka3a8" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <p>Nrupathunga University,<br/>Ambedkar Veedhi,<br/>Bengaluru, Karnataka 560001</p>
                </a>
              </div>
            </div>
            <div className="contact-item">
              <Phone className="contact-icon" size={20} />
              <div className="contact-details">
                <p>+91 80 2221 2924</p>
              </div>
            </div>
            <div className="contact-item">
              <Mail className="contact-icon" size={20} />
              <div className="contact-details">
                <a href="mailto:info@nrupathungauniversity.ac.in">info@nrupathungauniversity.ac.in</a>
              </div>
            </div>
          </div>
          
          <div className="footer-actions">
            <a href="https://maps.app.goo.gl/mcPMjBytqdMeka3a8" target="_blank" rel="noopener noreferrer" className="footer-action-btn btn-primary">
              <Map size={18} /> Get Directions
            </a>
            <Link to="/admissions-info" className="footer-action-btn btn-secondary">
              <ExternalLink size={18} /> Contact Admissions
            </Link>
          </div>
        </div>

      </div>

      {/* 7. Bottom Bar */}
      <div className="footer-bottom">
        <p className="copyright">© {new Date().getFullYear()} Nrupathunga University. All rights reserved.</p>
        <div className="legal-links">
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Terms & Conditions</Link>
          <Link to="#">Accessibility</Link>
        </div>
      </div>
    </footer>
  );
}
