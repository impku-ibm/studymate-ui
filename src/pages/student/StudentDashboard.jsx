import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function StudentDashboard() {
  const [data, setData] = useState({ attendancePercent: "—", pendingFees: "—", latestGrade: "—" });

  useEffect(() => {
    // Placeholder — will aggregate from attendance/fees/results APIs
    // For now show static cards
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Welcome</h2>
        <p className="text-sm text-slate-500">Your academic overview at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <DashCard title="Attendance" value={data.attendancePercent} color="from-emerald-600 to-emerald-500" />
        <DashCard title="Pending Fees" value={data.pendingFees} color="from-amber-600 to-amber-500" />
        <DashCard title="Latest Grade" value={data.latestGrade} color="from-blue-600 to-blue-500" />
      </div>

      <div className="bg-white rounded-xl border p-6">
        <h3 className="font-semibold text-slate-800 mb-3">Quick Links</h3>
        <div className="flex gap-4">
          <a href="/student/attendance" className="px-4 py-2 bg-slate-100 rounded-lg text-sm hover:bg-slate-200">View Attendance</a>
          <a href="/student/fees" className="px-4 py-2 bg-slate-100 rounded-lg text-sm hover:bg-slate-200">View Fees</a>
          <a href="/student/results" className="px-4 py-2 bg-slate-100 rounded-lg text-sm hover:bg-slate-200">View Results</a>
        </div>
      </div>
    </div>
  );
}

function DashCard({ title, value, color }) {
  return (
    <div className={`rounded-xl bg-gradient-to-r ${color} p-5 text-white shadow-md`}>
      <p className="text-sm opacity-90">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}
