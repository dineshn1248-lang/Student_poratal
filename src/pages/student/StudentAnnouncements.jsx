import { useState, useEffect } from "react";
import { FaBell, FaCalendarAlt, FaFilter, FaSearch, FaChevronRight, FaExclamationCircle } from "react-icons/fa";
import StudentLayout from "./StudentLayout";
import "./Student.css";

export default function StudentAnnouncements() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    const token = localStorage.getItem("token");
    try {
      const resp = await fetch("http://localhost:5000/api/student/announcements", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const d = await resp.json();
      if (resp.ok) setNotices(d);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filteredNotices = filter === "All" 
    ? notices 
    : notices.filter(n => n.category === filter);

  if (loading) return <div>Loading Notices...</div>;

  return (
    <StudentLayout>
      <div className="std-dashboard-header" style={{ marginBottom: '32px' }}>
         <h1 style={{ fontSize: '20px', fontWeight: '800' }}>Academic Notices</h1>
         <p style={{ color: '#64748b', fontSize: '14px' }}>Stay updated with the latest university announcements and alerts</p>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
         <div style={{ flex: 1, position: 'relative' }}>
            <FaSearch style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search announcements..." 
              style={{ width: '100%', padding: '12px 12px 12px 48px', borderRadius: '12px', border: '1px solid #f1f5f9', background: 'white', outline: 'none' }}
            />
         </div>
         <div style={{ display: 'flex', gap: '10px' }}>
            {["All", "Academic", "Examination", "Fee", "Event"].map(cat => (
               <button 
                 key={cat}
                 onClick={() => setFilter(cat)}
                 style={{ 
                   padding: '10px 20px', borderRadius: '12px', border: 'none', 
                   background: filter === cat ? '#4f46e5' : 'white',
                   color: filter === cat ? 'white' : '#64748b',
                   fontWeight: '700', fontSize: '14px', cursor: 'pointer',
                   boxShadow: filter === cat ? '0 4px 6px rgba(79, 70, 229, 0.2)' : 'none'
                 }}
               >
                  {cat}
               </button>
            ))}
         </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredNotices.length > 0 ? filteredNotices.map((n, i) => (
          <div key={i} className="std-panel" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '24px', display: 'flex', gap: '24px' }}>
               <div style={{ width: '50px', height: '50px', background: '#eef2ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5', flexShrink: 0 }}>
                  <FaBell size={24} />
               </div>
               <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                     <span style={{ padding: '4px 10px', background: '#f1f5f9', color: '#4f46e5', borderRadius: '20px', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase' }}>
                        {n.category}
                     </span>
                     <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '600' }}>
                        <FaCalendarAlt style={{ marginRight: '6px' }} /> {n.date}
                     </span>
                  </div>
                  <h4 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '12px' }}>{n.title}</h4>
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>{n.content}</p>
                  <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                     <button style={{ padding: '8px 16px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Read Full Details</button>
                     <button style={{ padding: '8px 16px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Download Attachment</button>
                  </div>
               </div>
            </div>
          </div>
        )) : (
          <div className="std-panel" style={{ textAlign: 'center', padding: '48px' }}>
             <FaExclamationCircle size={48} color="#cbd5e1" style={{ marginBottom: '16px' }} />
             <h3 style={{ color: '#64748b' }}>No announcements found in this category.</h3>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
