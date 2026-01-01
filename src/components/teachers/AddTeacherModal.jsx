import { useState } from "react";
import api from "../../api/axios";

export default function AddTeacherModal({ onClose, onSuccess, teacher }) {

  // 🔹 Form state (Add + Edit support)
  const [form, setForm] = useState({
    fullName: teacher?.fullName || "",
    email: teacher?.email || "",
    mobileNumber: teacher?.mobileNumber || "",
    qualification: teacher?.qualification || "",
    notes: teacher?.notes || "",
    active: teacher?.active ?? true
  });

  const [loading, setLoading] = useState(false);

  // 🔹 Handle input change
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // 🔹 Submit (Add / Edit)
  const handleSubmit = async () => {
    if (!form.fullName || (!teacher && !form.email)) {
      alert("Full Name and Email are required");
      return;
    }

    setLoading(true);
    try {
      if (teacher) {
        // ✏️ EDIT
        await api.put(`/teachers/${teacher.id}`, {
          fullName: form.fullName,
          mobileNumber: form.mobileNumber,
          qualification: form.qualification,
          notes: form.notes,
          active: form.active
        });
      } else {
        // ➕ ADD
        await api.post("/teachers", {
          fullName: form.fullName,
          email: form.email,
          mobileNumber: form.mobileNumber,
          qualification: form.qualification,
          notes: form.notes
        });
      }

      onSuccess(); // refresh + close handled by parent
    } catch (e) {
      alert(
        e?.response?.data?.message ||
        "Failed to save teacher"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center
                    bg-black/50 backdrop-blur-sm">

      {/* MODAL CONTAINER */}
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl
                      max-h-[85vh] flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">
            {teacher ? "Edit Teacher" : "Add Teacher"}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {teacher
              ? "Update teacher profile details"
              : "Create a new teacher profile for your school"}
          </p>
        </div>

        {/* INFO STRIP */}
        <div className="px-6 py-3 bg-blue-50 text-blue-700 text-sm">
          Teacher profiles are used while assigning subjects and sections.
        </div>

        {/* BODY (SCROLLABLE) */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              name="fullName"
              placeholder="e.g. Anjali Sharma"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border-2 rounded-lg px-4 py-3 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              name="email"
              placeholder="e.g. anjali.sharma@school.com"
              value={form.email}
              disabled={!!teacher}
              onChange={handleChange}
              className="w-full border-2 rounded-lg px-4 py-3 text-sm
                         disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              name="mobileNumber"
              placeholder="e.g. 9876543210"
              value={form.mobileNumber}
              onChange={handleChange}
              className="w-full border-2 rounded-lg px-4 py-3 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Qualification
            </label>
            <input
              name="qualification"
              placeholder="e.g. M.Sc Mathematics"
              value={form.qualification}
              onChange={handleChange}
              className="w-full border-2 rounded-lg px-4 py-3 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              placeholder="Optional internal notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              className="w-full border-2 rounded-lg px-4 py-3 text-sm"
            />
          </div>

          {/* ACTIVE TOGGLE (EDIT ONLY) */}
          {teacher && (
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                checked={form.active}
                onChange={e =>
                  setForm(prev => ({
                    ...prev,
                    active: e.target.checked
                  }))
                }
              />
              <span className="text-sm text-gray-700">
                Active
              </span>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t flex justify-end gap-3
                        bg-white sticky bottom-0">
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
            {loading
              ? "Saving..."
              : teacher ? "Update Teacher" : "Create Teacher"}
          </button>
        </div>

      </div>
    </div>
  );
}
