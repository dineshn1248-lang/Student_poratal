import { useState, useEffect } from "react";
import { FaGraduationCap, FaCheckCircle, FaExclamationCircle, FaDownload, FaCalendarAlt, FaHistory, FaRegFileAlt, FaClock } from "react-icons/fa";
import StudentLayout from "./StudentLayout";
import "./Student.css";

export default function StudentExams() {
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    const token = localStorage.getItem("token");
    try {
      const resp = await fetch(`${'https://student-poratal.onrender.com/api'}/student/exams`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const d = await resp.json();
      if (resp.ok) setExamData(d);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading Exam Portal...</div>;

  return (
    <StudentLayout>
      <div className="std-dashboard-header" style={{ marginBottom: '32px' }}>
         <h1 style={{ fontSize: '20px', fontWeight: '800' }}>Examination Portal</h1>
         <p style={{ color: '#64748b', fontSize: '14px' }}>Register for exams, download hall tickets and view schedules</p>
      </div>

      <div className="std-grid-row">
        {/* LEFT: REGISTRATION & TIMETABLE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
           <div className="std-panel">
              <div className="std-panel-header">
                 <h4>Semester Exam Registration</h4>
                 {examData?.eligible ? 
                  <span style={{ padding: '6px 12px', background: '#ecfdf5', color: '#10b981', borderRadius: '20px', fontSize: '12px', fontWeight: '800' }}>ELIGIBLE</span> :
                  <span style={{ padding: '6px 12px', background: '#fff1f2', color: '#f43f5e', borderRadius: '20px', fontSize: '12px', fontWeight: '800' }}>NOT ELIGIBLE</span>
                 }
              </div>
              
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                 <div style={{ width: '60px', height: '60px', background: 'white', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#4f46e5', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                    <FaRegFileAlt />
                 </div>
                 <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '800' }}>June 2026 Semester Examination</div>
                    <div style={{ fontSize: '14px', color: '#64748b', marginTop: '2px' }}>Registration Status: <strong>{examData?.registration?.status}</strong></div>
                 </div>
                 <button 
                   disabled={!examData?.eligible}
                   style={{ padding: '12px 24px', background: examData?.eligible ? '#4f46e5' : '#cbd5e1', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: examData?.eligible ? 'pointer' : 'not-allowed' }}
                 >
                    Register Now
                 </button>
              </div>
              
              {!examData?.eligible && (
                 <div style={{ marginTop: '20px', display: 'flex', gap: '12px', background: '#fff1f2', padding: '16px', borderRadius: '12px', border: '1px solid #fecdd3' }}>
                    <FaExclamationCircle color="#ef4444" style={{ marginTop: '3px' }} />
                    <div>
                       <div style={{ fontSize: '14px', fontWeight: '800', color: '#991b1b' }}>Registration Blocked</div>
                       <div style={{ fontSize: '12px', color: '#b91c1c' }}>Your registration is blocked due to low attendance. Please contact your HOD for special approval.</div>
                    </div>
                 </div>
              )}
           </div>

           <div className="std-panel">
              <div className="std-panel-header"><h4>Exam Timetable</h4></div>
              <div className="std-table-container">
                 <table className="std-table">
                    <thead>
                       <tr>
                          <th>Date</th>
                          <th>Subject</th>
                          <th>Session</th>
                          <th>Status</th>
                       </tr>
                    </thead>
                    <tbody>
                       {examData?.timetable.map((t, i) => (
                          <tr key={i}>
                             <td style={{ fontWeight: '700' }}><FaCalendarAlt color="#94a3b8" /> {t.date}</td>
                             <td style={{ fontWeight: '700' }}>{t.subject}</td>
                             <td><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaClock color="#94a3b8" /> {t.session}</div></td>
                             <td><span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>SCHEDULED</span></td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        {/* RIGHT: HALL TICKET & TOOLS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
           <div className="std-panel" style={{ textAlign: 'center' }}>
              <div className="std-panel-header"><h4>Hall Ticket</h4></div>
              <div style={{ padding: '24px 0' }}>
                 <FaGraduationCap size={64} color="#e2e8f0" />
                 <div style={{ marginTop: '20px' }}>
                    <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>Current Status</div>
                    <div style={{ fontSize: '14px', fontWeight: '800', marginTop: '4px' }}>{examData?.hall_ticket}</div>
                 </div>
              </div>
              <button 
                disabled={examData?.hall_ticket !== 'Ready'}
                style={{ width: '100%', padding: '14px', background: examData?.hall_ticket === 'Ready' ? '#4f46e5' : '#f1f5f9', color: examData?.hall_ticket === 'Ready' ? 'white' : '#94a3b8', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: examData?.hall_ticket === 'Ready' ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              >
                 <FaDownload /> Download PDF
              </button>
           </div>

           <div className="std-panel">
              <div className="std-panel-header"><h4>Examination Tools</h4></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                 <button style={{ padding: '14px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '12px', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5' }}><FaHistory /></div>
                    <span style={{ fontSize: '14px', fontWeight: '700' }}>Previous Year Papers</span>
                 </button>
                 <button style={{ padding: '14px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '12px', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5' }}><FaRegFileAlt /></div>
                    <span style={{ fontSize: '14px', fontWeight: '700' }}>Apply for Revaluation</span>
                 </button>
                 <button style={{ padding: '14px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '12px', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5' }}><FaExclamationCircle /></div>
                    <span style={{ fontSize: '14px', fontWeight: '700' }}>Special Approval Form</span>
                 </button>
              </div>
           </div>
        </div>
      </div>
    </StudentLayout>
  );
}
