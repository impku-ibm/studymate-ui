import { useState } from "react";
import { getStudentSummary } from "../../api/attendanceApi";

export default function AttendanceSummary() {
  const [studentId, setStudentId] = useState("");
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!studentId || !month) return;
    setLoading(true);
    try {
      const res = await getStudentSummary(studentId, month);
      setSummary(res.data);
    } catch {
      setSummary(null);
    } finally { setLoading(false); }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">Attendance Summary</h3>

      <div className="bg-white rounded-xl border p-4 flex gap-3 items-end">
        <div>
          <label className="text-xs text-slate-500">Student ID</label>
          <input type="number" value={studentId} onChange={e => setStudentId(e.target.value)}
            placeholder="Enter student ID" className="block w-40 p-2 border rounded text-sm" data-testid="summary-student-id" />
        </div>
        <div>
          <label className="text-xs text-slate-500">Month</label>
          <input type="month" value={month} onChange={e => setMonth(e.target.value)}
            className="block p-2 border rounded text-sm" data-testid="summary-month" />
        </div>
        <button onClick={load} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg" data-testid="summary-load-btn">
          View Summary
        </button>
      </div>

      {loading && <p className="text-sm text-slate-500">Loading...</p>}

      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatCard label="Total Days" value={summary.totalDays} color="bg-slate-100 text-slate-800" />
          <StatCard label="Present" value={summary.presentDays} color="bg-emerald-100 text-emerald-700" />
          <StatCard label="Absent" value={summary.absentDays} color="bg-red-100 text-red-700" />
          <StatCard label="Leave" value={summary.leaveDays} color="bg-amber-100 text-amber-700" />
          <StatCard label="Attendance %" value={`${summary.attendancePercentage}%`}
            color={summary.attendancePercentage >= 75 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"} />
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className={`rounded-xl p-4 ${color}`}>
      <p className="text-xs opacity-75">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
