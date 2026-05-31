import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  FaUserGraduate, FaCheckCircle, FaTimesCircle, FaHandPaper, 
  FaCalendarAlt, FaInfoCircle, FaRegSmileBeam, FaQuoteLeft, FaLightbulb, FaUserAlt
} from 'react-icons/fa';
import './Parent.css';

// Reusable SVG Donut Chart Component
const DonutChart = ({ percentage, color = "#10b981", thickness = 20 }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto' }}>
      <svg width="160" height="160" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r={radius} fill="none" stroke="#f1f5f9" strokeWidth={thickness} />
        <circle 
          cx="80" cy="80" r={radius} fill="none" stroke={color} strokeWidth={thickness} 
          strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
          strokeLinecap="round" transform="rotate(-90 80 80)"
        />
        <circle 
          cx="80" cy="80" r={radius} fill="none" stroke="#ef4444" strokeWidth={thickness} 
          strokeDasharray={`${circumference * 0.19} ${circumference}`}
          strokeDashoffset={circumference} strokeLinecap="round"
          transform={`rotate(${(percentage/100)*360 - 90} 80 80)`}
        />
        <circle 
          cx="80" cy="80" r={radius} fill="none" stroke="#f59e0b" strokeWidth={thickness} 
          strokeDasharray={`${circumference * 0.024} ${circumference}`}
          strokeDashoffset={circumference} strokeLinecap="round"
          transform={`rotate(${((percentage + 19)/100)*360 - 90} 80 80)`}
        />
      </svg>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>{percentage}%</span>
        <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Overall</span>
      </div>
    </div>
  );
};

// SVG Line Chart Component
const TrendChart = () => {
  return (
    <div style={{ width: '100%', height: '160px', marginTop: '10px' }}>
      <svg width="100%" height="100%" viewBox="0 0 400 150" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(val => (
          <g key={val}>
            <line x1="30" y1={130 - val*1.1} x2="380" y2={130 - val*1.1} stroke="#f1f5f9" strokeWidth="1" />
            <text x="25" y={134 - val*1.1} fontSize="10" fill="#94a3b8" textAnchor="end">{val}%</text>
          </g>
        ))}
        {/* Line */}
        <polyline 
          points="30,40 80,50 130,42 180,45 230,52 280,43 330,48 380,55" 
          fill="none" stroke="#3b82f6" strokeWidth="2" 
        />
        {/* Points */}
        {[[30,40,"82%"], [80,50,"75%"], [130,42,"80%"], [180,45,"78%"], [230,52,"76%"], [280,43,"81%"], [330,48,"79%"], [380,55,"77%"]].map((pt, i) => (
          <g key={i}>
            <circle cx={pt[0]} cy={pt[1]} r="4" fill="#3b82f6" />
            <text x={pt[0]} y={pt[1]-10} fontSize="10" fill="#1e293b" textAnchor="middle" fontWeight="bold">{pt[2]}</text>
          </g>
        ))}
        {/* X-axis labels */}
        {["24 Mar", "31 Mar", "7 Apr", "14 Apr", "21 Apr", "28 Apr", "5 May", "12 May"].map((lbl, i) => (
           <text key={i} x={30 + (i*50)} y="145" fontSize="10" fill="#64748b" textAnchor="middle">{lbl}</text>
        ))}
      </svg>
    </div>
  );
};

export default function ParentAttendance() {
  
  // Try to use outlet context to update title if parent layout supports it, otherwise ignore
  // The ParentLayout currently accepts title and subtitle as props, but we removed the wrapper.
  // We need to inject the title via DOM or state if we really wanted to, but for now we'll 
  // just assume the layout has a default or we can let it be. Wait, earlier we used <ParentLayout title="...">
  // Since we use Outlet now, the Layout doesn't know the title. 
  // We will just let the layout say "Parent Dashboard" and we'll add our own title here or update it.
  
  const subjects = [
    { name: "Database Management Systems", percent: 81 },
    { name: "Computer Networks", percent: 72 },
    { name: "Python Programming", percent: 85 },
    { name: "Web Technologies", percent: 78 },
    { name: "Operating Systems", percent: 75 },
    { name: "Software Engineering", percent: 80 },
  ];

  const recentAttendance = [
    { date: "22 May 2026", day: "Friday", status: "Present", remarks: "-" },
    { date: "21 May 2026", day: "Thursday", status: "Present", remarks: "-" },
    { date: "20 May 2026", day: "Wednesday", status: "Absent", remarks: "-" },
    { date: "19 May 2026", day: "Tuesday", status: "Present", remarks: "-" },
    { date: "18 May 2026", day: "Monday", status: "Leave", remarks: "Medical Leave" },
  ];

  const monthlySummary = [
    { month: "May 2026", conducted: 18, present: 14, absent: 3, leave: 1, percent: "77.78%" },
    { month: "April 2026", conducted: 20, present: 16, absent: 3, leave: 1, percent: "80.00%" },
    { month: "March 2026", conducted: 18, present: 15, absent: 2, leave: 1, percent: "83.33%" },
    { month: "February 2026", conducted: 16, present: 12, absent: 3, leave: 1, percent: "75.00%" },
  ];

  return (
    <div className="att-dashboard-wrapper">
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>Attendance Dashboard</h2>
        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '14px' }}>Track your ward's attendance and daily performance</p>
      </div>

      {/* Top Profile and Selectors */}
      <div className="att-profile-strip">
        <div className="att-profile-left">
          <img src="https://ui-avatars.com/api/?name=Lakshmi+Nisimappa+Chakrasali&background=1e293b&color=fff" alt="Student" className="att-student-avatar" />
          <div>
            <h3>Lakshmi Nisimappa Chakrasali</h3>
            <div className="att-student-meta">
              <span><FaUserAlt /> Reg No: U24AN23S0245</span>
              <span>BCA</span>
              <span>6th Semester</span>
              <span>Section A</span>
            </div>
          </div>
        </div>
        <div className="att-profile-right">
          <div className="att-select-group">
            <label>Semester</label>
            <select><option>V Semester</option></select>
          </div>
          <div className="att-select-group">
            <label>Academic Year</label>
            <select><option>2025-26</option></select>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="att-kpi-grid">
        <div className="att-kpi-card" style={{ borderBottomColor: '#10b981' }}>
          <div className="att-kpi-icon" style={{ background: '#dcfce7', color: '#10b981' }}><FaUserGraduate /></div>
          <div>
            <label>Overall Attendance</label>
            <h2 style={{ color: '#10b981' }}>78.6%</h2>
            <p>Present Days: 66 / 84</p>
          </div>
        </div>
        
        <div className="att-kpi-card">
          <div className="att-kpi-icon" style={{ background: '#dcfce7', color: '#10b981' }}><FaCheckCircle /></div>
          <div>
            <label>Present</label>
            <h2>66 <span style={{fontSize: '14px', color:'#64748b'}}>(78.6%)</span></h2>
            <div className="att-progress-mini"><div className="fill bg-green" style={{width:'78.6%'}}></div></div>
          </div>
        </div>

        <div className="att-kpi-card">
          <div className="att-kpi-icon" style={{ background: '#fee2e2', color: '#ef4444' }}><FaTimesCircle /></div>
          <div>
            <label>Absent</label>
            <h2>16 <span style={{fontSize: '14px', color:'#64748b'}}>(19.0%)</span></h2>
            <div className="att-progress-mini"><div className="fill bg-red" style={{width:'19.0%'}}></div></div>
          </div>
        </div>

        <div className="att-kpi-card">
          <div className="att-kpi-icon" style={{ background: '#fef3c7', color: '#f59e0b' }}><FaHandPaper /></div>
          <div>
            <label>Leave</label>
            <h2>2 <span style={{fontSize: '14px', color:'#64748b'}}>(2.4%)</span></h2>
          </div>
        </div>

        <div className="att-kpi-card">
          <div className="att-kpi-icon" style={{ background: '#f3e8ff', color: '#a855f7' }}><FaCalendarAlt /></div>
          <div>
            <label>Classes Conducted</label>
            <h2>84</h2>
          </div>
        </div>
      </div>

      {/* Middle Grid */}
      <div className="parent-analytics-grid" style={{ marginBottom: '24px' }}>
        
        {/* Overview */}
        <div className="parent-panel">
          <div className="parent-panel-header">Attendance Overview</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
            <DonutChart percentage={78.6} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>
                  <span style={{ color: '#10b981' }}>●</span> Present
                </div>
                <div style={{ fontSize: '14px', fontWeight: '800' }}>66 (78.6%)</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>
                  <span style={{ color: '#ef4444' }}>●</span> Absent
                </div>
                <div style={{ fontSize: '14px', fontWeight: '800' }}>16 (19.0%)</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>
                  <span style={{ color: '#f59e0b' }}>●</span> Leave
                </div>
                <div style={{ fontSize: '14px', fontWeight: '800' }}>2 (2.4%)</div>
              </div>
            </div>
          </div>
          <div className="att-alert-box success mt-auto">
            <FaInfoCircle /> Good job! Lakshmi has good attendance.
          </div>
        </div>

        {/* Trend */}
        <div className="parent-panel">
          <div className="parent-panel-header">Attendance Trend (Last 8 Weeks)</div>
          <TrendChart />
          <div className="att-alert-box info mt-auto">
            <FaInfoCircle /> Attendance is slightly improved by 2% in last 4 weeks.
          </div>
        </div>

        {/* By Subject */}
        <div className="parent-panel">
          <div className="parent-panel-header">Attendance by Subject</div>
          <div className="att-subj-list">
            {subjects.map((s, i) => (
              <div key={i} className="att-subj-row">
                <span className="att-subj-name">{s.name}</span>
                <div className="att-subj-bar-bg">
                  <div className={`att-subj-bar-fill ${s.percent >= 80 ? 'bg-green' : s.percent >= 75 ? 'bg-yellow' : 'bg-red'}`} style={{width: `${s.percent}%`}}></div>
                </div>
                <span className="att-subj-val">{s.percent}%</span>
              </div>
            ))}
          </div>
          <a href="#" className="parent-view-all-link mt-auto">View Subject Wise Details &gt;</a>
        </div>

      </div>

      {/* Bottom Grid */}
      <div className="parent-insights-grid">
        
        {/* Recent Attendance */}
        <div className="parent-panel">
          <div className="parent-panel-header">Recent Attendance (This Month)</div>
          <table className="att-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Day</th>
                <th>Status</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {recentAttendance.map((row, i) => (
                <tr key={i}>
                  <td>{row.date}</td>
                  <td>{row.day}</td>
                  <td className={`status-text ${row.status.toLowerCase()}`}>{row.status}</td>
                  <td>{row.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <a href="#" className="parent-view-all-link mt-auto" style={{ border: 'none', textAlign: 'left', padding: '16px 0 0' }}>View Full Attendance Record &gt;</a>
        </div>

        {/* Monthly Summary */}
        <div className="parent-panel">
          <div className="parent-panel-header">Monthly Summary</div>
          <table className="att-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Classes Conducted</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Leave</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {monthlySummary.map((row, i) => (
                <tr key={i}>
                  <td style={{fontWeight: '600'}}>{row.month}</td>
                  <td style={{textAlign: 'center'}}>{row.conducted}</td>
                  <td style={{textAlign: 'center'}}>{row.present}</td>
                  <td style={{textAlign: 'center'}}>{row.absent}</td>
                  <td style={{textAlign: 'center'}}>{row.leave}</td>
                  <td style={{fontWeight: '700'}}>{row.percent}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <a href="#" className="parent-view-all-link mt-auto" style={{ border: 'none', textAlign: 'left', padding: '16px 0 0' }}>View Monthly Report &gt;</a>
        </div>

        {/* Insights Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="parent-panel" style={{ padding: '20px' }}>
            <div className="parent-panel-header" style={{ marginBottom: '16px' }}>Daily Performance</div>
            <div className="att-daily-perf">
              <FaRegSmileBeam size={32} color="#16a34a" />
              <div>
                <h3 style={{ margin: 0, color: '#166534', fontSize: '18px' }}>Good</h3>
                <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#475569' }}>Consistent attendance. Keep it up!</p>
              </div>
            </div>
          </div>

          <div className="parent-panel" style={{ padding: '20px', flex: 1 }}>
            <div className="parent-panel-header" style={{ marginBottom: '16px' }}>Teacher Remark</div>
            <div className="att-teacher-remark">
               <div className="att-teacher-icon"><FaUserGraduate /></div>
               <div className="att-teacher-content">
                  <p>Lakshmi is regular in class and shows good interest in learning.</p>
                  <span>- Prof. Kavya (Class Advisor)<br/>12 May 2026</span>
               </div>
            </div>
          </div>

        </div>

      </div>

      {/* Footer Banner */}
      <div className="att-footer-banner">
        <FaLightbulb size={16} /> Regular attendance helps in better understanding of subjects and overall performance.
      </div>
      
    </div>
  );
}
