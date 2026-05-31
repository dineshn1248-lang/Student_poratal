import React, { useState, useEffect } from 'react';
import { FaFilter, FaDownload, FaCalendarAlt, FaUsers, FaUserCheck, FaUserTimes, FaPercentage, FaExclamationTriangle, FaChevronLeft, FaChevronRight, FaEye, FaTimes, FaSearch, FaUserCircle } from 'react-icons/fa';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { fetchPrincipalStats } from '../../api/principalApi';
import './Principal.css';

export default function PrincipalAttendance() {
  const [activeTab, setActiveTab] = useState('I Semester');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingStudent, setViewingStudent] = useState(null);
  const [attendanceFilter, setAttendanceFilter] = useState('All');
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const resp = await fetchPrincipalStats();
        if (resp && resp.total_students) {
          setTotalStudents(resp.total_students);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const tabs = ['I Semester', 'II Semester', 'III Semester', 'IV Semester', 'V Semester', 'VI Semester'];

  // Data mapping for different semesters
  const allStudentData = {
    'I Semester': [
      { id: 1, regNo: 'U24AN23S001', name: 'Dinesh N', sem: 'I Sem', sec: 'A', present: 35, absent: 5, leave: 2, percent: 87.50 },
      { id: 2, regNo: 'U24AN23S002', name: 'Lakshmi C', sem: 'I Sem', sec: 'A', present: 30, absent: 8, leave: 2, percent: 75.00 },
      { id: 3, regNo: 'U24AN23S003', name: 'Chetan G', sem: 'I Sem', sec: 'A', present: 38, absent: 3, leave: 1, percent: 95.00 },
      { id: 4, regNo: 'U24AN23S004', name: 'Pooja K', sem: 'I Sem', sec: 'A', present: 27, absent: 10, leave: 2, percent: 67.50 },
      { id: 5, regNo: 'U24AN23S005', name: 'Rakesh M', sem: 'I Sem', sec: 'A', present: 29, absent: 9, leave: 2, percent: 72.50 },
      { id: 6, regNo: 'U24AN23S006', name: 'Sindhu R', sem: 'I Sem', sec: 'A', present: 34, absent: 6, leave: 2, percent: 85.00 },
      { id: 7, regNo: 'U24AN23S007', name: 'Vikram P', sem: 'I Sem', sec: 'A', present: 36, absent: 4, leave: 2, percent: 90.00 },
      { id: 8, regNo: 'U24AN23S008', name: 'Anjali H', sem: 'I Sem', sec: 'A', present: 33, absent: 6, leave: 3, percent: 82.50 },
      { id: 9, regNo: 'U24AN23S009', name: 'Manoj S', sem: 'I Sem', sec: 'A', present: 28, absent: 9, leave: 2, percent: 70.00 },
      { id: 10, regNo: 'U24AN23S010', name: 'Sneha L', sem: 'I Sem', sec: 'A', present: 37, absent: 3, leave: 2, percent: 92.50 },
    ],
    'II Semester': [
      { id: 1, regNo: 'U24AN23S011', name: 'Rahul R', sem: 'II Sem', sec: 'A', present: 36, absent: 4, leave: 2, percent: 90.00 },
      { id: 2, regNo: 'U24AN23S012', name: 'Priya K', sem: 'II Sem', sec: 'A', present: 31, absent: 7, leave: 2, percent: 77.50 },
      { id: 3, regNo: 'U24AN23S013', name: 'Kiran M', sem: 'II Sem', sec: 'A', present: 39, absent: 2, leave: 1, percent: 97.50 },
      { id: 4, regNo: 'U24AN23S014', name: 'Neha S', sem: 'II Sem', sec: 'A', present: 28, absent: 9, leave: 3, percent: 70.00 },
      { id: 5, regNo: 'U24AN23S015', name: 'Mahesh B', sem: 'II Sem', sec: 'A', present: 24, absent: 13, leave: 3, percent: 62.00 },
      { id: 6, regNo: 'U24AN23S016', name: 'Swathi N', sem: 'II Sem', sec: 'A', present: 35, absent: 5, leave: 2, percent: 87.50 },
      { id: 7, regNo: 'U24AN23S017', name: 'Karthik P', sem: 'II Sem', sec: 'A', present: 37, absent: 3, leave: 2, percent: 92.50 },
      { id: 8, regNo: 'U24AN23S018', name: 'Divya H', sem: 'II Sem', sec: 'A', present: 34, absent: 5, leave: 3, percent: 85.00 },
      { id: 9, regNo: 'U24AN23S019', name: 'Sanjay S', sem: 'II Sem', sec: 'A', present: 29, absent: 8, leave: 3, percent: 72.50 },
      { id: 10, regNo: 'U24AN23S020', name: 'Bhavya L', sem: 'II Sem', sec: 'A', present: 38, absent: 2, leave: 2, percent: 95.00 },
    ],
    'III Semester': [
      { id: 1, regNo: 'U24AN23S021', name: 'Arun V', sem: 'III Sem', sec: 'A', present: 32, absent: 6, leave: 2, percent: 80.00 },
      { id: 2, regNo: 'U24AN23S022', name: 'Preeti G', sem: 'III Sem', sec: 'A', present: 28, absent: 10, leave: 2, percent: 70.00 },
      { id: 3, regNo: 'U24AN23S023', name: 'Naveen K', sem: 'III Sem', sec: 'A', present: 35, absent: 4, leave: 1, percent: 87.50 },
      { id: 4, regNo: 'U24AN23S024', name: 'Shruthi P', sem: 'III Sem', sec: 'A', present: 38, absent: 1, leave: 1, percent: 95.00 },
      { id: 5, regNo: 'U24AN23S025', name: 'Vinay R', sem: 'III Sem', sec: 'A', present: 26, absent: 12, leave: 2, percent: 65.00 },
      { id: 6, regNo: 'U24AN23S026', name: 'Kavitha S', sem: 'III Sem', sec: 'A', present: 33, absent: 5, leave: 2, percent: 82.50 },
      { id: 7, regNo: 'U24AN23S027', name: 'Manish T', sem: 'III Sem', sec: 'A', present: 29, absent: 9, leave: 2, percent: 72.50 },
      { id: 8, regNo: 'U24AN23S028', name: 'Sowmya H', sem: 'III Sem', sec: 'A', present: 37, absent: 3, leave: 0, percent: 92.50 },
      { id: 9, regNo: 'U24AN23S029', name: 'Gautham M', sem: 'III Sem', sec: 'A', present: 31, absent: 7, leave: 2, percent: 77.50 },
      { id: 10, regNo: 'U24AN23S030', name: 'Roopa N', sem: 'III Sem', sec: 'A', present: 34, absent: 5, leave: 1, percent: 85.00 },
    ],
    'IV Semester': [
      { id: 1, regNo: 'U24AN23S031', name: 'Pramod C', sem: 'IV Sem', sec: 'A', present: 36, absent: 3, leave: 1, percent: 90.00 },
      { id: 2, regNo: 'U24AN23S032', name: 'Anusha R', sem: 'IV Sem', sec: 'A', present: 30, absent: 8, leave: 2, percent: 75.00 },
      { id: 3, regNo: 'U24AN23S033', name: 'Darshan G', sem: 'IV Sem', sec: 'A', present: 27, absent: 11, leave: 2, percent: 67.50 },
      { id: 4, regNo: 'U24AN23S034', name: 'Meghana K', sem: 'IV Sem', sec: 'A', present: 39, absent: 1, leave: 0, percent: 97.50 },
      { id: 5, regNo: 'U24AN23S035', name: 'Sunil M', sem: 'IV Sem', sec: 'A', present: 35, absent: 4, leave: 1, percent: 87.50 },
      { id: 6, regNo: 'U24AN23S036', name: 'Pallavi S', sem: 'IV Sem', sec: 'A', present: 25, absent: 13, leave: 2, percent: 62.50 },
      { id: 7, regNo: 'U24AN23S037', name: 'Rajesh P', sem: 'IV Sem', sec: 'A', present: 38, absent: 2, leave: 0, percent: 95.00 },
      { id: 8, regNo: 'U24AN23S038', name: 'Shwetha H', sem: 'IV Sem', sec: 'A', present: 32, absent: 7, leave: 1, percent: 80.00 },
      { id: 9, regNo: 'U24AN23S039', name: 'Vijay S', sem: 'IV Sem', sec: 'A', present: 29, absent: 9, leave: 2, percent: 72.50 },
      { id: 10, regNo: 'U24AN23S040', name: 'Sushma L', sem: 'IV Sem', sec: 'A', present: 34, absent: 5, leave: 1, percent: 85.00 },
    ],
    'V Semester': [
      { id: 1, regNo: 'U24AN23S041', name: 'Praveen N', sem: 'V Sem', sec: 'A', present: 37, absent: 2, leave: 1, percent: 92.50 },
      { id: 2, regNo: 'U24AN23S042', name: 'Rashmi C', sem: 'V Sem', sec: 'A', present: 31, absent: 7, leave: 2, percent: 77.50 },
      { id: 3, regNo: 'U24AN23S043', name: 'Harsha G', sem: 'V Sem', sec: 'A', present: 35, absent: 4, leave: 1, percent: 87.50 },
      { id: 4, regNo: 'U24AN23S044', name: 'Nandini K', sem: 'V Sem', sec: 'A', present: 28, absent: 10, leave: 2, percent: 70.00 },
      { id: 5, regNo: 'U24AN23S045', name: 'Tejas M', sem: 'V Sem', sec: 'A', present: 26, absent: 12, leave: 2, percent: 65.00 },
      { id: 6, regNo: 'U24AN23S046', name: 'Ramya R', sem: 'V Sem', sec: 'A', present: 39, absent: 1, leave: 0, percent: 97.50 },
      { id: 7, regNo: 'U24AN23S047', name: 'Guru P', sem: 'V Sem', sec: 'A', present: 34, absent: 5, leave: 1, percent: 85.00 },
      { id: 8, regNo: 'U24AN23S048', name: 'Deepa H', sem: 'V Sem', sec: 'A', present: 33, absent: 6, leave: 1, percent: 82.50 },
      { id: 9, regNo: 'U24AN23S049', name: 'Kishan S', sem: 'V Sem', sec: 'A', present: 30, absent: 8, leave: 2, percent: 75.00 },
      { id: 10, regNo: 'U24AN23S050', name: 'Chaitra L', sem: 'V Sem', sec: 'A', present: 38, absent: 2, leave: 0, percent: 95.00 },
    ],
    'VI Semester': [
      { id: 1, regNo: 'U24AN23S051', name: 'Santosh N', sem: 'VI Sem', sec: 'A', present: 36, absent: 3, leave: 1, percent: 90.00 },
      { id: 2, regNo: 'U24AN23S052', name: 'Bhoomika C', sem: 'VI Sem', sec: 'A', present: 29, absent: 9, leave: 2, percent: 72.50 },
      { id: 3, regNo: 'U24AN23S053', name: 'Lohit G', sem: 'VI Sem', sec: 'A', present: 35, absent: 4, leave: 1, percent: 87.50 },
      { id: 4, regNo: 'U24AN23S054', name: 'Shilpa K', sem: 'VI Sem', sec: 'A', present: 32, absent: 7, leave: 1, percent: 80.00 },
      { id: 5, regNo: 'U24AN23S055', name: 'Girish M', sem: 'VI Sem', sec: 'A', present: 38, absent: 1, leave: 1, percent: 95.00 },
      { id: 6, regNo: 'U24AN23S056', name: 'Rakshitha R', sem: 'VI Sem', sec: 'A', present: 27, absent: 11, leave: 2, percent: 67.50 },
      { id: 7, regNo: 'U24AN23S057', name: 'Vikas P', sem: 'VI Sem', sec: 'A', present: 34, absent: 5, leave: 1, percent: 85.00 },
      { id: 8, regNo: 'U24AN23S058', name: 'Amulya H', sem: 'VI Sem', sec: 'A', present: 31, absent: 8, leave: 1, percent: 77.50 },
      { id: 9, regNo: 'U24AN23S059', name: 'Shashank S', sem: 'VI Sem', sec: 'A', present: 39, absent: 1, leave: 0, percent: 97.50 },
      { id: 10, regNo: 'U24AN23S060', name: 'Meera L', sem: 'VI Sem', sec: 'A', present: 33, absent: 6, leave: 1, percent: 82.50 },
    ]
  };

  const currentStudentDataRaw = allStudentData[activeTab] || [];
  
  const currentStudentDataWithStatus = currentStudentDataRaw.map((s, index) => {
      let todayStatus = 'Present';
      if (index % 10 === 8) todayStatus = 'Absent';
      if (index % 10 === 9) todayStatus = 'Leave';
      return { ...s, todayStatus };
  });

  const currentStudentData = currentStudentDataWithStatus.filter(s => {
      if (attendanceFilter !== 'All' && s.todayStatus !== attendanceFilter) return false;
      if (searchQuery) {
          const q = searchQuery.toLowerCase();
          return s.name.toLowerCase().includes(q) || s.regNo.toLowerCase().includes(q);
      }
      return true;
  });
  const alertsData = [
    { regNo: 'U24AN23S015', name: 'Mahesh B', percent: 62 },
    { regNo: 'U24AN23S022', name: 'Pooja K', percent: 64 },
    { regNo: 'U24AN23S031', name: 'Rakesh M', percent: 68 },
    { regNo: 'U24AN23S038', name: 'Kavya S', percent: 70 },
    { regNo: 'U24AN23S040', name: 'Nithin H', percent: 72 },
  ];

  // Dummy subject data for the detailed modal
  const subjectAttendanceData = [
    { id: 1, code: 'BCA101', name: 'Problem Solving Using C', present: 18, absent: 2, leave: 0, percent: 90.00 },
    { id: 2, code: 'BCA102', name: 'Mathematics - I', present: 16, absent: 4, leave: 0, percent: 80.00 },
    { id: 3, code: 'BCA103', name: 'Digital Fundamentals', present: 17, absent: 3, leave: 0, percent: 85.00 },
    { id: 4, code: 'BCA104', name: 'English', present: 19, absent: 1, leave: 0, percent: 95.00 },
    { id: 5, code: 'BCA105', name: 'Kannada', present: 17, absent: 3, leave: 0, percent: 85.00 },
    { id: 6, code: 'BCA106', name: 'Computer Fundamentals', present: 18, absent: 2, leave: 0, percent: 90.00 },
    { id: 7, code: 'BCA107', name: 'Programming in C', present: 16, absent: 4, leave: 0, percent: 80.00 },
    { id: 8, code: 'BCA108', name: 'Lab: C Programming', present: 19, absent: 1, leave: 0, percent: 95.00 },
    { id: 9, code: 'BCA109', name: 'Communicative English', present: 17, absent: 3, leave: 0, percent: 85.00 },
    { id: 10, code: 'BCA110', name: 'Environmental Studies', present: 18, absent: 2, leave: 0, percent: 90.00 },
  ];

  const getStatus = (percent) => {
    if (percent >= 85) return { text: 'Excellent', color: '#059669', bg: '#ecfdf5' };
    if (percent >= 75) return { text: 'Good', color: '#16a34a', bg: '#dcfce3' };
    if (percent >= 70) return { text: 'Warning', color: '#ea580c', bg: '#ffedd5' };
    return { text: 'Poor', color: '#dc2626', bg: '#fee2e2' };
  };

  const getAlertColor = (percent) => {
    if (percent < 65) return { color: '#dc2626', bg: '#fee2e2' };
    if (percent < 70) return { color: '#ea580c', bg: '#ffedd5' };
    return { color: '#d97706', bg: '#fef3c7' };
  };

  const trendData = [
    { name: '17 May', value: 80 },
    { name: '18 May', value: 82 },
    { name: '19 May', value: 78 },
    { name: '20 May', value: 84 },
    { name: '21 May', value: 86 },
    { name: '22 May', value: 82 },
    { name: '23 May', value: 83 },
  ];

  const pieData = [
    { name: 'Present (83.33%)', value: 83.33, color: '#10b981' },
    { name: 'Absent (11.90%)', value: 11.90, color: '#ef4444' },
    { name: 'Leave (4.76%)', value: 4.76, color: '#f59e0b' },
  ];

  return (
    <div className="principal-page-content" style={{ padding: '24px', background: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ color: '#3b82f6', fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>
          Dashboard &nbsp;&gt;&nbsp; Attendance &nbsp;&gt;&nbsp; <span style={{ color: '#64748b' }}>Student Attendance Dashboard</span>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div onClick={() => setAttendanceFilter('All')} style={{ cursor: 'pointer', background: '#ffffff', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: attendanceFilter === 'All' ? '2px solid #3b82f6' : '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ background: '#eff6ff', padding: '16px', borderRadius: '12px', color: '#3b82f6' }}>
            <FaUsers size={24} />
          </div>
          <div>
            <div style={{ fontSize: '14px', color: '#3b82f6', fontWeight: '700', marginBottom: '4px' }}>Total Students</div>
            <div style={{ fontSize: '20px', color: '#0f172a', fontWeight: '900' }}>{totalStudents || 0}</div>
          </div>
        </div>
        
        <div onClick={() => setAttendanceFilter('Present')} style={{ cursor: 'pointer', background: '#ffffff', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: attendanceFilter === 'Present' ? '2px solid #10b981' : '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ background: '#ecfdf5', padding: '16px', borderRadius: '12px', color: '#10b981' }}>
            <FaUserCheck size={24} />
          </div>
          <div>
            <div style={{ fontSize: '14px', color: '#10b981', fontWeight: '700', marginBottom: '4px' }}>Present Today</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <div style={{ fontSize: '20px', color: '#0f172a', fontWeight: '900' }}>8</div>
              <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>(80%)</div>
            </div>
          </div>
        </div>

        <div onClick={() => setAttendanceFilter('Absent')} style={{ cursor: 'pointer', background: '#ffffff', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: attendanceFilter === 'Absent' ? '2px solid #ef4444' : '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ background: '#fef2f2', padding: '16px', borderRadius: '12px', color: '#ef4444' }}>
            <FaUserTimes size={24} />
          </div>
          <div>
            <div style={{ fontSize: '14px', color: '#ef4444', fontWeight: '700', marginBottom: '4px' }}>Absent Today</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <div style={{ fontSize: '20px', color: '#0f172a', fontWeight: '900' }}>1</div>
              <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>(10%)</div>
            </div>
          </div>
        </div>

        <div onClick={() => setAttendanceFilter('Leave')} style={{ cursor: 'pointer', background: '#ffffff', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: attendanceFilter === 'Leave' ? '2px solid #f59e0b' : '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ background: '#fffbeb', padding: '16px', borderRadius: '12px', color: '#f59e0b' }}>
            <FaCalendarAlt size={24} />
          </div>
          <div>
            <div style={{ fontSize: '14px', color: '#f59e0b', fontWeight: '700', marginBottom: '4px' }}>Leave Today</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <div style={{ fontSize: '20px', color: '#0f172a', fontWeight: '900' }}>1</div>
              <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>(10%)</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ background: '#f5f3ff', padding: '16px', borderRadius: '12px', color: '#8b5cf6' }}>
            <FaPercentage size={24} />
          </div>
          <div>
            <div style={{ fontSize: '14px', color: '#8b5cf6', fontWeight: '700', marginBottom: '4px' }}>Overall Attendance</div>
            <div style={{ fontSize: '20px', color: '#0f172a', fontWeight: '900' }}>83.33%</div>
          </div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ background: '#fef2f2', padding: '16px', borderRadius: '12px', color: '#ef4444' }}>
            <FaExclamationTriangle size={24} />
          </div>
          <div>
            <div style={{ fontSize: '14px', color: '#ef4444', fontWeight: '700', marginBottom: '4px' }}>Below 75% Students</div>
            <div style={{ fontSize: '20px', color: '#0f172a', fontWeight: '900' }}>6</div>
          </div>
        </div>
      </div>

      {/* Middle Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr 1fr', gap: '20px', marginBottom: '24px' }}>
        
        {/* Doughnut Chart */}
        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>Overall Attendance</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: '180px', height: '180px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'relative', top: '-115px', textAlign: 'center', pointerEvents: 'none' }}>
                <div style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a' }}>83.33%</div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Attendance</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#475569' }}>Present (83.33%)</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#475569' }}>Absent (11.90%)</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#475569' }}>Leave (4.76%)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>Attendance Trend (Last 7 Days)</h3>
          <div style={{ height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
                <RechartsTooltip formatter={(value) => [`${value}%`, 'Attendance']} />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} label={{ position: 'top', fill: '#0f172a', fontSize: 12, fontWeight: 700, formatter: (val) => `${val}%`, dy: -10 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Low Attendance Alerts */}
        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>Low Attendance Alerts</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {alertsData.map((alert, idx) => {
              const color = getAlertColor(alert.percent);
              return (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>{alert.regNo}</span>
                    <span style={{ fontSize: '14px', color: '#0f172a', fontWeight: '600' }}>{alert.name}</span>
                  </div>
                  <span style={{ background: color.bg, color: color.color, padding: '2px 8px', borderRadius: '4px', fontSize: '14px', fontWeight: '700' }}>
                    {alert.percent}%
                  </span>
                </div>
              );
            })}
          </div>
          <button style={{ marginTop: '20px', background: 'none', border: 'none', color: '#3b82f6', fontSize: '14px', fontWeight: '700', cursor: 'pointer', padding: 0 }}>
            View All
          </button>
        </div>

      </div>

      {/* Bottom Section */}
      <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        
        {/* Tabs */}
        <div style={{ padding: '20px 24px 12px 24px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 20px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '700',
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

        {/* Toolbar */}
        <div style={{ padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <FaSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search by Reg No or Student Name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ 
                width: '100%', padding: '10px 16px 10px 40px', 
                borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px',
                outline: 'none', color: '#0f172a', fontWeight: '500'
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <select style={{ padding: '10px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: '600', color: '#475569', outline: 'none', background: 'white' }}>
              <option>All Sections</option>
            </select>
            <select style={{ padding: '10px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: '600', color: '#475569', outline: 'none', background: 'white' }}>
              <option>All Status</option>
            </select>
            <button style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', 
              padding: '10px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '700',
              cursor: 'pointer'
            }}>
              <FaDownload size={12} /> Export Report
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
            <thead>
              <tr style={{ background: '#2563eb', color: '#ffffff', fontSize: '14px', fontWeight: '700' }}>
                <th style={{ padding: '14px 20px', textAlign: 'left' }}>#</th>
                <th style={{ padding: '14px 20px', textAlign: 'left' }}>Reg No</th>
                <th style={{ padding: '14px 20px', textAlign: 'left' }}>Student Name</th>
                <th style={{ padding: '14px 20px' }}>Semester</th>
                <th style={{ padding: '14px 20px' }}>Section</th>
                <th style={{ padding: '14px 20px' }}>Present</th>
                <th style={{ padding: '14px 20px' }}>Absent</th>
                <th style={{ padding: '14px 20px' }}>Leave</th>
                <th style={{ padding: '14px 20px' }}>Overall Attendance</th>
                <th style={{ padding: '14px 20px' }}>Overall Status</th>
                <th style={{ padding: '14px 20px' }}>Today's Status</th>
                <th style={{ padding: '14px 20px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentStudentData.length > 0 ? currentStudentData.map((row, idx) => {
                const status = getStatus(row.percent);
                return (
                  <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', fontSize: '14px', color: '#0f172a' }}>
                    <td style={{ padding: '14px 20px', color: '#64748b', textAlign: 'left' }}>{row.id}</td>
                    <td style={{ padding: '14px 20px', fontWeight: '600', textAlign: 'left' }}>{row.regNo}</td>
                    <td style={{ padding: '14px 20px', fontWeight: '600', textAlign: 'left' }}>{row.name}</td>
                    <td style={{ padding: '14px 20px', fontWeight: '500', color: '#64748b' }}>{row.sem}</td>
                    <td style={{ padding: '14px 20px', fontWeight: '500', color: '#64748b' }}>{row.sec}</td>
                    <td style={{ padding: '14px 20px', fontWeight: '700', color: '#16a34a' }}>{row.present}</td>
                    <td style={{ padding: '14px 20px', fontWeight: '700', color: '#ef4444' }}>{row.absent}</td>
                    <td style={{ padding: '14px 20px', fontWeight: '700', color: '#64748b' }}>{row.leave}</td>
                    <td style={{ padding: '14px 20px', fontWeight: '700' }}>{row.percent.toFixed(2)}%</td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ color: status.color, fontWeight: '700', fontSize: '14px' }}>
                        {status.text}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ 
                        color: row.todayStatus === 'Present' ? '#10b981' : row.todayStatus === 'Absent' ? '#ef4444' : '#f59e0b',
                        background: row.todayStatus === 'Present' ? '#ecfdf5' : row.todayStatus === 'Absent' ? '#fef2f2' : '#fffbeb',
                        padding: '4px 10px', borderRadius: '20px', fontWeight: '700', fontSize: '12px'
                      }}>
                        {row.todayStatus}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                      <button 
                        onClick={() => setViewingStudent(row)}
                        style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#475569', cursor: 'pointer', padding: '6px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}
                        title="View Details"
                      >
                        <FaEye size={14} />
                      </button>
                    </td>
                  </tr>
                )
              }) : (
                <tr>
                  <td colSpan="11" style={{ padding: '24px', color: '#64748b', fontWeight: '500' }}>No students found for this semester.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', color: '#475569', fontWeight: '600' }}>
          <div>Showing 1 to 10 of 42 students</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button style={{ padding: '8px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}><FaChevronLeft size={10}/></button>
            <button style={{ padding: '6px 12px', background: '#2563eb', border: '1px solid #2563eb', borderRadius: '4px', cursor: 'pointer', color: '#ffffff', fontSize: '14px', fontWeight: '700' }}>1</button>
            <button style={{ padding: '6px 12px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', color: '#475569', fontSize: '14px', fontWeight: '600' }}>2</button>
            <button style={{ padding: '6px 12px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', color: '#475569', fontSize: '14px', fontWeight: '600' }}>3</button>
            <button style={{ padding: '6px 12px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', color: '#475569', fontSize: '14px', fontWeight: '600' }}>4</button>
            <button style={{ padding: '6px 12px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', color: '#475569', fontSize: '14px', fontWeight: '600' }}>5</button>
            <button style={{ padding: '8px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}><FaChevronRight size={10}/></button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            Rows per page: 
            <select style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', fontWeight: '600' }}>
              <option value="10">10</option>
            </select>
          </div>
        </div>
      </div>

      {/* STUDENT ATTENDANCE DETAILS MODAL */}
      {viewingStudent && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setViewingStudent(null)}>
          <div style={{ background: 'white', borderRadius: '12px', width: '800px', maxWidth: '95%', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #edf2f7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Student Attendance Details</h3>
              <button onClick={() => setViewingStudent(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><FaTimes size={16}/></button>
            </div>
            
            <div style={{ padding: '24px' }}>
              {/* Profile Card */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ background: '#dbeafe', color: '#3b82f6', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FaUserCircle size={60} style={{ opacity: 0.8 }} />
                  </div>
                  <div>
                    <h2 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>{viewingStudent.name}</h2>
                    <div style={{ fontSize: '14px', color: '#475569', fontWeight: '600', marginBottom: '4px' }}>Reg No: {viewingStudent.regNo}</div>
                    <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>Semester: {viewingStudent.sem} &nbsp;&nbsp;|&nbsp;&nbsp; Section: {viewingStudent.sec}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'center', background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '12px 20px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '14px', color: '#059669', fontWeight: '700', marginBottom: '4px' }}>Overall Attendance</div>
                  <div style={{ fontSize: '18px', color: '#059669', fontWeight: '800' }}>{viewingStudent.percent.toFixed(2)}%</div>
                </div>
              </div>

              {/* Subject Wise Table */}
              <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>Subject Wise Attendance</h4>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                  <thead>
                    <tr style={{ background: '#2563eb', color: '#ffffff', fontSize: '14px', fontWeight: '700' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left' }}>#</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left' }}>Subject Code</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left' }}>Subject Name</th>
                      <th style={{ padding: '12px 16px' }}>Present</th>
                      <th style={{ padding: '12px 16px' }}>Absent</th>
                      <th style={{ padding: '12px 16px' }}>Leave</th>
                      <th style={{ padding: '12px 16px' }}>Attendance %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjectAttendanceData.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', fontSize: '14px', color: '#0f172a' }}>
                        <td style={{ padding: '12px 16px', color: '#64748b', textAlign: 'left' }}>{row.id}</td>
                        <td style={{ padding: '12px 16px', fontWeight: '600', textAlign: 'left' }}>{row.code}</td>
                        <td style={{ padding: '12px 16px', fontWeight: '500', textAlign: 'left' }}>{row.name}</td>
                        <td style={{ padding: '12px 16px', fontWeight: '700', color: '#16a34a' }}>{row.present}</td>
                        <td style={{ padding: '12px 16px', fontWeight: '700', color: '#ef4444' }}>{row.absent}</td>
                        <td style={{ padding: '12px 16px', fontWeight: '700', color: '#64748b' }}>{row.leave}</td>
                        <td style={{ padding: '12px 16px', fontWeight: '700' }}>{row.percent.toFixed(2)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div style={{ padding: '16px 24px', borderTop: '1px solid #edf2f7', display: 'flex', justifyContent: 'flex-end', background: '#f8fafc' }}>
              <button onClick={() => setViewingStudent(null)} style={{ padding: '8px 24px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'white', color: '#475569', fontWeight: '700', cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
