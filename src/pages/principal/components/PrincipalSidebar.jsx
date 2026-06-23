import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
    FaThLarge, FaUsers, FaUserTie, FaCalendarCheck, 
    FaGraduationCap, FaFileAlt, FaChartBar, 
    FaExclamationTriangle, FaBell, FaCog, 
    FaSignOutAlt, FaUniversity, FaComments
} from 'react-icons/fa';

import nrupathungaLogo from '../../../assets/nrupathunga_logo.png';

export default function PrincipalSidebar({ collapsed }) {
    const navigate = useNavigate();

    const menuItems = [
        { label: "Dashboard", path: "/principal/dashboard", icon: <FaThLarge /> },
        { label: "Students", path: "/principal/students", icon: <FaUsers /> },
        { label: "Attendance", path: "/principal/attendance", icon: <FaCalendarCheck /> },
        { label: "Examinations", path: "/principal/exams", icon: <FaGraduationCap /> },

        { label: "Reports", path: "/principal/reports", icon: <FaChartBar /> },
        { label: "Announcements", path: "/principal/announcements", icon: <FaBell /> },
    ];

    const handleLogout = () => {
        localStorage.removeItem('userName');
        navigate('/login-portal');
    };

    return (
        <aside className={`principal-sidebar ${collapsed ? 'hidden' : ''}`}>
            <div className="sidebar-logo-area" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '30px 25px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <img src={nrupathungaLogo} alt="Nrupathunga Logo" style={{ width: '45px', height: '45px', objectFit: 'contain' }} />
                <div className="logo-text" style={{ display: 'flex', flexDirection: 'column' }}>
                    <h1 style={{ fontSize: '20px', margin: 0, fontWeight: '900', color: '#ffffff', letterSpacing: '0.5px', lineHeight: '1.2' }}>UUCMS</h1>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: '800', letterSpacing: '0.5px' }}>University Unified<br/>Campus Management System</span>
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
