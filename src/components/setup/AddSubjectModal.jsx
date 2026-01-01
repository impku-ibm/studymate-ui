import { useState } from "react";
import api from "../../api/axios";

export default function AddSubjectModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    code: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.code) {
      alert("Subject name and code are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/subjects", form);
      onSuccess();
      onClose();
    } catch (err) {
      alert(
        err?.response?.data?.message ||
        "Failed to create subject"
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
            Add Subject
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Subjects are academic disciplines taught in your school
            (for example: Mathematics, Physics, Chemistry).
          </p>
        </div>

        {/* ---------- Guidance ---------- */}
        <div className="px-6 py-3 bg-blue-50 text-blue-700 text-sm">
          Subjects are created once and can be assigned to classes,
          sections, and teachers later.
        </div>

        {/* ---------- Form ---------- */}
        <div className="p-6 space-y-5">

          {/* Subject Name */}
          <div>
            <label className="block text-xs text-slate-500 mb-1">
              Subject Name *
            </label>
            <input
              name="name"
              placeholder="e.g. Mathematics"
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg
                         px-4 py-3 text-sm"
            />
          </div>

          {/* Subject Code */}
          <div>
            <label className="block text-xs text-slate-500 mb-1">
              Subject Code *
            </label>
            <input
              name="code"
              placeholder="e.g. MATH"
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg
                         px-4 py-3 text-sm uppercase"
            />
            <p className="mt-1 text-xs text-slate-400">
              Short identifier used in reports and internal references
            </p>
          </div>

        </div>

        {/* ---------- Footer ---------- */}
        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-600
                       hover:text-slate-800"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 text-sm bg-blue-600 text-white
                       rounded-lg hover:bg-blue-500 transition
                       disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Subject"}
          </button>
        </div>
      </div>
    </div>
  );
}
