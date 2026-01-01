import { useEffect, useState } from "react";
import api from "../../api/axios";
import AssignTeacherModal from "./AssignTeacherModal";
import TeacherAssignmentTable from "./TeacherAssignmentTable";

export default function TeacherAssignments() {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [showAssign, setShowAssign] = useState(false);
  const [loading, setLoading] = useState(false);

  // ---------- Load classes ----------
  useEffect(() => {
    api.get("/classes").then(res => {
      setClasses(res.data);
      if (res.data.length > 0) {
        setSelectedClass(res.data[0].id);
      }
    });
  }, []);

  // ---------- Load sections ----------
  useEffect(() => {
    if (!selectedClass) {
      setSections([]);
      setSelectedSection("");
      return;
    }

    api
      .get(`/classes/${selectedClass}/sections`)
      .then(res => {
        setSections(res.data);
        if (res.data.length > 0) {
          setSelectedSection(res.data[0].id);
        }
      });
  }, [selectedClass]);

  // ---------- Load assignments ----------
  useEffect(() => {
    if (!selectedSection) {
      setAssignments([]);
      return;
    }

    setLoading(true);
    api
      .get(`/teacher-assignments/sections/${selectedSection}`)
      .then(res => setAssignments(res.data))
      .finally(() => setLoading(false));
  }, [selectedSection]);

  const selectedClassName =
    classes.find(c => c.id == selectedClass)?.name;

  const selectedSectionName =
    sections.find(s => s.id == selectedSection)?.name;

  return (
    <div className="space-y-4">

      {/* ---------- Action Bar ---------- */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Teacher Assignments
          </h3>
          <p className="text-sm text-slate-500">
            Assign teachers to subjects for each section
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedClass}
            onChange={e => setSelectedClass(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg
                       text-sm w-48 bg-white"
          >
            <option value="">Select Class</option>
            {classes.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={selectedSection}
            onChange={e => setSelectedSection(e.target.value)}
            disabled={!selectedClass}
            className="px-3 py-2 border border-slate-300 rounded-lg
                       text-sm w-40 bg-white
                       disabled:bg-slate-100"
          >
            <option value="">Select Section</option>
            {sections.map(s => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowAssign(true)}
            disabled={!selectedSection}
            className="px-4 py-2 bg-blue-600 text-white text-sm
                       rounded-lg hover:bg-blue-500 transition
                       disabled:opacity-50"
          >
            + Assign Teacher
          </button>
        </div>
      </div>

      {/* ---------- Content ---------- */}
      {loading ? (
        <div className="bg-white rounded-xl border border-slate-200
                        shadow-sm p-6 text-sm text-slate-500">
          Loading assignments…
        </div>
      ) : (
        <TeacherAssignmentTable
          data={assignments}
          className={selectedClassName}
          sectionName={selectedSectionName}
        />
      )}

      {/* ---------- Assign Modal ---------- */}
      {showAssign && (
        <AssignTeacherModal
          sectionId={selectedSection}
          onClose={() => setShowAssign(false)}
          onSuccess={() => {
            setShowAssign(false);
            setLoading(true);
            api
              .get(`/teacher-assignments/sections/${selectedSection}`)
              .then(res => setAssignments(res.data))
              .finally(() => setLoading(false));
          }}
        />
      )}
    </div>
  );
}
