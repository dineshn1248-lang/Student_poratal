import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUsers, FaCheckCircle, FaTicketAlt, FaExclamationTriangle, 
  FaFileAlt, FaSyncAlt, FaArrowRight, FaEye, FaDownload, 
  FaCalendarAlt, FaFileExport, FaBell
} from 'react-icons/fa';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import './Principal.css';

export default function PrincipalExaminations() {
    const navigate = useNavigate();
    const [dashboardStats, setDashboardStats] = useState(null);
    const [semesterOverview, setSemesterOverview] = useState([]);
    const [currentSemDetails, setCurrentSemDetails] = useState(null);
    const [registrationTable, setRegistrationTable] = useState([]);
    const [backlogMonitoring, setBacklogMonitoring] = useState(null);
    const [revaluationRequests, setRevaluationRequests] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAllData();
    }, []);

    const loadAllData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const headers = { 'Authorization': `Bearer ${token}` };
            
            const [statsRes, semOverRes, curSemRes, regRes, backRes, revalRes] = await Promise.all([
                fetch('http://localhost:5000/api/principal/exams/dashboard_stats', { headers }),
                fetch('http://localhost:5000/api/principal/exams/semester_overview', { headers }),
                fetch('http://localhost:5000/api/principal/exams/current_semester_details', { headers }),
                fetch('http://localhost:5000/api/principal/exams/registration_table', { headers }),
                fetch('http://localhost:5000/api/principal/exams/backlog_monitoring', { headers }),
                fetch('http://localhost:5000/api/principal/exams/revaluation_requests', { headers })
            ]);

            setDashboardStats(await statsRes.json());
            setSemesterOverview(await semOverRes.json());
            setCurrentSemDetails(await curSemRes.json());
            setRegistrationTable(await regRes.json());
            setBacklogMonitoring(await backRes.json());
            setRevaluationRequests(await revalRes.json());
        } catch (error) {
            console.error("Error loading exam dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading || !dashboardStats || !currentSemDetails) {
        return <main className="principal-page-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><h3>Loading Dashboard...</h3></main>;
    }

    const COLORS = ['#10b981', '#ef4444', '#f59e0b']; // Pass, Fail, Backlog

    const donutData = [
        { name: 'Pass', value: currentSemDetails.analytics.passed },
        { name: 'Fail', value: currentSemDetails.analytics.failed },
        { name: 'Backlog', value: currentSemDetails.analytics.backlogs }
    ];

    return (
        <main className="principal-page-content exam-dashboard-wrapper" style={{ backgroundColor: '#f8fafc', paddingBottom: '40px' }}>
            {/* Header Section */}
            <div className="exam-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', margin: 0 }}>Examination Management</h1>
                    <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>Monitor institution-wide examination activities, eligibility, hall tickets, results, and academic performance.</p>
                </div>
            </div>

            {/* Top Summary Cards */}
            <div className="exam-top-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <StatBox title="Total Students Registered" value={dashboardStats.total_registered} subText="This Session" icon={<FaUsers />} color="#8b5cf6" bg="#f5f3ff" />
                <StatBox title="Eligible Students" value={dashboardStats.eligible} subText={`${dashboardStats.eligible_percentage}%`} icon={<FaCheckCircle />} color="#10b981" bg="#ecfdf5" />
                <StatBox title="Hall Tickets Generated" value={dashboardStats.hall_tickets} subText={`${dashboardStats.hall_tickets_percentage}%`} icon={<FaTicketAlt />} color="#3b82f6" bg="#eff6ff" />
                <StatBox title="Students With Backlogs" value={dashboardStats.backlogs} subText={`${dashboardStats.backlogs_percentage}%`} icon={<FaExclamationTriangle />} color="#f59e0b" bg="#fffbeb" />
                <StatBox title="Results Published" value={dashboardStats.results_published} subText="Semesters" icon={<FaFileAlt />} color="#14b8a6" bg="#f0fdfa" />
                <StatBox title="Revaluation Requests" value={dashboardStats.revaluation_requests} subText="Pending" icon={<FaSyncAlt />} color="#ef4444" bg="#fef2f2" />
            </div>

            {/* Middle Section: Overview & Analytics */}
            <div className="exam-middle-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.5fr', gap: '20px', marginBottom: '24px' }}>
                
                {/* Semester Overview Cards */}
                <div className="exam-panel" style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px', color: '#0f172a' }}>Semester Examination Overview</h3>
                    <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px' }}>
                        {semesterOverview.map((sem, idx) => (
                            <div key={idx} style={{ minWidth: '120px', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', textAlign: 'center', background: sem.status === 'In Progress' ? '#eff6ff' : '#fff' }}>
                                <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>{sem.semester}</div>
                                <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', marginBottom: '12px', background: sem.status === 'In Progress' ? '#dbeafe' : '#ecfdf5', color: sem.status === 'In Progress' ? '#2563eb' : '#059669' }}>
                                    {sem.status}
                                </div>
                                <div style={{ fontSize: '13px', color: '#475569', marginBottom: '4px' }}>Reg: <span style={{ fontWeight: '700', color: '#0f172a' }}>{sem.registered}</span></div>
                                <div style={{ fontSize: '13px', color: '#475569' }}>Pass %: <span style={{ fontWeight: '700', color: '#0f172a' }}>{sem.pass_percentage}</span></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Semester Details Pane */}
                <div className="exam-panel" style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}><FaCalendarAlt style={{ color: '#3b82f6', marginRight: '8px' }}/>{currentSemDetails.current_sem_label} Details</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <DetailRow label="Students Registered" value={currentSemDetails.registered} />
                        <DetailRow label="Eligible Students" value={currentSemDetails.eligible} />
                        <DetailRow label="Not Eligible Students" value={currentSemDetails.not_eligible} />
                        <DetailRow label="Hall Tickets Generated" value={currentSemDetails.hall_tickets} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '14px', color: '#64748b' }}>Results Published</span>
                            <span style={{ fontSize: '12px', fontWeight: '700', background: '#ecfdf5', color: '#059669', padding: '4px 12px', borderRadius: '12px' }}>{currentSemDetails.results_published}</span>
                        </div>
                    </div>
                </div>

                {/* Result Analytics */}
                <div className="exam-panel" style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px', color: '#0f172a' }}>Result Analytics ({currentSemDetails.current_sem_label})</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
                        <div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>Pass Students</div>
                            <div style={{ fontSize: '18px', fontWeight: '800', color: '#10b981' }}>{currentSemDetails.analytics.passed} <span style={{ fontSize: '12px', marginLeft: '4px' }}>{currentSemDetails.analytics.pass_perc}</span></div>
                        </div>
                        <div style={{ borderLeft: '1px solid #e2e8f0', paddingLeft: '12px' }}>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>Fail Students</div>
                            <div style={{ fontSize: '18px', fontWeight: '800', color: '#ef4444' }}>{currentSemDetails.analytics.failed} <span style={{ fontSize: '12px', marginLeft: '4px' }}>{currentSemDetails.analytics.fail_perc}</span></div>
                        </div>
                        <div style={{ borderLeft: '1px solid #e2e8f0', paddingLeft: '12px' }}>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>Backlog Students</div>
                            <div style={{ fontSize: '18px', fontWeight: '800', color: '#f59e0b' }}>{currentSemDetails.analytics.backlogs} <span style={{ fontSize: '12px', marginLeft: '4px' }}>{currentSemDetails.analytics.backlog_perc}</span></div>
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '20px', height: '140px' }}>
                        <div style={{ flex: 1.5, position: 'relative' }}>
                            <div style={{ fontSize: '11px', fontWeight: '700', color: '#1e293b', marginBottom: '10px' }}>Semester-wise Pass Percentage</div>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={currentSemDetails.bar_chart} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9 }} />
                                    <YAxis hide={true} />
                                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ fontSize: '12px', borderRadius: '8px' }}/>
                                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={12} label={{ position: 'top', fill: '#475569', fontSize: 9, formatter: (val) => `${val}%` }} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ fontSize: '11px', fontWeight: '700', color: '#1e293b', marginBottom: '10px' }}>Overall Performance</div>
                            <div style={{ width: '100px', height: '100px', position: 'relative' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={donutData} innerRadius={30} outerRadius={45} dataKey="value" stroke="none">
                                            {donutData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Grid: Tables & Requests */}
            <div className="exam-bottom-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr', gap: '20px' }}>
                
                {/* Registration Table */}
                <div className="exam-panel" style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Examination Registration Overview ({currentSemDetails.current_sem_label})</h3>
                    </div>
                    <div className="table-responsive" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                            <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', zIndex: 1 }}>
                                <tr>
                                    <th style={{ padding: '12px 16px', color: '#3b82f6', fontWeight: '700', borderBottom: '1px solid #e2e8f0' }}>#</th>
                                    <th style={{ padding: '12px 16px', color: '#3b82f6', fontWeight: '700', borderBottom: '1px solid #e2e8f0' }}>Register Number</th>
                                    <th style={{ padding: '12px 16px', color: '#3b82f6', fontWeight: '700', borderBottom: '1px solid #e2e8f0' }}>Student Name</th>
                                    <th style={{ padding: '12px 16px', color: '#3b82f6', fontWeight: '700', borderBottom: '1px solid #e2e8f0' }}>Semester</th>
                                    <th style={{ padding: '12px 16px', color: '#3b82f6', fontWeight: '700', borderBottom: '1px solid #e2e8f0' }}>Registration Status</th>
                                    <th style={{ padding: '12px 16px', color: '#3b82f6', fontWeight: '700', borderBottom: '1px solid #e2e8f0' }}>Hall Ticket Status</th>
                                    <th style={{ padding: '12px 16px', color: '#3b82f6', fontWeight: '700', borderBottom: '1px solid #e2e8f0' }}>Result Status</th>
                                    <th style={{ padding: '12px 16px', color: '#3b82f6', fontWeight: '700', borderBottom: '1px solid #e2e8f0' }}>Backlogs</th>
                                    <th style={{ padding: '12px 16px', color: '#3b82f6', fontWeight: '700', borderBottom: '1px solid #e2e8f0' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registrationTable.slice(0,8).map((row, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '12px 16px', color: '#64748b' }}>{idx + 1}</td>
                                        <td style={{ padding: '12px 16px', fontWeight: '700', color: '#0f172a' }}>{row.register_no}</td>
                                        <td style={{ padding: '12px 16px', fontWeight: '600' }}>{row.name}</td>
                                        <td style={{ padding: '12px 16px', color: '#475569' }}>{row.semester}</td>
                                        <td style={{ padding: '12px 16px' }}><StatusBadge text={row.registration_status} /></td>
                                        <td style={{ padding: '12px 16px' }}><StatusBadge text={row.hall_ticket_status} /></td>
                                        <td style={{ padding: '12px 16px' }}><StatusBadge text={row.result_status} /></td>
                                        <td style={{ padding: '12px 16px', fontWeight: '800', color: row.backlogs > 0 ? '#ef4444' : '#10b981' }}>{row.backlogs}</td>
                                        <td style={{ padding: '12px 16px', display: 'flex', gap: '8px' }}>
                                            <button style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer' }}><FaEye /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <button onClick={() => navigate('/principal/students')} style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>View All Students →</button>
                    </div>
                </div>

                {/* Right side Panels */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    
                    {/* Backlog Monitoring */}
                    <div className="exam-panel" style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px', color: '#0f172a' }}>Backlog Monitoring</h3>
                        <div style={{ background: 'linear-gradient(to right, #f5f3ff, #fff)', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
                            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Total Backlog Students</div>
                            <div style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a' }}>{backlogMonitoring?.total_backlogs || 0}</div>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                            <thead>
                                <tr>
                                    <th style={{ color: '#3b82f6', paddingBottom: '10px' }}>Register No</th>
                                    <th style={{ color: '#3b82f6', paddingBottom: '10px' }}>Student Name</th>
                                    <th style={{ color: '#3b82f6', paddingBottom: '10px' }}>Subjects Failed</th>
                                    <th style={{ color: '#3b82f6', paddingBottom: '10px' }}>Current Sem</th>
                                    <th style={{ color: '#3b82f6', paddingBottom: '10px' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {backlogMonitoring?.students.slice(0,4).map((s, idx) => (
                                    <tr key={idx} style={{ borderTop: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '10px 0', fontWeight: '700' }}>{s.register_no}</td>
                                        <td style={{ padding: '10px 0' }}>{s.name}</td>
                                        <td style={{ padding: '10px 0', color: '#64748b' }}>{s.subjects_failed}</td>
                                        <td style={{ padding: '10px 0' }}>{s.current_sem}</td>
                                        <td style={{ padding: '10px 0', color: '#ef4444', fontWeight: '700' }}>{s.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div style={{ textAlign: 'center', marginTop: '16px' }}>
                            <button onClick={() => navigate('/principal/backlogs')} style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>View All Backlogs →</button>
                        </div>
                    </div>

                    {/* Revaluation Requests */}
                    <div className="exam-panel" style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px', color: '#0f172a' }}>Revaluation Requests</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                            <div style={{ border: '1px solid #fcd34d', background: '#fffbeb', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                                <div style={{ fontSize: '11px', fontWeight: '700', color: '#d97706' }}>Pending</div>
                                <div style={{ fontSize: '20px', fontWeight: '800', color: '#f59e0b' }}>{revaluationRequests?.pending_count || 0}</div>
                            </div>
                            <div style={{ border: '1px solid #6ee7b7', background: '#ecfdf5', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                                <div style={{ fontSize: '11px', fontWeight: '700', color: '#059669' }}>Approved</div>
                                <div style={{ fontSize: '20px', fontWeight: '800', color: '#10b981' }}>{revaluationRequests?.approved_count || 0}</div>
                            </div>
                            <div style={{ border: '1px solid #fca5a5', background: '#fef2f2', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                                <div style={{ fontSize: '11px', fontWeight: '700', color: '#dc2626' }}>Rejected</div>
                                <div style={{ fontSize: '20px', fontWeight: '800', color: '#ef4444' }}>{revaluationRequests?.rejected_count || 0}</div>
                            </div>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                            <thead>
                                <tr>
                                    <th style={{ color: '#3b82f6', paddingBottom: '10px' }}>Student Name</th>
                                    <th style={{ color: '#3b82f6', paddingBottom: '10px' }}>Subject</th>
                                    <th style={{ color: '#3b82f6', paddingBottom: '10px' }}>Current Marks</th>
                                    <th style={{ color: '#3b82f6', paddingBottom: '10px' }}>Request Date</th>
                                    <th style={{ color: '#3b82f6', paddingBottom: '10px' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {revaluationRequests?.requests.slice(0,4).map((r, idx) => (
                                    <tr key={idx} style={{ borderTop: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '10px 0', fontWeight: '600' }}>{r.student_name}</td>
                                        <td style={{ padding: '10px 0' }}>{r.subject}</td>
                                        <td style={{ padding: '10px 0', textAlign: 'center', fontWeight: '700' }}>{r.current_marks}</td>
                                        <td style={{ padding: '10px 0', color: '#64748b' }}>{r.request_date}</td>
                                        <td style={{ padding: '10px 0', color: r.status === 'Approved' ? '#10b981' : '#f59e0b', fontWeight: '700' }}>{r.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div style={{ textAlign: 'center', marginTop: '16px' }}>
                            <a href="#" style={{ color: '#3b82f6', fontSize: '13px', fontWeight: '700', textDecoration: 'none' }}>View All Requests →</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Final Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr', gap: '20px', marginTop: '20px' }}>
                <div className="exam-panel" style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <FaFileExport style={{ color: '#f59e0b', fontSize: '18px' }} />
                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Result Publication</h3>
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>Latest Result Published</div>
                    <div style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>VI Semester</div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>Publication Date</div>
                            <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>15 May 2026</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>Pass %</div>
                            <div style={{ fontSize: '13px', fontWeight: '700', color: '#10b981' }}>85%</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>Fail %</div>
                            <div style={{ fontSize: '13px', fontWeight: '700', color: '#ef4444' }}>10%</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>Backlog %</div>
                            <div style={{ fontSize: '13px', fontWeight: '700', color: '#f59e0b' }}>5%</div>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '24px' }}>
                        <a href="#" style={{ color: '#3b82f6', fontSize: '13px', fontWeight: '700', textDecoration: 'none' }}>View Result Report →</a>
                    </div>
                </div>

                <div className="exam-panel" style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <FaBell style={{ color: '#6366f1', fontSize: '18px' }} />
                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Important Notifications</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <NotificationRow text="Hall Tickets for VI Semester have been released." date="21 May 2026" />
                        <NotificationRow text="Results for VI Semester have been published." date="15 May 2026" />
                        <NotificationRow text="Revaluation last date for VI Semester is 25 May 2026." date="10 May 2026" />
                        <NotificationRow text="Exam registration for VI Semester closes on 30 May 2026." date="05 May 2026" />
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <a href="#" style={{ color: '#3b82f6', fontSize: '13px', fontWeight: '700', textDecoration: 'none' }}>View All Notifications →</a>
                    </div>
                </div>

                <div className="exam-panel" style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Quick Actions</h3>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <QuickActionButton onClick={() => alert("Initializing batch hall ticket generation... You will be notified when complete.")} text="Generate Hall Tickets" color="#3b82f6" icon={<FaTicketAlt />} bg="#eff6ff" />
                        <QuickActionButton onClick={() => alert("Publishing results securely to the Student Portals...")} text="Publish Results" color="#10b981" icon={<FaCheckCircle />} bg="#ecfdf5" />
                        <QuickActionButton onClick={() => alert("Compiling detailed Examination Report. Download will start shortly.")} text="Examination Report" color="#8b5cf6" icon={<FaFileAlt />} bg="#f5f3ff" />
                        <QuickActionButton onClick={() => alert("Exporting current dashboard data to CSV format...")} text="Export Data" color="#f59e0b" icon={<FaDownload />} bg="#fffbeb" />
                        <QuickActionButton onClick={() => alert("Loading Revaluation Requests deep-dive management view...")} text="Revaluation Requests" color="#ef4444" icon={<FaSyncAlt />} bg="#fef2f2" />
                        <QuickActionButton onClick={() => alert("Compiling Backlog Report for departmental counseling...")} text="Backlog Report" color="#0ea5e9" icon={<FaFileExport />} bg="#f0f9ff" />
                    </div>
                </div>
            </div>

        </main>
    );
}

// Sub-components for cleaner code
function StatBox({ title, value, subText, icon, color, bg }) {
    return (
        <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: bg, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                    {icon}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', maxWidth: '100px', textAlign: 'right', lineHeight: '1.2' }}>{title}</div>
            </div>
            <div>
                <div style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a' }}>{value}</div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', marginTop: '4px' }}>{subText}</div>
            </div>
        </div>
    );
}

function DetailRow({ label, value }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#64748b' }}>{label}</span>
            <span style={{ fontSize: '14px', fontWeight: '800', color: '#1e293b' }}>{value}</span>
        </div>
    );
}

function StatusBadge({ text }) {
    let bg = '#f1f5f9';
    let color = '#64748b';
    if (text === 'Registered' || text === 'Generated' || text === 'Published') { bg = '#ecfdf5'; color = '#059669'; }
    if (text === 'Pending') { bg = '#fffbeb'; color = '#d97706'; }
    if (text === 'Not Eligible' || text === 'Not Published') { bg = '#fef2f2'; color = '#dc2626'; }
    
    return (
        <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '700', background: bg, color: color }}>
            {text}
        </span>
    );
}

function NotificationRow({ text, date }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6' }}></div>
                <span style={{ fontSize: '13px', color: '#1e293b', fontWeight: '500' }}>{text}</span>
            </div>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>{date}</span>
        </div>
    );
}

function QuickActionButton({ text, icon, color, bg, onClick }) {
    return (
        <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${bg}`, background: '#fff', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
            onMouseOver={(e) => e.currentTarget.style.background = '#f8fafc'}
            onMouseOut={(e) => e.currentTarget.style.background = '#fff'}
        >
            <div style={{ color: color, fontSize: '14px' }}>{icon}</div>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>{text}</span>
        </button>
    );
}
