import { useState } from "react";
import ExamList from "../components/exams/ExamList";
import ExamSchedule from "../components/exams/ExamSchedule";
import EnterMarks from "../components/exams/EnterMarks";
import ViewResults from "../components/exams/ViewResults";

export default function Exams() {
  const [view, setView] = useState("list");
  const [selectedExam, setSelectedExam] = useState(null);

  const handleSelectExam = (exam, action) => {
    setSelectedExam(exam);
    setView(action);
  };

  const handleBack = () => {
    setView("list");
    setSelectedExam(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Exams</h2>
        <p className="text-sm text-gray-500">
          Manage exams, schedule subjects, enter marks, and publish results
        </p>
      </div>

      {view === "list" && <ExamList onSelectExam={handleSelectExam} />}
      {view === "schedule" && selectedExam && <ExamSchedule exam={selectedExam} onBack={handleBack} />}
      {view === "marks" && selectedExam && <EnterMarks exam={selectedExam} onBack={handleBack} />}
      {view === "results" && selectedExam && <ViewResults exam={selectedExam} onBack={handleBack} />}
    </div>
  );
}
