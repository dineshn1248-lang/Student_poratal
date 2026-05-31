import React from 'react';
import { FaBars, FaCalendarAlt, FaBell, FaChevronDown } from 'react-icons/fa';

export default function HODNavbar({ onToggleSidebar }) {
    const today = new Date().toLocaleDateString('en-US', { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });

    return (
        <header className="hod-top-navbar">
            <div className="nav-left">
                <button className="hamburger" onClick={onToggleSidebar}>
                    <FaBars />
                </button>
                <div className="title-group">
                    <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>Nrupathunga University</h2>
                    <p style={{ fontSize: '14px', color: '#64748b', fontWeight: '700', margin: '4px 0 0' }}>Dr. K. Ramesh • HOD - Computer Applications</p>
                </div>
            </div>

            <div className="nav-right">
                <div className="date-card">
                    <FaCalendarAlt />
                    <span>{today}</span>
                </div>
                
                <div className="live-ind">
                    <div className="status-dot"></div>
                    <span>SYSTEM LIVE</span>
                </div>

                <div className="nav-icon-btn">
                    <FaBell />
                    <div className="icon-badge">3</div>
                </div>

                <div className="profile-group">
                    <img 
                        src="https://ui-avatars.com/api/?name=HOD+Account&background=f1f5f9&color=2563eb&bold=true" 
                        alt="HOD" 
                        className="p-avatar-img" 
                    />
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>HOD Account</span>
                    <FaChevronDown size={10} color="#64748b" />
                </div>
            </div>
        </header>
    );
}
