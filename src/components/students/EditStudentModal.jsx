import { useState } from "react";
import { createPortal } from "react-dom";
import api from "../../api/axios";

export default function EditStudentModal({ student, onClose, onSuccess }) {
  const [form, setForm] = useState({
    fullName: student.fullName || "",
    dateOfBirth: student.dateOfBirth || "",
    parentName: student.parentName || "",
    parentMobile: student.parentMobile || "",
    address: student.address || "",
    status: student.status || "ACTIVE",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      await api.put(`/students/${student.id}`, form);
      onSuccess();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update student");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg mx-4 rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">

        <div className="px-6 py-4 border-b sticky top-0 bg-white rounded-t-xl">
          <h3 className="text-lg font-semibold text-slate-900">Edit Student</h3>
          <p className="text-sm text-slate-500">{student.admissionNumber}</p>
        </div>

        {error && <div className="mx-6 mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>}

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input name="fullName" value={form.fullName} onChange={handleChange}
              className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
            <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange}
              className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Parent Name</label>
            <input name="parentName" value={form.parentName} onChange={handleChange}
              className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Parent Mobile</label>
            <input name="parentMobile" value={form.parentMobile} onChange={handleChange}
              className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
            <textarea name="address" value={form.address} onChange={handleChange} rows={2}
              className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select name="status" value={form.status} onChange={handleChange}
              className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="ACTIVE">Active</option>
              <option value="LEFT">Left</option>
              <option value="TRANSFERRED">Transferred</option>
            </select>
          </div>
        </div>

        <div className="px-6 py-4 border-t bg-slate-50 rounded-b-xl flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-100">Cancel</button>
          <button onClick={handleSubmit} disabled={loading}
            className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50">
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
