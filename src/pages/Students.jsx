import { useState } from "react";
import StudentDirectory from "../components/students/StudentDirectory";
import StudentEnrollment from "../components/students/StudentEnrollment";

const tabs = [
  { key: "directory", label: "Student Directory" },
  { key: "enrollment", label: "Class Enrollment" },
];

export default function Students() {
  const [activeTab, setActiveTab] = useState("directory");

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Students</h2>
      </div>

      {/* Tabs */}
      <div className="border-b mb-4 flex gap-6">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 text-sm ${
              activeTab === tab.key
                ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "directory" && <StudentDirectory />}
      {activeTab === "enrollment" && <StudentEnrollment />}
    </div>
  );
}
