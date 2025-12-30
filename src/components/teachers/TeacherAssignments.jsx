import { useState } from "react";
import TeacherAssignmentTable from "./TeacherAssignmentTable";
import AssignTeacherModal from "./AssignTeacherModal";

export default function TeacherAssignments() {
  const [showAssign, setShowAssign] = useState(false);

  return (
    <>
      {/* Filter Bar (FIGMA MATCH) */}
      <div className="bg-white rounded-lg shadow border p-4 mb-6 flex flex-wrap gap-4">
        
        <select className="p-2 border rounded text-sm">
          <option>Academic Year</option>
          <option>2024-25</option>
        </select>

        <select className="p-2 border rounded text-sm">
          <option>Class</option>
          <option>Class 10</option>
          <option>Class 9</option>
        </select>

        <select className="p-2 border rounded text-sm">
          <option>Section</option>
          <option>A</option>
          <option>B</option>
        </select>

        <div className="ml-auto">
          <button
            onClick={() => setShowAssign(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded shadow"
          >
            + Assign Teacher
          </button>
        </div>
      </div>

      {/* Table */}
      <TeacherAssignmentTable />

      {showAssign && (
        <AssignTeacherModal onClose={() => setShowAssign(false)} />
      )}
    </>
  );
}
