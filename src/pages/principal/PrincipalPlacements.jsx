import React, { useState, useEffect } from 'react';
import { FaGraduationCap, FaBuilding, FaMoneyBillWave, FaSearch, FaFilter, FaDownload, FaArrowLeft } from 'react-icons/fa';
import './Principal.css';

export default function PrincipalPlacements() {
    const [placements, setPlacements] = useState([]);
    const [stats, setStats] = useState({
        total_placed: 0,
        companies_visited: 0,
        highest_package: "0.0 LPA",
        average_package: "0.0 LPA"
    });
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchPlacements = async () => {
            try {
                const token = localStorage.getItem('token');
                const resp = await fetch(`${import.meta.env.PROD ? 'https://student-poratal.onrender.com/api' : 'http://localhost:5000/api'}/principal/placements`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (resp.ok) {
                    const data = await resp.json();
                    setPlacements(data.placements);
                    setStats({
                        total_placed: data.total_placed,
                        companies_visited: data.companies_visited,
                        highest_package: data.highest_package,
                        average_package: data.average_package
                    });
                }
            } catch (error) {
                console.error("Error fetching placements:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPlacements();
    }, []);

    const filteredPlacements = placements.filter(p => 
        p.student_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.register_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.company_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="principal-page-content" style={{ backgroundColor: '#f8fafc', paddingBottom: '40px', padding: '24px' }}>
            <div className="page-header" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button 
                    onClick={() => window.location.href = '/principal/dashboard'} 
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#3b82f6', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                    <FaArrowLeft /> Back to Dashboard
                </button>
                <div>
                    <h1 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', margin: 0 }}>Placements Dashboard</h1>
                    <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>Overview of student placements and campus recruitment</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: 48, height: 48, background: '#eff6ff', color: '#3b82f6', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                        <FaGraduationCap />
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', color: '#3b82f6', fontWeight: '800', textTransform: 'uppercase' }}>Total Placed</div>
                        <div style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a' }}>{stats.total_placed}</div>
                    </div>
                </div>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: 48, height: 48, background: '#f5f3ff', color: '#8b5cf6', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                        <FaBuilding />
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', color: '#8b5cf6', fontWeight: '800', textTransform: 'uppercase' }}>Companies Visited</div>
                        <div style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a' }}>{stats.companies_visited}</div>
                    </div>
                </div>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: 48, height: 48, background: '#ecfdf5', color: '#10b981', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                        <FaMoneyBillWave />
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', color: '#10b981', fontWeight: '800', textTransform: 'uppercase' }}>Highest Package</div>
                        <div style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a' }}>{stats.highest_package}</div>
                    </div>
                </div>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: 48, height: 48, background: '#fef2f2', color: '#ef4444', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                        <FaMoneyBillWave />
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', color: '#ef4444', fontWeight: '800', textTransform: 'uppercase' }}>Average Package</div>
                        <div style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a' }}>{stats.average_package}</div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '12px', flex: 1, maxWidth: '400px', position: 'relative' }}>
                    <FaSearch style={{ position: 'absolute', left: 12, top: 12, color: '#94a3b8', fontSize: 14 }} />
                    <input 
                        type="text" 
                        placeholder="Search student or company..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ width: '100%', padding: '10px 12px 10px 32px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px' }} 
                    />
                </div>
                <button style={{ background: '#3b82f6', color: '#fff', border: 'none', fontWeight: '700', padding: '10px 16px', borderRadius: '6px', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaDownload /> Export Report
                </button>
            </div>

            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: '#3b82f6', color: '#fff', fontSize: '14px', fontWeight: '800' }}>
                                <th style={{ padding: '12px 20px' }}>Register Number</th>
                                <th style={{ padding: '12px 20px' }}>Student Name</th>
                                <th style={{ padding: '12px 20px' }}>Department</th>
                                <th style={{ padding: '12px 20px' }}>Company</th>
                                <th style={{ padding: '12px 20px' }}>Package (LPA)</th>
                                <th style={{ padding: '12px 20px' }}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading placements...</td>
                                </tr>
                            ) : filteredPlacements.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>No placement records found.</td>
                                </tr>
                            ) : filteredPlacements.map((p, idx) => (
                                <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9', background: '#fff' }}>
                                    <td style={{ padding: '14px 20px', fontSize: '14px', color: '#0f172a', fontWeight: '700' }}>{p.register_no}</td>
                                    <td style={{ padding: '14px 20px', fontSize: '14px', color: '#0f172a', fontWeight: '700' }}>{p.student_name}</td>
                                    <td style={{ padding: '14px 20px', fontSize: '14px', color: '#475569', fontWeight: '600' }}>{p.department}</td>
                                    <td style={{ padding: '14px 20px', fontSize: '14px', color: '#0f172a', fontWeight: '800' }}>{p.company_name}</td>
                                    <td style={{ padding: '14px 20px', fontSize: '14px', color: '#10b981', fontWeight: '800' }}>{p.package}</td>
                                    <td style={{ padding: '14px 20px', fontSize: '14px', color: '#475569' }}>{p.placement_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
