import { useEffect, useState } from "react";
import { getExams } from "../../api/examApi";

export default function StudentResultsPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExams()
      .then(res => {
        const published = res.data.filter(e => e.status === "PUBLISHED");
        setExams(published);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Results</h2>

      {loading ? (
        <p className="text-sm text-slate-500">Loading...</p>
      ) : exams.length === 0 ? (
        <div className="bg-white rounded-xl border p-12 text-center">
          <p className="text-slate-500 text-sm">No published results yet</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {exams.map(exam => (
            <div key={exam.id} className="bg-white rounded-xl border shadow-sm p-5">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-slate-800">{exam.name}</h3>
                  <p className="text-sm text-slate-500">{exam.examType} — {exam.startDate} to {exam.endDate}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                  PUBLISHED
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
