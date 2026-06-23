import React, { useState, useEffect } from 'react';
import { 
  FaUserGraduate, FaClipboardList, FaCheckCircle, 
  FaExclamationTriangle, FaStar, FaQuoteLeft, FaStarHalfAlt, FaFileAlt, FaUserTie
} from 'react-icons/fa';
import WelcomeBanner from '../../components/WelcomeBanner';
import './Parent.css';

// Responsive Donut Chart Component using SVG
const DonutChart = ({ percentage }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto' }}>
      <svg width="160" height="160" viewBox="0 0 160 160">
        <circle 
          cx="80" cy="80" r={radius} 
          fill="none" stroke="#f1f5f9" strokeWidth="20" 
        />
        <circle 
          cx="80" cy="80" r={radius} 
          fill="none" stroke="#10b981" strokeWidth="20" 
          strokeDasharray={circumference} 
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 80 80)"
        />
        {/* Simple orange arc for absent/leave simulation */}
        <circle 
          cx="80" cy="80" r={radius} 
          fill="none" stroke="#f59e0b" strokeWidth="20" 
          strokeDasharray={`${circumference * 0.16} ${circumference}`}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          transform={`rotate(${(percentage/100)*360 - 90} 80 80)`}
        />
      </svg>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>{percentage}%</span>
        <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Overall Attendance</span>
      </div>
    </div>
  );
};

export default function ParentDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  
  // Mock Data arrays for the UI
  const internalMarks = [
    { subject: "Database Management Systems", test1: 18, test2: 17, avg: 17.5 },
    { subject: "Computer Networks", test1: 15, test2: 16, avg: 15.5 },
    { subject: "Python Programming", test1: 19, test2: 18, avg: 18.5 },
    { subject: "Web Technologies", test1: 17, test2: 16, avg: 16.5 },
    { subject: "Operating Systems", test1: 16, test2: 15, avg: 15.5 },
  ];

  const fullMarksheet = [
    { subject: "Database Management Systems", total: 100, obtained: 82, result: "PASS" },
    { subject: "Computer Networks", total: 100, obtained: 74, result: "PASS" },
    { subject: "Python Programming", total: 100, obtained: 88, result: "PASS" },
    { subject: "Web Technologies", total: 100, obtained: 85, result: "PASS" },
    { subject: "Operating Systems", total: 100, obtained: 79, result: "PASS" },
    { subject: "Software Engineering", total: 100, obtained: 81, result: "PASS" },
  ];

  const subjectPerformance = [
    { name: "Database Management Systems", status: "Good", percent: 82 },
    { name: "Computer Networks", status: "Average", percent: 74 },
    { name: "Python Programming", status: "Good", percent: 88 },
    { name: "Web Technologies", status: "Good", percent: 85 },
    { name: "Operating Systems", status: "Average", percent: 79 },
    { name: "Software Engineering", status: "Good", percent: 81 },
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const dashResp = await fetch(`${import.meta.env.PROD ? 'https://student-poratal.onrender.com/api' : 'http://127.0.0.1:5000/api'}/student/dashboard`, { 
        headers: { 'Authorization': `Bearer ${token}` } 
      });
      if (dashResp.ok) {
        const data = await dashResp.json();
        setStats(data.stats);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getOverallAttendanceNumber = () => {
    if (!stats?.attendance) return 79;
    const num = parseInt(stats.attendance);
    return isNaN(num) ? 79 : num;
  };

  const getBacklogsNumber = () => {
    if (stats && stats.backlogs !== undefined) {
      const num = parseInt(stats.backlogs);
      return isNaN(num) ? 0 : num;
    }
    return 0; // Default mock fallback is now 0
  };

  const studentName = localStorage.getItem("studentName") || "Student";
  const firstName = studentName.split(" ")[0];

  if (loading) return <div>Loading dashboard...</div>;

  const attendanceNum = getOverallAttendanceNumber();
  const backlogsNum = getBacklogsNumber();
  const isFailed = backlogsNum > 0;

  // Dynamically update marksheet with failed subjects if any
  let displayMarksheet = [...fullMarksheet];
  if (stats?.failed_subjects && stats.failed_subjects.length > 0) {
    displayMarksheet = fullMarksheet.map(item => {
      const failedSub = stats.failed_subjects.find(fs => fs.subject === item.subject);
      if (failedSub) {
        return { ...item, obtained: failedSub.marks, result: "FAIL" };
      }
      return item;
    });
  }

  return (
    <>
      <WelcomeBanner roleName="Parent" />
      
      {/* 1. TOP KPI CARDS */}
      <div className="parent-kpi-grid">
        <div className="parent-kpi-card">
          <div className="parent-kpi-icon" style={{ background: '#dcfce7', color: '#16a34a' }}>
            <FaUserGraduate />
          </div>
          <div className="parent-kpi-content">
            <h4>Attendance (Overall)</h4>
            <h2 style={{ color: '#16a34a' }}>{attendanceNum}%</h2>
            <p>Present Days: {Math.round(85 * (attendanceNum/100))} / 85</p>
          </div>
        </div>
        
        <div className="parent-kpi-card">
          <div className="parent-kpi-icon" style={{ background: '#e0e7ff', color: '#4f46e5' }}>
            <FaClipboardList />
          </div>
          <div className="parent-kpi-content">
            <h4>Internal Marks (Average)</h4>
            <h2 style={{ color: '#4f46e5' }}>72%</h2>
            <p style={{ color: '#4f46e5', cursor: 'pointer' }}>View internal marks</p>
          </div>
        </div>

        <div className="parent-kpi-card">
          <div className="parent-kpi-icon" style={{ background: isFailed ? '#fee2e2' : '#dcfce7', color: isFailed ? '#ef4444' : '#10b981' }}>
            {isFailed ? <FaExclamationTriangle /> : <FaCheckCircle />}
          </div>
          <div className="parent-kpi-content">
            <h4>Semester Result</h4>
            <h2 style={{ color: isFailed ? '#ef4444' : '#10b981' }}>{isFailed ? 'FAIL' : 'PASS'}</h2>
            <p style={{ color: isFailed ? '#ef4444' : '#10b981' }}>Result Declared</p>
          </div>
        </div>

        <div className="parent-kpi-card">
          <div className="parent-kpi-icon" style={{ background: backlogsNum > 0 ? '#fee2e2' : '#dcfce7', color: backlogsNum > 0 ? '#ef4444' : '#10b981' }}>
            <FaFileAlt />
          </div>
          <div className="parent-kpi-content">
            <h4>Backlogs</h4>
            <h2 style={{ color: backlogsNum > 0 ? '#ef4444' : '#10b981' }}>{backlogsNum}</h2>
            <p style={{ color: '#ef4444' }}>{backlogsNum > 0 ? 'Needs Improvement' : 'Clear'}</p>
          </div>
        </div>

        <div className="parent-kpi-card">
          <div className="parent-kpi-icon" style={{ background: '#fef3c7', color: '#f59e0b' }}>
            <FaStar />
          </div>
          <div className="parent-kpi-content">
            <h4>Daily Performance</h4>
            <h2 style={{ color: '#f59e0b' }}>GOOD</h2>
            <p style={{ color: '#f59e0b' }}>Consistent Performer</p>
          </div>
        </div>
      </div>

      {/* 2. MAIN DASHBOARD AREA */}
      <div className="parent-dashboard-main">
        {/* Profile Snapshot */}
        <div className="parent-snapshot-card">
          <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(studentName)}&background=1e293b&color=fff`} alt="Student" className="parent-student-avatar" />
          <div className="parent-student-info">
            <h3>{studentName}</h3>
            <p>BCA - 6th Semester (Section A)</p>
          </div>
        </div>
      </div>

      {/* 3. MIDDLE ANALYTICS GRID */}
      <div className="parent-analytics-grid">
        
        {/* Attendance Donut */}
        <div className="parent-panel">
          <div className="parent-panel-header">Attendance Overview</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <DonutChart percentage={attendanceNum} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>
                  <span style={{ color: '#10b981' }}>●</span> Present
                </div>
                <div style={{ fontSize: '14px', fontWeight: '800' }}>67 (79%)</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>
                  <span style={{ color: '#ef4444' }}>●</span> Absent
                </div>
                <div style={{ fontSize: '14px', fontWeight: '800' }}>14 (16%)</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>
                  <span style={{ color: '#f59e0b' }}>●</span> Leave
                </div>
                <div style={{ fontSize: '14px', fontWeight: '800' }}>4 (5%)</div>
              </div>
            </div>
          </div>
          <a href="#" className="parent-view-all-link" style={{ marginTop: 'auto' }}>View Full Attendance &gt;</a>
        </div>

        {/* Internal Marks */}
        <div className="parent-panel">
          <div className="parent-panel-header">Internal Marks (Average)</div>
          <table className="parent-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Test 1</th>
                <th>Test 2</th>
                <th>Average</th>
              </tr>
            </thead>
            <tbody>
              {internalMarks.map((row, i) => (
                <tr key={i} className="parent-table-row">
                  <td style={{ fontWeight: '600' }}>{row.subject}</td>
                  <td>{row.test1}</td>
                  <td>{row.test2}</td>
                  <td style={{ fontWeight: '800' }}>{row.avg}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <a href="#" className="parent-view-all-link" style={{ marginTop: 'auto' }}>View All Internal Marks &gt;</a>
        </div>

        {/* Semester Marksheet */}
        <div className="parent-panel">
          <div className="parent-panel-header">5th Semester Result (Full Marksheet)</div>
          <table className="parent-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Total Marks</th>
                <th>Obtained Marks</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {displayMarksheet.map((row, i) => (
                <tr key={i} className="parent-table-row">
                  <td style={{ fontWeight: '600' }}>{row.subject}</td>
                  <td>{row.total}</td>
                  <td style={{ fontWeight: '800', color: row.result === "FAIL" ? '#ef4444' : 'inherit' }}>{row.obtained}</td>
                  <td>
                    <span style={{ 
                      background: row.result === "FAIL" ? '#fee2e2' : '#dcfce7', 
                      color: row.result === "FAIL" ? '#ef4444' : '#166534', 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '12px', 
                      fontWeight: 'bold' 
                    }}>
                      {row.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <a href="#" className="parent-view-all-link" style={{ marginTop: 'auto' }}>View Full Marksheet &gt;</a>
        </div>
      </div>

      {/* 4. BOTTOM INSIGHTS GRID */}
      <div className="parent-insights-grid">
        
        {/* Subject wise performance */}
        <div className="parent-panel">
          <div className="parent-panel-header">Subject Wise Performance</div>
          <div>
            {subjectPerformance.map((subj, i) => (
              <div key={i} className="progress-row">
                <div className="progress-subj">{subj.name}</div>
                <div className={`progress-badge ${subj.status.toLowerCase()}`}>{subj.status}</div>
                <div className="progress-bar-bg">
                  <div className={`progress-bar-fill ${subj.status.toLowerCase()}`} style={{ width: `${subj.percent}%` }}></div>
                </div>
                <div className="progress-score">{subj.percent}/100</div>
              </div>
            ))}
          </div>
        </div>

        {/* Teacher's Suggestion */}
        <div className="parent-panel">
          <div className="parent-panel-header">Teacher's Suggestion</div>
          <div className="teacher-suggestion-box">
            <div className="parent-panel-content">
              <p className="parent-remark-text">
                {firstName} is doing well in most subjects. Needs to improve attendance in Computer Networks and focus more on practical sessions.
              </p>
            </div>
          </div>
          <div className="teacher-profile">
            <img src="https://ui-avatars.com/api/?name=Prof+Kavya&background=e2e8f0" alt="Prof" className="teacher-avatar" />
            <div className="teacher-info">
              <h4>Prof. R. Kavya</h4>
              <p>Class Advisor • 23 May 2026</p>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="parent-panel">
          <div className="parent-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Notifications
            <a href="#" style={{ fontSize: '14px', color: '#1d4ed8', textDecoration: 'none', fontWeight: '600' }}>View All</a>
          </div>
          
          <div className="notification-item">
            <div className="notif-icon blue"><FaClipboardList /></div>
            <div className="notif-content">
              <h5>Internal Test 2 marks published</h5>
              <p>22 May 2026</p>
            </div>
          </div>
          
          <div className="notification-item">
            <div className="notif-icon orange"><FaExclamationTriangle /></div>
            <div className="notif-content">
              <h5>Attendance below 75% in Computer Networks</h5>
              <p>20 May 2026</p>
            </div>
          </div>

          <div className="notification-item">
            <div className="notif-icon green"><FaUserGraduate /></div>
            <div className="notif-content">
              <h5>Parent-Teacher meeting on 28 May 2026</h5>
              <p>19 May 2026</p>
            </div>
          </div>
          
          <div className="notification-item">
            <div className="notif-icon blue"><FaCheckCircle /></div>
            <div className="notif-content">
              <h5>Semester exam timetable released</h5>
              <p>18 May 2026</p>
            </div>
          </div>
        </div>

      </div>

      {/* 5. FOOTER BANNER */}
      <div className="parent-footer-banner">
        <div className="parent-panel-content mentor-note">
          <div className="mentor-avatar">
            <FaUserTie size={24} color="#6366f1" />
          </div>
          <div className="mentor-message">
            <h4>Note from Class Mentor</h4>
            <p>
              Keep encouraging {firstName}. Regular study and consistent attendance will help them achieve academic success!
            </p>
          </div>
        </div>
      </div>
      
    </>
  );
}
