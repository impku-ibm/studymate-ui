import EnterMarks from "../../components/exams/EnterMarks";
import { useEffect, useState } from "react";
import { getExams } from "../../api/examApi";

export default function TeacherMarksEntry() {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);

  useEffect(() => {
    getExams().then(res => {
      setExams(res.data.filter(e => e.status === "SCHEDULED" || e.status === "DRAFT"));
    });
  }, []);

  if (selectedExam) {
    return <EnterMarks exam={selectedExam} onBack={() => setSelectedExam(null)} />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Enter Marks</h2>
      <p className="text-sm text-slate-500">Select an exam to enter marks</p>

      <div className="grid gap-4">
        {exams.length === 0 ? (
          <div className="bg-white rounded-xl border p-8 text-center text-slate-500 text-sm">
            No exams available for marks entry
          </div>
        ) : exams.map(exam => (
          <button key={exam.id} onClick={() => setSelectedExam(exam)}
            className="bg-white rounded-xl border shadow-sm p-4 text-left hover:border-blue-300 transition"
            data-testid={`teacher-exam-${exam.id}`}>
            <h3 className="font-semibold text-slate-800">{exam.name}</h3>
            <p className="text-sm text-slate-500">{exam.examType} — {exam.startDate} to {exam.endDate}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
