import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard() {
  const [summary, setSummary] = useState({
    totalStudents: 0, totalTeachers: 0, totalClasses: 0,
    activeAcademicYear: "-", recentActivities: []
  });

  useEffect(() => {
    api.get("/dashboard/summary")
      .then(res => setSummary({ ...res.data, recentActivities: res.data.recentActivities || [] }))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-0.5">Overview of your school</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Students" value={summary.totalStudents} color="indigo" />
        <StatCard label="Teachers" value={summary.totalTeachers} color="emerald" />
        <StatCard label="Classes" value={summary.totalClasses} color="violet" />
        <StatCard label="Academic Year" value={summary.activeAcademicYear} color="amber" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-5">
          {(summary.recentActivities?.length ?? 0) === 0 ? (
            <div className="text-center py-8">
              <svg className="mx-auto h-10 w-10 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-gray-400 mt-2">No recent activity</p>
            </div>
          ) : (
            <ul className="space-y-2.5">
              {summary.recentActivities.map((a, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
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

const colorMap = {
  indigo: { bg: "bg-indigo-50", text: "text-indigo-700", dot: "bg-indigo-400" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-400" },
  violet: { bg: "bg-violet-50", text: "text-violet-700", dot: "bg-violet-400" },
  amber: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-400" },
};

function StatCard({ label, value, color }) {
  const c = colorMap[color] || colorMap.indigo;
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-3">
        <span className={`h-2 w-2 rounded-full ${c.dot}`} />
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      </div>
      <p className={`text-2xl font-semibold ${c.text}`}>{value}</p>
    </div>
  );
}
