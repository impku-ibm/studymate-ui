import { useEffect, useState } from "react";
import api from "../../api/axios";
import AddTeacherModal from "./AddTeacherModal";

export default function TeacherDirectory() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editTeacher, setEditTeacher] = useState(null);

  const loadTeachers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/teachers");
      setTeachers(res.data);
    } catch (e) {
      console.error("Failed to load teachers", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  return (
    <div className="space-y-4">

      {/* ---------- Action Bar ---------- */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Teachers
          </h3>
          <p className="text-sm text-slate-500">
            Manage teacher profiles and availability
          </p>
        </div>

        <button
          onClick={() => {
            setEditTeacher(null);
            setShowAdd(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white text-sm
                     rounded-lg hover:bg-blue-500 transition"
        >
          + Add Teacher
        </button>
      </div>

      {/* ---------- Table Card ---------- */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm
                flex flex-col h-[calc(100vh-335px)] mb-4">
        {loading ? (
          <div className="p-6 text-sm text-slate-500">
            Loading teachers…
          </div>
        ) : teachers.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-500 text-sm">
              No teachers found
            </p>
            <button
              onClick={() => setShowAdd(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white
                         rounded-lg text-sm"
            >
              + Add First Teacher
            </button>
          </div>
        ) : (
         <div className="flex-1 overflow-y-auto">
          <table className="w-full text-sm">
           <thead className="bg-slate-50 border-b sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wide text-slate-500">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wide text-slate-500">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wide text-slate-500">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wide text-slate-500">
                  Mobile
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wide text-slate-500">
                  Qualification
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wide text-slate-500">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {teachers.map(t => (
                <tr
                  key={t.id}
                  className="border-b last:border-none hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-3 text-slate-600">
                    {t.id}
                  </td>

                  <td className="px-6 py-3 font-medium text-slate-800">
                    {t.fullName}
                  </td>

                  <td className="px-6 py-3 text-slate-600">
                    {t.email}
                  </td>

                  <td className="px-6 py-3 text-slate-600">
                    {t.mobileNumber || "—"}
                  </td>

                  <td className="px-6 py-3 text-slate-600">
                    {t.qualification || "—"}
                  </td>

                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        t.active
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {t.active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6 py-3">
  <div className="flex justify-end items-center gap-3 whitespace-nowrap">
                    <button
  title="Edit Teacher"
  onClick={() => {
    setEditTeacher(t);
    setShowAdd(true);
  }}
  className="text-blue-600 hover:text-blue-800"
>
  ✏️
</button>

<button
  title="Disable (coming soon)"
  className="text-slate-400 cursor-not-allowed"
>
  🚫
</button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>

      {/* ---------- Modal ---------- */}
      {showAdd && (
        <AddTeacherModal
          teacher={editTeacher}
          onClose={() => {
            setShowAdd(false);
            setEditTeacher(null);
          }}
          onSuccess={() => {
            setShowAdd(false);
            setEditTeacher(null);
            loadTeachers();
          }}
        />
      )}
    </div>
  );
}
