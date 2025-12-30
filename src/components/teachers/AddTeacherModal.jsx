import Modal from "../common/Modal";

export default function AddTeacherModal({ onClose }) {
  return (
    <Modal title="Add New Teacher" onClose={onClose}>
      
      <div className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Full Name"
        />

        <input
          className="w-full p-2 border rounded"
          placeholder="Email"
        />

        <input
          className="w-full p-2 border rounded"
          placeholder="Mobile Number"
        />

        <input
          className="w-full p-2 border rounded"
          placeholder="Qualification"
        />

        <textarea
          className="w-full p-2 border rounded"
          placeholder="Notes (optional)"
          rows="3"
        />

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Save Teacher
          </button>
        </div>
      </div>
    </Modal>
  );
}
