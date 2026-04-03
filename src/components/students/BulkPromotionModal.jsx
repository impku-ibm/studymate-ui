import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function BulkPromotionModal({ onClose, onSuccess }) {
  const [classes, setClasses] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [form, setForm] = useState({
    sourceClassId: "", sourceSection: "",
    targetClassId: "", targetSection: "",
    targetAcademicYearId: ""
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([api.get("/classes"), api.get("/academic-years")])
      .then(([c, y]) => { setClasses(c.data); setAcademicYears(y.data); });
  }, []);

  const loadStudents = async () => {
    if (!form.sourceClassId) return;
    const res = await api.get("/students");
    setStudents(res.data);
    setSelectedStudents(res.data.map(s => s.id));
  };

  const toggleStudent = (id) => {
    setSelectedStudents(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handlePromote = async () => {
    setError(""); setLoading(true);
    try {
      const res = await api.post("/api/promotions/bulk", {
        ...form,
        sourceClassId: +form.sourceClassId, targetClassId: +form.targetClassId,
        targetAcademicYearId: +form.targetAcademicYearId,
        studentIds: selectedStudents
      });
      setResult(res.data);
    } catch (e) {
      setError(e.response?.data?.message || "Promotion failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Bulk Student Promotion</h3>
        {error && <div className="mb-3 text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

        {result ? (
          <div className="space-y-3">
            <div className="bg-emerald-50 p-4 rounded-lg">
              <p className="text-emerald-700 font-medium">Promotion Complete</p>
              <p className="text-sm">Promoted: {result.promotedCount} | Skipped: {result.skippedCount}</p>
            </div>
            {result.errors?.length > 0 && (
              <div className="bg-red-50 p-3 rounded text-sm text-red-600">
                {result.errors.map((e, i) => <p key={i}>{e}</p>)}
              </div>
            )}
            <button onClick={onSuccess} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Done</button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs text-slate-500 font-medium">Source Class</label>
                <select value={form.sourceClassId} onChange={e => setForm({...form, sourceClassId: e.target.value})}
                  className="block w-full p-2 border rounded text-sm" data-testid="promo-source-class">
                  <option value="">Select</option>
                  {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 font-medium">Source Section</label>
                <input value={form.sourceSection} onChange={e => setForm({...form, sourceSection: e.target.value})}
                  placeholder="A" className="block w-full p-2 border rounded text-sm" />
              </div>
              <div>
                <label className="text-xs text-slate-500 font-medium">Target Class</label>
                <select value={form.targetClassId} onChange={e => setForm({...form, targetClassId: e.target.value})}
                  className="block w-full p-2 border rounded text-sm" data-testid="promo-target-class">
                  <option value="">Select</option>
                  {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 font-medium">Target Section</label>
                <input value={form.targetSection} onChange={e => setForm({...form, targetSection: e.target.value})}
                  placeholder="A" className="block w-full p-2 border rounded text-sm" />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-xs text-slate-500 font-medium">Target Academic Year</label>
              <select value={form.targetAcademicYearId} onChange={e => setForm({...form, targetAcademicYearId: e.target.value})}
                className="block w-full p-2 border rounded text-sm" data-testid="promo-target-year">
                <option value="">Select</option>
                {academicYears.map(y => <option key={y.id} value={y.id}>{y.year}</option>)}
              </select>
            </div>
            <button onClick={loadStudents} className="mb-4 px-4 py-2 bg-slate-200 text-sm rounded-lg">Load Students</button>

            {students.length > 0 && (
              <div className="border rounded-lg max-h-48 overflow-y-auto mb-4">
                {students.map(s => (
                  <label key={s.id} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 text-sm">
                    <input type="checkbox" checked={selectedStudents.includes(s.id)}
                      onChange={() => toggleStudent(s.id)} />
                    {s.fullName} ({s.admissionNumber})
                  </label>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button onClick={onClose} className="px-4 py-2 text-sm text-slate-600 border rounded-lg">Cancel</button>
              <button onClick={handlePromote} disabled={loading || selectedStudents.length === 0}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg disabled:opacity-50"
                data-testid="promo-submit">
                {loading ? "Promoting..." : `Promote ${selectedStudents.length} Students`}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
