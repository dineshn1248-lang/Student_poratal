import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Target, Flag, Heart, ArrowLeft, Users, Shield, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../../components/common/Footer';
import QuickActions from '../../components/common/QuickActions';

export default function SportsActivities() {
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
          background: 'linear-gradient(to bottom, rgba(15,23,42,0.7), #0f172a), url("/activity-1.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <Trophy size={48} color="#ef4444" style={{ marginBottom: '20px' }} />
            <h1 style={{ fontSize: '48px', fontWeight: '900', margin: '0 0 20px 0', background: 'linear-gradient(to right, #ffffff, #fca5a5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Sports & Co-curricular Activities
            </h1>
            <p style={{ fontSize: '20px', color: '#cbd5e1', lineHeight: '1.6' }}>
              Fostering physical fitness, discipline, social service, and leadership through a wide array of dynamic student organizations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats/Features Section */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
          {[
            { icon: <Medal size={32} />, title: 'Sports Facilities', desc: 'Courts and grounds for various indoor and outdoor games.' },
            { icon: <Shield size={32} />, title: 'NCC & Scouts', desc: 'Instilling discipline, patriotism, and leadership qualities.' },
            { icon: <Users size={32} />, title: 'NSS', desc: 'Encouraging community service and social responsibility.' },
            { icon: <Heart size={32} />, title: 'Red Cross', desc: 'Promoting health awareness and humanitarian values.' },
            { icon: <Briefcase size={32} />, title: 'C2C', desc: 'Campus to Corporate initiatives for professional growth.' }
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
              <div style={{ color: '#ef4444', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#ffffff', fontWeight: '700' }}>{feature.title}</h3>
              <p style={{ color: '#cbd5e1', margin: 0, lineHeight: '1.6' }}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Detailed Info Content */}
      <section style={{ padding: '40px 20px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Grid for Activities */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '40px' }}>
          
          {/* NCC (Uses Image 2) */}
          <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '24px', padding: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
              <img src="/activity-2.jpg" alt="NCC Cadets" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.3)' }} />
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '20px', color: '#f87171', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Shield size={28} /> National Cadet Corps (NCC)
            </h2>
            <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: '1.8' }}>
              The NCC unit is highly active, providing basic military training in small arms and parades. It aims to develop character, comradeship, secular outlook, the spirit of adventure, and ideals of selfless service amongst the youth.
            </p>
          </div>

          {/* NSS (Uses Image 3) */}
          <div style={{ background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '24px', padding: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
              <img src="/activity-3.jpg" alt="NSS Volunteers" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '16px', border: '1px solid rgba(59, 130, 246, 0.3)' }} />
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '20px', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Users size={28} /> National Service Scheme (NSS)
            </h2>
            <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: '1.8' }}>
              The NSS encourages students to actively participate in community service. Volunteers organize blood donation camps, environmental awareness drives, village adoption programs, and health check-ups.
            </p>
          </div>

          {/* Bharat Scouts & Guides (Uses Image 4) */}
          <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '24px', padding: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
              <img src="/activity-4.jpg" alt="Bharat Scouts and Guides" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.3)' }} />
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '20px', color: '#34d399', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Target size={28} /> Bharat Scouts & Guides
            </h2>
            <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: '1.8' }}>
              Scouting and Guiding is an educational movement focusing on character development and physical fitness. Activities include trekking, camping, disaster management training, and national integration camps.
            </p>
          </div>

          {/* Red Cross (Uses Image 5) */}
          <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '24px', padding: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
              <img src="/activity-5.jpg" alt="Youth Red Cross" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.3)' }} />
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '20px', color: '#f87171', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Heart size={28} /> Youth Red Cross
            </h2>
            <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: '1.8' }}>
              The Youth Red Cross instills humanitarian values, promoting health, hygiene, and emergency response training. Volunteers actively participate in health camps and awareness programs.
            </p>
          </div>

          {/* C2C (Uses Image 6) */}
          <div style={{ background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '24px', padding: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
              <img src="/activity-6.jpg" alt="Campus to Corporate" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '16px', border: '1px solid rgba(139, 92, 246, 0.3)' }} />
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '20px', color: '#a78bfa', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Briefcase size={28} /> Campus to Corporate (C2C)
            </h2>
            <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: '1.8' }}>
              C2C initiatives focus on holistic personality development, bridging the gap between academic life and professional careers through workshops, seminars, and corporate networking.
            </p>
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
