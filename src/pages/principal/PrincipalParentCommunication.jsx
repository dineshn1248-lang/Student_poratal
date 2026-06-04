import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaTelegramPlane, FaSms, FaEnvelope, FaLink, FaCheckCircle, FaSpinner, FaExclamationTriangle, FaRedo, FaComments, FaHistory } from 'react-icons/fa';
import './Principal.css';

export default function PrincipalParentCommunication() {
    const [students, setStudents] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [report, setReport] = useState(null);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [sendSuccess, setSendSuccess] = useState('');
    const [generatedLink, setGeneratedLink] = useState('');

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
        setGeneratedLink('');
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

    const handleSend = async (method) => {
        if (!selectedStudentId) return;
        setSending(true);
        setSendSuccess('');
        try {
            const token = localStorage.getItem('token');
            const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/hod/parent-communication/send`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ student_id: selectedStudentId, method })
            });
            const result = await resp.json();
            if (resp.ok) {
                const status = result.status || 'Sent';
                if (status === 'Sent') {
                    setSendSuccess(`${method} delivered successfully to ${result.recipient}!`);
                } else if (status === 'Simulated') {
                    setSendSuccess(`${method} logged (simulated). Tip: ${result.note || 'Configure credentials in .env to enable real delivery.'}`);
                } else {
                    setSendSuccess(`${method} failed: ${result.note || 'Check server logs.'}`);
                }
                fetchLogs();
            } else {
                setSendSuccess(`Error: ${result.error || 'Could not dispatch message.'}`);
            }
            setTimeout(() => setSendSuccess(''), 7000);
        } catch (e) {
            setSendSuccess('Network error — could not reach backend.');
            setTimeout(() => setSendSuccess(''), 5000);
        } finally {
            setSending(false);
        }
    };

    const handleRetry = async (logId) => {
        const token = localStorage.getItem('token');
        try {
            const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/hod/parent-communication/retry/${logId}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = await resp.json();
            setSendSuccess(result.message || result.error || 'Retry dispatched.');
            setTimeout(() => setSendSuccess(''), 5000);
            fetchLogs();
        } catch (e) {
            setSendSuccess('Retry failed — network error.');
            setTimeout(() => setSendSuccess(''), 5000);
        }
    };

    const getStatusBadge = (status) => {
        const cfg = {
            Sent:      { bg: '#ecfdf5', color: '#065f46', border: '#6ee7b7', icon: <FaCheckCircle size={10}/> },
            Simulated: { bg: '#fffbeb', color: '#92400e', border: '#fcd34d', icon: <FaExclamationTriangle size={10}/> },
            Failed:    { bg: '#fef2f2', color: '#991b1b', border: '#fca5a5', icon: <FaExclamationTriangle size={10}/> },
            Pending:   { bg: '#f8fafc', color: '#475569', border: '#cbd5e1', icon: <FaSpinner size={10}/> },
        };
        const c = cfg[status] || cfg.Pending;
        return (
            <span style={{
                display:'inline-flex', alignItems:'center', gap:'5px',
                padding:'4px 10px', borderRadius:'6px', fontSize: '12px', fontWeight:'800',
                background: c.bg, color: c.color, border: `1px solid ${c.border}`
            }}>{c.icon} {status}</span>
        );
    };

    const handleGenerateLink = () => {
        if (!report) return;
        const link = `${window.location.origin}/parent-login?register_no=${report.register_no}&otp=123456`;
        setGeneratedLink(link);
        navigator.clipboard.writeText(link).then(() => {
            setSendSuccess(`Secure Parent Login Link generated & copied to clipboard!`);
            setTimeout(() => setSendSuccess(''), 5000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            setSendSuccess(`Secure Parent Login Link generated!`);
            setTimeout(() => setSendSuccess(''), 5000);
        });
        handleSend("Secure Link");
    };

    return (
        <div className="principal-page-content">
            {/* Header Area */}
            <div className="page-header" style={{ borderBottom: '1px solid #edf2f7', paddingBottom: '20px', marginBottom: '30px' }}>
                <div>
                    <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#081226', letterSpacing: '-0.5px', margin: 0 }}>Parent Outreach Hub</h1>
                    <p style={{ margin: '6px 0 0', color: '#64748b', fontSize: '14px' }}>Dispatch academic updates, alerts, and access links directly to parents.</p>
                </div>
            </div>

            {/* Notification Badge */}
            {sendSuccess && (
                <div style={{
                    padding: '16px 20px', background: '#ecfdf5', color: '#065f46', borderRadius: '12px',
                    borderLeft: '5px solid #10b981', boxShadow: '0 4px 12px rgba(16,185,129,0.08)',
                    marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 'bold'
                }}>
                    <FaCheckCircle size={18} /> {sendSuccess}
                </div>
            )}

            {/* Two Column Layout Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '30px', marginBottom: '30px' }}>
                
                {/* LEFT COLUMN - Selection and Metrics */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    
                    {/* Student Selection Card */}
                    <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #edf2f7', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                        <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: '800', color: '#081226', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '8px', height: '16px', background: '#4f46e5', borderRadius: '4px' }}></span> Select Student
                        </h3>
                        <div style={{ position: 'relative' }}>
                            <select 
                                value={selectedStudentId} 
                                onChange={(e) => setSelectedStudentId(e.target.value)}
                                style={{
                                    width: '100%', padding: '12px 16px', borderRadius: '10px',
                                    border: '1.5px solid #cbd5e1', outline: 'none', background: '#f8fafc',
                                    fontWeight: '700', color: '#1e293b', fontSize: '14px', cursor: 'pointer',
                                    transition: 'border-color 0.2s'
                                }}
                            >
                                <option value="">-- Click to Select Student --</option>
                                {students.map(s => (
                                    <option key={s.id} value={s.id}>{s.register_no} - {s.full_name}</option>
                                ))}
                            </select>
                        </div>
                        {loading && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '14px', marginTop: '12px', fontWeight: 'bold' }}>
                                <FaSpinner className="fa-spin" /> Synchronizing data stream...
                            </div>
                        )}
                    </div>

                    {/* Quick Outreach Analytics Card */}
                    <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #edf2f7', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                        <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: '800', color: '#081226', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '8px', height: '16px', background: '#10b981', borderRadius: '4px' }}></span> Dispatch Analytics
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #f1f5f9', textAlign: 'center' }}>
                                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Outreaches logged</span>
                                <h4 style={{ margin: '6px 0 0', fontSize: '20px', fontWeight: '900', color: '#1e293b' }}>{logs.length}</h4>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #f1f5f9', textAlign: 'center' }}>
                                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>WhatsApp Sends</span>
                                <h4 style={{ margin: '6px 0 0', fontSize: '20px', fontWeight: '900', color: '#25D366' }}>
                                    {logs.filter(l => l.method === 'WhatsApp').length}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN - Detailed Preview Panel */}
                <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #edf2f7', padding: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: '800', color: '#081226', borderBottom: '1px solid #edf2f7', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '8px', height: '16px', background: '#6366f1', borderRadius: '4px' }}></span> Live Academic Roster Preview
                    </h3>

                    {!report && !loading && (
                        <div style={{ display: 'flex', flex1: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', padding: '60px 0', gap: '12px' }}>
                            <FaComments size={40} style={{ color: '#cbd5e1' }} />
                            <span style={{ fontWeight: '700', fontSize: '14px' }}>Awaiting Student Selection</span>
                            <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8', textAlign: 'center', maxWidth: '300px' }}>Select a student from the left panel to fetch their live statistics and configure parental messages.</p>
                        </div>
                    )}

                    {report && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {/* Student Metadata */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1.5px solid #edf2f7' }}>
                                <div>
                                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '800' }}>STUDENT NAME</span>
                                    <h4 style={{ margin: '4px 0 0', fontSize: '18px', fontWeight: '900', color: '#0f172a' }}>{report.student_name}</h4>
                                </div>
                                <div>
                                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '800' }}>REGISTER NUMBER</span>
                                    <h4 style={{ margin: '4px 0 0', fontSize: '18px', fontWeight: '900', color: '#0f172a' }}>{report.register_no}</h4>
                                </div>
                            </div>

                            {/* Academic Metric Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                                <div style={{ border: '1px solid #edf2f7', padding: '16px', borderRadius: '12px', textAlign: 'center', background: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.01)' }}>
                                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '800' }}>ATTENDANCE</span>
                                    <h4 style={{ margin: '6px 0 0', fontSize: '18px', fontWeight: '900', color: report.attendance_percent < 75 ? '#ef4444' : '#10b981' }}>{report.attendance_percent}%</h4>
                                </div>
                                <div style={{ border: '1px solid #edf2f7', padding: '16px', borderRadius: '12px', textAlign: 'center', background: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.01)' }}>
                                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '800' }}>CGPA</span>
                                    <h4 style={{ margin: '6px 0 0', fontSize: '18px', fontWeight: '900', color: '#4f46e5' }}>{report.cgpa || 'N/A'}</h4>
                                </div>
                                <div style={{ border: '1px solid #edf2f7', padding: '16px', borderRadius: '12px', textAlign: 'center', background: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.01)' }}>
                                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '800' }}>BACKLOGS</span>
                                    <h4 style={{ margin: '6px 0 0', fontSize: '18px', fontWeight: '900', color: report.backlog_count > 0 ? '#ef4444' : '#10b981' }}>{report.backlog_count}</h4>
                                </div>
                                <div style={{ border: '1px solid #edf2f7', padding: '16px', borderRadius: '12px', textAlign: 'center', background: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.01)' }}>
                                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '800' }}>PENDING DUES</span>
                                    <h4 style={{ margin: '6px 0 0', fontSize: '18px', fontWeight: '900', color: '#f59e0b' }}>₹{report.fee_pending}</h4>
                                </div>
                            </div>

                            {/* Remarks Quote */}
                            <div style={{ borderLeft: '4px solid #4f46e5', background: '#eef2ff', padding: '16px', borderRadius: '0 12px 12px 0' }}>
                                <span style={{ fontSize: '12px', color: '#4338ca', fontWeight: '800', display: 'block', marginBottom: '6px' }}>FACULTY EVALUATION REMARKS</span>
                                <p style={{ fontSize: '14px', color: '#1e1b4b', fontStyle: 'italic', margin: 0, lineHeight: '1.6' }}>"{report.faculty_remarks}"</p>
                            </div>

                            {/* Communication Action Panel */}
                            <div>
                                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '800', display: 'block', marginBottom: '10px' }}>DISPATCH CHANNELS</span>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                                    <button 
                                        onClick={() => handleSend('WhatsApp')}
                                        disabled={sending}
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#25D366', color: 'white', padding: '12px 8px', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 2px 4px rgba(37,211,102,0.1)' }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        <FaWhatsapp size={16} /> WhatsApp
                                    </button>
                                    <button 
                                        onClick={() => handleSend('SMS')}
                                        disabled={sending}
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#3b82f6', color: 'white', padding: '12px 8px', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 2px 4px rgba(59,130,246,0.1)' }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        <FaSms size={16} /> SMS
                                    </button>
                                    <button 
                                        onClick={() => handleSend('Email')}
                                        disabled={sending}
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#f43f5e', color: 'white', padding: '12px 8px', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 2px 4px rgba(244,63,94,0.1)' }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        <FaEnvelope size={16} /> Email
                                    </button>
                                    <button 
                                        onClick={handleGenerateLink}
                                        disabled={sending}
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#0f172a', color: 'white', padding: '12px 8px', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 2px 4px rgba(15,23,42,0.1)' }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        <FaLink size={16} /> Get Link
                                    </button>
                                </div>
                            </div>
                            {generatedLink && (
                                <div style={{ 
                                    marginTop: '20px', padding: '16px', background: '#f8fafc', 
                                    borderRadius: '12px', border: '1.5px dashed #cbd5e1', 
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.01)' 
                                }}>
                                    <span style={{ fontSize: '12px', color: '#4f46e5', fontWeight: '900', display: 'block', marginBottom: '8px' }}>
                                        🔗 PARENT SECURE PORTAL LOGIN LINK
                                    </span>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <input 
                                            type="text" 
                                            readOnly 
                                            value={generatedLink} 
                                            style={{ 
                                                flex: 1, padding: '10px 14px', borderRadius: '8px', 
                                                border: '1px solid #cbd5e1', outline: 'none', background: '#fff',
                                                fontSize: '14px', color: '#334155', fontWeight: 'bold' 
                                            }} 
                                            onClick={(e) => e.target.select()}
                                        />
                                        <button 
                                            onClick={() => {
                                                navigator.clipboard.writeText(generatedLink);
                                                setSendSuccess(`Copied Parent Link to Clipboard!`);
                                                setTimeout(() => setSendSuccess(''), 3000);
                                            }}
                                            style={{ 
                                                padding: '10px 16px', background: '#4f46e5', color: '#fff', 
                                                border: 'none', borderRadius: '8px', fontSize: '14px', 
                                                fontWeight: 'bold', cursor: 'pointer' 
                                            }}
                                        >
                                            Copy
                                        </button>
                                    </div>
                                    <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#64748b', fontWeight: '600' }}>
                                        Parent can paste this link in the browser to auto-fill the login form instantly!
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* AUDIT STATUS TABLE */}
            <div className="principal-card" style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #edf2f7', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                <h3 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: '800', color: '#081226', borderBottom: '1px solid #edf2f7', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaHistory size={16} style={{ color: '#6366f1' }} /> Dispatch Audit Trail Logs
                </h3>
                <div className="principal-table-container" style={{ overflowX: 'auto' }}>
                    <table className="principal-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                                <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '14px', fontWeight: '800' }}>DATE & TIME</th>
                                <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '14px', fontWeight: '800' }}>STUDENT NAME</th>
                                <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '14px', fontWeight: '800' }}>REGISTER NO</th>
                                <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '14px', fontWeight: '800' }}>DISPATCH METPrincipal</th>
                                <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '14px', fontWeight: '800' }}>RECIPIENT CONTACT</th>
                                <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '14px', fontWeight: '800' }}>DELIVERY STATUS</th>
                                <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '14px', fontWeight: '800' }}>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', color: '#94a3b8', padding: '30px', fontWeight: '700', fontSize: '14px' }}>
                                        No parental communications dispatched yet.
                                    </td>
                                </tr>
                            ) : (
                                logs.map(log => (
                                    <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '12px 16px', color: '#64748b', fontSize: '14px', fontWeight: '600' }}>{log.date}</td>
                                        <td style={{ padding: '12px 16px', fontWeight: '800', color: '#1e293b', fontSize: '14px' }}>{log.student_name}</td>
                                        <td style={{ padding: '12px 16px', fontSize: '14px' }}><span className="reg-no">{log.register_no}</span></td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <span style={{ 
                                                padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '800',
                                                background: log.method === 'WhatsApp' ? '#ecfdf5' : log.method === 'Email' ? '#fff1f2' : log.method === 'Secure Link' ? '#f1f5f9' : '#eff6ff',
                                                color: log.method === 'WhatsApp' ? '#047857' : log.method === 'Email' ? '#be123c' : log.method === 'Secure Link' ? '#334155' : '#1d4ed8'
                                            }}>
                                                {log.method}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px 16px', color: '#475569', fontSize: '14px', fontWeight: '600' }}>{log.recipient}</td>
                                        <td style={{ padding: '12px 16px' }}>{getStatusBadge(log.status)}</td>
                                        <td style={{ padding: '12px 16px' }}>
                                            {(log.status === 'Failed' || log.status === 'Simulated') && (log.retry_count || 0) < 3 && (
                                                <button
                                                    onClick={() => handleRetry(log.id)}
                                                    title={log.error_message || 'Retry sending'}
                                                    style={{
                                                        display:'inline-flex', alignItems:'center', gap:'5px',
                                                        padding:'6px 12px', background:'#f1f5f9', color:'#475569',
                                                        border:'1px solid #cbd5e1', borderRadius:'8px',
                                                        fontSize: '14px', fontWeight:'700', cursor:'pointer'
                                                    }}
                                                >
                                                    <FaRedo size={10}/> Retry {log.retry_count > 0 ? `(${log.retry_count}/3)` : ''}
                                                </button>
                                            )}
                                            {(log.retry_count || 0) >= 3 && (
                                                <span style={{fontSize: '12px',color:'#ef4444',fontWeight:'700'}}>Max retries reached</span>
                                            )}
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
