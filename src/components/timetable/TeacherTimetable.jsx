import { useState } from "react";
import { getTeacherTimetable } from "../../api/timetableApi";

const DAYS = ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function TeacherTimetable() {
  const [teacherId, setTeacherId] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!teacherId) return;
    setLoading(true);
    try { setEntries((await getTeacherTimetable(teacherId)).data); }
    finally { setLoading(false); }
  };

  const grid = {};
  entries.forEach(e => { grid[`${e.dayOfWeek}-${e.periodNumber}`] = e; });
  const periods = [...new Set(entries.map(e => e.periodNumber))].sort((a, b) => a - b);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">Teacher Timetable</h3>

      <div className="bg-white rounded-xl border p-4 flex gap-3 items-end">
        <div>
          <label className="text-xs text-slate-500">Teacher ID</label>
          <input type="number" value={teacherId} onChange={e => setTeacherId(e.target.value)}
            className="block w-40 p-2 border rounded text-sm" data-testid="teacher-tt-id" />
        </div>
        <button onClick={load} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg" data-testid="teacher-tt-load">
          Load
        </button>
      </div>

      {entries.length > 0 && (
        <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-3 py-3 text-left text-xs uppercase text-slate-500">Period</th>
                {[1,2,3,4,5,6].map(d => (
                  <th key={d} className="px-3 py-3 text-center text-xs uppercase text-slate-500">{DAYS[d]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {periods.map(p => (
                <tr key={p} className="border-b">
                  <td className="px-3 py-3 font-medium">P{p}</td>
                  {[1,2,3,4,5,6].map(d => {
                    const entry = grid[`${d}-${p}`];
                    return (
                      <td key={d} className="px-3 py-3 text-center">
                        {entry ? (
                          <div className="bg-emerald-50 rounded p-1">
                            <div className="text-xs font-medium text-emerald-800">{entry.subjectName || "—"}</div>
                            <div className="text-xs text-emerald-600">{entry.className} {entry.section}</div>
                          </div>
                        ) : <span className="text-slate-300">—</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
