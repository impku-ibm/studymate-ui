import { useEffect, useState } from "react";
import { markStudentAttendance, getByDateSection } from "../../api/attendanceApi";
import api from "../../api/axios";

export default function MarkStudentAttendance() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [section, setSection] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [existing, setExisting] = useState([]);

  useEffect(() => {
    api.get("/classes").then(res => setClasses(res.data));
  }, []);

  const loadStudents = async () => {
    if (!selectedClass || !section || !date) return;
    setLoading(true);
    setMessage("");
    try {
      const [studRes, attRes] = await Promise.all([
        api.get("/students"),
        getByDateSection(date, section).catch(() => ({ data: [] }))
      ]);
      setStudents(studRes.data);
      setExisting(attRes.data);

      const initial = {};
      studRes.data.forEach(s => {
        const ex = attRes.data.find(a => a.studentId === s.id);
        initial[s.id] = ex ? ex.status : "PRESENT";
      });
      setAttendance(initial);
    } finally { setLoading(false); }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const entries = Object.entries(attendance).map(([studentId, status]) => ({
        studentId: parseInt(studentId), status
      }));
      await markStudentAttendance({
        classId: parseInt(selectedClass),
        section,
        attendanceDate: date,
        attendanceEntries: entries
      });
      setMessage("Attendance saved successfully");
    } catch (e) {
      setMessage("Error: " + (e.response?.data?.message || "Failed to save"));
    } finally { setSaving(false); }
  };

  const markAll = (status) => {
    const updated = {};
    students.forEach(s => { updated[s.id] = status; });
    setAttendance(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Mark Student Attendance</h3>
          <p className="text-sm text-slate-500">Select class, section, and date to mark attendance</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border p-4 flex gap-3 items-end flex-wrap">
        <div>
          <label className="text-xs text-slate-500">Class</label>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}
            className="block w-40 p-2 border rounded text-sm" data-testid="att-class-select">
            <option value="">Select</option>
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-500">Section</label>
          <input value={section} onChange={e => setSection(e.target.value)}
            placeholder="A" className="block w-24 p-2 border rounded text-sm" data-testid="att-section-input" />
        </div>
        <div>
          <label className="text-xs text-slate-500">Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            className="block p-2 border rounded text-sm" data-testid="att-date-input" />
        </div>
        <button onClick={loadStudents}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg" data-testid="att-load-btn">
          Load Students
        </button>
      </div>

      {message && <div className={`text-sm p-2 rounded ${message.startsWith("Error") ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>{message}</div>}

      {students.length > 0 && (
        <div className="bg-white rounded-xl border shadow-sm">
          <div className="px-4 py-3 border-b bg-slate-50 flex justify-between items-center">
            <div className="flex gap-2">
              <button onClick={() => markAll("PRESENT")} className="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-full">All Present</button>
              <button onClick={() => markAll("ABSENT")} className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full">All Absent</button>
            </div>
            <button onClick={handleSave} disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg disabled:opacity-50" data-testid="att-save-btn">
              {saving ? "Saving..." : "Save Attendance"}
            </button>
          </div>
          <div className="overflow-y-auto max-h-[calc(100vh-450px)]">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left text-xs uppercase text-slate-500">Student</th>
                  <th className="px-4 py-2 text-left text-xs uppercase text-slate-500">Adm No</th>
                  <th className="px-4 py-2 text-center text-xs uppercase text-slate-500">Present</th>
                  <th className="px-4 py-2 text-center text-xs uppercase text-slate-500">Absent</th>
                  <th className="px-4 py-2 text-center text-xs uppercase text-slate-500">Leave</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" className="px-4 py-6 text-center text-slate-500">Loading...</td></tr>
                ) : students.map(s => (
                  <tr key={s.id} className="border-b hover:bg-slate-50">
                    <td className="px-4 py-2 font-medium">{s.fullName}</td>
                    <td className="px-4 py-2 text-slate-600">{s.admissionNumber}</td>
                    {["PRESENT", "ABSENT", "LEAVE"].map(status => (
                      <td key={status} className="px-4 py-2 text-center">
                        <input type="radio" name={`att-${s.id}`}
                          checked={attendance[s.id] === status}
                          onChange={() => setAttendance(prev => ({...prev, [s.id]: status}))}
                          data-testid={`att-${s.id}-${status.toLowerCase()}`} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
