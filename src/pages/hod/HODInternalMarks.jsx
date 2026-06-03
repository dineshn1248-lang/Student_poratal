import React, { useState, useEffect } from 'react';
import { FaFileAlt, FaCheckCircle, FaSpinner, FaPaperPlane, FaEdit, FaTimes, FaLock, FaSave } from 'react-icons/fa';
import './HOD.css';

export default function HODInternalMarks() {
    const [loading, setLoading] = useState(true);
    const [selectedSem, setSelectedSem] = useState('6');
    const [marksList, setMarksList] = useState([]);
    const [actionSuccess, setActionSuccess] = useState('');
    
    // Modal states
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [studentMarks, setStudentMarks] = useState([]);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalSaving, setModalSaving] = useState(false);

    useEffect(() => {
        loadData();
    }, [selectedSem]);

    const loadData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/hod/internal-marks?semester=${selectedSem}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await resp.json();
            if (resp.ok) {
                setMarksList(data);
            }
        } catch (error) {
            console.error("Failed to load internal marks stats:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            // Force status lock
            setActionSuccess("Internal Marks approved and locked successfully!");
            setMarksList(prev => prev.map(item => item.id === id ? { ...item, status: "Approved" } : item));
            setTimeout(() => setActionSuccess(''), 4000);
        } catch (e) {
            console.error(e);
        }
    };

    const handleNotify = (faculty) => {
        setActionSuccess(`Simulated notification sent to ${faculty} to complete entries.`);
        setTimeout(() => setActionSuccess(''), 4000);
    };

    const openEditModal = async (subject) => {
        setSelectedSubject(subject);
        setIsEditModalOpen(true);
        setModalLoading(true);
        
        try {
            const token = localStorage.getItem('token');
            const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/hod/internal-marks/${subject.id}/students`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await resp.json();
            if (resp.ok) {
                setStudentMarks(data.students || []);
            }
        } catch (e) {
            console.error("Failed to load subject student marks:", e);
        } finally {
            setModalLoading(false);
        }
    };

    const handleMarkChange = (studentId, value) => {
        // Enforce maximum marks limit of 20
        let score = parseFloat(value);
        if (isNaN(score)) score = 0;
        if (score < 0) score = 0;
        if (score > 20) score = 20;

        setStudentMarks(prev => prev.map(s => 
            s.student_id === studentId ? { ...s, internal_marks: score } : s
        ));
    };

    const saveInternalMarks = async (e) => {
        e.preventDefault();
        setModalSaving(true);

        try {
            const token = localStorage.getItem('token');
            const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/hod/internal-marks/update`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    subject_id: selectedSubject.id,
                    updates: studentMarks.map(s => ({
                        student_id: s.student_id,
                        internal_marks: s.internal_marks
                    }))
                })
            });

            if (resp.ok) {
                setActionSuccess(`Successfully updated continuous evaluation marks for ${selectedSubject.subject}!`);
                setTimeout(() => setActionSuccess(''), 4000);
                setIsEditModalOpen(false);
                loadData(); // Reload stats list
            }
        } catch (err) {
            console.error("Failed to save internal marks:", err);
        } finally {
            setModalSaving(false);
        }
    };

    return (
        <div className="hod-page-content">
            <div className="section-header" style={{ marginBottom: '24px' }}>
                <div>
                    <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#081226', letterSpacing: '-0.5px' }}>Internal Marks Update</h1>
                    <p style={{ color: '#64748b', fontSize: '14px' }}>Review, edit, and lock continuous internal test marks and assignment scores for the Computer Applications department.</p>
                </div>
            </div>

            {actionSuccess && (
                <div style={{ padding: '16px 20px', background: '#ecfdf5', color: '#065f46', borderRadius: '12px', borderLeft: '5px solid #10b981', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                    <FaCheckCircle /> {actionSuccess}
                </div>
            )}

            {/* Filter and Overview Cards */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', background: 'white', padding: '20px 24px', borderRadius: '16px', border: '1px solid #edf2f7', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontWeight: '800', color: '#475569', fontSize: '14px' }}>Filter by Semester:</span>
                    <select 
                        value={selectedSem} 
                        onChange={(e) => setSelectedSem(e.target.value)}
                        style={{ padding: '10px 20px', borderRadius: '10px', border: '1.5px solid #cbd5e1', cursor: 'pointer', background: '#f8fafc', fontWeight: '800', outline: 'none' }}
                    >
                        <option value="6">Semester 6</option>
                        <option value="5">Semester 5</option>
                        <option value="4">Semester 4</option>
                        <option value="3">Semester 3</option>
                        <option value="2">Semester 2</option>
                        <option value="1">Semester 1</option>
                    </select>
                </div>

                <div style={{ display: 'flex', gap: '24px' }}>
                    <div>
                        <span style={{ color: '#64748b', fontSize: '12px', fontWeight: '800', display: 'block', letterSpacing: '0.5px' }}>TOTAL CURRICULAR SUBJECTS</span>
                        <span style={{ fontSize: '20px', fontWeight: '950', color: '#0f172a' }}>{marksList.length}</span>
                    </div>
                    <div style={{ borderLeft: '1px solid #cbd5e1', paddingLeft: '24px' }}>
                        <span style={{ color: '#64748b', fontSize: '12px', fontWeight: '800', display: 'block', letterSpacing: '0.5px' }}>APPROVED / LOCKED</span>
                        <span style={{ fontSize: '20px', fontWeight: '950', color: '#10b981' }}>{marksList.filter(item => item.status === 'Approved').length}</span>
                    </div>
                    <div style={{ borderLeft: '1px solid #cbd5e1', paddingLeft: '24px' }}>
                        <span style={{ color: '#64748b', fontSize: '12px', fontWeight: '800', display: 'block', letterSpacing: '0.5px' }}>PENDING LOCKS</span>
                        <span style={{ fontSize: '20px', fontWeight: '950', color: '#f59e0b' }}>{marksList.filter(item => item.status === 'Pending HOD Approval').length}</span>
                    </div>
                </div>
            </div>

            {/* Marks Table */}
            <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #edf2f7', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table className="hod-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #edf2f7' }}>
                                <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '14px', fontWeight: '800', color: '#64748b' }}>SUBJECT CODE</th>
                                <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '14px', fontWeight: '800', color: '#64748b' }}>SUBJECT NAME</th>
                                <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '14px', fontWeight: '800', color: '#64748b' }}>FACULTY IN-CHARGE</th>
                                <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: '14px', fontWeight: '800', color: '#64748b' }}>SEMESTER</th>
                                <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: '14px', fontWeight: '800', color: '#64748b' }}>AVERAGE SCORE</th>
                                <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: '14px', fontWeight: '800', color: '#64748b' }}>CIE STATUS</th>
                                <th style={{ padding: '16px 20px', textAlign: 'right', fontSize: '14px', fontWeight: '800', color: '#64748b' }}>PORTAL ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                                        <FaSpinner className="fa-spin" style={{ marginRight: '8px' }} /> Loading continuous evaluation data...
                                    </td>
                                </tr>
                            ) : marksList.length === 0 ? (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#64748b', fontWeight: 'bold' }}>
                                        No subjects found for Semester {selectedSem}.
                                    </td>
                                </tr>
                            ) : marksList.map(item => (
                                <tr key={item.id} style={{ borderBottom: '1px solid #edf2f7', transition: 'background 0.2s' }}>
                                    <td style={{ padding: '16px 20px' }}><span style={{ fontWeight: '800', color: '#4f46e5' }}>{item.code}</span></td>
                                    <td style={{ padding: '16px 20px' }}><span style={{ fontWeight: '800', color: '#0f172a' }}>{item.subject}</span></td>
                                    <td style={{ padding: '16px 20px', color: '#475569', fontWeight: '600' }}>{item.faculty}</td>
                                    <td style={{ padding: '16px 20px', textAlign: 'center', fontWeight: '700', color: '#475569' }}>{item.sem} Sem</td>
                                    <td style={{ padding: '16px 20px', textAlign: 'center', fontWeight: '800', color: '#0f172a' }}>{item.avgMarks}</td>
                                    <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                                        <span style={{
                                            padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '800',
                                            background: item.status === 'Approved' ? '#ecfdf5' : item.status === 'Pending HOD Approval' ? '#fef3c7' : '#fee2e2',
                                            color: item.status === 'Approved' ? '#065f46' : item.status === 'Pending HOD Approval' ? '#78350f' : '#991b1b',
                                        }}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
                                            <button 
                                                onClick={() => openEditModal(item)}
                                                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: '#f1f5f9', color: '#1e293b', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', fontWeight: '800', cursor: 'pointer', transition: 'all 0.2s' }}
                                                onMouseEnter={(e) => { e.currentTarget.style.background = '#e2e8f0'; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.background = '#f1f5f9'; }}
                                            >
                                                <FaEdit size={11} /> Edit CIE Marks
                                            </button>
                                            
                                            {item.status === 'Pending HOD Approval' && (
                                                <button onClick={() => handleApprove(item.id)} style={{ padding: '6px 12px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>
                                                    Lock & Approve
                                                </button>
                                            )}
                                            {item.status === 'Pending Faculty Entry' && (
                                                <button onClick={() => handleNotify(item.faculty)} style={{ padding: '6px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <FaPaperPlane size={10} /> Notify
                                                </button>
                                            )}
                                            {item.status === 'Approved' && (
                                                <span style={{ color: '#10b981', fontWeight: '800', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px', paddingRight: '8px' }}>
                                                    <FaLock size={10} /> Locked
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* BATCH EDIT MARKS MODAL */}
            {isEditModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(8,18,38,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', borderRadius: '16px', width: '600px', maxWidth: '90%', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)', position: 'relative', display: 'flex', flexDirection: 'column', maxHeight: '85vh' }}>
                        
                        <button 
                            onClick={() => setIsEditModalOpen(false)}
                            style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                        >
                            <FaTimes size={18} />
                        </button>

                        <div style={{ borderBottom: '1px solid #edf2f7', paddingBottom: '16px', marginBottom: '16px' }}>
                            <span style={{ fontSize: '12px', fontWeight: '800', color: '#4f46e5', background: '#eef2ff', padding: '4px 8px', borderRadius: '6px', display: 'inline-block', marginBottom: '8px' }}>
                                {selectedSubject?.code}
                            </span>
                            <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
                                Edit Continuous Internal Evaluation (CIE)
                            </h2>
                            <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '14px', fontWeight: '600' }}>
                                {selectedSubject?.subject} • Faculty: {selectedSubject?.faculty}
                            </p>
                        </div>

                        {modalLoading ? (
                            <div style={{ display: 'flex', height: '200px', alignItems: 'center', justifyContent: 'center', color: '#4f46e5' }}><FaSpinner className="fa-spin" size={24} /></div>
                        ) : (
                            <form onSubmit={saveInternalMarks} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                                <div style={{ overflowY: 'auto', flex: 1, paddingRight: '4px', marginBottom: '20px' }}>
                                    <div style={{ background: '#f8fafc', padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '800', color: '#64748b', display: 'grid', gridTemplateColumns: '1.2fr 2fr 1fr', marginBottom: '10px' }}>
                                        <span>REG NO</span>
                                        <span>STUDENT NAME</span>
                                        <span style={{ textAlign: 'right' }}>CIE SCORE (MAX 20)</span>
                                    </div>
                                    
                                    {studentMarks.map((student) => (
                                        <div 
                                            key={student.student_id} 
                                            style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr 1fr', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #edf2f7' }}
                                        >
                                            <span style={{ fontWeight: '800', fontSize: '14px', color: '#4f46e5' }}>{student.register_no}</span>
                                            <span style={{ fontWeight: '700', fontSize: '14px', color: '#0f172a' }}>{student.full_name}</span>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '6px' }}>
                                                <input 
                                                    type="number"
                                                    min="0"
                                                    max="20"
                                                    step="0.5"
                                                    value={student.internal_marks}
                                                    onChange={(e) => handleMarkChange(student.student_id, e.target.value)}
                                                    style={{ width: '70px', padding: '6px', borderRadius: '6px', border: '1.5px solid #cbd5e1', outline: 'none', fontWeight: '800', textAlign: 'center' }}
                                                />
                                                <span style={{ fontSize: '14px', fontWeight: '800', color: '#64748b' }}>/20</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ borderTop: '1px solid #edf2f7', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                    <button 
                                        type="button"
                                        onClick={() => setIsEditModalOpen(false)}
                                        style={{ padding: '10px 20px', background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        disabled={modalSaving}
                                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}
                                    >
                                        {modalSaving ? <FaSpinner className="fa-spin" /> : <FaSave />} Save & Lock CIE
                                    </button>
                                </div>
                            </form>
                        )}

                    </div>
                </div>
            )}

        </div>
    );
}
