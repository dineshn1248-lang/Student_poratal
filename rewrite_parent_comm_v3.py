import os

new_content = """import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaSms, FaEnvelope, FaCheckCircle, FaSpinner, FaExclamationTriangle, FaUsers, FaPaperPlane, FaTimesCircle, FaBroadcastTower, FaRedoAlt, FaStethoscope, FaCode, FaAt } from 'react-icons/fa';
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
    
    // Diagnostic State
    const [diagnosticResult, setDiagnosticResult] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [expandedLogId, setExpandedLogId] = useState(null);

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
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ student_id: selectedStudentId, method })
            });
            const result = await resp.json();
            if (resp.ok && (result.status === 'Sent' || result.status === 'Queued')) {
                setSendSuccess(`Message ${result.status} via ${method} to ${result.recipient}!`);
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
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ method })
            });
            const result = await resp.json();
            if (resp.ok) {
                setSendSuccess(`Bulk Dispatch Complete! Sent/Queued: ${result.sent} | Failed: ${result.failed}`);
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

    const handleRefreshStatus = async () => {
        setIsRefreshing(true);
        setSendSuccess('');
        try {
            const token = localStorage.getItem('token');
            const resp = await fetch('http://localhost:5000/api/hod/parent-communication/refresh-status', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = await resp.json();
            if (resp.ok) {
                setSendSuccess(`Synced with APIs. ${result.updated} statuses updated.`);
                fetchLogs();
            } else {
                setSendError(`Refresh failed: ${result.error}`);
            }
            setTimeout(() => setSendSuccess(''), 5000);
            setTimeout(() => setSendError(''), 5000);
        } catch (e) {
            setSendError('Network error during refresh.');
        } finally {
            setIsRefreshing(false);
        }
    };

    const runDiagnostic = async (type) => {
        setSending(true);
        setDiagnosticResult(null);
        try {
            const token = localStorage.getItem('token');
            const endpoint = type === 'WhatsApp' ? 'test-whatsapp' : 'test-email';
            const body = type === 'Email' ? JSON.stringify({ recipient: report?.email || 'test@example.com' }) : undefined;
            
            const resp = await fetch(`http://localhost:5000/api/hod/parent-communication/${endpoint}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: body
            });
            const result = await resp.json();
            setDiagnosticResult({ type, result });
        } catch (e) {
            setDiagnosticResult({ type, result: { error: "Network Error" } });
        } finally {
            setSending(false);
        }
    };

    const getStatusBadge = (status) => {
        if (status === 'Delivered') {
            return <span style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'6px 12px', borderRadius:'8px', fontSize: '13px', fontWeight:'800', background: '#ecfdf5', color: '#065f46', border: '1px solid #6ee7b7' }}><FaCheckCircle size={12}/> Delivered</span>;
        }
        if (status === 'Sent') {
            return <span style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'6px 12px', borderRadius:'8px', fontSize: '13px', fontWeight:'800', background: '#eff6ff', color: '#1e3a8a', border: '1px solid #93c5fd' }}><FaPaperPlane size={12}/> Sent</span>;
        }
        if (status === 'Queued') {
            return <span style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'6px 12px', borderRadius:'8px', fontSize: '13px', fontWeight:'800', background: '#fef3c7', color: '#92400e', border: '1px solid #fcd34d' }}><FaSpinner className="fa-spin" size={12}/> Queued</span>;
        }
        return <span style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'6px 12px', borderRadius:'8px', fontSize: '13px', fontWeight:'800', background: '#fef2f2', color: '#991b1b', border: '1px solid #fca5a5' }}><FaExclamationTriangle size={12}/> Failed</span>;
    };

    const totalParents = new Set(logs.filter(l => l.parent_name && l.parent_name !== 'Unknown').map(l => l.parent_name)).size;
    const emailSent = logs.filter(l => l.communication_type === 'Email' && l.status === 'Sent').length;
    const whatsappSent = logs.filter(l => l.communication_type === 'WhatsApp' && (l.status === 'Sent' || l.status === 'Delivered')).length;
    const smsSent = logs.filter(l => l.communication_type === 'SMS' && (l.status === 'Sent' || l.status === 'Delivered')).length;
    const failedMessages = logs.filter(l => l.status === 'Failed').length;

    return (
        <div className="hod-page-content">
            <div className="page-header" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px' }}>Parent Communication Dashboard</h1>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '15px' }}>Reliable end-to-end parent notifications. Email is prioritized for guaranteed delivery.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={handleRefreshStatus} disabled={isRefreshing} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: '#f8fafc', color: '#475569', border: '1px solid #cbd5e1', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                        <FaRedoAlt className={isRefreshing ? "fa-spin" : ""} /> {isRefreshing ? "Polling APIs..." : "Refresh Delivery Status"}
                    </button>
                </div>
            </div>

            {sendSuccess && <div style={{ padding: '16px 20px', background: '#ecfdf5', color: '#065f46', borderRadius: '12px', borderLeft: '5px solid #10b981', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 'bold' }}><FaCheckCircle size={18} /> {sendSuccess}</div>}
            {sendError && <div style={{ padding: '16px 20px', background: '#fef2f2', color: '#991b1b', borderRadius: '12px', borderLeft: '5px solid #ef4444', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 'bold' }}><FaExclamationTriangle size={18} /> {sendError}</div>}

            {/* Dashboard Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '32px' }}>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f8fafc', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}><FaUsers /></div>
                    <div><div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Total Parents Comm.</div><div style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>{totalParents > 0 ? totalParents : logs.length > 0 ? new Set(logs.map(l => l.recipient)).size : 0}</div></div>
                </div>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '2px solid #fde047', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fef9c3', color: '#ca8a04', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}><FaEnvelope /></div>
                    <div><div style={{ fontSize: '12px', fontWeight: '700', color: '#ca8a04', textTransform: 'uppercase' }}>Emails Sent (Primary)</div><div style={{ fontSize: '24px', fontWeight: '900', color: '#ca8a04' }}>{emailSent}</div></div>
                </div>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}><FaWhatsapp /></div>
                    <div><div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>WhatsApp Delivered</div><div style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>{whatsappSent}</div></div>
                </div>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}><FaSms /></div>
                    <div><div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>SMS Delivered</div><div style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>{smsSent}</div></div>
                </div>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}><FaTimesCircle /></div>
                    <div><div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Failed Messages</div><div style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>{failedMessages}</div></div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>Select Student</h3>
                        <select 
                            value={selectedStudentId} 
                            onChange={(e) => setSelectedStudentId(e.target.value)}
                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none', background: '#f8fafc', fontWeight: '600', color: '#1e293b', fontSize: '14px' }}
                        >
                            <option value="">-- Choose Student --</option>
                            {students.map(s => <option key={s.id} value={s.id}>{s.register_no} - {s.full_name}</option>)}
                        </select>
                        {loading && <div style={{ marginTop: '12px', fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px' }}><FaSpinner className="fa-spin" /> Fetching academic data...</div>}
                    </div>

                    <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}><FaBroadcastTower style={{ color: '#6366f1' }}/> Mass Communication</h3>
                        <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#64748b' }}>Instantly dispatch academic updates to all registered parents in your department using third-party APIs.</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <button onClick={() => handleSendBulk('Email')} disabled={sending} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#f43f5e', color: 'white', padding: '12px', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}><FaEnvelope size={16} /> Send Email to All (Primary)</button>
                            <button onClick={() => handleSendBulk('WhatsApp')} disabled={sending} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#fff', color: '#22c55e', border: '1px solid #22c55e', padding: '12px', borderRadius: '10px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}><FaWhatsapp size={16} /> Send WhatsApp to All</button>
                            <button onClick={() => handleSendBulk('SMS')} disabled={sending} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#fff', color: '#3b82f6', border: '1px solid #3b82f6', padding: '12px', borderRadius: '10px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}><FaSms size={16} /> Send SMS to All</button>
                        </div>
                    </div>
                </div>

                <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: '800', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Single Messaging Panel</span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => runDiagnostic('Email')} disabled={sending} style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fcd34d', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><FaAt/> Test Email Delivery</button>
                            <button onClick={() => runDiagnostic('WhatsApp')} disabled={sending} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><FaStethoscope/> Test WA Connection</button>
                        </div>
                    </h3>
                    
                    {diagnosticResult && (
                        <div style={{ background: '#1e293b', padding: '16px', borderRadius: '12px', marginBottom: '20px', overflowX: 'auto', border: '1px solid #334155' }}>
                            <div style={{ color: '#38bdf8', fontSize: '12px', fontWeight: '800', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><FaCode/> RAW API RESPONSE DUMP ({diagnosticResult.type})</div>
                            <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '12px', whiteSpace: 'pre-wrap' }}>{JSON.stringify(diagnosticResult.result, null, 2)}</pre>
                            <div style={{ marginTop: '12px', fontSize: '12px', color: '#94a3b8' }}>
                                <strong>Diagnosis:</strong> End-to-end API response verification.
                            </div>
                        </div>
                    )}
                    
                    {!report ? (
                        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', padding: '40px 0', gap: '12px' }}><FaPaperPlane size={40} style={{ color: '#cbd5e1' }} /><span style={{ fontWeight: '700', fontSize: '15px' }}>Select a student to dispatch message</span></div>
                    ) : (
                        <div>
                            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '16px' }}>
                                    <div><span style={{ fontSize: '12px', color: '#64748b', fontWeight: '800' }}>STUDENT NAME</span><h4 style={{ margin: '4px 0 0', fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>{report.student_name}</h4></div>
                                    <div><span style={{ fontSize: '12px', color: '#64748b', fontWeight: '800' }}>REGISTER NO</span><h4 style={{ margin: '4px 0 0', fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>{report.register_no}</h4></div>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                                <button onClick={() => handleSend('Email')} disabled={sending} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', background: '#f43f5e', border: '2px solid #f43f5e', color: 'white', padding: '16px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 6px rgba(244,63,94,0.2)' }}><FaEnvelope size={24} /> Primary Email</button>
                                <button onClick={() => handleSend('WhatsApp')} disabled={sending} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', background: '#fff', border: '2px solid #22c55e', color: '#22c55e', padding: '16px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => {e.currentTarget.style.background='#22c55e'; e.currentTarget.style.color='#fff'}} onMouseLeave={e => {e.currentTarget.style.background='#fff'; e.currentTarget.style.color='#22c55e'}}><FaWhatsapp size={24} /> Send WhatsApp</button>
                                <button onClick={() => handleSend('SMS')} disabled={sending} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', background: '#fff', border: '2px solid #3b82f6', color: '#3b82f6', padding: '16px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => {e.currentTarget.style.background='#3b82f6'; e.currentTarget.style.color='#fff'}} onMouseLeave={e => {e.currentTarget.style.background='#fff'; e.currentTarget.style.color='#3b82f6'}}><FaSms size={24} /> Send SMS</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Diagnostic Logs Table */}
            <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: '800', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>Communication Delivery Diagnostics</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc' }}>
                                <th style={{ padding: '12px', color: '#64748b', fontSize: '12px', fontWeight: '800' }}>DATE & TIME</th>
                                <th style={{ padding: '12px', color: '#64748b', fontSize: '12px', fontWeight: '800' }}>PARENT / STUDENT</th>
                                <th style={{ padding: '12px', color: '#64748b', fontSize: '12px', fontWeight: '800' }}>CONTACT / SID</th>
                                <th style={{ padding: '12px', color: '#64748b', fontSize: '12px', fontWeight: '800' }}>CHANNEL</th>
                                <th style={{ padding: '12px', color: '#64748b', fontSize: '12px', fontWeight: '800' }}>DELIVERY STATUS</th>
                                <th style={{ padding: '12px', color: '#64748b', fontSize: '12px', fontWeight: '800' }}>FAILURE REASON</th>
                                <th style={{ padding: '12px', color: '#64748b', fontSize: '12px', fontWeight: '800' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.length === 0 ? (
                                <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', fontSize: '14px', fontWeight: '600' }}>No communications logged in database yet.</td></tr>
                            ) : (
                                logs.map(log => (
                                    <React.Fragment key={log.id}>
                                        <tr style={{ borderBottom: expandedLogId === log.id ? 'none' : '1px solid #f1f5f9', background: log.status === 'Failed' ? '#fef2f2' : 'transparent' }}>
                                            <td style={{ padding: '16px 12px', fontSize: '12px', fontWeight: '600', color: '#475569' }}>{log.date}</td>
                                            <td style={{ padding: '16px 12px' }}>
                                                <div style={{ fontSize: '13px', fontWeight: '800', color: '#1e293b' }}>{log.parent_name}</div>
                                                <div style={{ fontSize: '11px', color: '#64748b' }}>Student: {log.student_name}</div>
                                            </td>
                                            <td style={{ padding: '16px 12px' }}>
                                                <div style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>{log.recipient}</div>
                                                <div style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'monospace' }}>{log.provider_id || 'N/A'}</div>
                                            </td>
                                            <td style={{ padding: '16px 12px' }}>
                                                <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '800', background: log.communication_type === 'Email' ? '#fff1f2' : log.communication_type === 'WhatsApp' ? '#ecfdf5' : '#eff6ff', color: log.communication_type === 'Email' ? '#e11d48' : log.communication_type === 'WhatsApp' ? '#16a34a' : '#2563eb' }}>{log.communication_type}</span>
                                            </td>
                                            <td style={{ padding: '16px 12px' }}>{getStatusBadge(log.status)}</td>
                                            <td style={{ padding: '16px 12px', fontSize: '12px', color: '#ef4444', fontWeight: '600', maxWidth: '150px' }}>{log.error_message || '-'}</td>
                                            <td style={{ padding: '16px 12px', display: 'flex', gap: '8px' }}>
                                                <button onClick={() => setExpandedLogId(expandedLogId === log.id ? null : log.id)} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#475569', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>View JSON</button>
                                            </td>
                                        </tr>
                                        {expandedLogId === log.id && (
                                            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                                <td colSpan="7" style={{ padding: '16px' }}>
                                                    <div style={{ fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '8px' }}>PROVIDER RESPONSE (RAW JSON)</div>
                                                    <pre style={{ background: '#1e293b', color: '#38bdf8', padding: '12px', borderRadius: '8px', fontSize: '11px', overflowX: 'auto', margin: 0 }}>
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
                </div>
            </div>
        </div>
    );
}
"""

with open('src/pages/hod/HODParentCommunication.jsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Overwrote HODParentCommunication.jsx for Email Primary configuration successfully!")
