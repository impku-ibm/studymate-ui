import { useState } from "react";
import { createPortal } from "react-dom";
import api from "../../api/axios";

export default function AddStudentModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    fullName: "", dateOfBirth: "", admissionDate: "",
    parentName: "", parentMobile: "", address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      await api.post("/students", form);
      onSuccess();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to add student");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg mx-4 rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">

        <div className="px-6 py-4 border-b sticky top-0 bg-white rounded-t-xl">
          <h3 className="text-lg font-semibold text-slate-900">New Student Admission</h3>
          <p className="text-sm text-slate-500 mt-1">Fill in the student details below</p>
        </div>

        {error && <div className="mx-6 mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>}

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Student Name *</label>
            <input name="fullName" value={form.fullName} onChange={handleChange}
              placeholder="Enter full name" className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
              <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange}
                className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Admission Date *</label>
              <input type="date" name="admissionDate" value={form.admissionDate} onChange={handleChange}
                className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Parent / Guardian Name *</label>
            <input name="parentName" value={form.parentName} onChange={handleChange}
              placeholder="Enter parent name" className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Parent Mobile *</label>
            <input name="parentMobile" value={form.parentMobile} onChange={handleChange}
              placeholder="10-digit mobile number" className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Address *</label>
            <textarea name="address" value={form.address} onChange={handleChange} rows={2}
              placeholder="Enter full address" className="w-full border border-slate-300 px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
          </div>
        </div>

        <div className="px-6 py-4 border-t bg-slate-50 rounded-b-xl flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-100">Cancel</button>
          <button onClick={handleSubmit} disabled={loading || !form.fullName || !form.admissionDate || !form.parentName || !form.parentMobile}
            className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="add-student-submit">
            {loading ? "Adding..." : "Add Student"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
