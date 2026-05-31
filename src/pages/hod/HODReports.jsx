import React, { useState } from 'react';
import { FaFilePdf, FaFileExcel, FaDownload, FaChartLine, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './HOD.css';

export default function HODReports() {
    const [generatingReport, setGeneratingReport] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');
    const [downloadingAll, setDownloadingAll] = useState(false);

    const reportsList = [
        { title: "BCA Semester 6 Performance Sheet", type: "PDF", desc: "Detailed summary of all student grades, SGPA, and exam registration outcomes.", category: "Academic" },
        { title: "Department Attendance Roster (All Semesters)", type: "Excel", desc: "Detailed compilation of student attendance percentages with low-attendance warnings.", category: "Attendance" },
        { title: "Faculty Continuous Evaluation Audit", type: "PDF", desc: "Audit trail of internal marks, assignments, and test scores uploaded by faculty members.", category: "Audit" },
        { title: "Overall Department Enrollment Analysis", type: "Excel", desc: "Detailed analysis of student counts, genders, courses, and fees summary.", category: "Management" }
    ];

    const handleDownload = (reportName) => {
        setGeneratingReport(reportName);
        setSuccessMsg('');
        
        setTimeout(() => {
            setGeneratingReport(null);
            setSuccessMsg(`"${reportName}" compiled and downloaded successfully!`);
            setTimeout(() => setSuccessMsg(''), 4000);
        }, 1500);
    };

    const handleDownloadAll = () => {
        setDownloadingAll(true);
        setTimeout(() => {
            const doc = new jsPDF();
            
            // Header
            doc.setFillColor(37, 99, 235); // Blue primary
            doc.rect(0, 0, 210, 40, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(22);
            doc.setFont("helvetica", "bold");
            doc.text("Department Audit & Reports", 15, 25);
            
            // Subtitle
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text(`Generated on: ${new Date().toLocaleString()}`, 15, 33);
            
            // Summary Metrics
            doc.setTextColor(30, 41, 59);
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.text("System Summary Metrics", 15, 55);
            
            doc.setFontSize(11);
            doc.setFont("helvetica", "normal");
            doc.text("• Department Pass Rate: 94.2%", 15, 65);
            doc.text("• Reports Compiled: 42 Sheets", 15, 73);
            doc.text("• Audit Outcomes: 100% Compliant", 15, 81);
            
            // Reports Table
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.text("Available System Reports", 15, 100);
            
            const tableData = reportsList.map((r, i) => [
                (i + 1).toString(),
                r.title,
                r.category,
                r.type,
                r.desc
            ]);
            
            doc.autoTable({
                startY: 105,
                head: [['#', 'Report Title', 'Category', 'Format', 'Description']],
                body: tableData,
                theme: 'grid',
                headStyles: { fillColor: [15, 23, 42], textColor: 255, fontSize: 12, fontStyle: 'bold' },
                bodyStyles: { fontSize: 12, textColor: 50 },
                columnStyles: {
                    0: { cellWidth: 10 },
                    1: { cellWidth: 55 },
                    2: { cellWidth: 25 },
                    3: { cellWidth: 20 },
                    4: { cellWidth: 'auto' }
                },
                alternateRowStyles: { fillColor: [248, 250, 252] }
            });
            
            doc.save("Department_Audit_Report.pdf");
            setDownloadingAll(false);
            setSuccessMsg("Consolidated PDF Report downloaded successfully!");
            setTimeout(() => setSuccessMsg(''), 4000);
        }, 1000);
    };

    return (
        <div className="hod-dashboard-container">
            <div className="hod-dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1>Department Reports Portal</h1>
                    <p>Compile, view, and download formal academic audit sheets and overall student roster lists.</p>
                </div>
                <button 
                    onClick={handleDownloadAll}
                    disabled={downloadingAll}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px',
                        background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px',
                        fontSize: '14px', fontWeight: 'bold', cursor: downloadingAll ? 'not-allowed' : 'pointer',
                        boxShadow: '0 4px 6px -1px rgba(37,99,235,0.2)', transition: 'all 0.2s'
                    }}
                >
                    {downloadingAll ? <FaSpinner className="fa-spin" /> : <FaDownload />}
                    {downloadingAll ? 'Generating PDF...' : 'Download All Reports PDF'}
                </button>
            </div>

            {successMsg && (
                <div style={{ padding: '16px', background: '#ecfdf5', color: '#065f46', borderRadius: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                    <FaCheckCircle /> {successMsg}
                </div>
            )}

            {/* Overall stats widgets */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
                <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ background: '#eef2ff', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5', fontSize: '18px' }}>
                        <FaChartLine />
                    </div>
                    <div>
                        <span style={{ color: '#64748b', fontSize: '14px', fontWeight: 'bold', display: 'block' }}>DEPARTMENT PASS RATE</span>
                        <span style={{ fontSize: '20px', fontWeight: '900', color: '#1e293b' }}>94.2%</span>
                    </div>
                </div>
                <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ background: '#ecfdf5', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', fontSize: '18px' }}>
                        <FaFilePdf />
                    </div>
                    <div>
                        <span style={{ color: '#64748b', fontSize: '14px', fontWeight: 'bold', display: 'block' }}>REPORTS COMPILED</span>
                        <span style={{ fontSize: '20px', fontWeight: '900', color: '#1e293b' }}>42 Sheets</span>
                    </div>
                </div>
                <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ background: '#fffbeb', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b', fontSize: '18px' }}>
                        <FaFileExcel />
                    </div>
                    <div>
                        <span style={{ color: '#64748b', fontSize: '14px', fontWeight: 'bold', display: 'block' }}>AUDIT OUTCOMES</span>
                        <span style={{ fontSize: '20px', fontWeight: '900', color: '#1e293b' }}>100% Compliant</span>
                    </div>
                </div>
            </div>

            {/* Reports List */}
            <div className="hod-card">
                <div className="hod-card-header">
                    <h2>Available System Reports</h2>
                </div>
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {reportsList.map((rep, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', border: '1px solid #edf2f7', borderRadius: '12px', background: '#f8fafc', hover: { background: '#f1f5f9' } }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{
                                    width: '44px', height: '44px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
                                    background: rep.type === 'PDF' ? '#ffe4e6' : '#dbeafe',
                                    color: rep.type === 'PDF' ? '#be123c' : '#1e40af'
                                }}>
                                    {rep.type === 'PDF' ? <FaFilePdf /> : <FaFileExcel />}
                                </div>
                                <div>
                                    <span style={{ fontSize: '12px', background: '#e2e8f0', color: '#475569', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold', display: 'inline-block', marginBottom: '4px' }}>
                                        {rep.category}
                                    </span>
                                    <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#1e293b' }}>{rep.title}</h4>
                                    <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#64748b' }}>{rep.desc}</p>
                                </div>
                            </div>

                            <button 
                                onClick={() => handleDownload(rep.title)}
                                disabled={generatingReport !== null}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer',
                                    background: '#4f46e5', color: '#fff'
                                }}
                            >
                                {generatingReport === rep.title ? (
                                    <>
                                        <FaSpinner className="fa-spin" /> Compiling...
                                    </>
                                ) : (
                                    <>
                                        <FaDownload /> Download {rep.type}
                                    </>
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
