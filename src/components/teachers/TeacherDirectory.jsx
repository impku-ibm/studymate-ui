import AddTeacherModal from "./AddTeacherModal";
import { useState } from "react";

const teachers = [
  {
    id: "T001",
    name: "Mrs. Sunita Sharma",
    email: "sunita.sharma@school.com",
    mobile: "+91 98765 43210",
    qualification: "M.Sc Mathematics",
    status: "Active",
  },
  {
    id: "T004",
    name: "Mr. Vikram Singh",
    email: "vikram.singh@school.com",
    mobile: "+91 98765 43213",
    qualification: "M.Sc Chemistry",
    status: "Inactive",
  },
];

export default function TeacherDirectory() {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded shadow"
        >
          + Add Teacher
        </button>
      </div>

      <div className="bg-white rounded-lg shadow border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Teacher ID</th>
              <th className="px-4 py-3 text-left">Full Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Mobile Number</th>
              <th className="px-4 py-3 text-left">Qualification</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {teachers.map(t => (
              <tr key={t.id} className="border-t">
                <td className="px-4 py-3">{t.id}</td>
                <td className="px-4 py-3">{t.name}</td>
                <td className="px-4 py-3">{t.email}</td>
                <td className="px-4 py-3">{t.mobile}</td>
                <td className="px-4 py-3">{t.qualification}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      t.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-3 text-blue-600">
                  <button title="View">👁</button>
                  <button title="Edit">✏️</button>
                  <button title="Disable">🚫</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && <AddTeacherModal onClose={() => setShowAdd(false)} />}
    </>
  );
}
