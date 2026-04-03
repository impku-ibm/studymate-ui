import { useEffect, useState } from "react";
import { getSchedules, enterMarks } from "../../api/examApi";
import api from "../../api/axios";

export default function EnterMarks({ exam, onBack }) {
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [students, setStudents] = useState([]);
  const [marksData, setMarksData] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getSchedules(exam.id).then(res => setSchedules(res.data));
  }, [exam.id]);

  const loadStudents = async (schedule) => {
    setSelectedSchedule(schedule);
    setLoading(true);
    setMessage("");
    try {
      const res = await api.get("/students");
      const studentList = res.data;
      const initial = {};
      studentList.forEach(s => {
        initial[s.id] = { marks: "", absent: false, remarks: "" };
      });
      setStudents(studentList);
      setMarksData(initial);
    } finally { setLoading(false); }
  };

  const updateMark = (studentId, field, value) => {
    setMarksData(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], [field]: value }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      for (const student of students) {
        const data = marksData[student.id];
        if (!data) continue;
        await enterMarks({
          examScheduleId: selectedSchedule.id,
          studentId: student.id,
          marksObtained: data.absent ? null : (data.marks ? parseInt(data.marks) : null),
          absent: data.absent,
          remarks: data.remarks
        });
      }
      setMessage("Marks saved successfully");
    } catch (e) {
      setMessage("Error: " + (e.response?.data?.message || "Failed to save"));
    } finally { setSaving(false); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-blue-600 text-sm hover:underline">← Back</button>
        <h3 className="text-lg font-semibold">{exam.name} — Enter Marks</h3>
      </div>

      <div className="flex gap-3 flex-wrap">
        {schedules.map(s => (
          <button key={s.id} onClick={() => loadStudents(s)}
            className={`px-3 py-2 text-sm rounded-lg border ${selectedSchedule?.id === s.id ? "bg-blue-600 text-white" : "bg-white"}`}
            data-testid={`marks-schedule-${s.id}`}>
            {s.className} {s.section} — {s.subjectName}
          </button>
        ))}
      </div>

      {message && <div className={`text-sm p-2 rounded ${message.startsWith("Error") ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>{message}</div>}

      {selectedSchedule && (
        <div className="bg-white rounded-xl border shadow-sm">
          <div className="px-4 py-3 border-b bg-slate-50 flex justify-between items-center">
            <span className="text-sm font-medium">{selectedSchedule.subjectName} — Max: {selectedSchedule.maxMarks}, Pass: {selectedSchedule.passMarks}</span>
            <button onClick={handleSave} disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg disabled:opacity-50"
              data-testid="marks-save-btn">
              {saving ? "Saving..." : "Save All Marks"}
            </button>
          </div>
          <div className="overflow-y-auto max-h-[calc(100vh-450px)]">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left text-xs uppercase text-slate-500">Student</th>
                  <th className="px-4 py-2 text-left text-xs uppercase text-slate-500">Adm No</th>
                  <th className="px-4 py-2 text-left text-xs uppercase text-slate-500 w-24">Marks</th>
                  <th className="px-4 py-2 text-center text-xs uppercase text-slate-500 w-20">Absent</th>
                  <th className="px-4 py-2 text-left text-xs uppercase text-slate-500">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" className="px-4 py-6 text-center text-slate-500">Loading students...</td></tr>
                ) : students.map(s => (
                  <tr key={s.id} className="border-b hover:bg-slate-50">
                    <td className="px-4 py-2 font-medium">{s.fullName}</td>
                    <td className="px-4 py-2 text-slate-600">{s.admissionNumber}</td>
                    <td className="px-4 py-2">
                      <input type="number" min="0" max={selectedSchedule.maxMarks}
                        value={marksData[s.id]?.marks || ""}
                        disabled={marksData[s.id]?.absent}
                        onChange={e => updateMark(s.id, "marks", e.target.value)}
                        className="w-20 p-1 border rounded text-sm disabled:bg-slate-100"
                        data-testid={`marks-input-${s.id}`} />
                    </td>
                    <td className="px-4 py-2 text-center">
                      <input type="checkbox" checked={marksData[s.id]?.absent || false}
                        onChange={e => updateMark(s.id, "absent", e.target.checked)}
                        data-testid={`marks-absent-${s.id}`} />
                    </td>
                    <td className="px-4 py-2">
                      <input value={marksData[s.id]?.remarks || ""}
                        onChange={e => updateMark(s.id, "remarks", e.target.value)}
                        className="w-full p-1 border rounded text-sm" placeholder="Optional" />
                    </td>
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
