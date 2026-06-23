import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BackButton from "./components/common/BackButton";

// ── Loading Spinner Component ─────────────────────────────────────────────────
function PageLoader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100vh', background: '#f8fafc', flexDirection: 'column', gap: '16px'
    }}>
      <div style={{
        width: '44px', height: '44px', border: '4px solid #e2e8f0',
        borderTop: '4px solid #4f46e5', borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <span style={{ color: '#64748b', fontWeight: '600', fontSize: '14px' }}>Loading...</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Lazy-loaded Common Pages ──────────────────────────────────────────────────
const Entrance        = lazy(() => import("./pages/common/Entrance3D"));
const Home            = lazy(() => import("./pages/common/Home"));
const AdmissionsInfo  = lazy(() => import("./pages/common/AdmissionsInfo"));
const ContactUs       = lazy(() => import("./pages/common/ContactUs"));
const StaffLogin      = lazy(() => import("./pages/common/StaffLogin"));
const StudentLogin    = lazy(() => import("./pages/common/StudentLogin"));
const StudentRegister = lazy(() => import("./pages/common/StudentRegister"));
const ForgotPassword  = lazy(() => import("./pages/common/ForgotPassword"));
const ResetPassword   = lazy(() => import("./pages/common/ResetPassword"));
const LoginSelection  = lazy(() => import("./pages/common/LoginSelection"));

// ── Lazy-loaded Portal Dashboards ─────────────────────────────────────────────
const FacultyDashboard   = lazy(() => import("./pages/faculty/FacultyDashboard"));
// ── Lazy-loaded Parent Portal Pages ─────────────────────────────────────────────
const ParentLayout       = lazy(() => import("./pages/parent/ParentLayout"));
const ParentDashboard    = lazy(() => import("./pages/parent/ParentDashboard"));
const ParentAttendance   = lazy(() => import("./pages/parent/ParentAttendance"));
const ParentInternalMarks= lazy(() => import("./pages/parent/ParentInternalMarks"));
const ParentResults      = lazy(() => import("./pages/parent/ParentResults"));
const ParentNotifications= lazy(() => import("./pages/parent/ParentNotifications"));
const ParentProfile      = lazy(() => import("./pages/parent/ParentProfile"));

// ── Lazy-loaded HOD Portal Pages ──────────────────────────────────────────────
const HODLayout              = lazy(() => import("./pages/hod/HODLayout"));
const HODDashboard           = lazy(() => import("./pages/hod/HodDashboard"));
const HODStudents            = lazy(() => import("./pages/hod/HODStudents"));
const HODFaculty             = lazy(() => import("./pages/hod/HODFaculty"));
const HODAttendance          = lazy(() => import("./pages/hod/HODAttendance"));
const HODExaminations        = lazy(() => import("./pages/hod/HODExaminations"));

const HODParentCommunication = lazy(() => import("./pages/hod/HODParentCommunication"));
const HODInternalMarks       = lazy(() => import("./pages/hod/HODInternalMarks"));
const HODReports             = lazy(() => import("./pages/hod/HODReports"));
const HODBacklogs            = lazy(() => import("./pages/hod/HODBacklogs"));
const HODAnnouncements       = lazy(() => import("./pages/hod/HODAnnouncements"));

// ── Lazy-loaded Principal Portal Pages ──────────────────────────────────────────────
const PrincipalLayout              = lazy(() => import("./pages/principal/PrincipalLayout"));
const PrincipalDashboard           = lazy(() => import("./pages/principal/PrincipalDashboard"));
const PrincipalStudents            = lazy(() => import("./pages/principal/PrincipalStudents"));
const PrincipalAttendance          = lazy(() => import("./pages/principal/PrincipalAttendance"));
const PrincipalExaminations        = lazy(() => import("./pages/principal/PrincipalExaminations"));
const PrincipalReports             = lazy(() => import("./pages/principal/PrincipalReports"));
const PrincipalBacklogs            = lazy(() => import("./pages/principal/PrincipalBacklogs"));
const PrincipalAnnouncements       = lazy(() => import("./pages/principal/PrincipalAnnouncements"));
const PrincipalFaculty             = lazy(() => import("./pages/principal/PrincipalFaculty"));
const PrincipalPlacements          = lazy(() => import("./pages/principal/PrincipalPlacements"));

// ── Lazy-loaded Student Portal Pages ─────────────────────────────────────────
const StudentDashboard    = lazy(() => import("./pages/student/StudentDashboard"));
const StudentProfile      = lazy(() => import("./pages/student/StudentProfile"));
const StudentAttendance   = lazy(() => import("./pages/student/StudentAttendance"));
const StudentResults      = lazy(() => import("./pages/student/StudentResults"));
const StudentFees         = lazy(() => import("./pages/student/StudentFees"));
const StudentExams        = lazy(() => import("./pages/student/StudentExams"));
const StudentAnnouncements= lazy(() => import("./pages/student/StudentAnnouncements"));
const StudentInternships  = lazy(() => import("./pages/student/StudentInternships"));
const StudentAIChat       = lazy(() => import("./pages/student/StudentAIChat"));

// ── Lazy-loaded About Pages ──────────────────────────────────────────────────
const AboutOverview   = lazy(() => import("./pages/about/Overview"));
const AboutHistory    = lazy(() => import("./pages/about/History"));
const AboutAcademics  = lazy(() => import("./pages/about/Academics"));
const AboutAdmissions = lazy(() => import("./pages/about/Admissions"));
const AboutEvents     = lazy(() => import("./pages/about/Events"));
const AboutPlacements = lazy(() => import("./pages/about/Placements"));
const Leadership      = lazy(() => import("./pages/about/Leadership"));
const ViceChancellor  = lazy(() => import("./pages/about/ViceChancellor"));
const ProChancellor   = lazy(() => import("./pages/about/ProChancellor"));
const Chancellor      = lazy(() => import("./pages/about/Chancellor"));

const ChatWithStudents = lazy(() => import("./pages/common/ChatWithStudents"));
const Library = lazy(() => import("./pages/facilities/Library"));
const ComputerLabs = lazy(() => import("./pages/facilities/ComputerLabs"));
const ChemistryLab = lazy(() => import("./pages/facilities/ChemistryLab"));
const BotanyLab = lazy(() => import("./pages/facilities/BotanyLab"));
const LabsHub = lazy(() => import("./pages/facilities/LabsHub"));
const Hostels = lazy(() => import("./pages/facilities/Hostels"));
const Classrooms = lazy(() => import("./pages/facilities/Classrooms"));
const SportsActivities = lazy(() => import("./pages/facilities/SportsActivities"));

const AdmissionsIndex = lazy(() => import("./pages/admissions/AdmissionsIndex"));

function App() {
  return (
    <BrowserRouter>
      <BackButton />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"                 element={<Entrance />} />
          <Route path="/home"             element={<Home />} />
          <Route path="/admissions-info"  element={<AdmissionsInfo />} />
          <Route path="/contact-us"       element={<ContactUs />} />
          <Route path="/chat-with-students" element={<ChatWithStudents />} />

          <Route path="/about/overview"   element={<AboutOverview />} />
          <Route path="/about/history"    element={<AboutHistory />} />
          <Route path="/about/academics"  element={<AboutAcademics />} />
          <Route path="/about/admissions" element={<AboutAdmissions />} />
          <Route path="/about/events"     element={<AboutEvents />} />
          <Route path="/about/placements" element={<AboutPlacements />} />
          <Route path="/about/leadership" element={<Leadership />} />
          <Route path="/about/vice-chancellor" element={<ViceChancellor />} />
          <Route path="/about/pro-chancellor" element={<ProChancellor />} />
          <Route path="/about/chancellor" element={<Chancellor />} />

          <Route path="/facilities/library" element={<Library />} />
          <Route path="/facilities/labs" element={<LabsHub />} />
          <Route path="/facilities/computer-labs" element={<ComputerLabs />} />
          <Route path="/facilities/chemistry-lab" element={<ChemistryLab />} />
          <Route path="/facilities/botany-lab" element={<BotanyLab />} />
          <Route path="/facilities/classrooms" element={<Classrooms />} />
          <Route path="/facilities/sports-activities" element={<SportsActivities />} />
          <Route path="/facilities/hostels" element={<Hostels />} />

          <Route path="/admissions" element={<AdmissionsIndex />} />

          <Route path="/login-portal"     element={<LoginSelection />} />
          <Route path="/staff-login"      element={<StaffLogin />} />
          <Route path="/student-login"    element={<StudentLogin />} />
          <Route path="/student-register" element={<StudentRegister />} />
          <Route path="/forgot-password"  element={<ForgotPassword />} />
          <Route path="/reset-password"   element={<ResetPassword />} />

          <Route path="/faculty-dashboard"   element={<FacultyDashboard />} />

          {/* Principal Portal Routes */}
          <Route path="/principal" element={<PrincipalLayout />}>
            <Route index element={<Navigate to="/principal/dashboard" replace />} />
            <Route path="dashboard"           element={<PrincipalDashboard />} />
            <Route path="students"            element={<PrincipalStudents />} />
            <Route path="attendance"          element={<PrincipalAttendance />} />
            <Route path="exams"               element={<PrincipalExaminations />} />
            <Route path="reports"             element={<PrincipalReports />} />
            <Route path="backlogs"            element={<PrincipalBacklogs />} />
            <Route path="announcements"       element={<PrincipalAnnouncements />} />
            <Route path="faculty"             element={<PrincipalFaculty />} />
            <Route path="placements"          element={<PrincipalPlacements />} />
            <Route path="*" element={<div style={{padding:'40px',color:'#64748b',fontWeight:'600'}}>Section under development</div>} />
          </Route>

          {/* Fallback for legacy Principal route */}
          <Route path="/principal-dashboard" element={<Navigate to="/principal/dashboard" replace />} />

          {/* HOD Portal Routes */}
          <Route path="/hod" element={<HODLayout />}>
            <Route index element={<Navigate to="/hod/dashboard" replace />} />
            <Route path="dashboard"           element={<HODDashboard />} />
            <Route path="students"            element={<HODStudents />} />
            <Route path="faculty"             element={<HODFaculty />} />
            <Route path="attendance"          element={<HODAttendance />} />
            <Route path="exams"               element={<HODExaminations />} />

            <Route path="parent-communication"element={<HODParentCommunication />} />
            <Route path="internal-marks"      element={<HODInternalMarks />} />
            <Route path="reports"             element={<HODReports />} />
            <Route path="backlogs"            element={<HODBacklogs />} />
            <Route path="announcements"       element={<HODAnnouncements />} />
            <Route path="*" element={<div style={{padding:'40px',color:'#64748b',fontWeight:'600'}}>Section under development</div>} />
          </Route>

          {/* Fallback for legacy HOD route */}
          <Route path="/hod-dashboard" element={<Navigate to="/hod/dashboard" replace />} />

          {/* Student Portal Routes */}
          <Route path="/student/dashboard"     element={<StudentDashboard />} />
          <Route path="/student/profile"       element={<StudentProfile />} />
          <Route path="/student/attendance"    element={<StudentAttendance />} />
          <Route path="/student/results"       element={<StudentResults />} />
          <Route path="/student/fees"          element={<StudentFees />} />
          <Route path="/student/exams"         element={<StudentExams />} />
          <Route path="/student/announcements" element={<StudentAnnouncements />} />
          <Route path="/student/internships"   element={<StudentInternships />} />
          <Route path="/student/ai-chat"       element={<StudentAIChat />} />

          {/* Fallback for legacy Student route */}
          <Route path="/student-dashboard" element={<Navigate to="/student/dashboard" replace />} />

          {/* Parent Portal Routes */}
          <Route path="/parent" element={<ParentLayout />}>
            <Route index element={<Navigate to="/parent/dashboard" replace />} />
            <Route path="dashboard" element={<ParentDashboard />} />
            <Route path="attendance" element={<ParentAttendance />} />
            <Route path="internal-marks" element={<ParentInternalMarks />} />
            <Route path="results" element={<ParentResults />} />
            <Route path="notifications" element={<ParentNotifications />} />
            <Route path="profile" element={<ParentProfile />} />
            <Route path="*" element={<div style={{padding:'40px',color:'#64748b',fontWeight:'600'}}>Section under development</div>} />
          </Route>

          {/* Fallback for legacy Parent route */}
          <Route path="/parent-dashboard" element={<Navigate to="/parent/dashboard" replace />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;