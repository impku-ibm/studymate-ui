import { useState } from "react";
import PeriodSetup from "../components/timetable/PeriodSetup";
import TimetableGrid from "../components/timetable/TimetableGrid";
import TeacherTimetable from "../components/timetable/TeacherTimetable";

const tabs = [
  { key: "periods", label: "Period Setup" },
  { key: "class", label: "Class Timetable" },
  { key: "teacher", label: "Teacher Timetable" },
];

export default function Timetable() {
  const [activeTab, setActiveTab] = useState("periods");

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Timetable</h2>
        <p className="text-sm text-gray-500">Define periods and manage class/teacher timetables</p>
      </div>

      <div className="border-b mb-4 flex gap-6">
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`pb-3 text-sm ${activeTab === tab.key
              ? "border-b-2 border-blue-600 text-blue-600 font-medium" : "text-gray-500"}`}
            data-testid={`timetable-tab-${tab.key}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "periods" && <PeriodSetup />}
      {activeTab === "class" && <TimetableGrid />}
      {activeTab === "teacher" && <TeacherTimetable />}
    </div>
  );
}
