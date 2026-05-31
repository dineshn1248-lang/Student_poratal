import re

file_path = r'c:\Users\dines.DELL\Desktop\New folder (2)\student_portal\src\pages\faculty\FacultyDashboard.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the sidebar header part to match HOD Sidebar
old_sidebar_header = """<div className="sidebar-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '20px' }}>
            <div className="logo-section">
              <div className="logo-icon" style={{ background: '#3b82f6', color: 'white', fontWeight: '950' }}>U</div>
              <div>
                <span className="logo-text" style={{ fontWeight: '950', color: 'white', letterSpacing: '-0.5px' }}>UUCMS</span>
                <span className="portal-tag" style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.5px', textTransform: 'uppercase', margin: 0 }}>COLLEGE SYSTEM</span>
              </div>
            </div>
          </div>"""

new_sidebar_header = """<div className="sidebar-logo-area" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '30px 25px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="logo-circle" style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
               <FaBookOpen style={{color: 'white'}} />
            </div>
            <div className="logo-text" style={{ display: 'flex', flexDirection: 'column' }}>
                <h1 style={{ fontSize: '18px', margin: 0, fontWeight: '900', color: '#ffffff', letterSpacing: '0.5px', lineHeight: '1.2' }}>UUCMS</h1>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: '800', letterSpacing: '0.5px' }}>NRUPATHUNGA UNIV</span>
            </div>
          </div>
          
          <div className="sidebar-menu-title" style={{ padding: '20px 25px 10px', fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>MENU</div>"""

content = content.replace(old_sidebar_header, new_sidebar_header)

# Replace the sidebar nav mapping
old_nav = """<nav className="sidebar-nav" style={{ marginTop: '20px' }}>
            <ul>
              {[
                { id: "Dashboard", icon: <FaThLarge />, label: "Dashboard" },
                { id: "My Profile", icon: <FaUser />, label: "My Profile" },
                { id: "Students", icon: <FaUsers />, label: "Students" },
                { id: "Attendance", icon: <FaCalendarCheck />, label: "Attendance" },
                { id: "Internal Marks", icon: <FaFileAlt />, label: "Internal Marks" },
                { id: "Assignments", icon: <FaTasks />, label: "Assignments" },
                { id: "Timetable", icon: <FaClock />, label: "Timetable" },
                { id: "Announcements", icon: <FaBullhorn />, label: "Announcements" }
              ].map(item => (
                <li 
                  key={item.id}
                  className={activeSection === item.id ? "active" : ""}
                  onClick={() => setActiveSection(item.id)}
                >
                  {item.icon}
                  {open && <span>{item.label}</span>}
                </li>
              ))}
            </ul>
          </nav>"""

new_nav = """<nav className="sidebar-nav" style={{ flex: 1, padding: '10px 15px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {[
                { id: "Dashboard", icon: <FaThLarge />, label: "Dashboard" },
                { id: "My Profile", icon: <FaUser />, label: "My Profile" },
                { id: "Students", icon: <FaUsers />, label: "Students" },
                { id: "Attendance", icon: <FaCalendarCheck />, label: "Attendance" },
                { id: "Internal Marks", icon: <FaFileAlt />, label: "Internal Marks" },
                { id: "Assignments", icon: <FaTasks />, label: "Assignments" },
                { id: "Timetable", icon: <FaClock />, label: "Timetable" },
                { id: "Announcements", icon: <FaBullhorn />, label: "Announcements" }
              ].map(item => (
                <div 
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  style={{
                    display: 'flex', alignItems: 'center', padding: '12px 18px', borderRadius: '10px', 
                    color: activeSection === item.id ? 'white' : 'rgba(255,255,255,0.6)', 
                    cursor: 'pointer', transition: 'all 0.2s',
                    background: activeSection === item.id ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : 'transparent',
                    boxShadow: activeSection === item.id ? '0 4px 15px rgba(37, 99, 235, 0.3)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== item.id) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== item.id) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                    }
                  }}
                >
                  <div style={{ fontSize: '18px', width: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.icon}
                  </div>
                  {open && <span style={{ marginLeft: '15px', fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap' }}>{item.label}</span>}
                </div>
              ))}
            </div>
          </nav>"""

content = content.replace(old_nav, new_nav)

# Fix the logout button styling to match HOD (orange)
old_logout = """<button className="logout-btn" onClick={handleLogout} style={{ border: 'none', cursor: 'pointer' }}>
          <FaSignOutAlt />
          {open && <span>Logout</span>}
        </button>"""

new_logout = """<div style={{ padding: '20px 15px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <button onClick={handleLogout} style={{ width: '100%', padding: '12px', background: '#f97316', border: 'none', borderRadius: '10px', color: 'white', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', transition: 'all 0.2s' }}>
            <FaSignOutAlt />
            {open && <span>Logout</span>}
          </button>
        </div>"""

content = content.replace(old_logout, new_logout)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated FacultyDashboard.jsx sidebar design")
