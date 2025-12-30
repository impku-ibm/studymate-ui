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

      onSuccess();   // reload class list
      onClose();     // close modal
    } catch (err) {
      alert("Failed to create class");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[520px] rounded-lg shadow-lg">

        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Add Class</h3>
          <p className="text-sm text-gray-500 mt-1">
            Classes are school-level masters (e.g. Class 1 to Class 12).
          </p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          <input
            name="name"
            placeholder="Class Name (e.g. Class 10)"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-sm"
          />

          <input
            name="code"
            placeholder="Class Code (e.g. 10)"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-sm"
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
            className="px-5 py-2 text-sm bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Class"}
          </button>
        </div>
      </div>
    </div>
  );
}
