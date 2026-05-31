import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { FaLock, FaArrowRight, FaKey } from 'react-icons/fa';
import '../parent/Parent.css';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const urlToken = searchParams.get('token');
        if (urlToken) {
            setToken(urlToken);
        } else {
            setError('Invalid or missing password reset token.');
        }
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setStatus('');
        
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        try {
            // Simulate API Call for resetting password
            setStatus('Resetting your password securely...');
            setTimeout(() => {
                setStatus('Password successfully reset! You can now login with your new password.');
                setTimeout(() => {
                    navigate('/'); // Navigate to main login
                }, 2000);
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
                        <FaKey />
                    </div>
                    <h1 style={{ fontSize: '20px', fontWeight: '900', color: '#1e293b' }}>Reset Password</h1>
                    <p style={{ color: '#64748b', fontSize: '14px', marginTop: '8px' }}>Create a strong, new secure password.</p>
                </div>

                {error && <div style={{ background: '#fee2e2', color: '#991b1b', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>{error}</div>}
                {status && <div style={{ background: '#ecfdf5', color: '#065f46', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>{status}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="parent-input-group" style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '8px', display: 'block' }}>New Password</label>
                        <div style={{ position: 'relative' }}>
                            <FaLock style={{ position: 'absolute', left: '16px', top: '16px', color: '#94a3b8' }} />
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                style={{ width: '100%', padding: '14px 14px 14px 40px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }} 
                                placeholder="••••••••" 
                                required
                                disabled={!token || status.includes('successfully')}
                                autoComplete="new-password"
                            />
                        </div>
                    </div>

                    <div className="parent-input-group" style={{ marginBottom: '24px' }}>
                        <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '8px', display: 'block' }}>Confirm New Password</label>
                        <div style={{ position: 'relative' }}>
                            <FaLock style={{ position: 'absolute', left: '16px', top: '16px', color: '#94a3b8' }} />
                            <input 
                                type="password" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                style={{ width: '100%', padding: '14px 14px 14px 40px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }} 
                                placeholder="••••••••" 
                                required
                                disabled={!token || status.includes('successfully')}
                                autoComplete="new-password"
                            />
                        </div>
                    </div>

                    <button type="submit" disabled={!token || status.includes('successfully')} style={{ width: '100%', padding: '14px', background: !token ? '#94a3b8' : '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: !token ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        Update Password <FaArrowRight />
                    </button>

                    <div style={{ marginTop: '24px', textAlign: 'center' }}>
                        <Link to="/" style={{ color: '#64748b', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}>Cancel and return to Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
