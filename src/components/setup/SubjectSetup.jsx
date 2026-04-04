import { useEffect, useState } from "react";
import api from "../../api/axios";
import AddSubjectModal from "./AddSubjectModal";
import { TrashIcon } from "../common/Icons";

export default function SubjectSetup() {
  const [subjects, setSubjects] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await api.get("/subjects");
    setSubjects(res.data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-4 pb-6">

      {/* ---------- Action Bar ---------- */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Subjects
          </h3>
          <p className="text-sm text-slate-500">
            Manage subjects taught in your school
          </p>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg
                     hover:bg-blue-500 transition shadow-sm"
        >
          + Add Subject
        </button>
      </div>

      {/* ---------- Table Card ---------- */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm
                flex flex-col h-[calc(100vh-335px)] mb-4">

        {loading ? (
          <div className="p-6 text-sm text-slate-500">
            Loading subjects…
          </div>
        ) : subjects.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-500 text-sm">
              No subjects created yet
            </p>
            <button
              onClick={() => setShowAdd(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white
                         rounded-lg text-sm"
            >
              + Create First Subject
            </button>
          </div>
        ) : (
             <div className="flex-1 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wide text-slate-500">
                  Subject Name
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wide text-slate-500">
                  Code
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
              {subjects.map(s => (
                <tr
                  key={s.id}
                  className="border-b last:border-none hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-3 font-medium text-slate-800">
                    {s.name}
                  </td>

                  <td className="px-6 py-3 text-slate-600">
                    {s.code}
                  </td>

                  <td className="px-6 py-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium
                                     bg-emerald-100 text-emerald-700">
                      ACTIVE
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button
                      onClick={async () => {
                        if (!confirm(`Delete subject "${s.name}"?`)) return;
                        try { await api.delete(`/subjects/${s.id}`); load(); }
                        catch (e) { alert(e?.response?.data?.message || "Cannot delete — subject may be assigned to classes"); }
                      }}
                      className="text-slate-400 hover:text-red-600 transition"
                      title="Delete Subject"
                    >
                      <TrashIcon className="w-[18px] h-[18px]" />
                    </button>
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
        <AddSubjectModal
          onClose={() => setShowAdd(false)}
          onSuccess={() => {
            setShowAdd(false);
            load();
          }}
        />
      )}
    </div>
  );
}
