import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Target, Eye, Globe } from 'lucide-react';
import '../../styles/AboutPages.css';
import Footer from '../../components/common/Footer';

export default function Overview() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="about-page-container"
    >
      <section className="about-hero">
        <div className="about-breadcrumbs">
          <Link to="/home"><ArrowLeft size={16} /> Home</Link>
          <ChevronRight size={14} />
          <span>About</span>
          <ChevronRight size={14} />
          <span style={{ color: '#fff' }}>Overview</span>
        </div>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          University Overview
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          A center of excellence in higher education, fostering innovation and global leadership.
        </motion.p>
      </section>

      <section className="about-content-section">
        <h2 className="section-title">Who We Are</h2>
        <div className="about-grid">

          <div className="about-card">
            <div className="card-icon"><Globe size={32} /></div>
            <h3>Global Reach</h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.6, marginTop: '10px' }}>
              With strategic tie-ups and global accreditations, we ensure our students are equipped to compete on the international stage.
            </p>
          </div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <Link to="/home" className="return-home-btn">
            Return to Homepage
          </Link>
        </div>
      </section>
      <Footer />
    </motion.div>
  );
}
