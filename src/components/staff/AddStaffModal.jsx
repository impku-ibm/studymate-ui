import { useState } from "react";
import { createStaff } from "../../api/staffApi";

const staffTypes = ["CLERK", "ACCOUNTANT", "LIBRARIAN", "PEON", "SECURITY", "OTHER"];

export default function AddStaffModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", staffType: "CLERK" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      await createStaff(form);
      onSuccess();
    } catch (e) {
      setError(e.response?.data?.message || "Failed to create staff");
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4">Add Staff Member</h3>
        {error && <div className="mb-3 text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

        <input placeholder="Full Name" value={form.fullName}
          onChange={e => setForm({...form, fullName: e.target.value})}
          className="w-full mb-3 p-2 border rounded text-sm" data-testid="staff-name-input" />
        <input placeholder="Email (optional)" value={form.email}
          onChange={e => setForm({...form, email: e.target.value})}
          className="w-full mb-3 p-2 border rounded text-sm" data-testid="staff-email-input" />
        <input placeholder="Phone (optional)" value={form.phone}
          onChange={e => setForm({...form, phone: e.target.value})}
          className="w-full mb-3 p-2 border rounded text-sm" data-testid="staff-phone-input" />
        <select value={form.staffType} onChange={e => setForm({...form, staffType: e.target.value})}
          className="w-full mb-4 p-2 border rounded text-sm" data-testid="staff-type-select">
          {staffTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm text-slate-600 border rounded-lg">Cancel</button>
          <button onClick={handleSubmit} disabled={loading || !form.fullName}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg disabled:opacity-50"
            data-testid="staff-submit">
            {loading ? "Creating..." : "Add Staff"}
          </button>
        </div>
      </div>
    </div>
  );
}
