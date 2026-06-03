import React, { useState, useEffect } from 'react';
import { FaTimes, FaSpinner, FaChevronDown, FaChevronUp, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function DetailedMarksModal({ onClose }) {
    const [marksData, setMarksData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedStudents, setExpandedStudents] = useState({});

    useEffect(() => {
        const fetchMarks = async () => {
            try {
                const token = localStorage.getItem('token');
                const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/hod/students/all_marks`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!resp.ok) throw new Error('Failed to fetch marks data');
                const data = await resp.json();
                
                // Group by student
                const grouped = data.reduce((acc, curr) => {
                    if (!acc[curr.student_id]) {
                        acc[curr.student_id] = {
                            student_id: curr.student_id,
                            register_no: curr.register_no,
                            full_name: curr.full_name,
                            semester: curr.semester,
                            subjects: [],
                            total_marks: 0,
                            max_possible: 0,
                            has_failed: false
                        };
                    }
                    
                    const int_m = parseFloat(curr.internal_marks) || 0;
                    const ext_m = parseFloat(curr.external_marks) || 0;
                    const tot_m = int_m + ext_m;
                    const is_pass = (ext_m >= 21) && (tot_m >= 40);
                    
                    acc[curr.student_id].subjects.push({
                        name: curr.subject,
                        internal: int_m,
                        external: ext_m,
                        total: tot_m,
                        result: is_pass ? 'Pass' : 'Fail'
                    });
                    
                    acc[curr.student_id].total_marks += tot_m;
                    acc[curr.student_id].max_possible += 100;
                    if (!is_pass) acc[curr.student_id].has_failed = true;
                    
                    return acc;
                }, {});
                
                setMarksData(Object.values(grouped));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMarks();
    }, []);

    const toggleStudent = (id) => {
        setExpandedStudents(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div style={{ position:'fixed', inset:0, background:'rgba(8,18,38,0.55)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(4px)' }}
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
            <div style={{ background:'#fff', borderRadius:20, padding:'32px 36px', width:'90%', maxWidth:1000, maxHeight:'85vh', display:'flex', flexDirection:'column', boxShadow:'0 20px 60px rgba(0,0,0,0.2)', position:'relative' }}>
                
                <button onClick={onClose} style={{ position:'absolute', top:24, right:24, background:'#f1f5f9', border:'none', borderRadius:'50%', width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'#64748b', fontSize: 18, transition:'all 0.2s' }}>
                    <FaTimes />
                </button>

                <div style={{ marginBottom:24 }}>
                    <h2 style={{ fontSize: 20, fontWeight:900, color:'#081226', margin:0 }}>Detailed Student Academic Performance</h2>
                    <p style={{ color:'#64748b', fontSize: 14, marginTop:6 }}>
                        Comprehensive view of all students' internal and external marks across subjects.
                    </p>
                </div>

                <div style={{ flex:1, overflowY:'auto', paddingRight:8 }}>
                    {loading ? (
                        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:60, color:'#64748b' }}>
                            <FaSpinner className="fa-spin" style={{ fontSize: 20, marginBottom:16, color:'#4f46e5' }} />
                            <p style={{ fontWeight:600 }}>Loading academic records...</p>
                        </div>
                    ) : error ? (
                        <div style={{ background:'#fef2f2', color:'#b91c1c', padding:20, borderRadius:12, fontWeight:700, textAlign:'center' }}>
                            {error}
                        </div>
                    ) : marksData.length === 0 ? (
                        <div style={{ textAlign:'center', padding:40, color:'#64748b', fontWeight:600 }}>
                            No marks data found for students.
                        </div>
                    ) : (
                        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                            {marksData.map(student => (
                                <div key={student.student_id} style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, overflow:'hidden', boxShadow:'0 2px 4px rgba(0,0,0,0.02)' }}>
                                    
                                    {/* Student Header Row */}
                                    <div 
                                        onClick={() => toggleStudent(student.student_id)}
                                        style={{ display:'flex', alignItems:'center', padding:'16px 20px', cursor:'pointer', background: expandedStudents[student.student_id] ? '#f8fafc' : '#fff', transition:'background 0.2s' }}
                                    >
                                        <div style={{ flex:2 }}>
                                            <div style={{ fontWeight:800, color:'#0f172a', fontSize: 14 }}>{student.full_name}</div>
                                            <div style={{ color:'#64748b', fontSize: 14, fontWeight:700, marginTop:4 }}>{student.register_no} • {student.semester} Sem</div>
                                        </div>
                                        
                                        <div style={{ flex:1, textAlign:'center' }}>
                                            <span style={{ fontSize: 14, color:'#64748b', fontWeight:700, display:'block', marginBottom:4 }}>TOTAL MARKS</span>
                                            <span style={{ fontSize: 18, fontWeight:900, color:'#0f172a' }}>{student.total_marks}</span>
                                            <span style={{ fontSize: 14, color:'#94a3b8', fontWeight:700 }}> / {student.max_possible}</span>
                                        </div>
                                        
                                        <div style={{ flex:1, textAlign:'center' }}>
                                            <span style={{ fontSize: 14, color:'#64748b', fontWeight:700, display:'block', marginBottom:4 }}>OVERALL RESULT</span>
                                            <span style={{ padding:'4px 10px', borderRadius:20, fontSize: 14, fontWeight:800, 
                                                background: student.has_failed ? '#fef2f2' : '#ecfdf5',
                                                color: student.has_failed ? '#dc2626' : '#10b981',
                                                display:'inline-flex', alignItems:'center', gap:4
                                            }}>
                                                {student.has_failed ? <><FaTimesCircle /> Failed</> : <><FaCheckCircle /> Passed</>}
                                            </span>
                                        </div>
                                        
                                        <div style={{ paddingLeft:16, color:'#94a3b8' }}>
                                            {expandedStudents[student.student_id] ? <FaChevronUp /> : <FaChevronDown />}
                                        </div>
                                    </div>
                                    
                                    {/* Expanded Subjects Table */}
                                    {expandedStudents[student.student_id] && (
                                        <div style={{ borderTop:'1px solid #e2e8f0', background:'#f8fafc', padding:'16px 20px' }}>
                                            <table style={{ width:'100%', borderCollapse:'collapse' }}>
                                                <thead>
                                                    <tr>
                                                        <th style={{ textAlign:'left', padding:'8px 12px', fontSize: 12, fontWeight:800, color:'#64748b', textTransform:'uppercase' }}>Subject Name</th>
                                                        <th style={{ textAlign:'center', padding:'8px 12px', fontSize: 12, fontWeight:800, color:'#64748b', textTransform:'uppercase' }}>Internal (40)</th>
                                                        <th style={{ textAlign:'center', padding:'8px 12px', fontSize: 12, fontWeight:800, color:'#64748b', textTransform:'uppercase' }}>External (60)</th>
                                                        <th style={{ textAlign:'center', padding:'8px 12px', fontSize: 12, fontWeight:800, color:'#64748b', textTransform:'uppercase' }}>Total (100)</th>
                                                        <th style={{ textAlign:'center', padding:'8px 12px', fontSize: 12, fontWeight:800, color:'#64748b', textTransform:'uppercase' }}>Result</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {student.subjects.map((sub, idx) => (
                                                        <tr key={idx} style={{ borderBottom: idx === student.subjects.length - 1 ? 'none' : '1px solid #e2e8f0' }}>
                                                            <td style={{ padding:'12px', fontSize: 14, fontWeight:700, color:'#334155' }}>{sub.name}</td>
                                                            <td style={{ padding:'12px', fontSize: 14, fontWeight:700, color:'#475569', textAlign:'center' }}>{sub.internal}</td>
                                                            <td style={{ padding:'12px', fontSize: 14, fontWeight:700, color:'#475569', textAlign:'center' }}>{sub.external}</td>
                                                            <td style={{ padding:'12px', fontSize: 14, fontWeight:800, color:'#0f172a', textAlign:'center' }}>{sub.total}</td>
                                                            <td style={{ padding:'12px', fontSize: 14, fontWeight:700, textAlign:'center' }}>
                                                                <span style={{ color: sub.result === 'Pass' ? '#10b981' : '#dc2626' }}>
                                                                    {sub.result}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
