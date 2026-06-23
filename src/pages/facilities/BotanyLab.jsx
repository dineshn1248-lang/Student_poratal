import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft, Leaf, Microscope, Trees } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../../components/common/Footer';
import QuickActions from '../../components/common/QuickActions';

export default function BotanyLab() {
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
          background: 'linear-gradient(to bottom, rgba(15,23,42,0.7), #0f172a), url("/botany-lab.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <Leaf size={48} color="#22c55e" style={{ marginBottom: '20px' }} />
            <h1 style={{ fontSize: '48px', fontWeight: '900', margin: '0 0 20px 0', background: 'linear-gradient(to right, #ffffff, #22c55e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Advanced Botany Labs
            </h1>
            <p style={{ fontSize: '20px', color: '#cbd5e1', lineHeight: '1.6' }}>
              Exploring plant sciences through comprehensive specimen collections, high-resolution microscopy, and botanical research.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats/Features Section */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
          {[
            { icon: <Microscope size={32} />, title: 'High-Res Microscopy', desc: 'Equipped with the newest electron microscopes for cellular plant analysis.' },
            { icon: <Trees size={32} />, title: 'Specimen Collection', desc: 'Over 5,000 cataloged plant specimens from diverse ecosystems.' },
            { icon: <Leaf size={32} />, title: 'Live Growth Chambers', desc: 'Controlled environments to study plant development under varying conditions.' },
            { icon: <Shield size={32} />, title: 'Bio-Safety protocols', desc: 'Strict protocols ensuring a safe handling of transgenic plant materials.' }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ 
                background: 'rgba(255,255,255,0.03)', 
                padding: '30px', 
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.05)',
                textAlign: 'center'
              }}
            >
              <div style={{ color: '#22c55e', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#ffffff', fontWeight: '700' }}>{feature.title}</h3>
              <p style={{ color: '#cbd5e1', margin: 0, lineHeight: '1.6' }}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Detailed Info Content */}
      <section style={{ padding: '40px 20px 100px', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Botany Lab */}
        <div style={{ background: 'rgba(34, 197, 94, 0.05)', border: '1px solid rgba(34, 197, 94, 0.2)', borderRadius: '24px', padding: '50px', marginBottom: '40px', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center', flexDirection: 'row-reverse' }}>
          <div style={{ flex: '1 1 500px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '30px', color: '#22c55e' }}>Botany & Plant Sciences Lab</h2>
            <p style={{ fontSize: '18px', color: '#e2e8f0', lineHeight: '1.8', marginBottom: '20px' }}>
              Our dedicated Botany Laboratory is an epicenter for students passionate about the plant kingdom. The lab is furnished with state-of-the-art optical and electron microscopes, offering an unparalleled look into cellular structures and taxonomy.
            </p>
            <p style={{ fontSize: '18px', color: '#e2e8f0', lineHeight: '1.8', marginBottom: '0' }}>
              Students gain hands-on experience in plant anatomy, ecology, and genetics, supported by our extensive on-campus botanical garden and climate-controlled growth chambers.
            </p>
          </div>
          <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
            <img src="/botany-lab.jpg" alt="Botany Lab" style={{ width: '100%', maxWidth: '400px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(34, 197, 94, 0.3)' }} />
          </div>
        </div>

        {/* Botany Lab Facilities */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '24px', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
              <Trees size={32} color="#4ade80" />
              <h2 style={{ fontSize: '28px', fontWeight: '800', margin: 0, color: '#4ade80' }}>Research & Ecology</h2>
            </div>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, color: '#cbd5e1', fontSize: '16px', lineHeight: '2' }}>
              <li>• Extensive digital herbarium databases</li>
              <li>• Field research preparation kits</li>
              <li>• Environmental simulation chambers</li>
              <li>• Soil analysis and hydroponics stations</li>
            </ul>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '24px', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
              <Microscope size={32} color="#22c55e" />
              <h2 style={{ fontSize: '28px', fontWeight: '800', margin: 0, color: '#22c55e' }}>Cellular Analysis</h2>
            </div>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, color: '#cbd5e1', fontSize: '16px', lineHeight: '2' }}>
              <li>• High-resolution optical and electron microscopy</li>
              <li>• Plant tissue culture workstations</li>
              <li>• DNA extraction and genetics equipment</li>
              <li>• Phytochemical analysis modules</li>
            </ul>
          </div>

        </div>

      </section>

      <div style={{ padding: '0 0 60px', textAlign: 'center' }}>
        <Link to="/facilities/labs" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', color: '#94a3b8', textDecoration: 'none', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', transition: 'all 0.2s' }}>
          <ArrowLeft size={16} /> Back to Labs
        </Link>
      </div>

      <Footer />
    </motion.div>
  );
}
