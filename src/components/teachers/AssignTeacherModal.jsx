import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AssignTeacherModal({
  sectionId,
  onClose,
  onSuccess
}) {
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [subjectId, setSubjectId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Load subjects & teachers
  useEffect(() => {
    api.get("/subjects").then(res => setSubjects(res.data));
    api.get("/teachers").then(res => setTeachers(res.data));
  }, []);

  const handleAssign = async () => {
    if (!subjectId || !teacherId) {
      alert("Please select both subject and teacher");
      return;
    }

    setLoading(true);
    try {
      await api.post("/teacher-assignments", {
        sectionId,
        subjectId,
        teacherId
      });
      onSuccess();
    } catch (e) {
      alert(
        e?.response?.data?.message ||
        "Teacher assignment failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center
                    bg-black/50 backdrop-blur-sm">

      {/* MODAL CONTAINER */}
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl
                      max-h-[80vh] flex flex-col overflow-hidden">

        {/* ---------- HEADER ---------- */}
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-slate-900">
            Assign Teacher
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Assign a subject and teacher to the selected section
          </p>
        </div>

        {/* ---------- INFO STRIP ---------- */}
        <div className="px-6 py-3 bg-blue-50 text-blue-700 text-sm">
          Each subject in a section should ideally have one assigned teacher.
        </div>

        {/* ---------- BODY (SCROLLABLE) ---------- */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject *
            </label>
            <select
              value={subjectId}
              onChange={e => setSubjectId(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300
                         rounded-lg text-sm bg-white"
            >
              <option value="">Select Subject</option>
              {subjects.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-400">
              Choose the subject to be taught in this section
            </p>
          </div>

          {/* Teacher */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teacher *
            </label>
            <select
              value={teacherId}
              onChange={e => setTeacherId(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300
                         rounded-lg text-sm bg-white"
            >
              <option value="">Select Teacher</option>
              {teachers.map(t => (
                <option key={t.id} value={t.id}>
                  {t.fullName}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-400">
              Select the teacher responsible for this subject
            </p>
          </div>

        </div>

        {/* ---------- FOOTER ---------- */}
        <div className="px-6 py-4 border-t flex justify-end gap-3
                        bg-white sticky bottom-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={handleAssign}
            disabled={loading}
            className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg
                       hover:bg-blue-500 transition
                       disabled:opacity-50"
          >
            {loading ? "Assigning..." : "Assign Teacher"}
          </button>
        </div>

      </div>
    </div>
  );
}
