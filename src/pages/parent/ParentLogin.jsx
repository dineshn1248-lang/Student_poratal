import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaUserGraduate, FaLock, FaMobileAlt, FaKey, FaArrowRight } from 'react-icons/fa';
import './Parent.css';

const ParentLogin = () => {
    const [searchParams] = useSearchParams();
    const [loginMethod, setLoginMethod] = useState('otp'); // 'otp' or 'credentials'
    const [registerNo, setRegisterNo] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    
    const [parentId, setParentId] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    useEffect(() => {
        const regParam = searchParams.get('register_no');
        const otpParam = searchParams.get('otp');
        const tokenParam = searchParams.get('token');

        if (tokenParam) {
            // Auto-login via magic link token
            setParentId(tokenParam);
            setLoginMethod('credentials');
            const autoLogin = async () => {
                try {
                    const resp = await fetch('/api/auth/parent/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ parent_id: tokenParam })
                    });
                    const data = await resp.json();
                    if (resp.ok) {
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('userRole', 'parent');
                        navigate('/parent/dashboard');
                    } else {
                        setError(data.error || "Magic link invalid or expired");
                    }
                } catch (err) {
                    setError("Server connection error during auto-login");
                }
            };
            autoLogin();
        } else if (regParam) {
            setRegisterNo(regParam);
            setLoginMethod('otp');
            if (otpParam) {
                setOtp(otpParam);
                setOtpSent(true);
            }
        }
    }, [searchParams]);

    const handleGetOTP = (e) => {
        e.preventDefault();
        if (!registerNo) {
            setError("Please enter student register number");
            return;
        }
        // Simulate OTP send
        setOtpSent(true);
        setError("OTP sent to registered mobile number! (Use 123456 for demo)");
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        
        let payload = {};
        if (loginMethod === 'otp') {
            if (!otp) { setError("Please enter OTP"); return; }
            payload = { student_register_no: registerNo, otp: otp };
        } else {
            if (!parentId) { setError("Please enter Parent ID"); return; }
            payload = { parent_id: parentId };
        }

        try {
            const resp = await fetch('/api/auth/parent/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await resp.json();
            
            if (resp.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userRole', 'parent');
                navigate('/parent/dashboard');
            } else {
                setError(data.error || "Login failed");
            }
        } catch (err) {
            setError("Server connection error");
        }
    };

    return (
        <div className="parent-wrapper">
            <div className="parent-card" style={{ width: '400px', maxWidth: '90%', padding: '40px 32px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ background: '#f8fafc', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#4f46e5', fontSize: '20px' }}>
                        <FaUserGraduate />
                    </div>
                    <h1 style={{ fontSize: '20px', fontWeight: '900', color: '#1e293b' }}>Parent Portal</h1>
                    <p style={{ color: '#64748b', fontSize: '14px', marginTop: '8px' }}>Access your child's academic progress securely.</p>
                </div>

                <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '8px', padding: '4px', marginBottom: '24px' }}>
                    <button 
                        onClick={() => { setLoginMethod('otp'); setError(''); }}
                        style={{ flex: 1, padding: '8px', border: 'none', background: loginMethod === 'otp' ? '#fff' : 'transparent', borderRadius: '6px', fontWeight: 'bold', color: loginMethod === 'otp' ? '#4f46e5' : '#64748b', boxShadow: loginMethod === 'otp' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer' }}
                    >
                        Login via OTP
                    </button>
                    <button 
                        onClick={() => { setLoginMethod('credentials'); setError(''); }}
                        style={{ flex: 1, padding: '8px', border: 'none', background: loginMethod === 'credentials' ? '#fff' : 'transparent', borderRadius: '6px', fontWeight: 'bold', color: loginMethod === 'credentials' ? '#4f46e5' : '#64748b', boxShadow: loginMethod === 'credentials' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer' }}
                    >
                        Parent ID
                    </button>
                </div>

                {error && <div style={{ background: error.includes('sent') ? '#ecfdf5' : '#fee2e2', color: error.includes('sent') ? '#065f46' : '#991b1b', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={loginMethod === 'otp' && !otpSent ? handleGetOTP : handleLogin}>
                    {loginMethod === 'otp' ? (
                        <>
                            <div className="parent-input-group" style={{ marginBottom: '16px' }}>
                                <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '8px', display: 'block' }}>Student Register Number</label>
                                <div style={{ position: 'relative' }}>
                                    <FaMobileAlt style={{ position: 'absolute', left: '16px', top: '16px', color: '#94a3b8' }} />
                                    <input type="text" value={registerNo} onChange={(e) => setRegisterNo(e.target.value)} disabled={otpSent} style={{ width: '100%', padding: '14px 14px 14px 40px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }} placeholder="e.g. U24AN23S0245" />
                                </div>
                            </div>
                            {otpSent && (
                                <div className="parent-input-group" style={{ marginBottom: '24px' }}>
                                    <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '8px', display: 'block' }}>Enter Secure OTP</label>
                                    <div style={{ position: 'relative' }}>
                                        <FaKey style={{ position: 'absolute', left: '16px', top: '16px', color: '#94a3b8' }} />
                                        <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} style={{ width: '100%', padding: '14px 14px 14px 40px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', letterSpacing: '2px', fontWeight: 'bold' }} placeholder="••••••" />
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="parent-input-group" style={{ marginBottom: '24px' }}>
                                <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '8px', display: 'block' }}>Parent ID / Token</label>
                                <div style={{ position: 'relative' }}>
                                    <FaUserGraduate style={{ position: 'absolute', left: '16px', top: '16px', color: '#94a3b8' }} />
                                    <input type="text" value={parentId} onChange={(e) => setParentId(e.target.value)} style={{ width: '100%', padding: '14px 14px 14px 40px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }} placeholder="Paste Parent ID here" />
                                </div>
                            </div>
                        </>
                    )}

                    <button type="submit" style={{ width: '100%', padding: '14px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        {loginMethod === 'otp' && !otpSent ? 'Send Secure OTP' : 'Login to Portal'} <FaArrowRight />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ParentLogin;
