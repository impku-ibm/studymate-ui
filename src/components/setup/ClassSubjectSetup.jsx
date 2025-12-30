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
    };
    loadBase();
  }, []);

  useEffect(() => {
    if (!classId || !academicYear) {
      setMappings([]);
      return;
    }

    api
      .get("/class-subjects", {
        params: {
          academicYearId: academicYear.id,
          classId,
        },
      })
      .then(res => setMappings(res.data));
  }, [classId, academicYear]);

  return (
    <>
      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow border p-4 mb-6 flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Academic Year:
          <span className="ml-1 text-blue-600 font-medium">
            {academicYear?.name}
          </span>
        </span>

        <select
          onChange={e => setClassId(e.target.value)}
          className="ml-auto p-2 border rounded text-sm"
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
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          + Add Subject
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Subject Name</th>
              <th className="px-4 py-3 text-left">Code</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {mappings.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-4 py-6 text-center text-gray-500">
                  No subjects mapped to this class
                </td>
              </tr>
            ) : (
              mappings.map(m => (
                <tr key={m.id} className="border-t">
                  <td className="px-4 py-3">{m.subject.name}</td>
                  <td className="px-4 py-3">{m.subject.code}</td>
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                      ACTIVE
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <AddClassSubjectModal
          academicYear={academicYear}
          classId={classId}
          subjects={subjects}
          onClose={() => setShowAdd(false)}
          onSuccess={() => {
            setShowAdd(false);
            api
              .get("/class-subjects", {
                params: {
                  academicYearId: academicYear.id,
                  classId,
                },
              })
              .then(res => setMappings(res.data));
          }}
        />
      )}
    </>
  );
}
