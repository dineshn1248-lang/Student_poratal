import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import QuickActions from '../../components/common/QuickActions';
import Footer from '../../components/common/Footer';
import viceChancellorImg from "../../assets/vice_chancellor.png";

export default function ViceChancellor() {
  return (
    <div style={{ backgroundColor: '#ffffff', color: '#333333', minHeight: '100vh', overflowX: 'hidden' }}>
      <QuickActions />

      {/* Header/Breadcrumb */}
      <div style={{ padding: '40px 20px 20px', textAlign: 'center', background: '#ffffff' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', padding: '8px 16px', color: '#64748b', fontSize: '14px', fontWeight: '500', gap: '8px' }}>
          <Link to="/home" style={{color: '#3b82f6', textDecoration: 'none'}}>Home</Link> <ChevronRight size={14}/> <span>About</span> <ChevronRight size={14}/> <span>Vice Chancellor</span>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: '900px', margin: '0 auto', padding: '20px 20px 80px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <img 
            src={viceChancellorImg} 
            alt="Dr Mohan Kumar B K" 
            style={{ width: '100%', maxWidth: '350px', height: 'auto', display: 'block', margin: '0 auto 30px' }} 
          />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
            <div style={{ padding: '12px 30px', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '18px', fontWeight: '600', color: '#1e293b', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'inline-block' }}>
              Dr Mohan Kumar B K
            </div>
            
            <div style={{ padding: '12px 30px', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '14px', color: '#64748b', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'inline-block' }}>
              Hon'ble Vice-Chancellor and Director, School of Languages
            </div>
            
            <div style={{ padding: '10px 25px', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '13px', color: '#94a3b8', background: '#f8fafc', display: 'inline-block' }}>
              Nrupathunga University, Bengaluru
            </div>
          </div>
        </div>

        <div style={{ fontSize: '15px', lineHeight: '1.8', color: '#475569', maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ marginBottom: '20px' }}>From the VC's Desk..</p>
          <p style={{ marginBottom: '20px' }}>Dear Students, Faculty and Staff</p>
          
          <p style={{ marginBottom: '20px', textAlign: 'justify' }}>
            It is both a privilege and a deep honour to step into the role of Vice-Chancellor of this institution. As I begin this journey with you, I carry one firm belief — that a university must shape not just careers, but the people who pursue them.
          </p>

          <p style={{ marginBottom: '20px', textAlign: 'justify' }}>
            My commitment is to the full growth of every student — intellectual, personal and social. We shall work together to build an academic environment that is dynamic, alive and encouraging: where questions matter as much as answers and where the pursuit of knowledge is never reduced to the chasing of grades.
          </p>

          <p style={{ marginBottom: '20px', textAlign: 'justify' }}>
            Equally important to me is the world we share within these walls. A clean, well-kept campus is not a facility provided to students — it is an expression of who we are as a community. Every student here is a co-owner of this space, not a visitor passing through. Its upkeep, its order and its character are yours to protect as much as anyone else's.
          </p>

          <p style={{ marginBottom: '30px', textAlign: 'justify' }}>
            Let us build something we are genuinely proud of — not because it was handed to us, but because we chose to care for it.
          </p>

          <p style={{ marginBottom: '30px' }}>
            With great regard and expectations!!
          </p>

          <div>
            <p style={{ margin: '0', fontWeight: '600', color: '#1e293b' }}>Mohan Kumar B K</p>
            <p style={{ margin: '0', fontSize: '14px' }}>Vice Chancellor</p>
            <p style={{ margin: '0', fontSize: '14px' }}>Nrupathunga University</p>
            <p style={{ margin: '0', fontSize: '14px' }}>Bengaluru</p>
          </div>
        </div>
      </motion.div>
      
      <Footer />
    </div>
  );
}
