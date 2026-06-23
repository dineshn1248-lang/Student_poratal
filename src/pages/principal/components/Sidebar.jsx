import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaUsers, FaCalendarCheck, FaExclamationTriangle, FaUserTie, 
  FaGraduationCap, FaFileAlt, FaCog, FaSignOutAlt, FaThLarge, FaBell, 
  FaChartBar, FaUniversity
} from 'react-icons/fa';

export default function Sidebar({ open, toggle }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", path: "/principal/dashboard", icon: <FaThLarge /> },
    { label: "Students", path: "/principal/students", icon: <FaUsers /> },
    { label: "Faculty", path: "/principal/faculty", icon: <FaUserTie /> },
    { label: "Attendance", path: "/principal/attendance", icon: <FaCalendarCheck /> },
    { label: "Examinations", path: "/principal/exams", icon: <FaGraduationCap /> },
    { label: "Internal Marks", path: "/principal/internal-marks", icon: <FaFileAlt /> },
    { label: "Reports", path: "/principal/reports", icon: <FaChartBar /> },
    { label: "Backlog Monitoring", path: "/principal/backlogs", icon: <FaExclamationTriangle /> },
    { label: "Announcements", path: "/principal/announcements", icon: <FaBell /> },
    { label: "Settings", path: "/principal/settings", icon: <FaCog /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userName");
    navigate("/login-portal");
  };

  return (
    <aside className={`principal-sidebar ${open ? "" : "collapsed"}`}>
      <div className="sidebar-brand">
        <h2>{open ? "Principal MENU" : "MENU"}</h2>
      </div>

      <div className="sidebar-nav-container">
        <div className="sidebar-nav-list">
          {menuItems.map((item) => (
            <div 
              key={item.label} 
              className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              <span className="icon">{item.icon}</span>
              {open && <span className="lbl">{item.label}</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
           <FaSignOutAlt /> {open && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
