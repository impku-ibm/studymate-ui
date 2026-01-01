import { useState } from "react";
import api from "../../api/axios";

export default function AddClassModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    code: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.code) {
      alert("Class name and code are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/classes", {
        name: form.name,
        code: form.code,
      });

      onSuccess();
      onClose();
    } catch (err) {
      alert(
        err?.response?.data?.message ||
        "Failed to create class"
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
            Add Class
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Classes define the academic levels in your school
            (for example: Class 1 to Class 12).
          </p>
        </div>

        {/* ---------- Guidance ---------- */}
        <div className="px-6 py-3 bg-blue-50 text-blue-700 text-sm">
          Enter the class name and a short code used internally by the system.
        </div>

        {/* ---------- Form ---------- */}
        <div className="p-6 space-y-5">

          {/* Class Name */}
          <div>
            <label className="block text-xs text-slate-500 mb-1">
              Class Name *
            </label>
            <input
              name="name"
              placeholder="e.g. Class 10"
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg
                         px-4 py-3 text-sm"
            />
          </div>

          {/* Class Code */}
          <div>
            <label className="block text-xs text-slate-500 mb-1">
              Class Code *
            </label>
            <input
              name="code"
              placeholder="e.g. 10"
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg
                         px-4 py-3 text-sm"
            />
            <p className="mt-1 text-xs text-slate-400">
              Short identifier used for internal references
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
            {loading ? "Creating..." : "Create Class"}
          </button>
        </div>
      </div>
    </div>
  );
}
