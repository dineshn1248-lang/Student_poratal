import re

file_path = r'c:\Users\dines.DELL\Desktop\New folder (2)\student_portal\src\pages\faculty\FacultyDashboard.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add currentTime state
state_target = 'const [actionSuccess, setActionSuccess] = useState(\'\');'
state_replacement = """const [actionSuccess, setActionSuccess] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);"""
content = content.replace(state_target, state_replacement)

# Update the header date section
header_target = """<div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '6px 12px' }}>
              <FaCalendarAlt style={{ color: '#3b82f6' }} />
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a' }}>20 May 2026 Tuesday</span>
            </div>"""

header_replacement = """<div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
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
            </div>"""
content = content.replace(header_target, header_replacement)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated FacultyDashboard.jsx to include live time and System Live indicator")
