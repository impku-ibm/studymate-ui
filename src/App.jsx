import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardLayout from "./layout/DashboardLayout";
import SchoolSetup from "./pages/SchoolSetup";
import SchoolOnboarding from "./pages/SchoolOnboarding";
import Teachers from "./pages/Teachers";
import Students from "./pages/Students";
import ProtectedRoute from './components/ProtectedRoute';
import Account from "./pages/accounts/Account";
import Exams from "./pages/Exams";
import Attendance from "./pages/Attendance";
import StaffPage from "./pages/Staff";
import Timetable from "./pages/Timetable";

// Student Portal
import StudentLayout from "./layout/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentAttendancePage from "./pages/student/StudentAttendancePage";
import StudentFeesPage from "./pages/student/StudentFeesPage";
import StudentResultsPage from "./pages/student/StudentResultsPage";

// Teacher Portal
import TeacherLayout from "./layout/TeacherLayout";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherMarksEntry from "./pages/teacher/TeacherMarksEntry";
import TeacherAttendancePage from "./pages/teacher/TeacherAttendancePage";
import TeacherTimetablePage from "./pages/teacher/TeacherTimetablePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* One-time onboarding */}
      <Route path="/onboarding/school" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>} />

      {/* Admin routes */}
      <Route path="/admin" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="setup" element={<SchoolSetup />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="students" element={<Students />} />
        <Route path="accounts" element={<Account />} />
        <Route path="exams" element={<Exams />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="staff" element={<StaffPage />} />
        <Route path="timetable" element={<Timetable />} />
      </Route>

      {/* Student Portal */}
      <Route path="/student" element={<ProtectedRoute><StudentLayout /></ProtectedRoute>}>
        <Route index element={<StudentDashboard />} />
        <Route path="attendance" element={<StudentAttendancePage />} />
        <Route path="fees" element={<StudentFeesPage />} />
        <Route path="results" element={<StudentResultsPage />} />
      </Route>

      {/* Teacher Portal */}
      <Route path="/teacher" element={<ProtectedRoute><TeacherLayout /></ProtectedRoute>}>
        <Route index element={<TeacherDashboard />} />
        <Route path="marks" element={<TeacherMarksEntry />} />
        <Route path="attendance" element={<TeacherAttendancePage />} />
        <Route path="timetable" element={<TeacherTimetablePage />} />
      </Route>
    </Routes>
  );
}
