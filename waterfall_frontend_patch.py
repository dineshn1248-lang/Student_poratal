import os

new_content = """import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaSms, FaEnvelope, FaCheckCircle, FaSpinner, FaExclamationTriangle, FaUsers, FaPaperPlane, FaTimesCircle, FaBroadcastTower, FaRedoAlt, FaStethoscope, FaCode, FaAt, FaInfoCircle, FaChartPie, FaSearch, FaFacebook, FaArrowRight } from 'react-icons/fa';
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
    const [checkingSid, setCheckingSid] = useState(false);

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

    const handleSendWaterfall = async () => {
        if (!selectedStudentId) return;
        setSending(true);
        setSendSuccess('');
        setSendError('');
        
        try {
            const token = localStorage.getItem('token');
            const resp = await fetch('http://localhost:5000/api/hod/parent-communication/send', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ student_id: selectedStudentId })
            });
            const result = await resp.json();
            if (resp.ok) {
                setSendSuccess(`Delivery Complete! Journey: ${result.journey.join(' ➔ ')}`);
                setTimeout(() => setSendSuccess(''), 8000);
            } else {
                setSendError(`Delivery Failed: ${result.error}`);
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

    const handleSendBulkWaterfall = async () => {
        if (!window.confirm('Are you sure you want to run the Smart Waterfall delivery for ALL parents? This will attempt WhatsApp first, then fallback to Email, then SMS automatically.')) return;
        setSending(true);
        setSendSuccess('');
        setSendError('');
        
        try {
            const token = localStorage.getItem('token');
            const resp = await fetch('http://localhost:5000/api/hod/parent-communication/send-bulk', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
            });
            const result = await resp.json();
            if (resp.ok) {
                setSendSuccess(`Bulk Waterfall Dispatch Complete! Successfully Reached: ${result.sent} Parents | Failed: ${result.failed}`);
                setTimeout(() => setSendSuccess(''), 10000);
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
            let endpoint = '';
            if (type === 'WhatsApp') endpoint = 'test-whatsapp'; // Twilio
            else if (type === 'Meta WhatsApp') endpoint = 'meta/test';
            else if (type === 'Email') endpoint = 'test-email';
            
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

    const checkSidStatus = async (sid) => {
        setCheckingSid(true);
        try {
            const token = localStorage.getItem('token');
            const resp = await fetch(`http://localhost:5000/api/hod/parent-communication/check-sid/${sid}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = await resp.json();
            if (resp.ok) {
                setDiagnosticResult(prev => ({
                    ...prev,
                    result: {
                        ...prev.result,
                        raw_response: {
                            ...prev.result.raw_response,
                            status: result.status,
                            error_code: result.error_code,
                            error_message: result.error_message,
                            date_updated: result.date_updated
                        }
                    }
                }));
            }
        } catch (e) {
            console.error("Failed to check SID", e);
        } finally {
            setCheckingSid(false);
        }
    };

    const getStatusBadge = (status) => {
        if (!status) return null;
        const s = status.toLowerCase();
        if (s === 'delivered') return <span style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'4px 10px', borderRadius:'6px', fontSize: '11px', fontWeight:'800', background: '#ecfdf5', color: '#065f46', border: '1px solid #6ee7b7' }}><FaCheckCircle size={10}/> Delivered</span>;
        if (s === 'read') return <span style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'4px 10px', borderRadius:'6px', fontSize: '11px', fontWeight:'800', background: '#e0e7ff', color: '#3730a3', border: '1px solid #a5b4fc' }}><FaCheckCircle size={10}/> Read</span>;
        if (s === 'sent') return <span style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'4px 10px', borderRadius:'6px', fontSize: '11px', fontWeight:'800', background: '#eff6ff', color: '#1e3a8a', border: '1px solid #93c5fd' }}><FaPaperPlane size={10}/> Sent</span>;
        if (s === 'queued') return <span style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'4px 10px', borderRadius:'6px', fontSize: '11px', fontWeight:'800', background: '#fef3c7', color: '#92400e', border: '1px solid #fcd34d' }}><FaSpinner className="fa-spin" size={10}/> Queued</span>;
        if (s === 'fallback triggered') return <span style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'4px 10px', borderRadius:'6px', fontSize: '11px', fontWeight:'800', background: '#fef3c7', color: '#b45309', border: '1px solid #fcd34d' }}><FaArrowRight size={10}/> Fallback</span>;
        if (s === 'undelivered' || s === 'failed') return <span style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'4px 10px', borderRadius:'6px', fontSize: '11px', fontWeight:'800', background: '#fef2f2', color: '#991b1b', border: '1px solid #fca5a5' }}><FaExclamationTriangle size={10}/> {s.charAt(0).toUpperCase() + s.slice(1)}</span>;
        return <span style={{ padding:'4px 10px', borderRadius:'6px', fontSize: '11px', fontWeight:'800', background: '#f1f5f9', color: '#475569' }}>{status}</span>;
    };

    const waDelivered = logs.filter(l => (l.communication_type === 'WhatsApp' || l.provider === 'Meta' || l.provider === 'Twilio') && (l.status === 'Sent' || l.status === 'Delivered' || l.status === 'Read')).length;
    const waFailed = logs.filter(l => (l.communication_type === 'WhatsApp' || l.provider === 'Meta' || l.provider === 'Twilio') && (l.status === 'Failed' || l.status === 'Fallback Triggered')).length;
    const emailDelivered = logs.filter(l => (l.communication_type === 'Email' || l.provider === 'SMTP') && (l.status === 'Sent' || l.status === 'Delivered')).length;
    const smsDelivered = logs.filter(l => l.communication_type === 'SMS' && (l.status === 'Sent' || l.status === 'Delivered')).length;

    // A "Success" is defined by any message that reached Sent/Delivered/Read
    const uniqueAttempts = new Set(logs.map(l => `${l.student_id}-${l.date.substring(0,16)}`)).size; // roughly grouping by attempt session
    const successCount = logs.filter(l => l.status === 'Sent' || l.status === 'Delivered' || l.status === 'Read').length;
    const successRate = uniqueAttempts > 0 ? Math.round((successCount / uniqueAttempts) * 100) : 0;

    return (
        <div className="hod-page-content">
            {/* Demo Mode Banner */}
            <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '16px 24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ color: '#38bdf8', fontSize: '24px' }}><FaInfoCircle /></div>
                <div style={{ flex: 1 }}>
                    <h3 style={{ color: '#f8fafc', margin: '0 0 4px', fontSize: '16px', fontWeight: '800', letterSpacing: '0.5px' }}>SYSTEM DEMONSTRATION MODE: WATERFALL ACTIVE</h3>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '13px' }}>Communication logic prioritizes WhatsApp first. If WhatsApp fails, it automatically falls back to Email, then SMS.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', padding: '6px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaWhatsapp style={{ color: '#22c55e' }} /><span style={{ color: '#f1f5f9', fontSize: '12px', fontWeight: '700' }}>WhatsApp: <span style={{ color: '#22c55e' }}>Primary</span></span>
                    </div>
                    <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', padding: '6px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaEnvelope style={{ color: '#f43f5e' }} /><span style={{ color: '#f1f5f9', fontSize: '12px', fontWeight: '700' }}>Email: <span style={{ color: '#f43f5e' }}>Fallback</span></span>
                    </div>
                    <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', padding: '6px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaSms style={{ color: '#3b82f6' }} /><span style={{ color: '#f1f5f9', fontSize: '12px', fontWeight: '700' }}>SMS: <span style={{ color: '#3b82f6' }}>Fallback</span></span>
                    </div>
                </div>
            </div>

            <div className="page-header" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px' }}>Parent Communication Dashboard</h1>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '15px' }}>Reliable end-to-end parent notifications via Meta API, Twilio, and SMTP.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={handleRefreshStatus} disabled={isRefreshing} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: '#f8fafc', color: '#475569', border: '1px solid #cbd5e1', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                        <FaRedoAlt className={isRefreshing ? "fa-spin" : ""} /> {isRefreshing ? "Polling APIs..." : "Refresh Delivery Status"}
                    </button>
                </div>
            </div>

            {sendSuccess && <div style={{ padding: '16px 20px', background: '#ecfdf5', color: '#065f46', borderRadius: '12px', borderLeft: '5px solid #10b981', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 'bold' }}><FaCheckCircle size={18} /> {sendSuccess}</div>}
            {sendError && <div style={{ padding: '16px 20px', background: '#fef2f2', color: '#991b1b', borderRadius: '12px', borderLeft: '5px solid #ef4444', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 'bold' }}><FaExclamationTriangle size={18} /> {sendError}</div>}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '32px' }}>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '2px solid #bbf7d0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}><FaWhatsapp /></div>
                    <div><div style={{ fontSize: '12px', fontWeight: '800', color: '#16a34a', textTransform: 'uppercase' }}>WA Delivered</div><div style={{ fontSize: '28px', fontWeight: '900', color: '#1e293b' }}>{waDelivered}</div></div>
                </div>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #fecdd3', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ffe4e6', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}><FaExclamationTriangle /></div>
                    <div><div style={{ fontSize: '12px', fontWeight: '800', color: '#e11d48', textTransform: 'uppercase' }}>WA Failed (Fallback)</div><div style={{ fontSize: '28px', fontWeight: '900', color: '#1e293b' }}>{waFailed}</div></div>
                </div>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fef9c3', color: '#ca8a04', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}><FaEnvelope /></div>
                    <div><div style={{ fontSize: '12px', fontWeight: '800', color: '#ca8a04', textTransform: 'uppercase' }}>Email Delivered</div><div style={{ fontSize: '28px', fontWeight: '900', color: '#1e293b' }}>{emailDelivered}</div></div>
                </div>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}><FaSms /></div>
                    <div><div style={{ fontSize: '12px', fontWeight: '800', color: '#2563eb', textTransform: 'uppercase' }}>SMS Delivered</div><div style={{ fontSize: '28px', fontWeight: '900', color: '#1e293b' }}>{smsDelivered}</div></div>
                </div>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f3e8ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}><FaChartPie /></div>
                    <div><div style={{ fontSize: '12px', fontWeight: '800', color: '#9333ea', textTransform: 'uppercase' }}>Success Rate</div><div style={{ fontSize: '28px', fontWeight: '900', color: successRate >= 50 ? '#16a34a' : '#e11d48' }}>{Math.min(successRate, 100)}%</div></div>
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

                    <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '2px dashed #cbd5e1' }}>
                        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}><FaBroadcastTower style={{ color: '#6366f1' }}/> Mass Smart Dispatch</h3>
                        <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#64748b' }}>Instantly dispatch updates to ALL parents using the intelligent waterfall routing algorithm (WA ➔ Email ➔ SMS).</p>
                        <button onClick={handleSendBulkWaterfall} disabled={sending} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#0f172a', color: 'white', padding: '14px', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 6px rgba(15,23,42,0.2)' }}>
                            <FaArrowRight size={14} /> Execute Bulk Waterfall
                        </button>
                    </div>
                </div>

                <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: '800', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Single Messaging Panel</span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => runDiagnostic('Email')} disabled={sending} style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fcd34d', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><FaAt/> Test Email</button>
                            <button onClick={() => runDiagnostic('WhatsApp')} disabled={sending} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><FaStethoscope/> Test Twilio</button>
                            <button onClick={() => runDiagnostic('Meta WhatsApp')} disabled={sending} style={{ background: '#0ea5e9', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><FaFacebook/> Test Meta</button>
                        </div>
                    </h3>
                    
                    {diagnosticResult && diagnosticResult.type === 'WhatsApp' && (
                        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
                            <h4 style={{ margin: '0 0 16px', color: '#0f172a', fontSize: '15px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}><FaWhatsapp style={{ color: '#22c55e' }}/> Twilio Sandbox Verification</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                                <div style={{ background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                                    <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '800' }}>SANDBOX NUMBER</div>
                                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>+14155238886</div>
                                </div>
                                <div style={{ background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                                    <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '800' }}>REQUIRED JOIN CODE</div>
                                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#ca8a04' }}>join xxxxxxxx</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#1e293b', padding: '16px', borderRadius: '8px' }}>
                                <div>
                                    <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>FINAL TWILIO STATUS</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        {getStatusBadge(diagnosticResult.result?.raw_response?.status)}
                                    </div>
                                </div>
                                {diagnosticResult.result?.raw_response?.sid && (
                                    <button onClick={() => checkSidStatus(diagnosticResult.result.raw_response.sid)} disabled={checkingSid} style={{ background: '#38bdf8', color: '#0f172a', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}><FaSearch className={checkingSid ? "fa-spin" : ""} /> Check Status</button>
                                )}
                            </div>
                        </div>
                    )}

                    {diagnosticResult && diagnosticResult.type === 'Meta WhatsApp' && (
                        <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
                            <h4 style={{ margin: '0 0 16px', color: '#0f172a', fontSize: '15px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}><FaFacebook style={{ color: '#0ea5e9' }}/> Meta Cloud API Diagnostics</h4>
                            <div style={{ background: '#1e293b', padding: '16px', borderRadius: '12px', overflowX: 'auto', border: '1px solid #334155' }}>
                                <div style={{ color: '#38bdf8', fontSize: '12px', fontWeight: '800', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><FaCode/> RAW META GRAPH RESPONSE</div>
                                <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '12px', whiteSpace: 'pre-wrap' }}>{JSON.stringify(diagnosticResult.result, null, 2)}</pre>
                            </div>
                        </div>
                    )}
                    
                    {!report ? (
                        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', padding: '40px 0', gap: '12px' }}><FaPaperPlane size={40} style={{ color: '#cbd5e1' }} /><span style={{ fontWeight: '700', fontSize: '15px' }}>Select a student to dispatch message</span></div>
                    ) : (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ background: '#ecfdf5', border: '2px solid #10b981', borderRadius: '16px', padding: '30px', textAlign: 'center' }}>
                                <FaWhatsapp size={48} style={{ color: '#10b981', marginBottom: '16px' }} />
                                <h2 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: '800', color: '#064e3b' }}>Smart Dispatch Engine</h2>
                                <p style={{ margin: '0 0 24px', fontSize: '14px', color: '#047857', lineHeight: '1.5' }}>This will attempt to reach the parent via <strong>WhatsApp (Meta ➔ Twilio)</strong>. If WhatsApp is unavailable, the system will automatically reroute the message via <strong>Email</strong>, followed by <strong>SMS</strong>.</p>
                                
                                <button 
                                    onClick={handleSendWaterfall} 
                                    disabled={sending} 
                                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: '#10b981', color: 'white', padding: '18px', border: 'none', borderRadius: '12px', fontWeight: '900', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(16,185,129,0.3)', transition: 'all 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    {sending ? <FaSpinner className="fa-spin" size={20} /> : <FaPaperPlane size={20} />} 
                                    {sending ? "Routing Message..." : "Launch Smart Dispatch"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Diagnostic Logs Table */}
            <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: '800', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>Communication Delivery Journey (Logs)</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc' }}>
                                <th style={{ padding: '12px', color: '#64748b', fontSize: '12px', fontWeight: '800' }}>DATE & TIME</th>
                                <th style={{ padding: '12px', color: '#64748b', fontSize: '12px', fontWeight: '800' }}>PARENT / STUDENT</th>
                                <th style={{ padding: '12px', color: '#64748b', fontSize: '12px', fontWeight: '800' }}>CONTACT / SID</th>
                                <th style={{ padding: '12px', color: '#64748b', fontSize: '12px', fontWeight: '800' }}>CHANNEL / PROVIDER</th>
                                <th style={{ padding: '12px', color: '#64748b', fontSize: '12px', fontWeight: '800' }}>DELIVERY STATUS</th>
                                <th style={{ padding: '12px', color: '#64748b', fontSize: '12px', fontWeight: '800' }}>FAILURE REASON</th>
                                <th style={{ padding: '12px', color: '#64748b', fontSize: '12px', fontWeight: '800' }}>JSON</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.length === 0 ? (
                                <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', fontSize: '14px', fontWeight: '600' }}>No communications logged in database yet.</td></tr>
                            ) : (
                                logs.map(log => (
                                    <React.Fragment key={log.id}>
                                        <tr style={{ borderBottom: expandedLogId === log.id ? 'none' : '1px solid #f1f5f9' }}>
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
                                                <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '800', background: log.provider === 'Meta' ? '#e0f2fe' : log.provider === 'Twilio' ? '#ecfdf5' : '#fff1f2', color: log.provider === 'Meta' ? '#0284c7' : log.provider === 'Twilio' ? '#16a34a' : '#e11d48', display: 'flex', alignItems: 'center', width: 'fit-content', gap: '6px' }}>
                                                    {log.communication_type === 'WhatsApp' ? <FaWhatsapp/> : log.communication_type === 'Email' ? <FaEnvelope/> : <FaSms/>}
                                                    {log.provider}
                                                </span>
                                            </td>
                                            <td style={{ padding: '16px 12px' }}>{getStatusBadge(log.status)}</td>
                                            <td style={{ padding: '16px 12px', fontSize: '12px', color: '#ef4444', fontWeight: '600', maxWidth: '150px' }}>{log.error_message || '-'}</td>
                                            <td style={{ padding: '16px 12px' }}>
                                                <button onClick={() => setExpandedLogId(expandedLogId === log.id ? null : log.id)} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#475569', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>View</button>
                                            </td>
                                        </tr>
                                        {expandedLogId === log.id && (
                                            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                                <td colSpan="7" style={{ padding: '16px' }}>
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

print("Overwrote HODParentCommunication.jsx for Waterfall logic successfully!")
