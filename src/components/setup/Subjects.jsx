import { useState } from "react";
import Modal from "../common/Modal";

const initialSubjects = [
  { name: "Mathematics", code: "MATH" },
  { name: "English", code: "ENG" },
  { name: "Physics", code: "PHY" },
  { name: "Chemistry", code: "CHEM" },
];

export default function Subjects() {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const handleSave = () => {
    if (!name.trim() || !code.trim()) return;

    setSubjects([
      ...subjects,
      {
        name,
        code: code.toUpperCase(),
      },
    ]);

    // reset
    setName("");
    setCode("");
    setShowModal(false);
  };

  return (
    <div className="bg-white rounded shadow p-6">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">Subjects</h3>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="px-3 py-1 bg-slate-800 text-white rounded"
        >
          Add Subject
        </button>
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Subject Name</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((s) => (
            <tr key={s.code} className="border-b">
              <td className="py-2">{s.name}</td>
              <td className="font-mono">{s.code}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <Modal title="Add Subject" onClose={() => setShowModal(false)}>
          
          <input
            className="w-full mb-4 p-2 border rounded"
            placeholder="Subject Name (e.g. Mathematics)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full mb-4 p-2 border rounded"
            placeholder="Subject Code (e.g. MATH)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-3 py-1 border rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-3 py-1 bg-slate-800 text-white rounded"
            >
              Save Subject
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
