import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

const links = [
  { to: "/teacher", label: "Dashboard", end: true },
  { to: "/teacher/marks", label: "Enter Marks" },
  { to: "/teacher/timetable", label: "Timetable" },
  { to: "/teacher/attendance", label: "Attendance" },
];

export default function TeacherLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="h-screen flex overflow-hidden bg-[#F9FAFB]">
      {menuOpen && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setMenuOpen(false)} />}
      <div className={`fixed inset-y-0 left-0 z-40 w-56 transform transition-transform lg:relative lg:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <aside className="w-56 h-full bg-white border-r border-gray-200 flex flex-col">
          <div className="px-5 pt-6 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">S</span>
              </div>
              <p className="text-[13px] font-semibold text-gray-900">Teacher Portal</p>
            </div>
          </div>
          <nav className="flex-1 px-3 space-y-0.5">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} end={l.end} onClick={() => setMenuOpen(false)}
                className={({ isActive }) => `block px-3 py-2 rounded-lg text-[13px] font-medium transition ${isActive ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-100"}`}>
                {l.label}
              </NavLink>
            ))}
          </nav>
        </aside>
      </div>
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <header className="h-14 bg-white border-b border-gray-200 px-4 flex items-center justify-between sticky top-0 z-20">
          <button onClick={() => setMenuOpen(true)} className="lg:hidden p-1.5">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
          </button>
          <span className="text-[13px] font-medium text-gray-900">Teacher Portal</span>
          <button onClick={async () => { await logout(); navigate("/login", { replace: true }); }}
            className="text-[13px] text-gray-500 hover:text-gray-700 px-2 py-1 rounded-md hover:bg-gray-100">Sign out</button>
        </header>
        <main className="flex-1 overflow-auto p-5 sm:p-7"><Outlet /></main>
      </div>
    </div>
  );
}
