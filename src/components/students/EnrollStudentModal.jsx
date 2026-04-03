import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import api from "../../api/axios";
import { getFeePlans, assignPlanToStudent } from "../../api/feePlanApi";

export default function EnrollStudentModal({ onClose, onSuccess }) {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [feePlans, setFeePlans] = useState([]);
  const [academicYear, setAcademicYear] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    studentId: "", classId: "", sectionId: "", rollNumber: "", feePlanId: "",
  });

  useEffect(() => {
    Promise.all([
      api.get("/students"),
      api.get("/classes"),
      api.get("/academic-years/active"),
      getFeePlans(),
    ]).then(([s, c, y, fp]) => {
      setStudents(s.data);
      setClasses(c.data);
      setAcademicYear(y.data);
      setFeePlans(fp.data);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (!form.classId) { setSections([]); return; }
    api.get(`/classes/${form.classId}/sections`).then(res => setSections(res.data)).catch(() => {});
  }, [form.classId]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleEnroll = async () => {
    setError("");
    setLoading(true);
    try {
      // 1. Enroll student
      await api.post("/enrollments", {
        studentId: +form.studentId,
        classId: +form.classId,
        sectionId: +form.sectionId,
        rollNumber: +form.rollNumber,
      });

      // 2. Assign fee plan (if selected)
      if (form.feePlanId) {
        await assignPlanToStudent(+form.studentId, +form.feePlanId);
      }

      onSuccess();
    } catch (err) {
      setError(err?.response?.data?.message || "Enrollment failed");
    } finally {
      setLoading(false);
    }
  };

  const selectedPlan = feePlans.find(p => p.id === +form.feePlanId);

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg mx-4 rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">

        <div className="px-6 py-4 border-b sticky top-0 bg-white rounded-t-xl">
          <h3 className="text-lg font-semibold text-slate-900">Enroll Student</h3>
          <p className="text-sm text-slate-500">Academic Year: {academicYear?.year || "Loading..."}</p>
        </div>

        {error && <div className="mx-6 mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>}

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Student *</label>
            <select name="studentId" value={form.studentId} onChange={handleChange}
              className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="">Select Student</option>
              {students.map(s => <option key={s.id} value={s.id}>{s.fullName} ({s.admissionNumber})</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Class *</label>
              <select name="classId" value={form.classId} onChange={handleChange}
                className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="">Select Class</option>
                {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Section *</label>
              <select name="sectionId" value={form.sectionId} onChange={handleChange} disabled={!sections.length}
                className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-slate-100">
                <option value="">Select Section</option>
                {sections.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Roll Number *</label>
            <input name="rollNumber" type="number" value={form.rollNumber} onChange={handleChange}
              placeholder="Enter roll number" className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <div className="border-t pt-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Fee Plan *</label>
            <p className="text-xs text-slate-500 mb-2">Select the student's category to determine applicable fees</p>
            <select name="feePlanId" value={form.feePlanId} onChange={handleChange}
              className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="">Select Fee Plan</option>
              {feePlans.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>

            {selectedPlan && (
              <div className="mt-3 bg-blue-50 rounded-lg p-3">
                <p className="text-xs font-medium text-blue-800 mb-2">Fee breakdown for {selectedPlan.name}:</p>
                <div className="space-y-1">
                  {selectedPlan.items?.map(item => (
                    <div key={item.id} className="flex justify-between text-xs">
                      <span className="text-blue-700">{item.feeType}</span>
                      <span className="text-blue-900 font-medium">₹{item.amount} / {item.frequency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 border-t bg-slate-50 rounded-b-xl flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-100">Cancel</button>
          <button onClick={handleEnroll}
            disabled={loading || !form.studentId || !form.classId || !form.rollNumber}
            className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50">
            {loading ? "Enrolling..." : "Enroll & Assign Fees"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
