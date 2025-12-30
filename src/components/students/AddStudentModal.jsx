import { useState } from "react";
import api from "../../api/axios";

export default function AddStudentModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    dob: "",
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
      await api.post("/students", {
        name: form.name,
        dob: form.dob,
        admissionDate: form.admissionDate,
        parentName: form.parentName,
        parentMobile: form.parentMobile,
        address: form.address,
      });

      onSuccess();     // refresh list
      onClose();       // close modal
    } catch (err) {
      alert("Failed to add student");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[520px] rounded-lg shadow-lg">

        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Add New Student</h3>
          <p className="text-sm text-gray-500">
            This creates a student profile. Class assignment will be done separately.
          </p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          <input name="name" placeholder="Student Name *"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-sm" />

          <div className="flex gap-4">
            <input type="date" name="dob"
              onChange={handleChange}
              className="w-1/2 border px-3 py-2 rounded text-sm" />

            <input type="date" name="admissionDate"
              onChange={handleChange}
              className="w-1/2 border px-3 py-2 rounded text-sm" />
          </div>

          <input name="parentName" placeholder="Parent Name *"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-sm" />

          <input name="parentMobile" placeholder="Parent Mobile *"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-sm" />

          <textarea name="address" placeholder="Address *"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-sm" />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Student
          </button>
        </div>
      </div>
    </div>
  );
}
