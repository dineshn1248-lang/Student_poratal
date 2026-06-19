import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Monitor, Coffee, Clock, ArrowLeft, Search, Wifi, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../../components/common/Footer';
import QuickActions from '../../components/common/QuickActions';

export default function Library() {
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
          background: 'linear-gradient(to bottom, rgba(15,23,42,0.6), #0f172a), url("/library.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <BookOpen size={48} color="#60a5fa" style={{ marginBottom: '20px' }} />
            <h1 style={{ fontSize: '48px', fontWeight: '900', margin: '0 0 20px 0', background: 'linear-gradient(to right, #fff, #93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Central Library
            </h1>
            <p style={{ fontSize: '20px', color: '#cbd5e1', lineHeight: '1.6' }}>
              A sanctuary for scholars. Explore over 50,000 volumes, extensive digital archives, and state-of-the-art research facilities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats/Features Section */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
          {[
            { icon: <BookOpen size={32} />, title: '50,000+ Books', desc: 'Extensive collection spanning all academic disciplines.' },
            { icon: <Monitor size={32} />, title: 'Digital Archives', desc: 'Access to thousands of e-journals and research papers.' },
            { icon: <Wifi size={32} />, title: 'High-Speed Wi-Fi', desc: 'Seamless campus-wide internet connectivity for research.' },
            { icon: <Clock size={32} />, title: '24/7 Access', desc: 'Dedicated reading rooms open round the clock during exams.' }
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
              <div style={{ color: '#60a5fa', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#ffffff', fontWeight: '700' }}>{feature.title}</h3>
              <p style={{ color: '#cbd5e1', margin: 0, lineHeight: '1.6' }}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Detailed Info Content */}
      <section style={{ padding: '40px 20px 100px', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* About Library */}
        <div style={{ background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '24px', padding: '50px', marginBottom: '40px', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
          <div style={{ flex: '1 1 500px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '30px', color: '#60a5fa' }}>About Library</h2>
            <p style={{ fontSize: '18px', color: '#e2e8f0', lineHeight: '1.8', marginBottom: '20px' }}>
              The central library of the University is located in the intermediate building and is well organized. It is a knowledge centre for accessibility developed on modern lines as a prominent learning Resource Centre. The Library has made sincere efforts to assure an environment for intellectual inquiry by providing user focused services to obtain and evaluate scholarly information and knowledge available in main formats and strives to create new knowledge to increase understanding and develop wisdom.
            </p>
            <p style={{ fontSize: '18px', color: '#e2e8f0', lineHeight: '1.8', marginBottom: '20px' }}>
              Our aim is to make the library, a vibrant centre to support the academic, research and development activities. The library is at the core of research and learning at the campus. It is our goal to support and contribute to the quality of academic and research activities for the prosperous development of society and the nation building.
            </p>
            <p style={{ fontSize: '18px', color: '#e2e8f0', lineHeight: '1.8', marginBottom: '0' }}>
              The library is entirely computerized with E-Granthalaya 4.0 (Cloud based) Technologies and Services to the Indian Libraries (Software from National Informatics Centre, Department of Information Technology, Government of India), a library management software package with all the modules for use in the library. Computers are installed in the library mainly to access the OPAC of the library and includes access to the internet. The building is secure with CCTV cameras installed at strategic points.
            </p>
          </div>
          <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
            <img src="/library.jpg" alt="Central Library" style={{ width: '100%', maxWidth: '400px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(59, 130, 246, 0.3)' }} />
          </div>
        </div>

        {/* Library Collection */}
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '24px', padding: '50px', marginBottom: '40px', display: 'flex', flexWrap: 'wrap-reverse', gap: '40px', alignItems: 'center' }}>
          <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
            <img src="/library-inside.jpg" alt="Students in Library" style={{ width: '100%', maxWidth: '400px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
          </div>
          <div style={{ flex: '1 1 500px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '30px', color: '#60a5fa' }}>Library Collection</h2>
            <p style={{ fontSize: '18px', color: '#cbd5e1', lineHeight: '1.8', marginBottom: '0' }}>
              The Library collection consists of Books (including text books, general dictionaries, subject dictionaries, encyclopedias, subject encyclopedias, competitive books) UGC Minor and Major Completed Project Reports completed in the intitution, Periodicals, Bound volumes, CD Rom/DVDs, Audio cassette, present and previous year question papers. The collections caters to the needs of UG, PG and research students, faculty and other stake holders for teaching – learning (UG, PG), research, reference, hobby reading, and preparation of project proposals, reports, and preparation for competitive examinations. The library collection is quite systematic and procurements are made only on the recommendations of the different departments. The library ensures procurement of the latest and updated learning resources like books and journals by sending the latest catalogues, book reviews, paper clippings etc. to the departments to facilitate procurement.
            </p>
          </div>
        </div>

        {/* Electronic Resources & Research Support Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          
          {/* Electronic Resources */}
          <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '24px', padding: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '30px', color: '#34d399' }}>Electronic Resources</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <a href="https://ndl.iitkgp.ac.in/" target="_blank" rel="noreferrer" style={{ padding: '15px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', color: '#60a5fa', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600' }}>NDLI (National Digital Library of India)</span>
                <ChevronRight size={18} />
              </a>
              <a href="https://igod.gov.in/" target="_blank" rel="noreferrer" style={{ padding: '15px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', color: '#60a5fa', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600' }}>Integrated Government Online</span>
                <ChevronRight size={18} />
              </a>
              <a href="https://www.india.gov.in/" target="_blank" rel="noreferrer" style={{ padding: '15px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', color: '#60a5fa', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600' }}>National Portal of India</span>
                <ChevronRight size={18} />
              </a>
              <a href="https://eg4.nic.in/gfgckar/OPAC/Default.aspx" target="_blank" rel="noreferrer" style={{ padding: '15px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', color: '#60a5fa', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600' }}>WEB OPAC</span>
                <ChevronRight size={18} />
              </a>
            </div>
          </div>

          {/* Research Support */}
          <div style={{ background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '24px', padding: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '30px', color: '#a78bfa' }}>Research Support</h2>
            <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: '1.8', margin: 0 }}>
              This is an initiative of the Library and Information Center, the purpose of this initiative is to assist budding our faculty members, to help them in engaging and bringing research &amp; publications ethically. We will be assisting in identifying appropriate sources of information for conducting research smoothly and aiding in identifying right journals for publications and encourage faculty to embrace open science to create more visibility for their research work.
            </p>
          </div>

        </div>

        {/* Faculty Profile */}
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '24px', padding: '50px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '30px', color: '#60a5fa' }}>Faculty Profile</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '15px', color: '#94a3b8', fontWeight: '600' }}>Name of the Faculty</th>
                  <th style={{ padding: '15px', color: '#94a3b8', fontWeight: '600' }}>Designation</th>
                  <th style={{ padding: '15px', color: '#94a3b8', fontWeight: '600' }}>Profile</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '15px', color: '#f8fafc' }}>1. Dr. Jayamma K V</td>
                  <td style={{ padding: '15px', color: '#cbd5e1' }}>Librarian</td>
                  <td style={{ padding: '15px' }}>
                    <button style={{ padding: '6px 12px', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>VIEW</button>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '15px', color: '#f8fafc' }}>2. Dr. M Krishnappa</td>
                  <td style={{ padding: '15px', color: '#cbd5e1' }}>Librarian</td>
                  <td style={{ padding: '15px' }}>
                    <button style={{ padding: '6px 12px', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>VIEW</button>
                  </td>
                </tr>
              </tbody>
            </table>
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
