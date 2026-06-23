import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
    FaThLarge, FaUsers, FaUserTie, FaCalendarCheck, 
    FaGraduationCap, FaFileAlt, FaChartBar, 
    FaExclamationTriangle, FaBell, FaCog, 
    FaSignOutAlt, FaUniversity, FaComments
} from 'react-icons/fa';

import nrupathungaLogo from '../../../assets/nrupathunga_logo.png';

export default function HODSidebar({ collapsed }) {
    const navigate = useNavigate();

    const menuItems = [
        { label: "Dashboard", path: "/hod/dashboard", icon: <FaThLarge /> },
        { label: "Students", path: "/hod/students", icon: <FaUsers /> },
        { label: "Faculty", path: "/hod/faculty", icon: <FaUserTie /> },
        { label: "Attendance", path: "/hod/attendance", icon: <FaCalendarCheck /> },
        { label: "Examinations", path: "/hod/exams", icon: <FaGraduationCap /> },

        { label: "Internal Marks", path: "/hod/internal-marks", icon: <FaFileAlt /> },
        { label: "Reports", path: "/hod/reports", icon: <FaChartBar /> },
        { label: "Backlog Monitoring", path: "/hod/backlogs", icon: <FaExclamationTriangle /> },
        { label: "Parent Comm", path: "/hod/parent-communication", icon: <FaComments /> },
        { label: "Announcements", path: "/hod/announcements", icon: <FaBell /> },
    ];

    const handleLogout = () => {
        localStorage.removeItem('userName');
        navigate('/login-portal');
    };

    return (
        <aside className={`hod-sidebar ${collapsed ? 'hidden' : ''}`}>
            <div className="sidebar-logo-area" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '30px 25px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="logo-circle">
                   <FaUniversity />
                </div>
                <div className="logo-text" style={{ display: 'flex', flexDirection: 'column' }}>
                    <h1 style={{ fontSize: '18px', margin: 0, fontWeight: '900', color: '#ffffff', letterSpacing: '0.5px', lineHeight: '1.2' }}>UUCMS</h1>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: '800', letterSpacing: '0.5px' }}>NRUPATHUNGA UNIV</span>
                </div>
            </div>

            <div className="sidebar-menu-title">MENU</div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <NavLink 
                        key={item.label} 
                        to={item.path} 
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <div className="icon">{item.icon}</div>
                        <span className="label">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="logout-btn" onClick={handleLogout}>
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
