import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const school = JSON.parse(localStorage.getItem("school"));

  return (
    <aside className="w-64 bg-slate-800 text-white p-4">
      <h2 className="text-lg font-semibold mb-6 truncate">
        {school?.name || "School"}
      </h2>

      <nav className="space-y-2">
        <NavLink to="/admin" className="block px-3 py-2 rounded hover:bg-slate-700">
          Dashboard
        </NavLink>

        <NavLink to="/admin/students" className="block px-3 py-2 rounded hover:bg-slate-700">
          Students
        </NavLink>

        <NavLink to="/admin/teachers" className="block px-3 py-2 rounded hover:bg-slate-700">
          Teachers
        </NavLink>

        <NavLink to="/admin/setup" className="block px-3 py-2 rounded hover:bg-slate-700">
          School Setup
        </NavLink>
<NavLink to="/admin/accounts" className="block px-3 py-2 rounded hover:bg-slate-700">
          Accounts
        </NavLink>
        <NavLink to="/admin/exams" className="block px-3 py-2 rounded hover:bg-slate-700">
          Exams
        </NavLink>
      </nav>
    </aside>
  );
}
