import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import Footer from '../../components/common/Footer';
import QuickActions from '../../components/common/QuickActions';

export default function Leadership() {
  const leaders = [
    {
      name: "Sri. Thaawarchand Gehlot",
      title: "Chancellor",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&h=400&q=80"
    },
    {
      name: "Dr. M C Sudhakar",
      title: "Pro Chancellor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80"
    },
    {
      name: "Dr. Mohan Kumar B K",
      title: "Vice Chancellor",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400&q=80"
    }
  ];

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', overflowX: 'hidden' }}>
      <QuickActions />

      {/* Hero Section */}
      <section style={{ 
        padding: '120px 20px 80px', 
        background: 'linear-gradient(to bottom, rgba(15,23,42,0.8), #0f172a), url("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover', backgroundPosition: 'center', textAlign: 'center', position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(6px)' }}></div>
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', padding: '8px 16px', background: 'rgba(59, 130, 246, 0.2)', color: '#93c5fd', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '20px', gap: '8px' }}>
            <Link to="/home" style={{color: '#93c5fd', textDecoration: 'none'}}>Home</Link> <ChevronRight size={14}/> <span>About</span> <ChevronRight size={14}/> <span>Heads of the Department</span>
          </div>
          <h1 style={{ fontSize: '56px', fontWeight: '900', marginBottom: '20px', background: 'linear-gradient(to right, #ffffff, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Heads of the Department
          </h1>
          <p style={{ fontSize: '20px', color: '#cbd5e1', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </motion.div>
      </section>

      {/* Content Section */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 80px' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '40px', marginBottom: '60px' }}
        >
          <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: '1.8', margin: 0 }}>
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {leaders.map((leader, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{ 
                background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.9))', 
                borderRadius: '24px', 
                border: '1px solid rgba(59, 130, 246, 0.2)', 
                overflow: 'hidden',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
              }}
            >
              <div style={{ height: '300px', overflow: 'hidden' }}>
                <img 
                  src={leader.image} 
                  alt={leader.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.1) brightness(0.9)' }} 
                />
              </div>
              <div style={{ padding: '30px 20px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '24px', color: '#f8fafc', fontWeight: '800' }}>{leader.name}</h3>
                <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', borderRadius: '12px', fontWeight: '600', fontSize: '14px' }}>
                  {leader.title}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </section>

      <Footer />
    </div>
  );
}
