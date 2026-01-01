import { useState } from "react";
import api from "../../api/axios";

export default function AddStudentModal({ onClose, onSuccess }) {

  const [form, setForm] = useState({
    fullName: "",
    dateOfBirth: "",
    admissionDate: "",
    parentName: "",
    parentMobile: "",
    address: "",
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await api.post("/students", form);
      onSuccess();
      onClose();
    } catch (err) {
      alert(
        err?.response?.data?.message ||
        "Failed to add student"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[700px] rounded-lg shadow-lg">

        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">New Student Admission</h3>
          <div className="mt-2 bg-blue-50 text-blue-700 text-sm px-4 py-2 rounded">
            Please fill put the below forms with correct details.
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">

          <input
            name="fullName"
            placeholder="Student Name *"
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded text-sm"
          />

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded text-sm"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Admission Date *
              </label>
              <input
                type="date"
                name="admissionDate"
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded text-sm"
              />
            </div>

          </div>

          <input
            name="parentName"
            placeholder="Parent / Guardian Name *"
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded text-sm"
          />

          <input
            name="parentMobile"
            placeholder="Parent Mobile *"
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded text-sm"
          />

          <textarea
            name="address"
            placeholder="Address *"
            rows={3}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded text-sm"
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="text-gray-600 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Add Student
          </button>
        </div>
      </div>
    </div>
  );
}
