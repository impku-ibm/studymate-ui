import Modal from "../common/Modal";

export default function AssignTeacherModal({ onClose }) {
  return (
    <Modal title="Assign Teacher" onClose={onClose}>
      
      <div className="space-y-4">
        <select className="w-full p-2 border rounded">
          <option>Select Academic Year</option>
          <option>2024-25</option>
        </select>

        <select className="w-full p-2 border rounded">
          <option>Select Teacher</option>
          <option>Mrs. Anjali Sharma</option>
          <option>Mr. Rajiv Verma</option>
        </select>

        <select className="w-full p-2 border rounded">
          <option>Select Class</option>
          <option>Class 10</option>
          <option>Class 9</option>
        </select>

        <select className="w-full p-2 border rounded">
          <option>Select Section</option>
          <option>A</option>
          <option>B</option>
        </select>

        <select className="w-full p-2 border rounded">
          <option>Select Subject</option>
          <option>Mathematics</option>
          <option>Physics</option>
        </select>

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
            Assign
          </button>
        </div>
      </div>
    </Modal>
  );
}
