import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';

function ContactUs() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      <button 
        onClick={() => navigate('/home')}
        style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', marginBottom: '30px', padding: 0 }}
      >
        <FaArrowLeft /> Back to Home
      </button>

      <h1 style={{ color: '#0f172a', fontSize: '20px', marginBottom: '20px' }}>Contact Us</h1>
      <p style={{ color: '#475569', fontSize: '18px', lineHeight: '1.8', marginBottom: '40px' }}>
        If you have any queries regarding the admission process or require technical support, our administrative staff is here to help you.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        <div style={{ background: '#f8fafc', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', gap: '15px' }}>
          <FaMapMarkerAlt style={{ color: '#2563eb', fontSize: '20px', flexShrink: 0, marginTop: '4px' }} />
          <div>
            <h3 style={{ margin: '0 0 10px 0', color: '#1e293b' }}>Address</h3>
            <p style={{ margin: 0, color: '#475569', lineHeight: '1.6' }}>Nrupathunga University<br/>Nrupathunga Road<br/>Bengaluru, Karnataka 560001</p>
          </div>
        </div>

        <div style={{ background: '#f8fafc', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', gap: '15px' }}>
          <FaPhoneAlt style={{ color: '#10b981', fontSize: '20px', flexShrink: 0, marginTop: '4px' }} />
          <div>
            <h3 style={{ margin: '0 0 10px 0', color: '#1e293b' }}>Phone</h3>
            <p style={{ margin: 0, color: '#475569', lineHeight: '1.6' }}>+91 80 2221 2123</p>
          </div>
        </div>

        <div style={{ background: '#f8fafc', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', gap: '15px' }}>
          <FaEnvelope style={{ color: '#f59e0b', fontSize: '20px', flexShrink: 0, marginTop: '4px' }} />
          <div>
            <h3 style={{ margin: '0 0 10px 0', color: '#1e293b' }}>Email</h3>
            <p style={{ margin: 0, color: '#475569', lineHeight: '1.6' }}>admissions@nrupathungauniversity.ac.in</p>
          </div>
        </div>

        <div style={{ background: '#f8fafc', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', gap: '15px' }}>
          <FaClock style={{ color: '#8b5cf6', fontSize: '20px', flexShrink: 0, marginTop: '4px' }} />
          <div>
            <h3 style={{ margin: '0 0 10px 0', color: '#1e293b' }}>Working Hours</h3>
            <p style={{ margin: 0, color: '#475569', lineHeight: '1.6' }}>Monday to Saturday<br/>10:00 AM to 5:00 PM</p>
          </div>
        </div>

      </div>

      <div style={{ marginTop: '40px', padding: '20px', background: '#eff6ff', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
        <p style={{ margin: 0, color: '#1e3a8a', fontSize: '14px' }}>
          <strong>Note:</strong> For technical issues related to the student portal, please contact the IT support desk via email with your application number.
        </p>
      </div>
    </div>
  );
}

export default ContactUs;
