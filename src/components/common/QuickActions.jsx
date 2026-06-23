import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, BookOpen, MessageSquare, X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/QuickActions.css';

export default function QuickActions() {
  const navigate = useNavigate();
  const [showEnquiry, setShowEnquiry] = useState(false);

  return (
    <>
      <motion.div 
        className="quick-actions-panel"
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 100 }}
      >
        <div className="quick-action-btn" onClick={() => setShowEnquiry(true)}>
          <HelpCircle size={28} className="action-icon" />
          <span className="action-text">Enquire Now</span>
        </div>
        
        <div className="quick-action-btn" onClick={() => navigate('/about/academics')}>
          <BookOpen size={28} className="action-icon" />
          <span className="action-text">UG Programs</span>
        </div>

        <div className="quick-action-btn" onClick={() => navigate('/chat-with-students')}>
          <MessageSquare size={28} className="action-icon" />
          <span className="action-text">Chat with Student</span>
        </div>
      </motion.div>

      <AnimatePresence>
        {showEnquiry && (
          <motion.div 
            className="enquiry-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEnquiry(false)}
          >
            <motion.div 
              className="enquiry-modal"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="close-modal-btn" onClick={() => setShowEnquiry(false)}>
                <X size={24} />
              </button>
              <h2 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Admission Enquiry</h2>
              <p style={{ color: '#94a3b8', margin: '0 0 20px 0' }}>Fill out the form below and our admission counselors will contact you shortly.</p>
              
              <form className="enquiry-form" onSubmit={(e) => { e.preventDefault(); setShowEnquiry(false); alert("Enquiry submitted successfully!"); }}>
                <input type="text" placeholder="Full Name" required />
                <input type="email" placeholder="Email Address" required />
                <input type="tel" placeholder="Phone Number" required />
                <select required>
                  <option value="" disabled selected>Select Program of Interest</option>
                  <option value="bsc">B.Sc Computer Science</option>
                  <option value="bca">Bachelor of Computer Applications</option>
                  <option value="itep">Integrated Teacher Education Programme</option>
                  <option value="other">Other Programs</option>
                </select>
                <button type="submit" className="submit-btn">Submit Enquiry</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
