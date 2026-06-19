import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, ArrowLeft, Calendar, MapPin, 
  PlayCircle, Clock, Users, Trophy, Code, 
  Lightbulb, Heart, Target, Briefcase, Mic, Music
} from 'lucide-react';
import Footer from '../../components/common/Footer';
import QuickActions from '../../components/common/QuickActions';
import festVideo from '../../assets/fest_video.mp4';
import annualDayImg from '../../assets/annual_day.jpg';
import culturalFestImg from '../../assets/cultural_fest.jpg';
import sportsMeetImg from '../../assets/sports_meet.jpg';

export default function Events() {
  const upcomingEvents = [];

  const galleryImages = [
    { src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80", title: "Graduation Ceremony" },
    { src: annualDayImg, title: "Annual Day" },
    { src: culturalFestImg, title: "Cultural Fest" },
    { src: sportsMeetImg, title: "Sports Meet" },
    { src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80", title: "Hackathon" },
    { src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80", title: "Workshop" },
    { src: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800&q=80", title: "Seminar" },
    { src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", title: "Industry Visit" }
  ];

  const pastEvents = [
    { year: "2025", title: "National Conference on AI", icon: <Lightbulb size={20}/> },
    { year: "2025", title: "State Level Coding Challenge", icon: <Code size={20}/> },
    { year: "2024", title: "University Sports Championship", icon: <Trophy size={20}/> },
    { year: "2024", title: "Entrepreneurship Summit", icon: <Briefcase size={20}/> },
    { year: "2023", title: "Cultural Excellence Festival", icon: <Users size={20}/> }
  ];

  const clubs = [
    { title: "Coding Club", icon: <Code size={32} color="#60a5fa" />, desc: "Algorithms, competitive programming, and open source." },
    { title: "Innovation Club", icon: <Lightbulb size={32} color="#fbbf24" />, desc: "Hardware hacks, IoT, and out-of-the-box thinking." },
    { title: "NSS Activities", icon: <Heart size={32} color="#f87171" />, desc: "Community service, blood donation camps, and social awareness." },
    { title: "Sports Activities", icon: <Trophy size={32} color="#34d399" />, desc: "Athletics, indoor games, and university-level tournaments." },
    { title: "Cultural Club", icon: <Music size={32} color="#c084fc" />, desc: "Dance, drama, singing, and fine arts." },
    { title: "Entrepreneurship Cell", icon: <Target size={32} color="#f472b6" />, desc: "Startup incubators, pitch decks, and investor meets." }
  ];

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', overflowX: 'hidden' }}>
      <QuickActions />

      {/* 1. Hero Section */}
      <section style={{ 
        padding: '120px 20px 80px', 
        background: 'linear-gradient(to bottom, rgba(15,23,42,0.7), #0f172a), url("https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover', backgroundPosition: 'center', textAlign: 'center', position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(2px)' }}></div>
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', padding: '8px 16px', background: 'rgba(59, 130, 246, 0.2)', color: '#93c5fd', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '20px', gap: '8px' }}>
            <Link to="/home" style={{color: '#93c5fd', textDecoration: 'none'}}>Home</Link> <ChevronRight size={14}/> <span>About</span> <ChevronRight size={14}/> <span>Events</span>
          </div>
          <h1 style={{ fontSize: '56px', fontWeight: '900', marginBottom: '20px', background: 'linear-gradient(to right, #ffffff, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Events & Activities
          </h1>
          <p style={{ fontSize: '22px', color: '#cbd5e1', lineHeight: '1.6' }}>
            Celebrating Innovation, Learning, Culture and Student Excellence
          </p>
        </motion.div>
      </section>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 20px' }}>
        
        {/* 2. Upcoming Events Section */}
        <section style={{ marginBottom: '100px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <h2 style={{ fontSize: '36px', color: '#ffffff', margin: 0 }}>Upcoming Events</h2>
              <div style={{ width: '60px', height: '4px', background: '#3b82f6', marginTop: '15px', borderRadius: '2px' }}></div>
            </div>
          </div>
          {upcomingEvents.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              {upcomingEvents.map((ev) => (
                <motion.div whileHover={{ y: -10 }} key={ev.id} style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', overflow: 'hidden' }}>
                  <div style={{ height: '200px', backgroundImage: `url(${ev.img})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', padding: '8px 15px', borderRadius: '30px', color: '#60a5fa', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Clock size={14}/> Upcoming
                    </div>
                  </div>
                  <div style={{ padding: '25px' }}>
                    <h3 style={{ fontSize: '22px', color: 'white', marginBottom: '15px', lineHeight: '1.3' }}>{ev.title}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94a3b8', fontSize: '14px', marginBottom: '10px' }}>
                      <Calendar size={16} color="#fbbf24"/> {ev.date}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>
                      <MapPin size={16} color="#f472b6"/> {ev.venue}
                    </div>
                    <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.5', marginBottom: '25px' }}>{ev.desc}</p>
                    <button style={{ width: '100%', padding: '12px', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#3b82f6'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'; e.currentTarget.style.color = '#60a5fa'; }}>
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', padding: '80px 20px', textAlign: 'center', borderRadius: '24px' }}>
              <Calendar size={48} color="#60a5fa" style={{ marginBottom: '20px', opacity: 0.5 }} />
              <h3 style={{ color: '#cbd5e1', fontSize: '24px', margin: '0 0 10px 0' }}>No Upcoming Events</h3>
              <p style={{ color: '#94a3b8', fontSize: '16px', margin: 0 }}>Stay tuned! Exciting new events and fests will be announced here soon.</p>
            </div>
          )}
        </section>

        {/* 3. Event Gallery Section */}
        <section style={{ marginBottom: '100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '36px', color: '#ffffff', margin: 0 }}>Event Gallery</h2>
            <div style={{ width: '60px', height: '4px', background: '#3b82f6', margin: '15px auto', borderRadius: '2px' }}></div>
            <p style={{ color: '#94a3b8', fontSize: '18px' }}>Capturing the best moments of our campus life.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {galleryImages.map((img, idx) => (
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                key={idx} 
                style={{ 
                  height: idx === 0 || idx === 3 ? '400px' : '250px', 
                  backgroundImage: `url(${img.src})`, 
                  backgroundSize: 'cover', backgroundPosition: 'center', 
                  borderRadius: '20px', position: 'relative', overflow: 'hidden',
                  gridRow: idx === 0 || idx === 3 ? 'span 2' : 'span 1'
                }}
              >
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.9), transparent)', display: 'flex', alignItems: 'flex-end', padding: '20px', opacity: 0, transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = 1} onMouseLeave={(e) => e.currentTarget.style.opacity = 0}>
                  <h3 style={{ color: 'white', margin: 0, fontSize: '20px', fontWeight: '600' }}>{img.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. University Highlights Videos Section */}
        <section style={{ marginBottom: '100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '36px', color: '#ffffff', margin: 0 }}>Video Highlights</h2>
            <div style={{ width: '60px', height: '4px', background: '#3b82f6', margin: '15px auto', borderRadius: '2px' }}></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '40px' }}>
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '20px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ width: '100%', height: '350px', borderRadius: '16px', overflow: 'hidden', marginBottom: '20px' }}>
                <video width="100%" height="100%" controls style={{ objectFit: 'cover', background: '#000' }}>
                  <source src={festVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <h3 style={{ color: 'white', fontSize: '24px', margin: 0 }}>College Fest</h3>
            </div>
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '20px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ width: '100%', height: '350px', borderRadius: '16px', overflow: 'hidden', marginBottom: '20px' }}>
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/lb77QKbZZHo" title="Placement Drive" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
              <h3 style={{ color: 'white', fontSize: '24px', margin: 0 }}>Placement Drive</h3>
            </div>
          </div>
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '60px', marginBottom: '100px' }}>
          {/* 5. Past Events Timeline */}
          <section>
            <h2 style={{ fontSize: '32px', color: '#ffffff', marginBottom: '30px' }}>Past Event Highlights</h2>
            <div style={{ position: 'relative', borderLeft: '2px solid rgba(59, 130, 246, 0.3)', paddingLeft: '30px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {pastEvents.map((evt, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-42px', top: '0', width: '22px', height: '22px', background: '#0f172a', border: '2px solid #60a5fa', borderRadius: '50%' }}></div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {evt.icon}
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '700', marginBottom: '5px' }}>{evt.year}</div>
                      <div style={{ color: 'white', fontSize: '18px', fontWeight: '600' }}>{evt.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Student Activities Section */}
          <section>
            <h2 style={{ fontSize: '32px', color: '#ffffff', marginBottom: '30px' }}>Student Clubs & Activities</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {clubs.map((club, i) => (
                <div key={i} style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '25px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ marginBottom: '15px' }}>{club.icon}</div>
                  <h3 style={{ color: 'white', fontSize: '18px', marginBottom: '10px' }}>{club.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>{club.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* 7. Statistics Section */}
        <section style={{ marginBottom: '100px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))', padding: '60px 20px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '40px' }}>
            {[
              { count: "50+", label: "Events Per Year" },
              { count: "10,000+", label: "Participants" },
              { count: "100+", label: "Industry Speakers" },
              { count: "25+", label: "Student Clubs" }
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', fontWeight: '900', color: 'white', marginBottom: '10px' }}>{stat.count}</div>
                <div style={{ fontSize: '16px', color: '#93c5fd', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Final CTA Section */}
        <section style={{ textAlign: 'center', padding: '60px 0' }}>
          <h2 style={{ fontSize: '40px', color: 'white', marginBottom: '20px' }}>Be Part of the Next Big Event</h2>
          <p style={{ color: '#cbd5e1', fontSize: '18px', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            Whether you want to participate, volunteer, or sponsor, there's always a place for you at Nrupathunga University.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button style={{ padding: '15px 30px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '30px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)' }} onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'} onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}>
              Explore Events
            </button>
            <button style={{ padding: '15px 30px', background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '30px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
              Contact Event Cell
            </button>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
}
