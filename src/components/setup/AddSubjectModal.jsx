import { useState } from "react";
import { createPortal } from "react-dom";
import api from "../../api/axios";

export default function AddSubjectModal({ subject, onClose, onSuccess }) {
  const isEdit = !!subject;
  const [form, setForm] = useState({
    name: subject?.name || "",
    code: subject?.code || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.code) { setError("Subject name and code are required"); return; }

    setLoading(true);
    setError("");
    try {
      if (isEdit) {
        await api.put(`/subjects/${subject.id}`, form);
      } else {
        await api.post("/subjects", form);
      }
      onSuccess();
    } catch (err) {
      setError(err?.response?.data?.message || `Failed to ${isEdit ? "update" : "create"} subject`);
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md mx-4 rounded-xl shadow-2xl">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-slate-900">{isEdit ? "Edit Subject" : "Add Subject"}</h3>
          <p className="text-sm text-slate-500 mt-1">
            {isEdit ? "Update subject name or code" : "Create a new academic subject"}
          </p>
        </div>

        {error && <div className="mx-6 mt-3 text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>}

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Subject Name *</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Mathematics"
              className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Subject Code *</label>
            <input name="code" value={form.code} onChange={handleChange} placeholder="e.g. MATH"
              className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm uppercase focus:ring-2 focus:ring-blue-500 outline-none" />
            <p className="mt-1 text-xs text-slate-400">Short identifier used in reports</p>
          </div>
        </div>

        <div className="px-6 py-4 border-t bg-slate-50 rounded-b-xl flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-100">Cancel</button>
          <button onClick={handleSubmit} disabled={loading || !form.name || !form.code}
            className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50">
            {loading ? "Saving..." : isEdit ? "Update Subject" : "Create Subject"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
