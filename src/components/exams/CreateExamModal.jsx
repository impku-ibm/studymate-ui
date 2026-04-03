import { useState, useContext } from "react";
import { createExam } from "../../api/examApi";
import { AcademicYearContext } from "../../context/AcademicYearContext";

const examTypes = [
  "FA1", "FA2", "SA1", "SA2", "UNIT_TEST_1", "UNIT_TEST_2",
  "MID_TERM", "FINAL", "PRACTICAL", "INTERNAL"
];

export default function CreateExamModal({ onClose, onSuccess }) {
  const { academicYearId } = useContext(AcademicYearContext);
  const [form, setForm] = useState({
    examType: "FA1", name: "", startDate: "", endDate: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      await createExam({ ...form, academicYearId });
      onSuccess();
    } catch (e) {
      setError(e.response?.data?.message || "Failed to create exam");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4">Create Exam</h3>

        {error && <div className="mb-3 text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

        <select value={form.examType} onChange={e => setForm({...form, examType: e.target.value})}
          className="w-full mb-3 p-2 border rounded text-sm" data-testid="exam-type-select">
          {examTypes.map(t => <option key={t} value={t}>{t.replace(/_/g, " ")}</option>)}
        </select>

        <input placeholder="Exam Name (e.g. SA1 Examination 2025)" value={form.name}
          onChange={e => setForm({...form, name: e.target.value})}
          className="w-full mb-3 p-2 border rounded text-sm" data-testid="exam-name-input" />

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="text-xs text-slate-500">Start Date</label>
            <input type="date" value={form.startDate}
              onChange={e => setForm({...form, startDate: e.target.value})}
              className="w-full p-2 border rounded text-sm" data-testid="exam-start-date" />
          </div>
          <div>
            <label className="text-xs text-slate-500">End Date</label>
            <input type="date" value={form.endDate}
              onChange={e => setForm({...form, endDate: e.target.value})}
              className="w-full p-2 border rounded text-sm" data-testid="exam-end-date" />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm text-slate-600 border rounded-lg">Cancel</button>
          <button onClick={handleSubmit} disabled={loading || !form.name || !form.startDate || !form.endDate}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg disabled:opacity-50"
            data-testid="exam-create-submit">
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
