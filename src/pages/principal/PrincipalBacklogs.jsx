import React, { useState, useEffect } from 'react';
import {
  FaUsers, FaBookOpen, FaCheckCircle, FaLink,
  FaSearch, FaFilter, FaDownload, FaPhoneAlt, FaEnvelope,
  FaBell, FaEllipsisV, FaSpinner, FaEdit, FaTimes, FaSave,
  FaWhatsapp, FaSms, FaPaperPlane, FaMobileAlt
} from 'react-icons/fa';
import { MdVerifiedUser } from 'react-icons/md';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { fetchBacklogStudentList } from '../../api/principalApi';
import { updateHodStudent } from '../../api/hodApi';
import './Principal.css';

/* ── Wave sparkline ── */
const WaveLine = ({ color }) => (
  <svg viewBox="0 0 120 30" style={{ width: '100%', height: 30, marginTop: 8 }}>
    <polyline
      points="0,20 15,14 30,18 45,8 60,14 75,10 90,16 105,6 120,12"
      fill="none" stroke={color} strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const SEM_COLORS = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const TREND_DATA = [
  { month: 'Dec 2025', count: 22 },
  { month: 'Jan 2026', count: 20 },
  { month: 'Feb 2026', count: 18 },
  { month: 'Mar 2026', count: 17 },
  { month: 'Apr 2026', count: 15 },
  { month: 'May 2026', count: 16 },
];

export default function PrincipalBacklogs() {
  const [backlogStudents, setBacklogStudents] = useState([]);
  const [filtered, setFiltered]               = useState([]);
  const [loading, setLoading]                 = useState(true);
  const [search, setSearch]                   = useState('');
  const [semFilter, setSemFilter]             = useState('All');
  const [notified, setNotified]               = useState('');

  // Edit modal state
  const [editModal, setEditModal]         = useState(false);
  const [editStudent, setEditStudent]     = useState(null);
  const [editPhone, setEditPhone]         = useState('');
  const [editEmail, setEditEmail]         = useState('');
  const [saving, setSaving]               = useState(false);
  const [saveMsg, setSaveMsg]             = useState('');

  // Notify modal state
  const [notifyModal, setNotifyModal]     = useState(false);
  const [notifyStudent, setNotifyStudent] = useState(null);
  const [notifyMetprincipal, setNotifyMetprincipal]   = useState('Email');
  const [notifyMsg, setNotifyMsg]         = useState('');
  const [sending, setSending]             = useState(false);
  const [sendResult, setSendResult]       = useState(null);

  useEffect(() => { loadData(); }, []);

  useEffect(() => {
    let list = backlogStudents;
    if (semFilter !== 'All') list = list.filter(s => String(s.semester) === semFilter);
    if (search.trim()) list = list.filter(s =>
      s.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      s.register_no?.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(list);
  }, [search, semFilter, backlogStudents]);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchBacklogStudentList();
      setBacklogStudents(data);
      setFiltered(data);
    } catch (e) {
      console.error('Failed to load backlog students:', e);
    } finally {
      setLoading(false);
    }
  };

  const openNotifyModal = (student) => {
    setNotifyStudent(student);
    setNotifyMetprincipal('Email');
    setNotifyMsg('');
    setSendResult(null);
    setNotifyModal(true);
  };

  const closeNotifyModal = () => {
    setNotifyModal(false);
    setNotifyStudent(null);
    setSendResult(null);
  };

  const handleSendNotification = async () => {
    if (!notifyStudent) return;
    setSending(true);
    setSendResult(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/hod/parent-communication/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: notifyStudent.id,
          method: notifyMetprincipal,
          message: notifyMsg || ''
        })
      });
      const data = await res.json();
      if (res.ok) {
        setSendResult({ ok: true, text: data.message || `${notifyMetprincipal} sent successfully!`, recipient: data.recipient });
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

  const openEditModal = (student) => {
    setEditStudent(student);
    setEditPhone(student.parent_phone || '');
    setEditEmail(student.parent_email || '');
    setSaveMsg('');
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
    setEditStudent(null);
    setSaveMsg('');
  };

  const handleSaveContact = async () => {
    if (!editStudent) return;
    setSaving(true);
    try {
      await updateHodStudent(editStudent.id, {
        parent_phone: editPhone,
        parent_email: editEmail
      });
      // Update local state
      setBacklogStudents(prev =>
        prev.map(s => s.id === editStudent.id
          ? { ...s, parent_phone: editPhone, parent_email: editEmail }
          : s
        )
      );
      setSaveMsg('✅ Contact details updated successfully!');
      setTimeout(() => closeEditModal(), 1800);
    } catch (e) {
      setSaveMsg('❌ Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    const csv = [
      ['#','Register No','Student Name','Semester','GPA','Backlogs','Parent Phone','Parent Email','Outreach Status'],
      ...filtered.map((s, i) => [
        i+1, s.register_no, s.full_name, `${s.semester} Sem`,
        s.cgpa||'N/A', s.backlog_count,
        s.parent_phone||'N/A', s.parent_email||'N/A', 'Parent Linked'
      ])
    ].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'backlog-students.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const totalBacklogPapers = backlogStudents.reduce((s, st) => s + st.backlog_count, 0);
  const totalStudents      = backlogStudents.length;

  const semMap = {};
  backlogStudents.forEach(s => {
    const key = s.semester === 2 ? 'II Semester' : s.semester === 4 ? 'IV Semester'
              : s.semester === 6 ? 'VI Semester' : s.semester === 8 ? 'VIII Semester' : 'Others';
    semMap[key] = (semMap[key] || 0) + s.backlog_count;
  });
  const PIE_DATA = Object.entries(semMap).map(([name, value], i) => ({
    name, value, color: SEM_COLORS[i % SEM_COLORS.length]
  }));

  const customTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      return (
        <div style={{ background:'white', border:'1px solid #e2e8f0', borderRadius:8, padding:'10px 14px', boxShadow:'0 4px 12px rgba(0,0,0,0.08)' }}>
          <div style={{ fontWeight:700, color:'#1e293b', fontSize: 14 }}>{payload[0].payload.month || payload[0].name}</div>
          <div style={{ color:'#6366f1', fontWeight:800, fontSize: 14 }}>{payload[0].value}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="principal-page-content">

      {/* ── HEADER ── */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:28 }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <h1 style={{ fontSize: 20, fontWeight:900, color:'#081226', margin:0 }}>Backlog Monitoring Portal</h1>
            <span style={{ background:'#eff6ff', color:'#2563eb', borderRadius:20, padding:'3px 10px', fontSize: 12, fontWeight:800 }}>
              <MdVerifiedUser style={{ verticalAlign:'middle', marginRight:4 }} />LIVE
            </span>
          </div>
          <p style={{ color:'#64748b', fontSize: 14, marginTop:6 }}>
            Track academic backlog counts across all semesters, identify critical cases, and initiate parent outreach.
          </p>
        </div>
      </div>

      {/* ── SUCCESS BANNER ── */}
      {notified && (
        <div style={{ padding:'14px 20px', background:'#ecfdf5', color:'#065f46', borderRadius:10, marginBottom:24, display:'flex', alignItems:'center', gap:10, fontWeight:700, fontSize: 14, border:'1px solid #a7f3d0' }}>
          <FaCheckCircle /> {notified}
        </div>
      )}

      {/* ── STAT CARDS ── */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20, marginBottom:28 }}>
        {[
          { label:'Students with Backlogs', value: loading ? '—' : totalStudents, sub:'Across all semesters', color:'#6366f1', bg:'#eef2ff', icon:<FaUsers /> },
          { label:'Total Active Backlog Papers', value: loading ? '—' : totalBacklogPapers, sub:'Across all programs', color:'#f97316', bg:'#fff7ed', icon:<FaBookOpen /> },
          { label:'Backlog Outreach Rate', value:'100%', sub:'Excellent outreach', color:'#10b981', bg:'#ecfdf5', icon:<FaCheckCircle /> },
          { label:'Parent Linked Students', value: loading ? '—' : `${totalStudents} / ${totalStudents}`, sub:'All cases linked', color:'#2563eb', bg:'#eff6ff', icon:<FaLink /> },
        ].map((c, i) => (
          <div key={i} style={{ background:'#fff', borderRadius:16, padding:'22px 24px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', border:'1px solid #f1f5f9' }}>
            <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:8 }}>
              <div style={{ width:44, height:44, borderRadius:12, background:c.bg, display:'flex', alignItems:'center', justifyContent:'center', color:c.color, fontSize: 18 }}>{c.icon}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight:800, color:'#94a3b8', textTransform:'uppercase', letterSpacing:1 }}>{c.label}</div>
                <div style={{ fontSize: 20, fontWeight:900, color: i===2 ? c.color : '#1e293b', lineHeight:1.1 }}>{c.value}</div>
              </div>
            </div>
            <div style={{ fontSize: 14, color:'#64748b', marginTop:4 }}>{c.sub}</div>
            <WaveLine color={c.color} />
          </div>
        ))}
      </div>

      {/* ── CHARTS ROW ── */}
      <div style={{ display:'grid', gridTemplateColumns:'1.35fr 1fr', gap:22, marginBottom:28 }}>
        {/* Trend */}
        <div style={{ background:'#fff', borderRadius:16, padding:'22px 26px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', border:'1px solid #f1f5f9' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <h3 style={{ fontSize: 14, fontWeight:800, color:'#1e293b', margin:0 }}>Backlogs Trend (Last 6 Months)</h3>
            <select style={{ fontSize: 14, fontWeight:700, color:'#475569', border:'1px solid #e2e8f0', borderRadius:8, padding:'5px 10px', background:'#f8fafc', cursor:'pointer', outline:'none' }}>
              <option>All Programs</option><option>BCA</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={TREND_DATA} margin={{ top:5, right:10, left:-20, bottom:5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill:'#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill:'#94a3b8' }} axisLine={false} tickLine={false} domain={[0,25]} />
              <Tooltip content={customTooltip} />
              <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2.5}
                dot={{ fill:'#6366f1', r:4, strokeWidth:0 }} activeDot={{ r:6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie */}
        <div style={{ background:'#fff', borderRadius:16, padding:'22px 26px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', border:'1px solid #f1f5f9' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <h3 style={{ fontSize: 14, fontWeight:800, color:'#1e293b', margin:0 }}>Backlogs by Semester</h3>
            <select style={{ fontSize: 14, fontWeight:700, color:'#475569', border:'1px solid #e2e8f0', borderRadius:8, padding:'5px 10px', background:'#f8fafc', cursor:'pointer', outline:'none' }}>
              <option>This Semester</option><option>All</option>
            </select>
          </div>
          {PIE_DATA.length === 0 ? (
            <div style={{ height:200, display:'flex', alignItems:'center', justifyContent:'center', color:'#94a3b8', fontSize: 14 }}>No backlog data</div>
          ) : (
            <div style={{ display:'flex', alignItems:'center', gap:16 }}>
              <ResponsiveContainer width={160} height={180}>
                <PieChart>
                  <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={48} outerRadius={78} paddingAngle={3} dataKey="value">
                    {PIE_DATA.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 18, fontWeight:900, fill:'#1e293b' }}>{totalBacklogPapers}</text>
                  <text x="50%" y="63%" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 12, fill:'#64748b' }}>Total Papers</text>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:9 }}>
                {PIE_DATA.map((d, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                      <div style={{ width:10, height:10, borderRadius:3, background:d.color, flexShrink:0 }} />
                      <span style={{ fontSize: 14, color:'#475569', fontWeight:600 }}>{d.name}</span>
                    </div>
                    <span style={{ fontSize: 14, fontWeight:800, color:'#1e293b' }}>
                      {d.value} ({totalBacklogPapers ? Math.round(d.value/totalBacklogPapers*100) : 0}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── TABLE ── */}
      <div style={{ background:'#fff', borderRadius:16, boxShadow:'0 2px 12px rgba(0,0,0,0.06)', border:'1px solid #f1f5f9', overflow:'hidden' }}>
        {/* Table Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'20px 24px', borderBottom:'1px solid #f1f5f9' }}>
          <h2 style={{ fontSize: 18, fontWeight:800, color:'#1e293b', margin:0 }}>Outstanding Backlogs List</h2>
          <div style={{ display:'flex', gap:10, alignItems:'center' }}>
            <div style={{ position:'relative' }}>
              <FaSearch style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'#94a3b8', fontSize: 14 }} />
              <input type="text" placeholder="Search student..." value={search} onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft:34, paddingRight:12, height:38, border:'1px solid #e2e8f0', borderRadius:10, fontSize: 14, outline:'none', background:'#f8fafc', width:200, color:'#1e293b' }} />
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:6, height:38, border:'1px solid #e2e8f0', borderRadius:10, padding:'0 12px', background:'#f8fafc' }}>
              <FaFilter style={{ color:'#64748b', fontSize: 14 }} />
              <select value={semFilter} onChange={e => setSemFilter(e.target.value)}
                style={{ border:'none', background:'transparent', fontSize: 14, fontWeight:600, color:'#475569', outline:'none', cursor:'pointer' }}>
                <option value="All">All Sems</option>
                {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Sem {s}</option>)}
              </select>
            </div>
            <button onClick={handleExport}
              style={{ display:'flex', alignItems:'center', gap:7, height:38, padding:'0 16px', background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:10, fontSize: 14, fontWeight:700, color:'#475569', cursor:'pointer' }}>
              <FaDownload style={{ fontSize: 14 }} /> Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:'#f8fafc' }}>
                {['#','Register No','Student Name','Semester','GPA','Backlogs','Parent Contact','Outreach Status','Actions'].map(h => (
                  <th key={h} style={TH}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="9" style={{ textAlign:'center', padding:40, color:'#6366f1' }}><FaSpinner className="fa-spin" size={24} /></td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan="9" style={{ textAlign:'center', padding:40, color:'#94a3b8', fontSize: 14 }}>🎉 No students with outstanding backlogs found. Excellent!</td></tr>
              ) : (
                filtered.map((student, idx) => (
                  <tr key={student.id} style={{ borderBottom:'1px solid #f1f5f9', transition:'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background='#fafbff'}
                    onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                    <td style={TD}><span style={{ color:'#94a3b8', fontWeight:700, fontSize: 14 }}>{idx+1}</span></td>
                    <td style={TD}><span style={{ fontWeight:800, color:'#2563eb', fontSize: 14, textDecoration:'underline', cursor:'pointer' }}>{student.register_no}</span></td>
                    <td style={TD}><span style={{ fontWeight:700, color:'#1e293b', fontSize: 14 }}>{student.full_name}</span></td>
                    <td style={TD}><span style={{ color:'#475569', fontSize: 14 }}>{student.semester} Sem</span></td>
                    <td style={TD}><span style={{ fontWeight:700, color:'#1e293b', fontSize: 14 }}>{student.cgpa||'N/A'}</span></td>
                    <td style={TD}>
                      <span style={{
                        padding:'4px 12px', borderRadius:20, fontSize: 14, fontWeight:800,
                        background: student.backlog_count>=3 ? '#fee2e2' : student.backlog_count===2 ? '#fff7ed' : '#fef9c3',
                        color: student.backlog_count>=3 ? '#b91c1c' : student.backlog_count===2 ? '#c2410c' : '#854d0e'
                      }}>
                        {student.backlog_count} {student.backlog_count===1?'Paper':'Papers'}
                      </span>
                    </td>

                    {/* Parent Contact — shows phone + email with edit button */}
                    <td style={TD}>
                      <div style={{ fontSize: 14, color:'#475569', lineHeight:2 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                          <FaPhoneAlt style={{ color:'#94a3b8', fontSize: 12 }} />
                          <span>{student.parent_phone || '—'}</span>
                        </div>
                        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                          <FaEnvelope style={{ color:'#94a3b8', fontSize: 12 }} />
                          <span style={{ maxWidth:170, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', display:'inline-block' }}>
                            {student.parent_email || '—'}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td style={TD}>
                      <div style={{ display:'flex', alignItems:'center', gap:6, color:'#10b981', fontWeight:700, fontSize: 14 }}>
                        <div style={{ width:8, height:8, borderRadius:'50%', background:'#10b981' }} />
                        Parent Linked
                      </div>
                    </td>

                    <td style={TD}>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <button onClick={() => openNotifyModal(student)}
                          style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 12px', background:'#eff6ff', color:'#2563eb', border:'1px solid #bfdbfe', borderRadius:8, fontSize: 14, fontWeight:700, cursor:'pointer', whiteSpace:'nowrap', transition:'all 0.2s' }}
                          onMouseEnter={e => { e.currentTarget.style.background='#2563eb'; e.currentTarget.style.color='#fff'; }}
                          onMouseLeave={e => { e.currentTarget.style.background='#eff6ff'; e.currentTarget.style.color='#2563eb'; }}>
                          <FaBell style={{ fontSize: 12 }} /> Notify
                        </button>



                        <button style={{ width:30, height:30, borderRadius:8, border:'1px solid #e2e8f0', background:'#f8fafc', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'#94a3b8' }}>
                          <FaEllipsisV style={{ fontSize: 14 }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!loading && filtered.length > 0 && (
          <div style={{ padding:'14px 24px', borderTop:'1px solid #f1f5f9', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontSize: 14, color:'#64748b', fontWeight:600 }}>Showing {filtered.length} of {backlogStudents.length} students</span>
            <div style={{ display:'flex', gap:6 }}>
              <div style={{ width:32, height:32, borderRadius:8, background:'#2563eb', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize: 14 }}>1</div>
            </div>
          </div>
        )}
      </div>

      {/* ── NOTIFY PARENT MODAL ── */}
      {notifyModal && notifyStudent && (
        <div style={{ position:'fixed', inset:0, background:'rgba(8,18,38,0.55)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(4px)' }}
          onClick={e => { if (e.target === e.currentTarget) closeNotifyModal(); }}>
          <div style={{ background:'#fff', borderRadius:20, padding:'36px 40px', width:480, boxShadow:'0 20px 60px rgba(0,0,0,0.2)', position:'relative' }}>

            <button onClick={closeNotifyModal} style={{ position:'absolute', top:16, right:16, background:'#f1f5f9', border:'none', borderRadius:'50%', width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'#64748b', fontSize: 14 }}>
              <FaTimes />
            </button>

            {/* Title */}
            <div style={{ marginBottom:24 }}>
              <h2 style={{ fontSize: 18, fontWeight:900, color:'#081226', margin:0 }}>Notify Parent</h2>
              <p style={{ color:'#64748b', fontSize: 14, marginTop:6 }}>
                Send academic alert to parent of <strong style={{ color:'#2563eb' }}>{notifyStudent.full_name}</strong>
                <span style={{ marginLeft:8, background:'#f1f5f9', color:'#475569', fontSize: 12, padding:'2px 8px', borderRadius:20, fontWeight:700 }}>{notifyStudent.register_no}</span>
              </p>
            </div>

            {/* Parent contact preview */}
            <div style={{ background:'#f8fafc', borderRadius:12, padding:'12px 16px', marginBottom:20, fontSize: 14, color:'#475569', display:'flex', flexDirection:'column', gap:6, border:'1px solid #e2e8f0' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}><FaPhoneAlt style={{ color:'#6366f1', fontSize: 12 }} /><span><strong>Phone:</strong> {notifyStudent.parent_phone || '—'}</span></div>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}><FaEnvelope style={{ color:'#6366f1', fontSize: 12 }} /><span><strong>Email:</strong> {notifyStudent.parent_email || '—'}</span></div>
            </div>

            {/* Metprincipal selector */}
            <div style={{ marginBottom:20 }}>
              <label style={{ display:'block', fontSize: 14, fontWeight:800, color:'#374151', marginBottom:10, textTransform:'uppercase', letterSpacing:0.5 }}>Send via</label>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
                {[
                  { id:'Email', icon:<FaEnvelope />, color:'#4f46e5', bg:'#eef2ff' },
                  { id:'SMS',   icon:<FaMobileAlt />, color:'#f97316', bg:'#fff7ed' },
                  { id:'WhatsApp', icon:<FaBell />, color:'#10b981', bg:'#ecfdf5' },
                ].map(m => (
                  <button key={m.id} onClick={() => setNotifyMetprincipal(m.id)}
                    style={{ padding:'12px 8px', border: notifyMetprincipal===m.id ? `2px solid ${m.color}` : '1.5px solid #e2e8f0',
                      borderRadius:12, background: notifyMetprincipal===m.id ? m.bg : '#f8fafc',
                      color: notifyMetprincipal===m.id ? m.color : '#94a3b8', fontWeight:800, fontSize: 14,
                      cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:6, transition:'all 0.2s' }}>
                    <span style={{ fontSize: 18 }}>{m.icon}</span>{m.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom message */}
            <div style={{ marginBottom:24 }}>
              <label style={{ display:'block', fontSize: 14, fontWeight:800, color:'#374151', marginBottom:8, textTransform:'uppercase', letterSpacing:0.5 }}>Custom Message <span style={{ color:'#94a3b8', fontWeight:400, textTransform:'none', fontSize: 12 }}>(optional — leave blank for auto-generated)</span></label>
              <textarea value={notifyMsg} onChange={e => setNotifyMsg(e.target.value)}
                placeholder={`Auto message: Dear Parent of ${notifyStudent.full_name}, this is an academic update from Nrupathunga University...`}
                rows={4}
                style={{ width:'100%', padding:'12px 16px', border:'1.5px solid #e2e8f0', borderRadius:12, fontSize: 14, outline:'none', color:'#1e293b', background:'#f8fafc', resize:'none', boxSizing:'border-box', fontFamily:'inherit' }}
                onFocus={e => e.target.style.borderColor='#6366f1'}
                onBlur={e => e.target.style.borderColor='#e2e8f0'}
              />
            </div>

            {/* Result */}
            {sendResult && (
              <div style={{ marginBottom:16, padding:'12px 16px', background: sendResult.ok ? '#ecfdf5' : '#fef2f2', color: sendResult.ok ? '#065f46' : '#b91c1c', borderRadius:10, fontSize: 14, fontWeight:700, border: `1px solid ${sendResult.ok ? '#a7f3d0' : '#fecaca'}` }}>
                {sendResult.ok ? '✅' : '❌'} {sendResult.text}
                {sendResult.ok && sendResult.recipient && <div style={{ fontWeight:400, marginTop:4, fontSize: 14 }}>Sent to: {sendResult.recipient}</div>}
              </div>
            )}

            {/* Buttons */}
            <div style={{ display:'flex', gap:12 }}>
              <button onClick={closeNotifyModal} style={{ flex:1, height:46, background:'#f1f5f9', border:'none', borderRadius:12, fontSize: 14, fontWeight:700, color:'#64748b', cursor:'pointer' }}>Cancel</button>
              <button onClick={handleSendNotification} disabled={sending}
                style={{ flex:2, height:46, background: sending ? '#a5b4fc' : '#4f46e5', border:'none', borderRadius:12, fontSize: 14, fontWeight:800, color:'#fff', cursor: sending ? 'not-allowed' : 'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, transition:'background 0.2s' }}>
                {sending ? <><FaSpinner className="fa-spin" /> Sending...</> : <><FaPaperPlane /> Send {notifyMetprincipal}</>}
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}

const TH = {
  padding:'13px 18px', textAlign:'left', fontSize: 12, fontWeight:800,
  color:'#64748b', textTransform:'uppercase', letterSpacing:'0.5px',
  borderBottom:'1px solid #f1f5f9', whiteSpace:'nowrap',
};
const TD = { padding:'15px 18px', fontSize: 14, verticalAlign:'middle' };
