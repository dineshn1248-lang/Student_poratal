import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Entrance from "./pages/common/Entrance";
import Home from "./pages/common/Home";
import StaffLogin from "./pages/common/StaffLogin";
import StudentLogin from "./pages/common/StudentLogin";
import ParentLogin from "./pages/parent/ParentLogin";

import PrincipalDashboard from "./pages/principal/Dashboard";
import HODDashboard from "./pages/hod/HODDashboard";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import ParentDashboard from "./pages/parent/ParentDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Entrance />} />
        <Route path="/home" element={<Home />} />

        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/parent-login" element={<ParentLogin />} />

        <Route path="/principal-dashboard" element={<PrincipalDashboard />} />
        <Route path="/hod-dashboard" element={<HODDashboard />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/parent-dashboard" element={<ParentDashboard />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;