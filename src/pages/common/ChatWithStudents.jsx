import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, MessageCircle, MapPin, Calendar, Send, X, ShieldCheck, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../../components/common/Footer';
import '../../styles/ChatWithStudents.css';

// Dummy student data with professional standard headshots
const DUMMY_STUDENTS = [
  { id: 1, name: "Dinesh N", course: "AI/ML", program: "BCA", semester: "Final Semester", state: "Karnataka", image: "/dinesh.jpg" },
  { id: 2, name: "Rahul Kumar", course: "Digital Electronics", program: "BSc", semester: "Final Semester", state: "Karnataka", image: "https://randomuser.me/api/portraits/men/45.jpg" },
  { id: 3, name: "Priya Sharma", course: "Full Stack Web Development", program: "BSc", semester: "Final Semester", state: "Kerala", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 4, name: "Akash Reddy", course: "Aviation Services", program: "BBA", semester: "Final Semester", state: "Andhra Pradesh", image: "https://randomuser.me/api/portraits/men/67.jpg" },
  { id: 5, name: "Sneha Patil", course: "Full Stack Data Science", program: "BSc", semester: "Final Semester", state: "Karnataka", image: "https://randomuser.me/api/portraits/women/68.jpg" },
  { id: 6, name: "Kiran S", course: "Education (ITEP)", program: "BSc-BEd", semester: "Final Semester", state: "Tamil Nadu", image: "https://randomuser.me/api/portraits/men/22.jpg" },
  { id: 7, name: "Anjali Desai", course: "Digital Electronics", program: "BSc", semester: "Final Semester", state: "Gujarat", image: "https://randomuser.me/api/portraits/women/33.jpg" },
  { id: 8, name: "Vikram Singh", course: "AI/ML", program: "BCA", semester: "Final Semester", state: "Delhi", image: "https://randomuser.me/api/portraits/men/15.jpg" },
  { id: 9, name: "Meera Nair", course: "Aviation Services", program: "BBA", semester: "Final Semester", state: "Kerala", image: "https://randomuser.me/api/portraits/women/12.jpg" },
  { id: 10, name: "Rohan Gupta", course: "Full Stack Web Development", program: "BSc", semester: "Final Semester", state: "Maharashtra", image: "https://randomuser.me/api/portraits/men/55.jpg" },
  { id: 11, name: "Neha Verma", course: "Full Stack Data Science", program: "BSc", semester: "Final Semester", state: "Uttar Pradesh", image: "https://randomuser.me/api/portraits/women/28.jpg" },
  { id: 12, name: "Arjun M", course: "AI/ML", program: "BCA", semester: "Final Semester", state: "Karnataka", image: "https://randomuser.me/api/portraits/men/82.jpg" }
];

export default function ChatWithStudents() {
  const [filterProgram, setFilterProgram] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [filterState, setFilterState] = useState('');
  
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [message, setMessage] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtering logic
  const filteredStudents = useMemo(() => {
    setCurrentPage(1); // Reset to page 1 on filter change
    return DUMMY_STUDENTS.filter(student => {
      const matchProgram = filterProgram ? student.program === filterProgram : true;
      const matchCourse = filterCourse ? student.course.includes(filterCourse) : true;
      const matchState = filterState ? student.state === filterState : true;
      return matchProgram && matchCourse && matchState;
    });
  }, [filterProgram, filterCourse, filterState]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const currentStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    alert(`Message sent to ${selectedStudent.name}!`);
    setMessage('');
    setSelectedStudent(null);
  };

  return (
    <div className="chat-students-container">
      {/* Header */}
      <header className="chat-students-header">
        <div className="chat-breadcrumbs">
          <Link to="/home"><ArrowLeft size={14} /> Home</Link>
          <ChevronRight size={14} />
          <span style={{ color: '#fff' }}>Chat With Students</span>
        </div>
        <motion.h1 
          className="chat-students-title"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Chat With Students
        </motion.h1>
      </header>

      {/* Hero Section */}
      <section className="chat-hero-section">
        <motion.div 
          className="chat-hero-card"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="hero-avatar left placeholder">
            <User size={50} color="#60a5fa" />
          </div>
          <div className="chat-hero-content">
            <h2>Connect With Student Ambassadors</h2>
            <p>"Get real insights about campus life, academics, placements, events, and student experiences from those who are living it right now."</p>
          </div>
          <div className="hero-avatar right placeholder">
            <User size={50} color="#60a5fa" />
          </div>
        </motion.div>
      </section>

      {/* Filters Section */}
      <section className="chat-filters-section">
        <div className="chat-filter-group">
          <label>Search by Program</label>
          <select value={filterProgram} onChange={e => setFilterProgram(e.target.value)}>
            <option value="">All Programs</option>
            <option value="BSc">BSc</option>
            <option value="BCA">BCA</option>
            <option value="BBA">BBA</option>
            <option value="BSc-BEd">BSc-BEd</option>
          </select>
        </div>
        
        <div className="chat-filter-group">
          <label>Search by Course</label>
          <select value={filterCourse} onChange={e => setFilterCourse(e.target.value)}>
            <option value="">All Courses</option>
            <option value="Digital Electronics">Digital Electronics</option>
            <option value="Full Stack Web Development">Full Stack Web Development</option>
            <option value="Full Stack Data Science">Full Stack Data Science</option>
            <option value="AI/ML">AI/ML</option>
            <option value="Aviation Services">Aviation Services</option>
            <option value="Education (ITEP)">Education (ITEP)</option>
          </select>
        </div>

        <div className="chat-filter-group">
          <label>Search by State</label>
          <select value={filterState} onChange={e => setFilterState(e.target.value)}>
            <option value="">All States</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Kerala">Kerala</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Telangana">Telangana</option>
          </select>
        </div>
      </section>

      {/* Students Grid */}
      <section className="chat-students-grid">
        <AnimatePresence>
          {currentStudents.length > 0 ? (
            currentStudents.map((student, index) => (
              <motion.div 
                key={student.id}
                className="student-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="ambassador-badge"><ShieldCheck size={12} style={{display: 'inline', marginRight: '4px', verticalAlign: 'text-top'}}/> Student Ambassador</div>
                <div className="student-avatar-placeholder">
                  <User size={40} color="#94a3b8" />
                </div>
                <h3 className="student-name">{student.name}</h3>
                <p className="student-course">{student.program} {student.course !== student.program ? student.course : ''}</p>
                
                <div className="student-details">
                  <div className="student-detail-item">
                    <Calendar size={14} /> {student.semester}
                  </div>
                  <div className="student-detail-item">
                    <MapPin size={14} /> {student.state}
                  </div>
                </div>

                <button className="chat-btn" onClick={() => setSelectedStudent(student)}>
                  <MessageCircle size={18} /> Chat with {student.name.split(' ')[0]}
                </button>
              </motion.div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
              No students found matching your filters.
            </div>
          )}
        </AnimatePresence>

        {/* Pagination UI */}
        {totalPages > 1 && (
          <div className="chat-pagination">
            <button 
              className="page-btn" 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              &lt;
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button 
                key={i + 1} 
                className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            
            <button 
              className="page-btn" 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              &gt;
            </button>
          </div>
        )}
      </section>

      {/* Chat Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div 
            className="chat-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div 
              className="chat-modal"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="chat-modal-header">
                <h3 className="chat-modal-title">
                  <div className="modal-avatar-placeholder">
                    <User size={18} color="#94a3b8" />
                  </div>
                  Get your query resolved in 3 easy steps
                </h3>
                <button className="close-modal-btn" onClick={() => setSelectedStudent(null)}>
                  <X size={20} />
                </button>
              </div>
              <div className="chat-modal-body">
                
                {/* Stepper */}
                <div className="chat-stepper">
                  <div className="step-item active">
                    <span className="step-number">1</span> Your Message
                  </div>
                  <ChevronRight size={14} className="step-arrow" />
                  <div className="step-item">
                    <span className="step-number">2</span> Your Information
                  </div>
                  <ChevronRight size={14} className="step-arrow" />
                  <div className="step-item">
                    <span className="step-number">3</span> Receive an Answer
                  </div>
                </div>

                {/* Form Elements */}
                <textarea 
                  className="chat-textarea" 
                  placeholder="Ask me about university courses, campus life and more!"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                />

                <div className="suggestion-section">
                  <p className="suggestion-title">You can ask me about</p>
                  <div className="suggestion-chips">
                    <span className="chip" onClick={() => setMessage("Can you tell me how the course is?")}>
                      <MessageCircle size={12} /> Can you tell me how the course is?
                    </span>
                    <span className="chip" onClick={() => setMessage("How is the campus life?")}>
                      <MessageCircle size={12} /> How is the campus life?
                    </span>
                    <span className="chip" onClick={() => setMessage("How is the extra curriculars?")}>
                      <MessageCircle size={12} /> How is the extra curriculars?
                    </span>
                    <span className="chip" onClick={() => setMessage("How are the placements, internships opportunities?")}>
                      <MessageCircle size={12} /> How are the placements, internships opportunities?
                    </span>
                  </div>
                </div>

                <div className="course-interest-group">
                  <label>Course Interest? <span>*</span></label>
                  <select className="course-select">
                    <option value="">Select Courses</option>
                    <option value="BSc">BSc</option>
                    <option value="BCA">BCA</option>
                    <option value="BBA">BBA</option>
                    <option value="BSc-BEd">BSc-BEd</option>
                  </select>
                </div>
              </div>

              <div className="chat-modal-footer">
                <button className="btn-close" onClick={() => setSelectedStudent(null)}>Close</button>
                <button className="btn-continue" onClick={() => handleSendMessage({preventDefault: () => {}})}>Continue <ChevronRight size={16} /></button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ marginTop: '80px' }}>
        <Footer />
      </div>
    </div>
  );
}
