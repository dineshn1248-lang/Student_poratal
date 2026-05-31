import React from 'react';
import { 
  FaUserAlt, FaClipboardCheck, FaStar, FaChartBar, FaTrophy, 
  FaTimesCircle, FaInfoCircle, FaStarHalfAlt, FaUserTie, FaExclamationTriangle
} from 'react-icons/fa';
import './Parent.css';

// SVG Line Chart with Shaded Area
const SgpaChart = () => {
  return (
    <div style={{ width: '100%', height: '180px', marginTop: '10px' }}>
      <svg width="100%" height="100%" viewBox="0 0 400 150" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 2, 4, 6, 8, 10].map(val => (
          <g key={val}>
            <line x1="20" y1={130 - val*11} x2="380" y2={130 - val*11} stroke="#f1f5f9" strokeWidth="1" />
            <text x="15" y={134 - val*11} fontSize="10" fill="#94a3b8" textAnchor="end">{val}</text>
          </g>
        ))}
        {/* Shaded Area */}
        <polygon 
          points="40,130 40,61.8 115,55.2 190,53 265,49.48 340,45.52 340,130" 
          fill="rgba(59, 130, 246, 0.1)" 
        />
        {/* Line */}
        <polyline 
          points="40,61.8 115,55.2 190,53 265,49.48 340,45.52" 
          fill="none" stroke="#3b82f6" strokeWidth="2" 
        />
        {/* Points */}
        {[[40,61.8,"6.20"], [115,55.2,"6.80"], [190,53,"7.00"], [265,49.48,"7.32"], [340,45.52,"7.68"]].map((pt, i) => (
          <g key={i}>
            <circle cx={pt[0]} cy={pt[1]} r="4" fill="#3b82f6" />
            <text x={pt[0]} y={pt[1]-10} fontSize="10" fill="#1e293b" textAnchor="middle" fontWeight="bold">{pt[2]}</text>
          </g>
        ))}
        {/* X-axis labels */}
        {["I Sem", "II Sem", "III Sem", "IV Sem", "V Sem"].map((lbl, i) => (
           <text key={i} x={40 + (i*75)} y="145" fontSize="10" fill="#64748b" textAnchor="middle">{lbl}</text>
        ))}
      </svg>
    </div>
  );
};

export default function ParentResults() {
  const marksheet = [
    { code: "BCA501", name: "Database Management Systems", internal: 24, external: 58, total: 82, grade: "A+", result: "PASS" },
    { code: "BCA502", name: "Computer Networks", internal: 22, external: 52, total: 74, grade: "B+", result: "PASS" },
    { code: "BCA503", name: "Python Programming", internal: 25, external: 63, total: 88, grade: "A+", result: "PASS" },
    { code: "BCA504", name: "Web Technologies", internal: 23, external: 57, total: 80, grade: "A", result: "PASS" },
    { code: "BCA505", name: "Operating Systems", internal: 21, external: 49, total: 70, grade: "B", result: "PASS" },
    { code: "BCA506", name: "Software Engineering", internal: 22, external: 54, total: 76, grade: "B+", result: "PASS" },
    { code: "BCA507", name: "Data Structures", internal: 24, external: 56, total: 80, grade: "A", result: "PASS" },
    { code: "BCA508", name: "Computer Graphics", internal: 23, external: 55, total: 78, grade: "B+", result: "PASS" },
  ];

  return (
    <div className="att-dashboard-wrapper">
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>Result Dashboard</h2>
        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '14px' }}>Track your ward's semester results and academic performance</p>
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

      {/* KPI Cards Grid */}
      <div className="res-kpi-grid">
        <div className="res-kpi-card">
          <div className="res-icon-box" style={{ background: '#dcfce7', color: '#10b981' }}><FaClipboardCheck /></div>
          <div>
            <span className="res-kpi-label">Semester Result</span>
            <h2 className="res-kpi-value" style={{ color: '#10b981' }}>PASS</h2>
            <span className="res-kpi-subtext">Good Job! Keep it up.</span>
          </div>
        </div>
        <div className="res-kpi-card">
          <div className="res-icon-box" style={{ background: '#f3e8ff', color: '#a855f7' }}><FaStar /></div>
          <div>
            <span className="res-kpi-label">SGPA</span>
            <h2 className="res-kpi-value">7.68 <span style={{fontSize: '14px', color:'#64748b'}}>/ 10</span></h2>
            <span className="res-kpi-subtext" style={{ color: '#10b981' }}>Grade: A</span>
          </div>
        </div>
        <div className="res-kpi-card">
          <div className="res-icon-box" style={{ background: '#eff6ff', color: '#3b82f6' }}><FaChartBar /></div>
          <div>
            <span className="res-kpi-label">Total Marks Obtained</span>
            <h2 className="res-kpi-value" style={{ color: '#3b82f6' }}>768 <span style={{fontSize: '14px', color:'#64748b'}}>/ 1000</span></h2>
            <span className="res-kpi-subtext">76.80%</span>
          </div>
        </div>
        <div className="res-kpi-card">
          <div className="res-icon-box" style={{ background: '#fef3c7', color: '#f59e0b' }}><FaTrophy /></div>
          <div>
            <span className="res-kpi-label">Class Standing</span>
            <h2 className="res-kpi-value">18 <span style={{fontSize: '14px', color:'#64748b'}}>/ 62</span></h2>
            <span className="res-kpi-subtext">Top 29%</span>
          </div>
        </div>
        <div className="res-kpi-card">
          <div className="res-icon-box" style={{ background: '#dcfce7', color: '#16a34a' }}><FaClipboardCheck /></div>
          <div>
            <span className="res-kpi-label">Backlogs</span>
            <h2 className="res-kpi-value" style={{ color: '#16a34a' }}>0</h2>
            <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: '600' }}>All Clear</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="res-main-grid">
        
        {/* LEFT COLUMN */}
        <div className="res-left-col">
          {/* Marksheet */}
          <div className="parent-panel">
            <div className="parent-panel-header">5th Semester - Full Marksheet</div>
            <table className="res-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Subject Code</th>
                  <th>Subject Name</th>
                  <th>Internal (30)</th>
                  <th>External (70)</th>
                  <th>Total (100)</th>
                  <th>Grade</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {marksheet.map((row, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{row.code}</td>
                    <td style={{ fontWeight: '600' }}>{row.name}</td>
                    <td>{row.internal}</td>
                    <td>{row.external}</td>
                    <td style={{ fontWeight: '700' }}>{row.total}</td>
                    <td style={{ fontWeight: '700' }}>{row.grade}</td>
                    <td><span className="res-badge pass">PASS</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="att-alert-box info mt-auto">
              <FaInfoCircle /> Great Performance! Your ward has passed the semester.
            </div>
          </div>

          {/* Grade Scale & Summary Split */}
          <div className="res-split-grid">
            <div className="parent-panel">
              <div className="parent-panel-header">Grade Scale</div>
              <table className="res-table no-border alt-rows">
                <tbody>
                  <tr><td>90 - 100</td><td style={{fontWeight:'600'}}>O (Outstanding)</td></tr>
                  <tr><td>80 - 89</td><td style={{fontWeight:'600'}}>A+ (Excellent)</td></tr>
                  <tr><td>70 - 79</td><td style={{fontWeight:'600'}}>A (Very Good)</td></tr>
                  <tr><td>60 - 69</td><td style={{fontWeight:'600'}}>B+ (Good)</td></tr>
                  <tr><td>50 - 59</td><td style={{fontWeight:'600'}}>B (Average)</td></tr>
                  <tr><td>Below 50</td><td style={{fontWeight:'600'}}>F (Fail)</td></tr>
                </tbody>
              </table>
            </div>
            
            <div className="parent-panel">
              <div className="parent-panel-header">Result Summary</div>
              <table className="res-table no-border alt-rows">
                <tbody>
                  <tr><td style={{fontWeight:'600'}}>Total Subjects</td><td style={{fontWeight:'700', textAlign:'right'}}>8</td></tr>
                  <tr><td style={{fontWeight:'600'}}>Pass</td><td style={{fontWeight:'700', textAlign:'right', color:'#16a34a'}}>8</td></tr>
                  <tr><td style={{fontWeight:'600'}}>Fail</td><td style={{fontWeight:'700', textAlign:'right', color:'#dc2626'}}>0</td></tr>
                  <tr><td style={{fontWeight:'600'}}>Backlogs</td><td style={{fontWeight:'700', textAlign:'right', color:'#16a34a'}}>0</td></tr>
                  <tr><td style={{fontWeight:'600'}}>Result Status</td><td style={{fontWeight:'700', textAlign:'right', color:'#16a34a'}}>PASS</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="res-right-col">
          {/* Progression */}
          <div className="parent-panel" style={{ paddingBottom: '16px' }}>
            <div className="parent-panel-header">SGPA Progression</div>
            <SgpaChart />
          </div>

          {/* Backlogs */}
          <div className="parent-panel">
            <div className="parent-panel-header">Backlog Details</div>
            <table className="res-table">
              <thead>
                <tr>
                  <th>Subject Code</th>
                  <th>Subject Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="3" style={{textAlign: 'center', color: '#64748b', padding: '24px 0'}}>No active backlogs</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Teacher Remarks */}
          <div className="parent-panel res-remark-panel">
            <div className="parent-panel-header" style={{ marginBottom: '16px' }}>Teacher Remarks</div>
            <div className="res-remark-box">
              <div className="res-remark-icon"><FaUserTie /></div>
              <div className="res-remark-text">
                <p>Lakshmi is performing well in most subjects. She has good understanding in programming subjects. Need to improve in Computer Networks.</p>
                <div className="res-remark-author">
                  - Prof. Kavya (Class Advisor)<br/>20 May 2026
                </div>
              </div>
            </div>
          </div>

          {/* Important Notifications */}
          <div className="parent-panel">
            <div className="parent-panel-header" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              Important Notifications
              <a href="#" style={{fontSize: '12px', color:'#3b82f6', textDecoration:'none', fontWeight:'700'}}>View All</a>
            </div>
            <div className="res-notif-list">
              <div className="res-notif-item">
                <div className="res-notif-icon green"><FaClipboardCheck /></div>
                <div className="res-notif-content">
                  <h5>V Semester results published</h5>
                  <span>22 May 2026</span>
                </div>
              </div>
              <div className="res-notif-item">
                <div className="res-notif-icon green"><FaClipboardCheck /></div>
                <div className="res-notif-content">
                  <h5>No backlogs remaining</h5>
                  <span>22 May 2026</span>
                </div>
              </div>
              <div className="res-notif-item">
                <div className="res-notif-icon blue"><FaTimesCircle /></div>
                <div className="res-notif-content">
                  <h5>VI Semester classes start from 02 Jun 2026</h5>
                  <span>20 May 2026</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Banner */}
      <div className="res-footer-banner">
        <FaStarHalfAlt size={16} /> Encourage regular study and aim for even better results in the next semester!
      </div>

    </div>
  );
}
