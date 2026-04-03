import { NavLink } from "react-router-dom";

export default function Sidebar({ onClose }) {
  const school = JSON.parse(localStorage.getItem("school") || "{}");

  const linkClass =
    "block px-4 py-2.5 rounded-lg text-sm font-medium transition";

  const handleNavClick = () => {
    if (onClose) onClose(); // Close sidebar on mobile after navigation
  };

  return (
    <aside className="w-64 h-full bg-gradient-to-b from-slate-900 to-slate-800 text-slate-200 px-4 py-6 overflow-y-auto">

      {/* Mobile close button */}
      <button onClick={onClose} className="lg:hidden absolute top-4 right-4 text-slate-400 hover:text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* School Info */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-wide text-slate-400">
          School
        </p>
        <h2 className="text-lg font-semibold text-white mt-1 truncate">
          {school?.name || "School"}
        </h2>
      </div>

      {/* Main Nav */}
      <nav className="space-y-1">
        <NavLink onClick={handleNavClick}
          to="/admin"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-700"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink onClick={handleNavClick}
          to="/admin/students"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-700"
            }`
          }
        >
          Students
        </NavLink>

        <NavLink onClick={handleNavClick}
          to="/admin/teachers"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-700"
            }`
          }
        >
          Teachers
        </NavLink>
      </nav>

      {/* Divider */}
      <div className="my-6 border-t border-slate-700" />

      {/* Configuration */}
      <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">
        Configuration
      </p>

      <nav className="space-y-1">
        <NavLink onClick={handleNavClick}
          to="/admin/setup"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-700"
            }`
          }
        >
          School Setup
        </NavLink>

        <NavLink onClick={handleNavClick}
          to="/admin/accounts"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-700"
            }`
          }
        >
          Accounts
        </NavLink>

        <NavLink onClick={handleNavClick}
          to="/admin/staff"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-700"
            }`
          }
        >
          Staff
        </NavLink>

        <NavLink onClick={handleNavClick}
          to="/admin/exams"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-700"
            }`
          }
        >
          Exams
        </NavLink>

        <NavLink onClick={handleNavClick}
          to="/admin/attendance"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-700"
            }`
          }
        >
          Attendance
        </NavLink>

        <NavLink onClick={handleNavClick}
          to="/admin/timetable"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-700"
            }`
          }
        >
          Timetable
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-slate-700 text-xs text-slate-500">
        © 2026 School ERP
      </div>
    </aside>
  );
}
