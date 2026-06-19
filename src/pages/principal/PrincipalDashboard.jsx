import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line
} from 'recharts';
import { 
  FaUsers, FaCalendarCheck, FaUserTie, FaUserGraduate, 
  FaClipboardList, FaFileInvoice, FaPenSquare, FaRegAddressCard, 
  FaChartPie, FaExclamationCircle, FaArrowRight, FaUniversity,
  FaWallet, FaCheckCircle, FaExclamationTriangle, FaFileAlt, FaBullhorn,
  FaRupeeSign, FaGraduationCap
} from 'react-icons/fa';
import StatCard from './components/StatCard';
import WelcomeBanner from '../../components/WelcomeBanner';
import './Principal.css';

export default function PrincipalDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total_students: 0,
    total_faculty: 0,
    avg_attendance: '0%',
    fee_pending: '₹0',
    backlog_students: 0
  });
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch principal dashboard stats
    const fetchDashboardData = async () => {
      try {
        const baseUrl = import.meta.env.PROD 
          ? 'https://student-poratal.onrender.com/api' 
          : 'http://127.0.0.1:5000/api';
          
        const statsRes = await fetch(`${baseUrl}/principal/stats`);
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        const deptRes = await fetch(`${baseUrl}/principal/departments/overview`);
        if (deptRes.ok) {
          const deptData = await deptRes.json();
          setDepartments(deptData);
        }
      } catch (err) {
        console.error("Error fetching principal dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Mock data for charts matching exactly what the user sees/wants
  const examRegData = [
    { name: 'Registered', value: 892, color: '#10b981' }, // 71.47%
    { name: 'Pending', value: 248, color: '#f59e0b' },    // 19.87%
    { name: 'Not Registered', value: 108, color: '#ef4444' },// 8.66%
  ];

  const studentData = [
    { name: 'I Semester', count: 10 },
    { name: 'II Semester', count: 10 },
    { name: 'III Semester', count: 10 },
    { name: 'IV Semester', count: 11 },
    { name: 'V Semester', count: 10 },
    { name: 'VI Semester', count: 13 },
  ];

  const attendanceLineData = [
    { name: 'Nov', value: 65 },
    { name: 'Dec', value: 72 },
    { name: 'Jan', value: 71 },
    { name: 'Feb', value: 63 },
    { name: 'Mar', value: 78 },
    { name: 'Apr', value: 70 },
  ];

  const alerts = [
    { text: "University Exam Time Table Published", time: "10-04-2025", color: "#3b82f6" },
    { text: "NAAC Meeting on 15 April 2025", time: "09-04-2025", color: "#10b981" },
    { text: "Fee Reminder to All Students", time: "08-04-2025", color: "#ef4444" },
    { text: "Internal Marks Submission Reminder", time: "08-04-2025", color: "#8b5cf6" },
    { text: "Practical Examination Schedule", time: "07-04-2025", color: "#64748b" },
  ];

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading Dashboard...</div>;
  }

  return (
    <div className="principal-dashboard-content">
      <div className="section-header" style={{ marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '20px' }}>Principal Dashboard</h1>
          <p style={{ fontSize: '14px', color: '#64748b' }}>Welcome Dr. R. Sharma, Principal</p>
        </div>
      </div>

      <WelcomeBanner roleName="Administrator" />

      {/* ── TOP STATS (4 CARDS) ── */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <StatCard 
          label="TOTAL STUDENTS" 
          value={stats.total_students} 
          subtext={`Passed: ${stats.passed_students || 0} | Failed: ${stats.failed_students || 0}`}
          icon={<FaUsers />} 
          color="#3b82f6" 
          bg="#eff6ff" 
          onClick={() => navigate('/principal/students')} 
          style={{ cursor: 'pointer' }}
        />
        <StatCard 
          label="TOTAL FACULTY" 
          value={stats.total_faculty} 
          icon={<FaUserTie />} 
          color="#10b981" 
          bg="#ecfdf5" 
          onClick={() => navigate('/principal/faculty')}
        />
        <StatCard 
          label="FEES COLLECTION" 
          value={stats.total_collected_fees || '₹0'} 
          subtext={`Collection: ${stats.fees_collection_percentage || '0%'}`}
          icon={<FaRupeeSign />} 
          color="#f59e0b" 
          bg="#fffbeb" 
          onClick={() => navigate('/principal/reports')}
        />
        <StatCard 
          label="PLACEMENT COUNT" 
          value={stats.placed_students || 0} 
          subtext={`Placement: ${stats.placement_percentage || '0%'}`}
          icon={<FaGraduationCap />} 
          color="#8b5cf6" 
          bg="#f3e8ff" 
          onClick={() => navigate('/principal/placements')}
        />
      </div>

      {/* ── SEMESTER WISE STUDENTS (From HOD Dashboard) ── */}
      <div className="chart-card" style={{ marginBottom: '30px', padding: '24px', background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div className="chart-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', margin: 0, fontWeight: '700' }}>Semester Wise Students</h3>
          <a href="#" className="chart-link" style={{ fontSize: '14px', color: '#3b82f6', textDecoration: 'none' }}>View Report →</a>
        </div>
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="99%" height={300}>
            <BarChart data={studentData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={35} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── CHARTS ROW (Notifications, Exam Reg, Attendance) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        {/* Recent Notifications */}
        <div className="chart-card" style={{ padding: '24px', background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div className="chart-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', margin: 0, fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}><FaBullhorn style={{ color: '#64748b' }}/> Recent Notifications</h3>
            <a href="#" className="chart-link" style={{ fontSize: '14px', color: '#3b82f6', textDecoration: 'none' }}>View All</a>
          </div>
          <div className="alerts-list">
            {alerts.map((alert, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i !== alerts.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                   <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: alert.color }}></div>
                   <span style={{ fontSize: '14px', color: '#334155', fontWeight: '500' }}>{alert.text}</span>
                </div>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>{alert.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Exam Registration */}
        <div className="chart-card" style={{ padding: '24px', background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div className="chart-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', margin: 0, fontWeight: '700' }}>Exam Registration Overview</h3>
            <a href="#" className="chart-link" style={{ fontSize: '14px', color: '#3b82f6', textDecoration: 'none' }}>View Report</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', height: '220px' }}>
             <div style={{ width: '50%', height: '100%', position: 'relative' }}>
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={examRegData}
                     cx="50%"
                     cy="50%"
                     innerRadius={50}
                     outerRadius={80}
                     paddingAngle={2}
                     dataKey="value"
                   >
                     {examRegData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                   </Pie>
                   <Tooltip />
                 </PieChart>
               </ResponsiveContainer>
               <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                 <div style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b' }}>1,248</div>
                 <div style={{ fontSize: '12px', color: '#64748b' }}>Total</div>
               </div>
             </div>
             <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {examRegData.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color }}></div>
                      <span style={{ fontSize: '14px', color: '#334155' }}>{item.name}</span>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>{item.value} <span style={{ color: '#94a3b8', fontWeight: '400', fontSize: '12px' }}>({Math.round(item.value/1248*100)}%)</span></span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Attendance Overview */}
        <div className="chart-card" style={{ padding: '24px', background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div className="chart-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', margin: 0, fontWeight: '700' }}>Attendance Overview</h3>
            <a href="#" className="chart-link" style={{ fontSize: '14px', color: '#3b82f6', textDecoration: 'none' }}>View Report</a>
          </div>
          <div style={{ height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceLineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} domain={[0, 100]} />
                <Tooltip cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── BOTTOM ROW (Quick Actions) ── */}
      <div style={{ background: '#fff', borderRadius: '12px', padding: '20px 24px', display: 'flex', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: '18px', margin: 0, fontWeight: '700', marginRight: '40px' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '30px', flex: 1 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', color: '#10b981', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
            <FaCheckCircle style={{ fontSize: '18px' }} /> Approve Requests
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', color: '#3b82f6', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
            <FaRegAddressCard style={{ fontSize: '18px' }} /> Hall Ticket Approval
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', color: '#f59e0b', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
            <FaExclamationCircle style={{ fontSize: '18px' }} /> Special Approvals
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', color: '#ef4444', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
            <FaExclamationTriangle style={{ fontSize: '18px' }} /> Final Escalation
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', color: '#8b5cf6', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
            <FaFileAlt style={{ fontSize: '18px' }} /> Generate Reports
          </button>
        </div>
      </div>

    </div>
  );
}