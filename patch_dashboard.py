path = "src/pages/principal/Dashboard.jsx"
with open(path, encoding="utf-8") as f:
    src = f.read()

# ── 1. Find the dept block using unique anchor lines ─────────────────────────
start_marker = '              <div className="dept">'
end_marker   = '            </>'

i_start = src.find(start_marker)
i_end   = src.find(end_marker, i_start)

if i_start == -1 or i_end == -1:
    print("ERROR: markers not found"); exit(1)

i_end += len(end_marker)   # include the closing tag itself
old_block = src[i_start:i_end]
print("Found block (first 80 chars):", repr(old_block[:80]))

new_block = '''\
              <div className="dept">
                {["BCA", "BCS", "MCA", "BBA"].map((d) => (
                  <div
                    className="dept-card" key={d}
                    onClick={() => setSelectedDept(selectedDept === d ? null : d)}
                    style={{ cursor:"pointer", transition:"transform 0.18s, box-shadow 0.18s",
                      outline: selectedDept === d ? "2px solid #6366f1" : "none" }}
                    onMouseEnter={e => { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.13)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}
                  >
                    <div className="dept-top">
                      <h3>{d}</h3>
                      <span className="badge">120 students</span>
                    </div>
                    <p>Attendance <b>77%</b></p>
                    <div className="progress"><div className="bar"></div></div>
                    <p>Sections <b>A &amp; B</b></p>
                    <p style={{ fontSize:"12px", color:"#6366f1", fontWeight:"600", marginTop:"8px" }}>
                      {selectedDept === d ? "Hide details" : "Click to view details"}
                    </p>
                  </div>
                ))}
              </div>

              {selectedDept && (
                <DepartmentDetailView dept={selectedDept} onBack={() => setSelectedDept(null)} />
              )}
            </>'''

src = src[:i_start] + new_block + src[i_end:]
print("Step 1 OK")

# ── 2. Append DepartmentDetailView before last closing brace ─────────────────
COMPONENT = '''

// ── Department data ───────────────────────────────────────────────────────────
const deptData = {
  BCA: {
    fullName: "Bachelor of Computer Applications",
    totalStudents: 60, sections: ["A","B"], hod: "Prof. Suresh K",
    avgAttendance: 82,
    faculty: ["Mr. Rajan D","Ms. Kavitha P","Mr. Sriram B"],
    semesterWise:[{sem:1,count:10},{sem:2,count:12},{sem:3,count:11},{sem:4,count:10},{sem:5,count:9},{sem:6,count:8}],
    feePending:8, backlog:3, examRegistered:52, examEligible:49, hallTicketIssued:47,
    marksSubmitted:"5/6 Subjects", resultsPass:85,
    atRisk:["Sneha Patil (Att: 55%)","Ajay Nayak (Att: 70%)"],
  },
  BCS: {
    fullName: "Bachelor of Computer Science",
    totalStudents: 45, sections: ["A"], hod: "Prof. Meena T",
    avgAttendance: 78,
    faculty: ["Ms. Divya S","Mr. Ravi B"],
    semesterWise:[{sem:1,count:8},{sem:2,count:9},{sem:3,count:8},{sem:4,count:7},{sem:5,count:7},{sem:6,count:6}],
    feePending:5, backlog:2, examRegistered:38, examEligible:36, hallTicketIssued:35,
    marksSubmitted:"4/6 Subjects", resultsPass:80,
    atRisk:["Ganesh R (Att: 68%)"],
  },
  MCA: {
    fullName: "Master of Computer Applications",
    totalStudents: 40, sections: ["A","B"], hod: "Prof. Latha M",
    avgAttendance: 74,
    faculty: ["Dr. Anand K","Ms. Rekha N"],
    semesterWise:[{sem:1,count:12},{sem:2,count:14},{sem:3,count:14}],
    feePending:6, backlog:5, examRegistered:34, examEligible:30, hallTicketIssued:29,
    marksSubmitted:"3/4 Subjects", resultsPass:75,
    atRisk:["Asha Rao (Att: 55%, Backlog)","Rahul Menon (Att: 76%)"],
  },
  BBA: {
    fullName: "Bachelor of Business Administration",
    totalStudents: 50, sections: ["A","B"], hod: "Prof. Sudhir V",
    avgAttendance: 80,
    faculty: ["Ms. Preethi R","Mr. Lokesh G"],
    semesterWise:[{sem:1,count:10},{sem:2,count:10},{sem:3,count:10},{sem:4,count:8},{sem:5,count:7},{sem:6,count:5}],
    feePending:7, backlog:2, examRegistered:42, examEligible:40, hallTicketIssued:38,
    marksSubmitted:"5/6 Subjects", resultsPass:82,
    atRisk:["Kiran Patil (Att: 67%, Irregular)"],
  },
};

function DInfoRow({ label, value, valueColor }) {
  return (
    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",
      padding:"9px 0",borderBottom:"1px solid #f1f5f9" }}>
      <span style={{ fontSize:"14px",color:"#64748b" }}>{label}</span>
      <span style={{ fontSize:"14px",fontWeight:"700",color:valueColor||"#1e293b" }}>{value}</span>
    </div>
  );
}

function DCard({ title, children }) {
  return (
    <div style={{ background:"white",borderRadius:"12px",padding:"20px 24px",
      boxShadow:"0 2px 12px rgba(0,0,0,0.06)",flex:"1 1 280px",minWidth:"270px" }}>
      <h3 style={{ margin:"0 0 14px 0",fontSize:"15px",fontWeight:"700",color:"#1e293b",
        borderBottom:"2px solid #e2e8f0",paddingBottom:"10px" }}>{title}</h3>
      {children}
    </div>
  );
}

function DepartmentDetailView({ dept, onBack }) {
  const d = deptData[dept];
  if (!d) return null;
  const attColor = d.avgAttendance >= 75 ? "#16a34a" : "#dc2626";
  return (
    <div style={{ marginTop:"32px" }}>
      <div style={{ display:"flex",alignItems:"center",gap:"16px",marginBottom:"24px",
        background:"linear-gradient(135deg,#1e293b,#334155)",borderRadius:"14px",
        padding:"20px 28px",color:"white" }}>
        <button onClick={onBack}
          style={{ background:"rgba(255,255,255,0.15)",border:"none",color:"white",
            padding:"7px 16px",borderRadius:"8px",cursor:"pointer",fontWeight:"700",fontSize:"13px" }}>
          Back to Overview
        </button>
        <div>
          <h2 style={{ margin:0,fontSize:"22px",fontWeight:"800" }}>{dept} Department</h2>
          <p style={{ margin:"4px 0 0 0",fontSize:"13px",opacity:0.75 }}>
            {d.fullName} &nbsp;|&nbsp; HOD: {d.hod}
          </p>
        </div>
        <div style={{ marginLeft:"auto",textAlign:"right" }}>
          <div style={{ fontSize:"28px",fontWeight:"800" }}>{d.totalStudents}</div>
          <div style={{ fontSize:"12px",opacity:0.75 }}>Total Students</div>
        </div>
      </div>

      <div style={{ display:"flex",flexWrap:"wrap",gap:"16px" }}>
        <DCard title="Overview">
          <DInfoRow label="Sections" value={d.sections.join(", ")} />
          <DInfoRow label="Avg Attendance" value={`${d.avgAttendance}%`} valueColor={attColor} />
          <DInfoRow label="Fee Pending" value={d.feePending} valueColor="#dc2626" />
          <DInfoRow label="Backlog Students" value={d.backlog} valueColor="#d97706" />
          <div style={{ marginTop:"12px" }}>
            <div style={{ fontSize:"12px",color:"#94a3b8",marginBottom:"6px" }}>Attendance</div>
            <div style={{ background:"#e2e8f0",borderRadius:"20px",height:"8px" }}>
              <div style={{ background:attColor,borderRadius:"20px",height:"8px",width:`${d.avgAttendance}%` }} />
            </div>
          </div>
        </DCard>

        <DCard title="Semester-wise Students">
          {d.semesterWise.map(s => (
            <div key={s.sem} style={{ display:"flex",alignItems:"center",gap:"10px",marginBottom:"8px" }}>
              <span style={{ fontSize:"13px",color:"#64748b",width:"50px" }}>Sem {s.sem}</span>
              <div style={{ flex:1,background:"#f1f5f9",borderRadius:"20px",height:"7px" }}>
                <div style={{ background:"#6366f1",borderRadius:"20px",height:"7px",
                  width:`${(s.count/d.totalStudents)*100}%` }} />
              </div>
              <span style={{ fontSize:"13px",fontWeight:"700",color:"#1e293b",width:"24px" }}>{s.count}</span>
            </div>
          ))}
        </DCard>

        <DCard title="Exam Registration Summary">
          <DInfoRow label="Registered" value={d.examRegistered} valueColor="#2563eb" />
          <DInfoRow label="Eligible" value={d.examEligible} valueColor="#16a34a" />
          <DInfoRow label="Not Eligible" value={d.examRegistered-d.examEligible} valueColor="#dc2626" />
          <DInfoRow label="Hall Tickets Issued" value={d.hallTicketIssued} valueColor="#7c3aed" />
          <DInfoRow label="Internal Marks" value={d.marksSubmitted} />
        </DCard>

        <DCard title="Result Performance">
          <DInfoRow label="Pass %" value={`${d.resultsPass}%`}
            valueColor={d.resultsPass>=75?"#16a34a":"#dc2626"} />
          <DInfoRow label="Fail %" value={`${100-d.resultsPass}%`} valueColor="#dc2626" />
          <div style={{ marginTop:"12px" }}>
            <div style={{ fontSize:"12px",color:"#94a3b8",marginBottom:"6px" }}>Pass Rate</div>
            <div style={{ background:"#e2e8f0",borderRadius:"20px",height:"8px" }}>
              <div style={{ background:"#16a34a",borderRadius:"20px",height:"8px",width:`${d.resultsPass}%` }} />
            </div>
          </div>
        </DCard>

        <DCard title="Faculty / Assigned Staff">
          {d.faculty.map(f => (
            <div key={f} style={{ display:"flex",alignItems:"center",gap:"10px",
              padding:"8px 0",borderBottom:"1px solid #f1f5f9" }}>
              <span style={{ background:"#e0e7ff",color:"#3730a3",borderRadius:"50%",
                width:"32px",height:"32px",display:"flex",alignItems:"center",
                justifyContent:"center",fontWeight:"700",fontSize:"13px",flexShrink:0 }}>
                {f.charAt(f.indexOf(" ")+1)}
              </span>
              <span style={{ fontSize:"14px",color:"#1e293b" }}>{f}</span>
            </div>
          ))}
        </DCard>

        <DCard title="Academic Alerts / At-Risk Students">
          {d.atRisk.length===0 ? (
            <p style={{ color:"#16a34a",fontSize:"14px",fontWeight:"600" }}>No at-risk students</p>
          ) : d.atRisk.map(s => (
            <div key={s} style={{ background:"#fef2f2",border:"1px solid #fecaca",
              borderRadius:"8px",padding:"10px 14px",marginBottom:"8px",
              fontSize:"13px",color:"#991b1b",fontWeight:"600" }}>
              {s}
            </div>
          ))}
          <p style={{ fontSize:"12px",color:"#94a3b8",marginTop:"12px" }}>
            View-only monitoring. Contact HOD for management actions.
          </p>
        </DCard>
      </div>
    </div>
  );
}'''

pos = src.rfind("\n}")
src = src[:pos] + COMPONENT + "\n}"
print("Step 2 OK")

with open(path, "w", encoding="utf-8") as f:
    f.write(src)
print("Done. File saved.")
