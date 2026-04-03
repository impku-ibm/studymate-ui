import { useEffect, useState } from "react";
import { getExams, publishResults } from "../../api/examApi";
import CreateExamModal from "./CreateExamModal";

const statusColors = {
  DRAFT: "bg-slate-200 text-slate-700",
  SCHEDULED: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-amber-100 text-amber-700",
  PUBLISHED: "bg-emerald-100 text-emerald-700",
};

export default function ExamList({ onSelectExam }) {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getExams();
      setExams(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handlePublish = async (examId) => {
    if (!confirm("Publish results? They will be visible to students.")) return;
    await publishResults(examId);
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Exams</h3>
          <p className="text-sm text-slate-500">Manage examinations</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-500 transition"
          data-testid="exam-create-btn"
        >+ Create Exam</button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[calc(100vh-335px)]">
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase text-slate-500">Name</th>
                <th className="px-6 py-3 text-left text-xs uppercase text-slate-500">Type</th>
                <th className="px-6 py-3 text-left text-xs uppercase text-slate-500">Dates</th>
                <th className="px-6 py-3 text-left text-xs uppercase text-slate-500">Status</th>
                <th className="px-6 py-3 text-right text-xs uppercase text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="px-6 py-10 text-center text-slate-500">Loading...</td></tr>
              ) : exams.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-10 text-center text-slate-500">No exams created yet</td></tr>
              ) : exams.map(e => (
                <tr key={e.id} className="border-b last:border-none hover:bg-slate-50 transition">
                  <td className="px-6 py-3 font-medium text-slate-800">{e.name}</td>
                  <td className="px-6 py-3 text-slate-600">{e.examType}</td>
                  <td className="px-6 py-3 text-slate-600">{e.startDate} — {e.endDate}</td>
                  <td className="px-6 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[e.status] || ""}`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right space-x-2">
                    <button onClick={() => onSelectExam(e, "schedule")}
                      className="text-blue-600 hover:underline text-xs" data-testid={`exam-schedule-${e.id}`}>Schedule</button>
                    <button onClick={() => onSelectExam(e, "marks")}
                      className="text-blue-600 hover:underline text-xs" data-testid={`exam-marks-${e.id}`}>Marks</button>
                    {e.status !== "PUBLISHED" && (
                      <button onClick={() => handlePublish(e.id)}
                        className="text-emerald-600 hover:underline text-xs" data-testid={`exam-publish-${e.id}`}>Publish</button>
                    )}
                    {e.status === "PUBLISHED" && (
                      <button onClick={() => onSelectExam(e, "results")}
                        className="text-purple-600 hover:underline text-xs" data-testid={`exam-results-${e.id}`}>Results</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showCreate && <CreateExamModal onClose={() => setShowCreate(false)} onSuccess={() => { setShowCreate(false); load(); }} />}
    </div>
  );
}
