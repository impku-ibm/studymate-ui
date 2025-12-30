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
      onSuccess();   // reload subject list
      onClose();     // close modal
    } catch (err) {
      alert("Failed to create subject");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[520px] rounded-lg shadow-lg">

        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Add Subject</h3>
          <p className="text-sm text-gray-500 mt-1">
            Subjects are school-level masters (e.g. Mathematics, Physics).
          </p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          <input
            name="name"
            placeholder="Subject Name (e.g. Mathematics)"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-sm"
          />

          <input
            name="code"
            placeholder="Subject Code (e.g. MATH)"
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
            {loading ? "Creating..." : "Create Subject"}
          </button>
        </div>
      </div>
    </div>
  );
}
