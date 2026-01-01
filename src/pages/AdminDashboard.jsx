import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard() {

  const [summary, setSummary] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    activeAcademicYear: "-",
    recentActivities: []
  });

  useEffect(() => {
    api.get("/dashboard/summary")
       .then(res => setSummary(res.data));
  }, []);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Dashboard
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Overview of your school’s academic & administrative data
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Total Students"
          value={summary.totalStudents}
          gradient="from-blue-600 to-blue-500"
        />

        <StatCard
          title="Total Teachers"
          value={summary.totalTeachers}
          gradient="from-emerald-600 to-emerald-500"
        />

        <StatCard
          title="Total Classes"
          value={summary.totalClasses}
          gradient="from-indigo-600 to-indigo-500"
        />

        <StatCard
          title="Academic Year"
          value={summary.activeAcademicYear}
          gradient="from-purple-600 to-purple-500"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="px-6 py-4 border-b">
          <h3 className="font-semibold text-slate-800">
            Recent Activity
          </h3>
        </div>

        <div className="p-6">
          {summary.recentActivities.length === 0 ? (
            <p className="text-sm text-slate-500">
              No recent activity
            </p>
          ) : (
            <ul className="space-y-3 text-sm">
              {summary.recentActivities.map((a, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-slate-700"
                >
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                  {a}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

    </div>
  );
}

/* ----------------- */
/* Reusable StatCard */
/* ----------------- */

function StatCard({ title, value, gradient }) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-xl
        bg-gradient-to-r ${gradient}
        p-5 text-white shadow-md
        transition-transform duration-200
        hover:-translate-y-1
      `}
    >
      <p className="text-sm opacity-90">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>

      {/* subtle background glow */}
      <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-white/10" />
    </div>
  );
}
