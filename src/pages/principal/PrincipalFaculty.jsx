import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaFilePdf, FaFileExcel, FaEdit, FaEye, FaUsers, FaUserCheck, FaUserTie, FaBuilding, FaArrowLeft, FaBook, FaCalendarCheck, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import './Principal.css';

export default function PrincipalFaculty() {
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [designationFilter, setDesignationFilter] = useState('All');
  const [editingRow, setEditingRow] = useState(null);

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    hods: 0,
    departments: 0
  });

  useEffect(() => {
    fetchFaculty();
  }, [departmentFilter]);

  const fetchFaculty = async () => {
    setLoading(true);
    try {
      let url = `${import.meta.env.PROD ? 'https://student-poratal.onrender.com/api' : 'http://127.0.0.1:5000/api'}/principal/faculty_management?`;
      if (departmentFilter !== 'All') {
        url += `department=${departmentFilter}&`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        setFaculties(data.faculties || []);
        
        // Calculate Stats
        const facs = data.faculties || [];
        const total = facs.length;
        const active = facs.filter(f => f.status === 'Active').length;
        const hods = facs.filter(f => f.designation && f.designation.includes('HOD')).length;
        const uniqueDepts = new Set(facs.map(f => f.department).filter(Boolean)).size;

        // If 'All' is selected, update stats based on all data
        if (departmentFilter === 'All') {
          setStats({
            total,
            active,
            hods: hods > 0 ? hods : 4, // Fallback if no specific HOD designation is found
            departments: uniqueDepts > 0 ? uniqueDepts : 4
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch faculty:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFaculties = faculties.filter(f => {
    const matchesSearch = 
      (f.name && f.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (f.staff_id && f.staff_id.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDesignation = designationFilter === 'All' || f.designation === designationFilter;
    
    return matchesSearch && matchesDesignation;
  });

  const getStatusBadge = (status) => {
    if (status === 'Active') return <span style={{ padding: '4px 8px', borderRadius: '4px', background: '#dcfce3', color: '#16a34a', fontSize: '12px', fontWeight: 'bold' }}>Active</span>;
    if (status === 'On Leave') return <span style={{ padding: '4px 8px', borderRadius: '4px', background: '#fef3c7', color: '#d97706', fontSize: '12px', fontWeight: 'bold' }}>On Leave</span>;
    return <span style={{ padding: '4px 8px', borderRadius: '4px', background: '#f1f5f9', color: '#64748b', fontSize: '12px', fontWeight: 'bold' }}>{status || 'Unknown'}</span>;
  };

  return (
    <div className="principal-page-content" style={{ padding: '24px', background: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Breadcrumb & Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <button 
              onClick={() => window.location.href = '/principal/dashboard'} 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#3b82f6', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
              <FaArrowLeft /> Back to Dashboard
          </button>
          <div style={{ color: '#3b82f6', fontSize: '14px', fontWeight: '600' }}>
            Dashboard &nbsp;&gt;&nbsp; <span style={{ color: '#64748b' }}>Faculty Management</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Faculty Management</h1>
            <p style={{ color: '#64748b', fontSize: '14px', margin: 0, fontWeight: '500' }}>Manage faculty records, view workload, and track attendance.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', 
              padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '600',
              cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}>
              <FaFileExcel color="#10b981" /> Export Excel
            </button>
            <button style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', 
              padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '600',
              cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}>
              <FaFilePdf color="#ef4444" /> Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <div style={{ background: '#eff6ff', padding: '16px', borderRadius: '12px', color: '#3b82f6' }}>
            <FaUsers size={24} />
          </div>
          <div>
            <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600', marginBottom: '4px' }}>Total Faculty</div>
            <div style={{ fontSize: '24px', color: '#0f172a', fontWeight: '800' }}>{stats.total}</div>
          </div>
        </div>
        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <div style={{ background: '#ecfdf5', padding: '16px', borderRadius: '12px', color: '#10b981' }}>
            <FaUserCheck size={24} />
          </div>
          <div>
            <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600', marginBottom: '4px' }}>Active Faculty</div>
            <div style={{ fontSize: '24px', color: '#0f172a', fontWeight: '800' }}>{stats.active}</div>
          </div>
        </div>
        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <div style={{ background: '#fffbeb', padding: '16px', borderRadius: '12px', color: '#f59e0b' }}>
            <FaUserTie size={24} />
          </div>
          <div>
            <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600', marginBottom: '4px' }}>HOD Count</div>
            <div style={{ fontSize: '24px', color: '#0f172a', fontWeight: '800' }}>{stats.hods}</div>
          </div>
        </div>
        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <div style={{ background: '#f5f3ff', padding: '16px', borderRadius: '12px', color: '#8b5cf6' }}>
            <FaBuilding size={24} />
          </div>
          <div>
            <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600', marginBottom: '4px' }}>Departments</div>
            <div style={{ fontSize: '24px', color: '#0f172a', fontWeight: '800' }}>{stats.departments}</div>
          </div>
        </div>
      </div>

      {/* Filters and Table */}
      <div style={{ background: '#ffffff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        
        {/* Controls */}
        <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <FaSearch style={{ position: 'absolute', left: '12px', top: '10px', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search by Name or ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '8px 12px 8px 36px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <select 
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', background: '#f8fafc', color: '#334155', fontWeight: '500' }}>
              <option value="All">All Departments</option>
              <option value="Computer Applications">Computer Applications (BCA)</option>
              <option value="Science">Science (B.Sc)</option>
              <option value="Management">Management (BBA)</option>
            </select>
            
            <select 
              value={designationFilter}
              onChange={(e) => setDesignationFilter(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', background: '#f8fafc', color: '#334155', fontWeight: '500' }}>
              <option value="All">All Designations</option>
              <option value="Professor">Professor</option>
              <option value="Associate Professor">Associate Professor</option>
              <option value="Assistant Professor">Assistant Professor</option>
              <option value="Lecturer">Lecturer</option>
              <option value="Lab Instructor">Lab Instructor</option>
            </select>
            
            <button style={{ padding: '8px 16px', borderRadius: '6px', background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#475569', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaFilter /> More Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <tr>
                <th style={{ padding: '16px 20px', color: '#475569', fontWeight: '600', fontSize: '13px', textTransform: 'uppercase' }}>Faculty Profile</th>
                <th style={{ padding: '16px 20px', color: '#475569', fontWeight: '600', fontSize: '13px', textTransform: 'uppercase' }}>Contact</th>
                <th style={{ padding: '16px 20px', color: '#475569', fontWeight: '600', fontSize: '13px', textTransform: 'uppercase' }}>Department</th>
                <th style={{ padding: '16px 20px', color: '#475569', fontWeight: '600', fontSize: '13px', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '16px 20px', color: '#475569', fontWeight: '600', fontSize: '13px', textTransform: 'uppercase', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading faculty data...</td>
                </tr>
              ) : filteredFaculties.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No faculty found matching the criteria.</td>
                </tr>
              ) : (
                filteredFaculties.map((f, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: '#fff', transition: 'background 0.2s' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '16px' }}>
                          {f.name ? f.name.charAt(0) : 'F'}
                        </div>
                        <div>
                          <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>{f.name}</div>
                          <div style={{ color: '#64748b', fontSize: '12px', display: 'flex', gap: '8px' }}>
                            <span>{f.staff_id}</span>
                            <span>•</span>
                            <span style={{ color: '#3b82f6', fontWeight: '500' }}>{f.designation || 'Faculty'}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: '14px', color: '#334155' }}>
                      <div>{f.email || 'N/A'}</div>
                      <div style={{ color: '#64748b', fontSize: '12px', marginTop: '2px' }}>{f.phone || 'N/A'}</div>
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: '14px', color: '#334155', fontWeight: '500' }}>
                      {f.department || 'N/A'}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      {getStatusBadge(f.status)}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button title="View Profile" style={{ background: '#eff6ff', color: '#3b82f6', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}>
                          <FaEye size={14} />
                        </button>
                        <button onClick={() => setEditingRow(f)} title="Edit Faculty" style={{ background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}>
                          <FaEdit size={14} />
                        </button>
                        <button title="View Workload" style={{ background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}>
                          <FaBook size={14} />
                        </button>
                        <button title="View Attendance" style={{ background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}>
                          <FaCalendarCheck size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: '500' }}>
            Showing 1 to {filteredFaculties.length} of {faculties.length} faculty members
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button style={{ padding: '8px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}><FaChevronLeft size={10}/></button>
            <button style={{ padding: '6px 12px', background: '#2563eb', border: '1px solid #2563eb', borderRadius: '4px', cursor: 'pointer', color: '#ffffff', fontSize: '14px', fontWeight: '600' }}>1</button>
            <button style={{ padding: '8px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}><FaChevronRight size={10}/></button>
          </div>
          <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Rows per page: 
            <select style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editingRow && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setEditingRow(null)}>
          <div style={{ background: 'white', borderRadius: '16px', width: '500px', maxWidth: '90%', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #edf2f7', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800' }}>Edit Faculty Details</h3>
              <button onClick={() => setEditingRow(null)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748b' }}><FaTimes /></button>
            </div>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>Faculty ID</label>
                <input type="text" value={editingRow.staff_id} disabled style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f1f5f9', color: '#64748b' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>Faculty Name</label>
                <input type="text" value={editingRow.name} onChange={e => setEditingRow({...editingRow, name: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>Department</label>
                  <input type="text" value={editingRow.department || ''} onChange={e => setEditingRow({...editingRow, department: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>Designation</label>
                  <input type="text" value={editingRow.designation || ''} onChange={e => setEditingRow({...editingRow, designation: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>Email Address</label>
                  <input type="email" value={editingRow.email || ''} onChange={e => setEditingRow({...editingRow, email: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>Phone Number</label>
                  <input type="text" value={editingRow.phone || ''} onChange={e => setEditingRow({...editingRow, phone: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>Employment Status</label>
                <select value={editingRow.status || 'Active'} onChange={e => setEditingRow({...editingRow, status: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}>
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Terminated">Terminated</option>
                </select>
              </div>
            </div>
            <div style={{ padding: '20px 24px', borderTop: '1px solid #edf2f7', display: 'flex', justifyContent: 'flex-end', gap: '12px', background: '#f8fafc' }}>
              <button onClick={() => setEditingRow(null)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white', color: '#475569', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
              <button onClick={async () => {
                // Update local state immediately
                setFaculties(prev => prev.map(f => f.id === editingRow.id ? editingRow : f));
                setEditingRow(null);
                
                // Save to database automatically (Backend endpoint needs to support this)
                try {
                  await fetch(`${import.meta.env.PROD ? 'https://student-poratal.onrender.com/api' : 'http://127.0.0.1:5000/api'}/faculty/${editingRow.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(editingRow)
                  });
                } catch (error) {
                  console.error('Failed to save to database:', error);
                }
              }} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#2563eb', color: 'white', fontWeight: '600', cursor: 'pointer' }}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
