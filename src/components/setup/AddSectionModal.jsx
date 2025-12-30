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
        name
      });
      onSuccess();
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
      <div className="bg-white w-[420px] rounded-xl shadow-lg">

        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Add Section</h3>
          <p className="text-sm text-gray-500 mt-1">
            Sections are created under a specific class
            (e.g. Class 10 → Section A).
          </p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Section Name (e.g. A)"
            className="w-full border-2 rounded-lg px-4 py-3 text-sm"
          />
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
            {loading ? "Creating..." : "Create Section"}
          </button>
        </div>
      </div>
    </div>
  );
}

