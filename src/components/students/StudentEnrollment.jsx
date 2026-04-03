import { useEffect, useState } from "react";
import api from "../../api/axios";
import EnrollStudentModal from "./EnrollStudentModal";

export default function StudentEnrollment() {
  const [enrollments, setEnrollments] = useState([]);
  const [showEnroll, setShowEnroll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const loadEnrollments = async () => {
    setLoading(true);
    try {
      const res = await api.get("/enrollments");
      setEnrollments(res.data);
    } catch (err) {
      console.error("Failed to load enrollments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnrollments();
    api.get("/classes").then(res => setClasses(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (selectedClass) {
      api.get(`/classes/${selectedClass}/sections`).then(res => setSections(res.data)).catch(() => {});
    } else {
      setSections([]);
    }
  }, [selectedClass]);

  return (
    <div className="space-y-6">

      {/* ---------- Action / Filter Bar ---------- */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600 font-medium">
          Academic Year:
          <span className="ml-1 text-blue-600">2024–25</span>
        </span>

        {/* Filters (future-ready) */}
        <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}
          className="ml-auto px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
          <option value="">All Classes</option>
          {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <select value={selectedSection} onChange={e => setSelectedSection(e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
          <option value="">All Sections</option>
          {sections.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
        </select>

        <button
          onClick={() => setShowEnroll(true)}
          className="px-4 py-2 bg-blue-600 text-white text-sm
                     rounded-lg hover:bg-blue-500 transition shadow-sm"
        >
          + Enroll Student
        </button>
      </div>

      {/* ---------- Table Card ---------- */}
      <div
        className="bg-white rounded-xl border border-slate-200 shadow-sm
                   flex flex-col h-[calc(100vh-320px)]"
      >

        {/* ---------- Scrollable Table ---------- */}
        <div className="flex-1 overflow-y-auto">

          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase text-slate-500">
                  Roll No
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase text-slate-500">
                  Student Name
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase text-slate-500">
                  Admission No
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase text-slate-500">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase text-slate-500">
                  Section
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase text-slate-500">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs uppercase text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-slate-500">
                    Loading enrollments…
                  </td>
                </tr>
              ) : enrollments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-slate-500">
                    No enrollments found
                  </td>
                </tr>
              ) : (
                enrollments.map(e => (
                  <tr
                    key={e.id}
                    className="border-b last:border-none hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-3 text-slate-600">
                      {e.rollNumber}
                    </td>

                    <td className="px-6 py-3 font-medium text-slate-800">
                      {e.studentName}
                    </td>

                    <td className="px-6 py-3 text-slate-600">
                      {e.admissionNumber}
                    </td>

                    <td className="px-6 py-3 text-slate-600">
                      {e.className}
                    </td>

                    <td className="px-6 py-3 text-slate-600">
                      {e.sectionName}
                    </td>

                    <td className="px-6 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          e.status === "ACTIVE"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {e.status}
                      </span>
                    </td>

                    {/* Actions – INLINE */}
                    <td className="px-6 py-3 text-right">
                      <div className="inline-flex items-center gap-3">
                        <button
                          title="View Enrollment"
                          className="text-slate-500 hover:text-blue-600"
                        >
                          👁
                        </button>
                        <button
                          title="Edit Enrollment"
                          className="text-slate-500 hover:text-blue-600"
                        >
                          ✏️
                        </button>
                        <button
                          title="Deactivate (future)"
                          className="text-slate-400 cursor-not-allowed"
                        >
                          🚫
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ---------- Bottom breathing space ---------- */}
        <div className="h-6" />
      </div>

      {/* ---------- Modal ---------- */}
      {showEnroll && (
        <EnrollStudentModal
          onClose={() => setShowEnroll(false)}
          onSuccess={() => {
            setShowEnroll(false);
            loadEnrollments();
          }}
        />
      )}
    </div>
  );
}
