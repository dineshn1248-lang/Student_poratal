import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, Shield, Coffee, Wifi, ArrowLeft, BookOpen, GraduationCap, MapPin, 
  Search, Filter, Map, Bot, Star, Users, Phone, Navigation, ChevronRight, Building2, CheckCircle2 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../../components/common/Footer';
import QuickActions from '../../components/common/QuickActions';

export default function Hostels() {

  const recommendedHostels = [
    { name: "Government Science Boys Hostel", type: "Government", fee: "Free (Govt)", distance: "4.2 KM", food: "Included", seats: "15 Left", color: "rgba(59, 130, 246, 0.2)", img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", mapLink: "https://www.google.com/maps/search/?api=1&query=Government+science+hostel,+Craig+Park+Layout,+Ashok+Nagar,+Bengaluru,+Karnataka+560001" },
    { name: "Government Arts Boys Hostel", type: "Government", fee: "Free (Govt)", distance: "4.0 KM", food: "Included", seats: "8 Left", color: "rgba(245, 158, 11, 0.2)", img: "/arts-hostel.jpg", mapLink: "https://www.google.com/maps/search/?api=1&query=Government+Arts+College+Boy%27s+Hostel,+Richmond+Town,+40,+Primrose+Rd,+Craig+Park+Layout,+Sivanchetti+Gardens,+Bengaluru,+Karnataka+560025" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', overflowX: 'hidden' }}
    >
      <QuickActions />

      {/* Hero Section (PRESERVED) */}
      <section 
        style={{ 
          position: 'relative', 
          padding: '120px 20px 80px', 
          background: 'linear-gradient(to bottom, rgba(15,23,42,0.8), #0f172a), url("/hostel-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <Home size={48} color="#f59e0b" style={{ marginBottom: '20px' }} />
            <h1 style={{ fontSize: '48px', fontWeight: '900', margin: '0 0 20px 0', background: 'linear-gradient(to right, #ffffff, #fcd34d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Student Hostels
            </h1>
            <p style={{ fontSize: '20px', color: '#cbd5e1', lineHeight: '1.6' }}>
              A home away from home. We provide secure, comfortable, and highly-equipped residential facilities for our students.
            </p>
          </motion.div>
        </div>
      </section>

      {/* NEW: Hostel Statistics Section */}
      <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '-40px auto 40px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {[
            { label: 'Partner Hostels', value: '50+', icon: <Building2 size={24} color="#60a5fa" /> },
            { label: 'Student Residents', value: '3000+', icon: <Users size={24} color="#34d399" /> },
            { label: 'Satisfaction Rate', value: '95%', icon: <Star size={24} color="#fbbf24" /> },
            { label: 'Student Support', value: '24/7', icon: <Shield size={24} color="#f472b6" /> },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: 'rgba(30, 41, 59, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}
            >
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '12px' }}>{stat.icon}</div>
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: '800', margin: 0, color: '#fff' }}>{stat.value}</h3>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>



      {/* NEW: Recommended Hostels Section */}
      <section id="recommended-hostels" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '40px', color: '#ffffff', textAlign: 'center' }}>Recommended Hostels</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {recommendedHostels.map((hostel, idx) => (
            <motion.div 
              key={idx}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              style={{ 
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', 
                borderRadius: '24px', overflow: 'hidden', transition: 'transform 0.3s, boxShadow 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = `0 15px 30px ${hostel.color}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ height: '200px', backgroundImage: `url(${hostel.img})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                  {hostel.type}
                </div>
              </div>
              <div style={{ padding: '25px' }}>
                <h3 style={{ margin: '0 0 15px 0', fontSize: '22px', color: '#fff' }}>{hostel.name}</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px', fontSize: '14px', color: '#94a3b8' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} color="#ef4444" /> {hostel.distance}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Coffee size={16} color="#f59e0b" /> {hostel.food}</div>
                  <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center' }}>{hostel.fee}</div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => alert(`Welcome to ${hostel.name}!\n\nType: ${hostel.type}\nFee Structure: ${hostel.fee}\nDistance: ${hostel.distance}\nFood Status: ${hostel.food}\nAvailability: ${hostel.seats}\n\nMore detailed pages coming soon.`)}
                    style={{ flex: 1, padding: '12px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.5)', borderRadius: '10px', color: '#60a5fa', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}
                  >
                    View Details
                  </button>
                  <a href={hostel.mapLink} target="_blank" rel="noopener noreferrer" style={{ padding: '12px', background: '#3b82f6', border: 'none', borderRadius: '10px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                    <Navigation size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NEW: Interactive Hostel Map Section */}
      <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '20px', color: '#ffffff' }}>Nearby Hostels Around Nrupathunga University</h2>
        <div style={{ 
          width: '100%', height: '450px', borderRadius: '24px', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', marginBottom: '20px'
        }}>
          <iframe 
            src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Nrupathunga%20University,%20Bengaluru+(Hostels)&t=&z=14&ie=UTF8&iwloc=B&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Real-time Hostel Map"
          ></iframe>
        </div>
        
        <a 
          href="https://www.google.com/maps/search/PG+and+Hostels+near+Nrupathunga+University+Bengaluru" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '15px 30px', background: '#ffffff', border: 'none', borderRadius: '30px', 
            color: '#0f172a', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer',
            textDecoration: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Map size={20} /> Open Reference in Google Maps
        </a>
      </section>

      {/* Global Amenities Section (PRESERVED) */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: '800', marginBottom: '40px', color: '#ffffff' }}>Common Amenities</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
          {[
            { icon: <Shield size={32} />, title: '24/7 Security', desc: 'Round-the-clock guards and CCTV surveillance.' },
            { icon: <Wifi size={32} />, title: 'High-Speed Wi-Fi', desc: 'Seamless internet access in all rooms.' },
            { icon: <Coffee size={32} />, title: 'Mess & Cafeteria', desc: 'Hygienic, nutritious meals provided daily.' },
            { icon: <BookOpen size={32} />, title: 'Study Rooms', desc: 'Quiet environments dedicated to focused learning.' },
            { icon: <CheckCircle2 size={32} />, title: 'Medical Support', desc: '24/7 emergency care and first aid availability.' },
            { icon: <Home size={32} />, title: 'Laundry Services', desc: 'In-house washing and ironing facilities.' }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ 
                background: 'rgba(255,255,255,0.03)', 
                padding: '30px 20px', 
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.05)',
                textAlign: 'center'
              }}
            >
              <div style={{ color: '#f59e0b', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#ffffff', fontWeight: '700' }}>{feature.title}</h3>
              <p style={{ color: '#94a3b8', margin: 0, lineHeight: '1.6', fontSize: '14px' }}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>



      <div style={{ padding: '0 0 60px', textAlign: 'center' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', color: '#94a3b8', textDecoration: 'none', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', transition: 'all 0.2s' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>

      <Footer />
    </motion.div>
  );
}
