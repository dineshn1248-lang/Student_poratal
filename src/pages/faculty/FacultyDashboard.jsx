import React, { useState, useEffect, useMemo } from "react";
import { 
  FaThLarge, FaUser, FaUsers, FaCalendarCheck, FaFileAlt, FaTasks, 
  FaClock, FaBullhorn, FaBell, FaSignOutAlt, FaBars, FaChevronRight,
  FaCalendarAlt, FaEnvelope, FaPhone, FaSearch, FaFilter, FaPlus, 
  FaSave, FaCheckCircle, FaTrash, FaPen, FaLock, FaBookOpen, FaChartLine
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip
} from 'recharts';
import WelcomeBanner from '../../components/WelcomeBanner';
import "./Faculty.css";
import AIChat from "../../components/AIChat";

export default function FacultyDashboard() {
  const [open, setOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionSuccess, setActionSuccess] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState({ total_students: 0, passed_students: 0, failed_students: 0 });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);
  
  // Roster state
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentSearch, setStudentSearch] = useState("");
  const [semFilter, setSemFilter] = useState("All");

  // Profile state
  const [profile, setProfile] = useState({
    name: "Dr. Lakshmi Priya",
    email: "lakshmi.priya@nrupathunga.edu.in",
    phone: "9380179909", // Seeded number
    empId: "NUE-2021-3908",
    dept: "Computer Applications",
    designation: "Assistant Professor",
    qualification: "Ph.D. in Computer Science & Engineering",
    experience: "9 Years",
    office: "Block II, Room 204",
    hours: "10:30 AM - 12:30 PM (Mon-Wed)"
  });

  // Dynamic CIE marks & attendance grids
  const [cieMarks, setCieMarks] = useState({});
  const [attStatuses, setAttStatuses] = useState({});
  
  // Assignment state
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Data Structures & Trees Practice Sheet", subject: "Data Structures", due: "20 May 2026", submissions: "16/20", maxMarks: 10 },
    { id: 2, title: "DBMS SQL Subqueries Assignment", subject: "Database Management", due: "24 May 2026", submissions: "12/20", maxMarks: 15 },
    { id: 3, title: "Software Engineering Case Study", subject: "Software Engineering", due: "28 May 2026", submissions: "8/20", maxMarks: 20 }
  ]);
  const [newAssign, setNewAssign] = useState({ title: "", subject: "Data Structures", due: "", maxMarks: 10 });

  // Announcement state
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: "Department Core Committee Meeting", content: "All faculty members are requested to attend the MCA academic council review meeting in the board room.", date: "20 May 2026 • 10:30 AM", type: "Circular" },
    { id: 2, title: "Internal Marks Submission Portal Active", content: "Kindly compile and upload the CIE Continuous Assessment test 1 marks before the upcoming weekend deadline.", date: "18 May 2026 • 04:15 PM", type: "Alert" },
    { id: 3, title: "Final Year Viva-Voce Schedule Released", content: "The practical examination board lists have been uploaded. Please notify respective project batches.", date: "17 May 2026 • 11:00 AM", type: "Notice" }
  ]);
  const [newAnn, setNewAnn] = useState({ title: "", content: "", type: "Notice" });

  const navigate = useNavigate();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    try {
      // Fetch stats
      const statsResp = await fetch(`${import.meta.env.PROD ? 'https://student-poratal.onrender.com/api' : 'http://127.0.0.1:5000/api'}/faculty/reports/stats`);
      if (statsResp.ok) {
        const statsData = await statsResp.json();
        setStats(statsData);
      }
      
      const resp = await fetch(`${import.meta.env.PROD ? 'https://student-poratal.onrender.com/api' : 'http://127.0.0.1:5000/api'}/students`);
      if (resp.ok) {
        const data = await resp.json();
        const normStudents = data.slice(0, 21);
        setStudents(normStudents);
        
        const tempMarks = {};
        const tempAtt = {};
        normStudents.forEach(s => {
          tempMarks[s.id] = 16.5; 
          tempAtt[s.id] = "Present"; 
        });
        setCieMarks(tempMarks);
        setAttStatuses(tempAtt);
      }
    } catch (e) {
      console.error("Failed to load data:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem("userName");
    navigate("/login-portal");
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setActionSuccess("Faculty profile updated successfully!");
    setTimeout(() => setActionSuccess(''), 4000);
  };

  const handleCieChange = (id, value) => {
    let score = parseFloat(value);
    if (isNaN(score)) score = 0;
    if (score < 0) score = 0;
    if (score > 20) score = 20;
    setCieMarks(prev => ({ ...prev, [id]: score }));
  };

  const handleSaveCie = (e) => {
    e.preventDefault();
    setActionSuccess("Continuous Evaluation CIE Marks submitted successfully to HOD portal!");
    setTimeout(() => setActionSuccess(''), 4000);
  };

  const handleSaveAttendance = (e) => {
    e.preventDefault();
    setActionSuccess("Attendance registry logs locked and synced with UUCMS cloud server!");
    setTimeout(() => setActionSuccess(''), 4000);
  };

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    if (!newAssign.title) return;
    setAssignments(prev => [
      ...prev,
      {
        id: Date.now(),
        title: newAssign.title,
        subject: newAssign.subject,
        due: newAssign.due || "30 May 2026",
        submissions: "0/20",
        maxMarks: newAssign.maxMarks
      }
    ]);
    setNewAssign({ title: "", subject: "Data Structures", due: "", maxMarks: 10 });
    setActionSuccess("New assignment task successfully published to student feed!");
    setTimeout(() => setActionSuccess(''), 4000);
  };

  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    if (!newAnn.title || !newAnn.content) return;
    setAnnouncements(prev => [
      {
        id: Date.now(),
        title: newAnn.title,
        content: newAnn.content,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + " • Just Now",
        type: newAnn.type
      },
      ...prev
    ]);
    setNewAnn({ title: "", content: "", type: "Notice" });
    setActionSuccess("Announcement notice compiled and broadcasted to department!");
    setTimeout(() => setActionSuccess(''), 4000);
  };

  // Filters student roster
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(studentSearch.toLowerCase()) || 
                          s.register_no?.toLowerCase().includes(studentSearch.toLowerCase());
      const matchSem = semFilter === "All" || s.semester.toString() === semFilter;
      return matchSearch && matchSem;
    });
  }, [studentSearch, semFilter, students]);

  // Analytics for the attendance chart
  const attendanceChartData = [
    { name: 'Present', value: 16, color: '#10b981' },
    { name: 'Absent', value: 3, color: '#ef4444' },
    { name: 'Leave', value: 1, color: '#f59e0b' }
  ];

  // Curated soft background styles for subjects to make them premium
  const getSubjectStyle = (sub) => {
    if (!sub) return { bg: "#ffffff", color: "#64748b" };
    const upper = sub.toUpperCase();
    if (upper.includes("PHP LAB") || upper.includes("PROJECT")) {
      return { bg: "#ffe4e6", color: "#9f1239", border: "1px dashed #fda4af" };
    }
    if (upper.includes("PHP")) {
      return { bg: "#f3e8ff", color: "#6b21a8", border: "1px solid #d8b4fe" };
    }
    if (upper.includes("DS")) {
      return { bg: "#eff6ff", color: "#1e40af", border: "1px solid #bfdbfe" };
    }
    if (upper.includes("AI")) {
      return { bg: "#ecfdf5", color: "#065f46", border: "1px solid #a7f3d0" };
    }
    if (upper.includes("DM")) {
      return { bg: "#fff7ed", color: "#c2410c", border: "1px solid #ffedd5" };
    }
    if (upper.includes("LR")) {
      return { bg: "#fef3c7", color: "#92400e", border: "1px solid #fde68a" };
    }
    if (upper.includes("PHY EDUC")) {
      return { bg: "#fee2e2", color: "#b91c1c", border: "1px solid #fca5a5" };
    }
    return { bg: "#f8fafc", color: "#334155", border: "1px solid #e2e8f0" };
  };

  return (
    <div className={`faculty-portal ${!open ? "sidebar-collapsed" : ""}`}>
      
      {/* ── SIDEBAR ── */}
      <aside className={`faculty-sidebar ${!open ? "collapsed" : ""}`}>
        <div className="sidebar-main-content">
          <div className="sidebar-logo-area" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '30px 25px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="logo-circle" style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
               <FaBookOpen style={{color: 'white'}} />
            </div>
            <div className="logo-text" style={{ display: 'flex', flexDirection: 'column' }}>
                <h1 style={{ fontSize: '18px', margin: 0, fontWeight: '900', color: '#ffffff', letterSpacing: '0.5px', lineHeight: '1.2' }}>UUCMS</h1>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: '800', letterSpacing: '0.5px' }}>NRUPATHUNGA UNIV</span>
            </div>
          </div>
          
          <div className="sidebar-menu-title" style={{ padding: '20px 25px 10px', fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>MENU</div>

          {/* User mini card in sidebar */}
          {open && (
            <div className="sidebar-user-card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <img 
                src="https://ui-avatars.com/api/?name=Lakshmi+Priya&background=3b82f6&color=fff&bold=true&size=128" 
                alt="avatar" 
                style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2.5px solid #3b82f6' }}
              />
              <div style={{ overflow: 'hidden' }}>
                <span style={{ display: 'block', fontWeight: '850', color: 'white', fontSize: '14px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{profile.name}</span>
                <span style={{ display: 'block', color: '#64748b', fontSize: '12px', fontWeight: '600' }}>{profile.designation}</span>
              </div>
            </div>
          )}

          <nav className="sidebar-nav" style={{ flex: 1, padding: '10px 15px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {[
                { id: "Dashboard", icon: <FaThLarge />, label: "Dashboard" },
                { id: "My Profile", icon: <FaUser />, label: "My Profile" },
                { id: "Students", icon: <FaUsers />, label: "Students" },
                { id: "Attendance", icon: <FaCalendarCheck />, label: "Attendance" },
                { id: "Internal Marks", icon: <FaFileAlt />, label: "Internal Marks" },
                { id: "Assignments", icon: <FaTasks />, label: "Assignments" },
                { id: "Timetable", icon: <FaClock />, label: "Timetable" },
                { id: "Announcements", icon: <FaBullhorn />, label: "Announcements" }
              ].map(item => (
                <div 
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  style={{
                    display: 'flex', alignItems: 'center', padding: '12px 18px', borderRadius: '10px', 
                    color: activeSection === item.id ? 'white' : 'rgba(255,255,255,0.6)', 
                    cursor: 'pointer', transition: 'all 0.2s',
                    background: activeSection === item.id ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : 'transparent',
                    boxShadow: activeSection === item.id ? '0 4px 15px rgba(37, 99, 235, 0.3)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== item.id) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== item.id) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                    }
                  }}
                >
                  <div style={{ fontSize: '18px', width: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.icon}
                  </div>
                  {open && <span style={{ marginLeft: '15px', fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap' }}>{item.label}</span>}
                </div>
              ))}
            </div>
          </nav>
        </div>

        {/* Logout pinned at bottom */}
        <div style={{ padding: '20px 15px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <button onClick={handleLogout} style={{ width: '100%', padding: '12px', background: '#f97316', border: 'none', borderRadius: '10px', color: 'white', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', transition: 'all 0.2s' }}>
            <FaSignOutAlt />
            {open && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTAINER ── */}
      <main className="faculty-main">
        {/* Top Header structured with EXACT classes inside Faculty.css */}
        <header className="main-header" style={{ borderBottom: '1px solid #edf2f7', background: 'white', padding: '0 24px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="menu-toggle" onClick={() => setOpen(!open)} style={{ cursor: 'pointer', outline: 'none' }}>
              <FaBars />
            </button>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '950', color: '#0f172a', margin: 0 }}>{activeSection}</h2>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b', fontWeight: '600' }}>Academic Session: 2025-26 • Odd Sem</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '6px 12px' }}>
                <FaCalendarAlt style={{ color: '#3b82f6' }} />
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a' }}>
                  {currentTime.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', weekday: 'short' })}
                </span>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748b', borderLeft: '1px solid #cbd5e1', paddingLeft: '8px', marginLeft: '4px' }}>
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '800', color: '#10b981', padding: '6px 10px', background: '#ecfdf5', borderRadius: '20px', border: '1px solid #a7f3d0' }}>
                <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 0 3px rgba(16,185,129,0.2)' }}></div>
                System Live
              </div>
            </div>

            <div className="notif-bell" style={{ background: '#f8fafc', width: '40px', height: '40px', borderRadius: '10px', border: '1.5px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
              <FaBell style={{ color: '#64748b' }} />
              <span className="notif-badge" style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ef4444', color: 'white', width: '18px', height: '18px', borderRadius: '50%', fontSize: '12px', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>5</span>
            </div>

            <div className="header-user" style={{ cursor: 'pointer' }} onClick={() => setActiveSection("My Profile")}>
              <div className="user-info">
                <p className="user-name" style={{ margin: 0 }}>{profile.name}</p>
                <p className="user-meta" style={{ margin: 0 }}>{profile.designation}</p>
              </div>
              <div className="user-avatar">{profile.name[0]}</div>
            </div>
          </div>
        </header>

        {/* Dynamic Section Contents */}
        <div style={{ marginTop: '24px' }}>
          {actionSuccess && (
            <div style={{ padding: '16px 20px', background: '#ecfdf5', color: '#065f46', borderRadius: '12px', borderLeft: '5px solid #10b981', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
              <FaCheckCircle /> {actionSuccess}
            </div>
          )}

          {/* ───────────────── TAB: DASHBOARD ───────────────── */}
          {activeSection === "Dashboard" && (
            <>
              {/* Welcome Banner */}
              <WelcomeBanner roleName="Faculty" />

              {/* Stat grid (Balanced 5 columns using stat-cards in Faculty.css) */}
              <div className="stat-cards">
                <div className="stat-card blue" style={{ cursor: 'pointer' }} onClick={() => setActiveSection("Students")}>
                  <div className="card-top">
                    <span className="label">TOTAL STUDENTS</span>
                    <div className="icon"><FaUsers /></div>
                  </div>
                  <h3 className="value">{stats.total_students}</h3>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '750' }}>
                    Passed: {stats.passed_students} | Failed: {stats.failed_students}
                  </span>
                </div>
                <div className="stat-card green" style={{ cursor: 'pointer' }} onClick={() => setActiveSection("Attendance")}>
                  <div className="card-top">
                    <span className="label">ATTENDANCE TODAY</span>
                    <div className="icon"><FaCalendarCheck /></div>
                  </div>
                  <h3 className="value">78%</h3>
                  <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '750' }}>16 Present / 4 Absent</span>
                </div>
                <div className="stat-card orange" style={{ cursor: 'pointer' }} onClick={() => setActiveSection("Internal Marks")}>
                  <div className="card-top">
                    <span className="label">PENDING CIE MARKS</span>
                    <div className="icon"><FaFileAlt /></div>
                  </div>
                  <h3 className="value">23</h3>
                  <span style={{ fontSize: '12px', color: '#ef4444', fontWeight: '750' }}>Marks Logs Pending</span>
                </div>
                <div className="stat-card purple" style={{ cursor: 'pointer' }} onClick={() => setActiveSection("Assignments")}>
                  <div className="card-top">
                    <span className="label">PENDING ASSIGNMENTS</span>
                    <div className="icon"><FaTasks /></div>
                  </div>
                  <h3 className="value">15</h3>
                  <span style={{ fontSize: '12px', color: '#f59e0b', fontWeight: '750' }}>Unreviewed Work</span>
                </div>
                <div className="stat-card teal" style={{ cursor: 'pointer' }} onClick={() => setActiveSection("Timetable")}>
                  <div className="card-top">
                    <span className="label">CLASSES TODAY</span>
                    <div className="icon"><FaClock /></div>
                  </div>
                  <h3 className="value">2</h3>
                  <span style={{ fontSize: '12px', color: '#14b8a6', fontWeight: '750' }}>Scheduled Lectures</span>
                </div>
              </div>

              {/* Split Content Rows (1.5fr 1fr Grid matching Faculty.css) */}
              <div className="content-row">
                {/* Today's Schedule Timeline */}
                <div className="dashboard-section" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div className="section-header">
                    <h3>Today's Schedule</h3>
                    <span className="header-link" style={{ cursor: 'pointer' }} onClick={() => setActiveSection("Timetable")}>View Full Timetable</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, justifyContent: 'center' }}>
                    {[
                      { time: "09:00 AM - 10:00 AM", subject: "PHP Programming", class: "VI BCA - Sec B", room: "Room N207", status: "Completed", color: "#10b981", bg: "#ecfdf5" },
                      { time: "10:00 AM - 11:00 AM", subject: "LR Session", class: "VI BCA - Sec B", room: "Room N207", status: "In Progress", color: "#3b82f6", bg: "#eff6ff" },
                      { time: "11:00 AM - 12:00 PM", subject: "Data Structures", class: "VI BCA - Sec B", room: "Room N207", status: "Upcoming", color: "#f59e0b", bg: "#fffbeb" },
                      { time: "01:30 PM - 04:30 PM", subject: "B2-PROJECT LAB Session", class: "VI BCA - Sec B", room: "Lab 311", status: "Upcoming", color: "#64748b", bg: "#f1f5f9" }
                    ].map((slot, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', background: '#f8fafc', border: '1px solid #edf2f7', borderRadius: '12px', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <span style={{ fontSize: '14px', fontWeight: '800', color: '#3b82f6', width: '135px' }}>{slot.time}</span>
                          <div>
                            <span style={{ display: 'block', fontSize: '14px', fontWeight: '850', color: '#0f172a' }}>{slot.subject}</span>
                            <span style={{ display: 'block', fontSize: '12px', color: '#64748b', fontWeight: '600' }}>{slot.class} • {slot.room}</span>
                          </div>
                        </div>
                        <span style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '800', background: slot.bg, color: slot.color }}>
                          {slot.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Attendance Analytics Doughnut */}
                <div className="dashboard-section" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="section-header">
                    <h3>Attendance Overview</h3>
                    <span className="header-link">This Week</span>
                  </div>
                  <div style={{ display: 'flex', height: '220px', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={attendanceChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={65}
                          outerRadius={90}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {attendanceChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                      <span style={{ display: 'block', fontSize: '20px', fontWeight: '950', color: '#0f172a' }}>78%</span>
                      <span style={{ display: 'block', fontSize: '12px', color: '#64748b', fontWeight: '800' }}>Overall</span>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '10px', borderTop: '1px solid #edf2f7', paddingTop: '12px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ display: 'block', width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', margin: '0 auto 4px' }}></span>
                      <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '750' }}>Present (16)</span>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ display: 'block', width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', margin: '0 auto 4px' }}></span>
                      <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '750' }}>Absent (3)</span>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ display: 'block', width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b', margin: '0 auto 4px' }}></span>
                      <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '750' }}>Leave (1)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Submissions, Assignments, Announcements preview */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '24px' }}>
                {/* CIE Marks Status */}
                <div className="dashboard-section">
                  <div className="section-header">
                    <h3>Internal Marks Summary</h3>
                    <span className="header-link" style={{ cursor: 'pointer' }} onClick={() => setActiveSection("Internal Marks")}>View All</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { name: "Data Structures", class: "VI MCA", count: "18/20", pct: 90 },
                      { name: "Database Management", class: "VI MCA", count: "16/20", pct: 80 },
                      { name: "Web Technologies", class: "VI BCA", count: "20/20", pct: 100 },
                      { name: "Software Engineering", class: "IV BCA", count: "15/20", pct: 75 }
                    ].map((sub, index) => (
                      <div key={index}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '800', marginBottom: '4px' }}>
                          <span style={{ color: '#0f172a' }}>{sub.name} <span style={{ color: '#64748b', fontWeight: '600' }}>({sub.class})</span></span>
                          <span style={{ color: '#3b82f6' }}>{sub.count}</span>
                        </div>
                        <div style={{ width: '100%', height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${sub.pct}%`, height: '100%', background: '#3b82f6', borderRadius: '3px' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setActiveSection("Internal Marks")} style={{ width: '100%', padding: '10px', background: '#eff6ff', color: '#2563eb', border: 'none', borderRadius: '10px', fontWeight: '850', fontSize: '14px', marginTop: '16px', cursor: 'pointer' }}>
                    Enter Internal Marks →
                  </button>
                </div>

                {/* Assignments List */}
                <div className="dashboard-section">
                  <div className="section-header">
                    <h3>Active Assignments</h3>
                    <span className="header-link" style={{ cursor: 'pointer' }} onClick={() => setActiveSection("Assignments")}>Create</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {assignments.slice(0, 3).map((item) => (
                      <div key={item.id} style={{ padding: '10px', background: '#f8fafc', border: '1px solid #edf2f7', borderRadius: '10px' }}>
                        <span style={{ display: 'block', fontSize: '14px', fontWeight: '850', color: '#0f172a' }}>{item.title}</span>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b', fontWeight: '700', marginTop: '6px' }}>
                          <span>Due: {item.due}</span>
                          <span style={{ color: '#10b981' }}>{item.submissions} Submitted</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setActiveSection("Assignments")} style={{ width: '100%', padding: '10px', background: '#eff6ff', color: '#2563eb', border: 'none', borderRadius: '10px', fontWeight: '850', fontSize: '14px', marginTop: '16px', cursor: 'pointer' }}>
                    Create New Assignment →
                  </button>
                </div>

                {/* Announcements */}
                <div className="dashboard-section">
                  <div className="section-header">
                    <h3>Announcements</h3>
                    <span className="header-link" style={{ cursor: 'pointer' }} onClick={() => setActiveSection("Announcements")}>Broadcast</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {announcements.slice(0, 3).map((item) => (
                      <div key={item.id} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: item.type === 'Alert' ? '#fee2e2' : '#eef2ff', color: item.type === 'Alert' ? '#ef4444' : '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <FaBullhorn size={12} />
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                          <span style={{ display: 'block', fontSize: '14px', fontWeight: '850', color: '#0f172a', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{item.title}</span>
                          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>{item.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setActiveSection("Announcements")} style={{ width: '100%', padding: '10px', background: '#eff6ff', color: '#2563eb', border: 'none', borderRadius: '10px', fontWeight: '850', fontSize: '14px', marginTop: '16px', cursor: 'pointer' }}>
                    View All Announcements →
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ───────────────── TAB: MY PROFILE ───────────────── */}
          {activeSection === "My Profile" && (
            <div className="uucms-card" style={{ background: 'white', borderRadius: '16px', padding: '30px', border: '1px solid #edf2f7' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
                {/* Left Photo Column */}
                <div style={{ textAlign: 'center', borderRight: '1px solid #edf2f7', paddingRight: '40px' }}>
                  <img 
                    src="https://ui-avatars.com/api/?name=Lakshmi+Priya&background=3b82f6&color=fff&bold=true&size=256" 
                    alt="avatar" 
                    style={{ width: '150px', height: '150px', borderRadius: '20px', border: '5px solid #eff6ff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '20px' }}
                  />
                  <h3 style={{ fontSize: '18px', fontWeight: '950', color: '#0f172a', margin: '0 0 4px 0' }}>{profile.name}</h3>
                  <span style={{ display: 'block', fontSize: '14px', color: '#64748b', fontWeight: '800', background: '#f8fafc', padding: '6px 12px', borderRadius: '8px', border: '1px solid #edf2f7', width: 'fit-content', margin: '0 auto 16px' }}>
                    {profile.empId}
                  </span>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left', marginTop: '20px', fontSize: '14px', color: '#64748b', fontWeight: '600' }}>
                    <div style={{ padding: '10px', background: '#f8fafc', borderRadius: '10px' }}>
                      <strong style={{ color: '#0f172a' }}>QUALIFICATION:</strong><br />{profile.qualification}
                    </div>
                    <div style={{ padding: '10px', background: '#f8fafc', borderRadius: '10px' }}>
                      <strong style={{ color: '#0f172a' }}>EXPERIENCE:</strong><br />{profile.experience}
                    </div>
                  </div>
                </div>

                {/* Right Form Fields */}
                <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: '0 0 10px 0', borderBottom: '1.5px solid #edf2f7', paddingBottom: '10px' }}>
                    Edit Profile Details
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '850', color: '#64748b', marginBottom: '6px' }}>FULL NAME</label>
                      <input 
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontWeight: '750' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '850', color: '#64748b', marginBottom: '6px' }}>EMPLOYEE ID</label>
                      <input 
                        type="text"
                        disabled
                        value={profile.empId}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontWeight: '750', background: '#f8fafc', color: '#64748b' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '850', color: '#64748b', marginBottom: '6px' }}>EMAIL ADDRESS</label>
                      <input 
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontWeight: '750' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '850', color: '#64748b', marginBottom: '6px' }}>CONTACT PHONE</label>
                      <input 
                        type="text"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontWeight: '750' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '850', color: '#64748b', marginBottom: '6px' }}>DEPARTMENT</label>
                      <input 
                        type="text"
                        value={profile.dept}
                        onChange={(e) => setProfile({ ...profile, dept: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontWeight: '750' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '850', color: '#64748b', marginBottom: '6px' }}>DESIGNATION</label>
                      <input 
                        type="text"
                        value={profile.designation}
                        onChange={(e) => setProfile({ ...profile, designation: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontWeight: '750' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '850', color: '#64748b', marginBottom: '6px' }}>OFFICE CABIN</label>
                      <input 
                        type="text"
                        value={profile.office}
                        onChange={(e) => setProfile({ ...profile, office: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontWeight: '750' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '850', color: '#64748b', marginBottom: '6px' }}>CONSULTATION HOURS</label>
                      <input 
                        type="text"
                        value={profile.hours}
                        onChange={(e) => setProfile({ ...profile, hours: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontWeight: '750' }}
                      />
                    </div>
                  </div>

                  <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: '8px', alignSelf: 'flex-end', padding: '12px 24px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '800', cursor: 'pointer', marginTop: '10px' }}>
                    <FaSave /> Save Profile Settings
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ───────────────── TAB: STUDENTS ───────────────── */}
          {activeSection === "Students" && (
            <div className="uucms-card" style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #edf2f7' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '12px', flex: 1, maxWidth: '400px' }}>
                  <div className="search-box-simple" style={{ width: '100%', position: 'relative' }}>
                    <FaSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input 
                      type="text" 
                      placeholder="Search name or USN..." 
                      value={studentSearch}
                      onChange={(e) => setStudentSearch(e.target.value)}
                      style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none', fontWeight: '750' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontWeight: '800', color: '#64748b', fontSize: '14px' }}><FaFilter /> Filter Semester:</span>
                  <select 
                    value={semFilter}
                    onChange={(e) => setSemFilter(e.target.value)}
                    style={{ padding: '10px 16px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontWeight: '800', background: '#f8fafc', cursor: 'pointer' }}
                  >
                    <option value="All">All Semesters</option>
                    <option value="6">Semester 6</option>
                    <option value="5">Semester 5</option>
                    <option value="4">Semester 4</option>
                    <option value="3">Semester 3</option>
                    <option value="2">Semester 2</option>
                    <option value="1">Semester 1</option>
                  </select>
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #edf2f7' }}>
                      <th style={{ padding: '16px', fontSize: '12px', color: '#64748b', fontWeight: '800' }}>USN</th>
                      <th style={{ padding: '16px', fontSize: '12px', color: '#64748b', fontWeight: '800' }}>STUDENT NAME</th>
                      <th style={{ padding: '16px', fontSize: '12px', color: '#64748b', fontWeight: '800' }}>DEPARTMENT</th>
                      <th style={{ padding: '16px', fontSize: '12px', color: '#64748b', fontWeight: '800' }}>SEM/SEC</th>
                      <th style={{ padding: '16px', fontSize: '12px', color: '#64748b', fontWeight: '800' }}>ATTENDANCE</th>
                      <th style={{ padding: '16px', fontSize: '12px', color: '#64748b', fontWeight: '800' }}>ACADEMIC STATUS</th>
                      <th style={{ padding: '16px', fontSize: '12px', color: '#64748b', fontWeight: '800', textAlign: 'right' }}>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading students list from database...</td></tr>
                    ) : filteredStudents.length === 0 ? (
                      <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#64748b', fontWeight: 'bold' }}>No students found matching query.</td></tr>
                    ) : filteredStudents.map((s) => (
                      <tr key={s.id} style={{ borderBottom: '1px solid #edf2f7', transition: 'background 0.2s' }}>
                        <td style={{ padding: '16px', fontWeight: '800', color: '#2563eb' }}>{s.register_no}</td>
                        <td style={{ padding: '16px', fontWeight: '800', color: '#0f172a' }}>{s.name}</td>
                        <td style={{ padding: '16px', color: '#475569', fontWeight: '600' }}>{s.department}</td>
                        <td style={{ padding: '16px', fontWeight: '750', color: '#475569' }}>Sem {s.semester}</td>
                        <td style={{ padding: '16px' }}>
                          <span style={{ fontWeight: '900', color: parseFloat(s.attendance_percentage) >= 75 ? '#10b981' : '#ef4444' }}>
                            {s.attendance_percentage}%
                          </span>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <span style={{
                            padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '800',
                            background: s.academic_status === 'Regular' ? '#ecfdf5' : '#fee2e2',
                            color: s.academic_status === 'Regular' ? '#065f46' : '#991b1b'
                          }}>
                            {s.academic_status}
                          </span>
                        </td>
                        <td style={{ padding: '16px', textAlign: 'right' }}>
                          <button 
                            onClick={() => setSelectedStudent(s)}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#eff6ff', color: '#2563eb', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}
                          >
                            Profile <FaChevronRight size={10} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Student detailed modal profile */}
              {selectedStudent && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(8,18,38,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                  <div style={{ background: 'white', borderRadius: '16px', width: '550px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #edf2f7', paddingBottom: '12px', marginBottom: '16px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '950', color: '#0f172a', margin: 0 }}>Student Detailed Profile</h3>
                      <button onClick={() => setSelectedStudent(null)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#cbd5e1' }}>×</button>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px', padding: '12px', background: '#f8fafc', borderRadius: '12px' }}>
                      <img src={`https://ui-avatars.com/api/?name=${selectedStudent.name}&background=random&color=fff&bold=true`} alt="avatar" style={{ width: '60px', height: '60px', borderRadius: '12px' }} />
                      <div>
                        <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: '#0f172a' }}>{selectedStudent.name}</h4>
                        <span style={{ fontSize: '14px', color: '#2563eb', fontWeight: '800' }}>USN: {selectedStudent.register_no}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', fontWeight: '750', color: '#64748b' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                        <span>DEPARTMENT:</span><strong style={{ color: '#0f172a' }}>{selectedStudent.department}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                        <span>SEMESTER:</span><strong style={{ color: '#0f172a' }}>Semester {selectedStudent.semester}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                        <span>ATTENDANCE RECORD:</span><strong style={{ color: selectedStudent.attendance_percentage >= 75 ? '#10b981' : '#ef4444' }}>{selectedStudent.attendance_percentage}%</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                        <span>ACADEMIC STATUS:</span><strong style={{ color: selectedStudent.academic_status === 'Regular' ? '#10b981' : '#ef4444' }}>{selectedStudent.academic_status}</strong>
                      </div>
                    </div>

                    <button onClick={() => setSelectedStudent(null)} style={{ width: '100%', padding: '12px', background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '10px', fontWeight: '800', fontSize: '14px', marginTop: '20px', cursor: 'pointer' }}>
                      Close Roster Card
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ───────────────── TAB: ATTENDANCE ───────────────── */}
          {activeSection === "Attendance" && (
            <div className="uucms-card" style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #edf2f7' }}>
              <div style={{ background: '#eff6ff', border: '1.5px solid #bfdbfe', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '900', color: '#1e3a8a' }}>Roll Call Sheet: BCA VI Semester</h4>
                  <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#3b82f6', fontWeight: '600' }}>Subject: Mobile Application Development (BCA601) • Total Roster: 20 Students</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748b', display: 'block' }}>ATTENDANCE SUMMARY</span>
                  <span style={{ fontSize: '18px', fontWeight: '950', color: '#2563eb' }}>
                    {Object.values(attStatuses).filter(v => v === 'Present').length} Present / {Object.values(attStatuses).filter(v => v === 'Absent').length} Absent
                  </span>
                </div>
              </div>

              <div style={{ maxHeight: '450px', overflowY: 'auto', marginBottom: '24px', paddingRight: '4px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr 1.5fr', background: '#f8fafc', padding: '10px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '8px' }}>
                  <span>USN / REG NO</span>
                  <span>STUDENT NAME</span>
                  <span style={{ textAlign: 'center' }}>MARK ATTENDANCE</span>
                </div>
                
                {students.map((student) => (
                  <div key={student.id} style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr 1.5fr', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #edf2f7' }}>
                    <span style={{ fontWeight: '800', color: '#2563eb', fontSize: '14px' }}>{student.register_no}</span>
                    <span style={{ fontWeight: '800', color: '#0f172a', fontSize: '14px' }}>{student.name}</span>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      {["Present", "Absent"].map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setAttStatuses(prev => ({ ...prev, [student.id]: status }))}
                          style={{
                            padding: '6px 12px', border: '1.5px solid #cbd5e1', borderRadius: '8px', fontSize: '12px', fontWeight: '850', cursor: 'pointer', transition: 'all 0.2s',
                            background: attStatuses[student.id] === status ? 
                              (status === 'Present' ? '#10b981' : status === 'Absent' ? '#ef4444' : '#f59e0b') : 'white',
                            color: attStatuses[student.id] === status ? 'white' : '#64748b',
                            borderColor: attStatuses[student.id] === status ? 'transparent' : '#cbd5e1'
                          }}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1.5px solid #edf2f7', paddingTop: '20px' }}>
                <button onClick={handleSaveAttendance} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '850', fontSize: '14px', cursor: 'pointer' }}>
                  <FaCalendarCheck /> Sync & Save Attendance Log
                </button>
              </div>
            </div>
          )}

          {/* ───────────────── TAB: INTERNAL MARKS ───────────────── */}
          {activeSection === "Internal Marks" && (
            <div className="uucms-card" style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #edf2f7' }}>
              <div style={{ background: '#fef3c7', border: '1.5px solid #fde68a', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '900', color: '#78350f' }}>Internal Marks Test 1 Sheet</h4>
                  <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#d97706', fontWeight: '600' }}>Subject: Mobile Application Development (BCA601) • Maximum Marks Limit: 20 Marks</p>
                </div>
                <div style={{ background: 'white', padding: '6px 12px', borderRadius: '8px', border: '1px solid #fcd34d', fontSize: '14px', fontWeight: '800', color: '#d97706' }}>
                  BCA VI Semester
                </div>
              </div>

              <form onSubmit={handleSaveCie} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ maxHeight: '420px', overflowY: 'auto', marginBottom: '24px', paddingRight: '4px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr 1fr', background: '#f8fafc', padding: '10px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '8px' }}>
                    <span>USN / REG NO</span>
                    <span>STUDENT NAME</span>
                    <span style={{ textAlign: 'right' }}>ENTER MARKS (MAX 20)</span>
                  </div>

                  {students.map((student) => (
                    <div key={student.id} style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr 1fr', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #edf2f7' }}>
                      <span style={{ fontWeight: '800', color: '#2563eb', fontSize: '14px' }}>{student.register_no}</span>
                      <span style={{ fontWeight: '800', color: '#0f172a', fontSize: '14px' }}>{student.name}</span>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
                        <input 
                          type="number"
                          min="0"
                          max="20"
                          step="0.5"
                          value={cieMarks[student.id] || 0}
                          onChange={(e) => handleCieChange(student.id, e.target.value)}
                          style={{ width: '70px', padding: '6px', borderRadius: '6px', border: '1.5px solid #cbd5e1', outline: 'none', fontWeight: '800', textAlign: 'center' }}
                        />
                        <span style={{ fontSize: '14px', fontWeight: '800', color: '#64748b' }}>/ 20</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1.5px solid #edf2f7', paddingTop: '20px' }}>
                  <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '850', fontSize: '14px', cursor: 'pointer' }}>
                    <FaSave /> Lock & Submit CIE Marks Sheet
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ───────────────── TAB: ASSIGNMENTS ───────────────── */}
          {activeSection === "Assignments" && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '24px' }}>
              {/* Left Column: Create Form */}
              <div className="uucms-card" style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #edf2f7', height: 'fit-content' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '950', color: '#0f172a', margin: '0 0 16px 0', borderBottom: '1.5px solid #edf2f7', paddingBottom: '10px' }}>
                  Create New Assignment
                </h3>
                
                <form onSubmit={handleCreateAssignment} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '850', color: '#64748b', marginBottom: '6px' }}>ASSIGNMENT TITLE</label>
                    <input 
                      type="text"
                      placeholder="e.g. Trees and Graph Traversals Practice sheet"
                      value={newAssign.title}
                      onChange={(e) => setNewAssign({ ...newAssign, title: e.target.value })}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontWeight: '750' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '850', color: '#64748b', marginBottom: '6px' }}>SUBJECT</label>
                      <select 
                        value={newAssign.subject}
                        onChange={(e) => setNewAssign({ ...newAssign, subject: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontWeight: '750', background: 'white' }}
                      >
                        <option value="Data Structures">Data Structures</option>
                        <option value="Database Management">Database Management</option>
                        <option value="Software Engineering">Software Engineering</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '850', color: '#64748b', marginBottom: '6px' }}>MAX MARKS</label>
                      <input 
                        type="number"
                        min="1"
                        value={newAssign.maxMarks}
                        onChange={(e) => setNewAssign({ ...newAssign, maxMarks: parseInt(e.target.value) || 10 })}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontWeight: '750', textAlign: 'center' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '850', color: '#64748b', marginBottom: '6px' }}>DUE DATE</label>
                    <input 
                      type="date"
                      value={newAssign.due}
                      onChange={(e) => setNewAssign({ ...newAssign, due: e.target.value })}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontWeight: '750' }}
                    />
                  </div>

                  <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '800', cursor: 'pointer', justifyContent: 'center', fontSize: '14px' }}>
                    <FaPlus /> Publish Assignment Task
                  </button>
                </form>
              </div>

              {/* Right Column: Active list */}
              <div className="uucms-card" style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #edf2f7' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '950', color: '#0f172a', margin: '0 0 16px 0', borderBottom: '1.5px solid #edf2f7', paddingBottom: '10px' }}>
                  Active Classroom Tasks
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {assignments.map((item) => (
                    <div key={item.id} style={{ padding: '16px', background: '#f8fafc', border: '1.5px solid #edf2f7', borderRadius: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <span style={{ fontSize: '12px', fontWeight: '900', color: '#3b82f6', background: '#eff6ff', padding: '4px 8px', borderRadius: '6px', display: 'inline-block', marginBottom: '6px' }}>
                            {item.subject}
                          </span>
                          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '850', color: '#0f172a' }}>{item.title}</h4>
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: '850', color: '#64748b' }}>
                          Max: {item.maxMarks} Marks
                        </span>
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', borderTop: '1px solid #edf2f7', paddingTop: '10px', fontSize: '14px', fontWeight: '750', color: '#64748b' }}>
                        <span>⏰ Due: {item.due}</span>
                        <span style={{ color: '#10b981' }}>📝 Submissions: {item.submissions}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ───────────────── TAB: TIMETABLE ───────────────── */}
          {activeSection === "Timetable" && (
            <div className="uucms-card" style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #edf2f7' }}>
              
              {/* Official Timetable Header Block */}
              <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '12px', padding: '20px 24px', color: 'white', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 4px 12px rgba(15,23,42,0.1)' }}>
                <span style={{ display: 'block', fontSize: '12px', fontWeight: '800', letterSpacing: '1px', color: '#38bdf8', textTransform: 'uppercase', marginBottom: '4px' }}>NRUPATHUNGA UNIVERSITY</span>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '950', letterSpacing: '-0.3px' }}>
                  DEPARTMENT OF COMPUTER SCIENCE • VI BCA SEC B
                </h3>
                <div style={{ display: 'flex', gap: '20px', marginTop: '8px', fontSize: '14px', color: '#94a3b8', fontWeight: '600' }}>
                  <span>📅 EVEN SEMESTER 2025-26</span>
                  <span>📍 CLASS ROOM: N207 / LAB: 311</span>
                  <span style={{ color: '#38bdf8', fontWeight: '800' }}>Principal Ref: LEENA SWARNA DEVI</span>
                </div>
              </div>

              <div style={{ overflowX: 'auto', border: '1.5px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #cbd5e1' }}>
                      <th style={{ padding: '14px 16px', fontSize: '12px', color: '#475569', fontWeight: '900', borderRight: '1.5px solid #cbd5e1', width: '90px' }}>DAY</th>
                      <th style={{ padding: '14px 10px', fontSize: '12px', color: '#475569', fontWeight: '900', borderRight: '1px solid #e2e8f0' }}>8.00 - 9.00</th>
                      <th style={{ padding: '14px 10px', fontSize: '12px', color: '#475569', fontWeight: '900', borderRight: '1px solid #e2e8f0' }}>9.00 - 10.00</th>
                      <th style={{ padding: '14px 10px', fontSize: '12px', color: '#475569', fontWeight: '900', borderRight: '1px solid #e2e8f0' }}>10.00 - 11.00</th>
                      <th style={{ padding: '14px 10px', fontSize: '12px', color: '#475569', fontWeight: '900', borderRight: '1px solid #e2e8f0' }}>11.00 - 12.00</th>
                      <th style={{ padding: '14px 10px', fontSize: '12px', color: '#475569', fontWeight: '900', borderRight: '1.5px solid #cbd5e1' }}>12.00 - 1.00</th>
                      <th style={{ padding: '14px 10px', fontSize: '12px', color: '#475569', fontWeight: '900', borderRight: '1px solid #e2e8f0' }}>1.30 - 2.30</th>
                      <th style={{ padding: '14px 10px', fontSize: '12px', color: '#475569', fontWeight: '900', borderRight: '1px solid #e2e8f0' }}>2.30 - 3.30</th>
                      <th style={{ padding: '14px 10px', fontSize: '12px', color: '#475569', fontWeight: '900', borderRight: '1px solid #e2e8f0' }}>3.30 - 4.30</th>
                      <th style={{ padding: '14px 10px', fontSize: '12px', color: '#475569', fontWeight: '900', borderRight: '1px solid #e2e8f0' }}>4.30 - 5.30</th>
                      <th style={{ padding: '14px 10px', fontSize: '12px', color: '#475569', fontWeight: '900' }}>5.30 - 6.30</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    {/* MON ROW */}
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '16px 10px', fontWeight: '900', color: '#0f172a', background: '#f8fafc', borderRight: '1.5px solid #cbd5e1' }}>Mon</td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}></td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}>
                        <div style={{ borderRadius: '8px', padding: '10px 4px', ...getSubjectStyle("PHP") }}>
                          <strong style={{ display: 'block' }}>PHP</strong>
                          <span style={{ fontSize: '12px', opacity: 0.9 }}>N207 • VVJ</span>
                        </div>
                      </td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}>
                        <div style={{ borderRadius: '8px', padding: '10px 4px', ...getSubjectStyle("LR") }}>
                          <strong style={{ display: 'block' }}>LR</strong>
                        </div>
                      </td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}>
                        <div style={{ borderRadius: '8px', padding: '10px 4px', ...getSubjectStyle("DS") }}>
                          <strong style={{ display: 'block' }}>DS</strong>
                          <span style={{ fontSize: '12px', opacity: 0.9 }}>N207 • DN</span>
                        </div>
                      </td>
                      <td style={{ padding: '6px', borderRight: '1.5px solid #cbd5e1' }}>
                        <div style={{ borderRadius: '8px', padding: '10px 4px', ...getSubjectStyle("AI") }}>
                          <strong style={{ display: 'block' }}>AI</strong>
                          <span style={{ fontSize: '12px', opacity: 0.9 }}>N207 • ME</span>
                        </div>
                      </td>
                      <td colSpan={3} style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}>
                        <div style={{ borderRadius: '8px', padding: '12px 10px', ...getSubjectStyle("PROJECT") }}>
                          <strong style={{ display: 'block' }}>B2-PROJECT</strong>
                          <span style={{ fontSize: '12px', opacity: 0.9 }}>Lab 311 • NBP+SC</span>
                        </div>
                      </td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}></td>
                      <td style={{ padding: '6px' }}></td>
                    </tr>

                    {/* TUE ROW */}
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '16px 10px', fontWeight: '900', color: '#0f172a', background: '#f8fafc', borderRight: '1.5px solid #cbd5e1' }}>Tue</td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}></td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}></td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}>
                        <div style={{ borderRadius: '8px', padding: '10px 4px', ...getSubjectStyle("PHP") }}>
                          <strong style={{ display: 'block' }}>PHP</strong>
                          <span style={{ fontSize: '12px', opacity: 0.9 }}>N207 • VVJ</span>
                        </div>
                      </td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}>
                        <div style={{ borderRadius: '8px', padding: '10px 4px', ...getSubjectStyle("DS") }}>
                          <strong style={{ display: 'block' }}>DS</strong>
                          <span style={{ fontSize: '12px', opacity: 0.9 }}>N207 • DN</span>
                        </div>
                      </td>
                      <td style={{ padding: '6px', borderRight: '1.5px solid #cbd5e1' }}></td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}>
                        <div style={{ borderRadius: '8px', padding: '10px 4px', ...getSubjectStyle("DM") }}>
                          <strong style={{ display: 'block' }}>DM</strong>
                          <span style={{ fontSize: '12px', opacity: 0.9 }}>N207</span>
                        </div>
                      </td>
                      <td colSpan={2} style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}>
                        <div style={{ borderRadius: '8px', padding: '12px 10px', ...getSubjectStyle("PROJECT") }}>
                          <strong style={{ display: 'block' }}>B2 PROJECT LAB</strong>
                          <span style={{ fontSize: '12px', opacity: 0.9 }}>Lab 311 • SM+NBP</span>
                        </div>
                      </td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}></td>
                      <td style={{ padding: '6px' }}></td>
                    </tr>

                    {/* WED ROW */}
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '16px 10px', fontWeight: '900', color: '#0f172a', background: '#f8fafc', borderRight: '1.5px solid #cbd5e1' }}>Wed</td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}></td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}>
                        <div style={{ borderRadius: '8px', padding: '10px 4px', ...getSubjectStyle("AI") }}>
                          <strong style={{ display: 'block' }}>AI</strong>
                          <span style={{ fontSize: '12px', opacity: 0.9 }}>N207 • ME</span>
                        </div>
                      </td>
                      <td colSpan={2} style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}>
                        <div style={{ borderRadius: '8px', padding: '12px 10px', ...getSubjectStyle("PROJECT") }}>
                          <strong style={{ display: 'block' }}>B1 PROJECT LAB</strong>
                          <span style={{ fontSize: '12px', opacity: 0.9 }}>Lab 311 • SJ+MS</span>
                        </div>
                      </td>
                      <td style={{ padding: '6px', borderRight: '1.5px solid #cbd5e1' }}></td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}>
                        <div style={{ borderRadius: '8px', padding: '10px 4px', ...getSubjectStyle("DM") }}>
                          <strong style={{ display: 'block' }}>DM</strong>
                          <span style={{ fontSize: '12px', opacity: 0.9 }}>N207</span>
                        </div>
                      </td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}>
                        <div style={{ borderRadius: '8px', padding: '10px 4px', ...getSubjectStyle("PHP") }}>
                          <strong style={{ display: 'block' }}>PHP</strong>
                          <span style={{ fontSize: '12px', opacity: 0.9 }}>N207 • VVJ</span>
                        </div>
                      </td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}></td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}></td>
                      <td style={{ padding: '6px' }}></td>
                    </tr>

                    {/* THU ROW */}
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '16px 10px', fontWeight: '900', color: '#0f172a', background: '#f8fafc', borderRight: '1.5px solid #cbd5e1' }}>Thur</td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}></td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}>
                        <div style={{ borderRadius: '8px', padding: '10px 4px', ...getSubjectStyle("DS") }}>
                          <strong style={{ display: 'block' }}>DS</strong>
                          <span style={{ fontSize: '12px', opacity: 0.9 }}>N207</span>
                        </div>
                      </td>
                      <td colSpan={2} style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}>
                        <div style={{ borderRadius: '8px', padding: '12px 10px', ...getSubjectStyle("PHP LAB") }}>
                          <strong style={{ display: 'block' }}>B2 PHP LAB</strong>
                          <span style={{ fontSize: '12px', opacity: 0.9 }}>Lab 311 • VVJ+NBP</span>
                        </div>
                      </td>
                      <td style={{ padding: '6px', borderRight: '1.5px solid #cbd5e1' }}></td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}>
                        <div style={{ borderRadius: '8px', padding: '10px 4px', ...getSubjectStyle("LR") }}>
                          <strong style={{ display: 'block' }}>LR</strong>
                          <span style={{ fontSize: '12px', opacity: 0.9 }}>N207</span>
                        </div>
                      </td>
                      <td colSpan={3} style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}>
                        <div style={{ borderRadius: '8px', padding: '12px 10px', ...getSubjectStyle("PHP LAB") }}>
                          <strong style={{ display: 'block' }}>B1 PHP LAB</strong>
                          <span style={{ fontSize: '12px', opacity: 0.9 }}>Lab 311 • VVJ+PKH</span>
                        </div>
                      </td>
                      <td style={{ padding: '6px' }}></td>
                    </tr>

                    {/* FRI ROW */}
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '16px 10px', fontWeight: '900', color: '#0f172a', background: '#f8fafc', borderRight: '1.5px solid #cbd5e1' }}>Fri</td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}></td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}>
                        <div style={{ borderRadius: '8px', padding: '10px 4px', ...getSubjectStyle("LR") }}>
                          <strong style={{ display: 'block' }}>LR</strong>
                        </div>
                      </td>
                      <td colSpan={2} style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}>
                        <div style={{ borderRadius: '8px', padding: '12px 10px', ...getSubjectStyle("PROJECT") }}>
                          <strong style={{ display: 'block' }}>B1 PROJECT LAB</strong>
                          <span style={{ fontSize: '12px', opacity: 0.9 }}>Lab 311 • LS+VVJ</span>
                        </div>
                      </td>
                      <td style={{ padding: '6px', borderRight: '1.5px solid #cbd5e1' }}></td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}>
                        <div style={{ borderRadius: '8px', padding: '10px 4px', ...getSubjectStyle("AI") }}>
                          <strong style={{ display: 'block' }}>AI</strong>
                          <span style={{ fontSize: '12px', opacity: 0.9 }}>N207 • ME</span>
                        </div>
                      </td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}>
                        <div style={{ borderRadius: '8px', padding: '10px 4px', ...getSubjectStyle("DM") }}>
                          <strong style={{ display: 'block' }}>DM</strong>
                          <span style={{ fontSize: '12px', opacity: 0.9 }}>N207</span>
                        </div>
                      </td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}>
                        <div style={{ borderRadius: '8px', padding: '10px 4px', ...getSubjectStyle("PHY EDUC") }}>
                          <strong style={{ display: 'block' }}>Phy Educ</strong>
                          <span style={{ fontSize: '12px', opacity: 0.9 }}>rr</span>
                        </div>
                      </td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}></td>
                      <td style={{ padding: '6px' }}></td>
                    </tr>

                    {/* SAT ROW */}
                    <tr style={{ borderBottom: '1.5px solid #cbd5e1' }}>
                      <td style={{ padding: '16px 10px', fontWeight: '900', color: '#0f172a', background: '#f8fafc', borderRight: '1.5px solid #cbd5e1' }}>Sat</td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}></td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}>
                        <div style={{ borderRadius: '8px', padding: '10px 4px', ...getSubjectStyle("OTHER") }}>
                          <strong style={{ display: 'block' }}>N207</strong>
                        </div>
                      </td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}>
                        <div style={{ borderRadius: '8px', padding: '10px 4px', ...getSubjectStyle("DS") }}>
                          <strong style={{ display: 'block' }}>DS</strong>
                          <span style={{ fontSize: '12px', opacity: 0.9 }}>N207 • DN</span>
                        </div>
                      </td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}>
                        <div style={{ borderRadius: '8px', padding: '10px 4px', ...getSubjectStyle("LR") }}>
                          <strong style={{ display: 'block' }}>LR</strong>
                          <span style={{ fontSize: '12px', opacity: 0.9 }}>N207</span>
                        </div>
                      </td>
                      <td style={{ padding: '6px', borderRight: '1.5px solid #cbd5e1' }}>
                        <div style={{ borderRadius: '8px', padding: '10px 4px', ...getSubjectStyle("PHP") }}>
                          <strong style={{ display: 'block' }}>PHP</strong>
                          <span style={{ fontSize: '12px', opacity: 0.9 }}>N207 • VVJ</span>
                        </div>
                      </td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}></td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}></td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}></td>
                      <td style={{ padding: '6px', borderRight: '1px solid #e2e8f0' }}></td>
                      <td style={{ padding: '6px' }}></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Timetable spreadsheet signature and annotations */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', background: '#f8fafc', padding: '12px 20px', borderRadius: '10px', border: '1px dashed #e2e8f0' }}>
                <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#64748b', fontWeight: '750' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffe4e6', border: '1px solid #fda4af' }}></span> Lab / Projects
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f3e8ff', border: '1px solid #d8b4fe' }}></span> Core Subjects
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#fef3c7', border: '1px solid #fde68a' }}></span> Logical Reasoning (LR)
                  </span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '900', color: '#0f172a' }}>
                  ✍️ Department Head Signature: <span style={{ color: '#2563eb' }}>LEENA SWARNA DEVI</span>
                </span>
              </div>

            </div>
          )}

          {/* ───────────────── TAB: ANNOUNCEMENTS ───────────────── */}
          {activeSection === "Announcements" && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '24px' }}>
              {/* Left Column: Post Notice */}
              <div className="uucms-card" style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #edf2f7', height: 'fit-content' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '950', color: '#0f172a', margin: '0 0 16px 0', borderBottom: '1.5px solid #edf2f7', paddingBottom: '10px' }}>
                  Compose Announcement Bulletin
                </h3>
                
                <form onSubmit={handleCreateAnnouncement} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '850', color: '#64748b', marginBottom: '6px' }}>NOTICE TITLE</label>
                    <input 
                      type="text"
                      placeholder="e.g. Practical Exam Time Table Published"
                      value={newAnn.title}
                      onChange={(e) => setNewAnn({ ...newAnn, title: e.target.value })}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontWeight: '750' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '850', color: '#64748b', marginBottom: '6px' }}>NOTICE TYPE</label>
                    <select 
                      value={newAnn.type}
                      onChange={(e) => setNewAnn({ ...newAnn, type: e.target.value })}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontWeight: '750', background: 'white' }}
                    >
                      <option value="Notice">Notice</option>
                      <option value="Alert">Alert</option>
                      <option value="Circular">Circular</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '850', color: '#64748b', marginBottom: '6px' }}>BULLETIN MESSAGE / CONTENT</label>
                    <textarea 
                      placeholder="Type details and circular guidelines here..."
                      rows="5"
                      value={newAnn.content}
                      onChange={(e) => setNewAnn({ ...newAnn, content: e.target.value })}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontWeight: '750', resize: 'vertical' }}
                    />
                  </div>

                  <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '800', cursor: 'pointer', justifyContent: 'center', fontSize: '14px' }}>
                    <FaBullhorn /> Broadcast Notice Bulletin
                  </button>
                </form>
              </div>

              {/* Right Column: Notice history */}
              <div className="uucms-card" style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #edf2f7' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '950', color: '#0f172a', margin: '0 0 16px 0', borderBottom: '1.5px solid #edf2f7', paddingBottom: '10px' }}>
                  Broadcasting History Board
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {announcements.map((item) => (
                    <div key={item.id} style={{ padding: '16px', background: '#f8fafc', border: '1.5px solid #edf2f7', borderRadius: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <span style={{
                          fontSize: '12px', fontWeight: '900', padding: '4px 8px', borderRadius: '6px', display: 'inline-block',
                          background: item.type === 'Alert' ? '#fee2e2' : item.type === 'Circular' ? '#e0f2fe' : '#f1f5f9',
                          color: item.type === 'Alert' ? '#ef4444' : item.type === 'Circular' ? '#0369a1' : '#475569'
                        }}>
                          {item.type}
                        </span>
                        <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>{item.date}</span>
                      </div>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: '850', color: '#0f172a' }}>{item.title}</h4>
                      <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.5', fontWeight: '600' }}>{item.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      <AIChat />
    </div>
  );
}