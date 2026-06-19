import React, { useState } from 'react';
import { FaEye, FaEdit, FaCheckCircle, FaExclamationCircle, FaChartLine, FaTimes, FaUserGraduate, FaCoins, FaGraduationCap, FaBell, FaPhoneAlt } from 'react-icons/fa';
import ParentActionModals from './ParentActionModals';

export default function StudentTable({ students, loading, refreshData }) {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [activeModal, setActiveModal] = useState(null); // 'view', 'edit', 'fees', 'performance', null
    
    // Modal Form States
    const [editForm, setEditForm] = useState({});
    const [paymentAmount, setPaymentAmount] = useState('');
    const [saving, setSaving] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    // Parent Modals state
    const [notifyStudent, setNotifyStudent] = useState(null);
    const [editContactStudent, setEditContactStudent] = useState(null);

    const onContactSaved = () => {
        if (refreshData) refreshData();
    };

    const openModal = (student, modalType) => {
        setSelectedStudent(student);
        setActiveModal(modalType);
        setErrorMsg('');
        setSuccessMsg('');
        if (modalType === 'edit') {
            setEditForm({
                full_name: student.full_name,
                semester: student.semester || 6,
                section: student.section || 'A',
                email: student.email || '',
                phone: student.phone || '',
                parent_phone: student.parent_phone || '',
                address: student.address || ''
            });
        }
        if (modalType === 'fees') {
            setPaymentAmount('');
        }
    };

    const closeModal = () => {
        setSelectedStudent(null);
        setActiveModal(null);
        setErrorMsg('');
        setSuccessMsg('');
    };

    const handleEditSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setErrorMsg('');
        try {
            const token = localStorage.getItem('token');
            const resp = await fetch(`${import.meta.env.PROD ? 'https://student-poratal.onrender.com/api' : 'http://127.0.0.1:5000/api'}/hod/students/${selectedStudent.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editForm)
            });

            if (resp.ok) {
                setSuccessMsg('Changes saved successfully!');
                if (refreshData) await refreshData();
                setTimeout(() => closeModal(), 1500);
            } else {
                const data = await resp.json();
                setErrorMsg(data.error || 'Failed to update student records.');
            }
        } catch (e) {
            setErrorMsg('Network error. Check connection to backend.');
        } finally {
            setSaving(false);
        }
    };

    const handleRecordPayment = async (e) => {
        e.preventDefault();
        if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
            setErrorMsg('Please enter a valid payment amount.');
            return;
        }

        setSaving(true);
        setErrorMsg('');

        try {
            const payVal = parseFloat(paymentAmount);
            let newPending = Math.max(0, selectedStudent.fee_pending - payVal);
            let newStatus = newPending === 0 ? 'Paid' : 'Pending';

            const token = localStorage.getItem('token');
            const resp = await fetch(`${import.meta.env.PROD ? 'https://student-poratal.onrender.com/api' : 'http://127.0.0.1:5000/api'}/hod/students/${selectedStudent.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fee_pending: newPending,
                    fee_status: newStatus
                })
            });

            if (resp.ok) {
                setSuccessMsg(`Transaction Recorded! Paid ₹${payVal}. Remaining Balance: ₹${newPending}`);
                if (refreshData) await refreshData();
                setTimeout(() => closeModal(), 2000);
            } else {
                setErrorMsg('Transaction failed. Try again.');
            }
        } catch (e) {
            setErrorMsg('Network error. Transaction cancelled.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="table-card">
                <div style={{ padding: '60px', textAlign: 'center', color: '#64748b', fontWeight: 600 }}>
                    Synchronizing Academic Records...
                </div>
            </div>
        );
    }

    return (
        <div className="table-card">
            <div className="table-responsive">
                <table className="student-table">
                    <thead>
                        <tr>
                            <th>Register No</th>
                            <th>Student Name</th>
                            <th>Semester / Section</th>
                            <th>Attendance</th>
                            <th>Exam Fees</th>
                            <th>Backlogs</th>
                            <th>Academic Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length === 0 ? (
                            <tr>
                                <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                                    No students found matching the selected criteria.
                                </td>
                            </tr>
                        ) : (
                            students.map((student) => (
                                <tr key={student.id}>
                                    <td><span className="reg-no">{student.register_no}</span></td>
                                    <td className="student-name-cell">
                                        <div className="s-name" style={{ fontWeight: 'bold' }}>{student.full_name}</div>
                                    </td>
                                    <td style={{ fontWeight: 600 }}>{student.semester} Sem / {student.section}</td>
                                    <td>
                                        <span className={`att-badge ${student.attendance_percent < 75 ? 'low' : (student.attendance_percent < 85 ? 'mid' : 'high')}`}>
                                            {student.attendance_percent}%
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 'bold', color: '#0f172a' }}>
                                            ₹4,670
                                            <span style={{ fontSize: '12px', color: '#64748b', display: 'block', fontWeight: 'bold', marginTop: '2px' }}>This Sem Exam Fees</span>
                                        </div>
                                    </td>
                                    <td style={{ textAlign: 'center', fontWeight: 700 }}>{student.backlog_count}</td>
                                    <td>
                                        <span className={`status-pill academic ${student.academic_status.toLowerCase()}`}>
                                            {student.academic_status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons-group">
                                            <button onClick={() => openModal(student, 'view')} className="btn-icon-action btn-v" title="View"><FaEye /></button>
                                            <button onClick={() => openModal(student, 'edit')} className="btn-icon-action btn-e" title="Edit"><FaEdit /></button>
                                            <button onClick={() => setEditContactStudent(student)} className="btn-icon-action" style={{ background: '#f1f5f9', color: '#475569', borderColor: '#cbd5e1' }} title="Edit Parent Contact"><FaPhoneAlt /></button>
                                            <button onClick={() => setNotifyStudent(student)} className="btn-icon-action" style={{ background: '#eff6ff', color: '#2563eb', borderColor: '#bfdbfe' }} title="Notify Parent"><FaBell /></button>
                                            <button onClick={() => openModal(student, 'fees')} className="btn-icon-action btn-f" title="Fees"><span style={{ fontWeight: 800 }}>₹</span></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* MODALS */}
            {activeModal && selectedStudent && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(15, 23, 42, 0.7)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 9999,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }} onClick={closeModal}>
                    <div style={{
                        background: '#ffffff',
                        borderRadius: '16px',
                        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
                        width: '550px',
                        maxWidth: '90%',
                        overflow: 'hidden',
                        position: 'relative'
                    }} onClick={(e) => e.stopPropagation()}>
                        
                        {/* Header */}
                        <div style={{
                            padding: '20px 24px',
                            borderBottom: '1px solid #edf2f7',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            background: '#f8fafc'
                        }}>
                            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#1e293b', textTransform: 'capitalize' }}>
                                {activeModal} Student Profile
                            </h3>
                            <button onClick={closeModal} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b', fontSize: '18px' }}><FaTimes /></button>
                        </div>

                        {/* Error & Success Messages */}
                        {errorMsg && <div style={{ background: '#fee2e2', color: '#991b1b', padding: '12px 24px', fontSize: '14px', fontWeight: 'bold' }}>{errorMsg}</div>}
                        {successMsg && <div style={{ background: '#ecfdf5', color: '#065f46', padding: '12px 24px', fontSize: '14px', fontWeight: 'bold' }}>{successMsg}</div>}

                        {/* Modal Body content based on type */}

                        {/* 1. VIEW MODAL */}
                        {activeModal === 'view' && (
                            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                                    <img 
                                        src={`https://ui-avatars.com/api/?name=${selectedStudent.full_name}&background=6366f1&color=fff&size=64`} 
                                        alt="student"
                                        style={{ width: '64px', height: '64px', borderRadius: '50%' }}
                                    />
                                    <div>
                                        <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: 0 }}>{selectedStudent.full_name}</h4>
                                        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '14px', fontWeight: 'bold' }}>{selectedStudent.register_no}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '14px' }}>
                                    <div>
                                        <label style={{ fontWeight: 'bold', color: '#64748b', fontSize: '14px' }}>ACADEMIC PROGRAM</label>
                                        <p style={{ margin: '4px 0 0', fontWeight: 'bold', color: '#1e293b' }}>{selectedStudent.semester} Semester (Sec {selectedStudent.section})</p>
                                    </div>
                                    <div>
                                        <label style={{ fontWeight: 'bold', color: '#64748b', fontSize: '14px' }}>EMAIL ADDRESS</label>
                                        <p style={{ margin: '4px 0 0', color: '#1e293b' }}>{selectedStudent.email || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <label style={{ fontWeight: 'bold', color: '#64748b', fontSize: '14px' }}>MOBILE NO</label>
                                        <p style={{ margin: '4px 0 0', color: '#1e293b' }}>{selectedStudent.phone || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <label style={{ fontWeight: 'bold', color: '#64748b', fontSize: '14px' }}>ATTENDANCE RATE</label>
                                        <p style={{ margin: '4px 0 0', fontWeight: 'bold', color: selectedStudent.attendance_percent < 75 ? '#ef4444' : '#10b981' }}>{selectedStudent.attendance_percent}%</p>
                                    </div>
                                    <div>
                                        <label style={{ fontWeight: 'bold', color: '#64748b', fontSize: '14px' }}>THIS SEM EXAM FEES</label>
                                        <p style={{ margin: '4px 0 0', fontWeight: 'bold', color: '#10b981' }}>₹4,670</p>
                                    </div>
                                    <div>
                                        <label style={{ fontWeight: 'bold', color: '#64748b', fontSize: '14px' }}>ACADEMIC STATUS</label>
                                        <p style={{ margin: '4px 0 0', fontWeight: 'bold', color: selectedStudent.academic_status === 'Active' ? '#10b981' : '#ef4444' }}>{selectedStudent.academic_status}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                                    <button onClick={closeModal} style={{ padding: '10px 20px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Close Profile</button>
                                </div>
                            </div>
                        )}

                        {/* 2. EDIT MODAL */}
                        {activeModal === 'edit' && (
                            <form onSubmit={handleEditSave} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '6px', display: 'block' }}>Full Name</label>
                                        <input type="text" value={editForm.full_name} onChange={(e) => setEditForm({...editForm, full_name: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} required />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '6px', display: 'block' }}>Semester</label>
                                        <select value={editForm.semester} onChange={(e) => setEditForm({...editForm, semester: parseInt(e.target.value)})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                                            {[1, 2, 3, 4, 5, 6].map(s => <option key={s} value={s}>{s} Sem</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '6px', display: 'block' }}>Section</label>
                                        <select value={editForm.section} onChange={(e) => setEditForm({...editForm, section: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                                            {['A', 'B', 'C'].map(sec => <option key={sec} value={sec}>Section {sec}</option>)}
                                        </select>
                                    </div>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '6px', display: 'block' }}>Email Address</label>
                                        <input type="email" value={editForm.email} onChange={(e) => setEditForm({...editForm, email: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '6px', display: 'block' }}>Phone Number</label>
                                        <input type="text" value={editForm.phone} onChange={(e) => setEditForm({...editForm, phone: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '6px', display: 'block' }}>Parent Number</label>
                                        <input type="text" value={editForm.parent_phone} onChange={(e) => setEditForm({...editForm, parent_phone: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                                    </div>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '6px', display: 'block' }}>Address</label>
                                        <textarea value={editForm.address} onChange={(e) => setEditForm({...editForm, address: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontFamily: 'inherit', resize: 'vertical', minHeight: '60px' }} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                                    <button type="button" onClick={closeModal} style={{ padding: '10px 20px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Cancel</button>
                                    <button type="submit" disabled={saving} style={{ padding: '10px 20px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* 3. FEES MODAL */}
                        {activeModal === 'fees' && (
                            <form onSubmit={handleRecordPayment} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ background: '#ecfdf5', padding: '16px', borderRadius: '12px', borderLeft: '4px solid #10b981', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <p style={{ margin: 0, fontSize: '14px', color: '#047857', fontWeight: 'bold' }}>THIS SEM EXAM FEES</p>
                                        <h4 style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: '900', color: '#065f46' }}>₹4,670</h4>
                                    </div>
                                    <span style={{
                                        background: '#10b981',
                                        color: '#ffffff', padding: '6px 12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '14px'
                                    }}>
                                        Notified
                                    </span>
                                </div>

                                <div>
                                    <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '8px', display: 'block' }}>Record Exam Fees Payment (₹)</label>
                                    <div style={{ position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '16px', top: '12px', color: '#94a3b8', fontWeight: 'bold' }}>₹</span>
                                        <input 
                                            type="number" 
                                            value={paymentAmount} 
                                            onChange={(e) => setPaymentAmount(e.target.value)} 
                                            placeholder="Enter amount paid"
                                            style={{ width: '100%', padding: '12px 12px 12px 32px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                                            required
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                                    <button type="button" onClick={closeModal} style={{ padding: '10px 20px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Cancel</button>
                                    <button type="submit" disabled={saving} style={{ padding: '10px 20px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <FaCoins /> {saving ? 'Recording...' : 'Record Payment'}
                                    </button>
                                </div>
                            </form>
                        )}

                    </div>
                </div>
            )}

            {/* Parent Notify and Edit Modals */}
            <ParentActionModals 
                editStudent={editContactStudent}
                notifyStudent={notifyStudent}
                closeEditModal={() => setEditContactStudent(null)}
                closeNotifyModal={() => setNotifyStudent(null)}
                onContactSaved={onContactSaved}
            />
        </div>
    );
}
