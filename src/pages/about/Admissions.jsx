import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, FileText, Calendar, CheckCircle } from 'lucide-react';
import '../../styles/AboutPages.css';
import Footer from '../../components/common/Footer';

export default function Admissions() {
  const steps = [
    { num: 1, title: "Registration", desc: "Create an account on the university portal." },
    { num: 2, title: "Application Form", desc: "Fill out the detailed application form and upload required documents." },
    { num: 3, title: "Entrance Exam / Merit List", desc: "Appear for the entrance exam (if applicable) or wait for the merit list announcement." },
    { num: 4, title: "Counseling & Verification", desc: "Attend the counseling session for document verification." },
    { num: 5, title: "Fee Payment & Enrollment", desc: "Pay the admission fees to secure your seat." }
  ];

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
          <span style={{ color: '#fff' }}>Admissions</span>
        </div>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Admissions Process
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Your journey to academic excellence begins here. Follow these simple steps.
        </motion.p>
      </section>

      <section className="about-content-section">
        <h2 className="section-title">Step-by-Step Guide</h2>
        <div className="steps-container">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="step-item"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="step-number">{step.num}</div>
              <div>
                <h3 style={{ margin: '0 0 8px 0', color: '#f8fafc' }}>{step.title}</h3>
                <p style={{ margin: 0, color: '#94a3b8' }}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/home" className="return-home-btn">
            Return to Homepage
          </Link>
        </div>
      </section>
      <Footer />
    </motion.div>
  );
}
