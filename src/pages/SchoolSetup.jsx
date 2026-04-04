import { useState } from "react";
import AcademicYearSetup from "../components/setup/AcademicYearSetup";
import ClassSetup from "../components/setup/ClassSetup";
import SectionSetup from "../components/setup/SectionSetup";
import SubjectSetup from "../components/setup/SubjectSetup";
import ClassSubjectSetup from "../components/setup/ClassSubjectSetup";
import GradingScaleSetup from "../components/setup/GradingScaleSetup";

const tabs = [
  { key: "year", label: "Academic Year" },
  { key: "class", label: "Classes" },
  { key: "section", label: "Sections" },
  { key: "subject", label: "Subjects" },
  { key: "classSubject", label: "Class Subjects" },
  { key: "grading", label: "Grading Scale" },
];

export default function SchoolSetup() {
  const [activeTab, setActiveTab] = useState("year");

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-900">School Setup</h2>
        <p className="text-sm text-gray-500 mt-0.5">Configure academic structure, classes, and subjects</p>
      </div>

      <div className="mb-5 overflow-x-auto">
        <div className="inline-flex bg-gray-100 rounded-lg p-1 gap-0.5">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className={`px-3.5 py-1.5 text-[13px] font-medium rounded-md transition whitespace-nowrap ${
                activeTab === t.key
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "year" && <AcademicYearSetup />}
      {activeTab === "class" && <ClassSetup />}
      {activeTab === "section" && <SectionSetup />}
      {activeTab === "subject" && <SubjectSetup />}
      {activeTab === "classSubject" && <ClassSubjectSetup />}
      {activeTab === "grading" && <GradingScaleSetup />}
    </div>
  );
}
