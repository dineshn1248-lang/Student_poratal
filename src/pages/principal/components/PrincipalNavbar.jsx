import React from 'react';
import { FaBars, FaCalendarAlt, FaBell, FaChevronDown } from 'react-icons/fa';

export default function PrincipalNavbar({ onToggleSidebar }) {
    const today = new Date().toLocaleDateString('en-US', { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });

    return (
        <header className="principal-top-navbar">
            <div className="nav-left">
                <button className="hamburger" onClick={onToggleSidebar}>
                    <FaBars />
                </button>
                <div className="title-group">
                    <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>Nrupathunga University</h2>
                    <p style={{ fontSize: '14px', color: '#64748b', fontWeight: '700', margin: '4px 0 0' }}>Dr. K. Ramesh • Principal - Computer Applications</p>
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
                        src="https://ui-avatars.com/api/?name=Principal+Account&background=f1f5f9&color=2563eb&bold=true" 
                        alt="Principal" 
                        className="p-avatar-img" 
                    />
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>Principal Account</span>
                    <FaChevronDown size={10} color="#64748b" />
                </div>
            </div>
        </header>
    );
}
