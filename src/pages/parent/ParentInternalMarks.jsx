import React from 'react';
import { 
  FaUserAlt, FaCalendarCheck, FaShieldAlt, FaChartLine, FaCheckCircle, 
  FaExclamationTriangle, FaCommentDots, FaArrowUp, FaArrowDown, FaBook
} from 'react-icons/fa';
import './Parent.css';

const PerformanceDonut = ({ percentage }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  return (
    <div style={{ position: 'relative', width: '140px', height: '140px' }}>
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="16" />
        {/* Needs Improvement: Red (0) */}
        {/* Average: Yellow 2/6 = 33% */}
        <circle 
          cx="70" cy="70" r={radius} fill="none" stroke="#f59e0b" strokeWidth="16" 
          strokeDasharray={`${circumference * 0.33} ${circumference}`}
          strokeLinecap="round" transform="rotate(-90 70 70)"
        />
        {/* Good: Blue 3/6 = 50% */}
        <circle 
          cx="70" cy="70" r={radius} fill="none" stroke="#3b82f6" strokeWidth="16" 
          strokeDasharray={`${circumference * 0.50} ${circumference}`}
          strokeDashoffset={-circumference * 0.33} strokeLinecap="round" transform="rotate(-90 70 70)"
        />
        {/* Excellent: Green 1/6 = 17% */}
        <circle 
          cx="70" cy="70" r={radius} fill="none" stroke="#10b981" strokeWidth="16" 
          strokeDasharray={`${circumference * 0.17} ${circumference}`}
          strokeDashoffset={-circumference * 0.83} strokeLinecap="round" transform="rotate(-90 70 70)"
        />
      </svg>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>{percentage}%</span>
        <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Overall Average</span>
      </div>
    </div>
  );
};

export default function ParentInternalMarks() {
  const subjects = [
    { code: "BCA501", name: "Database Management Systems", t1: 18, t2: 17, avg: 17.5, grade: "A", perf: "Good" },
    { code: "BCA502", name: "Computer Networks", t1: 15, t2: 16, avg: 15.5, grade: "B+", perf: "Average" },
    { code: "BCA503", name: "Python Programming", t1: 19, t2: 18, avg: 18.5, grade: "A+", perf: "Excellent" },
    { code: "BCA504", name: "Web Technologies", t1: 17, t2: 16, avg: 16.5, grade: "A", perf: "Good" },
    { code: "BCA505", name: "Operating Systems", t1: 16, t2: 15, avg: 15.5, grade: "B+", perf: "Average" },
    { code: "BCA506", name: "Software Engineering", t1: 14, t2: 16, avg: 15.0, grade: "B", perf: "Average" },
  ];

  const improvementData = [
    { name: "Database Management Systems", prev: 70, curr: 87.5, imp: "+17.5%" },
    { name: "Computer Networks", prev: 68, curr: 77.5, imp: "+9.5%" },
    { name: "Python Programming", prev: 75, curr: 92.5, imp: "+17.5%" },
    { name: "Web Technologies", prev: 72, curr: 82.5, imp: "+10.5%" },
    { name: "Operating Systems", prev: 65, curr: 77.5, imp: "+12.5%" },
    { name: "Software Engineering", prev: 66, curr: 75, imp: "+9%" },
  ];

  const testHistory = [
    { test: "Internal Test - 1", date: "10 May 2026", subjects: "All 6 Subjects", published: "12 May 2026" },
    { test: "Internal Test - 2", date: "20 May 2026", subjects: "All 6 Subjects", published: "22 May 2026" },
  ];

  return (
    <div className="att-dashboard-wrapper">
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>Internal Marks Dashboard</h2>
        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '14px' }}>Track your ward's internal assessment performance</p>
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
      <div className="im-kpi-grid">
        <div className="im-kpi-card">
          <div className="im-icon-box" style={{ background: '#f3e8ff', color: '#a855f7' }}><FaCalendarCheck /></div>
          <div>
            <span className="im-kpi-label">Internal Marks Average</span>
            <h2 className="im-kpi-value" style={{ color: '#a855f7' }}>72%</h2>
            <span className="im-kpi-subtext" style={{ color: '#10b981' }}>Good Performance</span>
          </div>
        </div>
        <div className="im-kpi-card">
          <div className="im-icon-box" style={{ background: '#dcfce7', color: '#10b981' }}><FaShieldAlt /></div>
          <div>
            <span className="im-kpi-label">Highest Subject</span>
            <h2 className="im-kpi-value">Python Programming</h2>
            <span className="im-kpi-subtext" style={{ color: '#10b981', fontSize: '14px', fontWeight: '700' }}>85%</span>
          </div>
        </div>
        <div className="im-kpi-card">
          <div className="im-icon-box" style={{ background: '#fef3c7', color: '#f59e0b' }}><FaChartLine /></div>
          <div>
            <span className="im-kpi-label">Improvement</span>
            <h2 className="im-kpi-value" style={{ color: '#f59e0b' }}>+6%</h2>
            <span className="im-kpi-subtext">Compared to Last Month</span>
          </div>
        </div>
        <div className="im-kpi-card">
          <div className="im-icon-box" style={{ background: '#eff6ff', color: '#3b82f6' }}><FaCalendarCheck /></div>
          <div>
            <span className="im-kpi-label">Tests Completed</span>
            <h2 className="im-kpi-value">2 / 2</h2>
            <span className="im-kpi-subtext">This Month</span>
          </div>
        </div>
        <div className="im-kpi-card">
          <div className="im-icon-box" style={{ background: '#fee2e2', color: '#ef4444' }}><FaBook /></div>
          <div>
            <span className="im-kpi-label">Total Subjects</span>
            <h2 className="im-kpi-value">6</h2>
          </div>
        </div>
      </div>

      {/* Middle Section: Subject Marks & Summary */}
      <div className="im-middle-grid">
        {/* Left: Detailed Marks Table */}
        <div className="parent-panel">
          <div className="parent-panel-header">Internal Marks - Subject Wise</div>
          <table className="im-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Subject Code</th>
                <th>Subject Name</th>
                <th>Test 1 (20)</th>
                <th>Test 2 (20)</th>
                <th>Average (20)</th>
                <th>Grade</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((sub, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{sub.code}</td>
                  <td style={{ fontWeight: '600' }}>{sub.name}</td>
                  <td>{sub.t1}</td>
                  <td>{sub.t2}</td>
                  <td style={{ fontWeight: '700' }}>{sub.avg}</td>
                  <td style={{ fontWeight: '700' }}>{sub.grade}</td>
                  <td>
                    <span className={`im-perf-badge ${sub.perf.toLowerCase()}`}>{sub.perf}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="im-view-btn mt-auto">View Detailed Marks &rarr;</button>
        </div>

        {/* Right: Summary & Remark */}
        <div className="im-right-col">
          <div className="parent-panel" style={{ flex: 1 }}>
            <div className="parent-panel-header">Subject Performance Summary</div>
            <div className="im-summary-content">
              <PerformanceDonut percentage={72} />
              <div className="im-legend">
                <div className="im-legend-item">
                  <div className="im-legend-dot" style={{ background: '#10b981' }}></div>
                  <span>Excellent (80-100)</span>
                  <strong>1</strong>
                </div>
                <div className="im-legend-item">
                  <div className="im-legend-dot" style={{ background: '#3b82f6' }}></div>
                  <span>Good (60-79)</span>
                  <strong>3</strong>
                </div>
                <div className="im-legend-item">
                  <div className="im-legend-dot" style={{ background: '#f59e0b' }}></div>
                  <span>Average (40-59)</span>
                  <strong>2</strong>
                </div>
                <div className="im-legend-item">
                  <div className="im-legend-dot" style={{ background: '#ef4444' }}></div>
                  <span>Needs Improvement (&lt;40)</span>
                  <strong>0</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="parent-panel im-remark-panel">
            <div className="parent-panel-header" style={{ marginBottom: '12px' }}>Teacher Remark</div>
            <div className="im-remark-box">
              <div className="im-remark-icon"><FaCommentDots /></div>
              <div className="im-remark-text">
                <p>Lakshmi is showing good understanding in most subjects. She is doing well in Python and DBMS. Needs to focus a little more on Computer Networks for better improvement.</p>
                <div className="im-remark-author">
                  - Prof. Kavya (Class Advisor)<br/>20 May 2026
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Improvement Analysis & Test History */}
      <div className="im-bottom-grid">
        <div className="parent-panel">
          <div className="parent-panel-header">Improvement Analysis</div>
          <table className="im-table no-border">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Previous Average</th>
                <th>Current Average</th>
                <th>Improvement</th>
              </tr>
            </thead>
            <tbody>
              {improvementData.map((item, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: '600', fontSize: '12px' }}>{item.name}</td>
                  <td>
                    <div className="im-progress-bar">
                      <span>{item.prev}%</span>
                      <div className="im-bar-bg"><div className="im-bar-fill" style={{ width: `${item.prev}%`, background: '#cbd5e1' }}></div></div>
                    </div>
                  </td>
                  <td>
                    <div className="im-progress-bar">
                      <span>{item.curr}%</span>
                      <div className="im-bar-bg"><div className="im-bar-fill" style={{ width: `${item.curr}%`, background: '#10b981' }}></div></div>
                    </div>
                  </td>
                  <td style={{ color: '#16a34a', fontWeight: '700', fontSize: '12px' }}>
                    {item.imp} <FaArrowUp size={10} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="att-alert-box success mt-auto">
            <FaCheckCircle /> Great! Overall improvement of 11.9% compared to last month.
          </div>
        </div>

        <div className="parent-panel">
          <div className="parent-panel-header">Test History (This Month)</div>
          <table className="im-table alternate">
            <thead>
              <tr>
                <th>Test</th>
                <th>Date</th>
                <th>Subjects</th>
                <th>Published On</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {testHistory.map((test, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: '600' }}>{test.test}</td>
                  <td>{test.date}</td>
                  <td>{test.subjects}</td>
                  <td>{test.published}</td>
                  <td><a href="#" className="im-link">View Marks</a></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="im-view-btn mt-auto" style={{ width: 'fit-content', margin: 'auto auto 0 auto' }}>View All Tests &rarr;</button>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="im-footer-banner">
        <FaCheckCircle size={16} /> Internal marks contribute to final evaluation. Encourage regular study and timely submissions.
      </div>

    </div>
  );
}
