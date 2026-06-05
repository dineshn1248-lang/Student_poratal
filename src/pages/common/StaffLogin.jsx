import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Users, BarChart2, Lock, Mail, Eye, EyeOff, ChevronDown, LogIn, ArrowLeft } from "lucide-react";
import "../../styles/StaffLogin.css";
import nrupathungaLogo from "../../assets/nrupathunga_logo.png";

function StaffLogin() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setError("");
    
    if (!role) {
      setError("Please select your professional role.");
      return;
    }

    setLoading(true);
    try {
      let baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      baseUrl = baseUrl.replace(/\/$/, "");
      if (!baseUrl.endsWith('/api')) baseUrl += '/api';
      const res = await fetch(`${baseUrl}/auth/staff/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          username: username, 
          password: password, 
        }),
      });

      let data = {};
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      }

      if (res.status === 200) {
        const finalRole = role || data?.user?.role || "principal";
        
        localStorage.setItem("token", data?.token);
        localStorage.setItem("staffRole", finalRole);
        localStorage.setItem("staffName", data?.user?.full_name || "Staff User");

        if (finalRole === "principal") navigate("/principal-dashboard");
        else if (finalRole === "hod") navigate("/hod-dashboard");
        else if (finalRole === "faculty") navigate("/faculty-dashboard");
        else setError("Unknown staff role detected.");
      } else {
        setError(data?.error || "Invalid credentials. Please check email, password, and selected role.");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Network or Server error. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-overlay-bg" />
      
      <div className="login-container-inner">
        {/* LEFT PANEL: BRANDING & FEATURES */}
        <div className="login-left-brand-panel">
          <div className="brand-header-block">
            <img src={nrupathungaLogo} alt="Nrupathunga University Logo" className="brand-logo-img" />
            <div className="brand-text-col">
              <span className="brand-title-main">NRUPATHUNGA UNIVERSITY</span>
              <span className="brand-title-sub">EXCELLENCE IN EDUCATION</span>
            </div>
          </div>

          <div className="brand-welcome-mid">
            <h2>Welcome Back,<br /><span>Administrator</span></h2>
            <div className="heading-gradient-bar" />
            <p className="brand-welcome-desc">
              Secure access to the university management system and empower education.
            </p>
          </div>

          {/* Features Vertical List */}
          <div className="brand-vertical-features">
            <div className="brand-feature-row">
              <div className="feat-icon-glow blue-feat">
                <Shield size={20} />
              </div>
              <div className="feat-text-block">
                <h4>Secure & Reliable</h4>
                <p>Advanced encryption keeps your data protected</p>
              </div>
            </div>

            <div className="brand-feature-row">
              <div className="feat-icon-glow purple-feat">
                <Users size={20} />
              </div>
              <div className="feat-text-block">
                <h4>Role Based Access</h4>
                <p>Different roles. Different dashboards. One system.</p>
              </div>
            </div>

            <div className="brand-feature-row">
              <div className="feat-icon-glow green-feat">
                <BarChart2 size={20} />
              </div>
              <div className="feat-text-block">
                <h4>Real-time Insights</h4>
                <p>Make smarter decisions with powerful analytics</p>
              </div>
            </div>
          </div>

          <p className="brand-footer-text">
            &copy; {new Date().getFullYear()} Nrupathunga University. All rights reserved.
          </p>
        </div>

        {/* RIGHT PANEL: GLASSMORPHIC CARD */}
        <div className="login-right-form-panel">
          <div className="login-card-glass">
            
            {/* Top Lock Badge */}
            <div className="card-top-lock-glow">
              <Shield size={28} />
            </div>

            <button 
              onClick={() => navigate('/login-portal')} 
              style={{ position: 'absolute', top: '30px', left: '30px', background: 'transparent', border: 'none', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
            >
              <ArrowLeft size={16} /> Back to Portals
            </button>

            <h1 className="card-title">
              <span>Admin</span> Login
            </h1>
            <div className="card-title-divider">
              <span className="diamond-star">✦</span>
            </div>
            <p className="card-subtitle">Sign in to your staff account</p>

            {error && (
              <div className="login-error-box">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="login-form-fields">
              
              {/* Login As (Role Select) */}
              <div className="form-field-group">
                <label>Login As</label>
                <div className="custom-select-wrapper">
                  <Users className="field-left-icon" size={18} />
                  <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)} 
                    required
                  >
                    <option value="">Select your role</option>
                    <option value="principal">Principal</option>
                    <option value="hod">HOD</option>
                    <option value="faculty">Faculty</option>
                  </select>
                  <ChevronDown className="select-chevron-right" size={18} />
                </div>
              </div>

              {/* Username Input */}
              <div className="form-field-group">
                <label>Email / Username</label>
                <div className="field-input-wrapper">
                  <Mail className="field-left-icon" size={18} />
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="form-field-group">
                <label>Password</label>
                <div className="field-input-wrapper">
                  <Lock className="field-left-icon" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                  <button 
                    type="button" 
                    className="password-reveal-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="forgot-password-link" onClick={() => navigate("/forgot-password")}>
                Forgot Password?
              </div>

              {/* Submit Capsule Button */}
              <button type="submit" className="login-submit-btn-glow" disabled={loading}>
                {loading ? (
                  "Signing in..."
                ) : (
                  <>
                    <Lock size={16} /> Sign In
                  </>
                )}
              </button>

            </form>

            {/* Bottom Security Banner */}
            <div className="secure-badge-footer">
              <Shield className="secure-footer-icon" size={16} />
              <span>
                Your information is protected with enterprise-grade security.
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffLogin;