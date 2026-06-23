import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Laptop, TestTube, Leaf } from 'lucide-react';
import Footer from '../../components/common/Footer';
import QuickActions from '../../components/common/QuickActions';

export default function LabsHub() {
  const navigate = useNavigate();

  const labOptions = [
    { 
      title: "Computer Labs", 
      icon: <Laptop size={36} />, 
      color: "rgba(16, 185, 129, 0.2)", 
      image: "/computer-lab.jpg", 
      link: "/facilities/computer-labs",
      desc: "State-of-the-art workstations, high-speed networking, and enterprise cloud infrastructure for computer science."
    },
    { 
      title: "Chemistry Lab", 
      icon: <TestTube size={36} />, 
      color: "rgba(168, 85, 247, 0.2)", 
      image: "/chemistry-lab.jpg", 
      link: "/facilities/chemistry-lab",
      desc: "Advanced chemical analysis tools, organic synthesis stations, and strict safety equipment."
    },
    { 
      title: "Botany Lab", 
      icon: <Leaf size={36} />, 
      color: "rgba(34, 197, 94, 0.2)", 
      image: "/botany-lab.jpg", 
      link: "/facilities/botany-lab",
      desc: "Comprehensive plant specimen collection, high-resolution microscopy, and dedicated botanical research areas."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', overflowX: 'hidden' }}
    >
      <QuickActions />

      {/* Hero Section */}
      <section 
        style={{ 
          position: 'relative', 
          padding: '120px 20px 80px', 
          background: 'linear-gradient(to bottom, rgba(15,23,42,0.8), #0f172a)',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <h1 style={{ fontSize: '48px', fontWeight: '900', margin: '0 0 20px 0', background: 'linear-gradient(to right, #ffffff, #93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              University Laboratories
            </h1>
            <p style={{ fontSize: '20px', color: '#cbd5e1', lineHeight: '1.6' }}>
              Explore our specialized, high-tech environments designed for intensive research and practical learning.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lab Selection Cards */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {labOptions.map((lab, i) => (
            <motion.div 
              key={i}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(lab.link)}
              style={{ 
                background: `linear-gradient(to bottom, rgba(255,255,255,0.03), rgba(255,255,255,0.01))`,
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '24px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s, boxShadow 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = `0 20px 40px ${lab.color}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ 
                height: '180px', 
                backgroundImage: `url(${lab.image})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f172a, transparent)' }} />
              </div>
              <div style={{ padding: '25px 25px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: '800', margin: 0, color: '#ffffff' }}>{lab.title}</h2>
                  <div style={{ color: '#93c5fd' }}>{lab.icon}</div>
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.6', marginBottom: '25px' }}>
                  {lab.desc}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#60a5fa', fontWeight: '600', fontSize: '15px' }}>
                  Explore Facility <ChevronRight size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div style={{ padding: '0 0 60px', textAlign: 'center' }}>
        <Link to="/about/history" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', color: '#94a3b8', textDecoration: 'none', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', transition: 'all 0.2s' }}>
          <ArrowLeft size={16} /> Back to History
        </Link>
      </div>

      <Footer />
    </motion.div>
  );
}
