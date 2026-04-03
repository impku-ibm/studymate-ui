import TeacherTimetable from "../../components/timetable/TeacherTimetable";

export default function TeacherTimetablePage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">My Timetable</h2>
        <p className="text-sm text-slate-500">Your weekly teaching schedule</p>
      </div>
      <TeacherTimetable />
    </div>
  );
}
