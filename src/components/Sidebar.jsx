import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const school = JSON.parse(localStorage.getItem("school"));

  const linkClass =
    "block px-4 py-2.5 rounded-lg text-sm font-medium transition";

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b
                      from-slate-900 to-slate-800
                      text-slate-200 px-4 py-6">

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
        <NavLink
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

        <NavLink
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

        <NavLink
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
        <NavLink
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

        <NavLink
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

        <NavLink
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
      </nav>

      {/* Footer */}
      <div className="absolute bottom-4 left-4 text-xs text-slate-500">
        © 2026 School ERP
      </div>
    </aside>
  );
}
