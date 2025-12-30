import { useState } from "react";
import Modal from "../common/Modal";

const initialClasses = [
  { name: "Class 10", sections: ["A", "B", "C"] },
  { name: "Class 9", sections: ["A", "B"] },
];

export default function Classes() {
  const [classes, setClasses] = useState(initialClasses);
  const [showModal, setShowModal] = useState(false);

  const [className, setClassName] = useState("");
  const [sections, setSections] = useState([""]);

  const addSectionField = () => {
    setSections([...sections, ""]);
  };

  const updateSection = (index, value) => {
    const updated = [...sections];
    updated[index] = value.toUpperCase();
    setSections(updated);
  };

  const removeSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!className.trim()) return;

    setClasses([
      ...classes,
      {
        name: className,
        sections: sections.filter(Boolean),
      },
    ]);

    // Reset
    setClassName("");
    setSections([""]);
    setShowModal(false);
  };

  return (
    <div className="bg-white rounded shadow p-6">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">Classes & Sections</h3>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="px-3 py-1 bg-slate-800 text-white rounded"
        >
          Add Class
        </button>
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Class Name</th>
            <th>Sections</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => (
            <tr key={cls.name} className="border-b">
              <td className="py-2">{cls.name}</td>
              <td>{cls.sections.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <Modal title="Add Class" onClose={() => setShowModal(false)}>
          
          {/* Class Name */}
          <input
            className="w-full mb-4 p-2 border rounded"
            placeholder="Class Name (e.g. Class 10)"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />

          {/* Sections */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Sections
            </label>

            {sections.map((sec, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  className="flex-1 p-2 border rounded"
                  placeholder="A"
                  value={sec}
                  onChange={(e) =>
                    updateSection(index, e.target.value)
                  }
                />

                {sections.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    className="px-2 text-red-500"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addSectionField}
              className="text-sm text-indigo-600 hover:underline mt-1"
            >
              + Add Section
            </button>
          </div>

          {/* Actions */}
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
              Save Class
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
