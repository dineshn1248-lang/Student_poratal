import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaClipboardList, FaChartLine, FaBook, FaGraduationCap,
  FaBell, FaBars, FaChartBar, FaCalendarCheck, FaRobot, FaGamepad,
  FaExclamationTriangle, FaMoneyBillWave, FaReceipt
} from 'react-icons/fa';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './Parent.css';

// Mock Data for Subject Performance (Radar Chart)
const performanceData = [
  { subject: 'Mathematics', score: 82, fullMark: 100 },
  { subject: 'Data Structures', score: 88, fullMark: 100 },
  { subject: 'DBMS', score: 95, fullMark: 100 },
  { subject: 'Web Dev', score: 90, fullMark: 100 },
  { subject: 'OS', score: 78, fullMark: 100 },
  { subject: 'Networks', score: 85, fullMark: 100 },
];

// Mock Data for Attendance (Bar Chart)
const attendanceData = [
  { subject: 'Mathematics', attendance: 86 },
  { subject: 'Data Structures', attendance: 84 },
  { subject: 'DBMS', attendance: 95 },
  { subject: 'Web Dev', attendance: 84 },
  { subject: 'OS', attendance: 80 },
  { subject: 'Networks', attendance: 85 },
];

export default function ParentDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="parent-dashboard-wrapper">

      {/* SIDEBAR */}
      <div className={`parent-sidebar ${sidebarOpen ? '' : 'collapsed'} ${sidebarOpen ? 'mobile-open' : ''}`}>
        <div className="parent-logo">
          <div className="parent-logo-icon">
            <FaGraduationCap />
          </div>
          <div className="parent-logo-text">
            <h2>menu</h2>
            <p>Parent Panel</p>
          </div>
        </div>

        <p className="parent-nav-header">NAVIGATION</p>
        <ul className="parent-menu">
          <li className="active"><FaChartBar /> Dashboard</li>
          <li><FaCalendarCheck /> Attendance</li>
          <li><FaClipboardList /> Marks</li>
          <li><FaChartLine /> Progress</li>
        </ul>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="parent-main">

        {/* TOPBAR */}
        <div className="parent-topbar">
          <div className="topbar-left">
            <FaBars className="mobile-menu-btn" onClick={toggleSidebar} />
            <div className="portal-title">Parent Portal</div>
          </div>
          <div className="topbar-right">
            <div className="notif-btn">
              <FaBell />
              <div className="notif-badge"></div>
            </div>
            <div className="parent-avatar">D</div>
          </div>
        </div>

        {/* DASHBOARD CONTENT */}
        <div className="parent-content">

          <div className="welcome-block">
            <h1>Welcome, Dinesh</h1>
            <p>BCA • Section A • USN: U24AN23S0331</p>
          </div>

          {/* METRICS GRID */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-info">
                <p>Overall Attendance</p>
                <h2>86%</h2>
                <span className="metric-trend trend-positive">↑ Good standing</span>
              </div>
              <div className="metric-icon icon-blue">
                <FaClipboardList />
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-info">
                <p>Average Score</p>
                <h2>85%</h2>
                <span className="metric-trend trend-positive">↑ 5% improvement</span>
              </div>
              <div className="metric-icon icon-orange">
                <FaChartLine />
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-info">
                <p>Active Backlogs</p>
                <h2>2</h2>
                <span className="metric-trend" style={{ color: '#e53e3e' }}>Critical: Need attention</span>
              </div>
              <div className="metric-icon" style={{ background: '#e53e3e' }}>
                <FaExclamationTriangle />
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-info">
                <p>Annual Fees (Paid/Total)</p>
                <h2>₹23K / ₹23K</h2>
                <span className="metric-trend" style={{ color: '#f59e0b' }}>Pending: ₹00,000</span>
              </div>
              <div className="metric-icon icon-teal">
                <FaMoneyBillWave />
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-info">
                <p>Exam Fees</p>
                <h2>₹2,500</h2>
                <span className="metric-trend trend-positive">Status: Fully Paid</span>
              </div>
              <div className="metric-icon icon-blue">
                <FaReceipt />
              </div>
            </div>
          </div>

          {/* CHARTS LAYER */}
          <div className="charts-layout">

            {/* RADAR CHART */}
            <div className="chart-card">
              <h3>Subject-wise Performance</h3>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={performanceData}>
                    <PolarGrid gridType="polygon" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#718096', fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="Score" dataKey="score" stroke="#5a4fcf" fill="#5a4fcf" fillOpacity={0.4} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* BAR CHART */}
            <div className="chart-card">
              <h3>Attendance by Subject</h3>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf1f7" />
                    <XAxis dataKey="subject" tick={{ fill: '#718096', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#718096', fontSize: 11 }} axisLine={false} tickLine={false} domain={[60, 100]} />
                    <Tooltip cursor={{ fill: '#f8f9fc' }} />
                    <Bar dataKey="attendance" fill="#2eb094" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* AI ASSISTANT WIDGET */}
          <div className="ai-card">
            <div className="ai-header">
              <FaRobot style={{ fontSize: '22px' }} /> AI Study Assistant
            </div>

            <div className="ai-alert-box">
              <div className="ai-icon" style={{ color: '#f59e0b' }}>📐</div>
              <div className="ai-text">
                <h4>Focus on Mathematics</h4>
                <p>Your math scores dropped 8% — practice algebra & calculus daily for 30 min.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
