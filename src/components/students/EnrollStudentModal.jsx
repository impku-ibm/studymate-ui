import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function EnrollStudentModal({ onClose, onSuccess }) {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [academicYear, setAcademicYear] = useState(null);

  const [form, setForm] = useState({
    studentId: "",
    classId: "",
    sectionId: "",
    rollNumber: "",
  });

  // Load initial data
  useEffect(() => {
    const load = async () => {
      const [s, c, y] = await Promise.all([
        api.get("/students"),
        api.get("/classes"),
        api.get("/academic-years/active"),
      ]);

      setStudents(s.data);
      setClasses(c.data);
      setAcademicYear(y.data);
    };
    load();
  }, []);

  // Load sections when class changes
  useEffect(() => {
    if (!form.classId) return;

    api
      .get(`/classes/${form.classId}/sections`)
      .then(res => setSections(res.data));
  }, [form.classId]);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleEnroll = async () => {
    try {
      await api.post("/enrollments", {
        studentId: form.studentId,
        academicYearId: academicYear.id, // injected, not selected
        classId: form.classId,
        sectionId: form.sectionId,
        rollNumber: form.rollNumber,
      });

      onSuccess();
      onClose();
    } catch {
      alert("Enrollment failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[520px] rounded-lg shadow-lg">

        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Enroll Student</h3>
          <p className="text-sm text-gray-500">
            Academic Year: {academicYear?.year}
          </p>
        </div>

        <div className="p-6 space-y-4">
          <select name="studentId" onChange={handleChange}
            className="w-full border px-3 py-2 rounded">
            <option value="">Select Student</option>
            {students.map(s => (
              <option key={s.id} value={s.id}>
                {s.fullName} ({s.admissionNumber})
              </option>
            ))}
          </select>

          <select name="classId" onChange={handleChange}
            className="w-full border px-3 py-2 rounded">
            <option value="">Select Class</option>
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select name="sectionId" onChange={handleChange}
            disabled={!sections.length}
            className="w-full border px-3 py-2 rounded">
            <option value="">Select Section</option>
            {sections.map(sec => (
              <option key={sec.id} value={sec.id}>{sec.name}</option>
            ))}
          </select>

          <input
            name="rollNumber"
            placeholder="Roll Number"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleEnroll}
            className="bg-blue-600 text-white px-4 py-2 rounded">
            Enroll
          </button>
        </div>
      </div>
    </div>
  );
}
