import { useState } from "react";
import TeacherDirectory from "../components/teachers/TeacherDirectory";
import TeacherAssignments from "../components/teachers/TeacherAssignments";

const tabs = [
  { key: "directory", label: "Teacher Directory" },
  { key: "assignments", label: "Teaching Assignments" },
];

export default function Teachers() {
  const [activeTab, setActiveTab] = useState("directory");

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-900">Teachers</h2>
        <p className="text-sm text-gray-500 mt-0.5">Manage teacher profiles and subject assignments</p>
      </div>

      <div className="mb-5">
        <div className="inline-flex bg-gray-100 rounded-lg p-1 gap-0.5">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-1.5 text-[13px] font-medium rounded-md transition ${
                activeTab === tab.key
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "directory" && <TeacherDirectory />}
      {activeTab === "assignments" && <TeacherAssignments />}
    </div>
  );
}
