import { useState } from "react";
import { getStudentSummary, getStudentHistory } from "../../api/attendanceApi";

export default function StudentAttendancePage() {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // TODO: get studentId from JWT context. Using placeholder for now.
  const studentId = 1;

  const loadSummary = async () => {
    setLoading(true);
    try {
      const res = await getStudentSummary(studentId, month);
      setSummary(res.data);
    } finally { setLoading(false); }
  };

  const statusColors = {
    PRESENT: "bg-emerald-100 text-emerald-700",
    ABSENT: "bg-red-100 text-red-700",
    LEAVE: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Attendance</h2>

      <div className="flex gap-3 items-end">
        <div>
          <label className="text-xs text-slate-500">Month</label>
          <input type="month" value={month} onChange={e => setMonth(e.target.value)}
            className="block p-2 border rounded text-sm" data-testid="student-att-month" />
        </div>
        <button onClick={loadSummary} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg"
          data-testid="student-att-load">View</button>
      </div>

      {loading && <p className="text-sm text-slate-500">Loading...</p>}

      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatCard label="Total Days" value={summary.totalDays} color="bg-slate-100 text-slate-800" />
          <StatCard label="Present" value={summary.presentDays} color="bg-emerald-100 text-emerald-700" />
          <StatCard label="Absent" value={summary.absentDays} color="bg-red-100 text-red-700" />
          <StatCard label="Leave" value={summary.leaveDays} color="bg-amber-100 text-amber-700" />
          <StatCard label="Percentage" value={`${summary.attendancePercentage}%`}
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
