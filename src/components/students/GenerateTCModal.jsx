import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import api from "../../api/axios";
import { WarningIcon } from "../common/Icons";

export default function GenerateTCModal({ student, onClose, onSuccess }) {
  const [form, setForm] = useState({
    leavingDate: new Date().toISOString().split("T")[0],
    reasonForLeaving: "", conduct: "GOOD", remarks: ""
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [pendingFees, setPendingFees] = useState([]);
  const [feesLoading, setFeesLoading] = useState(true);

  // Check pending dues
  useEffect(() => {
    api.get(`/api/v1/accounts/student-fees/student/${student.id}`)
      .then(res => {
        const fees = Array.isArray(res.data) ? res.data : res.data?.content || [];
        setPendingFees(fees.filter(f => f.status !== "PAID"));
      })
      .catch(() => {})
      .finally(() => setFeesLoading(false));
  }, [student.id]);

  const totalDues = pendingFees.reduce((sum, f) => sum + (f.pendingAmount || f.amount || 0), 0);

  const handleGenerate = async () => {
    setError(""); setLoading(true);
    try {
      const res = await api.post(`/students/${student.id}/transfer-certificate`, form);
      setResult(res.data);
    } catch (e) {
      setError(e.response?.data?.message || "Failed to generate TC");
    } finally { setLoading(false); }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md mx-4 rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">

        <div className="px-6 py-4 border-b sticky top-0 bg-white rounded-t-xl">
          <h3 className="text-lg font-semibold text-slate-900">Transfer Certificate</h3>
          <p className="text-sm text-slate-500">{student.fullName} — {student.admissionNumber}</p>
        </div>

        {error && <div className="mx-6 mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>}

        {/* Pending Dues Warning */}
        {!feesLoading && totalDues > 0 && !result && (
          <div className="mx-6 mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm font-medium text-amber-800 flex items-center gap-1.5"><WarningIcon className="w-4 h-4" /> Pending Dues: ₹{totalDues.toLocaleString()}</p>
            <p className="text-xs text-amber-600 mt-1">{pendingFees.length} unpaid fee(s). Clear dues before issuing TC or proceed with admin override.</p>
          </div>
        )}

        {result ? (
          <div className="p-6 space-y-3">
            <div className="bg-emerald-50 p-4 rounded-lg">
              <p className="text-emerald-700 font-medium">TC Generated Successfully</p>
              <p className="text-sm mt-1">TC Number: <span className="font-mono font-bold">{result.tcNumber}</span></p>
              <p className="text-sm">Student status updated to TRANSFERRED</p>
            </div>
            <button onClick={onSuccess} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Done</button>
          </div>
        ) : (
          <>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Leaving Date *</label>
                <input type="date" value={form.leavingDate}
                  onChange={e => setForm({...form, leavingDate: e.target.value})}
                  className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Reason for Leaving</label>
                <input value={form.reasonForLeaving}
                  onChange={e => setForm({...form, reasonForLeaving: e.target.value})}
                  placeholder="e.g. Family relocation"
                  className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Conduct</label>
                <select value={form.conduct} onChange={e => setForm({...form, conduct: e.target.value})}
                  className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm">
                  <option value="EXCELLENT">Excellent</option>
                  <option value="GOOD">Good</option>
                  <option value="SATISFACTORY">Satisfactory</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Remarks</label>
                <textarea value={form.remarks} onChange={e => setForm({...form, remarks: e.target.value})}
                  className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm resize-none" rows={2} />
              </div>
            </div>

            <div className="px-6 py-4 border-t bg-slate-50 rounded-b-xl flex justify-end gap-3">
              <button onClick={onClose} className="px-4 py-2 text-sm text-slate-600 border border-slate-300 rounded-lg">Cancel</button>
              <button onClick={handleGenerate} disabled={loading}
                className="px-5 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-500 disabled:opacity-50">
                {loading ? "Generating..." : totalDues > 0 ? "Generate TC (Override Dues)" : "Generate TC"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
