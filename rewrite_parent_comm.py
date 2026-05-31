import os

new_content = """import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaSms, FaEnvelope, FaCheckCircle, FaSpinner, FaExclamationTriangle, FaUsers, FaPaperPlane, FaTimesCircle, FaBroadcastTower } from 'react-icons/fa';
import './HOD.css';

export default function HODParentCommunication() {
    const [students, setStudents] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [report, setReport] = useState(null);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [sendSuccess, setSendSuccess] = useState('');
    const [sendError, setSendError] = useState('');

    useEffect(() => {
        fetchStudents();
        fetchLogs();
    }, []);

    useEffect(() => {
        if (selectedStudentId) {
            fetchReport(selectedStudentId);
        } else {
            setReport(null);
        }
    }, [selectedStudentId]);

    const fetchStudents = async () => {
        try {
            const token = localStorage.getItem('token');
            const resp = await fetch('http://localhost:5000/api/hod/students', {
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
            const resp = await fetch('http://localhost:5000/api/hod/parent-communication/logs', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await resp.json();
            if (resp.ok) setLogs(data);
        } catch (e) {
            console.error(e);
        }
    };

    const fetchReport = async (id) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const resp = await fetch(`http://localhost:5000/api/hod/parent-communication/report/${id}`, {
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

    const handleSend = async (method) => {
        if (!selectedStudentId) return;
        setSending(true);
        setSendSuccess('');
        setSendError('');
        try {
            const token = localStorage.getItem('token');
            const resp = await fetch('http://localhost:5000/api/hod/parent-communication/send', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ student_id: selectedStudentId, method })
            });
            const result = await resp.json();
            if (resp.ok && result.status === 'Sent') {
                setSendSuccess(`Message Sent Successfully via ${method} to ${result.recipient}!`);
                setTimeout(() => setSendSuccess(''), 5000);
            } else {
                setSendError(`Failed to send via ${method}: ${result.error || 'Check API credentials'}`);
                setTimeout(() => setSendError(''), 7000);
            }
            fetchLogs();
        } catch (e) {
            setSendError('Network error — could not reach backend.');
            setTimeout(() => setSendError(''), 5000);
        } finally {
            setSending(false);
        }
    };

    const handleSendBulk = async (method) => {
        if (!window.confirm(`Are you sure you want to send mass ${method} messages to all parents?`)) return;
        setSending(true);
        setSendSuccess('');
        setSendError('');
        try {
            const token = localStorage.getItem('token');
            const resp = await fetch('http://localhost:5000/api/hod/parent-communication/send-bulk', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ method })
            });
            const result = await resp.json();
            if (resp.ok) {
                setSendSuccess(`Bulk Dispatch Complete! Sent: ${result.sent} | Failed: ${result.failed}`);
                setTimeout(() => setSendSuccess(''), 8000);
            } else {
                setSendError(`Bulk dispatch failed: ${result.error || 'Server error'}`);
                setTimeout(() => setSendError(''), 7000);
            }
            fetchLogs();
        } catch (e) {
            setSendError('Network error — could not reach backend.');
            setTimeout(() => setSendError(''), 5000);
        } finally {
            setSending(false);
        }
    };

    const getStatusBadge = (status) => {
        if (status === 'Sent') {
            return (
                <span style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'6px 12px', borderRadius:'8px', fontSize: '13px', fontWeight:'800', background: '#ecfdf5', color: '#065f46', border: '1px solid #6ee7b7' }}>
                    <FaCheckCircle size={12}/> Sent
                </span>
            );
        }
        return (
            <span style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'6px 12px', borderRadius:'8px', fontSize: '13px', fontWeight:'800', background: '#fef2f2', color: '#991b1b', border: '1px solid #fca5a5' }}>
                <FaExclamationTriangle size={12}/> Failed
            </span>
        );
    };

    // Calculate Dashboard Stats
    const totalParents = new Set(logs.filter(l => l.parent_name && l.parent_name !== 'Unknown').map(l => l.parent_name)).size;
    
    // We don't have exactly "today", but we can count overall or by timestamp. We'll count overall for simplicity in this demo.
    const whatsappSent = logs.filter(l => l.communication_type === 'WhatsApp' && l.status === 'Sent').length;
    const smsSent = logs.filter(l => l.communication_type === 'SMS' && l.status === 'Sent').length;
    const emailSent = logs.filter(l => l.communication_type === 'Email' && l.status === 'Sent').length;
    const failedMessages = logs.filter(l => l.status === 'Failed').length;

    return (
        <div className="hod-page-content">
            <div className="page-header" style={{ marginBottom: '24px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px' }}>Parent Communication Dashboard</h1>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '15px' }}>Manage real-time parent notifications via WhatsApp, SMS, and Email.</p>
                </div>
            </div>

            {/* Notification Badges */}
            {sendSuccess && (
                <div style={{ padding: '16px 20px', background: '#ecfdf5', color: '#065f46', borderRadius: '12px', borderLeft: '5px solid #10b981', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 'bold' }}>
                    <FaCheckCircle size={18} /> {sendSuccess}
                </div>
            )}
            {sendError && (
                <div style={{ padding: '16px 20px', background: '#fef2f2', color: '#991b1b', borderRadius: '12px', borderLeft: '5px solid #ef4444', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 'bold' }}>
                    <FaExclamationTriangle size={18} /> {sendError}
                </div>
            )}

            {/* Dashboard Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '32px' }}>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f8fafc', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}><FaUsers /></div>
                    <div>
                        <div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Total Parents Comm.</div>
                        <div style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>{totalParents > 0 ? totalParents : logs.length > 0 ? new Set(logs.map(l => l.recipient)).size : 0}</div>
                    </div>
                </div>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}><FaWhatsapp /></div>
                    <div>
                        <div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>WhatsApp Sent</div>
                        <div style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>{whatsappSent}</div>
                    </div>
                </div>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}><FaSms /></div>
                    <div>
                        <div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>SMS Sent</div>
                        <div style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>{smsSent}</div>
                    </div>
                </div>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fef9c3', color: '#ca8a04', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}><FaEnvelope /></div>
                    <div>
                        <div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Emails Sent</div>
                        <div style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>{emailSent}</div>
                    </div>
                </div>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}><FaTimesCircle /></div>
                    <div>
                        <div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Failed Messages</div>
                        <div style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>{failedMessages}</div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', marginBottom: '32px' }}>
                {/* Left Column: Student Selection & Bulk Messaging */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>Select Student</h3>
                        <select 
                            value={selectedStudentId} 
                            onChange={(e) => setSelectedStudentId(e.target.value)}
                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none', background: '#f8fafc', fontWeight: '600', color: '#1e293b', fontSize: '14px' }}
                        >
                            <option value="">-- Choose Student --</option>
                            {students.map(s => (
                                <option key={s.id} value={s.id}>{s.register_no} - {s.full_name}</option>
                            ))}
                        </select>
                        {loading && <div style={{ marginTop: '12px', fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px' }}><FaSpinner className="fa-spin" /> Fetching real-time academic data...</div>}
                    </div>

                    <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FaBroadcastTower style={{ color: '#6366f1' }}/> Mass Parent Communication
                        </h3>
                        <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#64748b' }}>Instantly dispatch academic updates to all registered parents in your department using third-party APIs.</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <button onClick={() => handleSendBulk('WhatsApp')} disabled={sending} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#22c55e', color: 'white', padding: '12px', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>
                                <FaWhatsapp size={16} /> Send WhatsApp to All
                            </button>
                            <button onClick={() => handleSendBulk('SMS')} disabled={sending} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#3b82f6', color: 'white', padding: '12px', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>
                                <FaSms size={16} /> Send SMS to All
                            </button>
                            <button onClick={() => handleSendBulk('Email')} disabled={sending} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#f43f5e', color: 'white', padding: '12px', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>
                                <FaEnvelope size={16} /> Send Email to All
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Single Messaging Panel */}
                <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: '800', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
                        Single Parent Messaging Panel
                    </h3>
                    
                    {!report ? (
                        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', padding: '40px 0', gap: '12px' }}>
                            <FaPaperPlane size={40} style={{ color: '#cbd5e1' }} />
                            <span style={{ fontWeight: '700', fontSize: '15px' }}>Select a student to dispatch message</span>
                        </div>
                    ) : (
                        <div>
                            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '16px' }}>
                                    <div>
                                        <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '800' }}>STUDENT NAME</span>
                                        <h4 style={{ margin: '4px 0 0', fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>{report.student_name}</h4>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '800' }}>REGISTER NO</span>
                                        <h4 style={{ margin: '4px 0 0', fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>{report.register_no}</h4>
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div>
                                        <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '800' }}>ATTENDANCE</span>
                                        <h4 style={{ margin: '4px 0 0', fontSize: '16px', fontWeight: '800', color: report.attendance_percent < 75 ? '#ef4444' : '#10b981' }}>{report.attendance_percent}%</h4>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '800' }}>BACKLOGS</span>
                                        <h4 style={{ margin: '4px 0 0', fontSize: '16px', fontWeight: '800', color: report.backlog_count > 0 ? '#ef4444' : '#10b981' }}>{report.backlog_count}</h4>
                                    </div>
                                </div>
                            </div>
                            
                            <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '800', color: '#1e293b' }}>Dispatch Channel</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                                <button onClick={() => handleSend('WhatsApp')} disabled={sending} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', background: '#fff', border: '2px solid #22c55e', color: '#22c55e', padding: '16px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => {e.currentTarget.style.background='#22c55e'; e.currentTarget.style.color='#fff'}} onMouseLeave={e => {e.currentTarget.style.background='#fff'; e.currentTarget.style.color='#22c55e'}}>
                                    <FaWhatsapp size={24} /> Send WhatsApp
                                </button>
                                <button onClick={() => handleSend('SMS')} disabled={sending} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', background: '#fff', border: '2px solid #3b82f6', color: '#3b82f6', padding: '16px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => {e.currentTarget.style.background='#3b82f6'; e.currentTarget.style.color='#fff'}} onMouseLeave={e => {e.currentTarget.style.background='#fff'; e.currentTarget.style.color='#3b82f6'}}>
                                    <FaSms size={24} /> Send SMS
                                </button>
                                <button onClick={() => handleSend('Email')} disabled={sending} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', background: '#fff', border: '2px solid #f43f5e', color: '#f43f5e', padding: '16px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => {e.currentTarget.style.background='#f43f5e'; e.currentTarget.style.color='#fff'}} onMouseLeave={e => {e.currentTarget.style.background='#fff'; e.currentTarget.style.color='#f43f5e'}}>
                                    <FaEnvelope size={24} /> Send Email
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Audit Status Table */}
            <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: '800', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
                    Communication History
                </h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc' }}>
                                <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '13px', fontWeight: '800' }}>DATE & TIME</th>
                                <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '13px', fontWeight: '800' }}>PARENT NAME</th>
                                <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '13px', fontWeight: '800' }}>STUDENT NAME</th>
                                <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '13px', fontWeight: '800' }}>CONTACT DETAILS</th>
                                <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '13px', fontWeight: '800' }}>CHANNEL</th>
                                <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '13px', fontWeight: '800' }}>STATUS</th>
                                <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '13px', fontWeight: '800' }}>ERROR LOG</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.length === 0 ? (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', fontSize: '14px', fontWeight: '600' }}>No communications logged in database yet.</td>
                                </tr>
                            ) : (
                                logs.map(log => (
                                    <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>{log.date}</td>
                                        <td style={{ padding: '16px', fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>{log.parent_name}</td>
                                        <td style={{ padding: '16px', fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>
                                            {log.student_name} <br/><span style={{ fontSize: '11px', color: '#94a3b8' }}>{log.register_no}</span>
                                        </td>
                                        <td style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>{log.recipient}</td>
                                        <td style={{ padding: '16px' }}>
                                            <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '800', background: log.communication_type === 'WhatsApp' ? '#ecfdf5' : log.communication_type === 'SMS' ? '#eff6ff' : '#fff1f2', color: log.communication_type === 'WhatsApp' ? '#16a34a' : log.communication_type === 'SMS' ? '#2563eb' : '#e11d48' }}>
                                                {log.communication_type}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px' }}>{getStatusBadge(log.status)}</td>
                                        <td style={{ padding: '16px', fontSize: '12px', color: '#ef4444', fontWeight: '600', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {log.error_message || '-'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
"""

with open('src/pages/hod/HODParentCommunication.jsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Overwrote HODParentCommunication.jsx successfully!")
