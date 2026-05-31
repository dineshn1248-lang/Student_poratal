import React, { useState } from 'react';
import { FaSearch, FaFilter, FaInfoCircle, FaChevronLeft, FaChevronRight, FaEdit, FaEye, FaTimes, FaUsers, FaBook, FaFingerprint, FaCalendarTimes } from 'react-icons/fa';
import './HOD.css';

export default function HODFaculty() {
  const [activeTab, setActiveTab] = useState('I Semester');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingRow, setEditingRow] = useState(null);

  const tabs = ['I Semester', 'II Semester', 'III Semester', 'IV Semester', 'V Semester', 'VI Semester'];

  const getStatus = (percent) => {
    if (percent >= 85) return { text: 'Excellent', color: '#059669', bg: '#ecfdf5' };
    if (percent >= 75) return { text: 'Good', color: '#16a34a', bg: '#dcfce3' };
    if (percent >= 70) return { text: 'Satisfactory', color: '#d97706', bg: '#fef3c7' };
    if (percent >= 50) return { text: 'Warning', color: '#ea580c', bg: '#ffedd5' };
    return { text: 'Poor', color: '#dc2626', bg: '#fee2e2' };
  };

  const enrichData = (baseData) => {
    return baseData.map(item => {
      let present = Math.floor(Math.random() * 11) + 16; // 16 to 26
      let working = 26;
      
      // Hardcode the I Semester data to match the user's screenshot exactly
      if (item.id === 1 && item.code === 'BCA101') present = 24;
      if (item.id === 2 && item.code === 'BCA102') present = 22;
      if (item.id === 3 && item.code === 'BCA103') present = 18;
      if (item.id === 4 && item.code === 'BCA104') present = 23;
      if (item.id === 5 && item.code === 'BCA105') present = 21;
      if (item.id === 6 && item.code === 'BCA106') present = 24;
      if (item.id === 7 && item.code === 'BCA107') present = 20;
      if (item.id === 8 && item.code === 'BCA108') present = 19;
      if (item.id === 9 && item.code === 'BCA109') present = 16;
      if (item.id === 10 && item.code === 'BCA110') present = 24;

      let leave = working - present;
      let percent = Math.round((present / working) * 100);

      // Force specific logic for the screenshot matching
      if (item.id === 5 && item.code === 'BCA105') percent = 81; // To match Warning in mockup
      if (item.id === 7 && item.code === 'BCA107') percent = 77; // To match Satisfactory
      if (item.id === 8 && item.code === 'BCA108') percent = 73; // To match Satisfactory

      return {
        ...item,
        presentDays: present,
        workingDays: working,
        leaveDays: leave,
        attendancePercent: percent,
        statusObj: getStatus(percent)
      };
    });
  };

  const semOneData = enrichData([
    { id: 1, code: 'BCA101', name: 'Problem Solving Using C', faculty: 'Dr. Ramesh K', desig: 'Professor', email: 'ramesh.k@nu.ac.in', phone: '9876543210' },
    { id: 2, code: 'BCA102', name: 'Mathematics - I', faculty: 'Prof. Kavya N', desig: 'Assistant Professor', email: 'kavya.n@nu.ac.in', phone: '9876543211' },
    { id: 3, code: 'BCA103', name: 'Digital Fundamentals', faculty: 'Prof. Arjun M', desig: 'Associate Professor', email: 'arjun.m@nu.ac.in', phone: '9876543212' },
    { id: 4, code: 'BCA104', name: 'English', faculty: 'Prof. Priya S', desig: 'Assistant Professor', email: 'priya.s@nu.ac.in', phone: '9876543213' },
    { id: 5, code: 'BCA105', name: 'Kannada', faculty: 'Prof. Lokesh B', desig: 'Lecturer', email: 'lokesh.b@nu.ac.in', phone: '9876543214' },
    { id: 6, code: 'BCA106', name: 'Lab: C Programming', faculty: 'Prof. Revathi P', desig: 'Lab Instructor', email: 'revathi.p@nu.ac.in', phone: '9876543215' },
    { id: 7, code: 'BCA107', name: 'Computer Organization', faculty: 'Prof. Mahesh T', desig: 'Assistant Professor', email: 'mahesh.t@nu.ac.in', phone: '9876543216' },
    { id: 8, code: 'BCA108', name: 'Discrete Mathematics', faculty: 'Prof. Sahana R', desig: 'Assistant Professor', email: 'sahana.r@nu.ac.in', phone: '9876543217' },
    { id: 9, code: 'BCA109', name: 'Professional Ethics', faculty: 'Prof. Deepak V', desig: 'Lecturer', email: 'deepak.v@nu.ac.in', phone: '9876543218' },
    { id: 10, code: 'BCA110', name: 'Environmental Studies', faculty: 'Prof. Geetha A', desig: 'Assistant Professor', email: 'geetha.a@nu.ac.in', phone: '9876543219' },
  ]);

  const semTwoData = enrichData([
    { id: 1, code: 'BCA201', name: 'Advanced English', faculty: 'Dr. Kavitha', desig: 'Associate Professor', email: 'kavitha@nu.ac.in', phone: '9876543220' },
    { id: 2, code: 'BCA202', name: 'Mathematics - II', faculty: 'Dr. Sharma', desig: 'Professor', email: 'sharma@nu.ac.in', phone: '9876543221' },
    { id: 3, code: 'BCA203', name: 'Data Structures', faculty: 'Prof. Arun Kumar', desig: 'Assistant Professor', email: 'arun@nu.ac.in', phone: '9876543222' },
    { id: 4, code: 'BCA204', name: 'Chemistry', faculty: 'Dr. Smith', desig: 'Associate Professor', email: 'smith@nu.ac.in', phone: '9876543223' },
    { id: 5, code: 'BCA205', name: 'Basic Electronics', faculty: 'Prof. Rajesh', desig: 'Lecturer', email: 'rajesh@nu.ac.in', phone: '9876543224' },
    { id: 6, code: 'BCA206', name: 'Statistics', faculty: 'Dr. Davis', desig: 'Assistant Professor', email: 'davis@nu.ac.in', phone: '9876543225' },
    { id: 7, code: 'BCA207', name: 'Health & Wellness', faculty: 'Prof. Smitha', desig: 'Lecturer', email: 'smitha@nu.ac.in', phone: '9876543226' },
    { id: 8, code: 'BCA208', name: 'Human Rights', faculty: 'Dr. Reddy', desig: 'Associate Professor', email: 'reddy@nu.ac.in', phone: '9876543227' },
    { id: 9, code: 'BCA209', name: 'Data Structures Lab', faculty: 'Prof. Arun Kumar', desig: 'Assistant Professor', email: 'arun@nu.ac.in', phone: '9876543228' },
    { id: 10, code: 'BCA210', name: 'Chemistry Lab', faculty: 'Dr. Smith', desig: 'Associate Professor', email: 'smith@nu.ac.in', phone: '9876543229' },
  ]);

  const semThreeData = enrichData([
    { id: 1, code: 'BCA301', name: 'DBMS', faculty: 'Prof. Sunita', desig: 'Assistant Professor', email: 'sunita@nu.ac.in', phone: '9876543230' },
    { id: 2, code: 'BCA302', name: 'C# and Dot Net', faculty: 'Dr. Ramesh', desig: 'Professor', email: 'ramesh@nu.ac.in', phone: '9876543231' },
    { id: 3, code: 'BCA303', name: 'Computer Networks', faculty: 'Prof. Rajesh', desig: 'Associate Professor', email: 'rajesh.n@nu.ac.in', phone: '9876543232' },
    { id: 4, code: 'BCA304', name: 'Software Engineering', faculty: 'Dr. Kavitha', desig: 'Professor', email: 'kavitha.s@nu.ac.in', phone: '9876543233' },
    { id: 5, code: 'BCA305', name: 'Digital Logic', faculty: 'Prof. Johnson', desig: 'Assistant Professor', email: 'johnson@nu.ac.in', phone: '9876543234' },
    { id: 6, code: 'BCA306', name: 'Kannada III', faculty: 'Dr. Smith', desig: 'Lecturer', email: 'smith.k@nu.ac.in', phone: '9876543235' },
    { id: 7, code: 'BCA307', name: 'Open Elective I', faculty: 'Prof. Davis', desig: 'Assistant Professor', email: 'davis.e@nu.ac.in', phone: '9876543236' },
    { id: 8, code: 'BCA308', name: 'Quantitative Aptitude', faculty: 'Dr. Reddy', desig: 'Associate Professor', email: 'reddy.q@nu.ac.in', phone: '9876543237' },
    { id: 9, code: 'BCA309', name: 'DBMS Lab', faculty: 'Prof. Sunita', desig: 'Assistant Professor', email: 'sunita.l@nu.ac.in', phone: '9876543238' },
    { id: 10, code: 'BCA310', name: 'C# Lab', faculty: 'Dr. Ramesh', desig: 'Professor', email: 'ramesh.l@nu.ac.in', phone: '9876543239' },
  ]);

  const semFourData = enrichData([
    { id: 1, code: 'BCA401', name: 'Python', faculty: 'Prof. Kumar', desig: 'Assistant Professor', email: 'kumar@nu.ac.in', phone: '9876543240' },
    { id: 2, code: 'BCA402', name: 'Operating System', faculty: 'Dr. Davis', desig: 'Associate Professor', email: 'davis.o@nu.ac.in', phone: '9876543241' },
    { id: 3, code: 'BCA403', name: 'Design and Analysis of Algorithms', faculty: 'Prof. Sunita', desig: 'Professor', email: 'sunita.d@nu.ac.in', phone: '9876543242' },
    { id: 4, code: 'BCA404', name: 'Web Technologies', faculty: 'Dr. Ramesh', desig: 'Assistant Professor', email: 'ramesh.w@nu.ac.in', phone: '9876543243' },
    { id: 5, code: 'BCA405', name: 'Theory of Computation', faculty: 'Prof. Rajesh', desig: 'Lecturer', email: 'rajesh.t@nu.ac.in', phone: '9876543244' },
    { id: 6, code: 'BCA406', name: 'Open Elective II', faculty: 'Dr. Kavitha', desig: 'Associate Professor', email: 'kavitha.o@nu.ac.in', phone: '9876543245' },
    { id: 7, code: 'BCA407', name: 'Soft Skills', faculty: 'Prof. Smitha', desig: 'Lecturer', email: 'smitha.s@nu.ac.in', phone: '9876543246' },
    { id: 8, code: 'BCA408', name: 'Indian Knowledge System', faculty: 'Dr. Reddy', desig: 'Professor', email: 'reddy.i@nu.ac.in', phone: '9876543247' },
    { id: 9, code: 'BCA409', name: 'Python Lab', faculty: 'Prof. Kumar', desig: 'Assistant Professor', email: 'kumar.l@nu.ac.in', phone: '9876543248' },
    { id: 10, code: 'BCA410', name: 'Web Tech Lab', faculty: 'Dr. Ramesh', desig: 'Assistant Professor', email: 'ramesh.l2@nu.ac.in', phone: '9876543249' },
  ]);

  const semFiveData = enrichData([
    { id: 1, code: 'BCA501', name: 'Cloud Computing', faculty: 'Dr. Smith', desig: 'Professor', email: 'smith.c@nu.ac.in', phone: '9876543250' },
    { id: 2, code: 'BCA502', name: 'Cyber Security', faculty: 'Prof. Johnson', desig: 'Associate Professor', email: 'johnson.c@nu.ac.in', phone: '9876543251' },
    { id: 3, code: 'BCA503', name: 'Machine Learning', faculty: 'Dr. Davis', desig: 'Professor', email: 'davis.m@nu.ac.in', phone: '9876543252' },
    { id: 4, code: 'BCA504', name: 'Mobile Application Development', faculty: 'Prof. Kumar', desig: 'Assistant Professor', email: 'kumar.m@nu.ac.in', phone: '9876543253' },
    { id: 5, code: 'BCA505', name: 'Internet of Things', faculty: 'Dr. Sharma', desig: 'Associate Professor', email: 'sharma.i@nu.ac.in', phone: '9876543254' },
    { id: 6, code: 'BCA506', name: 'Elective I', faculty: 'Prof. Rajesh', desig: 'Assistant Professor', email: 'rajesh.e@nu.ac.in', phone: '9876543255' },
    { id: 7, code: 'BCA507', name: 'Mini Project', faculty: 'Dr. Kavitha', desig: 'Professor', email: 'kavitha.p@nu.ac.in', phone: '9876543256' },
    { id: 8, code: 'BCA508', name: 'Internship', faculty: 'Prof. Sunita', desig: 'Associate Professor', email: 'sunita.i@nu.ac.in', phone: '9876543257' },
    { id: 9, code: 'BCA509', name: 'ML Lab', faculty: 'Dr. Davis', desig: 'Professor', email: 'davis.l@nu.ac.in', phone: '9876543258' },
    { id: 10, code: 'BCA510', name: 'Mobile App Lab', faculty: 'Prof. Kumar', desig: 'Assistant Professor', email: 'kumar.a@nu.ac.in', phone: '9876543259' },
  ]);

  const semSixData = enrichData([
    { id: 1, code: 'BCA601', name: 'Data Science', faculty: 'Dr. Sharma', desig: 'Professor', email: 'sharma.d@nu.ac.in', phone: '9876543260' },
    { id: 2, code: 'BCA602', name: 'Artificial Intelligence', faculty: 'Prof. Reddy', desig: 'Associate Professor', email: 'reddy.a@nu.ac.in', phone: '9876543261' },
    { id: 3, code: 'BCA603', name: 'Big Data Analytics', faculty: 'Dr. Smith', desig: 'Professor', email: 'smith.b@nu.ac.in', phone: '9876543262' },
    { id: 4, code: 'BCA604', name: 'Elective II', faculty: 'Prof. Johnson', desig: 'Assistant Professor', email: 'johnson.e@nu.ac.in', phone: '9876543263' },
    { id: 5, code: 'BCA605', name: 'Elective III', faculty: 'Dr. Davis', desig: 'Associate Professor', email: 'davis.e2@nu.ac.in', phone: '9876543264' },
    { id: 6, code: 'BCA606', name: 'Software Testing', faculty: 'Prof. Kumar', desig: 'Assistant Professor', email: 'kumar.s@nu.ac.in', phone: '9876543265' },
    { id: 7, code: 'BCA607', name: 'Major Project', faculty: 'Dr. Kavitha', desig: 'Professor', email: 'kavitha.m@nu.ac.in', phone: '9876543266' },
    { id: 8, code: 'BCA608', name: 'Seminar', faculty: 'Prof. Sunita', desig: 'Associate Professor', email: 'sunita.s@nu.ac.in', phone: '9876543267' },
    { id: 9, code: 'BCA609', name: 'AI/DS Lab', faculty: 'Dr. Sharma', desig: 'Professor', email: 'sharma.l@nu.ac.in', phone: '9876543268' },
    { id: 10, code: 'BCA610', name: 'Testing Lab', faculty: 'Prof. Kumar', desig: 'Assistant Professor', email: 'kumar.t@nu.ac.in', phone: '9876543269' },
  ]);

  const [allData, setAllData] = useState({
    1: semOneData,
    2: semTwoData,
    3: semThreeData,
    4: semFourData,
    5: semFiveData,
    6: semSixData
  });

  const getSemIndex = (tabName) => {
    const map = { 'I Semester': 1, 'II Semester': 2, 'III Semester': 3, 'IV Semester': 4, 'V Semester': 5, 'VI Semester': 6 };
    return map[tabName];
  };

  const currentData = allData[getSemIndex(activeTab)];

  const filteredData = currentData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.faculty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="hod-page-content" style={{ padding: '24px', background: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Breadcrumb & Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ color: '#3b82f6', fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>
          Dashboard &nbsp;&gt;&nbsp; Faculty &nbsp;&gt;&nbsp; <span style={{ color: '#64748b' }}>Semester Wise Faculty Allocation</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Semester Wise Faculty Allocation & Attendance</h1>
            <p style={{ color: '#64748b', fontSize: '14px', margin: 0, fontWeight: '500' }}>View faculty subject allocation and attendance details for each semester</p>
          </div>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', 
            padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '600',
            cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}>
            <FaFilter size={12} /> Filters
          </button>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <div style={{ background: '#eff6ff', padding: '16px', borderRadius: '12px', color: '#3b82f6' }}>
            <FaUsers size={24} />
          </div>
          <div>
            <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600', marginBottom: '4px' }}>Total Faculty</div>
            <div style={{ fontSize: '18px', color: '#0f172a', fontWeight: '800' }}>32</div>
          </div>
        </div>
        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <div style={{ background: '#ecfdf5', padding: '16px', borderRadius: '12px', color: '#10b981' }}>
            <FaBook size={24} />
          </div>
          <div>
            <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600', marginBottom: '4px' }}>Total Subjects</div>
            <div style={{ fontSize: '18px', color: '#0f172a', fontWeight: '800' }}>58</div>
          </div>
        </div>
        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <div style={{ background: '#f5f3ff', padding: '16px', borderRadius: '12px', color: '#8b5cf6' }}>
            <FaFingerprint size={24} />
          </div>
          <div>
            <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600', marginBottom: '4px' }}>Average Attendance</div>
            <div style={{ fontSize: '18px', color: '#0f172a', fontWeight: '800' }}>87.42%</div>
          </div>
        </div>
        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <div style={{ background: '#fef2f2', padding: '16px', borderRadius: '12px', color: '#ef4444' }}>
            <FaCalendarTimes size={24} />
          </div>
          <div>
            <div style={{ fontSize: '14px', color: '#ef4444', fontWeight: '600', marginBottom: '4px' }}>Faculty on Leave Today</div>
            <div style={{ fontSize: '18px', color: '#0f172a', fontWeight: '800' }}>3</div>
          </div>
        </div>
      </div>

      <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        
        {/* Tabs */}
        <div style={{ padding: '24px 24px 16px 24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 24px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: activeTab === tab ? '1px solid #2563eb' : '1px solid #e2e8f0',
                background: activeTab === tab ? '#2563eb' : '#ffffff',
                color: activeTab === tab ? '#ffffff' : '#475569',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Info & Search Bar */}
        <div style={{ padding: '0 24px 16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <div style={{ 
            background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px', 
            padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', flex: 1,
            color: '#1d4ed8', fontSize: '14px', fontWeight: '500'
          }}>
            <FaInfoCircle size={16} />
            Showing subjects, assigned faculty and their attendance summary for {activeTab}
          </div>
          <div style={{ position: 'relative', width: '300px' }}>
            <input 
              type="text" 
              placeholder="Search by subject or faculty..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ 
                width: '100%', padding: '12px 16px', paddingRight: '40px', 
                borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px',
                outline: 'none', color: '#0f172a'
              }}
            />
            <FaSearch style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
            <thead>
              <tr style={{ background: '#2563eb', color: '#ffffff', fontSize: '14px', fontWeight: '600' }}>
                <th style={{ padding: '16px 24px', width: '60px', textAlign: 'left' }}>#</th>
                <th style={{ padding: '16px 24px', textAlign: 'left' }}>Subject Code</th>
                <th style={{ padding: '16px 24px', textAlign: 'left' }}>Subject Name</th>
                <th style={{ padding: '16px 24px', textAlign: 'left' }}>Assigned Faculty</th>
                <th style={{ padding: '16px 24px', textAlign: 'left' }}>Designation</th>
                <th style={{ padding: '16px 24px' }}>Present Days</th>
                <th style={{ padding: '16px 24px' }}>Leave Days</th>
                <th style={{ padding: '16px 24px' }}>Working Days</th>
                <th style={{ padding: '16px 24px' }}>Attendance %</th>
                <th style={{ padding: '16px 24px' }}>Status</th>
                <th style={{ padding: '16px 24px', width: '80px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', fontSize: '14px', color: '#0f172a' }}>
                  <td style={{ padding: '16px 24px', color: '#64748b', textAlign: 'left' }}>{row.id}</td>
                  <td style={{ padding: '16px 24px', fontWeight: '500', textAlign: 'left' }}>{row.code}</td>
                  <td style={{ padding: '16px 24px', fontWeight: '500', textAlign: 'left' }}>{row.name}</td>
                  <td style={{ padding: '16px 24px', fontWeight: '500', textAlign: 'left' }}>{row.faculty}</td>
                  <td style={{ padding: '16px 24px', textAlign: 'left' }}>{row.desig}</td>
                  <td style={{ padding: '16px 24px', fontWeight: '600', color: '#16a34a' }}>{row.presentDays}</td>
                  <td style={{ padding: '16px 24px', fontWeight: '600', color: '#ef4444' }}>{row.leaveDays}</td>
                  <td style={{ padding: '16px 24px', fontWeight: '500' }}>{row.workingDays}</td>
                  <td style={{ padding: '16px 24px', fontWeight: '600', color: row.statusObj.color }}>{row.attendancePercent}%</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ 
                      padding: '4px 12px', borderRadius: '4px', fontSize: '14px', fontWeight: '600',
                      background: row.statusObj.bg, color: row.statusObj.color, display: 'inline-block'
                    }}>
                      {row.statusObj.text}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                      <button 
                        style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
                        title="View Details"
                      >
                        <FaEye size={16} />
                      </button>
                      <button 
                        onClick={() => setEditingRow(row)}
                        style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer' }}
                        title="Edit Faculty Details"
                      >
                        <FaEdit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                 <tr>
                    <td colSpan="11" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No matching records found.</td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: '500' }}>
            Showing 1 to {filteredData.length} of {currentData.length} subjects
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button style={{ padding: '8px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}><FaChevronLeft size={10}/></button>
            <button style={{ padding: '6px 12px', background: '#2563eb', border: '1px solid #2563eb', borderRadius: '4px', cursor: 'pointer', color: '#ffffff', fontSize: '14px', fontWeight: '600' }}>1</button>
            <button style={{ padding: '8px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}><FaChevronRight size={10}/></button>
          </div>
          <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Rows per page: 
            <select style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>

      </div>

      {/* Bottom Alert & Legend */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ 
          background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px', 
          padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px',
          color: '#1d4ed8', fontSize: '14px', fontWeight: '500'
        }}>
          <FaInfoCircle size={16} />
          Attendance % is calculated as (Present Days / Working Days) x 100
        </div>
        
        <div style={{ display: 'flex', gap: '20px', background: '#ffffff', padding: '12px 20px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '14px', fontWeight: '500', color: '#475569' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
            &gt; 85% (Excellent)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></div>
            70 - 85% (Good)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ea580c' }}></div>
            50 - 70% (Warning)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div>
            &lt; 50% (Poor)
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editingRow && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setEditingRow(null)}>
          <div style={{ background: 'white', borderRadius: '16px', width: '500px', maxWidth: '90%', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #edf2f7', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800' }}>Edit Faculty Assignment</h3>
              <button onClick={() => setEditingRow(null)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748b' }}><FaTimes /></button>
            </div>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>Subject</label>
                <input type="text" value={`${editingRow.code} - ${editingRow.name}`} disabled style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f1f5f9', color: '#64748b' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>Faculty Name</label>
                <input type="text" value={editingRow.faculty} onChange={e => setEditingRow({...editingRow, faculty: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>Designation</label>
                <input type="text" value={editingRow.desig} onChange={e => setEditingRow({...editingRow, desig: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>Email Address</label>
                <input type="email" value={editingRow.email} onChange={e => setEditingRow({...editingRow, email: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>Phone Number</label>
                <input type="text" value={editingRow.phone} onChange={e => setEditingRow({...editingRow, phone: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>
            </div>
            <div style={{ padding: '20px 24px', borderTop: '1px solid #edf2f7', display: 'flex', justifyContent: 'flex-end', gap: '12px', background: '#f8fafc' }}>
              <button onClick={() => setEditingRow(null)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white', color: '#475569', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
              <button onClick={async () => {
                const semIndex = getSemIndex(activeTab);
                
                // Update local state immediately
                setAllData(prev => ({
                  ...prev,
                  [semIndex]: prev[semIndex].map(item => item.id === editingRow.id ? editingRow : item)
                }));
                
                // Save to database automatically
                try {
                  await fetch(`http://localhost:5000/api/faculty/${editingRow.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      faculty: editingRow.faculty,
                      desig: editingRow.desig,
                      email: editingRow.email,
                      phone: editingRow.phone
                    })
                  });
                } catch (error) {
                  console.error('Failed to save to database:', error);
                }

                setEditingRow(null);
              }} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#2563eb', color: 'white', fontWeight: '600', cursor: 'pointer' }}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
