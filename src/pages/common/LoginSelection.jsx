import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, UserCog, GraduationCap, UsersRound, BookOpen, ArrowLeft, ArrowRight } from 'lucide-react';
import '../../styles/LoginSelection.css';
import karnatakaLogo from "../../assets/karnataka_logo.svg";
import nrupathungaLogo from "../../assets/nrupathunga_logo.png";

const LoginSelection = () => {
  const navigate = useNavigate();
  // 'main' | 'admin' | 'user'
  const [viewState, setViewState] = useState('main');

  const adminRoles = [
    { id: 'admin', title: 'Admin', desc: 'Main administration dashboard', icon: <Shield size={28} />, route: '/staff-login', color: 'admin' },
    { id: 'principal', title: 'Principal', desc: 'Principal dashboard and reports', icon: <BookOpen size={28} />, route: '/staff-login', color: 'principal' },
    { id: 'hod', title: 'HOD', desc: 'Department head management', icon: <UserCog size={28} />, route: '/staff-login', color: 'hod' },
    { id: 'faculty', title: 'Faculty', desc: 'Teacher portal access', icon: <GraduationCap size={28} />, route: '/staff-login', color: 'faculty' }
  ];

  const userRoles = [
    { id: 'student', title: 'Student', desc: 'Access academic records', icon: <Users size={28} />, route: '/student-login', color: 'student' },
    { id: 'parent', title: 'Parent', desc: 'Track student progress', icon: <UsersRound size={28} />, route: '/parent-login', color: 'parent' }
  ];

  return (
    <div className="login-selection-container">
      <div className="ls-overlay" />
      <div className="ls-content">
        
        {/* Header */}
        <div className="ls-header">
          <div className="ls-brand">
            <img src={karnatakaLogo} alt="Govt of Karnataka" className="ls-logo" />
            <div className="ls-brand-text">
              <span className="ls-brand-title">Nrupathunga University</span>
              <span className="ls-brand-sub">Academic Login Portal</span>
            </div>
            <img src={nrupathungaLogo} alt="Nrupathunga" className="ls-logo" />
          </div>
          <button className="ls-back-btn" onClick={() => navigate('/home')}>
            <ArrowLeft size={16} /> Back to Website
          </button>
        </div>

        {/* Title */}
        <div className="ls-welcome">
          <h2>Select Your Portal</h2>
          <p>Please select your portal to access the secure academic system.</p>
        </div>

        {/* Views */}
        <div className="ls-view-container">
          
          {/* Main View (2 Large Cards) */}
          {viewState === 'main' && (
            <div className="hero-portal-cards fade-in">
              
              {/* Admin Portal Card */}
              <div className="hero-portal-card admin-glass-card" onClick={() => navigate('/staff-login')}>
                <div className="card-icon-wrapper admin-icon">
                  <Shield size={32} strokeWidth={1.5} />
                </div>
                <h3>Admin Portal</h3>
                <p className="card-subtext"></p>
                <button className="card-enter-btn admin-btn">
                  Login <ArrowRight size={16} />
                </button>
              </div>

              {/* User Portal Card */}
              <div className="hero-portal-card user-glass-card" onClick={() => navigate('/student-login')}>
                <div className="card-icon-wrapper user-icon">
                  <Users size={32} strokeWidth={1.5} />
                </div>
                <h3>User Portal</h3>
                <p className="card-subtext">Access for students and parents</p>
                <button className="card-enter-btn user-btn">
                  Login <ArrowRight size={16} />
                </button>
              </div>

            </div>
          )}

          {/* Admin Sub-roles */}
          {viewState === 'admin' && (
            <div className="fade-in">
               <button className="ls-sub-back-btn" onClick={() => setViewState('main')}>
                 <ArrowLeft size={16} /> Back to Portals
               </button>
               <div className="ls-sub-grid ls-grid-4">
                 {adminRoles.map(role => (
                   <div key={role.id} className={`ls-sub-card border-${role.color}`} onClick={() => navigate(role.route)}>
                      <div className={`ls-sub-icon text-${role.color}`}>{role.icon}</div>
                      <h4>{role.title} Login</h4>
                      <p>{role.desc}</p>
                      <button className={`ls-sub-btn bg-${role.color}`}>Login</button>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {/* User Sub-roles */}
          {viewState === 'user' && (
            <div className="fade-in">
               <button className="ls-sub-back-btn" onClick={() => setViewState('main')}>
                 <ArrowLeft size={16} /> Back to Portals
               </button>
               <div className="ls-sub-grid ls-grid-2">
                 {userRoles.map(role => (
                   <div key={role.id} className={`ls-sub-card border-${role.color}`} onClick={() => navigate(role.route)}>
                      <div className={`ls-sub-icon text-${role.color}`}>{role.icon}</div>
                      <h4>{role.title} Login</h4>
                      <p>{role.desc}</p>
                      <button className={`ls-sub-btn bg-${role.color}`}>Login</button>
                   </div>
                 ))}
               </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default LoginSelection;
