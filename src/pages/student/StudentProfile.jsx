import { useState, useEffect } from "react";
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaIdCard, FaUniversity, FaVenusMars, FaCalendarAlt, FaTint, FaFileUpload } from "react-icons/fa";
import StudentLayout from "./StudentLayout";
import "./Student.css";

export default function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      const resp = await fetch("http://localhost:5000/api/student/profile", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const d = await resp.json();
      if (resp.ok) setProfile(d);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading Profile...</div>;

  return (
    <StudentLayout>
      <div className="std-dashboard-header" style={{ marginBottom: '32px' }}>
         <h1 style={{ fontSize: '20px', fontWeight: '800' }}>My Profile</h1>
         <p style={{ color: '#64748b', fontSize: '14px' }}>Manage your personal and academic information</p>
      </div>

      <div className="std-grid-row">
        {/* LEFT: PERSONAL INFO */}
        <div className="std-panel">
          <div className="std-panel-header">
            <h4>Personal Details</h4>
            <button style={{ fontSize: '14px', background: '#f1f5f9', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}>Edit Profile</button>
          </div>
          
          <div style={{ display: 'flex', gap: '32px', marginBottom: '32px' }}>
             <div style={{ position: 'relative' }}>
                <div style={{ width: '120px', height: '120px', background: '#eef2ff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5', fontSize: '20px', overflow: 'hidden' }}>
                   {profile?.personal?.photo ? <img src={profile.personal.photo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <FaUser />}
                </div>
                <button style={{ position: 'absolute', bottom: '-10px', right: '-10px', width: '32px', height: '32px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                   <FaFileUpload size={14} />
                </button>
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '800' }}>{profile?.personal?.name}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '14px', fontWeight: '600' }}>
                   <FaIdCard /> {profile?.personal?.usn}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4f46e5', fontSize: '14px', fontWeight: '700', background: '#eef2ff', padding: '4px 10px', borderRadius: '20px', marginTop: '8px', width: 'fit-content' }}>
                   {profile?.academic?.course} • Semester {profile?.academic?.semester}
                </div>
             </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
             <div className="profile-field">
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Date of Birth</label>
                <div style={{ fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <FaCalendarAlt color="#94a3b8" /> {profile?.personal?.dob}
                </div>
             </div>
             <div className="profile-field">
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Gender</label>
                <div style={{ fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <FaVenusMars color="#94a3b8" /> {profile?.personal?.gender}
                </div>
             </div>
             <div className="profile-field">
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Email Address</label>
                <div style={{ fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <FaEnvelope color="#94a3b8" /> {profile?.personal?.email}
                </div>
             </div>
             <div className="profile-field">
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Phone Number</label>
                <div style={{ fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <FaPhone color="#94a3b8" /> +91 {profile?.personal?.phone}
                </div>
             </div>
             <div className="profile-field" style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Residential Address</label>
                <div style={{ fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <FaMapMarkerAlt color="#94a3b8" /> {profile?.personal?.address}
                </div>
             </div>
          </div>
        </div>

        {/* RIGHT: ACADEMIC & PARENT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
           <div className="std-panel">
              <div className="std-panel-header"><h4>Academic Info</h4></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>Department</span>
                    <span style={{ fontSize: '14px', fontWeight: '700' }}>{profile?.academic?.department}</span>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>Admission Year</span>
                    <span style={{ fontSize: '14px', fontWeight: '700' }}>{profile?.academic?.admission_year}</span>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>Batch</span>
                    <span style={{ fontSize: '14px', fontWeight: '700' }}>{profile?.academic?.batch}</span>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
                    <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>Category</span>
                    <span style={{ fontSize: '14px', fontWeight: '700' }}>{profile?.personal?.category}</span>
                 </div>
              </div>
           </div>

           <div className="std-panel">
              <div className="std-panel-header"><h4>Guardian Details</h4></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', background: '#f8fafc', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                       <FaUser />
                    </div>
                    <div>
                       <div style={{ fontSize: '14px', fontWeight: '700' }}>{profile?.parent?.name}</div>
                       <div style={{ fontSize: '12px', color: '#64748b' }}>{profile?.parent?.relation}</div>
                    </div>
                 </div>
                 <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', background: '#f1f5f9', padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaPhone size={12} /> {profile?.parent?.phone}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </StudentLayout>
  );
}
