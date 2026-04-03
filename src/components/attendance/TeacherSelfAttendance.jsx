import { useState } from "react";
import { markTeacherSelfAttendance } from "../../api/attendanceApi";

export default function TeacherSelfAttendance() {
  const [marked, setMarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleMark = async () => {
    setLoading(true);
    setMessage("");
    try {
      await markTeacherSelfAttendance();
      setMarked(true);
      setMessage("Attendance marked successfully for today");
    } catch (e) {
      setMessage("Error: " + (e.response?.data?.message || "Failed to mark attendance"));
    } finally { setLoading(false); }
  };

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">Teacher Self-Attendance</h3>

      <div className="bg-white rounded-xl border p-6 text-center space-y-4">
        <p className="text-slate-600">{today}</p>

        {message && (
          <div className={`text-sm p-2 rounded ${message.startsWith("Error") ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
            {message}
          </div>
        )}

        {!marked ? (
          <button onClick={handleMark} disabled={loading}
            className="px-8 py-3 bg-emerald-600 text-white rounded-xl text-lg font-medium hover:bg-emerald-500 disabled:opacity-50 transition"
            data-testid="teacher-self-mark-btn">
            {loading ? "Marking..." : "✓ Mark Present"}
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-100 text-emerald-700 rounded-xl text-lg font-medium">
            ✓ Attendance Marked
          </div>
        )}
      </div>
    </div>
  );
}
