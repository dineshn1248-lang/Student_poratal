import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
    FaUsers, FaGraduationCap, FaExclamationCircle, FaUserTimes, 
    FaSearch, FaFilter, FaDownload, FaEye, FaUserCircle, FaTimes
} from 'react-icons/fa';
import './Principal.css';

export default function PrincipalStudents() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All');
    const [expandedStudent, setExpandedStudent] = useState(null);
    const [activeSemTab, setActiveSemTab] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const [selectedDepartment, setSelectedDepartment] = useState(location.state?.department || 'All');
    const [selectedSection, setSelectedSection] = useState('All');

    const [stats, setStats] = useState({
        total: 0,
        passed: 0,
        failed: 0,
        backlog: 0
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const resp = await fetch(`${'https://student-poratal.onrender.com/api'}/hod/students/all_marks?department=${selectedDepartment}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await resp.json();

            if (resp.ok) {
                // Group by student
                const studentMap = {};
                data.forEach(m => {
                    if (!studentMap[m.student_id]) {
                        studentMap[m.student_id] = {
                            id: m.student_id,
                            register_no: m.register_no,
                            full_name: m.full_name,
                            semester: m.current_semester || m.semester,
                            section: m.section,
                            cgpa: m.cgpa,
                            total_possible: 0,
                            total_obtained: 0,
                            has_failed: false,
                            subjects: []
                        };
                    }
                    const int_m = parseFloat(m.internal_marks) || 0;
                    const ext_m = parseFloat(m.external_marks) || 0;
                    const total = int_m + ext_m;
                    const is_pass = m.result === 'Pass';
                    
                    studentMap[m.student_id].total_possible += 100;
                    studentMap[m.student_id].total_obtained += total;
                    if (!is_pass) studentMap[m.student_id].has_failed = true;

                    // Calculate a simple mock grade/grade points
                    let grade = 'F';
                    let gradePoints = 0;
                    if (is_pass) {
                        if (total >= 90) { grade = 'O'; gradePoints = 10; }
                        else if (total >= 80) { grade = 'A+'; gradePoints = 9; }
                        else if (total >= 70) { grade = 'A'; gradePoints = 8; }
                        else if (total >= 60) { grade = 'B+'; gradePoints = 7; }
                        else if (total >= 50) { grade = 'B'; gradePoints = 6; }
                        else { grade = 'C'; gradePoints = 5; }
                    }

                    studentMap[m.student_id].subjects.push({
                        code: m.subject.substring(0, 4).toUpperCase(),
                        name: m.subject,
                        semester: m.subject_semester,
                        max_marks: 100,
                        ia_marks: int_m,
                        see_marks: ext_m,
                        total_marks: total,
                        credits: 3,
                        grade: grade,
                        grade_points: (gradePoints * 3),
                        result: is_pass ? 'PASS' : 'FAIL'
                    });
                });

                let totalCount = 0;
                let passCount = 0;
                let failCount = 0;
                let backlogCount = 0;

                const processed = Object.values(studentMap).map(s => {
                    totalCount++;
                    const cgpa = s.cgpa ? parseFloat(s.cgpa).toFixed(2) : "0.00";
                    const sgpa = cgpa; // Keep them synced for now
                    const result = s.has_failed ? 'FAIL' : 'PASS';

                    if (!s.has_failed) passCount++;
                    else {
                        failCount++;
                        backlogCount++;
                    }

                    return { ...s, sgpa, cgpa, resultStatus: result };
                });

                setStats({ total: totalCount, passed: passCount, failed: failCount, backlog: backlogCount });
                setStudents(processed.sort((a, b) => a.register_no.localeCompare(b.register_no)));
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const toggleExpand = (studentId, currentSem) => {
        if (expandedStudent === studentId) {
            setExpandedStudent(null);
        } else {
            setExpandedStudent(studentId);
            setActiveSemTab(currentSem || 1);
        }
    };

    const filteredStudents = students.filter(s => {
        if (activeTab === 'Passed Students' && s.resultStatus !== 'PASS') return false;
        if (activeTab === 'Failed Students' && s.resultStatus !== 'FAIL') return false;
        if (activeTab === 'Backlog Students' && s.resultStatus !== 'FAIL') return false;
        if (selectedSection !== 'All' && s.section !== selectedSection) return false;
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            return s.full_name.toLowerCase().includes(q) || s.register_no.toLowerCase().includes(q);
        }
        return true;
    });

    return (
        <main className="principal-page-content" style={{ backgroundColor: '#f8fafc', paddingBottom: '40px' }}>
            <div className="page-header" style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a' }}>{selectedDepartment === 'All' ? 'All Students' : `${selectedDepartment} Students`}</h1>
                <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>View and manage student records</p>
            </div>

            {/* Top Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: 48, height: 48, background: '#eff6ff', color: '#3b82f6', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                        <FaUsers />
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', color: '#3b82f6', fontWeight: '800', textTransform: 'uppercase' }}>Total Students</div>
                        <div style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a' }}>{stats.total}</div>
                    </div>
                </div>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: 48, height: 48, background: '#ecfdf5', color: '#10b981', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                        <FaGraduationCap />
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', color: '#10b981', fontWeight: '800', textTransform: 'uppercase' }}>Passed Students</div>
                        <div style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a' }}>{stats.passed}</div>
                    </div>
                </div>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: 48, height: 48, background: '#fef2f2', color: '#ef4444', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                        <FaExclamationCircle />
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', color: '#ef4444', fontWeight: '800', textTransform: 'uppercase' }}>Failed Students</div>
                        <div style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a' }}>{stats.failed}</div>
                    </div>
                </div>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: 48, height: 48, background: '#f5f3ff', color: '#8b5cf6', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                        <FaUserTimes />
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', color: '#8b5cf6', fontWeight: '800', textTransform: 'uppercase' }}>Backlog Students</div>
                        <div style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a' }}>{stats.backlog}</div>
                    </div>
                </div>
            </div>

            {/* Tabs and Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {['All Students', 'Passed Students', 'Failed Students', 'Backlog Students'].map(tab => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '8px',
                                fontWeight: '700',
                                fontSize: '14px',
                                cursor: 'pointer',
                                border: 'none',
                                background: activeTab === tab ? '#3b82f6' : '#f1f5f9',
                                color: activeTab === tab ? '#fff' : '#64748b'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ position: 'relative' }}>
                        <FaSearch style={{ position: 'absolute', left: 12, top: 10, color: '#94a3b8', fontSize: 14 }} />
                        <input 
                            type="text" 
                            placeholder="Search by name or register number..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ padding: '8px 12px 8px 32px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', width: '250px' }} 
                        />
                    </div>
                    <button style={{ background: '#3b82f6', color: '#fff', border: 'none', fontWeight: '700', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FaDownload /> Export
                    </button>
                    <select 
                        value={selectedSection}
                        onChange={(e) => setSelectedSection(e.target.value)}
                        style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: '700', color: '#475569', cursor: 'pointer', background: '#fff' }}
                    >
                        <option value="All">All Sections</option>
                        <option value="A">Section A</option>
                        <option value="B">Section B</option>
                    </select>
                </div>
            </div>

            {/* Table Area */}
            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: '#3b82f6', color: '#fff', fontSize: '14px', fontWeight: '800' }}>
                                <th style={{ padding: '12px 20px' }}>#</th>
                                <th style={{ padding: '12px 20px' }}>Register Number</th>
                                <th style={{ padding: '12px 20px' }}>Student Name</th>
                                <th style={{ padding: '12px 20px' }}>Semester</th>
                                <th style={{ padding: '12px 20px', textAlign: 'center' }}>Overall SGPA</th>
                                <th style={{ padding: '12px 20px', textAlign: 'center' }}>CGPA</th>
                                <th style={{ padding: '12px 20px', textAlign: 'center' }}>Result Status</th>
                                <th style={{ padding: '12px 20px', textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading students...</td>
                                </tr>
                            ) : filteredStudents.length === 0 ? (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>No students found.</td>
                                </tr>
                            ) : filteredStudents.map((s, idx) => (
                                <React.Fragment key={s.id}>
                                    <tr style={{ borderBottom: '1px solid #f1f5f9', background: expandedStudent === s.id ? '#f8fafc' : '#fff' }}>
                                        <td style={{ padding: '14px 20px', fontSize: '14px', color: '#64748b', fontWeight: '600' }}>{idx + 1}</td>
                                        <td style={{ padding: '14px 20px', fontSize: '14px', color: '#0f172a', fontWeight: '700' }}>{s.register_no}</td>
                                        <td style={{ padding: '14px 20px', fontSize: '14px', color: '#0f172a', fontWeight: '700' }}>{s.full_name}</td>
                                        <td style={{ padding: '14px 20px', fontSize: '14px', color: '#475569', fontWeight: '600' }}>{['I','II','III','IV','V','VI'][s.semester-1] || 'III'} Semester</td>
                                        <td style={{ padding: '14px 20px', fontSize: '14px', color: '#0f172a', fontWeight: '800', textAlign: 'center' }}>{s.sgpa}</td>
                                        <td style={{ padding: '14px 20px', fontSize: '14px', color: '#0f172a', fontWeight: '800', textAlign: 'center' }}>{s.cgpa}</td>
                                        <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                                            <span style={{ color: s.resultStatus === 'PASS' ? '#10b981' : '#ef4444', fontWeight: '800', fontSize: '14px' }}>
                                                {s.resultStatus}
                                            </span>
                                        </td>
                                        <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                                <button 
                                                    onClick={() => toggleExpand(s.id, s.semester)}
                                                    style={{ background: '#3b82f6', border: 'none', color: '#fff', fontWeight: '700', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                    <FaEye /> View Marks
                                                </button>
                                                <button style={{ background: '#fff', border: '1px solid #cbd5e1', color: '#475569', fontWeight: '700', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                    <FaUserCircle /> Profile
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* EXPANDED ROW */}
                                    {expandedStudent === s.id && (
                                        <tr style={{ background: '#f8fafc' }}>
                                            <td colSpan="8" style={{ padding: '0' }}>
                                                <div style={{ margin: '16px', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#fff', overflow: 'hidden' }}>
                                                    <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>
                                                            Student Marks - {s.full_name} ({s.register_no})
                                                        </h3>
                                                        <button onClick={() => setExpandedStudent(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', fontSize: '18px' }}>
                                                            <FaTimes />
                                                        </button>
                                                    </div>
                                                    
                                                    <div style={{ padding: '16px 20px', display: 'flex', gap: '8px', borderBottom: '1px solid #e2e8f0' }}>
                                                        {[1, 2, 3, 4, 5, 6].map((semNum) => {
                                                            const semMarks = (s.subjects || []).filter(m => String(m.semester) === String(semNum));
                                                            
                                                            let totalInternal = 0;
                                                            let totalExternal = 0;
                                                            let totalMax = 0;
                                                            let earnedPoints = 0;
                                                            let totalCredits = 0;
                                                            
                                                            // Determine overall status
                                                            const hasFails = semMarks.some(m => m.result === 'FAIL');
                                                            const hasMarks = semMarks.length > 0;
                                                            
                                                            let statusColor = '#f59e0b'; // Default yellow for waiting
                                                            let statusText = 'Waiting';
                                                            
                                                            if (hasMarks) {
                                                                statusColor = hasFails ? '#ef4444' : '#10b981';
                                                                statusText = hasFails ? 'Fail' : 'Pass';
                                                            }
                                                            const semText = ['I', 'II', 'III', 'IV', 'V', 'VI'][semNum - 1] + ' Semester';
                                                            return (
                                                                <button 
                                                                    key={semNum} 
                                                                    onClick={() => setActiveSemTab(semNum)}
                                                                    style={{ padding: '6px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '700', border: 'none', cursor: 'pointer',
                                                                        background: (activeSemTab === semNum) ? '#3b82f6' : '#f1f5f9',
                                                                        color: (activeSemTab === semNum) ? '#fff' : '#64748b'
                                                                    }}
                                                                >
                                                                    {semText}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>

                                                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                                        <thead>
                                                            <tr style={{ background: '#3b82f6', color: '#fff', fontSize: '14px', fontWeight: '700' }}>
                                                                <th style={{ padding: '10px 16px' }}>Sl.No.</th>
                                                                <th style={{ padding: '10px 16px' }}>Course Code</th>
                                                                <th style={{ padding: '10px 16px' }}>Course Name</th>
                                                                <th style={{ padding: '10px 16px', textAlign: 'center' }}>Max Marks</th>
                                                                <th style={{ padding: '10px 16px', textAlign: 'center' }}>IA Marks</th>
                                                                <th style={{ padding: '10px 16px', textAlign: 'center' }}>SEE Marks</th>
                                                                <th style={{ padding: '10px 16px', textAlign: 'center' }}>Total Marks</th>
                                                                <th style={{ padding: '10px 16px', textAlign: 'center' }}>Credits</th>
                                                                <th style={{ padding: '10px 16px', textAlign: 'center' }}>Grade</th>
                                                                <th style={{ padding: '10px 16px', textAlign: 'center' }}>Grade Points</th>
                                                                <th style={{ padding: '10px 16px', textAlign: 'center' }}>Result</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {activeSemTab !== 6 && s.subjects.filter(sub => sub.semester === activeSemTab).length > 0 ? (
                                                                s.subjects.filter(sub => sub.semester === activeSemTab).map((sub, i) => (
                                                                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', fontSize: '14px', fontWeight: '600', color: '#475569' }}>
                                                                        <td style={{ padding: '10px 16px' }}>{i + 1}</td>
                                                                        <td style={{ padding: '10px 16px' }}>{sub.code}</td>
                                                                        <td style={{ padding: '10px 16px', color: '#0f172a', fontWeight: '700' }}>{sub.name}</td>
                                                                        <td style={{ padding: '10px 16px', textAlign: 'center' }}>{sub.max_marks}</td>
                                                                        <td style={{ padding: '10px 16px', textAlign: 'center' }}>{sub.ia_marks}</td>
                                                                        <td style={{ padding: '10px 16px', textAlign: 'center' }}>{sub.see_marks}</td>
                                                                        <td style={{ padding: '10px 16px', textAlign: 'center', color: '#0f172a', fontWeight: '800' }}>{sub.total_marks}</td>
                                                                        <td style={{ padding: '10px 16px', textAlign: 'center' }}>{sub.credits}</td>
                                                                        <td style={{ padding: '10px 16px', textAlign: 'center', fontWeight: '800', color: sub.grade === 'F' ? '#ef4444' : '#10b981' }}>{sub.grade}</td>
                                                                        <td style={{ padding: '10px 16px', textAlign: 'center' }}>{sub.grade_points}</td>
                                                                        <td style={{ padding: '10px 16px', textAlign: 'center', fontWeight: '800', color: sub.result === 'FAIL' ? '#ef4444' : '#10b981' }}>{sub.result}</td>
                                                                    </tr>
                                                                ))
                                                            ) : (
                                                                <tr>
                                                                    <td colSpan="11" style={{ textAlign: 'center', padding: '32px 16px', color: '#64748b', fontSize: '14px', fontWeight: '600' }}>
                                                                        No results published for this semester yet.
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>

                                                    <div style={{ padding: '16px 20px', background: '#f8fafc', display: 'flex', gap: '24px', borderTop: '1px solid #e2e8f0', fontSize: '14px' }}>
                                                        {activeSemTab !== 6 && s.subjects.filter(sub => sub.semester === activeSemTab).length > 0 ? (
                                                            <>
                                                                <span style={{ fontWeight: '800', color: '#0f172a' }}>SGPA: {s.sgpa}</span>
                                                                <span style={{ fontWeight: '800', color: '#0f172a' }}>CGPA: {s.cgpa}</span>
                                                                <span style={{ fontWeight: '800', color: '#0f172a' }}>Result: <span style={{ color: '#10b981' }}>PASS</span></span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span style={{ fontWeight: '800', color: '#0f172a' }}>SGPA: <span style={{ color: '#f59e0b' }}>Waiting</span></span>
                                                                <span style={{ fontWeight: '800', color: '#0f172a' }}>CGPA: {s.cgpa}</span>
                                                                <span style={{ fontWeight: '800', color: '#0f172a' }}>Result: <span style={{ color: '#f59e0b' }}>Waiting</span></span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>
                        Showing 1 to {filteredStudents.length} of {stats.total} students
                    </span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        <button style={{ padding: '6px 12px', border: '1px solid #cbd5e1', background: '#fff', borderRadius: '6px', cursor: 'pointer', color: '#64748b' }}>&lt;</button>
                        <button style={{ padding: '6px 12px', border: 'none', background: '#3b82f6', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' }}>1</button>
                        <button style={{ padding: '6px 12px', border: '1px solid #cbd5e1', background: '#fff', borderRadius: '6px', cursor: 'pointer', color: '#64748b' }}>2</button>
                        <button style={{ padding: '6px 12px', border: '1px solid #cbd5e1', background: '#fff', borderRadius: '6px', cursor: 'pointer', color: '#64748b' }}>3</button>
                        <button style={{ padding: '6px 12px', border: '1px solid #cbd5e1', background: '#fff', borderRadius: '6px', cursor: 'pointer', color: '#64748b' }}>&gt;</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
