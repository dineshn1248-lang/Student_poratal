import React, { useState } from 'react';
import { 
  FaUserAlt, FaCheck, FaBell, FaExclamationTriangle, 
  FaCalendarAlt, FaFileAlt, FaBookOpen, FaExclamationCircle, 
  FaCog, FaInfoCircle
} from 'react-icons/fa';
import './Parent.css';

export default function ParentNotifications() {
  const [activeTab, setActiveTab] = useState('All');

  const notifications = [
    {
      id: 1,
      type: 'academic',
      color: 'blue',
      icon: <FaFileAlt />,
      title: "Internal Test 2 marks published",
      message: "Internal Test 2 marks for all subjects have been published.",
      linkText: "View Marks",
      date: "22 May 2026",
      time: "10:30 AM",
      unread: true
    },
    {
      id: 2,
      type: 'attendance',
      color: 'orange',
      icon: <FaExclamationTriangle />,
      title: "Attendance below 75% in Computer Networks",
      message: "Lakshmi's attendance in Computer Networks is below 75%.",
      linkText: "View Attendance",
      date: "20 May 2026",
      time: "09:15 AM",
      unread: true
    },
    {
      id: 3,
      type: 'general',
      color: 'green',
      icon: <FaCalendarAlt />,
      title: "Parent-Teacher meeting on 28 May 2026",
      message: "PTM is scheduled on 28 May 2026 (Thursday).",
      linkText: "View Details",
      date: "19 May 2026",
      time: "04:20 PM",
      unread: true
    },
    {
      id: 4,
      type: 'academic',
      color: 'purple',
      icon: <FaFileAlt />,
      title: "5th Semester results published",
      message: "5th Semester results have been published.",
      linkText: "View Result",
      date: "18 May 2026",
      time: "11:45 AM",
      unread: true
    },
    {
      id: 5,
      type: 'exams',
      color: 'blue',
      icon: <FaBookOpen />,
      title: "VI Semester exam timetable released",
      message: "Exam timetable for VI Semester (May/June 2026) is released.",
      linkText: "View Timetable",
      date: "17 May 2026",
      time: "03:10 PM",
      unread: false
    },
    {
      id: 6,
      type: 'academic',
      color: 'green',
      icon: <FaCheck />,
      title: "All previous subjects cleared",
      message: "Lakshmi has successfully cleared all subjects.",
      linkText: "View Results",
      date: "15 May 2026",
      time: "10:05 AM",
      unread: false
    }
  ];

  return (
    <div className="att-dashboard-wrapper">
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>Notifications</h2>
        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '14px' }}>Stay updated with all important updates and announcements</p>
      </div>

      {/* Profile Strip (No Selectors) */}
      <div className="att-profile-strip" style={{ justifyContent: 'flex-start' }}>
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
      </div>

      {/* Main Layout Grid */}
      <div className="notif-main-grid">
        
        {/* LEFT COLUMN: Notification Feed */}
        <div className="notif-left-col">
          
          {/* Filters Row */}
          <div className="notif-filter-bar">
            <div className="notif-tabs">
              {['All', 'Academic', 'Exams', 'Attendance', 'General'].map(tab => (
                <button 
                  key={tab}
                  className={`notif-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button className="notif-mark-read">
              <FaCheck /> Mark all as read
            </button>
          </div>

          {/* Notifications List */}
          <div className="notif-list-container">
            {notifications.map((notif) => (
              <div key={notif.id} className={`notif-card ${notif.unread ? `unread tint-${notif.color}` : ''}`}>
                <div className={`notif-card-icon icon-${notif.color}`}>
                  {notif.icon}
                </div>
                
                <div className="notif-card-body">
                  <h4>{notif.title}</h4>
                  <p>{notif.message}</p>
                  <a href="#" className="notif-card-link">{notif.linkText} &rarr;</a>
                </div>
                
                <div className="notif-card-meta">
                  <div className="notif-meta-date">
                    <span>{notif.date}</span>
                    <span className="notif-meta-time">{notif.time}</span>
                  </div>
                  <div className={`notif-dot ${notif.unread ? 'unread' : 'read'}`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="notif-pagination-row">
            <span className="notif-pagination-info">Showing 1 to 6 of 18 notifications</span>
            <div className="notif-pagination-controls">
              <button className="notif-page-btn">&lt;</button>
              <button className="notif-page-btn active">1</button>
              <button className="notif-page-btn">2</button>
              <button className="notif-page-btn">3</button>
              <button className="notif-page-btn">&gt;</button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Widgets */}
        <div className="notif-right-col">
          
          {/* Important Alerts */}
          <div className="parent-panel" style={{ padding: '24px' }}>
            <div className="parent-panel-header" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <FaBell style={{ color: '#64748b' }} /> Important Alerts
            </div>
            
            <div className="notif-alert-box bg-red-tint">
              <div className="notif-alert-icon bg-red"><FaExclamationCircle /></div>
              <div className="notif-alert-text">
                <h5>Attendance Alert</h5>
                <p>Ensure regular attendance to avoid academic issues.</p>
              </div>
            </div>

            <div className="notif-alert-box bg-yellow-tint">
              <div className="notif-alert-icon bg-yellow"><FaFileAlt /></div>
              <div className="notif-alert-text">
                <h5>Internal Marks Published</h5>
                <p>Check internal marks and encourage consistent improvement.</p>
              </div>
            </div>

            <div className="notif-alert-box bg-green-tint">
              <div className="notif-alert-icon bg-green"><FaBookOpen /></div>
              <div className="notif-alert-text">
                <h5>Exam Preparation</h5>
                <p>Encourage regular study and timely completion of assignments.</p>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="parent-panel" style={{ padding: '24px' }}>
            <div className="parent-panel-header" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <FaCog style={{ color: '#64748b' }} /> Notification Settings
            </div>
            <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#64748b' }}>Choose what updates you want to receive</p>
            
            <div className="notif-settings-list">
              
              <div className="notif-setting-item">
                <div className="notif-setting-info">
                  <h5>Academic Updates</h5>
                  <p>Marks, results, academic notices</p>
                </div>
                <div className="notif-toggle active"><div className="toggle-circle"></div></div>
              </div>
              
              <div className="notif-setting-item">
                <div className="notif-setting-info">
                  <h5>Attendance Alerts</h5>
                  <p>Attendance warnings and alerts</p>
                </div>
                <div className="notif-toggle active"><div className="toggle-circle"></div></div>
              </div>

              <div className="notif-setting-item">
                <div className="notif-setting-info">
                  <h5>Exam Notifications</h5>
                  <p>Timetables, hall tickets, results</p>
                </div>
                <div className="notif-toggle active"><div className="toggle-circle"></div></div>
              </div>

              <div className="notif-setting-item">
                <div className="notif-setting-info">
                  <h5>General Notices</h5>
                  <p>General announcements</p>
                </div>
                <div className="notif-toggle active"><div className="toggle-circle"></div></div>
              </div>

            </div>

            <button className="notif-update-btn">Update Preferences</button>
          </div>

        </div>

      </div>

      {/* Footer Banner */}
      <div className="notif-footer-banner">
        <FaInfoCircle size={16} /> Keep checking notifications regularly to stay informed about your ward's academic progress.
      </div>

    </div>
  );
}
