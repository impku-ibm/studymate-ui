import { useState } from "react";
import api from "../../api/axios";

export default function AddClassSubjectModal({
  academicYear,
  classId,
  subjects,
  onClose,
  onSuccess,
}) {
  const [subjectId, setSubjectId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!subjectId) {
      alert("Please select a subject");
      return;
    }

    setLoading(true);
    try {
      await api.post("/class-subjects", {
        academicYearId: academicYear.id,
        classId,
        subjectId,
      });

      onSuccess();
    } catch (err) {
      alert("Subject already mapped or failed to add");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[520px] rounded-lg shadow-lg">

        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Add Subject to Class</h3>
          <p className="text-sm text-gray-500 mt-1">
            Academic Year: {academicYear.name}
          </p>
        </div>

        <div className="p-6 space-y-4">
          <select
            onChange={e => setSubjectId(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Subject</option>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Subject"}
          </button>
        </div>
      </div>
    </div>
  );
}
