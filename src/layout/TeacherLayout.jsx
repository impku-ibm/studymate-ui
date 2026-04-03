import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

export default function TeacherLayout() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const linkClass = "block px-4 py-2.5 rounded-lg text-sm font-medium transition";

  const handleLogout = async () => { await logout(); navigate("/login", { replace: true }); };
  const handleNav = () => setMenuOpen(false);

  return (
    <div className="h-screen flex overflow-hidden bg-slate-100">
      {menuOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setMenuOpen(false)} />}
      <div className={`fixed inset-y-0 left-0 z-40 w-56 transform transition-transform lg:relative lg:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <aside className="w-56 h-full bg-gradient-to-b from-emerald-900 to-emerald-800 text-slate-200 px-4 py-6 overflow-y-auto">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-wide text-emerald-300">Teacher Portal</p>
            <h2 className="text-lg font-semibold text-white mt-1">STUDYMATE</h2>
          </div>
          <nav className="space-y-1">
            <NavLink onClick={handleNav} to="/teacher" end className={({ isActive }) => `${linkClass} ${isActive ? "bg-emerald-600 text-white" : "hover:bg-emerald-700"}`}>Dashboard</NavLink>
            <NavLink onClick={handleNav} to="/teacher/marks" className={({ isActive }) => `${linkClass} ${isActive ? "bg-emerald-600 text-white" : "hover:bg-emerald-700"}`}>Marks Entry</NavLink>
            <NavLink onClick={handleNav} to="/teacher/attendance" className={({ isActive }) => `${linkClass} ${isActive ? "bg-emerald-600 text-white" : "hover:bg-emerald-700"}`}>Attendance</NavLink>
            <NavLink onClick={handleNav} to="/teacher/timetable" className={({ isActive }) => `${linkClass} ${isActive ? "bg-emerald-600 text-white" : "hover:bg-emerald-700"}`}>My Timetable</NavLink>
          </nav>
          <div className="mt-8">
            <button onClick={handleLogout} className="w-full px-4 py-2 text-sm text-red-300 border border-red-400/30 rounded-lg hover:bg-red-900/30">Logout</button>
          </div>
        </aside>
      </div>
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <header className="h-14 bg-white border-b px-4 flex items-center sticky top-0 z-20">
          <button onClick={() => setMenuOpen(true)} className="lg:hidden p-1.5 mr-3">
            <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <h1 className="text-sm font-medium text-slate-700">Teacher Portal</h1>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6"><Outlet /></main>
      </div>
    </div>
  );
}
