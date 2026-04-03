import { useEffect, useState } from "react";
import { getResults } from "../../api/examApi";

const resultColors = {
  PASS: "bg-emerald-100 text-emerald-700",
  FAIL: "bg-red-100 text-red-700",
};

export default function ViewResults({ exam, onBack }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getResults(exam.id)
      .then(res => setResults(res.data))
      .finally(() => setLoading(false));
  }, [exam.id]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-blue-600 text-sm hover:underline">← Back</button>
        <h3 className="text-lg font-semibold">{exam.name} — Results</h3>
      </div>

      <div className="bg-white rounded-xl border shadow-sm">
        <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Rank</th>
                <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Student</th>
                <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Adm No</th>
                <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Marks</th>
                <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Max</th>
                <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">%</th>
                <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Grade</th>
                <th className="px-4 py-3 text-left text-xs uppercase text-slate-500">Result</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="8" className="px-4 py-6 text-center text-slate-500">Loading results...</td></tr>
              ) : results.length === 0 ? (
                <tr><td colSpan="8" className="px-4 py-6 text-center text-slate-500">No results published yet</td></tr>
              ) : results.map(r => (
                <tr key={r.studentId} className="border-b hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-blue-600">#{r.rankInClass}</td>
                  <td className="px-4 py-3 font-medium">{r.studentName}</td>
                  <td className="px-4 py-3 text-slate-600">{r.admissionNumber}</td>
                  <td className="px-4 py-3">{r.totalMarks}</td>
                  <td className="px-4 py-3 text-slate-500">{r.maxPossibleMarks}</td>
                  <td className="px-4 py-3 font-medium">{r.percentage}%</td>
                  <td className="px-4 py-3 font-semibold">{r.grade}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${resultColors[r.resultStatus] || ""}`}>
                      {r.resultStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
