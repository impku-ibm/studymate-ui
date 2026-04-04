import { useEffect, useState } from "react";
import api from "../../api/axios";
import AddClassSubjectModal from "./AddClassSubjectModal";
import { TrashIcon } from "../common/Icons";

export default function ClassSubjectSetup() {
  const [academicYear, setAcademicYear] = useState(null);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classId, setClassId] = useState("");
  const [mappings, setMappings] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showCopy, setShowCopy] = useState(false);
  const [copySourceId, setCopySourceId] = useState("");
  const [copying, setCopying] = useState(false);
  const [loading, setLoading] = useState(false);

  const reloadMappings = () => {
    if (!classId || !academicYear) return;
    setLoading(true);
    api.get("/class-subjects", { params: { academicYearId: academicYear.id, classId } })
      .then(res => setMappings(res.data))
      .finally(() => setLoading(false));
  };

  const handleCopy = async () => {
    if (!copySourceId || !classId) return;
    setCopying(true);
    try {
      const res = await api.post(`/class-subjects/copy?sourceClassId=${copySourceId}&targetClassId=${classId}`);
      const count = res.data?.length || 0;
      setShowCopy(false);
      setCopySourceId("");
      reloadMappings();
      if (count === 0) alert("No new subjects to copy — all subjects already mapped.");
    } catch (e) {
      alert(e?.response?.data?.message || "Failed to copy subjects");
    } finally { setCopying(false); }
  };

  // Load base data
  useEffect(() => {
    const loadBase = async () => {
      const [yearRes, classRes, subjectRes] = await Promise.all([
        api.get("/academic-years/active"),
        api.get("/classes"),
        api.get("/subjects"),
      ]);
      setAcademicYear(yearRes.data);
      setClasses(classRes.data);
      setSubjects(subjectRes.data);

      if (classRes.data.length > 0) {
        setClassId(classRes.data[0].id);
      }
    };
    loadBase();
  }, []);

  // Load mappings when class or year changes
  useEffect(() => {
    reloadMappings();
  }, [classId, academicYear]);

  return (
    <div className="space-y-4">

      {/* ---------- Action Bar ---------- */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Class → Subject Mapping
          </h3>
          <p className="text-sm text-slate-500">
            Assign subjects to classes for the active academic year
          </p>
        </div>

        <div className="flex items-center gap-3">
          {academicYear && (
            <span className="px-3 py-1.5 rounded-lg text-sm
                             bg-blue-50 text-blue-700">
              Academic Year: <strong>{academicYear.year || academicYear.name}</strong>
            </span>
          )}

          <select
            value={classId}
            onChange={e => setClassId(e.target.value)}
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
            disabled={!classId}
            className="px-4 py-2 bg-blue-600 text-white text-sm
                       rounded-lg hover:bg-blue-500 transition
                       disabled:opacity-50"
          >
            + Add Subject
          </button>

          <div className="relative">
            <button
              onClick={() => setShowCopy(!showCopy)}
              disabled={!classId}
              className="px-4 py-2 border border-slate-300 text-slate-700 text-sm
                         rounded-lg hover:bg-slate-50 transition
                         disabled:opacity-50"
            >
              Copy from Class
            </button>

            {showCopy && (
              <div className="absolute right-0 top-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg p-4 z-20 w-72">
                <p className="text-xs text-slate-500 mb-2">Copy all subjects from another class to the current one (skips duplicates)</p>
                <select value={copySourceId} onChange={e => setCopySourceId(e.target.value)}
                  className="w-full border border-slate-300 px-3 py-2 rounded-lg text-sm mb-3">
                  <option value="">Select source class</option>
                  {classes.filter(c => String(c.id) !== String(classId)).map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <div className="flex gap-2 justify-end">
                  <button onClick={() => { setShowCopy(false); setCopySourceId(""); }}
                    className="px-3 py-1.5 text-xs text-slate-600 border border-slate-300 rounded-lg">Cancel</button>
                  <button onClick={handleCopy} disabled={!copySourceId || copying}
                    className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg disabled:opacity-50">
                    {copying ? "Copying..." : "Copy Subjects"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ---------- Table Card ---------- */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">

        {loading ? (
          <div className="p-6 text-sm text-slate-500">
            Loading subject mappings…
          </div>
        ) : mappings.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-500 text-sm">
              No subjects mapped to this class yet
            </p>
            {classId && (
              <button
                onClick={() => setShowAdd(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white
                           rounded-lg text-sm"
              >
                + Add First Subject
              </button>
            )}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase
                               tracking-wide text-slate-500">
                  Subject Name
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase
                               tracking-wide text-slate-500">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase
                               tracking-wide text-slate-500">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs uppercase
                               tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {mappings.map(m => (
                <tr
                  key={m.id}
                  className="border-b last:border-none
                             hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {m.subjectName || m.subject?.name}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {m.subjectCode || m.subject?.code}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium
                                     bg-emerald-100 text-emerald-700">
                      ACTIVE
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={async () => {
                        if (!confirm(`Remove "${m.subjectName || m.subject?.name}" from this class?`)) return;
                        try {
                          await api.delete(`/class-subjects/${m.id}`);
                          setMappings(prev => prev.filter(x => x.id !== m.id));
                        } catch (e) { alert(e?.response?.data?.message || "Failed to remove mapping"); }
                      }}
                      className="text-slate-400 hover:text-red-600 transition"
                      title="Remove Subject"
                    >
                      <TrashIcon className="w-[18px] h-[18px]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ---------- Modal ---------- */}
      {showAdd && (
        <AddClassSubjectModal
          academicYear={academicYear}
          classId={classId}
          subjects={subjects}
          existingMappings={mappings}
          onClose={() => setShowAdd(false)}
          onSuccess={() => {
            setShowAdd(false);
            reloadMappings();
          }}
        />
      )}
    </div>
  );
}
