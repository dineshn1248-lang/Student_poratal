import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Lock, Mail, Phone, MapPin, BookOpen, Hash } from "lucide-react";

import "../../styles/StudentRegister.css";

function StudentRegister() {
  const navigate = useNavigate();
  const [reveal, setReveal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    registerNo: "",
    email: "",
    mobile: "",
    password: "",
    address: "",
    obtainedMarks: "",
    totalMarks: "",
    percentage: "",
    course: "BCA", // Default
    aadharNo: "",
    pucRegisterNo: "",
    fatherMobile: "",
    motherMobile: "",
    religion: "",
    nationality: "Indian"
  });

  // Mock Database for Auto-fill functionality
  const mockDatabase = {
    "123456789012": {
      name: "Dinesh N",
      fatherMobile: "+91 9876543210",
      motherMobile: "+91 9876543211",
      religion: "Hindu",
      nationality: "Indian",
      address: "123, Sample Street, Bangalore",
    },
    "PUC123456": {
      name: "Ravi Kumar",
      fatherMobile: "+91 8888888888",
      motherMobile: "+91 7777777777",
      religion: "Hindu",
      nationality: "Indian",
      address: "456, College Road, Mysore",
      obtainedMarks: "520",
      totalMarks: "600",
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setReveal(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      let newData = { ...prev, [name]: value };
      
      // Auto-calculate percentage if marks change
      if (name === "obtainedMarks" || name === "totalMarks") {
        const obtained = parseFloat(name === "obtainedMarks" ? value : prev.obtainedMarks);
        const total = parseFloat(name === "totalMarks" ? value : prev.totalMarks);
        
        if (!isNaN(obtained) && !isNaN(total) && total > 0) {
          newData.percentage = ((obtained / total) * 100).toFixed(2);
        } else {
          newData.percentage = "";
        }
      }

      // Auto-fill logic based on Aadhar or PUC Register No
      if ((name === "aadharNo" && value.length === 12) || (name === "pucRegisterNo" && value.length >= 6)) {
        const mockData = mockDatabase[value];
        if (mockData) {
          newData = { ...newData, ...mockData };
          // Recalculate percentage if marks are provided from DB
          if (mockData.obtainedMarks && mockData.totalMarks) {
            newData.percentage = ((parseFloat(mockData.obtainedMarks) / parseFloat(mockData.totalMarks)) * 100).toFixed(2);
          }
        }
      }
      
      return newData;
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.registerNo || !formData.password || !formData.mobile) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    
    // TODO: Connect this to the real backend /api/auth/student/register when ready.
    // For now, we simulate a network request.
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert("Registration Successful! You can now log in.");
      navigate("/student-login");
    } catch (error) {
      console.error(error);
      alert("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: reveal ? 1 : 0, y: reveal ? 0 : 40 }}
        transition={{ duration: 0.8 }}
        className="register-glass-card"
      >
        <div className="register-header">
          <h1>Student Registration</h1>
          <p>Join Nrupathunga University Student Portal</p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="form-grid">
            
            {/* Full Name */}
            <div className="register-group">
              <label className="register-label">Full Name *</label>
              <div className="register-input-wrapper">
                <User className="register-icon" size={18} />
                <input 
                  type="text" 
                  name="name"
                  className="register-input" 
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Register No / UAN */}
            <div className="register-group">
              <label className="register-label">Register No (UAN) *</label>
              <div className="register-input-wrapper">
                <Hash className="register-icon" size={18} />
                <input 
                  type="text" 
                  name="registerNo"
                  className="register-input" 
                  placeholder="e.g. UAN2026XX"
                  value={formData.registerNo}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Aadhar No */}
            <div className="register-group">
              <label className="register-label">Aadhar Card Number</label>
              <div className="register-input-wrapper">
                <Hash className="register-icon" size={18} />
                <input 
                  type="text" 
                  name="aadharNo"
                  className="register-input" 
                  placeholder="12-digit Aadhar No"
                  value={formData.aadharNo}
                  onChange={handleInputChange}
                  maxLength={12}
                />
              </div>
            </div>

            {/* PUC Register No */}
            <div className="register-group">
              <label className="register-label">PUC Register Number</label>
              <div className="register-input-wrapper">
                <Hash className="register-icon" size={18} />
                <input 
                  type="text" 
                  name="pucRegisterNo"
                  className="register-input" 
                  placeholder="e.g. PUC123456"
                  value={formData.pucRegisterNo}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Father's Mobile Number */}
            <div className="register-group">
              <label className="register-label">Father's Mobile Number</label>
              <div className="register-input-wrapper">
                <Phone className="register-icon" size={18} />
                <input 
                  type="tel" 
                  name="fatherMobile"
                  className="register-input" 
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.fatherMobile}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Mother's Mobile Number */}
            <div className="register-group">
              <label className="register-label">Mother's Mobile Number</label>
              <div className="register-input-wrapper">
                <Phone className="register-icon" size={18} />
                <input 
                  type="tel" 
                  name="motherMobile"
                  className="register-input" 
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.motherMobile}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Religion */}
            <div className="register-group">
              <label className="register-label">Religion</label>
              <div className="register-input-wrapper">
                <User className="register-icon" size={18} />
                <input 
                  type="text" 
                  name="religion"
                  className="register-input" 
                  placeholder="e.g. Hindu, Muslim, Christian"
                  value={formData.religion}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Nationality */}
            <div className="register-group">
              <label className="register-label">Nationality</label>
              <div className="register-input-wrapper">
                <MapPin className="register-icon" size={18} />
                <select 
                  name="nationality" 
                  className="register-select"
                  value={formData.nationality}
                  onChange={handleInputChange}
                >
                  <option value="Indian">Indian</option>
                  <option value="Other">Other Country</option>
                </select>
              </div>
            </div>

            {/* Email */}
            <div className="register-group">
              <label className="register-label">Email Address</label>
              <div className="register-input-wrapper">
                <Mail className="register-icon" size={18} />
                <input 
                  type="email" 
                  name="email"
                  className="register-input" 
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div className="register-group">
              <label className="register-label">Mobile Number *</label>
              <div className="register-input-wrapper">
                <Phone className="register-icon" size={18} />
                <input 
                  type="tel" 
                  name="mobile"
                  className="register-input" 
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="register-group">
              <label className="register-label">Create Password *</label>
              <div className="register-input-wrapper">
                <Lock className="register-icon" size={18} />
                <input 
                  type="password" 
                  name="password"
                  className="register-input" 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Course Selection */}
            <div className="register-group">
              <label className="register-label">Present Course *</label>
              <div className="register-input-wrapper">
                <BookOpen className="register-icon" size={18} />
                <select 
                  name="course" 
                  className="register-select"
                  value={formData.course}
                  onChange={handleInputChange}
                  required
                >
                  <option value="BCA">BCA (Bachelor of Computer Applications)</option>
                  <option value="BBA">BBA (Bachelor of Business Administration)</option>
                  <option value="MCA">MCA (Master of Computer Applications)</option>
                  <option value="BSc">B.Sc (Bachelor of Science)</option>
                  <option value="BCom">B.Com (Bachelor of Commerce)</option>
                </select>
              </div>
            </div>

            {/* Education Details Header */}
            <div className="register-group full-width" style={{ marginTop: '10px', marginBottom: '-10px' }}>
              <label className="register-label" style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '8px' }}>Previous Education Details</label>
            </div>

            {/* Obtained Marks */}
            <div className="register-group">
              <label className="register-label">Obtained Marks *</label>
              <div className="register-input-wrapper">
                <input 
                  type="number" 
                  name="obtainedMarks"
                  className="register-input no-icon-input" 
                  placeholder="e.g. 450"
                  value={formData.obtainedMarks}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Total Marks */}
            <div className="register-group">
              <label className="register-label">Total Marks *</label>
              <div className="register-input-wrapper">
                <input 
                  type="number" 
                  name="totalMarks"
                  className="register-input no-icon-input" 
                  placeholder="e.g. 500"
                  value={formData.totalMarks}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Calculated Percentage */}
            <div className="register-group">
              <label className="register-label">Calculated Percentage (%)</label>
              <div className="register-input-wrapper">
                <input 
                  type="text" 
                  name="percentage"
                  className="register-input no-icon-input" 
                  placeholder="Auto-calculated"
                  value={formData.percentage}
                  readOnly
                  style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', cursor: 'not-allowed', color: '#94a3b8' }}
                />
              </div>
            </div>

            {/* Address */}
            <div className="register-group full-width">
              <label className="register-label">Permanent Address</label>
              <div className="register-input-wrapper">
                <textarea 
                  name="address"
                  className="register-textarea no-icon-input" 
                  placeholder="Enter your full residential address"
                  value={formData.address}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

          </div>

          <div className="register-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => navigate("/student-login")}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading}
            >
              {loading ? "Registering..." : "Submit Registration"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default StudentRegister;
