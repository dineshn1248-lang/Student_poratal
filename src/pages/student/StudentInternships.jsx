import { useState } from "react";
import { FaSearch, FaBriefcase, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaChevronRight, FaRegCheckCircle, FaTimes, FaCloudUploadAlt } from "react-icons/fa";
import StudentLayout from "./StudentLayout";
import "./Student.css";

const MOCK_INTERNSHIPS = [
  {
    id: 1,
    role: "Software Engineering Intern",
    company: "Google India",
    location: "Bengaluru, Karnataka (Hybrid)",
    duration: "6 Months",
    stipend: "₹80,000 / Month",
    type: "Technical",
    skills: ["React", "Python", "Data Structures"],
    logoBg: "#ea4335"
  },
  {
    id: 2,
    role: "Data Science Intern",
    company: "Microsoft Research",
    location: "Hyderabad, Telangana (Remote)",
    duration: "3 Months",
    stipend: "₹75,000 / Month",
    type: "Technical",
    skills: ["Machine Learning", "R/Python", "SQL"],
    logoBg: "#00a4ef"
  },
  {
    id: 3,
    role: "Frontend Developer Intern",
    company: "Wipro Technologies",
    location: "Bengaluru, Karnataka (On-site)",
    duration: "6 Months",
    stipend: "₹25,000 / Month",
    type: "Technical",
    skills: ["HTML/CSS", "JavaScript", "React.js"],
    logoBg: "#4a154b"
  },
  {
    id: 4,
    role: "AI & Deep Learning Intern",
    company: "Infosys Labs",
    location: "Mysuru, Karnataka (Hybrid)",
    duration: "6 Months",
    stipend: "₹30,000 / Month",
    type: "Technical",
    skills: ["PyTorch", "TensorFlow", "Deep Learning"],
    logoBg: "#007cc3"
  },
  {
    id: 5,
    role: "Business Analyst Intern",
    company: "Deloitte India",
    location: "Bengaluru, Karnataka (On-site)",
    duration: "3 Months",
    stipend: "₹35,000 / Month",
    type: "Non-Technical",
    skills: ["PowerBI", "Excel", "Communication"],
    logoBg: "#86bc25"
  },
  {
    id: 6,
    role: "Cloud DevOps Intern",
    company: "Amazon Web Services",
    location: "Bengaluru, Karnataka (Hybrid)",
    duration: "6 Months",
    stipend: "₹65,000 / Month",
    type: "Technical",
    skills: ["AWS", "Docker", "Linux Shell"],
    logoBg: "#ff9900"
  }
];

export default function StudentInternships() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [appliedStatus, setAppliedStatus] = useState(false);

  const filteredInternships = MOCK_INTERNSHIPS.filter(item => {
    const matchesSearch = item.role.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === "All" || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleApply = (e) => {
    e.preventDefault();
    setAppliedStatus(true);
    setTimeout(() => {
      setSelectedInternship(null);
      setAppliedStatus(false);
      setResumeUploaded(false);
      alert("Application submitted successfully! Check your email for further communication.");
    }, 2000);
  };

  return (
    <StudentLayout>
      <div className="std-internship-container">
        <div className="std-panel-header" style={{ marginBottom: "20px" }}>
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a" }}>Internship Finder</h2>
            <p style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>
              Explore and apply for high-value university-approved corporate internships.
            </p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="filter-toolbar" style={{ marginBottom: "24px", display: "flex", gap: "16px" }}>
          <div className="filter-group" style={{ flex: 1, minWidth: "260px" }}>
            <div style={{ position: "relative", width: "100%" }}>
              <FaSearch style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input
                type="text"
                placeholder="Search roles, companies or skills (e.g. React)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                style={{ width: "100%", paddingLeft: "40px" }}
              />
            </div>
          </div>
          <div className="filter-group">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Categories</option>
              <option value="Technical">Technical</option>
              <option value="Non-Technical">Non-Technical</option>
            </select>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="internship-grid">
          {filteredInternships.map(internship => (
            <div key={internship.id} className="internship-card">
              <div className="intern-card-top">
                <div className="intern-logo" style={{ backgroundColor: internship.logoBg }}>
                  {internship.company.charAt(0)}
                </div>
                <div className="intern-title-group">
                  <h4>{internship.role}</h4>
                  <span className="company-badge">{internship.company}</span>
                </div>
              </div>

              <div className="intern-meta-group">
                <div className="meta-row">
                  <FaMapMarkerAlt /> <span>{internship.location}</span>
                </div>
                <div className="meta-row">
                  <FaClock /> <span>{internship.duration}</span>
                </div>
                <div className="meta-row">
                  <FaMoneyBillWave /> <span>{internship.stipend}</span>
                </div>
              </div>

              <div className="skills-row">
                {internship.skills.map((skill, index) => (
                  <span key={index} className="skill-pill">{skill}</span>
                ))}
              </div>

              <button
                className="apply-card-btn"
                onClick={() => setSelectedInternship(internship)}
              >
                <span>Apply Now</span> <FaChevronRight size={12} />
              </button>
            </div>
          ))}

          {filteredInternships.length === 0 && (
            <div className="no-results-box" style={{ gridColumn: "1/-1" }}>
              <p>No internships found matching your current search parameters.</p>
            </div>
          )}
        </div>

        {/* Apply Modal popup */}
        {selectedInternship && (
          <div className="intern-modal-overlay">
            <div className="intern-modal-card">
              <div className="modal-header">
                <h3>Apply to {selectedInternship.company}</h3>
                <button className="close-btn" onClick={() => setSelectedInternship(null)}>
                  <FaTimes />
                </button>
              </div>

              <form className="modal-form" onSubmit={handleApply}>
                <div className="form-info-box">
                  <p><strong>Role:</strong> {selectedInternship.role}</p>
                  <p><strong>Stipend:</strong> {selectedInternship.stipend}</p>
                </div>

                <div className="form-input-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Your full name" required defaultValue="Dinesh N" />
                </div>

                <div className="form-input-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="Your email" required defaultValue="dinesh@college.com" />
                </div>

                <div className="form-input-group">
                  <label>Upload PDF Resume</label>
                  <div className={`resume-upload-zone ${resumeUploaded ? "uploaded" : ""}`}>
                    <input 
                      type="file" 
                      accept=".pdf" 
                      onChange={() => setResumeUploaded(true)} 
                      id="resume-file" 
                      style={{ display: "none" }}
                      required
                    />
                    <label htmlFor="resume-file" style={{ cursor: "pointer", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      {resumeUploaded ? (
                        <>
                          <FaRegCheckCircle size={32} color="#10b981" />
                          <span style={{ marginTop: "10px", color: "#10b981", fontWeight: "700" }}>resume_dinesh.pdf Uploaded!</span>
                        </>
                      ) : (
                        <>
                          <FaCloudUploadAlt size={32} color="#4f46e5" />
                          <span>Click to browse and upload resume PDF</span>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <button type="submit" className="modal-submit-btn" disabled={appliedStatus}>
                  {appliedStatus ? "Submitting application..." : "Submit Application"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
