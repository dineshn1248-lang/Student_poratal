import { useState } from "react";
import "./Student.css";
import {
  FaBars,
  FaBell,
  FaUserCircle,
  FaChartLine,
  FaBook,
  FaGraduationCap
} from "react-icons/fa";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const performanceData = [
  { subject: 'Math', score: 85, fullMark: 100 },
  { subject: 'Physics', score: 78, fullMark: 100 },
  { subject: 'Chemistry', score: 92, fullMark: 100 },
  { subject: 'CS', score: 95, fullMark: 100 },
  { subject: 'English', score: 88, fullMark: 100 },
];

const attendanceData = [
  { name: 'Math', percent: 85 },
  { name: 'Physics', percent: 90 },
  { name: 'Chemistry', percent: 80 },
  { name: 'CS', percent: 95 },
  { name: 'English', percent: 88 },
];

export default function StudentDashboard() {
  const [open, setOpen] = useState(true);

  return (
    <div className="layout">

      {/* SIDEBAR */}
      <div className={`sidebar ${open ? "" : "hide"}`}>
        <h2 className="logo"> Portal </h2>

        <ul className="menu">
          <li className="active">Dashboard</li>
          <li>Results</li>
          <li>Attendance</li>
          <li>Announcements</li>
          <li>AI Internship Finder</li>
          <li>AI Assistance</li>
        </ul>

        <div className="profile">
          <p>Logged in as</p>
          <h4>Dinesh</h4>
        </div>

        <button className="logout">Logout</button>
      </div>

      {/* MAIN */}
      <div className={`main ${open ? "" : "full"}`}>

        {/* TOPBAR */}
        <div className="topbar">
          <FaBars onClick={() => setOpen(!open)} className="menu-btn" />

          <div className="right">
            <FaBell />
            <FaUserCircle />
          </div>
        </div>

        {/* CONTENT */}
        <div className="content">
          <div>
            <h1 className="welcome-text">Welcome, Dinesh</h1>
            <p className="student-info">
              BCA • Section A • USN: U24AN23S0331
            </p>
          </div>

          {/* CARDS */}
          <div className="cards">

            <div className="card">
              <div>
                <h4> Attendance</h4>
                <h2>86%</h2>
                <span className="green">↑ Good standing</span>
              </div>
              <div className="icon blue"><FaChartLine /></div>
            </div>

            <div className="card">
              <div>
                <h4>Average Score</h4>
                <h2>85%</h2>
                <span className="green">↑ 5% improvement</span>
              </div>
              <div className="icon orange"><FaChartLine /></div>
            </div>

            <div className="card">
              <div>
                <h4>Subjects</h4>
                <h2>6</h2>
              </div>
              <div className="icon green"><FaBook /></div>
            </div>

            <div className="card">
              <div>
                <h4>Backlogs</h4>
                <h2>2</h2>
              </div>
              <div className="icon purple"><FaGraduationCap /></div>
            </div>

          </div>

          {/* CHARTS GRID */}
          <div className="charts-grid">
            {/* PERFORMANCE RADAR CHART */}
            <div className="box">
              <h3>Subject-wise Performance</h3>
              <div style={{ width: '100%', height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{borderRadius: '10px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'}} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* PROGRESS BAR CHART */}
            <div className="box">
              <h3>Attendance Progress (%)</h3>
              <div style={{ width: '100%', height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                    <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="percent" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="box">
            <h3>AI Study Assistant</h3>
            <div className="ai-box">
              <span style={{ fontSize: '24px' }}>💡</span> 
              <span>Focus on <strong>Physics</strong> — Practice daily for 30 min to improve your score. Keep up the great work in Computer Science!</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}