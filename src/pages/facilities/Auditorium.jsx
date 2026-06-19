import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Users, Music, Video, ArrowLeft, Volume2, MonitorPlay } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../../components/common/Footer';
import QuickActions from '../../components/common/QuickActions';

export default function Auditorium() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', overflowX: 'hidden' }}
    >
      <QuickActions />

      {/* Hero Section (Uses Image 1) */}
      <section 
        style={{ 
          position: 'relative', 
          padding: '120px 20px 80px', 
          background: 'linear-gradient(to bottom, rgba(15,23,42,0.7), #0f172a), url("/auditorium-1.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <Mic size={48} color="#f59e0b" style={{ marginBottom: '20px' }} />
            <h1 style={{ fontSize: '48px', fontWeight: '900', margin: '0 0 20px 0', background: 'linear-gradient(to right, #ffffff, #fcd34d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              The Grand Auditorium
            </h1>
            <p style={{ fontSize: '20px', color: '#cbd5e1', lineHeight: '1.6' }}>
              A world-class venue hosting prestigious academic conferences, vibrant cultural festivals, and inspiring guest lectures.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats/Features Section */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
          {[
            { icon: <Users size={32} />, title: '1000+ Seating', desc: 'Spacious, acoustically treated hall with comfortable, tiered seating arrangements.' },
            { icon: <Volume2 size={32} />, title: 'Surround Sound', desc: 'Equipped with an advanced Dolby surround audio system for crystal-clear acoustics.' },
            { icon: <MonitorPlay size={32} />, title: '4K Projection', desc: 'Massive motorized screens with ultra-high-definition cinematic projectors.' },
            { icon: <Music size={32} />, title: 'Live Events', desc: 'Perfectly staged for live performances, orchestras, and major college fests.' }
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
              <div style={{ color: '#f59e0b', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#ffffff', fontWeight: '700' }}>{feature.title}</h3>
              <p style={{ color: '#cbd5e1', margin: 0, lineHeight: '1.6' }}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Detailed Info Content */}
      <section style={{ padding: '40px 20px 100px', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* About the Auditorium (Uses Image 2) */}
        <div style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '24px', padding: '50px', marginBottom: '40px', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
          <div style={{ flex: '1 1 500px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '30px', color: '#fbbf24' }}>About Our Auditorium</h2>
            <p style={{ fontSize: '18px', color: '#e2e8f0', lineHeight: '1.8', marginBottom: '20px' }}>
              The Nrupathunga University Grand Auditorium is the cultural and academic heartbeat of the campus. Designed to host large-scale events, it combines majestic architectural design with the latest multimedia and lighting technologies.
            </p>
            <p style={{ fontSize: '18px', color: '#e2e8f0', lineHeight: '1.8', marginBottom: '0' }}>
              Whether it's the annual convocation ceremony, an international research symposium, or the grand finale of our student cultural festival, the auditorium provides a breathtaking atmosphere that elevates every event hosted within its walls.
            </p>
          </div>
          <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
            <img src="/auditorium-2.jpg" alt="Auditorium Interior View" style={{ width: '100%', maxWidth: '400px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(245, 158, 11, 0.3)' }} />
          </div>
        </div>

        {/* Event Showcase (Uses Image 3) */}
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '24px', padding: '50px', display: 'flex', flexWrap: 'wrap-reverse', gap: '40px', alignItems: 'center' }}>
          <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
            <img src="/auditorium-3.jpg" alt="Auditorium Event Showcase" style={{ width: '100%', maxWidth: '400px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
          </div>
          <div style={{ flex: '1 1 500px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
              <Video size={32} color="#fbbf24" />
              <h2 style={{ fontSize: '32px', fontWeight: '800', margin: 0, color: '#fbbf24' }}>Event Showcase</h2>
            </div>
            <p style={{ fontSize: '18px', color: '#cbd5e1', lineHeight: '1.8', marginBottom: '20px' }}>
              Our facilities are equipped with professional-grade broadcasting and recording setups. Dedicated control rooms manage complex live-streams, ensuring that important lectures and ceremonies can reach thousands of viewers online simultaneously.
            </p>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, color: '#cbd5e1', fontSize: '16px', lineHeight: '2' }}>
              <li>• Automated multi-camera PTZ recording setup</li>
              <li>• Dedicated green rooms for guest speakers</li>
              <li>• Fully climate-controlled environment</li>
              <li>• Accessible seating and ramps for wheelchairs</li>
            </ul>
          </div>
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
