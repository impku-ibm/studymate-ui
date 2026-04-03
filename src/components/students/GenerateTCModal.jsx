import { useState } from "react";
import api from "../../api/axios";

export default function GenerateTCModal({ student, onClose, onSuccess }) {
  const [form, setForm] = useState({
    leavingDate: new Date().toISOString().split("T")[0],
    reasonForLeaving: "", conduct: "GOOD", remarks: ""
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setError(""); setLoading(true);
    try {
      const res = await api.post(`/students/${student.id}/transfer-certificate`, form);
      setResult(res.data);
    } catch (e) {
      setError(e.response?.data?.message || "Failed to generate TC");
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4">Generate Transfer Certificate</h3>
        <p className="text-sm text-slate-600 mb-4">Student: {student.fullName} ({student.admissionNumber})</p>

        {error && <div className="mb-3 text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

        {result ? (
          <div className="space-y-3">
            <div className="bg-emerald-50 p-4 rounded-lg">
              <p className="text-emerald-700 font-medium">TC Generated</p>
              <p className="text-sm">TC Number: {result.tcNumber}</p>
              <p className="text-sm">Student status updated to TRANSFERRED</p>
            </div>
            <button onClick={onSuccess} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Done</button>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-4">
              <div>
                <label className="text-xs text-slate-500">Leaving Date</label>
                <input type="date" value={form.leavingDate}
                  onChange={e => setForm({...form, leavingDate: e.target.value})}
                  className="block w-full p-2 border rounded text-sm" data-testid="tc-leaving-date" />
              </div>
              <div>
                <label className="text-xs text-slate-500">Reason for Leaving</label>
                <input value={form.reasonForLeaving}
                  onChange={e => setForm({...form, reasonForLeaving: e.target.value})}
                  placeholder="e.g. Family relocation"
                  className="block w-full p-2 border rounded text-sm" data-testid="tc-reason" />
              </div>
              <div>
                <label className="text-xs text-slate-500">Conduct</label>
                <select value={form.conduct} onChange={e => setForm({...form, conduct: e.target.value})}
                  className="block w-full p-2 border rounded text-sm">
                  <option value="EXCELLENT">Excellent</option>
                  <option value="GOOD">Good</option>
                  <option value="SATISFACTORY">Satisfactory</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500">Remarks (optional)</label>
                <textarea value={form.remarks} onChange={e => setForm({...form, remarks: e.target.value})}
                  className="block w-full p-2 border rounded text-sm" rows="2" />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={onClose} className="px-4 py-2 text-sm text-slate-600 border rounded-lg">Cancel</button>
              <button onClick={handleGenerate} disabled={loading}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg disabled:opacity-50"
                data-testid="tc-submit">
                {loading ? "Generating..." : "Generate TC"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
