import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, Cpu, Server, Shield, ArrowLeft, Code, Database, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../../components/common/Footer';
import QuickActions from '../../components/common/QuickActions';

export default function ComputerLabs() {
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
          background: 'linear-gradient(to bottom, rgba(15,23,42,0.7), #0f172a), url("/computer-lab.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <Laptop size={48} color="#10b981" style={{ marginBottom: '20px' }} />
            <h1 style={{ fontSize: '48px', fontWeight: '900', margin: '0 0 20px 0', background: 'linear-gradient(to right, #ffffff, #6ee7b7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Advanced Computer Labs
            </h1>
            <p style={{ fontSize: '20px', color: '#cbd5e1', lineHeight: '1.6' }}>
              Empowering the next generation of technologists with cutting-edge hardware, specialized software, and high-speed infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats/Features Section */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
          {[
            { icon: <Monitor size={32} />, title: '500+ Workstations', desc: 'High-performance desktop computers distributed across multiple specialized labs.' },
            { icon: <Cpu size={32} />, title: 'Latest Hardware', desc: 'Equipped with the newest multi-core processors and dedicated graphics.' },
            { icon: <Server size={32} />, title: 'Cloud Infrastructure', desc: 'Access to enterprise-grade cloud platforms for complex computing tasks.' },
            { icon: <Shield size={32} />, title: 'Secure Network', desc: 'Protected by advanced firewalls ensuring a safe browsing and coding environment.' }
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
              <div style={{ color: '#10b981', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#ffffff', fontWeight: '700' }}>{feature.title}</h3>
              <p style={{ color: '#cbd5e1', margin: 0, lineHeight: '1.6' }}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Detailed Info Content */}
      <section style={{ padding: '40px 20px 100px', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* About the Labs */}
        <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '24px', padding: '50px', marginBottom: '40px', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
          <div style={{ flex: '1 1 500px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '30px', color: '#34d399' }}>About Our Labs</h2>
            <p style={{ fontSize: '18px', color: '#e2e8f0', lineHeight: '1.8', marginBottom: '20px' }}>
              Nrupathunga University boasts state-of-the-art computer laboratories designed to meet the rigorous demands of modern technical education. Our labs serve as the primary hub for programming, software development, data analysis, and technical research.
            </p>
            <p style={{ fontSize: '18px', color: '#e2e8f0', lineHeight: '1.8', marginBottom: '0' }}>
              Each workstation is meticulously maintained and regularly upgraded to ensure students have access to industry-standard tools. The laboratories are fully air-conditioned and ergonomically designed to provide a comfortable environment for long coding sessions and complex project work.
            </p>
          </div>
          <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
            <img src="/computer-lab.jpg" alt="Computer Lab Interior" style={{ width: '100%', maxWidth: '400px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(16, 185, 129, 0.3)' }} />
          </div>
        </div>

        {/* Lab Facilities & Software */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', marginBottom: '80px' }}>
          
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '24px', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
              <Code size={32} color="#60a5fa" />
              <h2 style={{ fontSize: '28px', fontWeight: '800', margin: 0, color: '#60a5fa' }}>Development Tools</h2>
            </div>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, color: '#cbd5e1', fontSize: '16px', lineHeight: '2' }}>
              <li>• Visual Studio Code, IntelliJ IDEA, Eclipse</li>
              <li>• Python, Java, C++, JavaScript environments</li>
              <li>• Android Studio & iOS SDK for mobile dev</li>
              <li>• Git and version control integrations</li>
            </ul>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '24px', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
              <Database size={32} color="#a78bfa" />
              <h2 style={{ fontSize: '28px', fontWeight: '800', margin: 0, color: '#a78bfa' }}>Data & Research</h2>
            </div>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, color: '#cbd5e1', fontSize: '16px', lineHeight: '2' }}>
              <li>• MySQL, PostgreSQL, MongoDB databases</li>
              <li>• MATLAB & R for statistical computing</li>
              <li>• TensorFlow & PyTorch for Machine Learning</li>
              <li>• High-speed campus network (1Gbps backbone)</li>
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
