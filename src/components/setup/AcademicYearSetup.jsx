import { useEffect, useState } from "react";
import api from "../../api/axios";
import AddAcademicYearModal from "./AddAcademicYearModal.jsx";

export default function AcademicYearSetup() {
  const [years, setYears] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await api.get("/academic-years");
    setYears(res.data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-4">

      {/* ---------- Action Bar ---------- */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Academic Years
          </h3>
          <p className="text-sm text-slate-500">
            Manage academic years for your school
          </p>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg
                     hover:bg-blue-500 transition shadow-sm"
        >
          + Add Academic Year
        </button>
      </div>

      {/* ---------- Table Card ---------- */}
     <div className="bg-white rounded-xl border border-slate-200 shadow-sm
                flex flex-col h-[calc(100vh-335px)] mb-4">
        {loading ? (
          <div className="p-6 text-sm text-slate-500">
            Loading academic years…
          </div>
        ) : years.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-500 text-sm">
              No academic years created yet
            </p>
            <button
              onClick={() => setShowAdd(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white
                         rounded-lg text-sm"
            >
              + Create First Academic Year
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wide text-slate-500">
                  Year
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
              {years.map(y => {
                const isActive = y.status === "ACTIVE" || y.status === true;

                return (
                  <tr
                    key={y.id}
                    className="border-b last:border-none hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-3 font-medium text-slate-800">
                      {y.year}
                    </td>

                    <td className="px-6 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isActive
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {isActive ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </td>

                    <td className="px-6 py-3 text-right">
                      {!isActive && (
                        <button
                          onClick={() =>
                            api
                              .patch(`/academic-years/${y.id}/activate`)
                              .then(load)
                          }
                          className="text-blue-600 text-sm font-medium
                                     hover:underline"
                        >
                          Activate
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        )}
      </div>

      {/* ---------- Modal ---------- */}
      {showAdd && (
        <AddAcademicYearModal
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
