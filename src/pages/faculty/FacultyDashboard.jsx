import React, { useState } from "react";
import { 
  FaBars, FaBell, FaUserCircle, FaUsers, FaCalendarCheck, 
  FaBook, FaClipboardList, FaBullhorn, FaCheckCircle, 
  FaGraduationCap 
} from "react-icons/fa";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend, LineChart, Line 
} from "recharts";
import "./Faculty.css";

// Mock Data for Student Performance Graph
const performanceData = [
  { name: "Week 1", attendance: 85, iaMarks: 70 },
  { name: "Week 2", attendance: 82, iaMarks: 75 },
  { name: "Week 3", attendance: 90, iaMarks: 80 },
  { name: "Week 4", attendance: 88, iaMarks: 78 },
  { name: "Week 5", attendance: 85, iaMarks: 82 },
  { name: "Week 6", attendance: 92, iaMarks: 85 },
];

export default function FacultyDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="faculty-wrapper">
      
      {/* SIDEBAR */}
      <div className={`faculty-sidebar ${sidebarOpen ? '' : 'collapsed'} ${sidebarOpen ? 'mobile-open' : ''}`}>
        <div>
          <div className="faculty-logo">Menu </div>
          
          <ul className="faculty-menu">
            <li className="active"><FaBars /> Dashboard</li>
            <li><FaCalendarCheck /> Attendance Entry</li>
            <li><FaClipboardList /> IA Marks Entry</li>
            <li><FaBook /> Advance Syllabus</li>
            <li><FaBullhorn /> Announcement</li>
          </ul>
        </div>
        
        <button className="faculty-logout">Logout</button>
      </div>

      {/* MAIN CONTENT */}
      <div className="faculty-main">
        
        {/* TOPBAR */}
        <div className="faculty-topbar">
          <FaBars className="faculty-menu-btn" onClick={toggleSidebar} />
          
          <div className="faculty-top-right">
            <FaBell className="faculty-notif" />
            <FaUserCircle className="faculty-profile" />
          </div>
        </div>

        {/* CONTENT */}
        <div className="faculty-content">
          <h1>Welcome, Faculty</h1>
          <p className="faculty-sub">Manage your classes, students, and academic progress</p>

          {/* METRIC CARDS */}
          <div className="faculty-cards">
            
            <div className="faculty-card">
              <div className="faculty-card-info">
                <p>Total Students</p>
                <h2>120</h2>
              </div>
              <div className="faculty-icon status-blue">
                <FaUsers />
              </div>
            </div>

            <div className="faculty-card">
              <div className="faculty-card-info">
                <p>Section A and B</p>
                <h2>2 Sections</h2>
              </div>
              <div className="faculty-icon status-purple">
                <FaBars />
              </div>
            </div>

            <div className="faculty-card">
              <div className="faculty-card-info">
                <p>Syllabus Progress</p>
                <h2>70%</h2>
                <div style={{ background: "#e2e8f0", height: "4px", borderRadius: "2px", marginTop: "10px", width: "100%" }}>
                  <div style={{ background: "#8b5cf6", height: "100%", width: "70%", borderRadius: "2px" }}></div>
                </div>
              </div>
              <div className="faculty-icon status-orange">
                <FaBook />
              </div>
            </div>

            <div className="faculty-card">
              <div className="faculty-card-info">
                <p>Student Attendance</p>
                <h2>85%</h2>
              </div>
              <div className="faculty-icon status-green">
                <FaCheckCircle />
              </div>
            </div>

            <div className="faculty-card">
              <div className="faculty-card-info">
                <p>Average IA Marks</p>
                <h2>18 / 20</h2>
              </div>
              <div className="faculty-icon status-blue">
                <FaGraduationCap />
              </div>
            </div>

          </div>

          {/* PERFORMANCE GRAPH */}
          <div className="faculty-graph-card">
            <h3>Student Attendance & IA Marks Trends</h3>
            <div className="faculty-chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf1f7" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#718096" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#718096" }} />
                  <Tooltip cursor={{ fill: '#f8f9fc' }} />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: "20px" }} />
                  <Bar dataKey="attendance" name="Attendance (%)" fill="#2eb094" radius={[4, 4, 0, 0]} barSize={30} />
                  <Bar dataKey="iaMarks" name="IA Marks (%)" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}