import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

export default function StudentLayout() {
  const navigate = useNavigate();
  const linkClass = "block px-4 py-2.5 rounded-lg text-sm font-medium transition";

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="h-screen flex overflow-hidden bg-slate-100">
      <aside className="w-56 min-h-screen bg-gradient-to-b from-indigo-900 to-indigo-800 text-slate-200 px-4 py-6">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-wide text-indigo-300">Student Portal</p>
          <h2 className="text-lg font-semibold text-white mt-1">STUDYMATE</h2>
        </div>
        <nav className="space-y-1">
          <NavLink to="/student" end className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-indigo-600 text-white" : "hover:bg-indigo-700"}`}>
            Dashboard
          </NavLink>
          <NavLink to="/student/attendance" className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-indigo-600 text-white" : "hover:bg-indigo-700"}`}>
            Attendance
          </NavLink>
          <NavLink to="/student/fees" className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-indigo-600 text-white" : "hover:bg-indigo-700"}`}>
            Fees
          </NavLink>
          <NavLink to="/student/results" className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-indigo-600 text-white" : "hover:bg-indigo-700"}`}>
            Results
          </NavLink>
        </nav>
        <div className="mt-8">
          <button onClick={handleLogout}
            className="w-full px-4 py-2 text-sm text-red-300 border border-red-400/30 rounded-lg hover:bg-red-900/30"
            data-testid="student-logout">Logout</button>
        </div>
      </aside>
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="h-14 bg-white border-b px-6 flex items-center sticky top-0 z-40">
          <h1 className="text-sm font-medium text-slate-700">Student Portal</h1>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
