import { useEffect, useState } from "react";
import { getClassTimetable, createEntry, deleteEntry } from "../../api/timetableApi";
import api from "../../api/axios";

const DAYS = ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function TimetableGrid() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [section, setSection] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { api.get("/classes").then(r => setClasses(r.data)); }, []);

  const load = async () => {
    if (!selectedClass || !section) return;
    setLoading(true);
    try { setEntries((await getClassTimetable(selectedClass, section)).data); }
    finally { setLoading(false); }
  };

  // Group entries by day and period
  const grid = {};
  entries.forEach(e => {
    const key = `${e.dayOfWeek}-${e.periodNumber}`;
    grid[key] = e;
  });

  const periods = [...new Set(entries.map(e => e.periodNumber))].sort((a, b) => a - b);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">Class Timetable</h3>

      <div className="bg-white rounded-xl border p-4 flex gap-3 items-end">
        <div>
          <label className="text-xs text-slate-500">Class</label>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}
            className="block w-40 p-2 border rounded text-sm" data-testid="tt-class-select">
            <option value="">Select</option>
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-500">Section</label>
          <input value={section} onChange={e => setSection(e.target.value)}
            placeholder="A" className="block w-24 p-2 border rounded text-sm" data-testid="tt-section-input" />
        </div>
        <button onClick={load} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg" data-testid="tt-load-btn">
          Load Timetable
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
                  <td className="px-3 py-3 font-medium text-slate-700">P{p}</td>
                  {[1,2,3,4,5,6].map(d => {
                    const entry = grid[`${d}-${p}`];
                    return (
                      <td key={d} className="px-3 py-3 text-center">
                        {entry ? (
                          <div className="bg-blue-50 rounded p-1">
                            <div className="text-xs font-medium text-blue-800">{entry.subjectName || "—"}</div>
                            <div className="text-xs text-blue-600">{entry.teacherName || ""}</div>
                          </div>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && entries.length === 0 && selectedClass && section && (
        <div className="bg-white rounded-xl border p-8 text-center text-slate-500 text-sm">
          No timetable entries found for this class/section
        </div>
      )}
    </div>
  );
}
