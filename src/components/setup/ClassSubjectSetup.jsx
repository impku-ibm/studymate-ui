import { useEffect, useState } from "react";
import api from "../../api/axios";
import AddClassSubjectModal from "./AddClassSubjectModal";

export default function ClassSubjectSetup() {
  const [academicYear, setAcademicYear] = useState(null);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classId, setClassId] = useState("");
  const [mappings, setMappings] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);

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
    if (!classId || !academicYear) {
      setMappings([]);
      return;
    }

    setLoading(true);
    api
      .get("/class-subjects", {
        params: {
          academicYearId: academicYear.id,
          classId,
        },
      })
      .then(res => setMappings(res.data))
      .finally(() => setLoading(false));
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
                    {m.subject.name}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {m.subject.code}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium
                                     bg-emerald-100 text-emerald-700">
                      ACTIVE
                    </span>
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
          onClose={() => setShowAdd(false)}
          onSuccess={() => {
            setShowAdd(false);
            setLoading(true);
            api
              .get("/class-subjects", {
                params: {
                  academicYearId: academicYear.id,
                  classId,
                },
              })
              .then(res => setMappings(res.data))
              .finally(() => setLoading(false));
          }}
        />
      )}
    </div>
  );
}
