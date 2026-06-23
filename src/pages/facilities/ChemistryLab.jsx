import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft, Database, TestTube, Microscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../../components/common/Footer';
import QuickActions from '../../components/common/QuickActions';

export default function ChemistryLab() {
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
          background: 'linear-gradient(to bottom, rgba(15,23,42,0.7), #0f172a), url("/chemistry-lab.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <TestTube size={48} color="#f472b6" style={{ marginBottom: '20px' }} />
            <h1 style={{ fontSize: '48px', fontWeight: '900', margin: '0 0 20px 0', background: 'linear-gradient(to right, #ffffff, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Advanced Chemistry Labs
            </h1>
            <p style={{ fontSize: '20px', color: '#cbd5e1', lineHeight: '1.6' }}>
              Providing students with hands-on experience in chemical analysis, organic synthesis, and biochemical research.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats/Features Section */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
          {[
            { icon: <Microscope size={32} />, title: 'Modern Equipment', desc: 'Equipped with the newest microscopes and analytical tools.' },
            { icon: <Shield size={32} />, title: 'Maximum Safety', desc: 'Advanced fume hoods and emergency stations ensure a safe lab environment.' },
            { icon: <TestTube size={32} />, title: 'Extensive Reagents', desc: 'A wide range of organic and inorganic chemical repositories.' },
            { icon: <Database size={32} />, title: 'Digital Analysis', desc: 'Integrated spectrophotometers and digital titration systems.' }
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
              <div style={{ color: '#f472b6', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#ffffff', fontWeight: '700' }}>{feature.title}</h3>
              <p style={{ color: '#cbd5e1', margin: 0, lineHeight: '1.6' }}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Detailed Info Content */}
      <section style={{ padding: '40px 20px 100px', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Chemistry Lab */}
        <div style={{ background: 'rgba(244, 114, 182, 0.05)', border: '1px solid rgba(244, 114, 182, 0.2)', borderRadius: '24px', padding: '50px', marginBottom: '40px', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center', flexDirection: 'row-reverse' }}>
          <div style={{ flex: '1 1 500px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '30px', color: '#f472b6' }}>Chemistry & Sciences Lab</h2>
            <p style={{ fontSize: '18px', color: '#e2e8f0', lineHeight: '1.8', marginBottom: '20px' }}>
              Our newly upgraded Chemistry Laboratory provides students with hands-on experience in chemical analysis, organic synthesis, and biochemical research. Equipped with modern fume hoods and precise analytical instruments, it ensures a safe and highly productive environment.
            </p>
            <p style={{ fontSize: '18px', color: '#e2e8f0', lineHeight: '1.8', marginBottom: '0' }}>
              Under the guidance of expert faculty, students engage in practical experiments that bridge the gap between theoretical knowledge and real-world scientific application.
            </p>
          </div>
          <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
            <img src="/chemistry-lab.jpg" alt="Chemistry Lab" style={{ width: '100%', maxWidth: '400px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(244, 114, 182, 0.3)' }} />
          </div>
        </div>

        {/* Chemistry Lab Facilities */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '24px', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
              <Shield size={32} color="#f472b6" />
              <h2 style={{ fontSize: '28px', fontWeight: '800', margin: 0, color: '#f472b6' }}>Safety & Equipment</h2>
            </div>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, color: '#cbd5e1', fontSize: '16px', lineHeight: '2' }}>
              <li>• Advanced fume hoods and ventilation systems</li>
              <li>• Eyewash stations and emergency showers</li>
              <li>• Precision balances and centrifuges</li>
              <li>• Proper hazardous waste disposal systems</li>
            </ul>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '24px', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
              <Database size={32} color="#34d399" />
              <h2 style={{ fontSize: '28px', fontWeight: '800', margin: 0, color: '#34d399' }}>Chemical Analysis</h2>
            </div>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, color: '#cbd5e1', fontSize: '16px', lineHeight: '2' }}>
              <li>• Spectrophotometers and Chromatography tools</li>
              <li>• Organic and Inorganic reagent repositories</li>
              <li>• Micro-scale synthesis kits</li>
              <li>• Digital titration and pH analysis modules</li>
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
