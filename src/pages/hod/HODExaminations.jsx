import React, { useState, useEffect } from 'react';
import { 
  FaUsers, FaCheckCircle, FaTicketAlt, FaExclamationTriangle,
  FaFileAlt, FaLock, FaBell, FaDownload, FaEye, FaSearch,
  FaRegFileAlt, FaRegChartBar, FaChevronRight
} from 'react-icons/fa';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LabelList,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { 
  fetchHodExamStats, fetchHodExamOverview, 
  fetchHodExamSubjectResults, fetchHodExamBacklogs 
} from '../../api/hodApi';
import StatCard from './components/StatCard';
import './HOD.css';

export default function HODExaminations() {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [overview, setOverview] = useState(null);
    const [subjectResults, setSubjectResults] = useState([]);
    const [backlogs, setBacklogs] = useState([]);
    const [activeSemTab, setActiveSemTab] = useState(6); // Default VI Semester
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    useEffect(() => {
        loadSemesterData(activeSemTab);
    }, [activeSemTab]);

    const loadDashboardData = async () => {
        setLoading(true);
        try {
            const [statsRes, overviewRes] = await Promise.all([
                fetchHodExamStats(),
                fetchHodExamOverview()
            ]);
            setStats(statsRes);
            setOverview(overviewRes);
        } catch (error) {
            console.error("Error loading dashboard stats:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadSemesterData = async (sem) => {
        try {
            const [subjRes, backRes] = await Promise.all([
                fetchHodExamSubjectResults(sem),
                fetchHodExamBacklogs(sem)
            ]);
            setSubjectResults(subjRes);
            setBacklogs(backRes);
        } catch (error) {
            console.error("Error loading semester data:", error);
        }
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '10px', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                    <p style={{ margin: 0, fontWeight: 'bold', color: '#1e293b' }}>{payload[0].payload.name}</p>
                    <p style={{ margin: 0, color: '#3b82f6', fontWeight: 'bold' }}>Pass %: {payload[0].value}%</p>
                </div>
            );
        }
        return null;
    };

    // Custom tick for XAxis
    const CustomizedAxisTick = ({ x, y, payload }) => {
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="middle" fill="#64748b" fontSize={12} fontWeight={600}>
                    {payload.value}
                </text>
            </g>
        );
    };

    return (
        <main className="hod-page-content">
            <div className="section-header" style={{ marginBottom: '24px' }}>
                <div>
                    <h1>Examination Dashboard</h1>
                    <p>Monitor examination status, results and academic performance of your department.</p>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <select style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontWeight: '600', color: '#475569' }}>
                        <option>2024-25</option>
                        <option>2023-24</option>
                    </select>
                    <select style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontWeight: '600', color: '#475569' }}>
                        <option>All Semesters</option>
                        <option>I Semester</option>
                        <option>II Semester</option>
                    </select>
                </div>
            </div>

            {/* ── TOP SUMMARY CARDS ── */}
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '24px' }}>
                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7', fontSize: '24px' }}>
                        <FaUsers />
                    </div>
                    <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '4px' }}>Total Students Appearing</div>
                        <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>{stats ? stats.total_registered : '...'}</div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>This Session</div>
                    </div>
                </div>

                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e', fontSize: '24px' }}>
                        <FaCheckCircle />
                    </div>
                    <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '4px' }}>Eligible Students</div>
                        <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>{stats ? stats.eligible : '...'}</div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{stats ? stats.eligible_percentage : '...'}%</div>
                    </div>
                </div>

                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', fontSize: '24px' }}>
                        <FaTicketAlt />
                    </div>
                    <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '4px' }}>Hall Tickets Generated</div>
                        <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>{stats ? stats.hall_tickets : '...'}</div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{stats ? stats.hall_tickets_percentage : '...'}%</div>
                    </div>
                </div>

                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b', fontSize: '24px' }}>
                        <FaExclamationTriangle />
                    </div>
                    <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '4px' }}>Backlog Students</div>
                        <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>{stats ? stats.backlogs : '...'}</div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{stats ? stats.backlogs_percentage : '...'}%</div>
                    </div>
                </div>
            </div>

            {/* ── CHARTS ROW ── */}
            <div className="charts-row" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' }}>Semester-wise Pass Percentage</h3>
                    <div style={{ height: '260px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={overview?.overview || []} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={<CustomizedAxisTick />} />
                                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b', fontWeight: 600}} tickFormatter={(val) => `${val}%`} />
                                <RechartsTooltip content={<CustomTooltip />} cursor={{fill: '#f8fafc'}} />
                                <Bar dataKey="pass_percentage" fill="#2563eb" radius={[4,4,0,0]} barSize={28}>
                                    <LabelList dataKey="pass_percentage" position="top" formatter={(val) => `${val}%`} style={{ fill: '#334155', fontSize: '12px', fontWeight: 600 }} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' }}>Result Distribution (All Semesters)</h3>
                    <div style={{ height: '260px', display: 'flex', alignItems: 'center' }}>
                        <ResponsiveContainer width="60%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={overview?.distribution || []} 
                                    cx="50%" cy="50%" 
                                    innerRadius={65} outerRadius={95} 
                                    paddingAngle={3} 
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {(overview?.distribution || []).map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                </Pie>
                                <RechartsTooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div style={{ width: '40%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {(overview?.distribution || []).map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color }}></div>
                                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#475569' }}>{item.name}</span>
                                    </div>
                                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── SEMESTER TABS ── */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                {[1, 2, 3, 4, 5, 6].map(sem => (
                    <button 
                        key={sem}
                        onClick={() => setActiveSemTab(sem)}
                        style={{
                            padding: '10px 24px',
                            background: activeSemTab === sem ? '#eff6ff' : 'white',
                            color: activeSemTab === sem ? '#2563eb' : '#64748b',
                            border: `1px solid ${activeSemTab === sem ? '#bfdbfe' : '#e2e8f0'}`,
                            borderRadius: '8px',
                            fontWeight: '600',
                            fontSize: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {['I', 'II', 'III', 'IV', 'V', 'VI'][sem - 1]} Semester
                    </button>
                ))}
            </div>

            {/* ── BOTTOM SECTION (DETAILS + SIDEBAR) ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    
                    {/* Subject Wise Results Table */}
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>Subject Wise Results ({['I', 'II', 'III', 'IV', 'V', 'VI'][activeSemTab - 1]} Semester)</h3>
                        {activeSemTab === 6 ? (
                            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b', fontSize: '15px', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
                                <div>No results published for this semester yet.</div>
                            </div>
                        ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                                        <th style={{ padding: '12px 8px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>Subject</th>
                                        <th style={{ padding: '12px 8px', fontSize: '13px', color: '#64748b', fontWeight: '600', textAlign: 'center' }}>Students Appeared</th>
                                        <th style={{ padding: '12px 8px', fontSize: '13px', color: '#64748b', fontWeight: '600', textAlign: 'center' }}>Pass</th>
                                        <th style={{ padding: '12px 8px', fontSize: '13px', color: '#64748b', fontWeight: '600', textAlign: 'center' }}>Fail</th>
                                        <th style={{ padding: '12px 8px', fontSize: '13px', color: '#64748b', fontWeight: '600', textAlign: 'center' }}>Pass %</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subjectResults.map((row, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '16px 8px', fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{row.subject}</td>
                                            <td style={{ padding: '16px 8px', fontSize: '14px', fontWeight: '600', color: '#0f172a', textAlign: 'center' }}>{row.appeared}</td>
                                            <td style={{ padding: '16px 8px', fontSize: '14px', fontWeight: '600', color: '#0f172a', textAlign: 'center' }}>{row.pass}</td>
                                            <td style={{ padding: '16px 8px', fontSize: '14px', fontWeight: '600', color: '#0f172a', textAlign: 'center' }}>{row.fail}</td>
                                            <td style={{ padding: '16px 8px', fontSize: '14px', fontWeight: '700', color: '#10b981', textAlign: 'center' }}>{row.pass_percentage}</td>
                                        </tr>
                                    ))}
                                    {subjectResults.length > 0 && (
                                        <tr style={{ borderTop: '2px solid #e2e8f0', background: '#f8fafc' }}>
                                            <td style={{ padding: '16px 8px', fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>Total</td>
                                            <td style={{ padding: '16px 8px', fontSize: '14px', fontWeight: '800', color: '#0f172a', textAlign: 'center' }}>{subjectResults.reduce((sum, r) => sum + r.appeared, 0)}</td>
                                            <td style={{ padding: '16px 8px', fontSize: '14px', fontWeight: '800', color: '#0f172a', textAlign: 'center' }}>{subjectResults.reduce((sum, r) => sum + r.pass, 0)}</td>
                                            <td style={{ padding: '16px 8px', fontSize: '14px', fontWeight: '800', color: '#0f172a', textAlign: 'center' }}>{subjectResults.reduce((sum, r) => sum + r.fail, 0)}</td>
                                            <td style={{ padding: '16px 8px', fontSize: '14px', fontWeight: '800', color: '#10b981', textAlign: 'center' }}>
                                                {subjectResults.length > 0 ? `${Math.round((subjectResults.reduce((sum, r) => sum + r.pass, 0) / subjectResults.reduce((sum, r) => sum + r.appeared, 0)) * 100)}%` : '0%'}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Backlog Students Table */}
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>Backlog Students ({['I', 'II', 'III', 'IV', 'V', 'VI'][activeSemTab - 1]} Semester)</h3>
                        {backlogs.length === 0 ? (
                            <div style={{ padding: '30px', textAlign: 'center', color: '#64748b', fontSize: '14px', background: '#f8fafc', borderRadius: '8px' }}>
                                No backlogs found for this semester.
                            </div>
                        ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                                        <th style={{ padding: '12px 8px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>Reg No</th>
                                        <th style={{ padding: '12px 8px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>Student Name</th>
                                        <th style={{ padding: '12px 8px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>Subject</th>
                                        <th style={{ padding: '12px 8px', fontSize: '13px', color: '#64748b', fontWeight: '600', textAlign: 'center' }}>Semester</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {backlogs.map((row, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '16px 8px', fontSize: '14px', fontWeight: '600', color: '#475569' }}>{row.reg_no}</td>
                                            <td style={{ padding: '16px 8px', fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{row.student_name}</td>
                                            <td style={{ padding: '16px 8px', fontSize: '14px', fontWeight: '600', color: '#475569' }}>{row.subject}</td>
                                            <td style={{ padding: '16px 8px', fontSize: '14px', fontWeight: '600', color: '#475569', textAlign: 'center' }}>{row.semester}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        <div style={{ textAlign: 'center', marginTop: '16px' }}>
                            <button style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: '600', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: '0 auto' }}>
                                View All Backlogs <FaChevronRight style={{ fontSize: '10px' }} />
                            </button>
                        </div>
                    </div>

                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    
                    {/* Recent Notifications Panel */}
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>Recent Notifications</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', flexShrink: 0 }}>
                                    <FaFileAlt style={{ fontSize: '14px' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>Hall Tickets Released for VI Semester</span>
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#64748b' }}>20 May 2026</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', flexShrink: 0 }}>
                                    <FaLock style={{ fontSize: '14px' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>Internal Marks Locked Successfully</span>
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#64748b' }}>18 May 2026</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', flexShrink: 0 }}>
                                    <FaFileAlt style={{ fontSize: '14px' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>Results Published for V Semester</span>
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#64748b' }}>15 May 2026</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b', flexShrink: 0 }}>
                                    <FaBell style={{ fontSize: '14px' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>Revaluation Process is Now Open</span>
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#64748b' }}>14 May 2026</div>
                                </div>
                            </div>

                        </div>
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <button style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: '600', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: '0 auto' }}>
                                View All Notifications <FaChevronRight style={{ fontSize: '10px' }} />
                            </button>
                        </div>
                    </div>

                    {/* Quick Actions Panel */}
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>Quick Actions</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            
                            <button onClick={() => navigate('/hod/students')} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', color: '#2563eb', fontWeight: '600', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s' }}>
                                <FaEye style={{ fontSize: '16px' }} /> View Results
                            </button>
                            
                            <button onClick={() => navigate('/hod/reports')} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '10px', color: '#10b981', fontWeight: '600', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s' }}>
                                <FaDownload style={{ fontSize: '16px' }} /> Export Report
                            </button>
                            
                            <button onClick={() => alert('Initiating Hall Ticket Downloads...')} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px', background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '10px', color: '#8b5cf6', fontWeight: '600', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s' }}>
                                <FaRegFileAlt style={{ fontSize: '16px' }} /> Download Hall Tickets
                            </button>
                            
                            <button onClick={() => navigate('/hod/backlogs')} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px', background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '10px', color: '#d97706', fontWeight: '600', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s' }}>
                                <FaExclamationTriangle style={{ fontSize: '16px' }} /> View Backlogs
                            </button>

                        </div>
                    </div>

                </div>
            </div>

        </main>
    );
}
