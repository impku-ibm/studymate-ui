import { useEffect, useState } from "react";
import api from "../../api/axios";
import AddSectionModal from "./AddSectionModal";

export default function SectionSetup() {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load classes
  useEffect(() => {
    api.get("/classes").then(res => {
      setClasses(res.data);
      if (res.data.length > 0) {
        setSelectedClass(res.data[0].id);
      }
    });
  }, []);

  // Load sections when class changes
  useEffect(() => {
    if (!selectedClass) {
      setSections([]);
      return;
    }

    setLoading(true);
    api
      .get(`/classes/${selectedClass}/sections`)
      .then(res => setSections(res.data))
      .finally(() => setLoading(false));
  }, [selectedClass]);

  return (
    <div className="space-y-4">

      {/* ---------- Action Bar ---------- */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Sections
          </h3>
          <p className="text-sm text-slate-500">
            Manage sections under each class
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedClass}
            onChange={e => setSelectedClass(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg
                       text-sm w-60 bg-white"
          >
            <option value="">Select Class</option>
            {classes.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowAdd(true)}
            disabled={!selectedClass}
            className="px-4 py-2 bg-blue-600 text-white text-sm
                       rounded-lg hover:bg-blue-500 transition
                       disabled:opacity-50"
          >
            + Add Section
          </button>
        </div>
      </div>

      {/* ---------- Table Card ---------- */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm
                flex flex-col h-[calc(100vh-335px)] mb-4">
        {loading ? (
          <div className="p-6 text-sm text-slate-500">
            Loading sections…
          </div>
        ) : sections.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-500 text-sm">
              No sections found for this class
            </p>
            {selectedClass && (
              <button
                onClick={() => setShowAdd(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white
                           rounded-lg text-sm"
              >
                + Add First Section
              </button>
            )}
          </div>
       ) : (
 <div className="flex-1 overflow-y-auto">
    <table className="w-full text-sm">
      <thead className="bg-slate-50 border-b sticky top-0 z-10">

              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase
                               tracking-wide text-slate-500">
                  Section Name
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase
                               tracking-wide text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {sections.map(s => (
                <tr
                  key={s.id}
                  className="border-b last:border-none
                             hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-3 font-medium text-slate-800">
                    {s.name}
                  </td>

                  <td className="px-6 py-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium
                                     bg-emerald-100 text-emerald-700">
                      ACTIVE
                    </span>
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
        <AddSectionModal
          classId={selectedClass}
          onClose={() => setShowAdd(false)}
          onSuccess={() => {
            setShowAdd(false);
            api
              .get(`/classes/${selectedClass}/sections`)
              .then(res => setSections(res.data));
          }}
        />
      )}
    </div>
  );
}
