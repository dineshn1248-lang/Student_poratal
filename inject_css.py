css_additions = """
/* Parent Communication Dashboard Styles */
.parent-comm-dashboard {
    padding: 24px;
    background: #fafbfc;
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
}

.dashboard-header {
    margin-bottom: 24px;
}

.dashboard-title {
    font-size: 22px;
    font-weight: 800;
    color: #111827;
    margin: 0 0 6px 0;
    letter-spacing: -0.5px;
}

.dashboard-subtitle {
    margin: 0;
    color: #6b7280;
    font-size: 14px;
    font-weight: 500;
}

/* Summary Cards */
.summary-cards-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
    margin-bottom: 32px;
}

.summary-card {
    background: #ffffff;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 12px;
}

.summary-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
}

.icon-whatsapp { background: #dcfce7; color: #16a34a; }
.icon-email { background: #eff6ff; color: #2563eb; }
.icon-sms { background: #ffedd5; color: #ea580c; }
.icon-parents { background: #f3e8ff; color: #9333ea; }
.icon-success { background: #e0f2fe; color: #0284c7; }

.summary-details {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.summary-label {
    font-size: 13px;
    font-weight: 700;
    color: #374151;
    margin-bottom: 4px;
}

.summary-value {
    font-size: 28px;
    font-weight: 800;
    color: #111827;
}

.summary-trend {
    font-size: 11px;
    color: #6b7280;
    font-weight: 600;
    margin-top: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
}
.trend-icon { color: #10b981; }

/* Main Grid */
.main-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 24px;
}
.left-column {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

/* Channel Cards */
.channel-cards-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
}

.channel-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 20px;
    border-top: 4px solid transparent;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02);
}

.border-whatsapp { border-top-color: #22c55e; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; }
.border-email { border-top-color: #3b82f6; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; }
.border-sms { border-top-color: #f97316; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; }

.channel-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
}

.channel-icon-large {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
}

.channel-title {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
    color: #111827;
}

.channel-desc {
    margin: 2px 0 0;
    font-size: 11px;
    color: #6b7280;
    font-weight: 500;
}

.channel-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 24px;
}

.btn-outline {
    padding: 8px 0;
    border-radius: 6px;
    background: transparent;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    text-align: center;
    transition: all 0.2s;
}

.outline-whatsapp { border: 1px solid #86efac; color: #16a34a; }
.outline-whatsapp:hover { background: #f0fdf4; }
.outline-email { border: 1px solid #93c5fd; color: #2563eb; }
.outline-email:hover { background: #eff6ff; }
.outline-sms { border: 1px solid #fdba74; color: #ea580c; }
.outline-sms:hover { background: #fff7ed; }

.channel-stats {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.c-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.c-stat-label {
    font-size: 11px;
    font-weight: 600;
    color: #6b7280;
    margin-bottom: 4px;
}

.c-stat-val {
    font-size: 20px;
    font-weight: 800;
}

.val-green { color: #16a34a; }
.val-red { color: #dc2626; }
.val-blue { color: #2563eb; }
.val-orange { color: #ea580c; }

.channel-footer {
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    padding-top: 16px;
    border-top: 1px solid #f3f4f6;
}

.text-whatsapp { color: #16a34a; }
.text-email { color: #2563eb; }
.text-sms { color: #ea580c; }
.text-gray { color: #6b7280; }
.text-dark { color: #111827; }

/* Bulk Section */
.bulk-comm-section {
    background: #ffffff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}

.section-title {
    margin: 0 0 16px;
    font-size: 15px;
    font-weight: 700;
    color: #111827;
}

.bulk-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;
}

.bulk-card {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 16px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    box-shadow: 0 1px 2px rgba(0,0,0,0.02);
}

.bulk-icon {
    font-size: 20px;
    margin-bottom: 12px;
}
.icon-blue { color: #3b82f6; }
.icon-purple { color: #8b5cf6; }
.icon-teal { color: #14b8a6; }
.icon-orange { color: #f59e0b; }
.icon-indigo { color: #6366f1; }

.bulk-title {
    margin: 0 0 4px;
    font-size: 13px;
    font-weight: 700;
    color: #111827;
}

.bulk-desc {
    margin: 0 0 16px;
    font-size: 10px;
    color: #6b7280;
    line-height: 1.4;
    flex: 1;
}

.btn-select {
    width: 100%;
    padding: 6px 0;
    background: #ffffff;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    color: #374151;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}
.btn-select:hover {
    background: #f9fafb;
    border-color: #9ca3af;
}

/* Sidebar */
.right-sidebar {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.sidebar-section {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}

.sidebar-title {
    margin: 0 0 16px;
    font-size: 14px;
    font-weight: 700;
    color: #111827;
}

.student-select {
    width: 100%;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    background: #f9fafb;
    font-size: 13px;
    font-weight: 500;
    color: #111827;
    outline: none;
    appearance: none;
}

.parent-details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 16px;
}

.pd-label {
    font-size: 11px;
    font-weight: 600;
    color: #6b7280;
}

.pd-value {
    font-size: 13px;
    color: #374151;
    display: flex;
    align-items: center;
}

.fw-600 { font-weight: 600; }
.fw-500 { font-weight: 500; }
.mt-2 { margin-top: 8px; }

.message-preview-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.message-preview-box {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 16px;
    flex: 1;
    margin-bottom: 16px;
    overflow-y: auto;
    min-height: 250px;
}

.preview-text {
    font-family: 'Fira Code', 'Courier New', monospace;
    font-size: 12px;
    color: #374151;
    line-height: 1.6;
    white-space: pre-wrap;
}

.preview-placeholder {
    font-size: 13px;
    color: #9ca3af;
    text-align: center;
    margin-top: 100px;
}

.preview-actions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
}

.btn-solid {
    padding: 10px 0;
    border-radius: 6px;
    border: none;
    color: white;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
}
.btn-solid:disabled { opacity: 0.5; cursor: not-allowed; }

.bg-whatsapp { background: #16a34a; }
.bg-whatsapp:hover:not(:disabled) { background: #15803d; }
.bg-email { background: #2563eb; }
.bg-email:hover:not(:disabled) { background: #1d4ed8; }
.bg-sms { background: #f97316; }
.bg-sms:hover:not(:disabled) { background: #ea580c; }

/* Logs Table */
.logs-section {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}

.logs-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.table-responsive {
    overflow-x: auto;
}

.logs-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
}

.logs-table th {
    padding: 16px 12px;
    font-size: 12px;
    font-weight: 700;
    color: #6b7280;
    border-bottom: 1px solid #e5e7eb;
}

.logs-table td {
    padding: 16px 12px;
    font-size: 13px;
    color: #374151;
    border-bottom: 1px solid #f3f4f6;
}

.channel-cell {
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-view {
    background: transparent;
    border: none;
    color: #2563eb;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
}

.view-all-link {
    text-align: center;
    margin-top: 16px;
    font-size: 12px;
    font-weight: 700;
    color: #2563eb;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
}

.expanded-row td {
    padding: 16px !important;
    background: #f9fafb;
}

.raw-response {
    background: #111827;
    color: #10b981;
    padding: 16px;
    border-radius: 8px;
    font-size: 11px;
    font-family: 'Fira Code', monospace;
    margin: 0;
    overflow-x: auto;
}

.status-badge {
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 700;
}
.status-delivered { background: #ecfdf5; color: #059669; }
.status-sent { background: #eff6ff; color: #2563eb; }
.status-queued { background: #e0e7ff; color: #4f46e5; }
.status-pending { background: #fef3c7; color: #d97706; }
.status-failed { background: #fef2f2; color: #dc2626; }
.status-default { background: #f1f5f9; color: #475569; }

.alert-success {
    padding: 12px 16px; background: #ecfdf5; color: #065f46; border-radius: 8px; border-left: 4px solid #10b981; margin-bottom: 20px; font-size: 14px; font-weight: 600;
}
.alert-error {
    padding: 12px 16px; background: #fef2f2; color: #991b1b; border-radius: 8px; border-left: 4px solid #ef4444; margin-bottom: 20px; font-size: 14px; font-weight: 600;
}
"""
import os
with open(os.path.join("src", "pages", "hod", "HOD.css"), "a", encoding="utf-8") as f:
    f.write(css_additions)
print("CSS injected successfully")
