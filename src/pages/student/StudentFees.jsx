import { useState, useEffect } from "react";
import { FaFileInvoiceDollar, FaRegCreditCard, FaHistory, FaCheckCircle, FaExclamationCircle, FaDownload, FaUniversity, FaReceipt } from "react-icons/fa";
import StudentLayout from "./StudentLayout";
import "./Student.css";

export default function StudentFees() {
  const [fees, setFees] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    const token = localStorage.getItem("token");
    try {
      const resp = await fetch(`${'https://student-poratal.onrender.com/api'}/student/fees`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const d = await resp.json();
      if (resp.ok) setFees(d);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading Fee Details...</div>;

  return (
    <StudentLayout>
      <div className="std-dashboard-header" style={{ marginBottom: '32px' }}>
         <h1 style={{ fontSize: '20px', fontWeight: '800' }}>Fees Management</h1>
         <p style={{ color: '#64748b', fontSize: '14px' }}>Manage your academic fees and view payment history</p>
      </div>

      <div className="std-grid-row">
        {/* LEFT: PAYMENT PANEL */}
        <div className="std-panel">
          <div className="std-panel-header"><h4>Payment Overview</h4></div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
             <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Total Fee</div>
                <div style={{ fontSize: '20px', fontWeight: '800', marginTop: '4px' }}>₹{fees?.total}</div>
             </div>
             <div style={{ padding: '20px', background: '#ecfdf5', borderRadius: '16px', border: '1px solid #d1fae5' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#059669', textTransform: 'uppercase' }}>Paid Amount</div>
                <div style={{ fontSize: '20px', fontWeight: '800', marginTop: '4px', color: '#059669' }}>₹{fees?.paid}</div>
             </div>
             <div style={{ padding: '20px', background: fees?.pending <= 0 ? '#ecfdf5' : '#fff1f2', borderRadius: '16px', border: `1px solid ${fees?.pending <= 0 ? '#d1fae5' : '#fecdd3'}` }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: fees?.pending <= 0 ? '#059669' : '#e11d48', textTransform: 'uppercase' }}>Remaining</div>
                <div style={{ fontSize: '20px', fontWeight: '800', marginTop: '4px', color: fees?.pending <= 0 ? '#059669' : '#e11d48' }}>
                  {fees?.pending <= 0 ? '₹0' : `₹${fees?.pending}`}
                </div>
             </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                   <h5 style={{ fontSize: '18px', fontWeight: '800' }}>Semester Academic Fee</h5>
                   <p style={{ fontSize: '14px', color: '#64748b' }}>Includes Tuition, Library, and Sports fees</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                   <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>Due Date</div>
                   <div style={{ fontSize: '14px', fontWeight: '800', color: '#f43f5e' }}>{fees?.due_date}</div>
                </div>
             </div>
             <div style={{ display: 'flex', gap: '12px' }}>
                {fees?.pending > 0 && (
                  <button style={{ flex: 1, padding: '14px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                     <FaRegCreditCard /> Pay Remaining Balance
                  </button>
                )}
                <button style={{ padding: '14px 20px', background: 'white', border: '1px solid #cbd5e1', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', width: fees?.pending <= 0 ? '100%' : 'auto' }}>
                   <FaDownload /> {fees?.pending <= 0 ? 'Download Fee Receipt' : ''}
                </button>
             </div>
          </div>

          <div style={{ marginTop: '32px' }}>
             <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>Recent Payment History</h4>
             <div className="std-table-container">
                <table className="std-table">
                   <thead>
                      <tr>
                         <th>Reference ID</th>
                         <th>Category</th>
                         <th>Date</th>
                         <th>Amount</th>
                         <th>Status</th>
                      </tr>
                   </thead>
                   <tbody>
                      <tr>
                         <td style={{ fontWeight: '600' }}>#TRX-998273</td>
                         <td>Academic Fee</td>
                         <td>05 Apr 2026</td>
                         <td style={{ fontWeight: '700' }}>₹23,000</td>
                         <td><span style={{ padding: '4px 8px', background: '#ecfdf5', color: '#059669', borderRadius: '6px', fontSize: '12px', fontWeight: '800' }}>SUCCESS</span></td>
                      </tr>
                   </tbody>
                </table>
             </div>
          </div>
        </div>

        {/* RIGHT: ADVISORY */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
           <div className="std-panel">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                 <FaReceipt color="#4f46e5" size={20} />
                 <h4 style={{ fontWeight: '700' }}>Fee Breakdown</h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                 {[
                   { label: "Tuition Fee", amount: "₹18,000" },
                   { label: "Laboratory Fee", amount: "₹3,000" },
                   { label: "Library & Sports", amount: "₹2,000" },
                   { label: "Exam Registration", amount: "Announcing Soon", special: true },
                 ].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}>
                       <span style={{ color: '#64748b', fontWeight: '500' }}>{item.label}</span>
                       <span style={{ fontWeight: '700', color: item.special ? '#ea580c' : 'inherit' }}>{item.amount}</span>
                    </div>
                 ))}
                 <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', paddingTop: '10px' }}>
                    <span style={{ fontWeight: '800' }}>Total Payable</span>
                    <span style={{ fontWeight: '800', color: '#4f46e5' }}>₹23,000</span>
                 </div>
              </div>
           </div>

           <div className="std-panel" style={{ background: '#fef2f2', border: '1px solid #fecdd3' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                 <FaExclamationCircle color="#ef4444" size={24} />
                 <div>
                    <h5 style={{ fontWeight: '800', color: '#991b1b', marginBottom: '4px' }}>Important Notice</h5>
                    <p style={{ fontSize: '14px', color: '#b91c1c', fontWeight: '500', lineHeight: 1.5 }}>
                       Final date for clearing all academic dues is <strong>June 15th, 2026</strong>. Failure to clear fees will result in hall ticket withholding for the upcoming semester examinations.
                    </p>
                 </div>
              </div>
           </div>

           <div className="std-panel">
              <div className="std-panel-header"><h4>Quick Support</h4></div>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>Need assistance with payments or extensions?</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                 <button style={{ padding: '12px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaUniversity /> Request Installment Plan
                 </button>
                 <button style={{ padding: '12px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaHistory /> Apply for Fee Waiver
                 </button>
              </div>
           </div>
        </div>
      </div>
    </StudentLayout>
  );
}
