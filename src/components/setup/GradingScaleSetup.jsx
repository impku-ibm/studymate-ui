import { useEffect, useState } from "react";
import api from "../../api/axios";

const defaultCBSEEntries = [
  { gradeName: "A1", minPercentage: 91, maxPercentage: 100, gradePoint: 10, description: "Outstanding" },
  { gradeName: "A2", minPercentage: 81, maxPercentage: 90, gradePoint: 9, description: "Excellent" },
  { gradeName: "B1", minPercentage: 71, maxPercentage: 80, gradePoint: 8, description: "Very Good" },
  { gradeName: "B2", minPercentage: 61, maxPercentage: 70, gradePoint: 7, description: "Good" },
  { gradeName: "C1", minPercentage: 51, maxPercentage: 60, gradePoint: 6, description: "Above Average" },
  { gradeName: "C2", minPercentage: 41, maxPercentage: 50, gradePoint: 5, description: "Average" },
  { gradeName: "D", minPercentage: 33, maxPercentage: 40, gradePoint: 4, description: "Below Average" },
  { gradeName: "E", minPercentage: 0, maxPercentage: 32, gradePoint: 0, description: "Needs Improvement" },
];

export default function GradingScaleSetup() {
  const [scales, setScales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try { setScales((await api.get("/api/grading-scales")).data); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const createDefaultCBSE = async () => {
    setError(""); setCreating(true);
    try {
      await api.post("/api/grading-scales", {
        name: "CBSE Grading Scale",
        isDefault: true,
        entries: defaultCBSEEntries
      });
      load();
    } catch (e) {
      setError(e.response?.data?.message || "Failed to create");
    } finally { setCreating(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this grading scale?")) return;
    await api.delete(`/api/grading-scales/${id}`);
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Grading Scales</h3>
          <p className="text-sm text-slate-500">Configure grading system for your school</p>
        </div>
        <button onClick={createDefaultCBSE} disabled={creating}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-500 disabled:opacity-50"
          data-testid="grading-create-cbse">
          {creating ? "Creating..." : "+ Add CBSE Default"}
        </button>
      </div>

      {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

      {loading ? (
        <p className="text-sm text-slate-500">Loading...</p>
      ) : scales.length === 0 ? (
        <div className="bg-white rounded-xl border p-12 text-center">
          <p className="text-slate-500 text-sm">No grading scales configured. Click above to add the CBSE default.</p>
        </div>
      ) : scales.map(scale => (
        <div key={scale.id} className="bg-white rounded-xl border shadow-sm p-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h4 className="font-semibold text-slate-800">{scale.name}</h4>
              {scale.isDefault && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Default</span>}
            </div>
            <button onClick={() => handleDelete(scale.id)} className="text-red-500 text-xs hover:underline">Delete</button>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs uppercase text-slate-500">Grade</th>
                <th className="px-3 py-2 text-left text-xs uppercase text-slate-500">Min %</th>
                <th className="px-3 py-2 text-left text-xs uppercase text-slate-500">Max %</th>
                <th className="px-3 py-2 text-left text-xs uppercase text-slate-500">Points</th>
                <th className="px-3 py-2 text-left text-xs uppercase text-slate-500">Description</th>
              </tr>
            </thead>
            <tbody>
              {scale.entries?.map(e => (
                <tr key={e.id} className="border-t">
                  <td className="px-3 py-2 font-semibold">{e.gradeName}</td>
                  <td className="px-3 py-2">{e.minPercentage}%</td>
                  <td className="px-3 py-2">{e.maxPercentage}%</td>
                  <td className="px-3 py-2">{e.gradePoint}</td>
                  <td className="px-3 py-2 text-slate-600">{e.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
