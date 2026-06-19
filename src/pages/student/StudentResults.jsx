import { useState, useEffect } from "react";
import { FaGraduationCap, FaChartBar, FaAward, FaBook, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import StudentLayout from "./StudentLayout";
import "./Student.css";

export default function StudentResults() {
  const [resultsBySem, setResultsBySem] = useState({});
  const [selectedSem, setSelectedSem] = useState("");
  const [availableSems, setAvailableSems] = useState([]);

  const [results, setResults] = useState([]);
  const [gpaData, setGpaData] = useState([]);
  const [sgpa, setSgpa] = useState("8.40");
  const [cgpa, setCgpa] = useState("8.22");
  const [credits, setCredits] = useState("84 / 160");
  const [backlogs, setBacklogs] = useState("Yes");
  const [progress, setProgress] = useState("52%");
  const [loading, setLoading] = useState(true);

  const handleSemChange = (e) => {
    const sem = e.target.value;
    setSelectedSem(sem);
    const semGpa = gpaData.find(g => g.name === `Sem ${sem}`);
    if (semGpa) setSgpa(semGpa.gpa.toFixed(2));
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    const token = localStorage.getItem("token");
    try {
      const resp = await fetch(`${import.meta.env.PROD ? 'https://student-poratal.onrender.com/api' : 'http://127.0.0.1:5000/api'}/student/results`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const d = await resp.json();
      if (resp.ok) {
        if (d.marks_by_semester) {
          setResultsBySem(d.marks_by_semester);
          setSelectedSem(d.max_sem);
          setAvailableSems(Object.keys(d.marks_by_semester).sort());
          setResults(d.marks);
          setGpaData(d.gpa_history || []);
          
          const semGpa = (d.gpa_history || []).find(g => g.name === `Sem ${d.max_sem}`);
          setSgpa(semGpa ? semGpa.gpa.toFixed(2) : (d.sgpa || "8.40"));
          
          setCgpa(d.cgpa || "8.22");
          setCredits(d.total_credits || "84 / 160");
          setBacklogs(d.backlogs_clear || "Yes");
          setProgress(d.degree_progress || "52%");
        } else if (d.marks) {
          setResults(d.marks);
          setGpaData(d.gpa_history || []);
          setSgpa(d.sgpa || "8.40");
          setCgpa(d.cgpa || "8.22");
          setCredits(d.total_credits || "84 / 160");
          setBacklogs(d.backlogs_clear || "Yes");
          setProgress(d.degree_progress || "52%");
        } else {
          setResults(d);
          setGpaData([
            { name: "Sem 1", gpa: 7.8 },
            { name: "Sem 2", gpa: 8.2 },
            { name: "Sem 3", gpa: 8.5 },
            { name: "Sem 4", gpa: 8.4 },
          ]);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading Results...</div>;

  return (
    <StudentLayout>
      <div className="std-dashboard-header" style={{ marginBottom: '32px' }}>
         <h1 style={{ fontSize: '20px', fontWeight: '800' }}>Academic Results</h1>
         <p style={{ color: '#64748b', fontSize: '14px' }}>Semester-wise marksheet and performance overview</p>
      </div>

      <div className="std-grid-row">
        {/* RESULTS TABLE */}
        <div className="std-panel">
          <div className="std-panel-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h4>Marksheet - Semester {selectedSem}</h4>
              {availableSems.length > 0 && (
                <select 
                  value={selectedSem} 
                  onChange={handleSemChange}
                  style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', outline: 'none', cursor: 'pointer', fontWeight: '600', backgroundColor: '#f8fafc', color: '#1e293b' }}
                >
                  {availableSems.map(sem => (
                    <option key={sem} value={sem}>Semester {sem}</option>
                  ))}
                </select>
              )}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
               <button style={{ padding: '6px 12px', background: '#f1f5f9', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>Print Marksheet</button>
            </div>
          </div>
          <div className="std-table-container">
            <table className="std-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Internal</th>
                  <th>External</th>
                  <th>Total</th>
                  <th>Grade</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {(resultsBySem[selectedSem] || results).map((r, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ fontWeight: '700' }}>{r.name}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>{r.code} • {r.credits} Credits</div>
                    </td>
                    <td>{r.internal}</td>
                    <td>{r.external}</td>
                    <td style={{ fontWeight: '800' }}>{r.total}</td>
                    <td>
                       <span style={{ 
                         width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                         background: r.status === 'Pass' ? '#ecfdf5' : '#fff1f2', 
                         color: r.status === 'Pass' ? '#10b981' : '#f43f5e',
                         borderRadius: '8px', fontWeight: '900', fontSize: '14px'
                       }}>
                         {r.grade}
                       </span>
                    </td>
                    <td>
                       <span style={{ 
                         padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '800',
                         background: r.status === 'Pass' ? '#d1fae5' : '#fee2e2',
                         color: r.status === 'Pass' ? '#065f46' : '#991b1b'
                       }}>
                         {r.status.toUpperCase()}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* STATS & ANALYTICS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="std-panel" style={{ textAlign: 'center', padding: '20px' }}>
                 <div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '8px' }}>SGPA</div>
                 <div style={{ fontSize: '20px', fontWeight: '900', color: '#4f46e5' }}>{sgpa}</div>
              </div>
              <div className="std-panel" style={{ textAlign: 'center', padding: '20px' }}>
                 <div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '8px' }}>CGPA</div>
                 <div style={{ fontSize: '20px', fontWeight: '900', color: '#1e293b' }}>{cgpa}</div>
              </div>
           </div>

           <div className="std-panel">
              <div className="std-panel-header"><h4>Performance Trend</h4></div>
              <div style={{ height: '220px' }}>
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={gpaData}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                       <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} domain={[0, 10]} />
                       <Tooltip cursor={{ fill: '#f8fafc' }} />
                       <Bar dataKey="gpa" radius={[6, 6, 0, 0]} barSize={32}>
                          {gpaData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={index === gpaData.length - 1 ? '#4f46e5' : '#cbd5e1'} />
                          ))}
                       </Bar>
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>

           <div className="std-panel" style={{ background: '#f8fafc' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                 <FaAward color="#f59e0b" size={24} />
                 <h5 style={{ fontWeight: '800' }}>Academic Summary</h5>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#64748b', fontWeight: '500' }}>Total Credits Earned</span>
                    <span style={{ fontWeight: '700' }}>{credits}</span>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#64748b', fontWeight: '500' }}>Backlogs Clear</span>
                    <span style={{ fontWeight: '700', color: backlogs === 'Yes' ? '#10b981' : '#f43f5e' }}>{backlogs}</span>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#64748b', fontWeight: '500' }}>Degree Progress</span>
                    <span style={{ fontWeight: '700' }}>{progress}</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </StudentLayout>
  );
}
