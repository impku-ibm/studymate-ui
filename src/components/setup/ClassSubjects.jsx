import { useState } from "react";

const academicYears = ["2024-25", "2023-24"];

const classes = [
  { id: 1, name: "Class 10" },
  { id: 2, name: "Class 9" },
];

const subjects = [
  { id: 1, name: "Mathematics" },
  { id: 2, name: "English" },
  { id: 3, name: "Physics" },
  { id: 4, name: "Chemistry" },
];

export default function ClassSubjects() {
  const [year, setYear] = useState(academicYears[0]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const toggleSubject = (id) => {
    setSelectedSubjects((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    );
  };

  const handleSave = () => {
    console.log({
      academicYear: year,
      classId: selectedClass,
      subjectIds: selectedSubjects,
    });
    alert("Class–Subject mapping saved (UI only)");
  };

  return (
    <div className="bg-white rounded shadow p-6">
      <h3 className="font-semibold mb-4">Class–Subject Mapping</h3>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        
        <select
          className="p-2 border rounded"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          {academicYears.map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>

        <select
          className="p-2 border rounded"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Select Class</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subjects checklist */}
      {selectedClass && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {subjects.map((sub) => (
              <label
                key={sub.id}
                className="flex items-center gap-2 border p-2 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedSubjects.includes(sub.id)}
                  onChange={() => toggleSubject(sub.id)}
                />
                {sub.name}
              </label>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-slate-800 text-white rounded"
            >
              Save Mapping
            </button>
          </div>
        </>
      )}
    </div>
  );
}
