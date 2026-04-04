import { useState } from "react";
import { createPortal } from "react-dom";
import api from "../../api/axios";

export default function AddClassSubjectModal({
  academicYear,
  classId,
  subjects,
  existingMappings = [],
  onClose,
  onSuccess,
}) {
  const [subjectId, setSubjectId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Filter out subjects already mapped to this class
  const mappedSubjectIds = new Set(
    existingMappings.map(m => m.subjectId || m.subject?.id)
  );
  const availableSubjects = subjects.filter(s => !mappedSubjectIds.has(s.id));

  const handleSubmit = async () => {
    if (!subjectId) { setError("Please select a subject"); return; }

    setLoading(true);
    setError("");
    try {
      await api.post("/class-subjects", {
        classId: Number(classId),
        subjectIds: [Number(subjectId)],
      });
      onSuccess();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to add subject mapping");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md mx-4 rounded-xl shadow-2xl">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-slate-900">Add Subject to Class</h3>
          <p className="text-sm text-slate-500">Academic Year: {academicYear?.year || academicYear?.name}</p>
        </div>

        {error && <div className="mx-6 mt-3 text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>}

        <div className="p-6 space-y-4">
          {availableSubjects.length === 0 ? (
            <p className="text-sm text-slate-500">All subjects are already mapped to this class.</p>
          ) : (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Subject *</label>
              <select value={subjectId} onChange={e => setSubjectId(e.target.value)}
                className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="">Select Subject</option>
                {availableSubjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t bg-slate-50 rounded-b-xl flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-100">Cancel</button>
          <button onClick={handleSubmit} disabled={loading || !subjectId || availableSubjects.length === 0}
            className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50">
            {loading ? "Adding..." : "Add Subject"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
