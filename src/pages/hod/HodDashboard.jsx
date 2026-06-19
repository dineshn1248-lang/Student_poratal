import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  FaUsers, FaCalendarCheck, FaUserTie, FaUserGraduate, 
  FaClipboardList, FaFileInvoice, FaPenSquare, FaRegAddressCard, 
  FaChartPie, FaExclamationCircle, FaArrowRight
} from 'react-icons/fa';
import StatCard from './components/StatCard';
import WelcomeBanner from '../../components/WelcomeBanner';
import './HOD.css';

export default function HODDashboard() {
  const [loading, setLoading] = useState(true);
  const [isFacultyModalOpen, setIsFacultyModalOpen] = useState(false);
  const [selectedSem, setSelectedSem] = useState('1');
  const [facultySection, setFacultySection] = useState('A');
  const navigate = useNavigate();

  // Mock data matching the reference image exactly
  const studentData = [
    { name: 'I Semester', count: 10 },
    { name: 'II Semester', count: 10 },
    { name: 'III Semester', count: 10 },
    { name: 'IV Semester', count: 11 },
    { name: 'V Semester', count: 10 },
    { name: 'VI Semester', count: 13 },
  ];

  const attendancePieData = [
    { name: 'Present', value: 78, color: '#10b981' },
    { name: 'Absent', value: 15, color: '#f59e0b' },
    { name: 'Leave', value: 7, color: '#ef4444' },
  ];

  const alerts = [
    { text: "32 students have less than 75% attendance", time: "2 hours ago", color: "#ef4444" },
    { text: "Internal marks not submitted for 2 subjects", time: "5 hours ago", color: "#f59e0b" },
    { text: "6 students have backlog in multiple subjects", time: "1 day ago", color: "#8b5cf6" },
    { text: "Practical exam timetable published", time: "2 days ago", color: "#3b82f6" },
  ];

  const quickLinks = [
    { label: "Faculty List", icon: <FaUserTie />, action: () => setIsFacultyModalOpen(true), color: '#10b981' },
    { label: "Student List", icon: <FaUsers />, action: () => navigate('/hod/students') },
    { label: "Attendance Report", icon: <FaCalendarCheck />, color: '#10b981' },
    { label: "Internal Marks Entry", icon: <FaPenSquare />, color: '#6366f1' },
    { label: "Exam Registration", icon: <FaRegAddressCard />, color: '#3b82f6' },
    { label: "Backlog Report", icon: <FaExclamationCircle />, color: '#f59e0b' },
    { label: "Department Report", icon: <FaChartPie />, color: '#14b8a6' },
  ];

  const [stats, setStats] = useState({
    total_students: 0,
    avg_attendance: '0%',
    backlog_students: 0,
    total_fee_pending: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const resp = await fetch(`${import.meta.env.PROD ? 'https://student-poratal.onrender.com/api' : 'http://127.0.0.1:5000/api'}/hod/students/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (resp.ok) {
          const data = await resp.json();
          setStats({
            total_students: data.total_students || 0,
            avg_attendance: data.avg_attendance || '0%',
            backlog_students: data.backlog_students || 0,
            total_fee_pending: data.total_fee_pending || 0
          });
        }
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="hod-dashboard-content">
      <div className="section-header">
        <div>
          <h1>Dashboard Overview</h1>
          <p>Department academic and administrative summary</p>
        </div>
      </div>

      <WelcomeBanner roleName="HOD" />

      {/* ── TOP STATS (3 CARDS) ── */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <StatCard 
          label="Total Students (All Sem)" 
          value={stats.total_students ? stats.total_students.toString() : '0'} 
          subtext={`Passed: ${stats.passed_students || 0} | Failed: ${stats.failed_students || 0}`}
          icon={<FaUsers />} 
          color="#4f46e5" 
          bg="#eef2ff" 
          onClick={() => navigate('/hod/students')} 
          style={{ cursor: 'pointer' }}
        />
        <StatCard label="Avg Attendance" value={stats.avg_attendance} icon={<FaCalendarCheck />} color="#10b981" bg="#ecfdf5" onClick={() => navigate('/hod/attendance')} style={{ cursor: 'pointer' }} />
        <StatCard 
          label="FEES COLLECTION" 
          value={stats.total_collected_fees || '₹0'} 
          subtext={`Collection: ${stats.fees_collection_percentage || '0%'}`}
          icon={<FaFileInvoice />} 
          color="#f59e0b" 
          bg="#fffbeb" 
        />
      </div>

      {/* ── CHARTS ROW ── */}
      <div className="charts-row">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Semester Wise Students</h3>
            <a href="#" className="chart-link">View Report →</a>
          </div>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="99%" height={300}>
              <BarChart data={studentData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Attendance Overview</h3>
            <a href="#" className="chart-link">View Report →</a>
          </div>
          <div style={{ height: '300px', display: 'flex', alignItems: 'center' }}>
            <ResponsiveContainer width="99%" height={300}>
              <PieChart>
                <Pie
                  data={attendancePieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {attendancePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" iconType="circle" wrapperStyle={{ fontSize: '14px', fontWeight: '700' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── BOTTOM SECTION (ALERTS & QUICK LINKS) ── */}
      <div className="bottom-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Recent Alerts</h3>
            <a href="#" className="chart-link">View All →</a>
          </div>
          <div className="alerts-list">
            {alerts.map((alert, i) => (
              <div key={i} className="alert-item">
                <div className="alert-main">
                   <div className="alert-dot" style={{ background: alert.color }}></div>
                   <span className="alert-text">{alert.text}</span>
                </div>
                <span className="alert-time">{alert.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Quick Links</h3>
          </div>
          <div className="quick-links-grid">
            {quickLinks.map((link, i) => (
              <div 
                key={i} 
                className="quick-link-item" 
                onClick={link.action} 
                style={{ cursor: link.action ? 'pointer' : 'default' }}
              >
                <div className="ql-icon" style={{ color: link.color || '#6366f1' }}>
                  {link.icon}
                </div>
                <span className="ql-label">{link.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* FACULTY MODAL */}
      {isFacultyModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setIsFacultyModalOpen(false)}>
          <div style={{ background: 'white', borderRadius: '16px', width: '600px', maxWidth: '90%', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #edf2f7', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800' }}>Semester-wise Faculty</h3>
                <select value={facultySection} onChange={(e) => setFacultySection(e.target.value)} style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontWeight: '600', color: '#475569', cursor: 'pointer' }}>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                </select>
              </div>
              <button onClick={() => setIsFacultyModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748b' }}><FaTimes /></button>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '10px' }}>
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#3b82f6', marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid #e2e8f0' }}>1st Semester</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Kannada</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Rajesh</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>English I</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Kavitha</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Programming C</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Arun Kumar</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Mathematics I</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Sharma</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Physics</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Johnson</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Environmental Science</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Davis</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Yoga & Wellness</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Smitha</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Constitution of India</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Reddy</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>C Programming Lab</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Arun Kumar</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Physics Lab</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Johnson</span>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#3b82f6', marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid #e2e8f0' }}>2nd Semester</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Advanced English</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Kavitha</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Mathematics II</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Sharma</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Data Structures</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Arun Kumar</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Chemistry</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Smith</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Basic Electronics</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Rajesh</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Statistics</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Davis</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Health & Wellness</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Smitha</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Human Rights</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Reddy</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Data Structures Lab</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Arun Kumar</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Chemistry Lab</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Smith</span>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#3b82f6', marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid #e2e8f0' }}>3rd Semester</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>DBMS</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Sunita</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>C# and Dot Net</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Ramesh</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Computer Networks</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Rajesh</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Software Engineering</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Kavitha</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Digital Logic</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Johnson</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Kannada III</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Smith</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Open Elective I</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Davis</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Quantitative Aptitude</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Reddy</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>DBMS Lab</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Sunita</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>C# Lab</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Ramesh</span>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#3b82f6', marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid #e2e8f0' }}>4th Semester</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Python</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Kumar</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Operating System</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Davis</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Design and Analysis of Algorithms</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Sunita</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Web Technologies</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Ramesh</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Theory of Computation</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Rajesh</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Open Elective II</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Kavitha</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Soft Skills</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Smitha</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Indian Knowledge System</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Reddy</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Python Lab</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Kumar</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Web Tech Lab</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Ramesh</span>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#3b82f6', marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid #e2e8f0' }}>5th Semester</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Cloud Computing</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Smith</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Cyber Security</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Johnson</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Machine Learning</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Davis</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Mobile Application Development</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Kumar</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Internet of Things</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Sharma</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Elective I</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Rajesh</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Mini Project</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Kavitha</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Internship</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Sunita</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>ML Lab</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Davis</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Mobile App Lab</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Kumar</span>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#3b82f6', marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid #e2e8f0' }}>6th Semester</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Data Science</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Sharma</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Artificial Intelligence</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Reddy</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Big Data Analytics</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Smith</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Elective II</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Johnson</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Elective III</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Davis</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Software Testing</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Kumar</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Major Project</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Kavitha</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Seminar</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Sunita</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>AI/DS Lab</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dr. Sharma</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Testing Lab</span>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Prof. Kumar</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}