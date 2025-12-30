import { useEffect, useState } from "react";
import api from "../../api/axios";
import EnrollStudentModal from "./EnrollStudentModal";

export default function StudentEnrollment() {
  const [enrollments, setEnrollments] = useState([]);
  const [showEnroll, setShowEnroll] = useState(false);
  const [reload, setReload] = useState(false);

  const refresh = () => setReload(prev => !prev);

  // Load enrollments
  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/enrollments");
        setEnrollments(res.data);
      } catch (err) {
        console.error("Failed to load enrollments", err);
      }
    };
    load();
  }, [reload]);

  return (
    <>
      {/* Filter / Action Bar */}
      <div className="bg-white rounded-lg shadow border p-4 mb-6 flex items-center gap-4">
        <span className="text-sm text-gray-600 font-medium">
          Academic Year: <span className="text-blue-600">2024-25</span>
        </span>

        {/* Filters (future-ready) */}
        <select className="ml-auto p-2 border rounded text-sm">
          <option>Class</option>
        </select>

        <select className="p-2 border rounded text-sm">
          <option>Section</option>
        </select>

        <button
          onClick={() => setShowEnroll(true)}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded shadow"
        >
          + Enroll Student
        </button>
      </div>

      {/* Enrollment Table */}
      <div className="bg-white rounded-lg shadow border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Roll No</th>
              <th className="px-4 py-3 text-left">Student Name</th>
              <th className="px-4 py-3 text-left">Admission No</th>
              <th className="px-4 py-3 text-left">Class</th>
              <th className="px-4 py-3 text-left">Section</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {enrollments.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No enrollments found
                </td>
              </tr>
            ) : (
              enrollments.map(e => (
                <tr key={e.id} className="border-t">
                  <td className="px-4 py-3">{e.rollNumber}</td>
                  <td className="px-4 py-3">{e.student.fullName}</td>
                  <td className="px-4 py-3">{e.student.admissionNumber}</td>
                  <td className="px-4 py-3">{e.schoolClass.name}</td>
                  <td className="px-4 py-3">{e.section.name}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        e.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {e.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-3 text-blue-600">
                    👁 ✏️ 🚫
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showEnroll && (
        <EnrollStudentModal
          onClose={() => setShowEnroll(false)}
          onSuccess={refresh}
        />
      )}
    </>
  );
}
