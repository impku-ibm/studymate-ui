import { useState } from "react";
import MarkStudentAttendance from "../components/attendance/MarkStudentAttendance";
import AttendanceSummary from "../components/attendance/AttendanceSummary";
import AttendanceHistory from "../components/attendance/AttendanceHistory";
import TeacherSelfAttendance from "../components/attendance/TeacherSelfAttendance";

const tabs = [
  { key: "mark", label: "Mark Attendance" },
  { key: "summary", label: "Summary" },
  { key: "history", label: "History" },
  { key: "teacher", label: "Teacher Attendance" },
];

export default function Attendance() {
  const [activeTab, setActiveTab] = useState("mark");

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Attendance</h2>
        <p className="text-sm text-gray-500">
          Mark and track student and teacher attendance
        </p>
      </div>

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
            data-testid={`attendance-tab-${tab.key}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "mark" && <MarkStudentAttendance />}
      {activeTab === "summary" && <AttendanceSummary />}
      {activeTab === "history" && <AttendanceHistory />}
      {activeTab === "teacher" && <TeacherSelfAttendance />}
    </div>
  );
}
