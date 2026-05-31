import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function AdmissionsInfo() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      <button 
        onClick={() => navigate('/home')}
        style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', marginBottom: '30px', padding: 0 }}
      >
        <FaArrowLeft /> Back to Home
      </button>

      <h1 style={{ color: '#0f172a', fontSize: '20px', marginBottom: '20px' }}>Admission Guidelines 2026-2027</h1>
      <p style={{ color: '#475569', fontSize: '18px', lineHeight: '1.8', marginBottom: '30px' }}>
        Welcome to Nrupathunga University's admission portal for the academic year 2026-2027. We are dedicated to providing world-class education and fostering an environment of knowledge, experiment, and excellence.
      </p>

      <div style={{ background: '#f8fafc', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
        <h2 style={{ color: '#1e293b', marginTop: 0 }}>Key Details</h2>
        <ul style={{ color: '#475569', lineHeight: '1.8', paddingLeft: '20px', margin: 0 }}>
          <li style={{ marginBottom: '10px' }}><strong>Eligibility:</strong> Candidates must have passed 10+2 or equivalent with a minimum of 50% aggregate marks.</li>
          <li style={{ marginBottom: '10px' }}><strong>Application Process:</strong> All applications must be submitted online through the UUCMS portal.</li>
          <li style={{ marginBottom: '10px' }}><strong>Important Dates:</strong> Admissions close on August 15, 2026. The merit list will be published on August 25, 2026.</li>
          <li><strong>Documents Required:</strong> 10th and 12th marks cards, Transfer Certificate, Migration Certificate, and recent passport-size photographs.</li>
        </ul>
      </div>

      <p style={{ fontWeight: '600', color: '#0f172a', background: '#fef08a', padding: '15px', borderRadius: '8px', display: 'inline-block' }}>
        Please note that all admissions are purely on a merit basis as per government regulations.
      </p>
    </div>
  );
}

export default AdmissionsInfo;
