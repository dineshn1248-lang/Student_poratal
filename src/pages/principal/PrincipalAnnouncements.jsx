import React, { useState, useEffect } from 'react';
import { FaBell, FaBullhorn, FaPlus, FaTrash, FaCheckCircle, FaSpinner, FaUsers, FaExclamationTriangle } from 'react-icons/fa';
import './Principal.css';

export default function PrincipalAnnouncements() {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [actionMsg, setActionMsg] = useState('');
    
    // Form States
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('General Notice');
    const [targetAudience, setTargetAudience] = useState('All Users');
    const [priority, setPriority] = useState('Medium');
    const [isEmergency, setIsEmergency] = useState(false);

    useEffect(() => {
        loadAnnouncements();
    }, []);

    const loadAnnouncements = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const resp = await fetch(`${import.meta.env.PROD ? 'https://student-poratal.onrender.com/api' : 'http://127.0.0.1:5000/api'}/principal/announcements`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await resp.json();
            if (resp.ok) {
                setAnnouncements(data);
            }
        } catch (e) {
            console.error("Failed to load announcements:", e);
        } finally {
            setLoading(false);
        }
    };

    const handlePublish = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        setSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const resp = await fetch(`${import.meta.env.PROD ? 'https://student-poratal.onrender.com/api' : 'http://127.0.0.1:5000/api'}/principal/announcements`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    content,
                    category,
                    target_audience: targetAudience,
                    priority,
                    is_emergency: isEmergency
                })
            });

            if (resp.ok) {
                setActionMsg("Notice broadcast successfully to department feed!");
                setTimeout(() => setActionMsg(''), 4000);
                
                // Clear Form
                setTitle('');
                setContent('');
                setCategory('General Notice');
                setTargetAudience('All Users');
                setPriority('Medium');
                setIsEmergency(false);
                
                loadAnnouncements(); // Refresh list
            }
        } catch (err) {
            console.error("Failed to publish announcement:", err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to retract and delete this announcement?")) return;

        try {
            const token = localStorage.getItem('token');
            const resp = await fetch(`${import.meta.env.PROD ? 'https://student-poratal.onrender.com/api' : 'http://127.0.0.1:5000/api'}/principal/announcements/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (resp.ok) {
                setActionMsg("Notice retracted successfully!");
                setTimeout(() => setActionMsg(''), 4000);
                loadAnnouncements();
            }
        } catch (err) {
            console.error("Failed to retract announcement:", err);
        }
    };

    if (loading) {
        return <div style={{ display: 'flex', height: '80vh', alignItems: 'center', justifyContent: 'center', color: '#4f46e5' }}><FaSpinner className="fa-spin" size={32} /></div>;
    }

    return (
        <div className="principal-page-content">
            {/* Page Header */}
            <div className="page-header" style={{ borderBottom: '1px solid #edf2f7', paddingBottom: '20px', marginBottom: '30px' }}>
                <div>
                    <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#081226', letterSpacing: '-0.5px', margin: 0 }}>Department Announcements</h1>
                    <p style={{ margin: '6px 0 0', color: '#64748b', fontSize: '14px' }}>Compose and broadcast notices, schedules, and alerts directly to staff, students, and parent portals.</p>
                </div>
            </div>

            {/* Notification Toast */}
            {actionMsg && (
                <div style={{
                    padding: '16px 20px', background: '#ecfdf5', color: '#065f46', borderRadius: '12px',
                    borderLeft: '5px solid #10b981', boxShadow: '0 4px 12px rgba(16,185,129,0.08)',
                    marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 'bold'
                }}>
                    <FaCheckCircle size={18} /> {actionMsg}
                </div>
            )}

            {/* Column Grid Layout */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
                


                {/* RIGHT COLUMN - FEED HISTORY */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #edf2f7', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#081226', borderBottom: '1px solid #edf2f7', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '8px', height: '16px', background: '#10b981', borderRadius: '4px' }}></span> Active Bulletins History
                        </h3>

                        {announcements.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                <FaBullhorn size={40} style={{ color: '#cbd5e1' }} />
                                <span style={{ fontWeight: '700', fontSize: '14px' }}>No Bulletins Live</span>
                                <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>Create an announcement in the left panel to broadcast details instantly.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {announcements.map((ann) => (
                                    <div 
                                        key={ann.id} 
                                        style={{
                                            border: ann.is_emergency ? '1.5px solid #fecaca' : '1px solid #edf2f7',
                                            borderRadius: '12px',
                                            background: ann.is_emergency ? '#fff5f5' : '#f8fafc',
                                            padding: '20px',
                                            position: 'relative'
                                        }}
                                    >
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                                            <span style={{
                                                fontSize: '12px', fontWeight: '800', padding: '3px 8px', borderRadius: '4px',
                                                background: ann.is_emergency ? '#fee2e2' : '#e2e8f0',
                                                color: ann.is_emergency ? '#991b1b' : '#475569'
                                            }}>
                                                {ann.category}
                                            </span>
                                            <span style={{ fontSize: '12px', fontWeight: '800', padding: '3px 8px', borderRadius: '4px', background: '#eff6ff', color: '#1e40af', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <FaUsers size={10} /> {ann.target_audience}
                                            </span>
                                            <span style={{
                                                fontSize: '12px', fontWeight: '800', padding: '3px 8px', borderRadius: '4px',
                                                background: ann.priority === 'High' ? '#fef3c7' : '#f1f5f9',
                                                color: ann.priority === 'High' ? '#78350f' : '#64748b'
                                            }}>
                                                {ann.priority} Priority
                                            </span>
                                        </div>

                                        <h4 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '800', color: ann.is_emergency ? '#991b1b' : '#0f172a', paddingRight: '24px' }}>
                                            {ann.title}
                                        </h4>
                                        <p style={{ margin: '0 0 12px', fontSize: '14px', color: '#475569', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                                            {ann.content}
                                        </p>
                                        <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>
                                            Broadcast Date: {ann.date}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
