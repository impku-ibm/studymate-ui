import { useState } from "react";
import api from "../../api/axios";

export default function AddSectionModal({ classId, onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("Section name is required");
      return;
    }

    setLoading(true);
    try {
      await api.post(`/classes/${classId}/sections`, {
        name: name.trim()
      });

      onSuccess();
      onClose();
    } catch (e) {
      alert(
        e?.response?.data?.message ||
        "Failed to create section"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[520px] rounded-xl shadow-lg">

        {/* ---------- Header ---------- */}
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-slate-900">
            Add Section
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Sections are subdivisions within a class
            (for example: <strong>Class 10 → Section A</strong>).
          </p>
        </div>

        {/* ---------- Guidance ---------- */}
        <div className="px-6 py-3 bg-blue-50 text-blue-700 text-sm">
          Enter a short section name. Usually single letters like
          <strong> A, B, C</strong>.
        </div>

        {/* ---------- Form ---------- */}
        <div className="p-6 space-y-5">

          <div>
            <label className="block text-xs text-slate-500 mb-1">
              Section Name *
            </label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. A"
              className="w-full border border-slate-300 rounded-lg
                         px-4 py-3 text-sm"
            />
            <p className="mt-1 text-xs text-slate-400">
              This name will be used while assigning students and teachers
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
            {loading ? "Creating..." : "Create Section"}
          </button>
        </div>
      </div>
    </div>
  );
}
