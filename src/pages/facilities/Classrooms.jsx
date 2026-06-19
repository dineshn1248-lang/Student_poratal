import React from 'react';
import { motion } from 'framer-motion';
import { MonitorPlay, Users, Presentation, Wifi, ArrowLeft, Lightbulb, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../../components/common/Footer';
import QuickActions from '../../components/common/QuickActions';

export default function Classrooms() {
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
          background: 'linear-gradient(to bottom, rgba(15,23,42,0.7), #0f172a), url("/classroom-1.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <Presentation size={48} color="#f59e0b" style={{ marginBottom: '20px' }} />
            <h1 style={{ fontSize: '48px', fontWeight: '900', margin: '0 0 20px 0', background: 'linear-gradient(to right, #ffffff, #fcd34d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Spacious Classrooms
            </h1>
            <p style={{ fontSize: '20px', color: '#cbd5e1', lineHeight: '1.6' }}>
              Decent, well-maintained learning spaces equipped with digital projectors, essential board facilities, and comfortable bench seating.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats/Features Section */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
          {[
            { icon: <MonitorPlay size={32} />, title: 'Digital Projectors', desc: 'Ceiling-mounted projectors available in every room for multimedia presentations.' },
            { icon: <Presentation size={32} />, title: 'Dual Boards', desc: 'Equipped with both traditional blackboards and modern whiteboards.' },
            { icon: <Users size={32} />, title: 'Bench Seating', desc: 'Sturdy, comfortable wooden benches accommodating large student batches.' },
            { icon: <Lightbulb size={32} />, title: 'Well Ventilated', desc: 'Spacious rooms with large windows providing excellent natural light and airflow.' }
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
        
        {/* About the Classrooms (Uses Image 2) */}
        <div style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '24px', padding: '50px', marginBottom: '40px', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
          <div style={{ flex: '1 1 500px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '30px', color: '#fbbf24' }}>Traditional & Digital Pedagogy</h2>
            <p style={{ fontSize: '18px', color: '#e2e8f0', lineHeight: '1.8', marginBottom: '20px' }}>
              Nrupathunga University's classrooms provide a balanced environment that respects traditional teaching methods while integrating necessary digital tools. The rooms are designed to be practical and distraction-free.
            </p>
            <p style={{ fontSize: '18px', color: '#e2e8f0', lineHeight: '1.8', marginBottom: '0' }}>
              With ample blackboard and whiteboard space, faculty have the freedom to explain complex concepts step-by-step. Whenever a multimedia presentation is needed, the built-in projectors are ready to display slides and videos clearly to the entire class.
            </p>
          </div>
          <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
            <img src="/classroom-2.jpg" alt="Classroom Interior" style={{ width: '100%', maxWidth: '400px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(245, 158, 11, 0.3)' }} />
          </div>
        </div>

        {/* Digital Pedagogy (Uses Image 3) */}
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '24px', padding: '50px', display: 'flex', flexWrap: 'wrap-reverse', gap: '40px', alignItems: 'center' }}>
          <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
            <img src="/classroom-3.jpg" alt="Students in Classroom" style={{ width: '100%', maxWidth: '400px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
          </div>
          <div style={{ flex: '1 1 500px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
              <BookOpen size={32} color="#fbbf24" />
              <h2 style={{ fontSize: '32px', fontWeight: '800', margin: 0, color: '#fbbf24' }}>Effective Learning Environment</h2>
            </div>
            <p style={{ fontSize: '18px', color: '#cbd5e1', lineHeight: '1.8', marginBottom: '20px' }}>
              The classrooms are laid out to maximize student-teacher interaction. The focus remains on core academic engagement rather than overwhelming technology, ensuring students remain attentive.
            </p>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, color: '#cbd5e1', fontSize: '16px', lineHeight: '2' }}>
              <li>• Raised teaching platforms for clear visibility</li>
              <li>• Orderly bench rows promoting discipline</li>
              <li>• Acoustic design that carries the speaker's voice</li>
              <li>• Spacious aisles for easy movement</li>
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
