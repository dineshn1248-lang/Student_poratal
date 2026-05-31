import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Shield, Users, ArrowRight, BarChart2, GraduationCap, Headphones } from "lucide-react";
import "../../styles/Home.css";
import karnatakaLogo from "../../assets/karnataka_logo.svg";
import nrupathungaLogo from "../../assets/nrupathunga_logo.png";
import admissionBanner from "../../assets/admission_banner.png";

function Home() {
  const navigate = useNavigate();

  const sliderImages = [
    "https://nublr.karnataka.gov.in/uploads/92021778181858.jpeg",
    "https://nublr.karnataka.gov.in/uploads/19051776539560.jpg",
    "https://nublr.karnataka.gov.in/uploads/76121775761402.jpeg"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  return (
    <div className="home-page-container">
      {/* HEADER */}
      <header className="home-header">
        <div className="header-main" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', maxWidth: '1400px', margin: '0 auto' }}>
          
          {/* Left: Karnataka Logo + Nrupathunga Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img src={karnatakaLogo} alt="Govt of Karnataka" style={{ height: '80px' }} />
            <div style={{ textAlign: 'left' }}>
              <h1 style={{ margin: 0, fontSize: '20px', color: '#0f172a', fontWeight: 'bold' }}>Nrupathunga University</h1>
              <p style={{ margin: 0, fontSize: '18px', color: '#1e293b' }}>Department of Higher Education, Government of Karnataka</p>
            </div>
          </div>

          {/* Right: Nrupathunga Logo */}
          <img src={nrupathungaLogo} alt="Nrupathunga University Logo" style={{ height: '80px' }} />
        </div>

        {/* Navigation */}
        <div style={{ borderTop: '1px solid #e2e8f0', padding: '12px 0', backgroundColor: '#fff' }}>
          <nav className="header-nav" style={{ justifyContent: 'center' }}>
            <a href="#home">Home</a>
            <a href="#admissions">Admissions 2026-2027</a>
            <a href="#anti-ragging">Anti-Ragging Act</a>
            <a href="#about">About</a>
            <a href="#admin">Administrator</a>
            <a href="#feedback">Feedback</a>
          </nav>
        </div>
      </header>

      {/* HERO / PORTAL LOGIN SECTION */}
      <section className="home-hero-section">
         <div className="hero-overlay" />
         <div className="hero-content-wrapper">
           
           {/* Top Brand Header inside Hero */}
           <div className="hero-brand-header">
             <div className="hero-brand-left">
               <img src={nrupathungaLogo} alt="Nrupathunga University Logo" className="hero-brand-logo" />
               <div className="hero-brand-text">
                 <span className="hero-brand-title">NRUPATHUNGA UNIVERSITY</span>
                 <span className="hero-brand-sub">EXCELLENCE IN EDUCATION</span>
               </div>
             </div>
             {/* No date block as requested */}
           </div>

           {/* Welcome Panel */}
           <div className="hero-welcome-panel">
             <h2 className="welcome-title">
               <span className="star-sparkle">✦</span> Welcome to Nrupathunga University <span className="star-sparkle">✦</span>
             </h2>
             <p className="welcome-subtitle">Track attendance, grades and performance across departments</p>
           </div>

           {/* Two Portal Cards */}
           <div className="hero-portal-cards">
             
             {/* Admin Portal Card */}
             <div className="hero-portal-card admin-glass-card" onClick={() => navigate("/staff-login")}>
               <div className="card-icon-wrapper admin-icon">
                 <Shield size={28} />
               </div>
               <h3>Admin Portal</h3>
               <div className="card-divider admin-line"></div>
               {/* secure access for administrator line removed as requested */}
               <button className="card-enter-btn admin-btn">
                 Enter Portal <ArrowRight size={16} />
               </button>
             </div>

             {/* User Portal Card */}
             <div className="hero-portal-card user-glass-card" onClick={() => navigate("/student-login")}>
               <div className="card-icon-wrapper user-icon">
                 <Users size={28} />
               </div>
               <h3>User Portal</h3>
               <div className="card-divider user-line"></div>
               <p className="card-subtext">Access for students and parents</p>
               <button className="card-enter-btn user-btn">
                 Enter Portal <ArrowRight size={16} />
               </button>
             </div>

           </div>

           {/* Bottom Badges Ticker/Grid */}
           <div className="hero-features-footer">
             <div className="feature-item">
               <div className="feature-icon blue-feat"><Shield size={20} /></div>
               <div className="feature-text">
                 <h4>Secure & Reliable</h4>
                 <p>Advanced security for data protection</p>
               </div>
             </div>
             
             <div className="feature-item">
               <div className="feature-icon purple-feat"><BarChart2 size={20} /></div>
               <div className="feature-text">
                 <h4>Real-time Insights</h4>
                 <p>Live analytics and performance tracking</p>
               </div>
             </div>

             <div className="feature-item">
               <div className="feature-icon gold-feat"><GraduationCap size={20} /></div>
               <div className="feature-text">
                 <h4>Academic Excellence</h4>
                 <p>Empowering education with technology</p>
               </div>
             </div>

             <div className="feature-item">
               <div className="feature-icon green-feat"><Headphones size={20} /></div>
               <div className="feature-text">
                 <h4>24/7 Support</h4>
                 <p>We are here to help you anytime</p>
               </div>
             </div>
           </div>

         </div>
      </section>

      {/* ADMISSIONS HTML SECTION (REFERENCED FROM IMAGE) */}
      <section className="admissions-html-section" style={{ width: '100%', margin: '0' }}>
        <div className="admissions-container">
          
          <div className="admissions-left">
            <div className="admissions-info-box">
              <h3 style={{ color: 'white', margin: '0 0 20px 0', fontSize: '20px' }}>Admissions 2026-2027</h3>
              <div className="admissions-buttons">
                <button onClick={() => navigate('/admissions-info')}>Read more</button>
                <button onClick={() => navigate('/contact-us')}>Contact Us</button>
              </div>
            </div>
            
            <div className="admissions-qr-box">
              <div className="qr-code-wrapper">
                <span>SCAN HERE<br/>For Admission</span>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Nrupathunga+University+Admission" alt="QR Code" 
                     onError={(e) => e.target.src = "https://placehold.co/150x150?text=QR+Code"} />
              </div>
              <div className="building-illustration">
                <img src="https://img.icons8.com/color/512/university.png" alt="University Building" style={{ opacity: 0.9, height:'80px' }} 
                     onError={(e) => e.target.src = "https://placehold.co/80x80?text=Logo"} />
              </div>
            </div>
          </div>

          <div className="admissions-right">
            <div className="admissions-title">
              <span className="small-cursive">Knowledge Experiment Excellence</span>
              <h2>ADMISSION OPEN <span>2026-27</span></h2>
            </div>
            
            <div className="courses-grid">
              <div className="course-btn">BSC</div>
              <div className="course-btn">Bsc B.Ed</div>
              <div className="course-btn">BCA</div>
              <div className="course-btn">MCA</div>
              <div className="course-btn">BBA</div>
              <div className="course-btn">MSC</div>
              <div className="course-btn">BCA AI & ML</div>
              <div className="course-btn">BCA DS</div>
            </div>
          </div>

        </div>
      </section>

      <div className="main-content-grid">
         {/* LEFT COLUMN: LEADERSHIP & EVENTS */}
         <div className="left-column">
            <section className="leadership-section" id="admin">
              <h3>Heads of the Department</h3>
              <p style={{ color: '#475569', fontSize: '18px', lineHeight: '1.8', textAlign: 'justify', marginBottom: '30px' }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
               <div className="leadership-cards">
                  <div className="leader-card">
                    <img className="leader-avatar" src="https://nublr.karnataka.gov.in/uploads/media_to_upload1710487883.jpg" alt="Sri. Thaawarchand Gehlot" style={{ objectFit: 'cover' }} />
                    <h4>Sri. Thaawarchand Gehlot</h4>
                    <p>Chancellor</p>
                  </div>
                  <div className="leader-card">
                    <img className="leader-avatar" src="https://nublr.karnataka.gov.in/uploads/media_to_upload1710415506.jpeg" alt="Dr. M C Sudhakar" style={{ objectFit: 'cover' }} />
                    <h4>Dr. M C Sudhakar</h4>
                    <p>Pro Chancellor</p>
                  </div>
                  <div className="leader-card">
                    <img className="leader-avatar" src="https://nublr.karnataka.gov.in/uploads/media_to_upload1710414862.jpeg" alt="Dr Mohan Kumar B K" style={{ objectFit: 'cover' }} />
                    <h4>Dr Mohan Kumar B K</h4>
                    <p>Vice Chancellor</p>
                  </div>
               </div>
            </section>

            <section className="events-section" id="events" style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)' }}>
              <h3>Events</h3>
              <div className="events-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                 <div className="event-card" style={{ display: 'flex', gap: '20px', padding: '15px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div className="event-image-placeholder" style={{ width: '80px', height: '80px', background: '#cbd5e1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', fontWeight: '600', fontSize: '14px', flexShrink: 0 }}>News</div>
                    <div className="event-details">
                       <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#1e293b' }}>Mega Placement and Recruitment Drive</h4>
                       <p style={{ margin: '0', fontSize: '14px', color: '#64748b' }}>12 months ago</p>
                    </div>
                 </div>
                 <div className="event-card" style={{ display: 'flex', gap: '20px', padding: '15px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div className="event-image-placeholder" style={{ width: '80px', height: '80px', background: '#cbd5e1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', fontWeight: '600', fontSize: '14px', flexShrink: 0 }}>News</div>
                    <div className="event-details">
                       <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#1e293b' }}>Mega Job Mela 2025</h4>
                       <p style={{ margin: '0', fontSize: '14px', color: '#64748b' }}>12 months ago</p>
                    </div>
                 </div>
                 <div className="event-card" style={{ display: 'flex', gap: '20px', padding: '15px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div className="event-image-placeholder" style={{ width: '80px', height: '80px', background: '#cbd5e1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', fontWeight: '600', fontSize: '14px', flexShrink: 0 }}>News</div>
                    <div className="event-details">
                       <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#1e293b' }}>Nrupakalothsava 2025</h4>
                       <p style={{ margin: '0', fontSize: '14px', color: '#64748b' }}>12 months ago</p>
                    </div>
                 </div>
              </div>
            </section>
         </div>

         {/* RIGHT COLUMN: NOTIFICATIONS */}
         <div className="right-column">
            <section className="notifications-section">
               <h3>Notifications</h3>
               <div className="notifications-list">
                 <ul>
                    <li>Nrupakalothsava 2026</li>
                    <li>Dr Ambedkar Jayanthi Celebrations</li>
                    <li>Pragathi Patha - Mega Job Fair</li>
                    <li>One Day International Conference - ICFMST 2026</li>
                    <li>BSc BEd and BBA Temporary Faculty Call for Application 2025</li>
                    <li>PG FIRST SELECTION LIST 21ST AUGUST 2025</li>
                    <li>PG OMNIBUS LIST 19TH AUGUST 2025</li>
                    <li>Inauguration of New Academic Block</li>
                    <li>Tender Documents - Equipments</li>
                    <li>“One Nation One Subscription (ONOS)” initiative by the Government of India SAGE Publisher</li>
                    <li>Call for Applications for Office Assistants</li>
                    <li>PG Admissions Third List 2025</li>
                    <li>PG OPEN ADMISSIONS FROM 2ND SEPT 2025</li>
                    <li>PG SECOND SELECTION LIST 28TH AUGUST 2025</li>
                    <li>I MSc Classes Commence from 15th September 2025</li>
                    <li>MSc admissions has been extended to Oct 31, 2024, for the 2024-25 academic year.</li>
                    <li>Extension of Admission Deadline for B.Sc-B.Ed Course until 19th October</li>
                    <li>The admissions has been extended to September 30, 2024, for the 2024-25 academic year.</li>
                    <li>Admissions Open for Academic Year 2024-25</li>
                    <li>UG Exams January 2025 Postponed</li>
                    <li>Special Lecture Series</li>
                    <li>Nrupakalothsava 2025</li>
                    <li>BSc BEd Omnibus List 2025</li>
                    <li>Admission Notification for B.Sc., B.Ed (ITEP) - 2024-2025</li>
                    <li>BSc BEd Aspirants - Apply for ITEP - NCTE Exam now</li>
                    <li>Notification for UG & PG Second Year Admission</li>
                    <li>PG BIOTECHNOLOGY II LIST</li>
                    <li>PG ZOOLOGY OMNIBUS LIST</li>
                    <li>Re-Exam Notification</li>
                    <li>PG PHYSICS OMNIBUS LIST</li>
                    <li>PG BIOTECH II OMNIBUS LIST</li>
                    <li>PG MICROBIOLOGY OMNIBUS LIST</li>
                    <li>National Council For Teacher Education</li>
                    <li>PG Admissoins is Open 2024-2025 (New)</li>
                    <li>PG BIOTECHNOLOGY OMNIBUS LIST</li>
                    <li>PG ADM DOCUMENTS</li>
                    <li>Last Date to apply for NCTE - ITEP Exam is extended till 15th May 2024</li>
                    <li>Admissions Opens For New Courses</li>
                    <li>PG BOTANY OMNIBUS LIST</li>
                    <li>Omnibus List for Integrated BSc BEd 2024</li>
                    <li>PG CHEMISTRY OMNIBUS LIST</li>
                    <li>PG OPEN ADMISSIONS</li>
                    <li>PG ADM DOCS INSTRUCTIONS</li>
                    <li>PG SEAT MATRIX 2023 - 2024</li>
                    <li>LAST DATE TO SUBMIT VI SEM MARKS CARD</li>
                    <li>Research Personnel for Short Term ICSSR Project</li>
                    <li>PG Admissoins is Open 2023-2024 (New)</li>
                    <li>PG MATHEMATICS II OMNIBUS LIST</li>
                    <li>PG Notifications 2023-2024</li>
                    <li>PG MATHEMATICS II LIST</li>
                    <li>Hostel Details for BSc BEd students</li>
                    <li>PG Adm Updates</li>
                    <li>Workshop on 'Atal Incubation Centre'</li>
                    <li>B.Sc.-B.Ed. First Selection List</li>
                    <li>PG ADMISSION INSTRUCTIONS</li>
                    <li>PG ADM SUPERNUMERARY WALK IN</li>
                    <li>B.Sc.-B.Ed. OMNI BUS List</li>
                    <li>PG CHEMISTRY FIRST LIST</li>
                    <li>PG ADM SUPERNUMERARY</li>
                    <li>PG Admissions - How to apply</li>
                    <li>PG MICROBIOLOGY FIRST LIST</li>
                    <li>PG Open Admissions II</li>
                    <li>To apply for PG Admission</li>
                    <li>PG MATHEMATICS FIRST LIST</li>
                    <li>PG ADM UPDATES II LIST</li>
                    <li>PG Admissions 2022 2023 Updates</li>
                    <li>B.Sc.-B.Ed. Admissions Open 2023-24</li>
                    <li>PG BIOTECHNOLOGY FIRST LIST</li>
                    <li>PG CHEMISTRY SECOND LIST</li>
                    <li>Students Register Here To Karnataka Skill Connect [Register Before 23-12-22]</li>
                    <li>Information From B.Sc-B.Ed.</li>
                    <li>BIOTECH PENDING DOCS</li>
                    <li>PG MICROBIOLOGY SECOND LIST</li>
                    <li>Training for first Year Girls Student from DELL & AIF (Weekly Schedule)</li>
                    <li>B.Sc-B.Ed Telegram Group</li>
                    <li>PG MATHS OMNIBUS LIST</li>
                    <li>PG MICROBIOLOGY OMNIBUS</li>
                 </ul>
                 
                 <div className="additional-links" style={{marginTop: '20px', padding: '0 16px'}}>
                   <h4 style={{color: '#1e293b', marginBottom: '10px'}}>Related Links</h4>
                   <ul style={{listStyleType: 'disc', paddingLeft: '20px'}}>
                     <li style={{borderBottom: 'none', padding: '4px 0', cursor: 'pointer', color: '#2563eb'}}>Government Orders, Circulars & Downloads</li>
                     <li style={{borderBottom: 'none', padding: '4px 0', cursor: 'pointer', color: '#2563eb'}}>University Orders</li>
                     <li style={{borderBottom: 'none', padding: '4px 0', cursor: 'pointer', color: '#2563eb'}}>UGC</li>
                     <li style={{borderBottom: 'none', padding: '4px 0', cursor: 'pointer', color: '#2563eb'}}>Related Websites</li>
                     <li style={{borderBottom: 'none', padding: '4px 0', cursor: 'pointer', color: '#2563eb'}}>In Focus</li>
                   </ul>
                 </div>
               </div>
            </section>
         </div>
      </div>

    </div>
  );
}

export default Home;