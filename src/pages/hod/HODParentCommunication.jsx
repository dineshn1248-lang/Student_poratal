import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaSms, FaEnvelope, FaCheckCircle, FaSpinner, FaExclamationTriangle, FaUsers, FaChartPie, FaEye, FaArrowRight, FaSync, FaInfoCircle } from 'react-icons/fa';
import './HOD.css';

export default function HODParentCommunication() {
    const [students, setStudents] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [logs, setLogs] = useState([]);
    const [stats, setStats] = useState({
        total_parents: 0,
        success_rate: 0,
        whatsapp: { delivered: 0, failed: 0, success_rate: 0 },
        email: { delivered: 0, failed: 0, success_rate: 0 },
        sms: { delivered: 0, failed: 0, success_rate: 0 }
    });
    
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [sendSuccess, setSendSuccess] = useState('');
    const [sendError, setSendError] = useState('');
    
    // Preview State
    const [previewData, setPreviewData] = useState(null);
    const [customRemark, setCustomRemark] = useState('');
    const [customMessage, setCustomMessage] = useState('');
    
    // Diagnostic / Bulk State
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [expandedLogId, setExpandedLogId] = useState(null);

    useEffect(() => {
        fetchStudents();
        fetchLogs();
        fetchStats();
    }, []);

    useEffect(() => {
        if (selectedStudentId) {
            fetchReport(selectedStudentId);
            fetchPreview(selectedStudentId);
        } else {
            setReport(null);
            setPreviewData(null);
            setCustomMessage('');
        }
    }, [selectedStudentId]);

    const fetchStudents = async () => {
        try {
            const token = localStorage.getItem('token');
            const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/hod/students`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await resp.json();
            if (resp.ok) setStudents(data);
        } catch (e) {
            console.error(e);
        }
    };

    const fetchLogs = async () => {
        try {
            const token = localStorage.getItem('token');
            const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/hod/parent-communication/logs`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await resp.json();
            if (resp.ok) setLogs(data);
        } catch (e) {
            console.error(e);
        }
    };

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('token');
            const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/hod/parent-communication/stats`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await resp.json();
            if (resp.ok) setStats(data);
        } catch (e) {
            console.error(e);
        }
    };

    const fetchReport = async (id) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/hod/parent-communication/report/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await resp.json();
            if (resp.ok) setReport(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const fetchPreview = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/hod/parent-communication/preview/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await resp.json();
            if (resp.ok) {
                setPreviewData(data);
                setCustomRemark(data.smart_remark);
                setCustomMessage(data.preview);
            }
        } catch (e) {
            console.error("Preview fetch failed", e);
        }
    };

    const handleSendWaterfall = async (methodOverride = null) => {
        if (!selectedStudentId) return;
        setSending(true);
        setSendSuccess('');
        setSendError('');
        
        try {
            const token = localStorage.getItem('token');
            const url = methodOverride === 'Email' ? `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/hod/parent-communication/test-email` :
                        methodOverride === 'SMS' ? `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/hod/parent-communication/test-whatsapp` : 
                        `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/hod/parent-communication/send`; // Default Meta WhatsApp

            const payload = methodOverride === 'Email' ? { recipient: report?.email || 'test@example.com' } : { student_id: selectedStudentId, custom_remark: customRemark, custom_message: customMessage };

            const resp = await fetch(url, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await resp.json();
            if (resp.ok) {
                setSendSuccess(`Delivery Complete!`);
                setTimeout(() => setSendSuccess(''), 5000);
            } else {
                setSendError(`Delivery Failed: ${result.error}`);
                setTimeout(() => setSendError(''), 5000);
            }
            fetchLogs();
            fetchStats();
        } catch (e) {
            setSendError('Network error — could not reach backend.');
            setTimeout(() => setSendError(''), 5000);
        } finally {
            setSending(false);
        }
    };

    const handleSendBulk = async (filterType, filterValue = '') => {
        if (!window.confirm(`Are you sure you want to run Bulk Delivery for: ${filterType}?`)) return;
        setSending(true);
        setSendSuccess('');
        setSendError('');
        
        try {
            const token = localStorage.getItem('token');
            const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/hod/parent-communication/send-bulk`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ filter_type: filterType, filter_value: filterValue })
            });
            const result = await resp.json();
            if (resp.ok) {
                setSendSuccess(`Bulk Dispatch Complete! Sent: ${result.sent} | Failed: ${result.failed}`);
                setTimeout(() => setSendSuccess(''), 5000);
            } else {
                setSendError(`Bulk dispatch failed: ${result.error || 'Server error'}`);
                setTimeout(() => setSendError(''), 5000);
            }
            fetchLogs();
            fetchStats();
        } catch (e) {
            setSendError('Network error — could not reach backend.');
            setTimeout(() => setSendError(''), 5000);
        } finally {
            setSending(false);
        }
    };

    const getStatusBadge = (status) => {
        if (!status) return null;
        const s = status.toLowerCase();
        if (s === 'delivered' || s === 'read') return <span className="status-badge status-delivered">Delivered</span>;
        if (s === 'sent') return <span className="status-badge status-sent">Sent</span>;
        if (s === 'queued') return <span className="status-badge status-queued">Queued</span>;
        if (s === 'pending') return <span className="status-badge status-pending">Pending</span>;
        if (s === 'undelivered' || s === 'failed' || s === 'fallback triggered') return <span className="status-badge status-failed">Failed</span>;
        return <span className="status-badge status-default">{status}</span>;
    };

    return (
        <div className="parent-comm-dashboard">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Parent Communication Dashboard</h1>
                <p className="dashboard-subtitle">Send and manage communication with parents via WhatsApp, Email and SMS.</p>
            </div>

            {/* Error/Success Banners */}
            {sendSuccess && <div className="alert-success">{sendSuccess}</div>}
            {sendError && <div className="alert-error">{sendError}</div>}

            {/* Top Summary Cards */}
            <div className="summary-cards-container">
                <div className="summary-card">
                    <div className="summary-icon icon-whatsapp"><FaWhatsapp /></div>
                    <div className="summary-details">
                        <span className="summary-label">WhatsApp Delivered</span>
                        <span className="summary-value">{stats.whatsapp.delivered}</span>
                        <span className="summary-trend"><FaArrowRight className="trend-icon"/> This Month</span>
                    </div>
                </div>
                <div className="summary-card">
                    <div className="summary-icon icon-email"><FaEnvelope /></div>
                    <div className="summary-details">
                        <span className="summary-label">Emails Delivered</span>
                        <span className="summary-value">{stats.email.delivered}</span>
                        <span className="summary-trend"><FaArrowRight className="trend-icon"/> This Month</span>
                    </div>
                </div>
                <div className="summary-card">
                    <div className="summary-icon icon-sms"><FaSms /></div>
                    <div className="summary-details">
                        <span className="summary-label">SMS Delivered</span>
                        <span className="summary-value">{stats.sms.delivered}</span>
                        <span className="summary-trend"><FaArrowRight className="trend-icon"/> This Month</span>
                    </div>
                </div>
                <div className="summary-card">
                    <div className="summary-icon icon-parents"><FaUsers /></div>
                    <div className="summary-details">
                        <span className="summary-label">Total Parents</span>
                        <span className="summary-value">{stats.total_parents}</span>
                        <span className="summary-trend">Registered</span>
                    </div>
                </div>
                <div className="summary-card">
                    <div className="summary-icon icon-success"><FaChartPie /></div>
                    <div className="summary-details">
                        <span className="summary-label">Success Rate</span>
                        <span className="summary-value">{stats.success_rate}%</span>
                        <span className="summary-trend">Overall Delivery</span>
                    </div>
                </div>
            </div>

            <div className="main-grid">
                {/* Left Column */}
                <div className="left-column">
                    
                    {/* Channel Cards */}
                    <div className="channel-cards-container">
                        {/* WhatsApp Channel */}
                        <div className="channel-card border-whatsapp">
                            <div className="channel-header">
                                <div className="channel-icon-large icon-whatsapp"><FaWhatsapp /></div>
                                <div>
                                    <h3 className="channel-title">WhatsApp</h3>
                                    <p className="channel-desc">Send WhatsApp messages</p>
                                </div>
                            </div>
                            <div className="channel-actions">
                                <button className="btn-outline outline-whatsapp" onClick={() => handleSendWaterfall('Meta WhatsApp')}>Send WhatsApp</button>
                                <button className="btn-outline outline-whatsapp" onClick={() => handleSendBulk('all')}>Bulk WhatsApp</button>
                            </div>
                            <div className="channel-stats">
                                <div className="c-stat">
                                    <span className="c-stat-label">Delivered</span>
                                    <span className="c-stat-val val-green">{stats.whatsapp.delivered}</span>
                                </div>
                                <div className="c-stat">
                                    <span className="c-stat-label">Failed</span>
                                    <span className="c-stat-val val-red">{stats.whatsapp.failed}</span>
                                </div>
                            </div>
                            <div className="channel-footer text-whatsapp">
                                Success Rate: {stats.whatsapp.success_rate}%
                            </div>
                        </div>

                        {/* Email Channel */}
                        <div className="channel-card border-email">
                            <div className="channel-header">
                                <div className="channel-icon-large icon-email"><FaEnvelope /></div>
                                <div>
                                    <h3 className="channel-title">Email</h3>
                                    <p className="channel-desc">Send emails via Gmail SMTP</p>
                                </div>
                            </div>
                            <div className="channel-actions">
                                <button className="btn-outline outline-email" onClick={() => handleSendWaterfall('Email')}>Send Email</button>
                                <button className="btn-outline outline-email" onClick={() => handleSendBulk('all')}>Bulk Email</button>
                            </div>
                            <div className="channel-stats">
                                <div className="c-stat">
                                    <span className="c-stat-label">Delivered</span>
                                    <span className="c-stat-val val-blue">{stats.email.delivered}</span>
                                </div>
                                <div className="c-stat">
                                    <span className="c-stat-label">Failed</span>
                                    <span className="c-stat-val val-red">{stats.email.failed}</span>
                                </div>
                            </div>
                            <div className="channel-footer text-email">
                                Success Rate: {stats.email.success_rate}%
                            </div>
                        </div>

                        {/* SMS Channel */}
                        <div className="channel-card border-sms">
                            <div className="channel-header">
                                <div className="channel-icon-large icon-sms"><FaSms /></div>
                                <div>
                                    <h3 className="channel-title">SMS</h3>
                                    <p className="channel-desc">Send SMS via Twilio</p>
                                </div>
                            </div>
                            <div className="channel-actions">
                                <button className="btn-outline outline-sms" onClick={() => handleSendWaterfall('SMS')}>Send SMS</button>
                                <button className="btn-outline outline-sms" onClick={() => handleSendBulk('all')}>Bulk SMS</button>
                            </div>
                            <div className="channel-stats">
                                <div className="c-stat">
                                    <span className="c-stat-label">Delivered</span>
                                    <span className="c-stat-val val-orange">{stats.sms.delivered}</span>
                                </div>
                                <div className="c-stat">
                                    <span className="c-stat-label">Failed</span>
                                    <span className="c-stat-val val-red">{stats.sms.failed}</span>
                                </div>
                            </div>
                            <div className="channel-footer text-sms">
                                Success Rate: {stats.sms.success_rate}%
                            </div>
                        </div>
                    </div>

                    {/* Bulk Communication Row */}
                    <div className="bulk-comm-section">
                        <h3 className="section-title">Bulk Communication</h3>
                        <div className="bulk-grid">
                            <div className="bulk-card">
                                <div className="bulk-icon icon-blue"><FaUsers/></div>
                                <h4 className="bulk-title">All Parents</h4>
                                <p className="bulk-desc">Send to all registered parents</p>
                                <button className="btn-select" onClick={() => handleSendBulk('all')}>Select</button>
                            </div>
                            <div className="bulk-card">
                                <div className="bulk-icon icon-purple"><FaInfoCircle/></div>
                                <h4 className="bulk-title">Semester Wise</h4>
                                <p className="bulk-desc">Send to parents by semester</p>
                                <button className="btn-select" onClick={() => handleSendBulk('semester')}>Select</button>
                            </div>
                            <div className="bulk-card">
                                <div className="bulk-icon icon-teal"><FaInfoCircle/></div>
                                <h4 className="bulk-title">Department Wise</h4>
                                <p className="bulk-desc">Send to parents by department</p>
                                <button className="btn-select" onClick={() => handleSendBulk('department')}>Select</button>
                            </div>
                            <div className="bulk-card">
                                <div className="bulk-icon icon-orange"><FaExclamationTriangle/></div>
                                <h4 className="bulk-title">Attendance Warning</h4>
                                <p className="bulk-desc">Send to parents of low attendance</p>
                                <button className="btn-select">Select</button>
                            </div>
                            <div className="bulk-card">
                                <div className="bulk-icon icon-indigo"><FaInfoCircle/></div>
                                <h4 className="bulk-title">Backlog Students</h4>
                                <p className="bulk-desc">Send to parents of students with backlogs</p>
                                <button className="btn-select">Select</button>
                            </div>
                        </div>
                    </div>

                    {/* Logs Table */}
                    <div className="logs-section">
                        <div className="logs-header-row">
                            <h3 className="section-title">Recent Communication Logs</h3>
                        </div>
                        <div className="table-responsive">
                            <table className="logs-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Student Name</th>
                                        <th>Parent Name</th>
                                        <th>Channel</th>
                                        <th>Message Type</th>
                                        <th>Status</th>
                                        <th>Sent Time</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.length === 0 ? (
                                        <tr><td colSpan="8" className="text-center">No logs found.</td></tr>
                                    ) : (
                                        logs.slice(0, 10).map((log, i) => (
                                            <React.Fragment key={log.id}>
                                                <tr>
                                                    <td className="fw-500">{i + 1}</td>
                                                    <td className="fw-600 text-dark">{log.student_name}</td>
                                                    <td className="fw-500">{log.parent_name}</td>
                                                    <td className="fw-500 channel-cell">
                                                        {log.communication_type === 'WhatsApp' ? <FaWhatsapp className="text-whatsapp"/> : log.communication_type === 'Email' ? <FaEnvelope className="text-email"/> : <FaSms className="text-sms"/>}
                                                        {log.communication_type}
                                                    </td>
                                                    <td>Academic Update</td>
                                                    <td>{getStatusBadge(log.status)}</td>
                                                    <td>{log.date}</td>
                                                    <td>
                                                        <button className="btn-view" onClick={() => setExpandedLogId(expandedLogId === log.id ? null : log.id)}><FaEye/> View</button>
                                                    </td>
                                                </tr>
                                                {expandedLogId === log.id && (
                                                    <tr className="expanded-row">
                                                        <td colSpan="8">
                                                            <pre className="raw-response">
                                                                {log.provider_response ? JSON.stringify(JSON.parse(log.provider_response), null, 2) : 'No raw response stored.'}
                                                            </pre>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))
                                    )}
                                </tbody>
                            </table>
                            <div className="view-all-link">View All Logs <FaArrowRight size={10}/></div>
                        </div>
                    </div>
                </div>

                {/* Right Column (Sidebar) */}
                <div className="right-sidebar">
                    <div className="sidebar-section">
                        <h4 className="sidebar-title">Select Student</h4>
                        <select 
                            className="student-select"
                            value={selectedStudentId} 
                            onChange={(e) => setSelectedStudentId(e.target.value)}
                        >
                            <option value="">Select a student...</option>
                            {students.map(s => <option key={s.id} value={s.id}>{s.register_no} - {s.full_name}</option>)}
                        </select>
                    </div>

                    <div className="sidebar-section">
                        <h4 className="sidebar-title">Parent Details</h4>
                        <div className="parent-details-grid">
                            <div className="pd-label">Parent Name</div>
                            <div className="pd-label">Mobile Number</div>
                            <div className="pd-value fw-600">{report?.parent_name || '-'} <FaWhatsapp className="text-whatsapp" style={{fontSize:'12px', marginLeft:'4px'}}/></div>
                            <div className="pd-value">{report?.parent_phone || '-'} <FaWhatsapp className="text-whatsapp" style={{fontSize:'12px', marginLeft:'4px'}}/></div>
                            
                            <div className="pd-label mt-2">Email</div>
                            <div></div>
                            <div className="pd-value" style={{gridColumn:'span 2'}}><FaEnvelope className="text-gray" style={{fontSize:'12px', marginRight:'6px'}}/> {report?.email || '-'}</div>
                        </div>
                    </div>

                    <div className="sidebar-section message-preview-wrapper">
                        <h4 className="sidebar-title">Message Preview</h4>
                        <div className="message-preview-box">
                            {previewData ? (
                                <textarea 
                                    className="preview-textarea" 
                                    value={customMessage}
                                    onChange={(e) => setCustomMessage(e.target.value)}
                                    rows={15}
                                    style={{ width: '100%', resize: 'vertical', padding: '10px', fontFamily: 'inherit', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
                            ) : (
                                <div className="preview-placeholder">Select a student to view the message template preview.</div>
                            )}
                        </div>
                        
                        <div className="preview-actions">
                            <button className="btn-solid bg-whatsapp" onClick={() => handleSendWaterfall('Meta WhatsApp')} disabled={!selectedStudentId || sending}><FaWhatsapp/> Send WhatsApp</button>
                            <button className="btn-solid bg-email" onClick={() => handleSendWaterfall('Email')} disabled={!selectedStudentId || sending}><FaEnvelope/> Send Email</button>
                            <button className="btn-solid bg-sms" onClick={() => handleSendWaterfall('SMS')} disabled={!selectedStudentId || sending}><FaSms/> Send SMS</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
