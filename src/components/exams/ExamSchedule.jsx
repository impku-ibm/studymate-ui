import { useEffect, useState } from "react";
import { getSchedules, scheduleExam } from "../../api/examApi";
import api from "../../api/axios";

export default function ExamSchedule({ exam, onBack }) {
  const [schedules, setSchedules] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    classId: "", section: "", subjectId: "", examDate: "",
    maxMarks: 100, passMarks: 40, durationMinutes: 120
  });
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const [schedRes, classRes, subRes] = await Promise.all([
        getSchedules(exam.id),
        api.get("/classes"),
        api.get("/subjects")
      ]);
      setSchedules(schedRes.data);
      setClasses(classRes.data);
      setSubjects(subRes.data);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [exam.id]);

  const handleAdd = async () => {
    setError("");
    try {
      await scheduleExam({ examId: exam.id, ...form, classId: +form.classId, subjectId: +form.subjectId, maxMarks: +form.maxMarks, passMarks: +form.passMarks, durationMinutes: +form.durationMinutes });
      setForm({ classId: "", section: "", subjectId: "", examDate: "", maxMarks: 100, passMarks: 40, durationMinutes: 120 });
      load();
    } catch (e) { setError(e.response?.data?.message || "Failed to schedule"); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-blue-600 text-sm hover:underline">← Back</button>
        <h3 className="text-lg font-semibold">{exam.name} — Schedule</h3>
      </div>

      {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

      <div className="bg-white rounded-xl border p-4 grid grid-cols-4 gap-3">
        <select value={form.classId} onChange={e => setForm({...form, classId: e.target.value})}
          className="p-2 border rounded text-sm" data-testid="schedule-class">
          <option value="">Class</option>
          {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input placeholder="Section (A, B...)" value={form.section}
          onChange={e => setForm({...form, section: e.target.value})}
          className="p-2 border rounded text-sm" data-testid="schedule-section" />
        <select value={form.subjectId} onChange={e => setForm({...form, subjectId: e.target.value})}
          className="p-2 border rounded text-sm" data-testid="schedule-subject">
          <option value="">Subject</option>
          {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <input type="date" value={form.examDate} onChange={e => setForm({...form, examDate: e.target.value})}
          className="p-2 border rounded text-sm" data-testid="schedule-date" />
        <input type="number" placeholder="Max Marks" value={form.maxMarks}
          onChange={e => setForm({...form, maxMarks: e.target.value})}
          className="p-2 border rounded text-sm" />
        <input type="number" placeholder="Pass Marks" value={form.passMarks}
          onChange={e => setForm({...form, passMarks: e.target.value})}
          className="p-2 border rounded text-sm" />
        <input type="number" placeholder="Duration (min)" value={form.durationMinutes}
          onChange={e => setForm({...form, durationMinutes: e.target.value})}
          className="p-2 border rounded text-sm" />
        <button onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg" data-testid="schedule-add-btn">
          + Add
        </button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Class</th>
              <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Section</th>
              <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Subject</th>
              <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Date</th>
              <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Max</th>
              <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Pass</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="px-4 py-6 text-center text-slate-500">Loading...</td></tr>
            ) : schedules.length === 0 ? (
              <tr><td colSpan="6" className="px-4 py-6 text-center text-slate-500">No schedules yet</td></tr>
            ) : schedules.map(s => (
              <tr key={s.id} className="border-b hover:bg-slate-50">
                <td className="px-4 py-3">{s.className}</td>
                <td className="px-4 py-3">{s.section}</td>
                <td className="px-4 py-3">{s.subjectName}</td>
                <td className="px-4 py-3">{s.examDate}</td>
                <td className="px-4 py-3">{s.maxMarks}</td>
                <td className="px-4 py-3">{s.passMarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
