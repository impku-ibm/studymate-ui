import { useState } from "react";
import TeacherDirectory from "../components/teachers/TeacherDirectory";
import TeacherAssignments from "../components/teachers/TeacherAssignments";

const tabs = [
  { key: "directory", label: "Teacher Directory" },
  { key: "assignments", label: "Teaching Assignments" },
  { key: "attendance", label: "Attendance", disabled: true },
  { key: "timetable", label: "Timetable", disabled: true },
  { key: "workload", label: "Workload", disabled: true },
];

export default function Teachers() {
  const [activeTab, setActiveTab] = useState("directory");

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Teachers</h2>
        <p className="text-sm text-gray-500">
          Manage teacher profiles and subject assignments
        </p>
      </div>

      {/* Sub Navigation (FIGMA MATCH) */}
      <div className="border-b mb-6 flex gap-6">
        {tabs.map(tab => (
          <button
            key={tab.key}
            disabled={tab.disabled}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 text-sm ${
              activeTab === tab.key
                ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                : "text-gray-500"
            } ${tab.disabled ? "cursor-not-allowed opacity-50" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "directory" && <TeacherDirectory />}
      {activeTab === "assignments" && <TeacherAssignments />}
    </div>
  );
}
