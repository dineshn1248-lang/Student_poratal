import re

with open('src/pages/parent/ParentDashboard.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add FaUserTie import
content = re.sub(
    r'FaExclamationTriangle, FaStar, FaQuoteLeft, FaStarHalfAlt, FaFileAlt\n} from \'react-icons/fa\';',
    r'FaExclamationTriangle, FaStar, FaQuoteLeft, FaStarHalfAlt, FaFileAlt, FaUserTie\n} from \'react-icons/fa\';',
    content
)

# 2. Add studentName variables
content = re.sub(
    r'const getBacklogsNumber = \(\) => \{\n    if \(stats && stats\.backlogs !== undefined\) \{\n      const num = parseInt\(stats\.backlogs\);\n      return isNaN\(num\) \? 0 : num;\n    \}\n    return 0; // Default mock fallback is now 0\n  \};\n\n  if \(loading\) return <div>Loading dashboard...</div>;\n\n  const attendanceNum = getOverallAttendanceNumber\(\);\n  const backlogsNum = getBacklogsNumber\(\);',
    r'''const getBacklogsNumber = () => {
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
  }''',
    content
)

# 3. Dynamic PASS/FAIL Semester Result
content = re.sub(
    r'<div className="parent-kpi-icon" style={{ background: \'#dcfce7\', color: \'#10b981\' }}>\n            <FaCheckCircle />\n          </div>\n          <div className="parent-kpi-content">\n            <h4>Semester Result</h4>\n            <h2 style={{ color: \'#10b981\' }}>PASS</h2>\n            <p style={{ color: \'#10b981\' }}>Result Declared</p>\n          </div>',
    r'''<div className="parent-kpi-icon" style={{ background: isFailed ? '#fee2e2' : '#dcfce7', color: isFailed ? '#ef4444' : '#10b981' }}>
            {isFailed ? <FaExclamationTriangle /> : <FaCheckCircle />}
          </div>
          <div className="parent-kpi-content">
            <h4>Semester Result</h4>
            <h2 style={{ color: isFailed ? '#ef4444' : '#10b981' }}>{isFailed ? 'FAIL' : 'PASS'}</h2>
            <p style={{ color: isFailed ? '#ef4444' : '#10b981' }}>Result Declared</p>
          </div>''',
    content
)

# 4. Remove Lakshmi Strip and add Dynamic Profile Snapshot
content = re.sub(
    r'{/\* 2\. STUDENT PROFILE STRIP \*/}\n      <div className="parent-student-strip">\n        <img src="https://ui-avatars\.com/api/\?name=Lakshmi\+Nisimappa\+Chakrasali&background=1e293b&color=fff" alt="Student" className="parent-student-avatar" />\n        <div className="parent-student-details">\n          <h3>Lakshmi Nisimappa Chakrasali</h3>\n          <div className="parent-student-meta">\n            <span><FaUserGraduate /> Reg No: U24AN23S0245</span>\n            <span>BCA</span>\n            <span>6th Semester</span>\n            <span>Section A</span>\n          </div>\n        </div>\n      </div>',
    r'''{/* 2. MAIN DASHBOARD AREA */}
      <div className="parent-dashboard-main">
        {/* Profile Snapshot */}
        <div className="parent-snapshot-card">
          <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(studentName)}&background=1e293b&color=fff`} alt="Student" className="parent-student-avatar" />
          <div className="parent-student-info">
            <h3>{studentName}</h3>
            <p>BCA - 6th Semester (Section A)</p>
          </div>
        </div>
      </div>''',
    content
)

# 5. Fix Full Marksheet rendering
content = re.sub(
    r'<tbody>\n              \{fullMarksheet\.map\(\(row, i\) => \(\n                <tr key=\{i\} className="parent-table-row">\n                  <td style=\{\{ fontWeight: \'600\' \}\}>\{row\.subject\}</td>\n                  <td>\{row\.total\}</td>\n                  <td style=\{\{ fontWeight: \'800\' \}\}>\{row\.obtained\}</td>\n                  <td>\n                    <span style=\{\{ background: \'#dcfce7\', color: \'#166534\', padding: \'4px 8px\', borderRadius: \'4px\', fontSize: \'12px\', fontWeight: \'bold\' \}\}>\n                      \{row\.result\}\n                    </span>\n                  </td>\n                </tr>\n              \)\)\}\n            </tbody>',
    r'''<tbody>
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
            </tbody>''',
    content
)

# 6. Mentor suggestion block replacement
content = re.sub(
    r'<div className="teacher-suggestion-box">\n            <FaQuoteLeft className="quote-icon" />\n            <p className="teacher-suggestion-text">\n              Lakshmi is doing well in most subjects\. She needs to improve her attendance in Computer Networks and focus more on practical sessions\.\n            </p>\n          </div>',
    r'''<div className="teacher-suggestion-box">
            <div className="parent-panel-content">
              <p className="parent-remark-text">
                {firstName} is doing well in most subjects. Needs to improve attendance in Computer Networks and focus more on practical sessions.
              </p>
            </div>
          </div>''',
    content
)

content = re.sub(
    r'<FaStarHalfAlt size=\{18\} />\n        Keep encouraging Lakshmi\. Regular study and consistent attendance will help her achieve academic success!',
    r'''<div className="parent-panel-content mentor-note">
          <div className="mentor-avatar">
            <FaUserTie size={24} color="#6366f1" />
          </div>
          <div className="mentor-message">
            <h4>Note from Class Mentor</h4>
            <p>
              Keep encouraging {firstName}. Regular study and consistent attendance will help them achieve academic success!
            </p>
          </div>
        </div>''',
    content
)

with open('src/pages/parent/ParentDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("ParentDashboard.jsx rewritten successfully.")
