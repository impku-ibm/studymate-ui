import MarkStudentAttendance from "../../components/attendance/MarkStudentAttendance";

export default function TeacherAttendancePage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Class Attendance</h2>
        <p className="text-sm text-slate-500">Mark daily attendance for your class</p>
      </div>
      <MarkStudentAttendance />
    </div>
  );
}
