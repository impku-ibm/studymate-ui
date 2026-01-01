import { useEffect, useState } from "react";
import AddStudentModal from "./AddStudentModal";
import api from "../../api/axios";

export default function StudentDirectory() {
  const [showAdd, setShowAdd] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (e) {
      console.error("Failed to load students", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div className="space-y-6">

      {/* ---------- Page Header ---------- */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Students
          </h3>
          <p className="text-sm text-slate-500">
            Manage student records and enrollment details
          </p>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-blue-600 text-white text-sm
                     rounded-lg hover:bg-blue-500 transition shadow-sm"
        >
          + Add Student
        </button>
      </div>

      {/* ---------- Table Card ---------- */}
      <div
        className="bg-white rounded-xl border border-slate-200 shadow-sm
                   flex flex-col h-[calc(100vh-335px)] mb-4"
      >

        {/* Scrollable Table Wrapper */}
        <div className="flex-1 overflow-y-auto">

          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase text-slate-500">
                  Admission No
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase text-slate-500">
                  Student Name
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase text-slate-500">
                  Parent Name
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase text-slate-500">
                  Parent Mobile
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase text-slate-500">
                  Admission Date
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
                    Loading students…
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-slate-500">
                    No students found
                  </td>
                </tr>
              ) : (
                students.map(s => (
                  <tr
                    key={s.admissionNumber}
                    className="border-b last:border-none hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-3 text-slate-600">
                      {s.admissionNumber}
                    </td>

                    <td className="px-6 py-3 font-medium text-slate-800">
                      {s.fullName}
                    </td>

                    <td className="px-6 py-3 text-slate-600">
                      {s.parentName}
                    </td>

                    <td className="px-6 py-3 text-slate-600">
                      {s.parentMobile}
                    </td>

                    <td className="px-6 py-3 text-slate-600">
                      {s.admissionDate}
                    </td>

                    <td className="px-6 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          s.status === "ACTIVE"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>

                    {/* Actions – INLINE like Teacher */}
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-3">
                        <button
                          title="View Student"
                          className="text-slate-500 hover:text-blue-600"
                        >
                          👁
                        </button>
                        <button
                          title="Edit Student"
                          className="text-slate-500 hover:text-blue-600"
                        >
                          ✏️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ---------- Bottom Padding (IMPORTANT) ---------- */}
        <div className="h-6" />
      </div>

      {/* ---------- Modal ---------- */}
      {showAdd && (
        <AddStudentModal
          onClose={() => setShowAdd(false)}
          onSuccess={() => {
            setShowAdd(false);
            loadStudents();
          }}
        />
      )}
    </div>
  );
}
