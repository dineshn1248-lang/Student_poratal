import React, { useState, useEffect } from 'react';
import { 
  FaUserAlt, FaCalendarAlt, FaTint, FaPhoneAlt, FaEnvelope, 
  FaUserFriends, FaBriefcase, FaMapMarkerAlt, FaGraduationCap,
  FaBook, FaIdCard, FaLock, FaClock, FaInfoCircle, FaShieldAlt,
  FaPen, FaListOl, FaAddressCard, FaKey, FaUserTag
} from 'react-icons/fa';
import './Parent.css';

export default function ParentProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      const resp = await fetch(`${import.meta.env.PROD ? 'https://student-poratal.onrender.com/api' : 'http://localhost:5000/api'}/student/profile`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await resp.json();
      if (resp.ok) {
        setProfile(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '40px', color: '#64748b', fontWeight: '600' }}>Loading Profile...</div>;
  }

  // Fallbacks for missing API data
  const parentName = profile?.parent?.name || "Nisimappa";
  const parentRelation = profile?.parent?.relation || "Father";
  const parentPhone = profile?.parent?.phone || "+91 9380179909";
  const parentEmail = "parent.lakshmi@example.com";
  const parentOccupation = "Teacher";
  const parentAddress = profile?.personal?.address || "12-3-45, Sai Nagar, Ongole, Prakasam District, Andhra Pradesh - 523001";
  
  const emergencyName = "Nisimappa";
  const emergencyRelation = "Father";
  const emergencyPhone = "+91 9380179909";

  const studentName = profile?.personal?.name || "Lakshmi Nisimappa Chakrasali";
  const usn = profile?.personal?.usn || "U24AN23S0245";
  const course = profile?.academic?.course || "BCA";
  const semester = profile?.academic?.semester ? `${profile.academic.semester}th Semester` : "6th Semester";
  const dob = profile?.personal?.dob || "15 Aug 2004";
  const studentPhone = profile?.personal?.phone || "+91 9380179909";
  const studentEmail = profile?.personal?.email || "lakshmi.c@example.com";
  const department = profile?.academic?.department || "Computer Applications";
  const academicYear = "2025 - 26";
  const section = "A";
  const rollNumber = usn.substring(1); // Mocks the roll number removing 'U'

  return (
    <div className="att-dashboard-wrapper">
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>Profile</h2>
        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '14px' }}>View your profile and your ward's information</p>
      </div>

      {/* Top Profile Strip */}
      <div className="prof-top-strip">
        <div className="prof-student-card">
          <div className="prof-avatar-wrapper">
            <img src={profile?.personal?.photo || "https://ui-avatars.com/api/?name=Lakshmi+Chakrasali&background=ef4444&color=fff"} alt="Student" />
            <div className="prof-avatar-badge"><FaUserAlt size={8} /></div>
          </div>
          <div>
            <h3>{studentName}</h3>
            <div className="prof-student-meta">
              <span><FaUserAlt /> Reg No: {usn}</span>
              <span>{course}</span>
              <span>{semester}</span>
              <span>Section {section}</span>
            </div>
          </div>
        </div>

        <div className="prof-quick-info">
          <div className="prof-info-box">
            <div className="prof-info-icon orange"><FaCalendarAlt /></div>
            <div>
              <label>Date of Birth</label>
              <p>{dob}</p>
            </div>
          </div>
          <div className="prof-info-box">
            <div className="prof-info-icon red"><FaTint /></div>
            <div>
              <label>Blood Group</label>
              <p>B+</p>
            </div>
          </div>
          <div className="prof-info-box border-left">
            <div className="prof-contact-row">
              <FaPhoneAlt className="icon" /> <span>{studentPhone}</span>
            </div>
            <div className="prof-contact-row">
              <FaEnvelope className="icon" /> <span>{studentEmail}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="prof-main-grid">
        
        {/* Parent / Guardian Information */}
        <div className="parent-panel">
          <div className="prof-panel-header">
            <h4>Parent / Guardian Information</h4>
            <button className="prof-edit-btn"><FaPen size={10} /> Edit</button>
          </div>
          <div className="prof-details-list">
            <div className="prof-detail-item">
              <div className="prof-detail-label"><FaUserAlt /> Parent Name</div>
              <div className="prof-detail-value">{parentName}</div>
            </div>
            <div className="prof-detail-item">
              <div className="prof-detail-label"><FaUserFriends /> Relation</div>
              <div className="prof-detail-value">{parentRelation}</div>
            </div>
            <div className="prof-detail-item">
              <div className="prof-detail-label"><FaPhoneAlt /> Mobile Number</div>
              <div className="prof-detail-value">{parentPhone}</div>
            </div>
            <div className="prof-detail-item">
              <div className="prof-detail-label"><FaEnvelope /> Email</div>
              <div className="prof-detail-value">{parentEmail}</div>
            </div>
            <div className="prof-detail-item">
              <div className="prof-detail-label"><FaBriefcase /> Occupation</div>
              <div className="prof-detail-value">{parentOccupation}</div>
            </div>
            <div className="prof-detail-item align-start">
              <div className="prof-detail-label mt-1"><FaMapMarkerAlt /> Address</div>
              <div className="prof-detail-value line-height">{parentAddress}</div>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="parent-panel">
          <div className="prof-panel-header">
            <h4>Academic Information</h4>
          </div>
          <div className="prof-details-list">
            <div className="prof-detail-item">
              <div className="prof-detail-label blue"><FaGraduationCap /> Department</div>
              <div className="prof-detail-value">{department}</div>
            </div>
            <div className="prof-detail-item">
              <div className="prof-detail-label blue"><FaBook /> Semester</div>
              <div className="prof-detail-value">{semester}</div>
            </div>
            <div className="prof-detail-item">
              <div className="prof-detail-label blue"><FaCalendarAlt /> Academic Year</div>
              <div className="prof-detail-value">{academicYear}</div>
            </div>
            <div className="prof-detail-item">
              <div className="prof-detail-label blue"><FaListOl /> Section</div>
              <div className="prof-detail-value">{section}</div>
            </div>
            <div className="prof-detail-item">
              <div className="prof-detail-label blue"><FaAddressCard /> Admission No.</div>
              <div className="prof-detail-value">{usn}</div>
            </div>
            <div className="prof-detail-item">
              <div className="prof-detail-label blue"><FaIdCard /> Roll Number</div>
              <div className="prof-detail-value">{rollNumber}</div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="parent-panel" style={{ background: '#fffbeb', borderColor: '#fef08a' }}>
          <div className="prof-panel-header">
            <h4>Emergency Contact</h4>
            <button className="prof-edit-btn"><FaPen size={10} /> Edit</button>
          </div>
          <div className="prof-details-list">
            <div className="prof-detail-item">
              <div className="prof-detail-label orange"><FaUserAlt /> Contact Name</div>
              <div className="prof-detail-value">{emergencyName}</div>
            </div>
            <div className="prof-detail-item">
              <div className="prof-detail-label orange"><FaUserFriends /> Relation</div>
              <div className="prof-detail-value">{emergencyRelation}</div>
            </div>
            <div className="prof-detail-item">
              <div className="prof-detail-label orange"><FaPhoneAlt /> Mobile Number</div>
              <div className="prof-detail-value">{emergencyPhone}</div>
            </div>
            <div className="prof-detail-item align-start">
              <div className="prof-detail-label orange mt-1"><FaMapMarkerAlt /> Address</div>
              <div className="prof-detail-value line-height">{parentAddress}</div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="parent-panel" style={{ background: '#faf5ff', borderColor: '#f3e8ff' }}>
          <div className="prof-panel-header">
            <h4>Account Information</h4>
            <button className="prof-edit-btn"><FaPen size={10} /> Edit</button>
          </div>
          <div className="prof-details-list">
            <div className="prof-detail-item">
              <div className="prof-detail-label purple"><FaUserAlt /> Username</div>
              <div className="prof-detail-value">lakshmi.parent</div>
            </div>
            <div className="prof-detail-item">
              <div className="prof-detail-label purple"><FaEnvelope /> Email</div>
              <div className="prof-detail-value">{parentEmail}</div>
            </div>
            <div className="prof-detail-item">
              <div className="prof-detail-label purple"><FaKey /> Password</div>
              <div className="prof-detail-value" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <span>**********</span>
                <a href="#" style={{ fontSize: '12px', color: '#1d4ed8', textDecoration: 'none', fontWeight: '700' }}>Change Password</a>
              </div>
            </div>
            <div className="prof-detail-item">
              <div className="prof-detail-label purple"><FaUserTag /> Account Type</div>
              <div className="prof-detail-value">Parent</div>
            </div>
            <div className="prof-detail-item">
              <div className="prof-detail-label purple"><FaClock /> Member Since</div>
              <div className="prof-detail-value">10 Jan 2025 <span style={{ marginLeft: '16px', color: '#64748b' }}>11:20 AM</span></div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Banner Note */}
      <div className="prof-footer-note">
        <div className="prof-note-content">
          <div className="prof-note-icon"><FaInfoCircle /></div>
          <div>
            <h4>Important Note</h4>
            <p>Please keep your contact information updated to receive important notifications about your ward's academic progress.</p>
            <p>If you need to update any information, please contact the college office.</p>
          </div>
        </div>
        <div className="prof-note-illustration">
          <FaShieldAlt size={64} color="#3b82f6" />
        </div>
      </div>

    </div>
  );
}
