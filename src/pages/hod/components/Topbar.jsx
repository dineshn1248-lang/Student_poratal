import React from 'react';
import { FaBars, FaBell, FaCalendarAlt, FaUserCircle, FaCaretDown } from 'react-icons/fa';

export default function Topbar({ toggleSidebar }) {
  return (
    <header className="hod-topbar">
      <div className="top-left">
        <button className="hamburger-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <div className="top-title-group">
          <h2>HOD Dashboard</h2>
          <p>Welcome Dr. K. Ramesh, HOD - Computer Applications</p>
        </div>
      </div>

      <div className="top-right">
        <div className="date-card">
           <FaCalendarAlt />
           <span>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>
        <div className="live-indicator">
           <div className="status-dot"></div>
           Live
        </div>
        <button className="bell-btn" style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', position: 'relative', color: '#64748b' }}>
           <FaBell />
           <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ef4444', color: 'white', fontSize: '12px', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>3</span>
        </button>
        <div className="account-dropdown" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
           <FaUserCircle fontSize="32px" color="#cbd5e1" />
           <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>HOD Account</span>
              <FaCaretDown fontSize="10px" color="#64748b" />
           </div>
        </div>
      </div>
    </header>
  );
}
