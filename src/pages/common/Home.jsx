import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Shield, Users, ArrowRight, BarChart2, GraduationCap, Headphones, Info, Phone, LogIn, Landmark, ExternalLink, Building2, BookOpen, Trophy, Lightbulb } from "lucide-react";
import "../../styles/Home.css";
import karnatakaLogo from "../../assets/karnataka_logo.svg";
import nrupathungaLogo from "../../assets/nrupathunga_logo.png";
import admissionBanner from "../../assets/admission_banner.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page-container">
      {/* HERO SECTION */}
      <section className="home-hero-section">
         <div className="hero-overlay" />
         <div className="hero-content-wrapper">
           
           {/* Top Brand Header inside Hero */}
           <div className="hero-brand-header">
             {/* Left: Karnataka Logo + Nrupathunga Title */}
             <div className="hero-brand-left">
               <img src={karnatakaLogo} alt="Govt of Karnataka" className="hero-karnataka-logo" />
               <div className="hero-brand-text">
                 <span className="hero-brand-title">Nrupathunga University</span>
                 <span className="hero-brand-sub">Department of Higher Education, Government of Karnataka</span>
               </div>
             </div>

             {/* Right: Navigation */}
             <nav className="hero-top-nav">
               <a href="#home" className="active"><span className="nav-icon"><Building2 size={14} /></span> Home</a>
               <a href="#about"><span className="nav-icon"><Info size={14} /></span> About University</a>
               <a href="#departments"><span className="nav-icon"><BookOpen size={14} /></span> Departments</a>
               <a href="#contact"><span className="nav-icon"><Phone size={14} /></span> Contact</a>
               <button onClick={() => navigate('/login-portal')} className="nav-login-btn">
                 <LogIn size={14} /> Login Portal
               </button>
             </nav>
           </div>

           {/* Welcome Panel */}
           <div className="hero-welcome-panel" style={{ marginTop: '40px', marginBottom: '40px' }}>
             <div className="welcome-subtitle-top">
                <span className="star-sparkle">✦</span> Excellence in Education, Innovation in Learning <span className="star-sparkle">✦</span>
             </div>
             <h2 className="welcome-title" style={{ fontSize: '64px' }}>
               Welcome to <br />
               <span className="welcome-title-gradient">Nrupathunga University</span>
             </h2>
             <p className="welcome-subtitle" style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
               Empowering students with world-class education, advanced research facilities, and a commitment to academic excellence.
             </p>
             <div style={{ marginTop: '40px' }}>
                <button onClick={() => navigate('/login-portal')} className="hero-main-cta">
                  Access Academic Portal <ArrowRight size={18} />
                </button>
             </div>
           </div>

           {/* Bottom Badges Grid */}
           <div className="hero-features-footer" style={{ marginTop: 'auto' }}>
             <div className="feature-item">
               <div className="feature-icon blue-feat"><Building2 size={20} /></div>
               <div className="feature-text">
                 <h4>State-of-art Campus</h4>
                 <p>Modern infrastructure and smart classrooms</p>
               </div>
             </div>
             
             <div className="feature-divider" />

             <div className="feature-item">
               <div className="feature-icon purple-feat"><Lightbulb size={20} /></div>
               <div className="feature-text">
                 <h4>Innovation Hub</h4>
                 <p>Fostering research and startup culture</p>
               </div>
             </div>

             <div className="feature-divider" />

             <div className="feature-item">
               <div className="feature-icon gold-feat"><GraduationCap size={20} /></div>
               <div className="feature-text">
                 <h4>Academic Excellence</h4>
                 <p>Expert faculty and comprehensive curriculum</p>
               </div>
             </div>

             <div className="feature-divider" />

             <div className="feature-item">
               <div className="feature-icon green-feat"><Trophy size={20} /></div>
               <div className="feature-text">
                 <h4>Global Recognition</h4>
                 <p>Accredited programs and global ties</p>
               </div>
             </div>
           </div>

         </div>
      </section>

      {/* INFORMATIONAL SECTIONS */}
      <div className="info-sections-container">
        
        {/* About Section */}
        <section id="about" className="info-section about-university">
          <div className="section-header text-center">
            <span className="section-eyebrow">About Us</span>
            <h2>Vision & Mission</h2>
            <div className="title-underline"></div>
          </div>
          <div className="about-grid">
            <div className="about-card vision-card">
              <div className="ac-icon"><Lightbulb size={32} /></div>
              <h3>Our Vision</h3>
              <p>To be a globally recognized center of excellence in higher education, fostering innovation, research, and holistic development to create leaders who contribute to society.</p>
            </div>
            <div className="about-card mission-card">
              <div className="ac-icon"><GraduationCap size={32} /></div>
              <h3>Our Mission</h3>
              <p>To provide high-quality education, promote interdisciplinary research, and nurture ethical values among students, preparing them for global challenges.</p>
            </div>
          </div>
        </section>

        {/* Departments Section */}
        <section id="departments" className="info-section departments-section bg-gray">
          <div className="section-header text-center">
            <span className="section-eyebrow">Academics</span>
            <h2>Our Departments</h2>
            <div className="title-underline"></div>
            <p className="section-desc">Explore our wide range of academic disciplines and specialized programs.</p>
          </div>
          <div className="departments-grid">
            {['Physics', 'Chemistry & Bio-Chemistry', 'Computer Science', 'Mathematics', 'Statistics', 'Biotechnology', 'Botany', 'Zoology', 'Microbiology', 'Languages (English, Kannada, etc.)', 'Education', 'Geology'].map((dept, index) => (
              <div key={index} className="dept-card">
                <div className="dept-img-placeholder">
                  <BookOpen size={40} className="dept-icon-placeholder" />
                </div>
                <div className="dept-info">
                  <h4>Department of {dept}</h4>
                  <a href="#" className="dept-link">View Programs <ArrowRight size={14} /></a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Facilities Section */}
        <section id="facilities" className="info-section facilities-section">
          <div className="section-header text-center">
            <span className="section-eyebrow">Campus Life</span>
            <h2>World-Class Facilities</h2>
            <div className="title-underline"></div>
          </div>
          <div className="facilities-grid">
             <div className="facility-item">
                <div className="fac-icon"><Landmark size={28} /></div>
                <div>
                  <h4>Central Library</h4>
                  <p>Over 100,000 volumes, digital journals, and serene reading spaces.</p>
                </div>
             </div>
             <div className="facility-item">
                <div className="fac-icon"><BarChart2 size={28} /></div>
                <div>
                  <h4>Advanced Laboratories</h4>
                  <p>State-of-the-art equipment for science and computer disciplines.</p>
                </div>
             </div>
             <div className="facility-item">
                <div className="fac-icon"><Users size={28} /></div>
                <div>
                  <h4>Sports Complex</h4>
                  <p>Indoor and outdoor athletic facilities for holistic student development.</p>
                </div>
             </div>
             <div className="facility-item">
                <div className="fac-icon"><Building2 size={28} /></div>
                <div>
                  <h4>Student Hostels</h4>
                  <p>Safe, secure, and comfortable accommodation for outstation students.</p>
                </div>
             </div>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="home-footer" id="contact">
        <div className="footer-top">
          <img src={nrupathungaLogo} alt="Logo" style={{ height: '60px', marginBottom: '20px' }} />
          <p><strong>Nrupathunga University</strong></p>
          <p>Nrupathunga Road, Bengaluru, Karnataka 560001</p>
          <p>Email: contact@nrupathungauniversity.ac.in | Phone: +91 80 2221 2812</p>
        </div>
        <div className="footer-bottom">
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">RTI Act</a>
            <a href="#">Contact Us</a>
          </div>
          <p>&copy; 2026 Nrupathunga University. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;