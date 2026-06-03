// ─────────────────────────────────────────────────────────────────
// Central API configuration for the Student Portal frontend
// All fetch calls should use these base URLs and helpers.
// ─────────────────────────────────────────────────────────────────

export const API_BASE = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}`;

// ── Reusable fetch helper ─────────────────────────────────────────
export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token");
  const headers = { 
    "Content-Type": "application/json", 
    ...options.headers 
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    headers,
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

// ── Principal Dashboard API calls ─────────────────────────────────

/** Dashboard overview stats */
export const fetchPrincipalStats    = ()  => apiFetch("/principal/stats");

/** All students */
export const fetchStudents          = ()  => apiFetch("/students");

/** Exam section – fee verification */
export const fetchExamFees          = ()  => apiFetch("/principal/exam/fees");

/** Exam section – hall tickets */
export const fetchHallTickets       = ()  => apiFetch("/principal/exam/halltickets");

/** Exam section – internal marks */
export const fetchInternalMarks     = ()  => apiFetch("/principal/exam/marks");

/** Backlog students */
// Removed old fetchBacklogStudents

/** Departments list (Overview) */
export const fetchDepartments       = ()  => apiFetch("/principal/departments/overview");

/** Department Details */
export const fetchDepartmentDetails = (id) => apiFetch(`/principal/departments/${id}`);

// Examination Module APIs
export const fetchExamDashboard = () => apiFetch("/principal/exams/dashboard");
export const fetchExamRegistrations = () => apiFetch("/principal/exams/registrations");
export const fetchExamHallTickets = () => apiFetch("/principal/exams/halltickets");
export const fetchExamInternalMarks = () => apiFetch("/principal/exams/internalmarks");
export const fetchExamRevaluation = () => apiFetch("/principal/exams/revaluation");
export const fetchExamSpecialApprovals = () => apiFetch("/principal/exams/specialapprovals");
export const fetchExamResults = () => apiFetch("/principal/exams/results");

export const approveExamRegistration = (id) => apiFetch("/principal/exams/approve", {
  method: 'POST',
  body: JSON.stringify({ id })
});

export const rejectExamRegistration = (id) => apiFetch("/principal/exams/reject", {
  method: 'POST',
  body: JSON.stringify({ id })
});

// Attendance Module APIs
export const fetchPrincipalAttendance = () => apiFetch("/principal/attendance");
export const fetchAttendanceAnalytics = () => apiFetch("/principal/attendance/analytics");
export const fetchAttendanceAlerts = () => apiFetch("/principal/attendance/alerts");

// Fee Module APIs
export const fetchPrincipalFees = () => apiFetch("/principal/fees");
export const fetchFeeAnalytics = () => apiFetch("/principal/fees/analytics");
export const fetchFeeApprovals = () => apiFetch("/principal/fees/approvals");

// Student Management (Principal)
export const fetchPrincipalStudents = (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v) params.append(k, v);
  });
  return apiFetch(`/principal/students?${params.toString()}`);
};

export const fetchPrincipalStudentDetail = (id) => apiFetch(`/principal/student/${id}`);

// Backlog & Announcement APIs
// Removed old fetchPrincipalBacklogs
// Announcement Module APIs (New)
export const fetchAnnouncementStats = () => apiFetch("/principal/announcements/stats");
export const fetchAnnouncementList = (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v && v !== 'All') params.append(k, v);
  });
  const queryString = params.toString();
  const url = `/principal/announcements${queryString ? '?' + queryString : ''}`;
  return apiFetch(url);
};
export const createAnnouncement = (data) => apiFetch("/principal/announcements", {
  method: 'POST',
  body: JSON.stringify(data)
});
export const deleteAnnouncement = (id) => apiFetch(`/principal/announcements/${id}`, {
  method: 'DELETE'
});
export const updateAnnouncement = (id, data) => apiFetch(`/principal/announcements/${id}`, {
  method: 'PUT',
  body: JSON.stringify(data)
});
export const publishAnnouncement = (id) => apiFetch("/principal/announcements/publish", {
  method: 'POST',
  body: JSON.stringify({ id })
});
export const archiveAnnouncement = (id) => apiFetch("/principal/announcements/archive", {
  method: 'POST',
  body: JSON.stringify({ id })
});

// Report Section APIs
export const fetchReportDashboard = () => apiFetch("/principal/reports/dashboard");
export const fetchReportAcademic  = () => apiFetch("/principal/reports/academic");
export const fetchReportAttendance = () => apiFetch("/principal/reports/attendance");
export const fetchReportExams      = () => apiFetch("/principal/reports/exams");
export const fetchReportFees       = () => apiFetch("/principal/reports/fees");
export const fetchReportBacklogs   = () => apiFetch("/principal/reports/backlogs");
export const triggerReportExport   = (format) => apiFetch(`/principal/reports/export/${format}`);

// Backlog Module APIs (New)
export const fetchBacklogDashboard = () => apiFetch("/principal/backlogs/dashboard");
export const fetchBacklogStudentList = (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v && v !== 'All') params.append(k, v);
  });
  const queryString = params.toString();
  const url = `/principal/backlogs/students${queryString ? '?' + queryString : ''}`;
  return apiFetch(url);
};
export const fetchBacklogDetail = (id) => apiFetch(`/principal/backlogs/student/${id}`);
export const fetchBacklogAnalytics = () => apiFetch("/principal/backlogs/analytics");
