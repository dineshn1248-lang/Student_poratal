import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Mail, GraduationCap, Users, Eye, EyeOff, BookOpen, Calendar, Award, CreditCard, LogIn, ArrowLeft } from "lucide-react";

import "../../styles/StudentLogin.css";
import nrupathungaLogo from "../../assets/nrupathunga_logo.png";
import univPhoto from "../../assets/bg.png";

function StudentLogin() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [uan, setUan] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [parentPassword, setParentPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReveal(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const handleStudentLogin = async (e) => {
    e?.preventDefault();
    if (!uan || !studentPassword) {
      setError("Please enter UAN Number and password");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const baseUrl = import.meta.env.PROD 
        ? 'https://student-poratal.onrender.com/api' 
        : 'http://127.0.0.1:5000/api';
      const res = await fetch(`${baseUrl}/auth/student/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uan, password: studentPassword }),
      });

      const data = await res.json();
      if (res.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", "student");
        localStorage.setItem("userName", data.user.name);
        navigate("/student/dashboard");
      } else {
        setError(data?.error || "Invalid student credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Server connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleParentLogin = async (e) => {
    e?.preventDefault();
    if (!mobileNumber) {
      setError("Please enter your Registered Mobile Number");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const baseUrl = import.meta.env.PROD 
        ? 'https://student-poratal.onrender.com/api' 
        : 'http://127.0.0.1:5000/api';
      const res = await fetch(`${baseUrl}/auth/parent/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parent_id: mobileNumber, password: parentPassword }),
      });

      const data = await res.json();
      if (res.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", "parent");
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("studentName", data.user.student_name);
        navigate("/parent/dashboard");
      } else {
        setError(data?.error || "Invalid parent credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Server connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="std-login-page">
      {/* LEFT SIDE: HERO BANNER (DARK NAVY GRADIENT OVER BUILDING) */}
      <div className="std-login-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="university-brand">
            <img src={nrupathungaLogo} alt="Nrupathunga University Logo" className="univ-logo-large" />
            <div className="brand-text-block">
              <h1 className="univ-title">NRUPATHUNGA UNIVERSITY</h1>
            </div>
          </div>

          <div className="welcome-banner">
            <p className="welcome-label">Welcome to</p>
            <h2 className="welcome-main-title">Nrupathunga University</h2>
            <div className="welcome-divider-line"></div>
            <p className="welcome-desc">
              Access your academic records, attendance, examinations, results and more.
            </p>
          </div>

          {/* THREE HORIZONTAL badges at bottom of left panel */}
          <div className="left-horizontal-badges">
            <div className="badge-col">
              <div className="badge-icon-circle"><BookOpen size={16} /></div>
              <div className="badge-info">
                <h4>Academic Records</h4>
                <p>View your grades, transcripts and results</p>
              </div>
            </div>
            <div className="badge-col">
              <div className="badge-icon-circle"><Calendar size={16} /></div>
              <div className="badge-info">
                <h4>Attendance Management</h4>
                <p>Track attendance and history</p>
              </div>
            </div>
            <div className="badge-col">
              <div className="badge-icon-circle"><Award size={16} /></div>
              <div className="badge-info">
                <h4>Examination Details</h4>
                <p>Check schedules and results</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: SUSPENDED LOGIN CARD */}
      <div className="std-login-form-container">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: reveal ? 1 : 0, y: reveal ? 0 : 15 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="login-card-wrapper"
        >
          <div className="login-card-header" style={{ position: 'relative' }}>
            <button 
              onClick={() => navigate('/login-portal')} 
              style={{ position: 'absolute', top: '20px', left: '20px', background: 'transparent', border: 'none', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
            >
              <ArrowLeft size={14} /> Back to Portals
            </button>
            <img src={nrupathungaLogo} alt="University Logo" className="univ-form-logo" style={{ marginTop: '20px' }} />
            <h3>{role === "student" ? "Student Login" : "Parent Login"}</h3>
            <p className="form-subtext">Login to access your Nrupathunga University account</p>
          </div>

          {/* Error Message Box */}
          {error && (
            <div className="login-error-box">
              <p>{error}</p>
            </div>
          )}



          {/* Pill Capsule Role Tab Selection */}
          <div className="role-tab-capsule">
            <button 
              type="button"
              className={`tab-btn ${role === "student" ? "active" : ""}`}
              onClick={() => { setRole("student"); setError(""); }}
            >
              <User size={16} /> Student
            </button>
            <button 
              type="button"
              className={`tab-btn ${role === "parent" ? "active" : ""}`}
              onClick={() => { setRole("parent"); setError(""); }}
            >
              <Users size={16} /> Parent
            </button>
          </div>

          <AnimatePresence mode="wait">
            {role === "student" ? (
              <motion.form 
                key="student"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleStudentLogin}
                className="login-form"
              >
                <div className="login-field-group">
                  <label className="field-title-label">Register Number</label>
                  <div className="input-with-icon">
                    <User className="field-icon" size={18} />
                    <input 
                      type="text" 
                      placeholder="Enter Register Number"
                      value={uan}
                      onChange={(e) => setUan(e.target.value)}
                      autoComplete="username"
                      required
                    />
                  </div>
                </div>

                <div className="login-field-group">
                  <label className="field-title-label">Password</label>
                  <div className="input-with-icon">
                    <Lock className="field-icon" size={18} />
                    <input 
                      type="text"
                      style={{ WebkitTextSecurity: showPassword ? 'none' : 'disc' }}
                      placeholder="Enter your password"
                      value={studentPassword}
                      onChange={(e) => setStudentPassword(e.target.value)}
                      autoComplete="off"
                      required
                    />
                    <button 
                      type="button" 
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="login-card-options">
                  <a href="#" className="forgot-pass" onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }}>Forgot password?</a>
                </div>

                <button type="submit" className="login-submit-btn" disabled={loading}>
                  {loading ? (
                    "Verifying..."
                  ) : (
                    <span className="btn-inner-content">
                      <LogIn size={18} /> Login to Portal
                    </span>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.form 
                key="parent"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleParentLogin}
                className="login-form"
              >
                <div className="login-field-group">
                  <label className="field-title-label">Personal Number</label>
                  <div className="input-with-icon">
                    <User className="field-icon" size={18} />
                    <input 
                      type="tel" 
                      placeholder="Enter Personal Number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      autoComplete="tel"
                      pattern="[0-9+]{10,13}"
                      maxLength="13"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="login-submit-btn" disabled={loading}>
                  {loading ? (
                    "Verifying..."
                  ) : (
                    <span className="btn-inner-content">
                      <LogIn size={18} /> Login to Portal
                    </span>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Divider: or */}
          <div className="login-divider-container">
            <div className="divider-line"></div>
            <span className="divider-label-text">or</span>
            <div className="divider-line"></div>
          </div>

          <p className="login-bottom-text">
            Don't have an account? <span className="register-now-link" onClick={() => navigate('/student-register')}>Register now</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default StudentLogin;