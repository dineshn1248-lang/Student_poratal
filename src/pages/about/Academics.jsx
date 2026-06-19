import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, ArrowLeft, BookOpen, Microscope, Laptop, 
  GraduationCap, Briefcase, Award, CheckCircle2, ChevronRightCircle
} from 'lucide-react';
import Footer from '../../components/common/Footer';
import QuickActions from '../../components/common/QuickActions';

export default function Academics() {
  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', overflowX: 'hidden' }}>
      <QuickActions />

      {/* Hero Section */}
      <section style={{ 
        padding: '120px 20px 80px', 
        background: 'linear-gradient(to bottom, rgba(15,23,42,0.8), #0f172a), url("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover', backgroundPosition: 'center', textAlign: 'center', position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(4px)' }}></div>
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', padding: '8px 16px', background: 'rgba(59, 130, 246, 0.2)', color: '#93c5fd', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '20px', gap: '8px' }}>
            <Link to="/home" style={{color: '#93c5fd', textDecoration: 'none'}}>Home</Link> <ChevronRight size={14}/> <span>About</span> <ChevronRight size={14}/> <span>Academics</span>
          </div>
          <h1 style={{ fontSize: '56px', fontWeight: '900', marginBottom: '20px', background: 'linear-gradient(to right, #ffffff, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Programmes Offered
          </h1>
          <p style={{ fontSize: '22px', color: '#cbd5e1', lineHeight: '1.6' }}>
            Comprehensive, industry-aligned curriculum designed to foster critical thinking, specialized expertise, and immediate employability.
          </p>
        </motion.div>
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px 80px' }}>
        
        {/* Apprenticeship & Embedded Programs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '30px', marginBottom: '40px' }}>
          
          {/* 1. Apprenticeship Embedded BSc */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
            style={{ background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.9))', borderRadius: '24px', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '40px', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px' }}><Laptop size={32} color="#60a5fa" /></div>
              <h2 style={{ fontSize: '24px', color: 'white', margin: 0, lineHeight: 1.3 }}>Apprenticeship Embedded Programmes</h2>
            </div>
            <p style={{ color: '#93c5fd', fontWeight: '600', marginBottom: '10px' }}>(Earn while you Learn) with Stipend in Final Semester</p>
            <p style={{ color: '#cbd5e1', fontSize: '14px', marginBottom: '25px' }}>Under NISHE Karnataka Project</p>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px 0' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px', color: '#f8fafc' }}><ChevronRightCircle size={18} color="#34d399" style={{ marginTop: '2px', flexShrink: 0 }}/> BSc in Digital Electronics</li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px', color: '#f8fafc' }}><ChevronRightCircle size={18} color="#34d399" style={{ marginTop: '2px', flexShrink: 0 }}/> BSc Full Stack Web Development</li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px', color: '#f8fafc' }}><ChevronRightCircle size={18} color="#34d399" style={{ marginTop: '2px', flexShrink: 0 }}/> BSc Full Stack Data Science</li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px', color: '#f8fafc' }}><ChevronRightCircle size={18} color="#34d399" style={{ marginTop: '2px', flexShrink: 0 }}/> BCA AI/ML</li>
            </ul>

            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <h4 style={{ color: '#f87171', fontSize: '16px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} /> Eligibility</h4>
              <p style={{ color: '#cbd5e1', margin: 0, fontSize: '15px' }}>50% in 10+2 / Equivalent Examination in Science</p>
            </div>
          </motion.div>

          {/* 2. Apprenticeship Based BBA */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.9))', borderRadius: '24px', border: '1px solid rgba(168, 85, 247, 0.3)', padding: '40px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <div style={{ padding: '12px', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '12px' }}><Briefcase size={32} color="#c084fc" /></div>
              <h2 style={{ fontSize: '24px', color: 'white', margin: 0, lineHeight: 1.3 }}>Apprenticeship Based BBA Programme</h2>
            </div>
            <p style={{ color: '#c084fc', fontWeight: '600', marginBottom: '30px', fontSize: '18px' }}>in Aviation Services and Air Cargo with Stipend in Final Year</p>
            
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.2)', marginTop: 'auto' }}>
              <h4 style={{ color: '#f87171', fontSize: '16px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} /> Eligibility</h4>
              <p style={{ color: '#cbd5e1', margin: 0, fontSize: '15px' }}>50% in 10+2 / Equivalent Examination in Arts/Commerce/Science</p>
            </div>
          </motion.div>

        </div>

        {/* 3. Integrated Teacher Education */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
          style={{ background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.9))', borderRadius: '24px', border: '1px solid rgba(251, 191, 36, 0.3)', padding: '40px', marginBottom: '40px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <div style={{ padding: '12px', background: 'rgba(251, 191, 36, 0.1)', borderRadius: '12px' }}><BookOpen size={32} color="#fbbf24" /></div>
            <h2 style={{ fontSize: '24px', color: 'white', margin: 0, lineHeight: 1.3 }}>4 Year Integrated Teacher Education Programme</h2>
          </div>
          <p style={{ color: '#fbbf24', fontWeight: '700', marginBottom: '20px', fontSize: '20px' }}>B.Sc-B.Ed (ITEP)</p>
          <p style={{ color: '#f8fafc', fontSize: '18px', marginBottom: '30px' }}>Major/Minor – Maths / Physics / Chemistry / Botany</p>
          
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <h4 style={{ color: '#f87171', fontSize: '16px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} /> Eligibility</h4>
            <p style={{ color: '#cbd5e1', margin: 0, fontSize: '15px' }}>50% in 10+2 / Equivalent Examination in Science and Pass in ITEP Exam conducted by National Council for Teacher Education.</p>
          </div>
        </motion.div>

        {/* Core Bachelor Programs Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
          
          {/* 4. Bachelor of Science */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
            style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '40px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
              <div style={{ padding: '12px', background: 'rgba(52, 211, 153, 0.1)', borderRadius: '12px' }}><Microscope size={32} color="#34d399" /></div>
              <h2 style={{ fontSize: '24px', color: '#34d399', margin: 0 }}>Bachelor of Science (BSc)</h2>
            </div>
            
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.8', marginBottom: '30px' }}>
              Chemistry/Mathematics, Chemistry/Physics, Chemistry/Botany, Chemistry/Zoology, Chemistry/Biotechnology, Botany/Biotechnology, Chemistry/Microbiology, Chemistry/Genetics, Biochemistry/Genetics, Biochemistry/Microbiology, Biochemistry/Botany, Biochemistry/Zoology, Physics/Mathematics, Physics/Electronics, Physics/Computer Science, Mathematics/Electronics, Mathematics/Computer Science, Mathematics/Statistics, Mathematics/Geology, Computer Science/Electronics, Computer Science/Statistics, Computer Science/Geology, Zoology/Microbiology, Botany/Microbiology, Botany/Zoology, Physics/Statistics.
            </p>
            
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <h4 style={{ color: '#f87171', fontSize: '16px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} /> Eligibility</h4>
              <p style={{ color: '#cbd5e1', margin: 0, fontSize: '14px', lineHeight: '1.5' }}>Pass in 10+2 / Equivalent Examination in Science (Biology Stream for Life Sciences and Mathematics Stream for Physical Sciences).</p>
            </div>
          </motion.div>

          {/* 5. Bachelor of Computer Application */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '40px', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
              <div style={{ padding: '12px', background: 'rgba(244, 114, 182, 0.1)', borderRadius: '12px' }}><Laptop size={32} color="#f472b6" /></div>
              <h2 style={{ fontSize: '24px', color: '#f472b6', margin: 0 }}>Bachelor of Computer Application (BCA)</h2>
            </div>
            
            <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: '1.6', marginBottom: '30px', flex: 1 }}>
              Dive deep into computer applications, software engineering, and modern web development to build the next generation of digital solutions.
            </p>
            
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <h4 style={{ color: '#f87171', fontSize: '16px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} /> Eligibility</h4>
              <p style={{ color: '#cbd5e1', margin: 0, fontSize: '14px', lineHeight: '1.5' }}>Above 60% in 10+2 / Equivalent Examination in Science (Mathematics Stream).</p>
            </div>
          </motion.div>

        </div>

      </div>
      <Footer />
    </div>
  );
}
