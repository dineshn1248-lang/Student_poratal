import React, { useState } from 'react';
import { FaTimes, FaPhoneAlt, FaEnvelope, FaBell, FaMobileAlt, FaSpinner, FaPaperPlane, FaSave } from 'react-icons/fa';

export default function ParentActionModals({ 
    editStudent, 
    notifyStudent, 
    closeEditModal, 
    closeNotifyModal, 
    onContactSaved 
}) {
    // Notify modal state
    const [notifyMethod, setNotifyMethod]   = useState('Email');
    const [notifyMsg, setNotifyMsg]         = useState('');
    const [sending, setSending]             = useState(false);
    const [sendResult, setSendResult]       = useState(null);

    // Edit modal state
    const [editPhone, setEditPhone]         = useState(editStudent?.parent_phone || '');
    const [editEmail, setEditEmail]         = useState(editStudent?.parent_email || '');
    const [saving, setSaving]               = useState(false);
    const [saveMsg, setSaveMsg]             = useState('');

    // Re-sync edit states when editStudent changes
    React.useEffect(() => {
        if (editStudent) {
            setEditPhone(editStudent.parent_phone || '');
            setEditEmail(editStudent.parent_email || '');
            setSaveMsg('');
        }
    }, [editStudent]);

    // Re-sync notify states when notifyStudent changes
    React.useEffect(() => {
        if (notifyStudent) {
            setNotifyMethod('Email');
            setNotifyMsg('');
            setSendResult(null);
        }
    }, [notifyStudent]);

    const handleSendNotification = async () => {
        if (!notifyStudent) return;
        setSending(true);
        setSendResult(null);
        try {
            const res = await fetch(`${'https://student-poratal.onrender.com/api'}/hod/parent-communication/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    student_id: notifyStudent.id,
                    method: notifyMethod,
                    message: notifyMsg || ''
                })
            });
            const data = await res.json();
            if (res.ok) {
                setSendResult({ ok: true, text: data.message || `${notifyMethod} sent successfully!`, recipient: data.recipient });
                setTimeout(() => closeNotifyModal(), 2500);
            } else {
                setSendResult({ ok: false, text: data.error || 'Failed to send notification.' });
            }
        } catch (e) {
            setSendResult({ ok: false, text: 'Network error. Please check if the server is running.' });
        } finally {
            setSending(false);
        }
    };

    const handleSaveContact = async () => {
        if (!editStudent) return;
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${'https://student-poratal.onrender.com/api'}/hod/students/${editStudent.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    parent_phone: editPhone,
                    parent_email: editEmail
                })
            });
            if (res.ok) {
                setSaveMsg('✅ Parent contact updated successfully!');
                if (onContactSaved) {
                    onContactSaved(editStudent.id, editPhone, editEmail);
                }
                setTimeout(() => closeEditModal(), 1500);
            } else {
                setSaveMsg('❌ Failed to update contact.');
            }
        } catch (e) {
            setSaveMsg('❌ Error updating contact.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            {/* ── NOTIFY PARENT MODAL ── */}
            {notifyStudent && (
                <div style={{ position:'fixed', inset:0, background:'rgba(8,18,38,0.55)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(4px)' }}
                    onClick={e => { if (e.target === e.currentTarget) closeNotifyModal(); }}>
                    <div style={{ background:'#fff', borderRadius:20, padding:'36px 40px', width:480, boxShadow:'0 20px 60px rgba(0,0,0,0.2)', position:'relative' }}>
                        <button onClick={closeNotifyModal} style={{ position:'absolute', top:16, right:16, background:'#f1f5f9', border:'none', borderRadius:'50%', width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'#64748b', fontSize: 14 }}>
                            <FaTimes />
                        </button>
                        <div style={{ marginBottom:24 }}>
                            <h2 style={{ fontSize: 18, fontWeight:900, color:'#081226', margin:0 }}>Notify Parent</h2>
                            <p style={{ color:'#64748b', fontSize: 14, marginTop:6 }}>
                                Send academic alert to parent of <strong style={{ color:'#2563eb' }}>{notifyStudent.full_name}</strong>
                                <span style={{ marginLeft:8, background:'#f1f5f9', color:'#475569', fontSize: 12, padding:'2px 8px', borderRadius:20, fontWeight:700 }}>{notifyStudent.register_no}</span>
                            </p>
                        </div>
                        <div style={{ background:'#f8fafc', borderRadius:12, padding:'12px 16px', marginBottom:20, fontSize: 14, color:'#475569', display:'flex', flexDirection:'column', gap:6, border:'1px solid #e2e8f0' }}>
                            <div style={{ display:'flex', alignItems:'center', gap:8 }}><FaPhoneAlt style={{ color:'#6366f1', fontSize: 12 }} /><span><strong>Phone:</strong> {notifyStudent.parent_phone || '—'}</span></div>
                            <div style={{ display:'flex', alignItems:'center', gap:8 }}><FaEnvelope style={{ color:'#6366f1', fontSize: 12 }} /><span><strong>Email:</strong> {notifyStudent.parent_email || '—'}</span></div>
                        </div>
                        <div style={{ marginBottom:20 }}>
                            <label style={{ display:'block', fontSize: 14, fontWeight:800, color:'#374151', marginBottom:10, textTransform:'uppercase', letterSpacing:0.5 }}>Send via</label>
                            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
                                {[
                                    { id:'Email', icon:<FaEnvelope />, color:'#4f46e5', bg:'#eef2ff' },
                                    { id:'SMS',   icon:<FaMobileAlt />, color:'#f97316', bg:'#fff7ed' },
                                    { id:'WhatsApp', icon:<FaBell />, color:'#10b981', bg:'#ecfdf5' },
                                ].map(m => (
                                    <button key={m.id} onClick={() => setNotifyMethod(m.id)}
                                        style={{ padding:'12px 8px', border: notifyMethod===m.id ? `2px solid ${m.color}` : '1.5px solid #e2e8f0',
                                            borderRadius:12, background: notifyMethod===m.id ? m.bg : '#f8fafc',
                                            color: notifyMethod===m.id ? m.color : '#94a3b8', fontWeight:800, fontSize: 14,
                                            cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:6, transition:'all 0.2s' }}>
                                        <span style={{ fontSize: 18 }}>{m.icon}</span>{m.id}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div style={{ marginBottom:24 }}>
                            <label style={{ display:'block', fontSize: 14, fontWeight:800, color:'#374151', marginBottom:8, textTransform:'uppercase', letterSpacing:0.5 }}>Custom Message <span style={{ color:'#94a3b8', fontWeight:400, textTransform:'none', fontSize: 12 }}>(optional)</span></label>
                            <textarea value={notifyMsg} onChange={e => setNotifyMsg(e.target.value)}
                                placeholder={`Auto message: Dear Parent of ${notifyStudent.full_name}, this is an academic update...`}
                                rows={4}
                                style={{ width:'100%', padding:'12px 16px', border:'1.5px solid #e2e8f0', borderRadius:12, fontSize: 14, outline:'none', color:'#1e293b', background:'#f8fafc', resize:'none', boxSizing:'border-box', fontFamily:'inherit' }}
                            />
                        </div>
                        {sendResult && (
                            <div style={{ marginBottom:16, padding:'12px 16px', background: sendResult.ok ? '#ecfdf5' : '#fef2f2', color: sendResult.ok ? '#065f46' : '#b91c1c', borderRadius:10, fontSize: 14, fontWeight:700, border: `1px solid ${sendResult.ok ? '#a7f3d0' : '#fecaca'}` }}>
                                {sendResult.ok ? '✅' : '❌'} {sendResult.text}
                            </div>
                        )}
                        <div style={{ display:'flex', gap:12 }}>
                            <button onClick={closeNotifyModal} style={{ flex:1, height:46, background:'#f1f5f9', border:'none', borderRadius:12, fontSize: 14, fontWeight:700, color:'#64748b', cursor:'pointer' }}>Cancel</button>
                            <button onClick={handleSendNotification} disabled={sending}
                                style={{ flex:2, height:46, background: sending ? '#a5b4fc' : '#4f46e5', border:'none', borderRadius:12, fontSize: 14, fontWeight:800, color:'#fff', cursor: sending ? 'not-allowed' : 'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                                {sending ? <><FaSpinner className="fa-spin" /> Sending...</> : <><FaPaperPlane /> Send {notifyMethod}</>}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── EDIT PARENT CONTACT MODAL ── */}
            {editStudent && (
                <div style={{ position:'fixed', inset:0, background:'rgba(8,18,38,0.55)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(4px)' }}
                    onClick={e => { if (e.target === e.currentTarget) closeEditModal(); }}>
                    <div style={{ background:'#fff', borderRadius:20, padding:'36px 40px', width:440, boxShadow:'0 20px 60px rgba(0,0,0,0.2)', position:'relative' }}>
                        <button onClick={closeEditModal} style={{ position:'absolute', top:16, right:16, background:'#f1f5f9', border:'none', borderRadius:'50%', width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'#64748b', fontSize: 14 }}>
                            <FaTimes />
                        </button>
                        <div style={{ marginBottom:24 }}>
                            <h2 style={{ fontSize: 18, fontWeight:900, color:'#081226', margin:0 }}>Edit Parent Contact</h2>
                            <p style={{ color:'#64748b', fontSize: 14, marginTop:6 }}>
                                Update contact details for parent of <strong style={{ color:'#2563eb' }}>{editStudent.full_name}</strong>
                            </p>
                        </div>
                        <div style={{ marginBottom:16 }}>
                            <label style={{ display:'block', fontSize: 14, fontWeight:800, color:'#374151', marginBottom:8, textTransform:'uppercase', letterSpacing:0.5 }}>Parent Mobile Number</label>
                            <div style={{ position:'relative', display:'flex', alignItems:'center' }}>
                                <FaPhoneAlt style={{ position:'absolute', left:14, color:'#94a3b8', fontSize: 14 }} />
                                <input type="text" value={editPhone} onChange={e => setEditPhone(e.target.value)}
                                    placeholder="+91 XXXXX XXXXX"
                                    style={{ width:'100%', padding:'12px 16px 12px 40px', border:'1.5px solid #e2e8f0', borderRadius:10, fontSize: 14, fontWeight:600, color:'#1e293b', outline:'none', background:'#f8fafc', boxSizing:'border-box' }}
                                />
                            </div>
                        </div>
                        <div style={{ marginBottom:24 }}>
                            <label style={{ display:'block', fontSize: 14, fontWeight:800, color:'#374151', marginBottom:8, textTransform:'uppercase', letterSpacing:0.5 }}>Parent Email Address</label>
                            <div style={{ position:'relative', display:'flex', alignItems:'center' }}>
                                <FaEnvelope style={{ position:'absolute', left:14, color:'#94a3b8', fontSize: 14 }} />
                                <input type="email" value={editEmail} onChange={e => setEditEmail(e.target.value)}
                                    placeholder="parent@example.com"
                                    style={{ width:'100%', padding:'12px 16px 12px 40px', border:'1.5px solid #e2e8f0', borderRadius:10, fontSize: 14, fontWeight:600, color:'#1e293b', outline:'none', background:'#f8fafc', boxSizing:'border-box' }}
                                />
                            </div>
                        </div>
                        {saveMsg && (
                            <div style={{ marginBottom:20, padding:'12px', background: saveMsg.includes('✅') ? '#ecfdf5' : '#fef2f2', color: saveMsg.includes('✅') ? '#065f46' : '#b91c1c', borderRadius:8, fontSize: 14, fontWeight:700, textAlign:'center' }}>
                                {saveMsg}
                            </div>
                        )}
                        <button onClick={handleSaveContact} disabled={saving}
                            style={{ width:'100%', height:48, background: saving ? '#a5b4fc' : '#4f46e5', border:'none', borderRadius:12, fontSize: 14, fontWeight:800, color:'#fff', cursor: saving ? 'not-allowed' : 'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                            {saving ? <><FaSpinner className="fa-spin" /> Saving...</> : <><FaSave /> Save Contact Info</>}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
