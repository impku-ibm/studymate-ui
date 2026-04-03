import { useState } from "react";
import { markTeacherSelfAttendance } from "../../api/attendanceApi";

export default function TeacherDashboard() {
  const [marked, setMarked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleMarkAttendance = async () => {
    setLoading(true);
    try {
      await markTeacherSelfAttendance();
      setMarked(true);
    } catch { /* already marked or error */ }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Teacher Dashboard</h2>
        <p className="text-sm text-slate-500">Welcome back</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 p-5 text-white shadow-md">
          <p className="text-sm opacity-90">Today's Attendance</p>
          {!marked ? (
            <button onClick={handleMarkAttendance} disabled={loading}
              className="mt-2 px-4 py-2 bg-white/20 rounded-lg text-sm font-medium hover:bg-white/30 disabled:opacity-50"
              data-testid="teacher-dash-mark-att">
              {loading ? "Marking..." : "✓ Mark Present"}
            </button>
          ) : (
            <p className="mt-2 text-lg font-bold">✓ Marked</p>
          )}
        </div>

        <div className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 p-5 text-white shadow-md">
          <p className="text-sm opacity-90">Quick Actions</p>
          <div className="mt-2 flex gap-2">
            <a href="/teacher/marks" className="px-3 py-1 bg-white/20 rounded text-xs hover:bg-white/30">Enter Marks</a>
            <a href="/teacher/attendance" className="px-3 py-1 bg-white/20 rounded text-xs hover:bg-white/30">Class Attendance</a>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 p-5 text-white shadow-md">
          <p className="text-sm opacity-90">My Timetable</p>
          <a href="/teacher/timetable" className="mt-2 inline-block px-3 py-1 bg-white/20 rounded text-xs hover:bg-white/30">
            View Timetable
          </a>
        </div>
      </div>
    </div>
  );
}
