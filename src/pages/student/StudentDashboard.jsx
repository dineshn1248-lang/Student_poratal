import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarCheck, FaFileInvoiceDollar, FaGraduationCap,
  FaChartLine, FaExclamationCircle, FaDownload, FaHistory
} from "react-icons/fa";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import StudentLayout from "./StudentLayout";
import WelcomeBanner from '../../components/WelcomeBanner';
import "./Student.css";

export default function StudentDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const token = localStorage.getItem("token");
    try {
      const resp = await fetch(`${import.meta.env.PROD ? 'https://student-poratal.onrender.com/api' : 'http://127.0.0.1:5000/api'}/student/dashboard`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const d = await resp.json();
      if (resp.ok) setData(d);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <StudentLayout>
      <div className="std-dashboard-header" style={{ marginBottom: '24px' }}>
         <h1 style={{ fontSize: '20px', fontWeight: '800' }}>Dashboard Overview</h1>
         <p style={{ color: '#64748b', fontSize: '14px' }}>Quick summary of your academic performance</p>
      </div>

      <WelcomeBanner roleName="Student" />

      <div className="std-stats-grid">
        <div className="std-stat-card">
          <div className="std-stat-header">
            <span>Attendance</span>
            <div className="std-stat-icon" style={{ background: '#ecfdf5', color: '#10b981' }}><FaCalendarCheck /></div>
          </div>
          <h3>{data?.stats?.attendance}</h3>
          <div style={{ fontSize: '12px', color: '#10b981' }}>Current status</div>
        </div>
        <div className="std-stat-card">
          <div className="std-stat-header">
            <span>Exam Fees</span>
            <div className="std-stat-icon" style={{ background: '#fffbeb', color: '#ea580c' }}><FaFileInvoiceDollar /></div>
          </div>
          <h3 style={{ fontSize: '18px', color: '#ea580c', marginTop: '6px' }}>Coming Soon</h3>
          <div style={{ fontSize: '12px', color: '#ea580c' }}>Next Semester</div>
        </div>
        <div className="std-stat-card">
          <div className="std-stat-header">
            <span>Backlogs</span>
            <div className="std-stat-icon" style={{ background: '#fffbeb', color: '#f59e0b' }}><FaExclamationCircle /></div>
          </div>
          <h3>{data?.stats?.backlogs}</h3>
          <div style={{ fontSize: '12px', color: '#f59e0b' }}>To clear</div>
        </div>
        <div className="std-stat-card">
          <div className="std-stat-header">
            <span>SGPA</span>
            <div className="std-stat-icon" style={{ background: '#eff6ff', color: '#3b82f6' }}><FaGraduationCap /></div>
          </div>
          <h3>{data?.stats?.sgpa}</h3>
          <div style={{ fontSize: '12px', color: '#3b82f6' }}>Last Semester</div>
        </div>
      </div>

      <div className="std-grid-row">
        <div className="std-panel">
          <div className="std-panel-header"><h4>Academic Progress</h4></div>
          <div style={{ height: '280px' }}>
            <ResponsiveContainer width="99%" height={280}>
              <LineChart data={[
                { sem: 'Sem 1', sgpa: 7.8 },
                { sem: 'Sem 2', sgpa: 8.2 },
                { sem: 'Sem 3', sgpa: 8.5 },
                { sem: 'Sem 4', sgpa: data?.stats?.sgpa || 0 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="sem" axisLine={false} tickLine={false} tick={{ fontSize: 14, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 14, fill: '#64748b' }} domain={[0, 10]} />
                <Tooltip />
                <Line type="monotone" dataKey="sgpa" stroke="#4f46e5" strokeWidth={3} dot={{ fill: '#4f46e5', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="std-panel">
          <div className="std-panel-header"><h4>Quick Actions</h4></div>
          <div className="std-actions-grid">
            <Link to="/student/attendance" className="std-action-btn"><FaCalendarCheck /><span>Attendance</span></Link>
            <Link to="/student/fees" className="std-action-btn"><FaFileInvoiceDollar /><span>Pay Fees</span></Link>
            <Link to="/student/results" className="std-action-btn"><FaChartLine /><span>Results</span></Link>
            <Link to="/student/exams" className="std-action-btn"><FaGraduationCap /><span>Exams</span></Link>
            <div className="std-action-btn"><FaDownload /><span>Hall Ticket</span></div>
            <div className="std-action-btn"><FaHistory /><span>History</span></div>
          </div>
        </div>
      </div>

      <div className="std-grid-row">
         <div className="std-panel">
            <div className="std-panel-header"><h4>Upcoming Exams</h4></div>
            {data?.upcoming_exams.map((ex, i) => (
               <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', background: '#f8fafc', borderRadius: '12px', marginBottom: '10px' }}>
                  <div style={{ padding: '8px', background: 'white', borderRadius: '8px', textAlign: 'center', minWidth: '45px' }}>
                     <div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>JUN</div>
                     <div style={{ fontSize: '14px', fontWeight: '800' }}>{ex.date.split('-')[2]}</div>
                  </div>
                  <div>
                     <div style={{ fontWeight: '700', fontSize: '14px' }}>{ex.subject}</div>
                     <div style={{ fontSize: '12px', color: '#64748b' }}>{ex.time}</div>
                  </div>
               </div>
            ))}
         </div>
         <div className="std-panel">
            <div className="std-panel-header"><h4>Announcements</h4></div>
            <div className="std-alert warning">
               <FaExclamationCircle />
               <div>
                  <div style={{ fontWeight: '700', fontSize: '14px' }}>Examination Fee Payment</div>
                  <div style={{ fontSize: '12px' }}>Last date for fee payment is June 15th. Clear all dues to avoid late fees.</div>
               </div>
            </div>
         </div>
      </div>

    </StudentLayout>
  );
}