import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  FaThLarge, FaCalendarCheck, FaClipboardList, FaGraduationCap,
  FaBell, FaUser, FaSignOutAlt, FaBars, FaChevronDown
} from "react-icons/fa";
import "./Parent.css";
import nrupathungaLogo from "../../assets/nrupathunga_logo.png";

export default function ParentLayout({ title, subtitle }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("userName");
    const storedStudentName = localStorage.getItem("studentName") || "Student";
    if (!token) {
        navigate("/parent-login");
        return;
    }
    setUserName(storedName || `Parent of ${storedStudentName}`);

    if (window.innerWidth <= 1024) {
      setSidebarOpen(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login-portal");
  };

  const handleNavItemClick = () => {
    if (window.innerWidth <= 1024) {
      setSidebarOpen(false);
    }
  };

  const menuItems = [
    { label: "Dashboard", path: "/parent-dashboard", icon: <FaThLarge /> },
    { label: "Attendance", path: "/parent/attendance", icon: <FaCalendarCheck /> },
    { label: "Internal Marks", path: "/parent/internal-marks", icon: <FaClipboardList /> },
    { label: "Results", path: "/parent/results", icon: <FaGraduationCap /> },
    { label: "Notifications", path: "/parent/notifications", icon: <FaBell />, badge: 3 },
    { label: "Profile", path: "/parent/profile", icon: <FaUser /> },
  ];

  return (
    <div className="parent-portal-wrapper">
      <aside className={`parent-sidebar ${!sidebarOpen ? "collapsed" : ""}`}>
        <div className="parent-sidebar-logo">
          <img src={nrupathungaLogo} alt="Logo" className="parent-logo-img" />
          {sidebarOpen && (
            <div className="parent-logo-text">
              <h3>UUCMS</h3>
              <span>NRUPATHUNGA UNIVERSITY</span>
            </div>
          )}
        </div>
        
        {sidebarOpen && <div className="parent-sidebar-heading">PARENT PORTAL</div>}
        
        <ul className="parent-nav-list">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`parent-nav-item ${location.pathname === item.path ? "active" : ""}`}
              onClick={handleNavItemClick}
            >
              <div className="parent-nav-icon">{item.icon}</div>
              <span className="parent-nav-label">{item.label}</span>
              {item.badge && sidebarOpen && (
                <span className="parent-nav-badge">{item.badge}</span>
              )}
            </Link>
          ))}
        </ul>
        
        <div className="parent-sidebar-footer">
          <button className="parent-logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className={`parent-main-content ${!sidebarOpen ? "expanded" : ""}`}>
        <header className="parent-topbar">
          <div className="parent-top-left">
            <button className="parent-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <FaBars />
            </button>
            <div className="parent-page-titles">
              <h2>{title || "Parent Dashboard"}</h2>
              <p>{subtitle || "Monitor your ward's academic progress"}</p>
            </div>
          </div>
          <div className="parent-top-right">
             <div className="parent-top-notification">
               <FaBell size={18} />
               <span className="notification-dot">3</span>
             </div>
             
             <div className="parent-top-profile">
                <div className="parent-avatar">
                   <FaUser />
                </div>
                <div className="parent-profile-info">
                   <span className="parent-name">{userName}</span>
                   <span className="parent-role">Parent</span>
                </div>
                <FaChevronDown size={12} color="#64748b" />
             </div>
          </div>
        </header>
        
        <div className="parent-scroll-area">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
