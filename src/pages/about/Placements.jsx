import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, ArrowLeft, Briefcase, TrendingUp, 
  Building, Calendar, Clock, MapPin, CheckCircle, ExternalLink
} from 'lucide-react';
import Footer from '../../components/common/Footer';
import QuickActions from '../../components/common/QuickActions';
import qs1 from '../../assets/qspiders_1.png';
import qs2 from '../../assets/qspiders_2.png';
import qs3 from '../../assets/qspiders_3.png';

export default function Placements() {
  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', overflowX: 'hidden' }}>
      <QuickActions />

      {/* 1. Hero Section */}
      <section style={{ 
        padding: '120px 20px 80px', 
        background: 'linear-gradient(to bottom, rgba(15,23,42,0.7), #0f172a), url("https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover', backgroundPosition: 'center', textAlign: 'center', position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(3px)' }}></div>
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', padding: '8px 16px', background: 'rgba(59, 130, 246, 0.2)', color: '#93c5fd', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '20px', gap: '8px' }}>
            <Link to="/home" style={{color: '#93c5fd', textDecoration: 'none'}}>Home</Link> <ChevronRight size={14}/> <span>About</span> <ChevronRight size={14}/> <span>Placements</span>
          </div>
          <h1 style={{ fontSize: '56px', fontWeight: '900', marginBottom: '20px', background: 'linear-gradient(to right, #ffffff, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Training & Placement Cell
          </h1>
          <p style={{ fontSize: '22px', color: '#cbd5e1', lineHeight: '1.6' }}>
            Connecting our bright minds with top global organizations.
          </p>
        </motion.div>
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        
        {/* 2. Highlight Event: Pragathi Patha - Mega Job Mela */}
        <motion.section 
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          style={{ marginBottom: '100px', background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))', borderRadius: '30px', border: '1px solid rgba(59, 130, 246, 0.3)', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
        >
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: '#3b82f6', filter: 'blur(150px)', opacity: 0.2, borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '300px', height: '300px', background: '#a855f7', filter: 'blur(150px)', opacity: 0.2, borderRadius: '50%' }}></div>
          
          <div style={{ padding: '60px', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-block', background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', padding: '8px 16px', borderRadius: '20px', fontWeight: '700', fontSize: '14px', marginBottom: '20px', border: '1px solid rgba(239, 68, 68, 0.3)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Mega Event Announcement
            </div>
            
            <h2 style={{ fontSize: '48px', fontWeight: '800', color: '#ffffff', marginBottom: '15px', lineHeight: '1.2' }}>Pragathi Patha</h2>
            <h3 style={{ fontSize: '28px', color: '#93c5fd', marginBottom: '30px', fontWeight: '600' }}>Mega Job Mela 2026</h3>
            
            <p style={{ fontSize: '18px', color: '#cbd5e1', lineHeight: '1.7', marginBottom: '40px', maxWidth: '800px' }}>
              Dear Final year Students,<br/><br/>
              We, Nrupathunga University have organised Mega Job Mela 2026 - Pragati Patha which is being held at the Nrupathunga University Bengaluru Campus in association with the <strong>Rotary Club</strong>. Hereby, we request all final year UG and PG students to register through the Google form link and participate in the Job Mela.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Calendar size={32} color="#fbbf24" />
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '5px' }}>Date</div>
                  <div style={{ color: 'white', fontWeight: '600', fontSize: '16px' }}>22nd May 2026, Friday</div>
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Clock size={32} color="#34d399" />
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '5px' }}>Time</div>
                  <div style={{ color: 'white', fontWeight: '600', fontSize: '16px' }}>9:30 AM to 4:30 PM</div>
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <MapPin size={32} color="#f472b6" />
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '5px' }}>Venue</div>
                  <div style={{ color: 'white', fontWeight: '600', fontSize: '16px' }}>Nrupathunga University Campus</div>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '30px', borderRadius: '20px', marginBottom: '40px' }}>
              <h4 style={{ fontSize: '20px', color: 'white', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Briefcase size={24} color="#60a5fa" /> Event Highlights
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#cbd5e1' }}><CheckCircle size={18} color="#34d399"/> <strong>50+</strong> Companies</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#cbd5e1' }}><CheckCircle size={18} color="#34d399"/> <strong>5000+</strong> Vacancies</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#cbd5e1' }}><CheckCircle size={18} color="#34d399"/> <strong>PUC to PG</strong> Level</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#cbd5e1' }}><CheckCircle size={18} color="#34d399"/> Salaries <strong>17k to 50k</strong></div>
              </div>
            </div>

            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSfmrKvGvhe0Cy-w4Y8CvuBf9l1lP4UQA8VQGMUAmv4kiTP7Ww/viewform?usp=dialog" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  background: 'linear-gradient(to right, #2563eb, #4f46e5)', color: 'white', 
                  padding: '18px 40px', borderRadius: '30px', fontSize: '18px', fontWeight: '700', 
                  textDecoration: 'none', boxShadow: '0 10px 25px rgba(37, 99, 235, 0.5)',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Register Now <ExternalLink size={20} />
              </a>
              <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '20px' }}>
                Please share with classmates, friends from other colleges, and alumni.
              </p>
            </div>
            
          </div>
        </motion.section>

        {/* 2.5 QSpiders Incubation & Internship */}
        <section style={{ marginBottom: '100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '36px', color: '#ffffff', margin: 0 }}>QSpiders - Incubation & Internship</h2>
            <div style={{ width: '60px', height: '4px', background: '#3b82f6', margin: '15px auto', borderRadius: '2px' }}></div>
            <p style={{ color: '#94a3b8', fontSize: '18px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.7', textAlign: 'center' }}>
              Nrupathunga University has proudly partnered with QSpiders, a globally recognized leader in software testing and development training, to establish a dedicated Incubation & Internship program. This initiative is designed to bridge the gap between academic learning and industry expectations by providing students with hands-on, real-world project experience. Participants undergo rigorous technical training, engage in live software development cycles, and receive personalized mentorship from seasoned industry experts. The program not only sharpens their coding and testing skills but also instills critical problem-solving and professional communication abilities. Ultimately, this incubation empowers our students to graduate as highly competent, industry-ready professionals, significantly boosting their placement opportunities in top-tier multinational corporations.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <img src={qs1} alt="QSpiders Session" style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <img src={qs2} alt="QSpiders Audience" style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <img src={qs3} alt="QSpiders Certificates" style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </section>

        {/* 3. Career Success Statistics */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '36px', color: '#ffffff', margin: 0 }}>Career Success Statistics</h2>
            <div style={{ width: '60px', height: '4px', background: '#3b82f6', margin: '15px auto', borderRadius: '2px' }}></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <motion.div whileHover={{ y: -10 }} style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '40px', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#60a5fa' }}>
                <TrendingUp size={40} />
              </div>
              <h3 style={{ fontSize: '48px', color: 'white', margin: '0 0 10px 0', fontWeight: '800' }}>92%</h3>
              <p style={{ color: '#94a3b8', fontSize: '18px', margin: 0 }}>Placement Rate</p>
            </motion.div>
            
            <motion.div whileHover={{ y: -10 }} style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '40px', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#c084fc' }}>
                <Briefcase size={40} />
              </div>
              <h3 style={{ fontSize: '48px', color: 'white', margin: '0 0 10px 0', fontWeight: '800' }}>150+</h3>
              <p style={{ color: '#94a3b8', fontSize: '18px', margin: 0 }}>Partner Companies</p>
            </motion.div>

            <motion.div whileHover={{ y: -10 }} style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '40px', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: 'rgba(52, 211, 153, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#34d399' }}>
                <Building size={40} />
              </div>
              <h3 style={{ fontSize: '48px', color: 'white', margin: '0 0 10px 0', fontWeight: '800' }}>₹12 LPA</h3>
              <p style={{ color: '#94a3b8', fontSize: '18px', margin: 0 }}>Average Package</p>
            </motion.div>
          </div>
        </section>
        
      </div>
      <Footer />
    </div>
  );
}
