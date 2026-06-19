import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Shield, Users, ArrowRight, BarChart2, GraduationCap, Headphones, Info, Phone, LogIn, Landmark, ExternalLink, Building2, BookOpen, Trophy, Lightbulb, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AboutMegaMenu from "../../components/common/AboutMegaMenu";
import "../../styles/Home.css";
import karnatakaLogo from "../../assets/karnataka_logo.svg";
import nrupathungaLogo from "../../assets/nrupathunga_logo.png";
import admissionBanner from "../../assets/admission_banner.png";
import chancellorImg from "../../assets/chancellor.jpg";
import proChancellorImg from "../../assets/pro_chancellor.png";
import viceChancellorImg from "../../assets/vice_chancellor.png";

function Home() {
  const navigate = useNavigate();
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="home-page-container"
    >
      {/* HERO SECTION */}
      <section className="home-hero-section">
         <div className="hero-overlay" />
         <div className="hero-content-wrapper">
           
           {/* Top Brand Header inside Hero */}
           <motion.div 
             initial={{ y: -50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="hero-brand-header"
           >
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
               
               <div 
                 className="nav-item-wrapper"
                 onMouseEnter={() => setShowMegaMenu(true)}
                 onMouseLeave={() => setShowMegaMenu(false)}
               >
                 <a href="#about" onClick={(e) => { e.preventDefault(); setShowMegaMenu(!showMegaMenu); }}>
                   <span className="nav-icon"><Info size={14} /></span> About University
                 </a>
                 <AnimatePresence>
                   {showMegaMenu && <AboutMegaMenu onClose={() => setShowMegaMenu(false)} />}
                 </AnimatePresence>
               </div>

               <a href="#departments"><span className="nav-icon"><BookOpen size={14} /></span> Departments</a>
               <a href="#contact"><span className="nav-icon"><Phone size={14} /></span> Contact</a>
               <button onClick={() => navigate('/login-portal')} className="nav-login-btn">
                 <LogIn size={14} /> Login Portal
               </button>
             </nav>
           </motion.div>

           {/* Welcome Panel */}
           <div className="hero-welcome-panel" style={{ marginTop: '40px', marginBottom: '40px' }}>
             <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ duration: 0.6, delay: 0.4 }}
               className="welcome-subtitle-top"
             >
                <span className="star-sparkle">✦</span> Excellence in Education, Innovation in Learning <span className="star-sparkle">✦</span>
             </motion.div>
             <motion.h2 
               initial={{ y: 50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
               className="welcome-title" style={{ fontSize: '64px' }}
             >
               Welcome to <br />
               <span className="welcome-title-gradient">Nrupathunga University</span>
             </motion.h2>
             <motion.p 
               initial={{ y: 30, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
               className="welcome-subtitle" style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}
             >
               Empowering students with world-class education, advanced research facilities, and a commitment to academic excellence.
             </motion.p>
             <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.6, delay: 1.0 }}
               style={{ marginTop: '40px' }}
             >
                <button onClick={() => navigate('/login-portal')} className="hero-main-cta">
                  Access Academic Portal <ArrowRight size={18} />
                </button>
             </motion.div>
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
        
        {/* Heads of the Department Section */}
        <section id="heads-of-department" className="info-section about-university">
          <div className="section-header text-center">
            <span className="section-eyebrow">Leadership</span>
            <h2>Heads of the Department</h2>
            <div className="title-underline"></div>
            <p className="section-desc" style={{ maxWidth: '900px', margin: '0 auto 40px auto', fontSize: '15px', lineHeight: '1.7', textAlign: 'justify' }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', textAlign: 'center', border: '1px solid #e2e8f0' }}>
              <img src={chancellorImg} alt="Sri. Thaawarchand Gehlot" style={{ width: '100%', height: '320px', objectFit: 'cover', filter: 'contrast(1.05) brightness(0.95)' }} />
              <div style={{ padding: '24px 20px' }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: '20px', fontWeight: '800' }}>Sri. Thaawarchand Gehlot</h3>
                <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(59, 130, 246, 0.1)', color: '#2563eb', borderRadius: '8px', fontWeight: '600', fontSize: '13px' }}>
                  Chancellor
                </div>
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', textAlign: 'center', border: '1px solid #e2e8f0' }}>
              <img src={proChancellorImg} alt="Dr. M C Sudhakar" style={{ width: '100%', height: '320px', objectFit: 'cover', filter: 'contrast(1.05) brightness(0.95)' }} />
              <div style={{ padding: '24px 20px' }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: '20px', fontWeight: '800' }}>Dr. M C Sudhakar</h3>
                <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(59, 130, 246, 0.1)', color: '#2563eb', borderRadius: '8px', fontWeight: '600', fontSize: '13px' }}>
                  Pro Chancellor
                </div>
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', textAlign: 'center', border: '1px solid #e2e8f0' }}>
              <img src={viceChancellorImg} alt="Dr Mohan Kumar B K" style={{ width: '100%', height: '320px', objectFit: 'cover', filter: 'contrast(1.05) brightness(0.95)' }} />
              <div style={{ padding: '24px 20px' }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: '20px', fontWeight: '800' }}>Dr Mohan Kumar B K</h3>
                <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(59, 130, 246, 0.1)', color: '#2563eb', borderRadius: '8px', fontWeight: '600', fontSize: '13px' }}>
                  Vice Chancellor
                </div>
              </div>
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
    </motion.div>
  );
}

export default Home;