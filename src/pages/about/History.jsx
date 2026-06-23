import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, Play, MapPin, QrCode, MonitorPlay, Users, Award, Briefcase, Library, Laptop, TestTube, Mic, Trophy, Smartphone, ArrowLeft, Presentation } from 'lucide-react';
import '../../styles/AboutPages.css';

import Footer from '../../components/common/Footer';

import QuickActions from '../../components/common/QuickActions';

// Animated Counter Component
const AnimatedCounter = ({ from, to, duration, suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration: duration,
        onUpdate(value) { setCount(Math.floor(value)); }
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default function History() {
  const navigate = useNavigate();

  const milestones = [
    { year: "2020", title: "The Foundation", text: "Nrupathunga University established on 23 October under RUSA 2.0. Emerging from the rich legacy of Government Science College, marking a new era in Karnataka's education.", image: "/foundation.jpg" },
    { year: "2022", title: "Infrastructure Boom", text: "Modernization of existing infrastructure, upgradation of laboratories, and establishment of advanced research centers.", image: "/infrastructure.jpg" },
    { year: "2024", title: "Academic Expansion", text: "Construction of the massive G+7 Academic Block. Launching industry-oriented apprenticeship programs with global tech giants.", image: "/academic-expansion.jpg" }
  ];

  const facilities = [
    { title: "Central Library", icon: <Library size={40} />, color: "rgba(59, 130, 246, 0.2)", image: "/library.jpg", link: "/facilities/library" },
    { title: "Labs", icon: <TestTube size={40} />, color: "rgba(16, 185, 129, 0.2)", image: "/chemistry-lab.jpg", link: "/facilities/labs" },
    { title: "Classrooms", icon: <Presentation size={40} />, color: "rgba(245, 158, 11, 0.2)", image: "/classroom-1.jpg", link: "/facilities/classrooms" },
    { title: "Sports & Activities", icon: <Trophy size={40} />, color: "rgba(239, 68, 68, 0.2)", image: "/activity-1.jpg", link: "/facilities/sports-activities" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      style={{ backgroundColor: '#0f172a', color: '#f8fafc', overflowX: 'hidden' }}
    >
      <QuickActions />
      {/* 1. Full-Screen Cinematic Hero */}
      <section className="cinematic-hero" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")' }}>
        <div className="cinematic-hero-content">
          <motion.h1 
            className="cinematic-title"
            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}
          >
            Experience<br/>Nrupathunga
          </motion.h1>
          <motion.p 
            className="cinematic-subtitle"
            initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
          >
            A century of legacy transformed into a modern digital university. Explore our campus, our history, and your future.
          </motion.p>
        </div>
        <div className="scroll-indicator">
          <span>Explore</span>
          <ChevronDown size={24} />
        </div>
      </section>

      {/* 2. Animated Achievements & Growth */}
      <section style={{ padding: '100px 20px', background: 'linear-gradient(to bottom, #0f172a, #1e293b)' }}>
        <div className="about-grid" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div className="about-card" style={{ border: 'none', background: 'transparent', boxShadow: 'none' }}>
            <h3 style={{ fontSize: '48px', color: '#60a5fa', margin: '0 0 10px 0', fontWeight: '900' }}>
              <AnimatedCounter from={0} to={100} duration={2.5} suffix="+" />
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '18px', margin: 0 }}>Years of Legacy</p>
          </div>
          <div className="about-card" style={{ border: 'none', background: 'transparent', boxShadow: 'none' }}>
            <h3 style={{ fontSize: '48px', color: '#60a5fa', margin: '0 0 10px 0', fontWeight: '900' }}>
              <AnimatedCounter from={0} to={50} duration={2} suffix="+" />
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '18px', margin: 0 }}>Industry Partners</p>
          </div>
          <div className="about-card" style={{ border: 'none', background: 'transparent', boxShadow: 'none' }}>
            <h3 style={{ fontSize: '48px', color: '#60a5fa', margin: '0 0 10px 0', fontWeight: '900' }}>
              <AnimatedCounter from={0} to={150} duration={2.5} suffix="+" />
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '18px', margin: 0 }}>Expert Faculty</p>
          </div>
        </div>
      </section>

      {/* 3. Image-Rich Interactive Timeline */}
      <section style={{ padding: '100px 20px', background: '#0f172a' }}>
        <h2 style={{ textAlign: 'center', fontSize: '42px', marginBottom: '80px', fontWeight: '800' }}>Journey of Excellence</h2>
        <div className="cinematic-timeline">
          {milestones.map((m, i) => (
            <motion.div 
              key={i} 
              className="timeline-row"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="timeline-image-container">
                {m.image ? (
                  <img src={m.image} alt={m.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div className="timeline-image-placeholder">
                    <div style={{ textAlign: 'center' }}>
                      <MonitorPlay size={48} opacity={0.5} style={{ margin: '0 auto 10px' }} />
                      <p style={{ margin: 0, fontWeight: 600, letterSpacing: '2px' }}>ARCHIVAL IMAGE</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="timeline-dot"></div>
              <div className="timeline-text-content">
                <div style={{ fontSize: '48px', fontWeight: '900', color: 'rgba(59, 130, 246, 0.2)', position: 'absolute', top: '20px', right: '30px' }}>{m.year}</div>
                <h3 style={{ fontSize: '28px', color: '#60a5fa', marginBottom: '16px', position: 'relative', zIndex: 2 }}>{m.title}</h3>
                <p style={{ color: '#cbd5e1', fontSize: '16px', lineHeight: '1.8', margin: 0, position: 'relative', zIndex: 2 }}>{m.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Promotional Video Section */}
      <section style={{ padding: '100px 20px', background: '#1e293b' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '20px' }}>Campus Life in Motion</h2>
          <p style={{ color: '#94a3b8', fontSize: '18px' }}>Experience the vibrant energy, culture, and academic rigor of Nrupathunga University.</p>
        </div>
        <motion.div 
          className="promo-video-container"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onClick={(e) => {
            const video = e.currentTarget.querySelector('video');
            if (video) {
              if (video.paused) {
                video.play();
                e.currentTarget.classList.add('playing');
              } else {
                video.pause();
                e.currentTarget.classList.remove('playing');
              }
            }
          }}
        >
          <video 
            src="/promo-video.mp4" 
            poster="/models/university_building.jpg"
            controls
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </motion.div>
      </section>

      {/* 5. Campus Facilities Showcase */}
      <section style={{ padding: '100px 20px', background: '#0f172a' }}>
        <h2 style={{ textAlign: 'center', fontSize: '42px', marginBottom: '60px', fontWeight: '800' }}>State-of-the-Art Facilities</h2>
        <div className="facilities-grid" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {facilities.map((fac, i) => (
            <motion.div 
              key={i} 
              className="facility-card"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div 
                className="facility-bg" 
                style={fac.image 
                  ? { 
                      backgroundImage: `linear-gradient(to top, rgba(15,23,42,1) 0%, rgba(15,23,42,0) 60%), url(${fac.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }
                  : { background: `linear-gradient(135deg, ${fac.color}, rgba(30,58,138,0.2))` }
                }
              >
                {!fac.image && (
                  <div style={{ color: '#93c5fd', opacity: 0.8, transform: 'scale(1.5)' }}>
                    {fac.icon}
                  </div>
                )}
              </div>
              <div 
                className="facility-info"
                style={{ cursor: fac.link ? 'pointer' : 'default', zIndex: 10 }}
                onClick={() => fac.link && navigate(fac.link)}
              >
                <h3 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px', textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
                  {fac.title} {fac.link && <ChevronRight size={20} color="#60a5fa" />}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. Experience Nrupathunga (QR Codes & Map) */}
      <section style={{ padding: '100px 20px', background: 'linear-gradient(to top, #1e293b, #0f172a)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '42px', marginBottom: '20px', fontWeight: '800', color: '#ffffff' }}>Visit Us Today</h2>
          <p style={{ textAlign: 'center', color: '#e2e8f0', fontSize: '18px', marginBottom: '60px' }}>Scan the codes below to explore digitally or navigate to our physical campus.</p>
          
          <div className="qr-section">
            <motion.div 
              className="qr-card"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="qr-placeholder">
                <QrCode size={80} color="#0f172a" />
              </div>
              <div>
                <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#f8fafc' }}>Virtual Campus Tour</h3>
                <p style={{ color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>Scan this code with your smartphone to launch an immersive AR experience of our campus from anywhere.</p>
              </div>
            </motion.div>
            
            <motion.a 
              href="https://maps.app.goo.gl/mcPMjBytqdMeka3a8"
              target="_blank"
              rel="noopener noreferrer"
              className="qr-card"
              style={{ textDecoration: 'none', display: 'flex', cursor: 'pointer' }}
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="qr-placeholder">
                <MapPin size={60} color="#3b82f6" />
              </div>
              <div>
                <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#f8fafc' }}>Google Maps Navigation</h3>
                <p style={{ color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>Click or scan for instant GPS navigation directly to the main gates of Nrupathunga University, Bengaluru.</p>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* 7. Massive 3D Portal CTA */}
      <section style={{ padding: '100px 20px', background: '#0f172a' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.div 
            className="portal-cta-section"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <Smartphone size={64} color="#60a5fa" style={{ margin: '0 auto 24px', position: 'relative', zIndex: 2 }} />
            <h2 style={{ fontSize: '48px', fontWeight: '900', color: '#ffffff', marginBottom: '20px', position: 'relative', zIndex: 2 }}>Step Into The Future</h2>
            <p style={{ fontSize: '20px', color: '#cbd5e1', maxWidth: '600px', margin: '0 auto 40px', lineHeight: '1.6', position: 'relative', zIndex: 2 }}>
              Don't just read about our campus—walk through it. Launch our interactive 3D portal experience and control your avatar to explore the university grounds.
            </p>
            <button 
              className="btn-launch-3d"
              onClick={() => navigate('/')}
            >
              Launch Virtual Campus <ChevronRight size={24} />
            </button>
          </motion.div>
        </div>
      </section>
      
      <div style={{ padding: '0 0 60px', textAlign: 'center', background: '#0f172a' }}>
        <Link to="/home" className="return-home-btn" style={{ background: 'transparent', border: 'none', color: '#94a3b8' }}>
          <ArrowLeft size={16} /> Back to Homepage
        </Link>
      </div>

      <Footer />
    </motion.div>
  );
}
