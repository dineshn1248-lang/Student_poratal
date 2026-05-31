import os

jsx_content = """import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaSms, FaEnvelope, FaCheckCircle, FaSpinner, FaExclamationTriangle, FaUsers, FaPaperPlane, FaTimesCircle, FaBroadcastTower, FaRedoAlt, FaStethoscope, FaCode, FaAt, FaInfoCircle, FaChartPie, FaSearch, FaFacebook, FaArrowRight, FaEye, FaEdit, FaSync } from 'react-icons/fa';
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
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [expandedLogId, setExpandedLogId] = useState(null);
    const [diagnosticResult, setDiagnosticResult] = useState(null);

    // Preview State
    const [previewData, setPreviewData] = useState(null);
    const [customRemark, setCustomRemark] = useState('');
    const [showPreview, setShowPreview] = useState(false); // Can be used to toggle view if needed, but screenshot shows it inline

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
                setShowPreview(true);
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
        if (!window.confirm(`Are you sure you want to run the Smart Waterfall delivery for filter: ${bulkFilterType} (${bulkFilterValue || 'ALL'})?`)) return;
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
                setSendSuccess(`Bulk Dispatch Complete! Sent: ${result.sent} | Failed: ${result.failed}`);
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
            if (type === 'WhatsApp') endpoint = 'test-whatsapp';
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
            alert(`Diagnostic [${type}] Complete. Check logs table.`);
            fetchLogs();
        } catch (e) {
            alert("Network Error running diagnostic");
        } finally {
            setSending(false);
        }
    };

    const getStatusBadge = (status) => {
        if (!status) return null;
        const s = status.toLowerCase();
        if (s === 'delivered' || s === 'read') return <span style={{ padding:'4px 12px', borderRadius:'12px', fontSize: '11px', fontWeight:'700', background: '#ecfdf5', color: '#059669' }}>Delivered</span>;
        if (s === 'sent') return <span style={{ padding:'4px 12px', borderRadius:'12px', fontSize: '11px', fontWeight:'700', background: '#eff6ff', color: '#2563eb' }}>Sent</span>;
        if (s === 'queued') return <span style={{ padding:'4px 12px', borderRadius:'12px', fontSize: '11px', fontWeight:'700', background: '#e0e7ff', color: '#4f46e5' }}>Queued</span>;
        if (s === 'pending') return <span style={{ padding:'4px 12px', borderRadius:'12px', fontSize: '11px', fontWeight:'700', background: '#fef3c7', color: '#d97706' }}>Pending</span>;
        if (s === 'undelivered' || s === 'failed' || s === 'fallback triggered') return <span style={{ padding:'4px 12px', borderRadius:'12px', fontSize: '11px', fontWeight:'700', background: '#fef2f2', color: '#dc2626' }}>Failed</span>;
        return <span style={{ padding:'4px 12px', borderRadius:'12px', fontSize: '11px', fontWeight:'700', background: '#f1f5f9', color: '#475569' }}>{status}</span>;
    };

    const waDelivered = logs.filter(l => (l.communication_type === 'WhatsApp' || l.provider === 'Meta' || l.provider === 'Twilio') && (l.status === 'Sent' || l.status === 'Delivered' || l.status === 'Read')).length;
    const waFailed = logs.filter(l => (l.communication_type === 'WhatsApp' || l.provider === 'Meta' || l.provider === 'Twilio') && (l.status === 'Failed' || l.status === 'Fallback Triggered')).length;
    const emailDelivered = logs.filter(l => (l.communication_type === 'Email' || l.provider === 'SMTP') && (l.status === 'Sent' || l.status === 'Delivered')).length;
    const smsDelivered = logs.filter(l => l.communication_type === 'SMS' && (l.status === 'Sent' || l.status === 'Delivered')).length;

    const uniqueAttempts = new Set(logs.map(l => `${l.student_id}-${l.date.substring(0,16)}`)).size;
    const successCount = logs.filter(l => l.status === 'Sent' || l.status === 'Delivered' || l.status === 'Read').length;
    const successRate = uniqueAttempts > 0 ? Math.round((successCount / uniqueAttempts) * 100) : 0;

    return (
        <div style={{ padding: '24px', background: '#fafbfc', minHeight: '100vh', fontFamily: '"Inter", sans-serif' }}>
            
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#111827', margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>Parent Communication Dashboard</h1>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: '14px', fontWeight: '500' }}>Reliable end-to-end parent notifications via Meta API, Twilio, and SMTP.</p>
                </div>
                <button onClick={handleRefreshStatus} disabled={isRefreshing} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: '#ffffff', color: '#374151', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                    <FaSync className={isRefreshing ? "fa-spin" : ""} style={{ color: '#6b7280' }}/> {isRefreshing ? "Refreshing..." : "Refresh Delivery Status"}
                </button>
            </div>

            {/* Error/Success Banners */}
            {sendSuccess && <div style={{ padding: '12px 16px', background: '#ecfdf5', color: '#065f46', borderRadius: '8px', borderLeft: '4px solid #10b981', marginBottom: '20px', fontSize: '14px', fontWeight: '600' }}>{sendSuccess}</div>}
            {sendError && <div style={{ padding: '12px 16px', background: '#fef2f2', color: '#991b1b', borderRadius: '8px', borderLeft: '4px solid #ef4444', marginBottom: '20px', fontSize: '14px', fontWeight: '600' }}>{sendError}</div>}

            {/* Top Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '32px' }}>
                {/* WA Delivered */}
                <div style={{ background: '#ffffff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #dcfce7', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}><FaWhatsapp /></div>
                    <div>
                        <div style={{ fontSize: '11px', fontWeight: '800', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>WHATSAPP DELIVERED</div>
                        <div style={{ fontSize: '28px', fontWeight: '800', color: '#111827', marginTop: '4px' }}>{waDelivered}</div>
                    </div>
                </div>

                {/* WA Failed */}
                <div style={{ background: '#ffffff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #fee2e2', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}><FaExclamationTriangle /></div>
                    <div>
                        <div style={{ fontSize: '11px', fontWeight: '800', color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: '1.2' }}>WHATSAPP FAILED<br/>(FALLBACK TRIGGERED)</div>
                        <div style={{ fontSize: '28px', fontWeight: '800', color: '#111827', marginTop: '4px' }}>{waFailed}</div>
                    </div>
                </div>

                {/* Email Delivered */}
                <div style={{ background: '#ffffff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #fef3c7', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}><FaEnvelope /></div>
                    <div>
                        <div style={{ fontSize: '11px', fontWeight: '800', color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.5px' }}>EMAIL DELIVERED</div>
                        <div style={{ fontSize: '28px', fontWeight: '800', color: '#111827', marginTop: '4px' }}>{emailDelivered}</div>
                    </div>
                </div>

                {/* SMS Delivered */}
                <div style={{ background: '#ffffff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e0e7ff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}><FaSms /></div>
                    <div>
                        <div style={{ fontSize: '11px', fontWeight: '800', color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '0.5px' }}>SMS DELIVERED</div>
                        <div style={{ fontSize: '28px', fontWeight: '800', color: '#111827', marginTop: '4px' }}>{smsDelivered}</div>
                    </div>
                </div>

                {/* Success Rate */}
                <div style={{ background: '#ffffff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #f3e8ff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f3e8ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}><FaChartPie /></div>
                    <div>
                        <div style={{ fontSize: '11px', fontWeight: '800', color: '#9333ea', textTransform: 'uppercase', letterSpacing: '0.5px' }}>SUCCESS RATE</div>
                        <div style={{ fontSize: '28px', fontWeight: '800', color: '#dc2626', marginTop: '4px' }}>{Math.min(successRate, 100)}%</div>
                    </div>
                </div>
            </div>

            {/* Middle Section (Grid) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', marginBottom: '32px' }}>
                
                {/* Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* Select Student */}
                    <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '700', color: '#111827' }}>Select Student</h3>
                        <select 
                            value={selectedStudentId} 
                            onChange={(e) => setSelectedStudentId(e.target.value)}
                            style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', background: '#f9fafb', fontWeight: '500', color: '#111827', fontSize: '14px', appearance: 'none' }}
                        >
                            <option value="">Select...</option>
                            {students.map(s => <option key={s.id} value={s.id}>{s.register_no} - {s.full_name}</option>)}
                        </select>
                        {loading && <div style={{ marginTop: '12px', fontSize: '12px', color: '#6b7280' }}><FaSpinner className="fa-spin" /> Fetching...</div>}
                    </div>

                    {/* Mass Smart Dispatch */}
                    <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px dashed #cbd5e1', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                        <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: '700', color: '#111827', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FaBroadcastTower style={{ color: '#4f46e5', fontSize: '18px' }}/> Mass Smart Dispatch
                        </h3>
                        <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#6b7280', lineHeight: '1.5' }}>Instantly dispatch updates to filtered parents using the intelligent waterfall routing algorithm.</p>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
                            <select 
                                value={bulkFilterType} 
                                onChange={e => {setBulkFilterType(e.target.value); setBulkFilterValue('');}} 
                                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', background: '#f9fafb', fontSize: '14px', fontWeight: '500', appearance: 'none' }}
                            >
                                <option value="all">All Parents</option>
                                <option value="semester">By Semester</option>
                                <option value="department">By Department</option>
                            </select>
                            
                            {bulkFilterType === 'semester' && (
                                <select value={bulkFilterValue} onChange={e => setBulkFilterValue(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', background: '#f9fafb', fontSize: '14px', fontWeight: '500', appearance: 'none' }}>
                                    <option value="">Select Sem...</option>
                                    {[1,2,3,4,5,6].map(s => <option key={s} value={s}>Semester {s}</option>)}
                                </select>
                            )}
                            {bulkFilterType === 'department' && (
                                <select value={bulkFilterValue} onChange={e => setBulkFilterValue(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', background: '#f9fafb', fontSize: '14px', fontWeight: '500', appearance: 'none' }}>
                                    <option value="">Select Dept...</option>
                                    <option value="Computer Applications">BCA</option>
                                    <option value="Computer Science">BSc CS</option>
                                </select>
                            )}
                        </div>

                        <button onClick={handleSendBulkWaterfall} disabled={sending} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#0f172a', color: 'white', padding: '14px', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 6px rgba(15,23,42,0.2)' }}>
                            Execute Bulk Waterfall <FaArrowRight size={12} />
                        </button>
                    </div>
                </div>

                {/* Right Column */}
                <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#111827' }}>Single Messaging Panel</h3>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => runDiagnostic('Email')} disabled={sending} style={{ background: '#fef3c7', color: '#b45309', border: '1px solid #fde68a', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><FaAt size={10}/> Test Email</button>
                            <button onClick={() => runDiagnostic('Meta WhatsApp')} disabled={sending} style={{ background: '#0ea5e9', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><FaFacebook size={12}/> Test Meta</button>
                        </div>
                    </div>
                    
                    {!report ? (
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: '14px' }}>
                            Select a student to view the template preview.
                        </div>
                    ) : (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            
                            {/* The Message Box */}
                            <div style={{ background: '#f8fff9', border: '2px solid #22c55e', borderRadius: '12px', padding: '24px', position: 'relative', flex: 1, marginBottom: '16px' }}>
                                
                                {previewData?.performance_status === 'Needs Improvement' && (
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, background: '#fef2f2', color: '#b91c1c', padding: '8px 16px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', borderBottom: '1px solid #fca5a5' }}>
                                        <FaExclamationTriangle /> Smart Alert: Custom remark generated for low performance.
                                    </div>
                                )}

                                <div style={{ whiteSpace: 'pre-wrap', fontSize: '13px', color: '#374151', fontFamily: '"Fira Code", monospace', lineHeight: '1.6', marginTop: previewData?.performance_status === 'Needs Improvement' ? '28px' : '0' }}>
                                    {previewData?.preview?.replace(previewData?.smart_remark, customRemark)}
                                </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr', gap: '12px' }}>
                                <button 
                                    onClick={() => {}} 
                                    style={{ background: '#ffffff', color: '#374151', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                >
                                    <FaEye size={14} /> Preview Message
                                </button>
                                <button 
                                    onClick={() => {
                                        const r = window.prompt("Edit Teacher Remark:", customRemark);
                                        if (r !== null) setCustomRemark(r);
                                    }} 
                                    style={{ background: '#ffffff', color: '#374151', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                >
                                    <FaEdit size={14} /> Edit Remark
                                </button>
                                <button 
                                    onClick={handleSendWaterfall} 
                                    disabled={sending} 
                                    style={{ background: '#16a34a', color: 'white', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 6px rgba(22,163,74,0.2)' }}
                                >
                                    {sending ? <FaSpinner className="fa-spin" size={16} /> : <FaWhatsapp size={16} />} 
                                    {sending ? "Sending..." : "Send WhatsApp"}
                                </button>
                            </div>

                        </div>
                    )}
                </div>
            </div>

            {/* Logs Table */}
            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: '#111827' }}>Recent Communication Logs</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <th style={{ padding: '16px 12px', color: '#6b7280', fontSize: '12px', fontWeight: '700' }}>Sl. No.</th>
                                <th style={{ padding: '16px 12px', color: '#6b7280', fontSize: '12px', fontWeight: '700' }}>Student Name</th>
                                <th style={{ padding: '16px 12px', color: '#6b7280', fontSize: '12px', fontWeight: '700' }}>Parent Name</th>
                                <th style={{ padding: '16px 12px', color: '#6b7280', fontSize: '12px', fontWeight: '700' }}>Channel Used</th>
                                <th style={{ padding: '16px 12px', color: '#6b7280', fontSize: '12px', fontWeight: '700' }}>Message Type</th>
                                <th style={{ padding: '16px 12px', color: '#6b7280', fontSize: '12px', fontWeight: '700' }}>Status</th>
                                <th style={{ padding: '16px 12px', color: '#6b7280', fontSize: '12px', fontWeight: '700' }}>Time</th>
                                <th style={{ padding: '16px 12px', color: '#6b7280', fontSize: '12px', fontWeight: '700' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.length === 0 ? (
                                <tr><td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#9ca3af', fontSize: '14px' }}>No logs found.</td></tr>
                            ) : (
                                logs.slice(0,10).map((log, i) => (
                                    <React.Fragment key={log.id}>
                                        <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                                            <td style={{ padding: '16px 12px', fontSize: '13px', color: '#374151', fontWeight: '500' }}>{i + 1}</td>
                                            <td style={{ padding: '16px 12px', fontSize: '13px', color: '#111827', fontWeight: '500' }}>{log.student_name}</td>
                                            <td style={{ padding: '16px 12px', fontSize: '13px', color: '#374151', fontWeight: '500' }}>{log.parent_name}</td>
                                            <td style={{ padding: '16px 12px', fontSize: '13px', color: '#374151', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                {log.communication_type === 'WhatsApp' ? <FaWhatsapp style={{color:'#16a34a'}}/> : log.communication_type === 'Email' ? <FaEnvelope style={{color:'#d97706'}}/> : <FaSms style={{color:'#2563eb'}}/>}
                                                {log.communication_type} ({log.provider})
                                            </td>
                                            <td style={{ padding: '16px 12px', fontSize: '13px', color: '#374151' }}>Academic Update</td>
                                            <td style={{ padding: '16px 12px' }}>{getStatusBadge(log.status)}</td>
                                            <td style={{ padding: '16px 12px', fontSize: '13px', color: '#374151' }}>{log.date}</td>
                                            <td style={{ padding: '16px 12px' }}>
                                                <button onClick={() => setExpandedLogId(expandedLogId === log.id ? null : log.id)} style={{ background: 'transparent', border: 'none', color: '#2563eb', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><FaEye/> View</button>
                                            </td>
                                        </tr>
                                        {expandedLogId === log.id && (
                                            <tr style={{ background: '#f9fafb' }}>
                                                <td colSpan="8" style={{ padding: '16px' }}>
                                                    <pre style={{ background: '#111827', color: '#10b981', padding: '16px', borderRadius: '8px', fontSize: '12px', overflowX: 'auto', margin: 0, fontFamily: '"Fira Code", monospace' }}>
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
    f.write(jsx_content)

print("UI restyled successfully")
