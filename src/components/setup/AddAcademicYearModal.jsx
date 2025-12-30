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

    const endDate = `${endYear}-03-31`;
    const year = `${startYear}-${endYear}`;

    setForm(prev => ({
      ...prev,
      endDate,
      year
    }));
  }, [form.startDate]);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.startDate) {
      alert("Start Date is required");
      return;
    }

    const startYear = new Date(form.startDate).getFullYear();

    setLoading(true);
    try {
      await api.post("/academic-years", {
        startYear
      });

      onSuccess(); // refresh list
      onClose();   // close modal
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
      <div className="bg-white w-[520px] rounded-xl shadow-lg">

        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Add Academic Year</h3>
          <p className="text-sm text-gray-500 mt-1">
            Academic year runs from April to March. Only one year can be active at a time.
          </p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">

          {/* Academic Year (auto) */}
          <input
            value={form.year}
            disabled
            placeholder="Academic Year (e.g. 2024-25)"
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3
                       text-sm bg-gray-50 cursor-not-allowed"
          />

          <div className="flex gap-4">
            {/* Start Date */}
            <div className="w-1/2">
              <label className="block text-xs text-gray-500 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-sm"
              />
            </div>

            {/* End Date */}
            <div className="w-1/2">
              <label className="block text-xs text-gray-500 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={form.endDate}
                disabled
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3
                           text-sm bg-gray-50 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg
                       disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Academic Year"}
          </button>
        </div>
      </div>
    </div>
  );
}
