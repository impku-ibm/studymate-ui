import { useEffect, useState } from "react";
import { getPeriods, createPeriod, deletePeriod } from "../../api/timetableApi";

export default function PeriodSetup() {
  const [periods, setPeriods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ periodNumber: "", startTime: "", endTime: "", isBreak: false, label: "" });
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try { setPeriods((await getPeriods()).data); } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    setError("");
    try {
      await createPeriod({ ...form, periodNumber: parseInt(form.periodNumber) });
      setForm({ periodNumber: "", startTime: "", endTime: "", isBreak: false, label: "" });
      load();
    } catch (e) { setError(e.response?.data?.message || "Failed"); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this period?")) return;
    await deletePeriod(id);
    load();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">Period Definitions</h3>

      {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

      <div className="bg-white rounded-xl border p-4 grid grid-cols-6 gap-3 items-end">
        <div>
          <label className="text-xs text-slate-500">Period #</label>
          <input type="number" value={form.periodNumber} onChange={e => setForm({...form, periodNumber: e.target.value})}
            className="block w-full p-2 border rounded text-sm" data-testid="period-number" />
        </div>
        <div>
          <label className="text-xs text-slate-500">Start Time</label>
          <input type="time" value={form.startTime} onChange={e => setForm({...form, startTime: e.target.value})}
            className="block w-full p-2 border rounded text-sm" data-testid="period-start" />
        </div>
        <div>
          <label className="text-xs text-slate-500">End Time</label>
          <input type="time" value={form.endTime} onChange={e => setForm({...form, endTime: e.target.value})}
            className="block w-full p-2 border rounded text-sm" data-testid="period-end" />
        </div>
        <div>
          <label className="text-xs text-slate-500">Label</label>
          <input value={form.label} onChange={e => setForm({...form, label: e.target.value})}
            placeholder="e.g. Lunch" className="block w-full p-2 border rounded text-sm" />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.isBreak} onChange={e => setForm({...form, isBreak: e.target.checked})} />
          Break
        </label>
        <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg" data-testid="period-add-btn">+ Add</button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">#</th>
              <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Start</th>
              <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">End</th>
              <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Label</th>
              <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Type</th>
              <th className="px-4 py-3 text-right text-xs uppercase text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="px-4 py-6 text-center text-slate-500">Loading...</td></tr>
            ) : periods.length === 0 ? (
              <tr><td colSpan="6" className="px-4 py-6 text-center text-slate-500">No periods defined</td></tr>
            ) : periods.map(p => (
              <tr key={p.id} className="border-b hover:bg-slate-50">
                <td className="px-4 py-3 font-medium">{p.periodNumber}</td>
                <td className="px-4 py-3">{p.startTime}</td>
                <td className="px-4 py-3">{p.endTime}</td>
                <td className="px-4 py-3">{p.label || "—"}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs ${p.isBreak ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>
                    {p.isBreak ? "Break" : "Class"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleDelete(p.id)} className="text-red-500 text-xs hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
