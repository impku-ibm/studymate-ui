import { useState } from "react";
import { getStudentHistory } from "../../api/attendanceApi";

const statusColors = {
  PRESENT: "bg-emerald-100 text-emerald-700",
  ABSENT: "bg-red-100 text-red-700",
  LEAVE: "bg-amber-100 text-amber-700",
};

export default function AttendanceHistory() {
  const [studentId, setStudentId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!studentId || !startDate || !endDate) return;
    setLoading(true);
    try {
      const res = await getStudentHistory(studentId, startDate, endDate);
      setHistory(res.data);
    } finally { setLoading(false); }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">Attendance History</h3>

      <div className="bg-white rounded-xl border p-4 flex gap-3 items-end flex-wrap">
        <div>
          <label className="text-xs text-slate-500">Student ID</label>
          <input type="number" value={studentId} onChange={e => setStudentId(e.target.value)}
            className="block w-40 p-2 border rounded text-sm" data-testid="history-student-id" />
        </div>
        <div>
          <label className="text-xs text-slate-500">From</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
            className="block p-2 border rounded text-sm" data-testid="history-start" />
        </div>
        <div>
          <label className="text-xs text-slate-500">To</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
            className="block p-2 border rounded text-sm" data-testid="history-end" />
        </div>
        <button onClick={load} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg" data-testid="history-load-btn">
          View History
        </button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm">
        <div className="overflow-y-auto max-h-[calc(100vh-400px)]">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Date</th>
                <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Status</th>
                <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Section</th>
                <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Marked By</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="px-4 py-6 text-center text-slate-500">Loading...</td></tr>
              ) : history.length === 0 ? (
                <tr><td colSpan="4" className="px-4 py-6 text-center text-slate-500">No records found</td></tr>
              ) : history.map(h => (
                <tr key={h.id} className="border-b hover:bg-slate-50">
                  <td className="px-4 py-3">{h.attendanceDate}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[h.status] || ""}`}>
                      {h.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{h.section}</td>
                  <td className="px-4 py-3 text-slate-600">{h.markedByTeacher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
