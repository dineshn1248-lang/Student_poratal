import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Phone } from 'lucide-react';
import QuickActions from '../../components/common/QuickActions';
import Footer from '../../components/common/Footer';
import chancellorImg from "../../assets/chancellor.jpg";

export default function Chancellor() {
  return (
    <div style={{ backgroundColor: '#ffffff', color: '#333333', minHeight: '100vh', overflowX: 'hidden' }}>
      <QuickActions />

      {/* Header/Breadcrumb */}
      <div style={{ padding: '20px 20px', textAlign: 'center', background: '#ffffff' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', padding: '8px 16px', color: '#64748b', fontSize: '14px', fontWeight: '500', gap: '8px' }}>
          <Link to="/home" style={{color: '#3b82f6', textDecoration: 'none'}}>Home</Link> <ChevronRight size={14}/> <span>About</span> <ChevronRight size={14}/> <span>Chancellor</span>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px 20px 80px', textAlign: 'center' }}
      >
        <h2 style={{ fontSize: '32px', fontWeight: '600', color: '#1e293b', marginBottom: '30px' }}>Chancellor Message</h2>

        <img 
          src={chancellorImg} 
          alt="Dr Thawar Chand Gehlot" 
          style={{ width: '100%', maxWidth: '350px', height: 'auto', display: 'block', margin: '0 auto 30px', objectFit: 'cover' }} 
        />
        
        <h1 style={{ fontSize: '32px', fontWeight: '500', color: '#333333', marginBottom: '20px' }}>Dr Thawar Chand Gehlot</h1>
        
        <div style={{ fontSize: '15px', lineHeight: '1.8', color: '#475569', textAlign: 'justify', maxWidth: '900px', margin: '0 auto 20px' }}>
          <p style={{ marginBottom: '20px' }}>
            <strong>Dr. Thawar Chand Gehlot</strong> is an Indian politician who currently serves as the Minister of Social Justice and Empowerment in the Modi ministry. He is the most noticeable face of BJP for the Scheduled Castes. He represents the constituency of Shajapur in Madhya Pradesh. He was born in Rupeta village on May 18,1948. The village is situated in the Ujjain district of Madhya Pradesh. Gehlot pursued his B.A. Educated at Vikram University, Ujjain, Madhya PradeshUjjain. He got married to Anita Gehlot on 1st May 1965 and the couple has a daughter and three sons. Gehlot started his political journey as a student leader.
          </p>

          <p style={{ marginBottom: '20px' }}>
            He was a member of the Rajya Sabha, upper house of Indian Parliament representing the state of Madhya Pradesh. He was awarded an honorary doctorate by the Dr. B.R. Ambedkar University of Social Sciences.He formerly represented Shajapur in the lower house of Indian Parliament, Lok Sabha from 1996 to 2009.He served as the Union Minister for Socila Justice and Empowerement, in Modi's 2nd cabinet. He is a member of the Bharatiya Janata Party (BJP) and was also the general secretary of the party.
          </p>

          <p style={{ marginBottom: '30px', textAlign: 'center', color: '#64748b' }}>
            Further on July 6, 2021, Thawar Chand Gehlot was appointed as the 19th Governor of Karnataka.
          </p>
        </div>

        <div style={{ fontSize: '14px', color: '#2563eb', display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
          <div>
            <span style={{ fontWeight: '700', color: '#333333' }}>Email:</span> <a href="mailto:governor.rbblr-ka@gov.in" style={{ color: '#2563eb', textDecoration: 'none' }}>governor.rbblr-ka@gov.in</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: '500' }}>
            <Phone size={18} fill="#10b981" /> 91-80-22254102, 22253555
          </div>
        </div>
      </motion.div>
      
      <Footer />
    </div>
  );
}
