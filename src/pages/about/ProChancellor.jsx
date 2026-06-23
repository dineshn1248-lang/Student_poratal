import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Phone } from 'lucide-react';
import QuickActions from '../../components/common/QuickActions';
import Footer from '../../components/common/Footer';
import proChancellorImg from "../../assets/pro_chancellor.png";

export default function ProChancellor() {
  return (
    <div style={{ backgroundColor: '#ffffff', color: '#333333', minHeight: '100vh', overflowX: 'hidden' }}>
      <QuickActions />

      {/* Header/Breadcrumb */}
      <div style={{ padding: '20px 20px', textAlign: 'center', background: '#ffffff' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', padding: '8px 16px', color: '#64748b', fontSize: '14px', fontWeight: '500', gap: '8px' }}>
          <Link to="/home" style={{color: '#3b82f6', textDecoration: 'none'}}>Home</Link> <ChevronRight size={14}/> <span>About</span> <ChevronRight size={14}/> <span>Pro Chancellor</span>
        </div>
      </div>
      
      {/* Top Bar matching image */}
      <div style={{ background: '#f1f5f9', padding: '20px', textAlign: 'center' }}>
        <h2 style={{ margin: 0, color: '#475569', fontSize: '24px', fontWeight: '500' }}>Pro Chancellor</h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: '900px', margin: '0 auto', padding: '50px 20px 80px', textAlign: 'center' }}
      >
        <img 
          src={proChancellorImg} 
          alt="Dr. M C Sudhakar" 
          style={{ width: '100%', maxWidth: '350px', height: 'auto', display: 'block', margin: '0 auto 20px', borderRadius: '8px' }} 
        />
        
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '15px' }}>Dr. M C Sudhakar</h1>
        
        <p style={{ fontSize: '15px', color: '#475569', fontWeight: '700', marginBottom: '20px' }}>
          Department Of Higher Education, Government of karnataka
        </p>

        <div style={{ fontSize: '14px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
          <div>
            <span style={{ fontWeight: '700' }}>Email:</span> karnatakadcm.hredn@gmail.com
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: '600' }}>
            <Phone size={18} fill="#10b981" /> 080 - 22034647/22258965
          </div>
        </div>
      </motion.div>
      
      <Footer />
    </div>
  );
}
