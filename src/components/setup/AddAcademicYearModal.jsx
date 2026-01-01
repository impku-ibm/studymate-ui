import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function AddAcademicYearModal({ onClose, onSuccess }) {

  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    year: ""
  });

  const [loading, setLoading] = useState(false);

  // Auto-generate year & endDate when startDate changes
  useEffect(() => {
    if (!form.startDate) return;

    const start = new Date(form.startDate);
    const startYear = start.getFullYear();
    const endYear = startYear + 1;

    setForm(prev => ({
      ...prev,
      endDate: `${endYear}-03-31`,
      year: `${startYear}-${endYear}`
    }));
  }, [form.startDate]);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.startDate) {
      alert("Start date is required");
      return;
    }

    const startYear = new Date(form.startDate).getFullYear();

    setLoading(true);
    try {
      await api.post("/academic-years", { startYear });
      onSuccess();
      onClose();
    } catch (err) {
      alert(
        err?.response?.data?.message ||
        "Failed to create academic year"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[560px] rounded-xl shadow-lg">

        {/* ---------- Header ---------- */}
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-slate-900">
            Add Academic Year
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            An academic year runs from <strong>April to March</strong>.
            Only one academic year can be active at a time.
          </p>
        </div>

        {/* ---------- Guidance ---------- */}
        <div className="px-6 py-3 bg-blue-50 text-blue-700 text-sm">
          Select the <strong>start date</strong>. The system will automatically
          generate the academic year and end date.
        </div>

        {/* ---------- Form ---------- */}
        <div className="p-6 space-y-5">

          {/* Academic Year (auto-generated) */}
          <div>
            <label className="block text-xs text-slate-500 mb-1">
              Academic Year (auto-generated)
            </label>
            <input
              value={form.year}
              disabled
              placeholder="e.g. 2024-25"
              className="w-full border border-slate-300 rounded-lg px-4 py-3
                         text-sm bg-slate-100 cursor-not-allowed"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">

            {/* Start Date */}
            <div>
              <label className="block text-xs text-slate-500 mb-1">
                Start Date *
              </label>
              <input
                type="date"
                name="startDate"
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg
                           px-4 py-3 text-sm"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-xs text-slate-500 mb-1">
                End Date (auto)
              </label>
              <input
                type="date"
                value={form.endDate}
                disabled
                className="w-full border border-slate-300 rounded-lg
                           px-4 py-3 text-sm bg-slate-100 cursor-not-allowed"
              />
            </div>

          </div>
        </div>

        {/* ---------- Footer ---------- */}
        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg
                       hover:bg-blue-500 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Academic Year"}
          </button>
        </div>
      </div>
    </div>
  );
}
