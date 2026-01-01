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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* One-time onboarding */}
      <Route path="/onboarding/school" element={<ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>} />

      {/* Admin routes */}
      <Route path="/admin" element={<ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="setup" element={<SchoolSetup />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="students" element={<Students />} />
        <Route path="accounts" element={<Account />} />
      </Route>

      
    </Routes>
  );
}
