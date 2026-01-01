import { useState } from "react";
import AcademicYearSetup from "../components/setup/AcademicYearSetup";
import ClassSetup from "../components/setup/ClassSetup";
import SectionSetup from "../components/setup/SectionSetup";
import SubjectSetup from "../components/setup/SubjectSetup";

const tabs = [
  { key: "year", label: "Academic Year" },
  { key: "class", label: "Classes" },
  { key: "section", label: "Sections" },
  { key: "subject", label: "Subjects" },
];

export default function SchoolSetup() {
  const [activeTab, setActiveTab] = useState("year");

  return (
    <div>
      <div className="mb-6">
  <h2 className="text-3xl font-bold text-slate-900">
    School Setup
  </h2>
  <p className="text-sm text-slate-500 mt-1">
    Configure academic structure, classes, subjects and staff
  </p>
</div>

      <div className="border-b flex gap-6 mb-6">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`pb-3 text-sm ${
              activeTab === t.key
                ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                : "text-gray-500"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "year" && <AcademicYearSetup />}
      {activeTab === "class" && <ClassSetup />}
      {activeTab === "section" && <SectionSetup />}
      {activeTab === "subject" && <SubjectSetup />}
    </div>
  );
}
