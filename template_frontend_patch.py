import os

new_content = """import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaSms, FaEnvelope, FaCheckCircle, FaSpinner, FaExclamationTriangle, FaUsers, FaPaperPlane, FaTimesCircle, FaBroadcastTower, FaRedoAlt, FaStethoscope, FaCode, FaAt, FaInfoCircle, FaChartPie, FaSearch, FaFacebook, FaArrowRight, FaEye, FaEdit } from 'react-icons/fa';
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

    // Preview State
    const [previewData, setPreviewData] = useState(null);
    const [customRemark, setCustomRemark] = useState('');
    const [showPreview, setShowPreview] = useState(false);

    // Bulk State
    const [bulkFilterType, setBulkFilterType] = useState('all');
    const [bulkFilterValue, setBulkFilterValue] = useState('');

    useEffect(() => {
        fetchStudents();
        fetchLogs();
    }, []);

    useEffect(() => {
        if (selectedStudentId) {
            fetchReport(selectedStudentId);
            fetchPreview(selectedStudentId);
        } else {
            setReport(null);
            setPreviewData(null);
            setShowPreview(false);
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

    const fetchPreview = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const resp = await fetch(`http://localhost:5000/api/hod/parent-communication/preview/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await resp.json();
            if (resp.ok) {
                setPreviewData(data);
                setCustomRemark(data.smart_remark);
            }
        } catch (e) {
            console.error("Preview fetch failed", e);
        }
    };

    const handleSendWaterfall = async () => {
        if (!selectedStudentId) return;
        setSending(true);
        setSendSuccess('');
        setSendError('');
        setShowPreview(false);
        
        try {
            const token = localStorage.getItem('token');
            const resp = await fetch('http://localhost:5000/api/hod/parent-communication/send', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ student_id: selectedStudentId, custom_remark: customRemark })
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
        if (!window.confirm(`Are you sure you want to run the Smart Waterfall delivery for filter: ${bulkFilterType} (${bulkFilterValue || 'ALL'})? This will attempt WhatsApp first, then fallback to Email, then SMS automatically.`)) return;
        setSending(true);
        setSendSuccess('');
        setSendError('');
        
        try {
            const token = localStorage.getItem('token');
            const resp = await fetch('http://localhost:5000/api/hod/parent-communication/send-bulk', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ filter_type: bulkFilterType, filter_value: bulkFilterValue })
            });
            const result = await resp.json();
            if (resp.ok) {
                setSendSuccess(`Bulk Dispatch Complete! Successfully Reached: ${result.sent} Parents | Failed: ${result.failed}`);
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

    const uniqueAttempts = new Set(logs.map(l => `${l.student_id}-${l.date.substring(0,16)}`)).size;
    const successCount = logs.filter(l => l.status === 'Sent' || l.status === 'Delivered' || l.status === 'Read').length;
    const successRate = uniqueAttempts > 0 ? Math.round((successCount / uniqueAttempts) * 100) : 0;

    return (
        <div className="hod-page-content">
            {/* Demo Mode Banner */}
            <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '16px 24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ color: '#38bdf8', fontSize: '24px' }}><FaInfoCircle /></div>
                <div style={{ flex: 1 }}>
                    <h3 style={{ color: '#f8fafc', margin: '0 0 4px', fontSize: '16px', fontWeight: '800', letterSpacing: '0.5px' }}>SYSTEM DEMONSTRATION MODE: CUSTOM TEMPLATES & WATERFALL</h3>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '13px' }}>The Meta WhatsApp Cloud API is configured to use the custom <code style={{color: '#38bdf8'}}>uucms_parent_academic_update</code> template dynamically mapped to the student DB.</p>
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
                        <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#64748b' }}>Instantly dispatch updates to filtered parents using the intelligent waterfall routing algorithm.</p>
                        
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                            <select value={bulkFilterType} onChange={e => {setBulkFilterType(e.target.value); setBulkFilterValue('');}} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', background: '#fff', fontSize: '13px', fontWeight: '600' }}>
                                <option value="all">All Parents</option>
                                <option value="semester">By Semester</option>
                                <option value="department">By Department</option>
                            </select>
                            
                            {bulkFilterType === 'semester' && (
                                <select value={bulkFilterValue} onChange={e => setBulkFilterValue(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', background: '#fff', fontSize: '13px', fontWeight: '600' }}>
                                    <option value="">Select Sem...</option>
                                    {[1,2,3,4,5,6].map(s => <option key={s} value={s}>Semester {s}</option>)}
                                </select>
                            )}
                            {bulkFilterType === 'department' && (
                                <select value={bulkFilterValue} onChange={e => setBulkFilterValue(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', background: '#fff', fontSize: '13px', fontWeight: '600' }}>
                                    <option value="">Select Dept...</option>
                                    <option value="Computer Applications">BCA</option>
                                    <option value="Computer Science">BSc CS</option>
                                </select>
                            )}
                        </div>

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
                            <button onClick={() => runDiagnostic('Meta WhatsApp')} disabled={sending} style={{ background: '#0ea5e9', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><FaFacebook/> Test Meta</button>
                        </div>
                    </h3>
                    
                    {!report ? (
                        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', padding: '40px 0', gap: '12px' }}><FaPaperPlane size={40} style={{ color: '#cbd5e1' }} /><span style={{ fontWeight: '700', fontSize: '15px' }}>Select a student to dispatch message</span></div>
                    ) : (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            
                            {!showPreview ? (
                                <div style={{ background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '16px', padding: '30px', textAlign: 'center' }}>
                                    <FaEye size={48} style={{ color: '#94a3b8', marginBottom: '16px' }} />
                                    <h2 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>Preview Generated Message</h2>
                                    <p style={{ margin: '0 0 24px', fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>The system has dynamically mapped {report.name}'s academic data into the <code style={{color: '#0ea5e9'}}>uucms_parent_academic_update</code> template.</p>
                                    
                                    <button 
                                        onClick={() => setShowPreview(true)} 
                                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: '#3b82f6', color: 'white', padding: '16px', border: 'none', borderRadius: '12px', fontWeight: '800', fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(59,130,246,0.3)', transition: 'all 0.2s' }}
                                    >
                                        <FaEye size={18} /> View WhatsApp Template Preview
                                    </button>
                                </div>
                            ) : (
                                <div style={{ background: '#ecfdf5', border: '2px solid #10b981', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                                    
                                    {previewData?.performance_status === 'Needs Improvement' && (
                                        <div style={{ background: '#fef2f2', color: '#b91c1c', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <FaExclamationTriangle /> Smart Alert: Critical Academic Status Detected. Custom remark generated.
                                        </div>
                                    )}

                                    <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '16px', marginBottom: '20px', whiteSpace: 'pre-wrap', fontSize: '13px', color: '#334155', fontFamily: 'monospace', lineHeight: '1.6' }}>
                                        {previewData?.preview?.replace(previewData?.smart_remark, customRemark)}
                                    </div>
                                    
                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '800', color: '#065f46', marginBottom: '8px' }}><FaEdit /> Edit Teacher Remark Before Sending:</label>
                                        <textarea 
                                            value={customRemark}
                                            onChange={(e) => setCustomRemark(e.target.value)}
                                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #10b981', outline: 'none', fontSize: '13px', fontFamily: 'inherit', minHeight: '80px', resize: 'vertical' }}
                                        />
                                    </div>
                                    
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <button 
                                            onClick={() => setShowPreview(false)} 
                                            style={{ flex: 1, background: '#fff', color: '#065f46', padding: '16px', border: '2px solid #10b981', borderRadius: '12px', fontWeight: '800', fontSize: '15px', cursor: 'pointer' }}
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            onClick={handleSendWaterfall} 
                                            disabled={sending} 
                                            style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: '#10b981', color: 'white', padding: '16px', border: 'none', borderRadius: '12px', fontWeight: '900', fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(16,185,129,0.3)', transition: 'all 0.2s' }}
                                        >
                                            {sending ? <FaSpinner className="fa-spin" size={18} /> : <FaPaperPlane size={18} />} 
                                            {sending ? "Routing Message..." : "Launch Smart Dispatch"}
                                        </button>
                                    </div>
                                </div>
                            )}

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

print("Template frontend logic applied successfully!")
