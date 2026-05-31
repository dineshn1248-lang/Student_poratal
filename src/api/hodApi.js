import { apiFetch } from './principalApi';

// Student Management APIs
export const fetchHodStudentStats = () => apiFetch("/hod/students/stats");

export const fetchHodStudents = (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'All') params.append(key, value);
    });
    const queryString = params.toString();
    return apiFetch(`/hod/students${queryString ? '?' + queryString : ''}`);
};

export const fetchHodStudentDetail = (id) => apiFetch(`/hod/students/${id}`);

export const createHodStudent = (data) => apiFetch("/hod/students", {
    method: 'POST',
    body: JSON.stringify(data)
});

export const updateHodStudent = (id, data) => apiFetch(`/hod/students/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
});

export const deleteHodStudent = (id) => apiFetch(`/hod/students/${id}`, {
    method: 'DELETE'
});

// Faculty Management APIs
export const fetchHodFacultyStats = () => apiFetch("/faculty/stats");
export const fetchHodFaculty = (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'All') params.append(key, value);
    });
    const queryString = params.toString();
    return apiFetch(`/faculty${queryString ? '?' + queryString : ''}`);
};
export const fetchHodFacultyDetail = (id) => apiFetch(`/faculty/${id}`);
export const createHodFaculty = (data) => apiFetch("/faculty", {
    method: 'POST',
    body: JSON.stringify(data)
});
export const deleteHodFaculty = (id) => apiFetch(`/faculty/${id}`, {
    method: 'DELETE'
});

// Legacy helpers
export const fetchHodStats = () => apiFetch("/hod/stats");
export const fetchHodCharts = () => apiFetch("/hod/charts");
export const fetchHodAlerts = () => apiFetch("/hod/alerts");
export const fetchNotifications = () => apiFetch("/notifications");

// Attendance Management APIs
export const fetchHodAttendanceStats = () => apiFetch('/hod/attendance/stats');
export const fetchHodAttendance = (params) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value && value !== 'All') query.append(key, value);
    });
    const queryString = query.toString();
    return apiFetch(`/hod/attendance${queryString ? '?' + queryString : ''}`);
};
export const fetchHodAttendanceCharts = () => apiFetch('/hod/attendance/chart');
export const updateHodAttendance = (data) => apiFetch('/hod/attendance/update', {
    method: 'POST',
    body: JSON.stringify(data)
});

// Examinations Management APIs
export const fetchHodExamStats = () => apiFetch('/hod/examinations/stats');
export const fetchHodExamOverview = () => apiFetch('/hod/examinations/semester_overview');
export const fetchHodExamSubjectResults = (semester) => apiFetch(`/hod/examinations/subject_results/${semester}`);
export const fetchHodExamBacklogs = (semester) => apiFetch(`/hod/examinations/backlogs/${semester}`);

// Legacy Examination methods (in case they're still used elsewhere)
export const fetchHodExaminations = (params) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value && value !== 'All') query.append(key, value);
    });
    const queryString = query.toString();
    return apiFetch(`/hod/examinations${queryString ? '?' + queryString : ''}`);
};
export const fetchHodExamCharts = () => apiFetch('/hod/examinations/chart');
export const fetchHodExamApprovals = () => apiFetch('/hod/examinations/approvals');
export const approveExamRequest = (id) => apiFetch('/hod/examinations/approve', {
    method: 'POST',
    body: JSON.stringify({ id })
});
export const rejectExamRequest = (id) => apiFetch('/hod/examinations/reject', {
    method: 'POST',
    body: JSON.stringify({ id })
});
export const generateHallTicket = (id) => apiFetch('/hod/examinations/generate-hallticket', {
    method: 'POST',
    body: JSON.stringify({ id })
});
