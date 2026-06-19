import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Download, PhoneCall, GraduationCap, 
  Award, Briefcase, Building2, Calendar, BookOpen, Clock, 
  Users, UserPlus, UploadCloud, FileCheck, CreditCard, CheckCircle2,
  ChevronDown, Landmark, Trophy, FileText, XCircle, HelpCircle,
  Star, Layers, Lightbulb, Globe, Activity, Building
} from 'lucide-react';
import Footer from '../../components/common/Footer';
import QuickActions from '../../components/common/QuickActions';
import admissionQR from '../../assets/admissions_qr.png';

export default function AdmissionsIndex() {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeFaq, setActiveFaq] = useState(-1);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'programs', label: 'Programmes Offered' },
    { id: 'process', label: 'Admission Process' },
    { id: 'scholarships', label: 'Scholarships' },
    { id: 'fee-structure', label: 'Fee Structure' },
    { id: 'eligibility', label: 'Eligibility Criteria' },
    { id: 'dates', label: 'Important Dates' },
    { id: 'documents', label: 'Required Documents' },
    { id: 'cancellation', label: 'Cancellation Policy' },
    { id: 'faqs', label: 'FAQs' }
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <h2 style={{ fontSize: '36px', color: '#60a5fa', marginBottom: '20px' }}>Admissions Overview</h2>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', marginBottom: '40px', alignItems: 'center' }}>
              <div style={{ flex: '1 1 500px' }}>
                <p style={{ fontSize: '18px', color: '#cbd5e1', lineHeight: '1.6', margin: 0 }}>
                  Welcome to the Nrupathunga University Admissions Portal. We are dedicated to finding the brightest minds and fostering their growth in a world-class environment. Explore our programs, understand the process, and take the first step towards a brilliant future.
                </p>
              </div>
              <div style={{ flex: '0 0 auto', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', color: 'white', marginBottom: '15px' }}>Scan to Apply</h3>
                <img src={admissionQR} alt="Admission QR Code" style={{ width: '450px', height: 'auto', borderRadius: '12px', display: 'block', margin: '0 auto' }} />
              </div>
            </div>

            <h3 style={{ fontSize: '24px', color: 'white', marginBottom: '20px' }}>10 Great Reasons to Study at Nrupathunga University</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '30px' }}>
              {[
                { icon: <GraduationCap size={32} color="#60a5fa" />, title: '40+', subtitle: 'Programs Offered' },
                { icon: <Award size={32} color="#34d399" />, title: '100%', subtitle: 'Scholarships Available' },
                { icon: <Briefcase size={32} color="#f472b6" />, title: 'Top 50', subtitle: 'Placement Support' },
                { icon: <Building2 size={32} color="#fbbf24" />, title: '200+', subtitle: 'Industry Partnerships' }
              ].map((stat, i) => (
                <div key={i} style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '30px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>{stat.icon}</div>
                  <h3 style={{ fontSize: '32px', fontWeight: '800', color: 'white', margin: '0 0 5px 0' }}>{stat.title}</h3>
                  <p style={{ color: '#94a3b8', margin: 0, fontWeight: '500' }}>{stat.subtitle}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
              {[
                { text: "NU's legacy of academic excellence", icon: <Award size={40} color="#fbbf24" strokeWidth={1.5} /> },
                { text: "Outstanding faculty", icon: <Star size={40} color="#fbbf24" strokeWidth={1.5} /> },
                { text: "Cutting-edge curriculum and interdisciplinary learning", icon: <BookOpen size={40} color="#fbbf24" strokeWidth={1.5} /> },
                { text: "Range of majors and minors to choose from", icon: <Layers size={40} color="#fbbf24" strokeWidth={1.5} /> },
                { text: "Focus on entrepreneurship, innovation and research", icon: <Lightbulb size={40} color="#fbbf24" strokeWidth={1.5} /> },
                { text: "Strong network of 8 lakhs+ NU alumni worldwide", icon: <Users size={40} color="#fbbf24" strokeWidth={1.5} /> },
                { text: "Student exchange programme", icon: <Globe size={40} color="#fbbf24" strokeWidth={1.5} /> },
                { text: "Vibrant academic environment", icon: <GraduationCap size={40} color="#fbbf24" strokeWidth={1.5} /> },
                { text: "Active student clubs and rich campus life", icon: <Activity size={40} color="#fbbf24" strokeWidth={1.5} /> },
                { text: "Experience the vibrant city of Bangalore and our autonomous institution status", icon: <Building size={40} color="#fbbf24" strokeWidth={1.5} /> }
              ].map((reason, i) => (
                <div key={i} style={{ 
                  background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid rgba(251, 191, 36, 0.5)', 
                  borderRadius: '16px', 
                  padding: '30px 15px', 
                  textAlign: 'center', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'flex-start',
                  gap: '20px',
                  minHeight: '220px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ padding: '0', background: 'transparent' }}>
                    {reason.icon}
                  </div>
                  <span style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.5' }}>{reason.text}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '50px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '20px', padding: '30px' }}>
              <h3 style={{ fontSize: '24px', color: 'white', marginBottom: '20px' }}>Important Links</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                <a href="https://www.facebook.com/nrupathungauniversityblr" target="_blank" rel="noreferrer" style={{ color: '#93c5fd', textDecoration: 'none', background: 'rgba(0,0,0,0.2)', padding: '10px 20px', borderRadius: '10px' }}>Facebook</a>
                <a href="https://www.instagram.com/nrupathunga_university_blr" target="_blank" rel="noreferrer" style={{ color: '#93c5fd', textDecoration: 'none', background: 'rgba(0,0,0,0.2)', padding: '10px 20px', borderRadius: '10px' }}>Instagram</a>
                <a href="https://x.com/NU_blr" target="_blank" rel="noreferrer" style={{ color: '#93c5fd', textDecoration: 'none', background: 'rgba(0,0,0,0.2)', padding: '10px 20px', borderRadius: '10px' }}>X (Twitter)</a>
                <a href="https://nublr.karnataka.gov.in/37/_gallery_/kn" target="_blank" rel="noreferrer" style={{ color: '#93c5fd', textDecoration: 'none', background: 'rgba(0,0,0,0.2)', padding: '10px 20px', borderRadius: '10px' }}>Gallery</a>
              </div>
            </div>
          </motion.div>
        );
      case 'programs':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <h2 style={{ fontSize: '36px', color: '#60a5fa', marginBottom: '30px' }}>Programmes Offered</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
              
              {/* B.Sc */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <h2 style={{ fontSize: '28px', color: 'white', margin: 0 }}>Bachelor of Science (B.Sc.)</h2>
                  <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '5px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>UG</span>
                </div>
                <div style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.6' }}>
                  <p><strong style={{color:'#60a5fa'}}>Combinations:</strong> Physics, Mathematics, Statistics (PMST) | Physics, Chemistry, Mathematics(PCM) | Physics, Mathematics, Electronics (PME) | Computer Science, Mathematics, Statistics (CSMST) | Physics, Mathematics, Geology (PMG) | Mathematics, Geology, Computer Science(MGCS) | Electronics, Mathematics, Computer Science(EMCS) | Physics, Mathematics, Computer Science (PMCS) | Chemistry, Botany, Zoology (CBZ) | Chemistry, Botany, Microbiology (CBMI) | Chemistry, Zoology, Microbiology (CZMI) | Biochemistry, Zoology, Genetics(BCZGT) | Chemistry, Botany, Biotechnology (CBBT) | Chemistry, Zoology, Biotechnology (CZBT) | Biochemistry, Botany, Microbiology(BcBMI)</p>
                  <p><strong style={{color:'#f472b6'}}>Eligibility:</strong> 50% in 10+2 / PUC / Equivalent Examination in Science (Biology for Life Science / Mathematics for Physical Science)</p>
                </div>
              </div>

              {/* ITEP */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <h2 style={{ fontSize: '24px', color: 'white', margin: 0 }}>4 Year Integrated Teacher Education Programme - B.Sc. B.Ed. (ITEP)</h2>
                  <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '5px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>UG</span>
                </div>
                <div style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.6' }}>
                  <p><strong style={{color:'#60a5fa'}}>Major / Minor Available:</strong> Maths / Physics / Chemistry / Botany / Zoology</p>
                  <p><strong style={{color:'#f472b6'}}>Eligibility:</strong> 50% in 10+2 / Equivalent Examination in Science and Pass in ITEP Exam conducted by National Council for Teacher Education (NCTE). <a href="https://ncte.gov.in/itep/login.aspx" style={{color:'#93c5fd'}} target="_blank" rel="noreferrer">Visit NCTE for details</a></p>
                </div>
              </div>

              {/* BBA */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <h2 style={{ fontSize: '24px', color: 'white', margin: 0 }}>Apprenticeship Based Bachelor of Business Administration (B.B.A.)</h2>
                  <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '5px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>UG</span>
                </div>
                <div style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.6' }}>
                  <p><strong style={{color:'#60a5fa'}}>Details:</strong> In Aviation Services and Air Cargo with stipend in Final Year</p>
                  <p><strong style={{color:'#f472b6'}}>Eligibility:</strong> 50% in 10+2 / Equivalent Examination in Arts / Commerce / Science</p>
                </div>
              </div>

              {/* BCA */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <h2 style={{ fontSize: '24px', color: 'white', margin: 0 }}>Bachelor of Computer Application (B.C.A.)</h2>
                  <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '5px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>UG</span>
                </div>
                <div style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.6' }}>
                  <p><strong style={{color:'#60a5fa'}}>Specializations:</strong> General B.C.A. | B.C.A. with Artificial Intelligence and Machine Learning (AI & ML) | B.C.A. with Data Science (DS)</p>
                  <p><strong style={{color:'#f472b6'}}>Eligibility:</strong> 60% and above in 10+2 / Equivalent Examination in Science (with Mathematics)</p>
                </div>
              </div>

              {/* MSc */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <h2 style={{ fontSize: '24px', color: 'white', margin: 0 }}>Master of Science (M.Sc.)</h2>
                  <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '5px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>PG</span>
                </div>
                <div style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.6' }}>
                  <p><strong style={{color:'#60a5fa'}}>Subjects:</strong> Botany | Biotechnology | Chemistry | Mathematics | Microbiology | Physics | Zoology</p>
                  <p><strong style={{color:'#f472b6'}}>Eligibility:</strong> 60% in B.Sc. (in the respective subject)</p>
                </div>
              </div>

              {/* MCA */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <h2 style={{ fontSize: '24px', color: 'white', margin: 0 }}>Master of Computer Application (M.C.A.)</h2>
                  <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '5px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>PG</span>
                </div>
                <div style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.6' }}>
                  <p><strong style={{color:'#f472b6'}}>Eligibility:</strong> 60% and above in B.Sc. (Computer Science) / BCA</p>
                </div>
              </div>

            </div>
          </motion.div>
        );
      case 'process':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <h2 style={{ fontSize: '36px', color: '#60a5fa', marginBottom: '30px' }}>Admission Process</h2>
            <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ position: 'absolute', left: '40px', top: '0', bottom: '0', width: '2px', background: 'rgba(59, 130, 246, 0.2)' }} />
              {[
                { icon: <UserPlus size={24} />, title: "Step 1: Registration", desc: "Create an account on the admission portal and fill out the basic profile details." },
                { icon: <UploadCloud size={24} />, title: "Step 2: Document Upload", desc: "Scan and upload your academic transcripts, ID proof, and photographs." },
                { icon: <FileCheck size={24} />, title: "Step 3: Verification", desc: "Our admissions team will verify your documents and eligibility within 48 hours." },
                { icon: <CreditCard size={24} />, title: "Step 4: Fee Payment", desc: "Pay the required application or admission fee securely via the portal." },
                { icon: <CheckCircle2 size={24} />, title: "Step 5: Confirmation", desc: "Receive your official admission letter and university ID generation details." }
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '30px', marginBottom: '40px', position: 'relative' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#1e293b', border: '2px solid #3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa', position: 'relative', zIndex: 2, flexShrink: 0 }}>
                    {step.icon}
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '25px', flex: 1 }}>
                    <h3 style={{ fontSize: '20px', color: 'white', margin: '0 0 10px 0' }}>{step.title}</h3>
                    <p style={{ fontSize: '15px', color: '#cbd5e1', margin: 0 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'scholarships':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <h2 style={{ fontSize: '36px', color: '#60a5fa', marginBottom: '30px' }}>Scholarships & Financial Support</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
              {[
                { icon: <Award size={32} />, color: '#60a5fa', title: 'Merit Scholarship', desc: 'Up to 100% tuition waiver for 95%+ scorers.' },
                { icon: <Landmark size={32} />, color: '#fbbf24', title: 'Govt Scholarships', desc: 'Assistance for SC/ST/OBC as per state norms.' },
                { icon: <Trophy size={32} />, color: '#34d399', title: 'Sports Quota', desc: 'Concessions for state/national level athletes.' }
              ].map((schol, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '30px', textAlign: 'center' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '15px', background: `${schol.color}15`, color: schol.color, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    {schol.icon}
                  </div>
                  <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '10px' }}>{schol.title}</h3>
                  <p style={{ fontSize: '14px', color: '#cbd5e1', margin: 0 }}>{schol.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'fee-structure':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <h2 style={{ fontSize: '36px', color: '#60a5fa', marginBottom: '30px' }}>Fee Structure</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
              <div style={{ flex: '1 1 400px', background: 'linear-gradient(145deg, #1e293b, #0f172a)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '30px' }}>
                <h3 style={{ color: 'white', fontSize: '24px', marginBottom: '20px' }}>Undergraduate Courses</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}><span>Application Fee</span> <strong style={{color:'white'}}>₹500</strong></li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}><span>Tuition Fee (Per Sem)</span> <strong style={{color:'white'}}>₹25,000 - ₹45,000</strong></li>
                  <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Lab / IT Fee</span> <strong style={{color:'white'}}>₹5,000</strong></li>
                </ul>
              </div>
              <div style={{ flex: '1 1 400px', background: 'linear-gradient(145deg, #1e293b, #0f172a)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '30px' }}>
                <h3 style={{ color: 'white', fontSize: '24px', marginBottom: '20px' }}>Postgraduate Courses</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}><span>Application Fee</span> <strong style={{color:'white'}}>₹800</strong></li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}><span>Tuition Fee (Per Sem)</span> <strong style={{color:'white'}}>₹40,000 - ₹65,000</strong></li>
                  <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Research / Lab Fee</span> <strong style={{color:'white'}}>₹10,000</strong></li>
                </ul>
              </div>
            </div>
          </motion.div>
        );
      case 'eligibility':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <h2 style={{ fontSize: '36px', color: '#60a5fa', marginBottom: '30px' }}>Eligibility Criteria</h2>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h3 style={{ color: 'white', fontSize: '20px', marginBottom: '10px' }}>B.Sc. Programmes</h3>
                <p style={{ color: '#cbd5e1', margin: 0 }}>50% in 10+2 / PUC / Equivalent Examination in Science (Biology for Life Science / Mathematics for Physical Science).</p>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                <h3 style={{ color: 'white', fontSize: '20px', marginBottom: '10px' }}>B.Sc. B.Ed. (ITEP)</h3>
                <p style={{ color: '#cbd5e1', margin: 0 }}>50% in 10+2 / Equivalent Examination in Science and Pass in ITEP Exam conducted by NCTE.</p>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                <h3 style={{ color: 'white', fontSize: '20px', marginBottom: '10px' }}>B.B.A. (Aviation)</h3>
                <p style={{ color: '#cbd5e1', margin: 0 }}>50% in 10+2 / Equivalent Examination in Arts / Commerce / Science.</p>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                <h3 style={{ color: 'white', fontSize: '20px', marginBottom: '10px' }}>B.C.A. (Gen / AI&ML / DS)</h3>
                <p style={{ color: '#cbd5e1', margin: 0 }}>60% and above in 10+2 / Equivalent Examination in Science (with Mathematics).</p>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                <h3 style={{ color: 'white', fontSize: '20px', marginBottom: '10px' }}>M.Sc. Programmes</h3>
                <p style={{ color: '#cbd5e1', margin: 0 }}>60% in B.Sc. (in the respective subject).</p>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                <h3 style={{ color: 'white', fontSize: '20px', marginBottom: '10px' }}>M.C.A.</h3>
                <p style={{ color: '#cbd5e1', margin: 0 }}>60% and above in B.Sc. (Computer Science) / BCA.</p>
              </div>
            </div>
          </motion.div>
        );
      case 'dates':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <h2 style={{ fontSize: '36px', color: '#60a5fa', marginBottom: '30px' }}>Important Dates</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '800px' }}>
              {[
                { date: 'May 15, 2026', event: 'Online Application Portal Opens' },
                { date: 'June 30, 2026', event: 'Last Date to Submit Applications' },
                { date: 'July 15, 2026', event: 'First Merit List Announcement' },
                { date: 'August 01, 2026', event: 'Orientation & Classes Begin' }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '20px', gap: '20px' }}>
                  <div style={{ minWidth: '120px', borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '15px', color: '#fbbf24', fontWeight: '700' }}>
                    {item.date}
                  </div>
                  <div style={{ flex: 1, color: 'white' }}>
                    {item.event}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'documents':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <h2 style={{ fontSize: '36px', color: '#60a5fa', marginBottom: '30px' }}>Required Documents</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
              {['SSLC (10th) Marks Card', 'PUC (12th) Marks Card', 'Transfer Certificate (TC)', 'Migration Certificate', 'Aadhaar Card Copy', 'Passport Size Photos', 'Caste/Income Certificate', 'Medical Certificate'].map((doc, i) => (
                <div key={i} style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#93c5fd', padding: '10px 20px', borderRadius: '30px', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={14} /> {doc}
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'cancellation':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <h2 style={{ fontSize: '36px', color: '#60a5fa', marginBottom: '30px' }}>Cancellation & Refund Policy</h2>
            <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '24px', padding: '30px', maxWidth: '800px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px', color: '#f87171' }}>
                <XCircle size={28} /> <h3 style={{ margin: 0, fontSize: '20px' }}>Refund Guidelines</h3>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
                Admissions cancellations are processed as per standard UGC norms. A full refund (minus a ₹1,000 processing fee) is applicable if the withdrawal is requested 15 days before the formally notified last date of admission. Refunds take 14-21 working days to process into the original payment method.
              </p>
            </div>
          </motion.div>
        );
      case 'faqs':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <h2 style={{ fontSize: '36px', color: '#60a5fa', marginBottom: '30px' }}>Frequently Asked Questions</h2>
            <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {[
                { q: "Is there an entrance exam for UG programs?", a: "Most of our Undergraduate programs are strictly merit-based, relying on your 10+2 scores." },
                { q: "Can I apply for multiple programs at once?", a: "Yes, you can apply for multiple programs by submitting separate application forms and paying the respective application fees." },
                { q: "Are there hostel facilities available?", a: "Yes, we provide separate hostel facilities for boys and girls with modern amenities, Wi-Fi, and 24/7 security." }
              ].map((faq, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', overflow: 'hidden' }}>
                  <button 
                    onClick={() => setActiveFaq(activeFaq === i ? -1 : i)}
                    style={{ width: '100%', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'transparent', border: 'none', color: 'white', fontSize: '16px', fontWeight: '600', cursor: 'pointer', textAlign: 'left' }}
                  >
                    {faq.q}
                    <motion.div animate={{ rotate: activeFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown size={20} color="#60a5fa" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                        <div style={{ padding: '0 20px 20px', color: '#cbd5e1', fontSize: '15px', lineHeight: '1.6' }}>
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', overflowX: 'hidden' }}>
      <QuickActions />

      {/* Hero Section */}
      <section style={{ 
        padding: '120px 20px 80px', 
        background: 'linear-gradient(to bottom, rgba(15,23,42,0.6), #0f172a), url("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover', backgroundPosition: 'center', textAlign: 'center'
      }}>
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', padding: '8px 16px', background: 'rgba(59, 130, 246, 0.2)', color: '#93c5fd', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
            Home › Admissions
          </div>
          <h1 style={{ fontSize: '56px', fontWeight: '900', marginBottom: '20px', background: 'linear-gradient(to right, #ffffff, #93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Admissions Portal
          </h1>
          <p style={{ fontSize: '20px', color: '#cbd5e1', lineHeight: '1.6' }}>
            Your journey to academic excellence begins here.
          </p>
        </motion.div>
      </section>

      {/* Horizontal Sticky Tab Navigation */}
      <div style={{ 
        position: 'sticky', top: 0, zIndex: 50, 
        background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '15px 0', overflowX: 'auto', whiteSpace: 'nowrap', WebkitOverflowScrolling: 'touch',
        display: 'flex', justifyContent: 'center'
      }}>
        <div style={{ display: 'flex', gap: '15px', padding: '0 20px' }}>
          {tabs.map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              style={{ 
                color: activeTab === tab.id ? '#ffffff' : '#94a3b8', 
                textDecoration: 'none', fontSize: '15px', fontWeight: '600', 
                padding: '10px 20px', borderRadius: '30px', 
                background: activeTab === tab.id ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: activeTab === tab.id ? '0 4px 15px rgba(59, 130, 246, 0.4)' : 'none'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px 100px' }}>
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
