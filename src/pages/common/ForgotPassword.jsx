import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaArrowRight, FaLock, FaUserGraduate } from 'react-icons/fa';
import '../parent/Parent.css'; // Reuse existing sleek CSS

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setStatus('');
        
        if (!email) {
            setError('Please enter your registered email address.');
            return;
        }

        try {
            // Simulate API Call
            setStatus('Sending secure reset link to your email...');
            setTimeout(() => {
                setStatus('A password reset link has been sent to ' + email + '. (Demo: Click below to reset)');
            }, 1500);
        } catch (err) {
            setError('Server connection error. Please try again.');
        }
    };

    return (
        <div className="parent-wrapper">
            <div className="parent-card" style={{ width: '400px', maxWidth: '90%', padding: '40px 32px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ background: '#f8fafc', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#4f46e5', fontSize: '20px' }}>
                        <FaLock />
                    </div>
                    <h1 style={{ fontSize: '20px', fontWeight: '900', color: '#1e293b' }}>Forgot Password</h1>
                    <p style={{ color: '#64748b', fontSize: '14px', marginTop: '8px' }}>Enter your email to receive a secure reset link.</p>
                </div>

                {error && <div style={{ background: '#fee2e2', color: '#991b1b', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>{error}</div>}
                {status && <div style={{ background: '#ecfdf5', color: '#065f46', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>{status}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="parent-input-group" style={{ marginBottom: '24px' }}>
                        <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '8px', display: 'block' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <FaEnvelope style={{ position: 'absolute', left: '16px', top: '16px', color: '#94a3b8' }} />
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                style={{ width: '100%', padding: '14px 14px 14px 40px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }} 
                                placeholder="e.g. user@nrupathunga.ac.in" 
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" style={{ width: '100%', padding: '14px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        Send Reset Link <FaArrowRight />
                    </button>
                    
                    {status.includes('Demo') && (
                         <div style={{marginTop: '20px', textAlign: 'center'}}>
                            <Link to="/reset-password?token=demo-token" style={{color: '#4f46e5', fontWeight: 'bold', textDecoration: 'none'}}>Demo: Proceed to Reset Password</Link>
                         </div>
                    )}

                    <div style={{ marginTop: '24px', textAlign: 'center' }}>
                        <Link to="/" style={{ color: '#64748b', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}>Back to Login Options</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
