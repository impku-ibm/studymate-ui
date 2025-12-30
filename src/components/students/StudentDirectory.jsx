import { useEffect, useState } from "react";
import AddStudentModal from "./AddStudentModal";
import api from "../../api/axios";

export default function StudentDirectory() {
  const [showAdd, setShowAdd] = useState(false);
  const [students, setStudents] = useState([]);
  const [reload, setReload] = useState(false);

  const refresh = () => setReload(prev => !prev);

  // 🔹 Fetch students from backend
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const res = await api.get("/students");
        setStudents(res.data);
      } catch (err) {
        console.error("Failed to load students", err);
      }
    };

    loadStudents();
  }, [reload]);

  return (
    <>
      {/* Action bar */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded shadow"
        >
          + Add Student
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Admission Number</th>
              <th className="px-4 py-3 text-left">Student Name</th>
              <th className="px-4 py-3 text-left">Parent Name</th>
              <th className="px-4 py-3 text-left">Parent Mobile</th>
              <th className="px-4 py-3 text-left">Admission Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
                  No students found
                </td>
              </tr>
            ) : (
              students.map(s => (
                <tr key={s.admissionNumber} className="border-t">
                  <td className="px-4 py-3">{s.admissionNumber}</td>
                  <td className="px-4 py-3">{s.fullName}</td>
                  <td className="px-4 py-3">{s.parentName}</td>
                  <td className="px-4 py-3">{s.parentMobile}</td>
                  <td className="px-4 py-3">{s.admissionDate}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        s.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-3 text-blue-600">
                    👁 ✏️
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showAdd && (
        <AddStudentModal
          onClose={() => setShowAdd(false)}
          onSuccess={refresh}
        />
      )}
    </>
  );
}
